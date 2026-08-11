import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, Maximize2, X, Image as ImageIcon } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const { language } = useApp();
  const isAr = language === 'ar';
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const safeImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80'
  ];

  const nextImg = () => setActiveIdx((prev) => (prev + 1) % safeImages.length);
  const prevImg = () => setActiveIdx((prev) => (prev - 1 + safeImages.length) % safeImages.length);

  return (
    <div className="space-y-4">
      {/* Main Image Banner */}
      <div className="relative h-[400px] sm:h-[520px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group shadow-2xl">
        <img
          src={safeImages[activeIdx]}
          alt={`${title} - image ${activeIdx + 1}`}
          className="w-full h-full object-cover transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Counter Badge */}
        <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-amber-400 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>{activeIdx + 1} / {safeImages.length}</span>
        </div>

        {/* Lightbox Expand CTA */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-slate-200 transition-colors shadow-lg"
          title={isAr ? 'عرض الصور ملء الشاشة' : 'Fullscreen Lightbox'}
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Carousel Arrows */}
        {safeImages.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button
              onClick={prevImg}
              className="pointer-events-auto p-3 rounded-full bg-slate-950/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImg}
              className="pointer-events-auto p-3 rounded-full bg-slate-950/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {safeImages.map((img, idx) => (
            <button
              key={img + idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                activeIdx === idx
                  ? 'border-amber-400 scale-95 shadow-lg shadow-amber-500/20'
                  : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-700'
              }`}
            >
              <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8">
          
          {/* Lightbox Header */}
          <div className="w-full max-w-7xl flex items-center justify-between text-white border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-serif font-bold text-lg text-amber-400">{title}</span>
              <span className="text-xs text-slate-400 font-mono">({activeIdx + 1} / {safeImages.length})</span>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Main View */}
          <div className="relative max-w-5xl w-full h-[65vh] flex items-center justify-center my-auto">
            <img
              src={safeImages[activeIdx]}
              alt="Lightbox View"
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />

            {safeImages.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white transition-colors shadow-2xl"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white transition-colors shadow-2xl"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Thumbnails */}
          <div className="w-full max-w-4xl flex items-center justify-center gap-2 overflow-x-auto py-2">
            {safeImages.map((img, idx) => (
              <button
                key={`lb-${img}-${idx}`}
                onClick={() => setActiveIdx(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  activeIdx === idx ? 'border-amber-400 scale-105' : 'border-slate-800 opacity-50'
                }`}
              >
                <img src={img} alt="LB Thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};
