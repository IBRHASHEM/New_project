import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/common/ProjectCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { MOCK_PROJECTS } from '../data/mockData';
import { Building, MapPin, Sparkles, SlidersHorizontal } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProjects = MOCK_PROJECTS.filter((proj) => {
    if (cityFilter && proj.location.city !== cityFilter) return false;
    if (statusFilter !== 'all' && proj.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      <Breadcrumbs items={[{ label: isAr ? 'المشاريع السكنية' : 'New Projects' }]} />

      {/* Hero Header */}
      <div className="bg-[#0A192F] text-white rounded-2xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden shadow-xl border border-amber-500/20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAr ? 'أحدث الكمبوندات والمجمعات السكنية بمصر' : 'Flagship Developments & Master Communities'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
          {isAr ? 'كمبوندات ومشاريع المطورين العقاريين' : 'Explore Featured Real Estate Projects'}
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
          {isAr
            ? 'تصفح أحدث المشروعات والمجمعات المتكاملة في التجمع الخامس، الشيخ زايد، العاصمة الإدارية والساحل الشمالي بأفضل أنظمة سداد.'
            : 'Discover flagship gated compounds by Hyde Park, Palm Hills, Mountain View, and TMG with extended installment plans.'}
        </p>

        {/* Filter Controls Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="bg-white/10 border border-slate-600 rounded-xl px-4 py-2.5 text-xs text-white font-semibold focus:outline-none cursor-pointer"
          >
            <option value="" className="bg-[#0A192F] text-white">{isAr ? 'جميع المناطق' : 'All Regions'}</option>
            <option value="New Cairo" className="bg-[#0A192F] text-white">New Cairo / القاهرة الجديدة</option>
            <option value="Sheikh Zayed" className="bg-[#0A192F] text-white">Sheikh Zayed / الشيخ زايد</option>
            <option value="New Capital" className="bg-[#0A192F] text-white">New Capital / العاصمة الإدارية</option>
            <option value="North Coast" className="bg-[#0A192F] text-white">North Coast / الساحل الشمالي</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/10 border border-slate-600 rounded-xl px-4 py-2.5 text-xs text-white font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-[#0A192F] text-white">{isAr ? 'جميع الحالات' : 'All Project Statuses'}</option>
            <option value="under-construction" className="bg-[#0A192F] text-white">{isAr ? 'قيد الإنشاء' : 'Under Construction'}</option>
            <option value="launching-soon" className="bg-[#0A192F] text-white">{isAr ? 'إطلاق قريب' : 'Launching Soon'}</option>
            <option value="delivered" className="bg-[#0A192F] text-white">{isAr ? 'جاهز للتسليم' : 'Delivered'}</option>
          </select>

        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

    </div>
  );
};
