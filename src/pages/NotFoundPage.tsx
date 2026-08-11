import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Home, Search, AlertCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
        <AlertCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-4xl font-extrabold text-white font-serif">404 - Page Not Found</h1>
        <p className="text-sm text-slate-400">
          {isAr
            ? 'عفواً، الصفحة أو العقار المطلوبة غير موجودة أو قد تكون أزيلت.'
            : 'The property page or link you requested could not be found.'}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Home className="w-4 h-4" />
          <span>{isAr ? 'العودة للرئيسية' : 'Return Home'}</span>
        </Link>
        <Link
          to="/properties"
          className="px-6 py-3 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
        >
          <Search className="w-4 h-4 text-amber-400" />
          <span>{isAr ? 'دليل العقارات' : 'Search Properties'}</span>
        </Link>
      </div>
    </div>
  );
};
