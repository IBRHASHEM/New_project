import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/common/PropertyCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { language, favorites, properties } = useApp();
  const isAr = language === 'ar';

  const favProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Breadcrumbs items={[{ label: isAr ? 'العقارات المفضلة' : 'Saved Favorites' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-serif flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500/20" />
            <span>{isAr ? 'العقارات المحفوظة بالمفضلة' : 'Your Saved Properties'}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isAr
              ? `لديك ${favProperties.length} عقار محفوظ في المفضلة`
              : `You have ${favProperties.length} saved listings in your wishlist`}
          </p>
        </div>

        {favProperties.length > 0 && (
          <Link
            to="/compare"
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors self-start sm:self-auto"
          >
            {isAr ? 'مقارنة العقارات المفضلة' : 'Compare Saved Items'}
          </Link>
        )}
      </div>

      {favProperties.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-xl mx-auto my-12 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-slate-800 text-rose-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white font-serif">
            {isAr ? 'قائمة المفضلة فارغة حالياً' : 'No Saved Properties Yet'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isAr
              ? 'انقر على أيقونة القلب على أي عقار لحفظه ومراجعته أو مقارنته في أي وقت.'
              : 'Click the heart icon on any property card to save it for quick reference or comparison.'}
          </p>
          <Link
            to="/properties"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <span>{isAr ? 'استكشف دليل العقارات' : 'Explore Properties'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

    </div>
  );
};
