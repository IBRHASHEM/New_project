import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Home, ChevronRight, ChevronLeft } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { language } = useApp();
  const isAr = language === 'ar';
  const ChevronIcon = isAr ? ChevronLeft : ChevronRight;

  return (
    <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 py-3 overflow-x-auto whitespace-nowrap">
      <Link to="/" className="flex items-center gap-1 hover:text-[#C5A059] transition-colors shrink-0">
        <Home className="w-3.5 h-3.5 text-[#0A192F]" />
        <span>{isAr ? 'الرئيسية' : 'Home'}</span>
      </Link>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {item.path ? (
            <Link to={item.path} className="hover:text-[#C5A059] transition-colors shrink-0">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#C5A059] font-semibold truncate max-w-xs">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
