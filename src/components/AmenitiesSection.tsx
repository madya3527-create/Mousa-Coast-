import React, { useState } from 'react';
import { Language, Amenity } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { AMENITIES_DATA } from '../data/resortData';
import {
  Sparkles,
  Palmtree,
  Waves,
  Droplets,
  Compass,
  Utensils,
  Smile,
  Trees,
  Users,
  Clock,
  ChevronRight,
  X,
} from 'lucide-react';

interface AmenitiesSectionProps {
  lang: Language;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ lang }) => {
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const t = TRANSLATIONS[lang];

  const getIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5' };
    switch (iconName) {
      case 'Palmtree':
        return <Palmtree {...props} />;
      case 'Waves':
        return <Waves {...props} />;
      case 'Droplets':
        return <Droplets {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      case 'Utensils':
        return <Utensils {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Smile':
        return <Smile {...props} />;
      case 'Trees':
        return <Trees {...props} />;
      case 'Users':
        return <Users {...props} />;
      case 'Clock':
        return <Clock {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <section id="amenities" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'ar' ? 'مرافق وخدمات متكاملة' : 'Integrated Resort Facilities'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.amenitiesTitle}
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.amenitiesSubtitle}
          </p>
        </div>

        {/* Grid of Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {AMENITIES_DATA.map((amenity) => {
            const title = lang === 'ar' ? amenity.titleAr : amenity.titleEn;
            const desc = lang === 'ar' ? amenity.descAr : amenity.descEn;
            const tag = lang === 'ar' ? amenity.tagAr : amenity.tagEn;

            return (
              <div
                key={amenity.id}
                onClick={() => setSelectedAmenity(amenity)}
                className="group cursor-pointer rounded-2xl bg-stone-50 hover:bg-white border border-stone-200/80 hover:border-amber-400 p-5 sm:p-6 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-4 bg-stone-100">
                    <img
                      src={amenity.image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-stone-950/80 text-amber-300 backdrop-blur-xs">
                      {tag}
                    </span>
                  </div>

                  {/* Header Title with Icon */}
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors">
                      {getIcon(amenity.icon)}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-600 transition-colors leading-snug">
                      {title}
                    </h3>
                  </div>

                  {/* Short text */}
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:text-amber-700">
                  <span>{lang === 'ar' ? 'قراءة المزيد' : 'Read more'}</span>
                  <ChevronRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Amenity Modal */}
      {selectedAmenity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-stone-200 p-6 sm:p-8">
            <button
              onClick={() => setSelectedAmenity(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-6">
              <img
                src={selectedAmenity.image}
                alt={lang === 'ar' ? selectedAmenity.titleAr : selectedAmenity.titleEn}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-3 px-3 py-1 rounded-lg text-xs font-bold bg-amber-500 text-stone-950 shadow">
                {lang === 'ar' ? selectedAmenity.tagAr : selectedAmenity.tagEn}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                {getIcon(selectedAmenity.icon)}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                {lang === 'ar' ? selectedAmenity.titleAr : selectedAmenity.titleEn}
              </h3>
            </div>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {lang === 'ar' ? selectedAmenity.descAr : selectedAmenity.descEn}
            </p>

            <div className="mt-8 pt-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedAmenity(null)}
                className="py-2.5 px-6 rounded-xl font-bold text-sm bg-stone-900 hover:bg-stone-800 text-white transition-colors"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
