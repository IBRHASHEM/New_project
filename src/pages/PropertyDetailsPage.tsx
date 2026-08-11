import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PropertyGallery } from '../components/common/PropertyGallery';
import { MapSection } from '../components/common/MapSection';
import { MortgageCalculator } from '../components/common/MortgageCalculator';
import { PropertyCard } from '../components/common/PropertyCard';
import { AgentCard } from '../components/common/AgentCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ALL_AMENITIES, MOCK_PROPERTIES } from '../data/mockData';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Heart,
  Scale,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  Sparkles,
  Share2,
  Building
} from 'lucide-react';

export const PropertyDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, formatPrice, isFavorite, toggleFavorite, isInCompare, addToCompare, removeFromCompare, openModal, showToast } = useApp();
  const isAr = language === 'ar';

  const property = MOCK_PROPERTIES.find((p) => p.slug === slug || p.id === slug) || MOCK_PROPERTIES[0];

  const title = isAr ? property.titleAr : property.titleEn;
  const description = isAr ? property.descriptionAr : property.descriptionEn;
  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);

  const matchedAmenities = ALL_AMENITIES.filter((a) => property.amenities.includes(a.id));

  const similarProperties = MOCK_PROPERTIES.filter(
    (p) => p.id !== property.id && (p.location.city === property.location.city || p.type === property.type)
  ).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(isAr ? 'تم نسخ رابط العقار إلى الحافظة' : 'Property link copied to clipboard', 'info');
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hello, I'm interested in property REF: ${property.referenceNumber} (${title}).`);
    window.open(`https://wa.me/${property.agent.whatsapp.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: isAr ? 'العقارات' : 'Properties', path: '/properties' },
          { label: title },
        ]}
      />

      {/* Property Title & Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-[#0A192F] text-[#D4AF37] font-bold text-xs uppercase tracking-wider">
              {property.status === 'for-sale' ? (isAr ? 'للبيع' : 'For Sale') : (isAr ? 'للإيجار' : 'For Rent')}
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-[#0A192F] font-semibold text-xs uppercase tracking-wider shadow-sm">
              {property.type.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              REF: {property.referenceNumber}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-serif leading-tight">
            {title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
            <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>{property.location.address}</span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="flex flex-col items-start lg:items-end justify-between gap-4 shrink-0">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-mono block">{isAr ? 'السعر المطلوب' : 'Asking Price'}</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-serif">
              {formatPrice(property.priceEgp)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-3 rounded-xl border transition-colors ${
                favorited ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white border-slate-200 text-slate-600 hover:text-[#0A192F]'
              }`}
              title="Save Favorite"
            >
              <Heart className={`w-5 h-5 ${favorited ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={() => (compared ? removeFromCompare(property.id) : addToCompare(property.id))}
              className={`p-3 rounded-xl border transition-colors ${
                compared ? 'bg-[#0A192F] border-[#0A192F] text-[#D4AF37] font-bold' : 'bg-white border-slate-200 text-slate-600 hover:text-[#0A192F]'
              }`}
              title="Compare"
            >
              <Scale className="w-5 h-5" />
            </button>

            <button
              onClick={handleShare}
              className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#0A192F] transition-colors"
              title="Share Property"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Gallery */}
      <PropertyGallery images={property.images} title={title} />

      {/* Specs Key Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-slate-200 text-[#0A192F] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-100 text-[#C5A059]">
            <Bed className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">{isAr ? 'غرف النوم' : 'Bedrooms'}</span>
            <span className="text-lg font-bold font-serif">{property.bedrooms} {isAr ? 'غرف' : 'Beds'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-100 text-[#C5A059]">
            <Bath className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">{isAr ? 'الحمامات' : 'Bathrooms'}</span>
            <span className="text-lg font-bold font-serif">{property.bathrooms} {isAr ? 'حمامات' : 'Baths'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-100 text-[#C5A059]">
            <Maximize2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">{isAr ? 'المساحة الكلية' : 'Property Area'}</span>
            <span className="text-lg font-bold font-serif">{property.areaSqm} m²</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-100 text-[#C5A059]">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">{isAr ? 'سنة التشطيب' : 'Year Built'}</span>
            <span className="text-lg font-bold font-serif">{property.yearBuilt || 2024}</span>
          </div>
        </div>
      </div>

      {/* Content Layout: Left Main Description/Features + Right Agent Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Overview Description */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-[#0A192F] font-serif border-b border-slate-100 pb-3">
              {isAr ? 'وصف العقار والميزات' : 'Property Description'}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-light">
              {description}
            </p>
          </section>

          {/* Amenities & Features */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#0A192F] font-serif border-b border-slate-100 pb-3">
              {isAr ? 'المرافق والخدمات المتاحة' : 'Property Amenities & Features'}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {matchedAmenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F9FA] border border-slate-200 text-xs text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">{isAr ? amenity.nameAr : amenity.nameEn}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Map */}
          <MapSection location={property.location} title={title} />

          {/* Mortgage Calculator */}
          <MortgageCalculator initialPriceEgp={property.priceEgp} />

        </div>

        {/* RIGHT COLUMN: AGENT & CTAs */}
        <aside className="space-y-6 sticky top-24">
          
          {/* Quick Schedule Viewing Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="space-y-1 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] font-mono">
                {isAr ? 'حجز مسبق' : 'Schedule Visit'}
              </span>
              <h3 className="text-lg font-bold text-[#0A192F] font-serif">
                {isAr ? 'طلب معاينة للعقار' : 'Request Property Viewing'}
              </h3>
            </div>

            <button
              onClick={() => openModal('viewing', { propertyId: property.id, title })}
              className="w-full py-3.5 rounded-lg bg-[#0A192F] hover:bg-[#06101E] text-[#D4AF37] font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{isAr ? 'حدد موعد المعاينة' : 'Schedule Viewing'}</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full py-3.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct Inquiry</span>
            </button>
          </div>

          {/* Agent Card */}
          <AgentCard agent={property.agent} />

        </aside>

      </div>

      {/* SIMILAR PROPERTIES */}
      {similarProperties.length > 0 && (
        <section className="pt-12 border-t border-slate-800 space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">
              {isAr ? 'مقترحات مشابهة' : 'Recommended For You'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              {isAr ? 'عقارات قد تهمك في نفس المنطقة' : 'Similar Properties Nearby'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
