import React from 'react';
import { Language } from '../types';
import { RESORT_STATS } from '../data/resortData';
import { Clock, Star, Home, Crown, Bed, Headphones } from 'lucide-react';

interface StatsSectionProps {
  lang: Language;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ lang }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-6 h-6 text-amber-500" />;
      case 'Star':
        return <Star className="w-6 h-6 text-amber-500 fill-amber-400" />;
      case 'Home':
        return <Home className="w-6 h-6 text-amber-500" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-amber-500" />;
      case 'Bed':
        return <Bed className="w-6 h-6 text-amber-500" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-amber-500" />;
      default:
        return <Star className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-stone-900/5 border border-stone-200/80 p-4 sm:p-6 lg:p-8 backdrop-blur-md">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
          {RESORT_STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center p-2 sm:p-3 ${
                idx !== 0 ? 'pt-4 sm:pt-3' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
                {getIcon(stat.icon)}
              </div>
              <div className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                {lang === 'ar' ? stat.valueAr : stat.valueEn}
              </div>
              <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
                {lang === 'ar' ? stat.labelAr : stat.labelEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
