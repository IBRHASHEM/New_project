import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, Home, DollarSign, Bed, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { PropertyType, ListingStatus } from '../../types';

export const HeroSearch: React.FC = () => {
  const { language, currency } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';

  const [status, setStatus] = useState<ListingStatus | 'all'>('for-sale');
  const [city, setCity] = useState<string>('');
  const [propertyType, setPropertyType] = useState<PropertyType | 'all'>('all');
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(50000000);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (status !== 'all') params.set('status', status);
    if (city) params.set('city', city);
    if (propertyType !== 'all') params.set('type', propertyType);
    if (bedrooms > 0) params.set('beds', bedrooms.toString());
    if (priceMax < 50000000) params.set('maxPrice', priceMax.toString());

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xl text-[#1A1A1A]">
      
      {/* Transaction Type Tabs */}
      <div className="flex items-center gap-2 pb-4 border-b border-slate-200 overflow-x-auto">
        <button
          type="button"
          onClick={() => setStatus('for-sale')}
          className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
            status === 'for-sale'
              ? 'bg-[#0A192F] text-[#D4AF37] shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:text-[#0A192F] hover:bg-slate-200'
          }`}
        >
          {isAr ? 'للبيع' : 'Buy Properties'}
        </button>

        <button
          type="button"
          onClick={() => setStatus('for-rent')}
          className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
            status === 'for-rent'
              ? 'bg-[#0A192F] text-[#D4AF37] shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:text-[#0A192F] hover:bg-slate-200'
          }`}
        >
          {isAr ? 'للإيجار' : 'Rent Properties'}
        </button>

        <button
          type="button"
          onClick={() => setStatus('off-plan')}
          className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
            status === 'off-plan'
              ? 'bg-[#0A192F] text-[#D4AF37] shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:text-[#0A192F] hover:bg-slate-200'
          }`}
        >
          {isAr ? 'مشاريع تحت الإنشاء' : 'Off-Plan Projects'}
        </button>
      </div>

      {/* Main Search Inputs Grid */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 pt-4">
        
        {/* City Select */}
        <div className="bg-[#F8F9FA] border border-slate-200 rounded-xl p-3 flex flex-col justify-between">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{isAr ? 'المدينة / المنطقة' : 'Location'}</span>
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-[#0A192F] focus:outline-none cursor-pointer mt-1"
          >
            <option value="" className="bg-white">{isAr ? 'جميع المناطق بمصر' : 'All Locations'}</option>
            <option value="New Cairo" className="bg-white">{isAr ? 'القاهرة الجديدة (التجمع)' : 'New Cairo (5th Settlement)'}</option>
            <option value="Sheikh Zayed" className="bg-white">{isAr ? 'الشيخ زايد' : 'Sheikh Zayed'}</option>
            <option value="New Capital" className="bg-white">{isAr ? 'العاصمة الإدارية' : 'New Administrative Capital'}</option>
            <option value="North Coast" className="bg-white">{isAr ? 'الساحل الشمالي (رأس الحكمة)' : 'North Coast (Ras El Hekma)'}</option>
            <option value="6th of October" className="bg-white">{isAr ? '6 أكتوبر' : '6th of October'}</option>
            <option value="Ain Sokhna" className="bg-white">{isAr ? 'العين السخنة' : 'Ain Sokhna'}</option>
          </select>
        </div>

        {/* Property Type */}
        <div className="bg-[#F8F9FA] border border-slate-200 rounded-xl p-3 flex flex-col justify-between">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{isAr ? 'نوع العقار' : 'Property Type'}</span>
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value as any)}
            className="w-full bg-transparent text-sm font-semibold text-[#0A192F] focus:outline-none cursor-pointer mt-1"
          >
            <option value="all" className="bg-white">{isAr ? 'جميع الأنواع' : 'All Types'}</option>
            <option value="villa" className="bg-white">{isAr ? 'فيلا مستقلة' : 'Standalone Villa'}</option>
            <option value="apartment" className="bg-white">{isAr ? 'شقة سكنية' : 'Apartment'}</option>
            <option value="penthouse" className="bg-white">{isAr ? 'بنتهاوس' : 'Penthouse'}</option>
            <option value="townhouse" className="bg-white">{isAr ? 'تاون هاوس' : 'Townhouse'}</option>
            <option value="chalet" className="bg-white">{isAr ? 'شاليه ساحلي' : 'Coastal Chalet'}</option>
            <option value="office" className="bg-white">{isAr ? 'مكتب إداري' : 'Office Space'}</option>
            <option value="commercial" className="bg-white">{isAr ? 'محل تجاري' : 'Commercial Retail'}</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div className="bg-[#F8F9FA] border border-slate-200 rounded-xl p-3 flex flex-col justify-between">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{isAr ? 'غرف النوم' : 'Bedrooms'}</span>
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(Number(e.target.value))}
            className="w-full bg-transparent text-sm font-semibold text-[#0A192F] focus:outline-none cursor-pointer mt-1"
          >
            <option value={0} className="bg-white">{isAr ? 'أي عدد غرف' : 'Any Bedrooms'}</option>
            <option value={2} className="bg-white">2+ {isAr ? 'غرف' : 'Bedrooms'}</option>
            <option value={3} className="bg-white">3+ {isAr ? 'غرف' : 'Bedrooms'}</option>
            <option value={4} className="bg-white">4+ {isAr ? 'غرف' : 'Bedrooms'}</option>
            <option value={5} className="bg-white">5+ {isAr ? 'غرف' : 'Bedrooms'}</option>
          </select>
        </div>

        {/* Price Cap */}
        <div className="bg-[#F8F9FA] border border-slate-200 rounded-xl p-3 flex flex-col justify-between">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{isAr ? 'حد السعر الأقصى' : 'Max Price'}</span>
          </label>
          <select
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full bg-transparent text-sm font-semibold text-[#0A192F] focus:outline-none cursor-pointer mt-1 font-mono"
          >
            <option value={50000000} className="bg-white">{isAr ? 'بلا حدود' : 'No Limit'}</option>
            <option value={10000000} className="bg-white">{currency === 'EGP' ? '10M EGP' : '$200k USD'}</option>
            <option value={20000000} className="bg-white">{currency === 'EGP' ? '20M EGP' : '$400k USD'}</option>
            <option value={35000000} className="bg-white">{currency === 'EGP' ? '35M EGP' : '$700k USD'}</option>
            <option value={50000000} className="bg-white">{currency === 'EGP' ? '50M EGP' : '$1M+ USD'}</option>
          </select>
        </div>

        {/* Search CTA */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#06101E] text-[#D4AF37] font-extrabold text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Search className="w-4 h-4 stroke-[2.5]" />
          <span>{isAr ? 'بحث عقاري' : 'Search'}</span>
        </button>

      </form>

    </div>
  );
};
