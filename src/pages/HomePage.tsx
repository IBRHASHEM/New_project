import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HeroSearch } from '../components/common/HeroSearch';
import { PropertyCard } from '../components/common/PropertyCard';
import { ProjectCard } from '../components/common/ProjectCard';
import { MOCK_PROJECTS, MOCK_TESTIMONIALS, MOCK_STATS } from '../data/mockData';
import {
  ShieldCheck,
  Award,
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
  Star,
  Sparkles,
  PhoneCall,
  PlusCircle
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, properties, openModal } = useApp();
  const isAr = language === 'ar';

  const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 6);
  const featuredProjects = MOCK_PROJECTS.slice(0, 3);

  return (
    <div className="space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-12 pb-20 bg-[#0A192F] overflow-hidden">
        
        {/* Background Photography with Dark Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-[#0A192F]/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 mt-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'عقارات واعدة ومشاريع فاخرة بمصر' : 'Egypt’s Premier Real Estate Advisory'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white font-serif tracking-tight leading-tight">
            {isAr ? 'اعثر على المكان الذي تحب أن تسميه بيتك' : "Find a Place You'll Love to Call Home"}
          </h1>

          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-light">
            {isAr
              ? 'تصفح أرقى الفيلات، الشقق السكنية، والمشاريع الجديدة في القاهرة الجديدة، الشيخ زايد، العاصمة الإدارية، والساحل الشمالي.'
              : 'Discover ultra-luxury standalone villas, golf penthouses, and coastal residences across New Cairo, Sheikh Zayed, New Capital, and Ras El Hekma.'}
          </p>

          {/* Prominent Hero Search Panel */}
          <div className="pt-4">
            <HeroSearch />
          </div>

        </div>
      </section>

      {/* 2. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] font-mono">
              {isAr ? 'مجموعة حصرية' : 'Exclusive Portfolio'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-serif">
              {isAr ? 'عقارات مميزة مختارة بعناية' : 'Featured Luxury Properties'}
            </h2>
          </div>

          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0A192F] hover:text-[#C5A059] transition-colors"
          >
            <span>{isAr ? 'عرض جميع العقارات' : 'Explore All Properties'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 3. TRUST SECTION ("Why Choose Us?") */}
      <section className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] font-mono">
              {isAr ? 'لماذا تختار برايم إيستيت؟' : 'The Prime Estate Standard'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-serif">
              {isAr ? 'لماذا يثق بنا المستثمرون والمشترون؟' : 'Why Choose Prime Estate?'}
            </h2>
            <p className="text-sm text-slate-600">
              {isAr ? 'نلتزم بأعلى معايير الشفافية والموثوقية والاستشارات المخصصة' : 'Combining deep Egyptian market heritage with bespoke client consultations'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                icon: ShieldCheck,
                titleEn: '100% Verified Properties',
                titleAr: 'عقارات مفحوصة وموثوقة',
                descEn: 'Thorough legal ownership check for every property listed.',
                descAr: 'مراجعة أوراق الملكية والموقف القانوني لكل عقار.'
              },
              {
                icon: Users,
                titleEn: 'Experienced Consultants',
                titleAr: 'مستشارون متخصصون',
                descEn: 'Licensed advisors with deep regional development insights.',
                descAr: 'خبراء متخصصون في التجمع والشيخ زايد والساحل.'
              },
              {
                icon: Building2,
                titleEn: 'Trusted Developers',
                titleAr: 'أرقى المطورين العقاريين',
                descEn: 'Partnerships with Emaar, SODIC, Palm Hills, Mountain View.',
                descAr: 'شراكات مع كبرى شركات التطوير العقاري بمصر.'
              },
              {
                icon: Award,
                titleEn: 'Transparent Pricing',
                titleAr: 'أسعار رسمية وشفافة',
                descEn: 'Direct developer launch pricing without hidden commissions.',
                descAr: 'أسعار المطور الرسمية بدون أي خصومات وهمية.'
              },
              {
                icon: CheckCircle2,
                titleEn: 'Personalized Support',
                titleAr: 'دعم واستشارة مخصصة',
                descEn: 'End-to-end guidance from viewing to contract signing.',
                descAr: 'مرافقة قانونية واستثمارية حتى تسليم المفتاح.'
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#F8F9FA] p-6 rounded-xl border border-slate-200 space-y-4 hover:border-[#D4AF37] transition-all hover:-translate-y-1 shadow-sm"
              >
                <div className="p-3 rounded-lg bg-[#0A192F] text-[#D4AF37] inline-block">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#0A192F] font-serif">
                  {isAr ? feature.titleAr : feature.titleEn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr ? feature.descAr : feature.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] font-mono">
              {isAr ? 'مشاريع سكنية وتجارية' : 'Premier Master-Planned Developments'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-serif">
              {isAr ? 'أحدث الكمبوندات والمشاريع' : 'Featured Real Estate Projects'}
            </h2>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0A192F] hover:text-[#C5A059] transition-colors"
          >
            <span>{isAr ? 'استكشف جميع المشاريع' : 'View All Projects'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 5. STATS SECTION */}
      <section className="bg-[#0A192F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {MOCK_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#D4AF37] font-serif">
                {stat.value}{stat.suffix}
              </div>
              <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                {isAr ? stat.labelAr : stat.labelEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] font-mono">
            {isAr ? 'آراء العملاء والمستثمرين' : 'Client Success Stories'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-serif">
            {isAr ? 'ماذا يقول عملاؤنا؟' : 'Trusted by Discerning Buyers'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 flex flex-col justify-between shadow-md">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{isAr ? t.commentAr : t.commentEn}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <img src={t.avatar} alt={t.nameEn} className="w-12 h-12 rounded-xl object-cover border border-[#D4AF37]/50" />
                <div>
                  <h4 className="text-sm font-bold text-[#0A192F] font-serif">{isAr ? t.nameAr : t.nameEn}</h4>
                  <p className="text-xs text-[#C5A059]">{isAr ? t.roleAr : t.roleEn} • {isAr ? t.locationAr : t.locationEn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LEAD BANNER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-[#0A192F] p-8 sm:p-14 overflow-hidden shadow-2xl text-white flex flex-col lg:flex-row items-center justify-between gap-8 border border-amber-500/30">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#0A192F] font-mono text-xs font-bold uppercase tracking-widest inline-block">
              {isAr ? 'هل تملك عقاراً تريد بيعه؟' : 'Selling Your Luxury Property?'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">
              {isAr ? 'اعرض عقارك أمام آلاف المشترين والمستثمرين' : 'List Your Property with Egypt’s Top Advisory'}
            </h2>
            <p className="text-sm font-medium text-slate-300 leading-relaxed">
              {isAr
                ? 'نقدم تقييماً مجانياً وتصويراً احترافياً مع حملات تسويقية حصرية لعقارك.'
                : 'Get professional property valuation, high-end photography, and targeted buyer outreach.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <button
              onClick={() => openModal('list-property')}
              className="px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c4a030] text-[#0A192F] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isAr ? 'أضف عقارك الآن' : 'List Your Property'}</span>
            </button>
            <button
              onClick={() => openModal('callback')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-slate-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'طلب مكالمة هاتفية' : 'Request Callback'}</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
