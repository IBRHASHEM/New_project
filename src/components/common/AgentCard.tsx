import React from 'react';
import { Agent } from '../../types';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MessageSquare, Star, Award } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const { language, openModal } = useApp();
  const isAr = language === 'ar';

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hello ${agent.name}, I would like to consult regarding property opportunities.`);
    window.open(`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={agent.image}
              alt={agent.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/30"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
              <Award className="w-3 h-3 text-slate-950" />
            </span>
          </div>

          <div>
            <h4 className="text-base font-bold text-white font-serif">{agent.name}</h4>
            <p className="text-xs text-amber-400 font-medium mt-0.5">{agent.title}</p>
            
            <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold">{agent.rating}</span>
              </div>
              <span>({agent.reviewCount} {isAr ? 'تقييم' : 'reviews'})</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300 font-mono">{agent.propertiesCount} {isAr ? 'عقار' : 'listings'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {agent.languages.map((lang) => (
            <span
              key={lang}
              className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-medium text-slate-400 border border-slate-700/60"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-6 mt-4 border-t border-slate-800">
        <a
          href={`tel:${agent.phone}`}
          className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
          title="Call Agent"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>{isAr ? 'اتصال' : 'Call'}</span>
        </a>

        <button
          onClick={handleWhatsApp}
          className="py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          title="WhatsApp Chat"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={() => openModal('viewing', { agentId: agent.id, title: `Consultation with ${agent.name}` })}
          className="py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
          title="Book Meeting"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>{isAr ? 'حجز' : 'Book'}</span>
        </button>
      </div>
    </div>
  );
};
