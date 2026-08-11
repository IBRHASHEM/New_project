import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AgentCard } from '../components/common/AgentCard';
import { MOCK_AGENTS, MOCK_STATS } from '../data/mockData';
import {
  Building2,
  ShieldCheck,
  Award,
  Users,
  Target,
  Compass,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      <Breadcrumbs items={[{ label: isAr ? 'عن الشركة' : 'About Us' }]} />

      {/* Hero */}
      <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-16 text-center space-y-6 overflow-hidden shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAr ? 'قصة نجاح برايم إيستيت' : 'Our Legacy & Vision'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif tracking-tight">
          {isAr ? 'قادة الاستشارات والعقارات الفاخرة بمصر' : 'Pioneering Luxury Real Estate Advisory'}
        </h1>

        <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
          {isAr
            ? 'تأسست برايم إيستيت لتلبي تطلعات المشترين والمستثمرين الباحثين عن التميز والشفافية. نربطك بأجود المجمعات السكنية والتجارية عبر أفضل شركات التطوير العقاري بمصر.'
            : 'Prime Estate was established to redefine real estate advisory in Egypt. We represent top-tier developer compounds and standalone residences across New Cairo, West Cairo, and coastal hubs.'}
        </p>
      </div>

      {/* Animated Stats */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center shadow-xl">
        {MOCK_STATS.map((stat, idx) => (
          <div key={idx} className="space-y-2 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-4xl sm:text-5xl font-extrabold text-amber-400 font-serif">
              {stat.value}{stat.suffix}
            </div>
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {isAr ? stat.labelAr : stat.labelEn}
            </p>
          </div>
        ))}
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 shadow-xl">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 inline-block">
            <Target className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white font-serif">{isAr ? 'رؤيتنا' : 'Our Vision'}</h3>
          <p className="text-sm text-slate-300 leading-relaxed font-light">
            {isAr
              ? 'أن نكون الخيار الأول والشركة الأجدر بالثقة في الاستشارات العقارية بمصر والشرق الأوسط، من خلال تقديم خدمات استشارية دقيقة وشفافة تحقق أعلى عوائد استثمارية لعملائنا.'
              : 'To be the most trusted luxury real estate advisory firm in Egypt and the region, renowned for unwavering ethics, verified portfolios, and maximum investment yields for our clients.'}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 shadow-xl">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 inline-block">
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white font-serif">{isAr ? 'رسالتنا' : 'Our Mission'}</h3>
          <p className="text-sm text-slate-300 leading-relaxed font-light">
            {isAr
              ? 'تزويد المشترين والمستثمرين بالمعرفة الشاملة، والفرص الحقيقية، والحلول السكنية والتمويلية المخصصة التي تحول عملية شراء العقار إلى تجربة ممتعة وآمنة تماماً.'
              : 'Empowering home buyers and institutional investors with uncompromised market intelligence, transparent valuations, and seamless closing experiences from initial tour to key handover.'}
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">
            {isAr ? 'فريق العمل' : 'Our Leadership'}
          </span>
          <h2 className="text-3xl font-extrabold text-white font-serif">
            {isAr ? 'مستشارونا العقاريون المعتمدون' : 'Meet Our Senior Property Consultants'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_AGENTS.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

    </div>
  );
};
