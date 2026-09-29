import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { REVIEWS_DATA } from '../data/resortData';
import { Star, MessageSquareQuote, CheckCircle, ThumbsUp } from 'lucide-react';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="reviews" className="py-20 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-3">
            <ThumbsUp className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'ar' ? 'ثقة ورضا النزلاء' : 'Guest Trust & Satisfaction'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.reviewsTitle}
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.reviewsSubtitle}
          </p>
        </div>

        {/* Overall Rating Banner */}
        <div className="max-w-2xl mx-auto mb-12 bg-white rounded-2xl p-6 shadow-sm border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-black text-amber-500">4.8</div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-500 mt-1">
                {lang === 'ar' ? 'بناءً على أكثر من 340 تقييم من النزلاء' : 'Based on over 340 verified guest stays'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ar' ? 'تقييمات موثقة 100%' : '100% Verified Guests'}</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((rev) => {
            const comment = lang === 'ar' ? rev.commentAr : rev.commentEn;
            const city = lang === 'ar' ? rev.cityAr : rev.cityEn;
            const unit = lang === 'ar' ? rev.unitTypeAr : rev.unitTypeEn;
            const date = lang === 'ar' ? rev.dateAr : rev.dateEn;

            return (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-lg transition-shadow border border-stone-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-stone-400">{date}</span>
                  </div>

                  <p className="text-stone-700 text-sm leading-relaxed relative">
                    « {comment} »
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{rev.name}</h4>
                    <span className="text-xs text-stone-500">{city}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg">
                    {unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
