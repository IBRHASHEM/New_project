import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { MapSection } from '../components/common/MapSection';
import { PropertyGallery } from '../components/common/PropertyGallery';
import { ALL_AMENITIES, MOCK_PROJECTS } from '../data/mockData';
import {
  Building,
  MapPin,
  Calendar,
  Layers,
  FileText,
  CheckCircle2,
  DollarSign,
  PhoneCall,
  Download,
  Award
} from 'lucide-react';

export const ProjectDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, formatPrice, openModal } = useApp();
  const isAr = language === 'ar';

  const project = MOCK_PROJECTS.find((p) => p.slug === slug || p.id === slug) || MOCK_PROJECTS[0];

  const name = isAr ? project.nameAr : project.nameEn;
  const developer = isAr ? project.developerAr : project.developerEn;
  const description = isAr ? project.descriptionAr : project.descriptionEn;

  const matchedAmenities = ALL_AMENITIES.filter((a) => project.amenities.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: isAr ? 'المشاريع' : 'Projects', path: '/projects' },
          { label: name },
        ]}
      />

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
        <div className="relative h-80 sm:h-96">
          <img src={project.heroImage} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="p-8 sm:p-10 -mt-20 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
                {project.status.toUpperCase().replace('-', ' ')}
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>{developer}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif">{name}</h1>

            <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{project.location.address}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openModal('brochure', { projectId: project.id, title: name })}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تحميل كراسة الشروط والكتالوج' : 'Download Master Brochure'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Specs Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white">
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-mono block">{isAr ? 'أسعار تبدأ من' : 'Starting From'}</span>
          <span className="text-xl font-extrabold text-amber-400 font-serif">{formatPrice(project.startingPriceEgp)}</span>
        </div>
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-mono block">{isAr ? 'تاريخ التسليم' : 'Delivery Date'}</span>
          <span className="text-lg font-bold text-slate-200 font-serif">{project.completionDate}</span>
        </div>
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-mono block">{isAr ? 'إجمالي الوحدات' : 'Total Units'}</span>
          <span className="text-lg font-bold text-slate-200 font-serif">{project.totalUnits} {isAr ? 'وحدة' : 'units'}</span>
        </div>
        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-mono block">{isAr ? 'المطور العقاري' : 'Developer'}</span>
          <span className="text-lg font-bold text-slate-200 font-serif">{developer}</span>
        </div>
      </div>

      {/* Gallery */}
      <PropertyGallery images={project.images} title={name} />

      {/* Units Table & Payment Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Overview */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold text-white font-serif border-b border-slate-800 pb-3">
              {isAr ? 'عن المشروع والماستر بلان' : 'Project Overview & Concept'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light whitespace-pre-line">
              {description}
            </p>
          </section>

          {/* Unit Types Breakdown */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white font-serif border-b border-slate-800 pb-3">
              {isAr ? 'أنواع الوحدات المتاحة والمساحات' : 'Available Unit Types & Floor Sizes'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-amber-400 font-mono uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">{isAr ? 'النوع' : 'Unit Type'}</th>
                    <th className="p-3.5">{isAr ? 'الغرف' : 'Bedrooms'}</th>
                    <th className="p-3.5">{isAr ? 'المساحة' : 'Area m²'}</th>
                    <th className="p-3.5">{isAr ? 'يبدأ من' : 'Starting Price'}</th>
                    <th className="p-3.5 rounded-r-xl">{isAr ? 'المتاح' : 'Available'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {project.units.map((unit, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3.5 font-bold text-white uppercase">{unit.type}</td>
                      <td className="p-3.5">{unit.bedrooms > 0 ? unit.bedrooms : '-'}</td>
                      <td className="p-3.5">{unit.areaSqmMin} - {unit.areaSqmMax} m²</td>
                      <td className="p-3.5 font-bold text-amber-400 font-serif">{formatPrice(unit.startingPriceEgp)}</td>
                      <td className="p-3.5 font-mono text-emerald-400 font-bold">{unit.availableCount} {isAr ? 'وحدة' : 'units'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Payment Plans */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white font-serif border-b border-slate-800 pb-3">
              {isAr ? 'أنظمة السداد والتقسيط' : 'Payment Plans & Installments'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.paymentPlans.map((plan, idx) => (
                <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-amber-400 font-serif">{plan.downPaymentPercent}%</span>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      {plan.installmentsYears} {isAr ? 'سنوات أقساط' : 'Years Plan'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-serif">
                    {isAr ? plan.notesAr : plan.notesEn}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {isAr ? `تاريخ الاستلام التقديري: ${plan.deliveryYear}` : `Target Delivery Year: ${plan.deliveryYear}`}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Map */}
          <MapSection location={project.location} title={name} />

        </div>

        {/* Right Sidebar CTA */}
        <aside className="space-y-6 sticky top-24">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl text-center">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono">
                {isAr ? 'حجز المشروع' : 'Official Sales'}
              </span>
              <h3 className="text-lg font-bold text-white font-serif">
                {isAr ? 'احجز وحدتك في المشروع الآن' : 'Reserve Unit or Schedule Visit'}
              </h3>
              <p className="text-xs text-slate-400">
                {isAr ? 'تواصل مع فريق مبيعات المشروع مباشرة للحصول على جدول الأسعار المحدث.' : 'Connect directly with certified development sales lead.'}
              </p>
            </div>

            <button
              onClick={() => openModal('brochure', { projectId: project.id, title: name })}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'طلب الكتالوج الرسمي' : 'Get Official Brochure'}</span>
            </button>

            <button
              onClick={() => openModal('viewing', { projectId: project.id, title: name })}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'تواصل مع المبيعات' : 'Contact Sales Team'}</span>
            </button>
          </div>
        </aside>

      </div>

    </div>
  );
};
