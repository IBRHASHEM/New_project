import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Heart,
  Scale,
  User,
  Globe,
  PlusCircle,
  Menu,
  X,
  LogOut,
  ChevronDown,
  PhoneCall
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    currency,
    setCurrency,
    favorites,
    compareList,
    user,
    logoutUser,
    openModal,
  } = useApp();

  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isAr = language === 'ar';

  const navLinks = [
    { name: isAr ? 'الرئيسية' : 'Home', path: '/' },
    { name: isAr ? 'العقارات' : 'Properties', path: '/properties' },
    { name: isAr ? 'المشاريع' : 'Projects', path: '/projects' },
    { name: isAr ? 'عن الشركة' : 'About Us', path: '/about' },
    { name: isAr ? 'تواصل معنا' : 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A192F] text-white border-b border-amber-500/20 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link id="nav-logo" to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-[#0A192F] stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white font-serif flex items-center gap-1.5">
                PRIME <span className="text-[#D4AF37] font-sans font-semibold">ESTATE</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-300 uppercase font-mono">
                {isAr ? 'عقارات مصرية فاخرة' : 'Editorial Real Estate'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-[#D4AF37] bg-white/10 border border-[#D4AF37]/30 shadow-sm'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Currency Selector */}
            <button
              id="nav-currency-toggle"
              onClick={() => setCurrency(currency === 'EGP' ? 'USD' : 'EGP')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 border border-slate-600 text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
              title={isAr ? 'تغيير العملة' : 'Switch Currency'}
            >
              {currency}
            </button>

            {/* Language Selector */}
            <button
              id="nav-language-toggle"
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 border border-slate-600 text-slate-200 hover:text-white hover:border-slate-400 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>

            {/* Compare Badge */}
            <Link
              id="nav-compare-link"
              to="/compare"
              className="relative p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              title={isAr ? 'مقارنة العقارات' : 'Compare Properties'}
            >
              <Scale className="w-5 h-5 text-slate-200" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4AF37] text-[#0A192F] font-bold text-[10px] flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Favorites Badge */}
            <Link
              id="nav-favorites-link"
              to="/favorites"
              className="relative p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              title={isAr ? 'العقارات المفضلة' : 'Saved Favorites'}
            >
              <Heart className="w-5 h-5 text-rose-300 fill-rose-400/20" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Auth or Profile */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-slate-700 hover:border-slate-500 text-sm font-medium"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-slate-100 max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown className="w-4 h-4 text-slate-300" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#0A192F] border border-slate-700 shadow-2xl py-2 z-50 text-sm">
                      <div className="px-4 py-2 border-b border-slate-800 text-xs text-slate-300">
                        {user.email}
                      </div>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logoutUser();
                        }}
                        className="w-full text-left px-4 py-2 text-rose-300 hover:bg-white/10 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{isAr ? 'تسجيل الخروج' : 'Log Out'}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  id="nav-login-btn"
                  onClick={() => openModal('login')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <User className="w-4 h-4 text-[#D4AF37]" />
                  <span>{isAr ? 'دخول' : 'Sign In'}</span>
                </button>
              )}
            </div>

            {/* List Your Property CTA */}
            <button
              id="nav-list-property-btn"
              onClick={() => openModal('list-property')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#c4a030] text-[#0A192F] font-bold text-xs uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>{isAr ? 'أضف عقارك' : 'List Property'}</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setCurrency(currency === 'EGP' ? 'USD' : 'EGP')}
              className="px-2 py-1 rounded bg-white/10 text-[#D4AF37] border border-slate-700 text-xs font-bold"
            >
              {currency}
            </button>
            <button
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              className="p-2 rounded bg-white/10 text-slate-200 text-xs font-medium"
            >
              {isAr ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0A192F] px-4 pt-4 pb-6 space-y-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-white/10 text-[#D4AF37] border border-[#D4AF37]/30'
                    : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-sm">
            <Link
              to="/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-rose-300 font-medium"
            >
              <Heart className="w-5 h-5 fill-rose-500/20" />
              <span>{isAr ? 'المفضلة' : 'Favorites'} ({favorites.length})</span>
            </Link>
            <Link
              to="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-[#D4AF37] font-medium"
            >
              <Scale className="w-5 h-5" />
              <span>{isAr ? 'المقارنة' : 'Compare'} ({compareList.length})</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {!user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal('login');
                }}
                className="w-full py-2.5 rounded-xl bg-white/10 border border-slate-700 text-slate-100 font-medium text-sm flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span>{isAr ? 'تسجيل الدخول / حساب جديد' : 'Sign In / Register'}</span>
              </button>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-slate-700">
                <span className="text-sm font-medium text-slate-100">{user.name}</span>
                <button
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-300 hover:underline"
                >
                  {isAr ? 'خروج' : 'Log Out'}
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('list-property');
              }}
              className="w-full py-3 rounded-xl bg-[#D4AF37] text-[#0A192F] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <PlusCircle className="w-5 h-5" />
              <span>{isAr ? 'أضف عقارك للبيع' : 'List Your Property'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('callback');
              }}
              className="w-full py-3 rounded-xl bg-white/10 text-slate-100 font-medium text-sm flex items-center justify-center gap-2 border border-slate-700"
            >
              <PhoneCall className="w-4 h-4 text-emerald-300" />
              <span>{isAr ? 'طلب اتصال هاتفى' : 'Request Callback'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
