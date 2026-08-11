import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowRight,
  Shield,
  Award,
  Users
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const isAr = language === 'ar';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast(isAr ? 'برجاء كتابة بريد إلكتروني صحيح' : 'Please enter a valid email', 'error');
      return;
    }
    showToast(isAr ? 'تم الاشتراك بنجاح في النشرة العقارية!' : 'Subscribed to luxury estate newsletter!', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#0A192F] text-slate-300 border-t border-amber-500/20 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="p-3 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {isAr ? 'عقارات موثوقة ومفحوصة' : '100% Verified Listings'}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                {isAr ? 'مراجعة قانونية كاملة لجميع الملكيات' : 'Thorough legal ownership & developer audit'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="p-3 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {isAr ? 'أفضل أسعار المطورين' : 'Guaranteed Best Developer Rates'}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                {isAr ? 'أسعار رسمية بدون عمولات إضافية' : 'Direct official developer pricing & launch discounts'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="p-3 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                {isAr ? 'استشارات عقارية مجانية' : 'Dedicated Property Consultants'}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                {isAr ? 'دعم مستمر وإرشاد مخصص لكل عميل' : 'Personalized support for home buyers & investors'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#0A192F] stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold text-white font-serif tracking-tight">
                PRIME <span className="text-[#D4AF37] font-sans font-semibold">ESTATE</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-300 pr-4">
              {isAr
                ? 'برايم إيستيت هي الشركة الرائدة في التسويق والاستشارات العقارية بمصر. نقدم حلولاً سكنية واستثمارية حصرية في القاهرة الجديدة، الشيخ زايد، العاصمة الإدارية، والساحل الشمالي.'
                : 'Prime Estate is Egypt’s premier luxury real estate advisory. We connect discerning buyers and investors with prime residential and commercial developments in New Cairo, Sheikh Zayed, New Capital, and North Coast.'}
            </p>
            
            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-200 block mb-2">
                {isAr ? 'اشترك في النشرة العقارية' : 'Subscribe to Market Intel'}
              </span>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={isAr ? 'البريد الإلكتروني' : 'Enter your email'}
                  className="bg-white/10 border border-slate-600 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#c4a030] text-[#0A192F] font-bold px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              {isAr ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/properties" className="hover:text-[#D4AF37] transition-colors">
                  {isAr ? 'جميع العقارات' : 'Browse All Properties'}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#D4AF37] transition-colors">
                  {isAr ? 'المشاريع الحصرية' : 'Featured Projects'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D4AF37] transition-colors">
                  {isAr ? 'عن الشركة' : 'Company Story'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">
                  {isAr ? 'تواصل مع فريق المبيعات' : 'Contact Sales Team'}
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-[#D4AF37] transition-colors">
                  {isAr ? 'مقارنة العقارات' : 'Property Comparison'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Locations */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              {isAr ? 'أبرز المناطق' : 'Prime Locations'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/properties?city=New+Cairo" className="hover:text-[#D4AF37] transition-colors">
                  {isAr ? 'القاهرة الجديدة - التجمع' : 'New Cairo - Fifth Settlement'}
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Sheikh+Zayed" className="hover:text-[#D4AF37] transition-colors">
                  {isAr ? 'الشيخ زايد وغرب القاهرة' : 'Sheikh Zayed & West Cairo'}
                </Link>
              </li>
              <li>
                <Link to="/properties?city=New+Capital" className="hover:text-[#D4AF37] transition-colors">
                  {isAr ? 'العاصمة الإدارية الجديدة' : 'New Administrative Capital'}
                </Link>
              </li>
              <li>
                <Link to="/properties?city=North+Coast" className="hover:text-[#D4AF37] transition-colors">
                  {isAr ? 'الساحل الشمالي - رأس الحكمة' : 'North Coast - Ras El Hekma'}
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Ain+Sokhna" className="hover:text-[#D4AF37] transition-colors">
                  {isAr ? 'العين السخنة والجلالة' : 'Ain Sokhna & Galala'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              {isAr ? 'المقر الرئيسي' : 'Headquarters'}
            </h4>
            <div className="space-y-2.5 text-xs leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? 'المربع الذهبي، شارع التسعين الجنوبي، التجمع الخامس، القاهرة'
                    : 'Golden Square, South 90th St, Fifth Settlement, New Cairo'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span dir="ltr">+20 100 123 4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>sales@primeestate.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{isAr ? 'الأحد - الخميس: 9:00 ص - 8:00 م' : 'Sun - Thu: 9:00 AM - 8:00 PM'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Prime Estate Egypt. {isAr ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-200 cursor-pointer">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
            <span className="hover:text-slate-200 cursor-pointer">{isAr ? 'الشروط والأحكام' : 'Terms of Service'}</span>
            <span className="hover:text-slate-200 cursor-pointer">{isAr ? 'خريطة الموقع' : 'Sitemap'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
