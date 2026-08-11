import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/common/PropertyCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ALL_AMENITIES, MOCK_PROPERTIES } from '../data/mockData';
import { PropertyType, ListingStatus, Property } from '../types';
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  MapPin,
  X,
  Search,
  FilterX,
  ChevronDown
} from 'lucide-react';

export const PropertiesPage: React.FC = () => {
  const { language, properties } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const isAr = language === 'ar';

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter States
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [type, setType] = useState<PropertyType | 'all'>((searchParams.get('type') as any) || 'all');
  const [status, setStatus] = useState<ListingStatus | 'all'>((searchParams.get('status') as any) || 'all');
  const [beds, setBeds] = useState<number>(Number(searchParams.get('beds')) || 0);
  const [baths, setBaths] = useState<number>(Number(searchParams.get('baths')) || 0);
  const [minPrice, setMinPrice] = useState<number>(Number(searchParams.get('minPrice')) || 0);
  const [maxPrice, setMaxPrice] = useState<number>(Number(searchParams.get('maxPrice')) || 100000000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest' | 'popularity'>('newest');

  // Sync URL params on load
  useEffect(() => {
    if (searchParams.has('city')) setCity(searchParams.get('city') || '');
    if (searchParams.has('type')) setType((searchParams.get('type') as any) || 'all');
    if (searchParams.has('status')) setStatus((searchParams.get('status') as any) || 'all');
    if (searchParams.has('beds')) setBeds(Number(searchParams.get('beds')) || 0);
    if (searchParams.has('maxPrice')) setMaxPrice(Number(searchParams.get('maxPrice')) || 100000000);
  }, [searchParams]);

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId]
    );
  };

  const handleResetFilters = () => {
    setKeyword('');
    setCity('');
    setType('all');
    setStatus('all');
    setBeds(0);
    setBaths(0);
    setMinPrice(0);
    setMaxPrice(100000000);
    setSelectedAmenities([]);
    setSearchParams({});
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Keyword
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const matchesTitle = p.titleEn.toLowerCase().includes(q) || p.titleAr.includes(q);
        const matchesLoc = p.location.city.toLowerCase().includes(q) || p.location.district.toLowerCase().includes(q);
        const matchesRef = p.referenceNumber.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc && !matchesRef) return false;
      }

      // City
      if (city && p.location.city !== city) return false;

      // Type
      if (type !== 'all' && p.type !== type) return false;

      // Status
      if (status !== 'all' && p.status !== status) return false;

      // Beds
      if (beds > 0 && p.bedrooms < beds) return false;

      // Baths
      if (baths > 0 && p.bathrooms < baths) return false;

      // Price Range EGP
      if (p.priceEgp < minPrice || p.priceEgp > maxPrice) return false;

      // Amenities
      if (selectedAmenities.length > 0) {
        const hasAll = selectedAmenities.every((a) => p.amenities.includes(a));
        if (!hasAll) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceEgp - b.priceEgp;
      if (sortBy === 'price-desc') return b.priceEgp - a.priceEgp;
      if (sortBy === 'popularity') return b.viewsCount - a.viewsCount;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [properties, keyword, city, type, status, beds, baths, minPrice, maxPrice, selectedAmenities, sortBy]);

  const activeFiltersCount =
    (city ? 1 : 0) +
    (type !== 'all' ? 1 : 0) +
    (status !== 'all' ? 1 : 0) +
    (beds > 0 ? 1 : 0) +
    (baths > 0 ? 1 : 0) +
    (minPrice > 0 || maxPrice < 100000000 ? 1 : 0) +
    selectedAmenities.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <Breadcrumbs items={[{ label: isAr ? 'دليل العقارات' : 'Property Search' }]} />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-serif">
            {isAr ? 'البحث عن عقار سكنى أو تجاري' : 'Properties For Sale & Rent'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isAr
              ? `تم العثور على ${filteredProperties.length} عقار يطابق خياراتك`
              : `Showing ${filteredProperties.length} verified listings in Egypt`}
          </p>
        </div>

        {/* Layout & Mobile Filter Controls */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2 rounded-xl bg-white border border-slate-200 text-[#0A192F] text-xs font-semibold flex items-center gap-2 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
            <span>{isAr ? 'تصفية نتائج البحث' : 'Filters'} {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative bg-white border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs text-slate-700 shadow-sm">
            <span className="text-slate-400 font-mono">{isAr ? 'ترتيب:' : 'Sort:'}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-semibold text-[#0A192F] focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-white">{isAr ? 'الأحدث أولاً' : 'Newest First'}</option>
              <option value="price-asc" className="bg-white">{isAr ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
              <option value="price-desc" className="bg-white">{isAr ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
              <option value="popularity" className="bg-white">{isAr ? 'الأكثر مشاهدة' : 'Most Popular'}</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-xl p-1 gap-1 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#0A192F] text-[#D4AF37] font-bold' : 'text-slate-500 hover:text-[#0A192F]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[#0A192F] text-[#D4AF37] font-bold' : 'text-slate-500 hover:text-[#0A192F]'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Grid: Left Filter Sidebar + Right Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block space-y-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-[#0A192F] font-serif font-bold text-base">
              <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
              <span>{isAr ? 'تصفية البحث' : 'Filter Properties'}</span>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#C5A059] hover:underline flex items-center gap-1 font-medium"
              >
                <FilterX className="w-3.5 h-3.5" />
                <span>{isAr ? 'مسح الكل' : 'Clear All'}</span>
              </button>
            )}
          </div>

          <div className="space-y-5 text-xs">
            
            {/* Search Keyword */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold">{isAr ? 'كلمة البحث' : 'Keyword Search'}</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={isAr ? 'اسم الشارع، الكمبوند، المطور...' : 'Villa, Mivida, Golden Square...'}
                  className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* City Select */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold">{isAr ? 'المدينة' : 'Location / City'}</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg px-3 py-2 text-[#0A192F] focus:outline-none cursor-pointer"
              >
                <option value="">{isAr ? 'جميع المناطق' : 'All Locations'}</option>
                <option value="New Cairo">New Cairo / القاهرة الجديدة</option>
                <option value="Sheikh Zayed">Sheikh Zayed / الشيخ زايد</option>
                <option value="New Capital">New Capital / العاصمة الإدارية</option>
                <option value="North Coast">North Coast / الساحل الشمالي</option>
                <option value="6th of October">6th of October / 6 أكتوبر</option>
                <option value="Ain Sokhna">Ain Sokhna / العين السخنة</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold">{isAr ? 'نوع العقار' : 'Property Type'}</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg px-3 py-2 text-[#0A192F] focus:outline-none cursor-pointer"
              >
                <option value="all">{isAr ? 'جميع الأنواع' : 'All Types'}</option>
                <option value="villa">Standalone Villa / فيلا</option>
                <option value="apartment">Apartment / شقة</option>
                <option value="penthouse">Penthouse / بنتهاوس</option>
                <option value="townhouse">Townhouse / تاون هاوس</option>
                <option value="chalet">Chalet / شاليه</option>
                <option value="office">Office / مكتب إداري</option>
                <option value="commercial">Commercial / تجاري</option>
              </select>
            </div>

            {/* Transaction Status */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold">{isAr ? 'نوع المعاملة' : 'Listing Status'}</label>
              <div className="grid grid-cols-3 gap-1 bg-[#F8F9FA] p-1 rounded-lg border border-slate-200 text-[11px]">
                <button
                  type="button"
                  onClick={() => setStatus('all')}
                  className={`py-1.5 rounded-md font-semibold transition-colors ${
                    status === 'all' ? 'bg-[#0A192F] text-[#D4AF37]' : 'text-slate-600 hover:text-[#0A192F]'
                  }`}
                >
                  {isAr ? 'الكل' : 'All'}
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('for-sale')}
                  className={`py-1.5 rounded-md font-semibold transition-colors ${
                    status === 'for-sale' ? 'bg-[#0A192F] text-[#D4AF37]' : 'text-slate-600 hover:text-[#0A192F]'
                  }`}
                >
                  {isAr ? 'للبيع' : 'Sale'}
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('for-rent')}
                  className={`py-1.5 rounded-md font-semibold transition-colors ${
                    status === 'for-rent' ? 'bg-[#0A192F] text-[#D4AF37]' : 'text-slate-600 hover:text-[#0A192F]'
                  }`}
                >
                  {isAr ? 'للإيجار' : 'Rent'}
                </button>
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-slate-700 font-semibold">{isAr ? 'أقل عدد غرف' : 'Min Beds'}</label>
                <select
                  value={beds}
                  onChange={(e) => setBeds(Number(e.target.value))}
                  className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg px-2.5 py-2 text-[#0A192F] focus:outline-none"
                >
                  <option value={0}>{isAr ? 'الكل' : 'Any'}</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                  <option value={5}>5+</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 font-semibold">{isAr ? 'أقل حمامات' : 'Min Baths'}</label>
                <select
                  value={baths}
                  onChange={(e) => setBaths(Number(e.target.value))}
                  className="w-full bg-[#F8F9FA] border border-slate-200 rounded-lg px-2.5 py-2 text-[#0A192F] focus:outline-none"
                >
                  <option value={0}>{isAr ? 'الكل' : 'Any'}</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                </select>
              </div>
            </div>

            {/* Amenities Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-slate-700 font-semibold block">{isAr ? 'المميزات والخدمات' : 'Amenities & Features'}</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {ALL_AMENITIES.map((amenity) => (
                  <label key={amenity.id} className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-[#0A192F]">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity.id)}
                      onChange={() => handleAmenityToggle(amenity.id)}
                      className="rounded border-slate-300 bg-white text-[#0A192F] focus:ring-[#D4AF37]"
                    />
                    <span className="text-[11px]">{isAr ? amenity.nameAr : amenity.nameEn}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* RESULTS GRID / LIST */}
        <main className="lg:col-span-3 space-y-8">
          
          {filteredProperties.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-[#C5A059] flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] font-serif">
                {isAr ? 'لم نجد عقارات تطابق خيارات البحث الحالية' : 'No properties match your exact filters'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {isAr
                  ? 'يرجى تجربة تقليل خيارات التصفية أو البحث عن منطقة أخرى.'
                  : 'Try adjusting your price range, location filters, or property type.'}
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-lg bg-[#0A192F] text-[#D4AF37] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-sm"
              >
                <FilterX className="w-4 h-4" />
                <span>{isAr ? 'إعادة ضبط الفلاتر' : 'Clear All Filters'}</span>
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'space-y-6'}>
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} viewMode={viewMode} />
              ))}
            </div>
          )}

        </main>

      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
          <div className="w-full max-w-md bg-slate-900 h-full p-6 overflow-y-auto space-y-6 text-white border-l border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-serif font-bold text-lg text-amber-400">{isAr ? 'تصفية العقارات' : 'Filter Properties'}</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Filter Controls */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">{isAr ? 'المدينة' : 'Location'}</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                >
                  <option value="">{isAr ? 'جميع المناطق' : 'All Locations'}</option>
                  <option value="New Cairo">New Cairo</option>
                  <option value="Sheikh Zayed">Sheikh Zayed</option>
                  <option value="New Capital">New Capital</option>
                  <option value="North Coast">North Coast</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">{isAr ? 'نوع العقار' : 'Property Type'}</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                >
                  <option value="all">{isAr ? 'الكل' : 'All Types'}</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="chalet">Chalet</option>
                </select>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-center text-xs uppercase"
                >
                  {isAr ? 'تطبيق الفلاتر' : 'Apply Filters'}
                </button>
                <button
                  onClick={handleResetFilters}
                  className="py-3 px-4 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  {isAr ? 'إعادة ضبط' : 'Reset'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
