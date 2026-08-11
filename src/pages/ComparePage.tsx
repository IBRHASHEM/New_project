import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ALL_AMENITIES } from '../data/mockData';
import { Scale, Trash2, ArrowRight, Check, X, Eye } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { language, compareList, removeFromCompare, clearCompare, formatPrice, properties } = useApp();
  const isAr = language === 'ar';

  const comparedProps = properties.filter((p) => compareList.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Breadcrumbs items={[{ label: isAr ? 'مقارنة العقارات' : 'Compare Properties' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-serif flex items-center gap-3">
            <Scale className="w-8 h-8 text-amber-400" />
            <span>{isAr ? 'مقارنة مواصفات العقارات' : 'Side-by-Side Property Comparison'}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isAr
              ? `تقارن حالياً ${comparedProps.length} من أصل 4 عقارات كحد أقصى`
              : `Comparing ${comparedProps.length} of 4 max selected properties`}
          </p>
        </div>

        {comparedProps.length > 0 && (
          <button
            onClick={clearCompare}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 hover:bg-slate-800 text-xs font-semibold flex items-center gap-2 self-start sm:self-auto transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isAr ? 'تفراغ قائمة المقارنة' : 'Clear Comparison List'}</span>
          </button>
        )}
      </div>

      {comparedProps.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-xl mx-auto my-12 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center mx-auto">
            <Scale className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white font-serif">
            {isAr ? 'لم تقم بإضافة عقارات للمقارنة بعد' : 'No Properties Selected For Comparison'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isAr
              ? 'تصفح العقارات وانقر على زر المقارنة لإضافتها ومقارنة المساحة، الأسعار، والمميزات جنباً إلى جنب.'
              : 'Browse our portfolio and click the compare icon on any property card to analyze features side-by-side.'}
          </p>
          <Link
            to="/properties"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <span>{isAr ? 'تصفح العقارات الآن' : 'Browse Properties'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto pb-6">
          <table className="w-full text-left text-xs text-slate-300 border-collapse min-w-[700px]">
            
            {/* Headers / Property Thumbnails */}
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-4 w-48 bg-slate-950 text-slate-400 font-mono text-[11px] uppercase tracking-wider align-top">
                  {isAr ? 'العقار' : 'Property'}
                </th>
                {comparedProps.map((p) => (
                  <th key={p.id} className="p-4 w-64 bg-slate-900 border-l border-slate-800 align-top">
                    <div className="space-y-3">
                      <div className="relative h-36 rounded-xl overflow-hidden bg-slate-950">
                        <img src={p.images[0]} alt={p.titleEn} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeFromCompare(p.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <Link to={`/properties/${p.slug}`} className="font-serif font-bold text-sm text-white hover:text-amber-400 transition-colors line-clamp-2 block">
                        {isAr ? p.titleAr : p.titleEn}
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80">
              
              {/* Price */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950">{isAr ? 'السعر المطلوب' : 'Asking Price'}</td>
                {comparedProps.map((p) => (
                  <td key={p.id} className="p-4 font-serif font-bold text-base text-amber-400 bg-slate-900 border-l border-slate-800">
                    {formatPrice(p.priceEgp)}
                  </td>
                ))}
              </tr>

              {/* Price per sqm */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950">{isAr ? 'سعر المتر التقريبي' : 'Approx. Price / m²'}</td>
                {comparedProps.map((p) => (
                  <td key={p.id} className="p-4 font-mono font-semibold text-slate-300 bg-slate-900 border-l border-slate-800">
                    {formatPrice(Math.round(p.priceEgp / p.areaSqm))} / m²
                  </td>
                ))}
              </tr>

              {/* Location */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950">{isAr ? 'المنطقة والمدينة' : 'District & City'}</td>
                {comparedProps.map((p) => (
                  <td key={p.id} className="p-4 font-medium text-slate-200 bg-slate-900 border-l border-slate-800">
                    {p.location.district}, {p.location.city}
                  </td>
                ))}
              </tr>

              {/* Property Type */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950">{isAr ? 'نوع العقار' : 'Property Type'}</td>
                {comparedProps.map((p) => (
                  <td key={p.id} className="p-4 font-semibold uppercase text-amber-300 bg-slate-900 border-l border-slate-800">
                    {p.type}
                  </td>
                ))}
              </tr>

              {/* Status */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950">{isAr ? 'حالة المعاملة' : 'Listing Status'}</td>
                {comparedProps.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-slate-200 bg-slate-900 border-l border-slate-800">
                    {p.status}
                  </td>
                ))}
              </tr>

              {/* Bedrooms */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950">{isAr ? 'عدد الغرف' : 'Bedrooms'}</td>
                {comparedProps.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-slate-200 bg-slate-900 border-l border-slate-800">
                    {p.bedrooms}
                  </td>
                ))}
              </tr>

              {/* Bathrooms */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950">{isAr ? 'الحمامات' : 'Bathrooms'}</td>
                {comparedProps.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-slate-200 bg-slate-900 border-l border-slate-800">
                    {p.bathrooms}
                  </td>
                ))}
              </tr>

              {/* Area */}
              <tr>
                <td className="p-4 font-bold text-slate-400 bg-slate-950">{isAr ? 'المساحة' : 'Area'}</td>
                {comparedProps.map((p) => (
                  <td key={p.id} className="p-4 font-semibold text-slate-200 bg-slate-900 border-l border-slate-800">
                    {p.areaSqm} m²
                  </td>
                ))}
              </tr>

              {/* Amenities Matrix */}
              {ALL_AMENITIES.map((amenity) => (
                <tr key={amenity.id}>
                  <td className="p-4 font-medium text-slate-400 bg-slate-950">
                    {isAr ? amenity.nameAr : amenity.nameEn}
                  </td>
                  {comparedProps.map((p) => {
                    const hasAmenity = p.amenities.includes(amenity.id);
                    return (
                      <td key={p.id} className="p-4 bg-slate-900 border-l border-slate-800 text-center">
                        {hasAmenity ? (
                          <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-600 mx-auto" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Actions Footer Row */}
              <tr>
                <td className="p-4 bg-slate-950" />
                {comparedProps.map((p) => (
                  <td key={p.id} className="p-4 bg-slate-900 border-l border-slate-800">
                    <Link
                      to={`/properties/${p.slug}`}
                      className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{isAr ? 'التفاصيل' : 'View Property'}</span>
                    </Link>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
