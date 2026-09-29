import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { RESORT_CONTACT } from '../data/resortData';
import { MapPin, Navigation, Car, Clock, ShieldCheck, ExternalLink } from 'lucide-react';

interface LocationSectionProps {
  lang: Language;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'ar' ? 'أقرب منتجع متكامل للبحر الأحمر' : 'Closest Red Sea Resort to Cairo'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.locationTitle}
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.locationSubtitle}
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200">
          {/* Details Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>{t.cairoDistanceText}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 leading-snug">
              {lang === 'ar'
                ? 'سهولة الوصول من القاهرة في ساعة ونصف فقط دون عناء السفر الطويل'
                : 'Effortless 90-Minute Drive from Cairo without Travel Exhaustion'}
            </h3>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {lang === 'ar'
                ? 'يقع فندق موسى كوست على بعد 90 دقيقة فقط من القاهرة في موقع استراتيجي على ساحل البحر، حيث يتيح لك الوصول بسهولة إلى أجمل الشواطئ والمناطق السياحية القريبة. بعيدًا عن صخب المدينة، يمكنك الاستمتاع بأجواء هادئة ومريحة تحيط بها الطبيعة الخلابة.'
                : 'Mousa Coast Resort is situated in a strategic coastal sanctuary in Ras Sudr, South Sinai. A straightforward highway journey makes it the prime vacation destination for Cairo weekenders and holidaymakers.'}
            </p>

            {/* Travel Times Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 text-center">
                <span className="text-xs text-stone-500 block mb-1">
                  {lang === 'ar' ? 'من التجمع والقاهرة الجديدة' : 'From New Cairo'}
                </span>
                <span className="text-lg font-black text-amber-600">85 {lang === 'ar' ? 'دقيقة' : 'mins'}</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 text-center">
                <span className="text-xs text-stone-500 block mb-1">
                  {lang === 'ar' ? 'من مدينة نصر ومصر الجديدة' : 'From Heliopolis'}
                </span>
                <span className="text-lg font-black text-amber-600">90 {lang === 'ar' ? 'دقيقة' : 'mins'}</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200 text-center">
                <span className="text-xs text-stone-500 block mb-1">
                  {lang === 'ar' ? 'من مدينة السويس' : 'From Suez'}
                </span>
                <span className="text-lg font-black text-amber-600">40 {lang === 'ar' ? 'دقيقة' : 'mins'}</span>
              </div>
            </div>

            {/* Driving Route Steps */}
            <div className="space-y-2 text-xs sm:text-sm text-stone-700 bg-white p-4 rounded-2xl border border-stone-200">
              <div className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-amber-500" />
                <span>{lang === 'ar' ? 'مسار الطريق الموصى به:' : 'Recommended Driving Route:'}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600">
                <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <span>{lang === 'ar' ? 'سلك طريق القاهرة - السويس السريع' : 'Take Cairo - Suez Highway'}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600">
                <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <span>{lang === 'ar' ? 'عبور نفق الشهيد أحمد حمدي إلى شبه جزيرة سيناء' : 'Cross Ahmed Hamdi Tunnel to Sinai'}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600">
                <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <span>{lang === 'ar' ? 'التحرك جنوباً على طريق رأس سدر الساحلي وصولاً لبوابة موسى كوست' : 'Drive South towards Ras Sudr directly to Mousa Coast Gate'}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={RESORT_CONTACT.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm transition-colors"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>{lang === 'ar' ? 'فتح الموقع في Google Maps' : 'Open in Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <div className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ar' ? 'مواقف سيارات آمنة ومجانية 24/7' : 'Free 24/7 Secure Parking'}</span>
              </div>
            </div>
          </div>

          {/* Visual Map Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 bg-stone-900 border border-stone-300">
              <img
                src="/resort/home_7.jpg"
                alt="Mousa Coast Resort Location Map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950 w-fit mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  {lang === 'ar' ? 'رأس سدر، محافظة جنوب سيناء' : 'Ras Sudr, South Sinai'}
                </span>
                <h4 className="text-xl sm:text-2xl font-black">
                  {lang === 'ar' ? 'منتجع وفندق موسى كوست' : 'Mousa Coast Resort & Hotel'}
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 mt-1">
                  {lang === 'ar' ? RESORT_CONTACT.locationAr : RESORT_CONTACT.locationEn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
