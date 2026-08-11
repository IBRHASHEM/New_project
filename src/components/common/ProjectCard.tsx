import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { useApp } from '../../context/AppContext';
import { Building, MapPin, Calendar, Layers, FileText, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { language, formatPrice, openModal } = useApp();
  const isAr = language === 'ar';

  const name = isAr ? project.nameAr : project.nameEn;
  const developer = isAr ? project.developerAr : project.developerEn;

  const statusLabel =
    project.status === 'under-construction'
      ? isAr ? 'قيد الإنشاء' : 'Under Construction'
      : project.status === 'delivered'
      ? isAr ? 'جاهز للتسليم' : 'Delivered'
      : isAr ? 'إطلاق قريب' : 'Launching Soon';

  return (
    <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Project Image */}
        <div className="relative h-60 overflow-hidden bg-slate-100">
          <img
            src={project.heroImage}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Status Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md ${
              project.status === 'delivered'
                ? 'bg-emerald-600 text-white'
                : project.status === 'launching-soon'
                ? 'bg-indigo-600 text-white'
                : 'bg-[#D4AF37] text-[#0A192F]'
            }`}>
              {statusLabel}
            </span>
          </div>

          {/* Developer Badge */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-white">
              <Building className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{developer}</span>
            </div>
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-xs text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{project.location.city}</span>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-5 space-y-4">
          <Link to={`/projects/${project.slug}`} className="block group/title">
            <h3 className="text-lg font-bold text-[#0A192F] group-hover/title:text-[#C5A059] transition-colors font-serif">
              {name}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {isAr ? project.descriptionAr : project.descriptionEn}
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-slate-100 text-slate-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">{isAr ? 'موعد التسليم' : 'Delivery'}</span>
                <span className="font-semibold text-slate-800">{project.completionDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C5A059] shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">{isAr ? 'الوحدات المتاحة' : 'Available Units'}</span>
                <span className="font-semibold text-slate-800">{project.availableUnits} {isAr ? 'وحدة' : 'units'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Card Footer */}
      <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">{isAr ? 'يبدأ من' : 'Prices From'}</span>
          <span className="text-base font-extrabold text-[#0A192F] font-serif">
            {formatPrice(project.startingPriceEgp)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('brochure', { projectId: project.id, title: name })}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title={isAr ? 'تحميل البروشور' : 'Download Brochure'}
          >
            <FileText className="w-4 h-4" />
          </button>
          <Link
            to={`/projects/${project.slug}`}
            className="px-3.5 py-2 rounded-lg bg-[#0A192F] hover:bg-[#06101E] text-[#D4AF37] font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-sm transition-colors"
          >
            <span>{isAr ? 'عرض المشروع' : 'View'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
