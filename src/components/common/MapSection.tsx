import React, { useState } from 'react';
import { LocationInfo } from '../../types';
import { useApp } from '../../context/AppContext';
import { MapPin, School, Hospital, ShoppingBag, Bus, Navigation, Layers, ZoomIn, ZoomOut } from 'lucide-react';

interface MapSectionProps {
  location: LocationInfo;
  title?: string;
}

export const MapSection: React.FC<MapSectionProps> = ({ location, title }) => {
  const { language } = useApp();
  const isAr = language === 'ar';
  const [activePoiFilter, setActivePoiFilter] = useState<'all' | 'school' | 'hospital' | 'mall' | 'transport'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(14);

  const nearby = location.nearbyPlaces || [
    { name: isAr ? 'الجامعة الأمريكية بالقاهرة' : 'American University in Cairo (AUC)', type: 'school' as const, distance: '5 mins' },
    { name: isAr ? 'مستشفى الجوي التخصصي' : 'Air Force Hospital', type: 'hospital' as const, distance: '8 mins' },
    { name: isAr ? 'كايرو فستيفال سيتي مول' : 'Cairo Festival City Mall', type: 'mall' as const, distance: '10 mins' },
    { name: isAr ? 'محطة المونوريل المركزية' : 'Monorail Central Station', type: 'transport' as const, distance: '6 mins' },
  ];

  const filteredPois = nearby.filter((p) => activePoiFilter === 'all' || p.type === activePoiFilter);

  const getPoiIcon = (type: string) => {
    switch (type) {
      case 'school':
        return <School className="w-3.5 h-3.5 text-blue-400" />;
      case 'hospital':
        return <Hospital className="w-3.5 h-3.5 text-rose-400" />;
      case 'mall':
        return <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />;
      case 'transport':
        return <Bus className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-0">
      
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{isAr ? 'الموقع والمعالم القريبة' : 'Location & Nearby Landmarks'}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {location.address} ({location.district}, {location.city})
          </p>
        </div>

        {/* POI Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActivePoiFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              activePoiFilter === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'الكل' : 'All'}
          </button>
          <button
            onClick={() => setActivePoiFilter('school')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              activePoiFilter === 'school' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'مدارس' : 'Schools'}
          </button>
          <button
            onClick={() => setActivePoiFilter('hospital')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              activePoiFilter === 'hospital' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'مستشفيات' : 'Hospitals'}
          </button>
          <button
            onClick={() => setActivePoiFilter('mall')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              activePoiFilter === 'mall' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'مولات' : 'Malls'}
          </button>
        </div>
      </div>

      {/* Map Canvas Visualizer */}
      <div className="relative h-96 bg-slate-950 overflow-hidden group">
        
        {/* Stylized Grid Map Pattern */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(#f59e0b 1px, transparent 1px), radial-gradient(#1e293b 1px, #020617 1px)`,
            backgroundSize: `${zoomLevel * 3}px ${zoomLevel * 3}px`,
            backgroundPosition: '0 0, 10px 10px',
          }}
        />

        {/* Contour/Road Overlay Graphics */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50 100 Q 200 40, 400 250 T 800 180 T 1200 350" fill="none" stroke="#f59e0b" strokeWidth="3" />
          <path d="M 100 -50 Q 250 200, 300 450" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M 500 -50 L 500 450" fill="none" stroke="#64748b" strokeWidth="1.5" />
        </svg>

        {/* Center Main Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 group/pin cursor-pointer">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-12 h-12 rounded-full bg-amber-500/20 animate-ping" />
            <div className="relative p-3 rounded-2xl bg-amber-500 text-slate-950 font-bold shadow-2xl shadow-amber-500/50 flex items-center gap-2 border-2 border-slate-950">
              <MapPin className="w-5 h-5 stroke-[2.5]" />
              <span className="text-xs font-serif font-extrabold whitespace-nowrap">
                {title || (isAr ? 'موقع العقار' : 'Property Location')}
              </span>
            </div>
          </div>
        </div>

        {/* Nearby POI Markers */}
        <div className="absolute inset-0 p-8 pointer-events-none">
          <div className="relative w-full h-full">
            {filteredPois.map((poi, idx) => {
              const offsets = [
                { top: '20%', left: '25%' },
                { top: '25%', right: '20%' },
                { bottom: '25%', left: '30%' },
                { bottom: '20%', right: '25%' },
              ];
              const pos = offsets[idx % offsets.length];

              return (
                <div
                  key={poi.name}
                  style={pos}
                  className="absolute pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 shadow-xl backdrop-blur-md hover:scale-105 transition-transform"
                >
                  {getPoiIcon(poi.type)}
                  <span className="font-medium text-[11px] truncate max-w-[140px]">{poi.name}</span>
                  <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-1.5 py-0.5 rounded">
                    {poi.distance}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Map Controls Floating Right */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-30">
          <button
            onClick={() => setZoomLevel((z) => Math.min(20, z + 2))}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-lg"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(8, z - 2))}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-lg"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-lg font-bold"
            title={isAr ? 'فتح في خرائط جوجل' : 'Open in Google Maps'}
          >
            <Navigation className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Nearby Places List Footer */}
      <div className="p-6 bg-slate-950/60 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nearby.map((poi) => (
          <div key={poi.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="p-2 rounded-lg bg-slate-800 shrink-0">
              {getPoiIcon(poi.type)}
            </div>
            <div className="overflow-hidden">
              <h5 className="text-xs font-semibold text-slate-200 truncate">{poi.name}</h5>
              <span className="text-[10px] text-amber-400 font-mono">{poi.distance} {isAr ? 'قيادة' : 'drive'}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
