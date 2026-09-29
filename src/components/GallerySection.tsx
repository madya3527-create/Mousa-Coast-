import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { GALLERY_IMAGES } from '../data/resortData';
import { Image, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [filter, setFilter] = useState<string>('all');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const t = TRANSLATIONS[lang];

  const filteredImages = GALLERY_IMAGES.filter((img) => {
    if (filter === 'all') return true;
    if (filter === 'architecture') return img.category === 'architecture' || img.category === 'services';
    if (filter === 'beach') return img.category === 'beach';
    if (filter === 'pools') return img.category === 'pools';
    if (filter === 'rooms') return img.category === 'rooms';
    if (filter === 'gardens') return img.category === 'gardens' || img.category === 'activities';
    return true;
  });

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const nextImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % filteredImages.length);
  };

  const prevImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex(
      (activeImageIndex - 1 + filteredImages.length) % filteredImages.length
    );
  };

  return (
    <section id="gallery" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mb-3">
            <Image className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'ar' ? 'جولة مصورة حقيقية' : 'Authentic Photo Tour'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.navGallery}
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg leading-relaxed">
            {lang === 'ar'
              ? 'استكشف أجواء فندق موسى كوست ومرافقه الفاخرة من مسابح وشواطئ وشاليهات عبر عدسة الكاميرا.'
              : 'Explore the ambiance and facilities of Mousa Coast Resort from pools, private beaches, to chalets.'}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', ar: 'جميع الصور', en: 'All Photos' },
            { id: 'architecture', ar: 'الواجهة والمعمار', en: 'Facade & Architecture' },
            { id: 'beach', ar: 'الشاطئ الرملي', en: 'Sandy Beach' },
            { id: 'pools', ar: 'المسابح والأكوا بارك', en: 'Pools & Aqua' },
            { id: 'rooms', ar: 'الغرف والشقق', en: 'Rooms & Suites' },
            { id: 'gardens', ar: 'الحدائق والأنشطة', en: 'Gardens & Activities' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === cat.id
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-200/80 border border-stone-200'
              }`}
            >
              {lang === 'ar' ? cat.ar : cat.en}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-4/3 rounded-2xl overflow-hidden cursor-pointer bg-stone-200 border border-stone-200/60 shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={img.src}
                alt={lang === 'ar' ? img.titleAr : img.titleEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs sm:text-sm font-bold drop-shadow">
                  {lang === 'ar' ? img.titleAr : img.titleEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in">
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev / Next */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Image & Caption */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredImages[activeImageIndex].src}
              alt=""
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h4 className="text-lg font-bold">
                {lang === 'ar'
                  ? filteredImages[activeImageIndex].titleAr
                  : filteredImages[activeImageIndex].titleEn}
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                {activeImageIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
