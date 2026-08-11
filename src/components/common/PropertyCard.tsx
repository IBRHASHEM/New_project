import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Heart,
  Scale,
  Eye,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, viewMode = 'grid' }) => {
  const { language, formatPrice, isFavorite, toggleFavorite, isInCompare, addToCompare, removeFromCompare, openModal } = useApp();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isAr = language === 'ar';
  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);

  const title = isAr ? property.titleAr : property.titleEn;
  const description = isAr ? property.descriptionAr : property.descriptionEn;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = encodeURIComponent(
      `Hello! I'm interested in property REF: ${property.referenceNumber} (${title}). Please send me details.`
    );
    window.open(`https://wa.me/${property.agent.whatsapp.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  if (viewMode === 'list') {
    return (
      <div
        className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Carousel Area */}
        <div className="relative md:w-80 h-60 md:h-auto shrink-0 overflow-hidden bg-slate-100">
          <img
            src={property.images[currentImgIndex] || property.images[0]}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.isFeatured && (
              <span className="px-2.5 py-1 rounded-md bg-[#D4AF37] text-[#0A192F] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" />
                {isAr ? 'مميز' : 'Featured'}
              </span>
            )}
            <span className="px-2.5 py-1 rounded-md bg-[#0A192F] text-white text-[11px] font-bold uppercase tracking-wider">
              {property.status === 'for-sale' ? (isAr ? 'للبيع' : 'For Sale') : property.status === 'for-rent' ? (isAr ? 'للإيجار' : 'For Rent') : (isAr ? 'تحت الإنشاء' : 'Off-Plan')}
            </span>
          </div>

          {/* Overlay Actions */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(property.id);
              }}
              className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                favorited ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
              title={isAr ? 'إضافة للمفضلة' : 'Save Favorite'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                compared ? removeFromCompare(property.id) : addToCompare(property.id);
              }}
              className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                compared ? 'bg-[#D4AF37] text-[#0A192F] font-bold' : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
              title={isAr ? 'مقارنة' : 'Compare'}
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>

          {/* Multi-image nav controls */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={prevImage}
                className="p-1 rounded-lg bg-black/60 text-white hover:bg-black/90 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono font-medium text-white bg-black/60 px-2 py-0.5 rounded-full">
                {currentImgIndex + 1} / {property.images.length}
              </span>
              <button
                onClick={nextImage}
                className="p-1 rounded-lg bg-black/60 text-white hover:bg-black/90 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-1.5 text-xs text-[#C5A059] font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{property.location.district}, {property.location.city}</span>
              </div>
              <span className="text-xs font-mono text-slate-400">REF: {property.referenceNumber}</span>
            </div>

            <Link to={`/properties/${property.slug}`}>
              <h3 className="text-lg font-bold text-[#0A192F] hover:text-[#C5A059] transition-colors line-clamp-1 font-serif">
                {title}
              </h3>
            </Link>

            <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-700">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>{property.bedrooms > 0 ? `${property.bedrooms} ${isAr ? 'غرف' : 'Beds'}` : (isAr ? 'مكتب' : 'Office')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>{property.bathrooms} {isAr ? 'حمامات' : 'Baths'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>{property.areaSqm} m²</span>
            </div>
          </div>

          {/* Footer & Price */}
          <div className="flex items-center justify-between pt-1 gap-4">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">{isAr ? 'السعر' : 'Asking Price'}</span>
              <span className="text-xl font-extrabold text-[#0A192F] font-serif">
                {formatPrice(property.priceEgp)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleWhatsApp}
                className="p-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                title="WhatsApp Agent"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <Link
                to={`/properties/${property.slug}`}
                className="px-4 py-2 rounded-lg bg-[#0A192F] hover:bg-[#06101E] text-[#D4AF37] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span>{isAr ? 'التفاصيل' : 'Details'}</span>
                <Eye className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Card Header & Image */}
        <div className="relative h-64 overflow-hidden bg-slate-100">
          <img
            src={property.images[currentImgIndex] || property.images[0]}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.isFeatured && (
              <span className="px-2.5 py-1 rounded-md bg-[#D4AF37] text-[#0A192F] text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" />
                {isAr ? 'مميز' : 'Featured'}
              </span>
            )}
            <span className="px-2.5 py-1 rounded-md bg-[#0A192F] text-white text-[10px] font-bold uppercase tracking-wider">
              {property.status === 'for-sale' ? (isAr ? 'للبيع' : 'For Sale') : property.status === 'for-rent' ? (isAr ? 'للإيجار' : 'For Rent') : (isAr ? 'تحت الإنشاء' : 'Off-Plan')}
            </span>
          </div>

          {/* Favorites & Compare buttons */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(property.id);
              }}
              className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                favorited ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
              title={isAr ? 'إضافة للمفضلة' : 'Save Favorite'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                compared ? removeFromCompare(property.id) : addToCompare(property.id);
              }}
              className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                compared ? 'bg-[#D4AF37] text-[#0A192F] font-bold' : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
              title={isAr ? 'مقارنة' : 'Compare'}
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>

          {/* Location Badge bottom left of image */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-white font-medium truncate max-w-[80%]">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate">{property.location.district}, {property.location.city}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-200 bg-black/60 px-2 py-1 rounded-lg">
              {property.type.toUpperCase()}
            </span>
          </div>

          {/* Carousel Arrows */}
          {property.images.length > 1 && isHovered && (
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between z-10">
              <button
                onClick={prevImage}
                className="p-1.5 rounded-full bg-black/60 text-white hover:bg-[#D4AF37] hover:text-[#0A192F] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="p-1.5 rounded-full bg-black/60 text-white hover:bg-[#D4AF37] hover:text-[#0A192F] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Property Card Body */}
        <div className="p-5 space-y-4">
          <Link to={`/properties/${property.slug}`} className="block group/title">
            <h3 className="text-base font-bold text-[#0A192F] group-hover/title:text-[#C5A059] transition-colors line-clamp-1 font-serif leading-snug">
              {title}
            </h3>
          </Link>

          {/* Specs Bar */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-lg bg-[#F8F9FA] border border-slate-200 text-xs text-slate-700">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span>{property.bedrooms > 0 ? `${property.bedrooms} ${isAr ? 'غرف' : 'Beds'}` : (isAr ? 'مكتب' : 'Commercial')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span>{property.bathrooms} {isAr ? 'حمامات' : 'Baths'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span>{property.areaSqm} m²</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Card Footer */}
      <div className="px-5 pb-5 pt-1 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">{isAr ? 'السعر المطلوب' : 'Asking Price'}</span>
          <span className="text-lg font-extrabold text-[#0A192F] font-serif">
            {formatPrice(property.priceEgp)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleWhatsApp}
            className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
            title="WhatsApp Agent"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          <Link
            to={`/properties/${property.slug}`}
            className="px-3.5 py-2 rounded-lg bg-[#0A192F] hover:bg-[#06101E] text-[#D4AF37] font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-sm transition-colors"
          >
            <span>{isAr ? 'التفاصيل' : 'Details'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
