import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Waves, Palmtree, ShieldCheck, Sun, Umbrella, LifeBuoy } from 'lucide-react';

interface AquaBeachSectionProps {
  lang: Language;
}

export const AquaBeachSection: React.FC<AquaBeachSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="aquabeach" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-3">
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'ar' ? 'سحر البحر والمسابح' : 'Beach & Poolside Paradise'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {t.aquaBeachTitle}
          </h2>
          <p className="mt-3 text-stone-300 text-base sm:text-lg leading-relaxed">
            {t.aquaBeachSubtitle}
          </p>
        </div>

        {/* Feature 1: Private Beach Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-2xl relative group aspect-16/10">
            <img
              src="/resort/home_1.jpg"
              alt="Mousa Coast Private Sandy Beach"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950 inline-block mb-2">
                {lang === 'ar' ? 'شاطئ رملي خاص 100%' : '100% Private Sandy Beach'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {lang === 'ar'
                  ? 'هدوء واسترخاء على ضفاف خليج السويس'
                  : 'Serenity & Relaxation along the Gulf of Suez'}
              </h3>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Palmtree className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {lang === 'ar' ? 'شاطئ رملي ناعم بمياه نقية' : 'Soft Sandy Shore with Crystal Waters'}
            </h3>
            <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed">
              {lang === 'ar'
                ? 'تمتع بالاسترخاء على شاطئنا الرملي الخاص، حيث يمكنك الاستمتاع بأشعة الشمس والسباحة في مياه البحر الزرقاء النقية. استمتع بأجواء ساحرة وذكريات لا تُنسى مع أحبائك بينما تشعر برمال الشاطئ الناعمة تحت قدميك، مع كبائن شاطئية ومشروبات منعشة أثناء غروب الشمس الساحر.'
                : 'Enjoy total peace on our private sandy beachfront. Walk barefoot on soft sands, swim in tranquil shallow waters safe for children, and witness spectacular Sinai sunsets over the water.'}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-xs sm:text-sm text-stone-300">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{lang === 'ar' ? 'شمس دافئة طوال العام' : 'Year-round Sun'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Umbrella className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{lang === 'ar' ? 'شماسي وكراسي تشمس' : 'Cabanas & Loungers'}</span>
              </div>
              <div className="flex items-center gap-2">
                <LifeBuoy className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'ar' ? 'منقذون معتمدون' : 'Certified Lifeguards'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{lang === 'ar' ? 'خصوصية وأمان تام' : 'Total Privacy & Safety'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Aqua Park & Swimming Pools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Aqua Park Card */}
          <div className="bg-stone-800/80 rounded-3xl p-6 sm:p-8 border border-stone-700/80 flex flex-col justify-between">
            <div>
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-6">
                <img
                  src="/resort/services_1.jpg"
                  alt="Aqua Park at Mousa Coast"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500 text-stone-950">
                  {lang === 'ar' ? 'ملاهي مائية' : 'Aqua Park'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {lang === 'ar'
                  ? 'أكوا بارك ممتعة وآمنة للأطفال والشباب'
                  : 'Thrilling & Safe Aqua Park for All'}
              </h3>
              <p className="mt-3 text-stone-300 text-sm leading-relaxed">
                {lang === 'ar'
                  ? 'تتميز أكوا بارك الأطفال لدينا بتوفير بيئة آمنة وممتعة، حيث يمكن للصغار الاستمتاع بمجموعة متنوعة من الزلاقات المائية، وألعاب الرشاشات المائية، لتجعل عطلتهم مليئة بالنشاط والبهجة والضحكات التي تدوم.'
                  : 'Equipped with multiple family slides, splash zones, and shallow wading pools monitored by trained lifeguards to ensure continuous joyous entertainment.'}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-700 flex items-center justify-between text-xs text-amber-400 font-bold">
              <span>{lang === 'ar' ? 'دخول مجاني لجميع نزلاء الفندق' : 'Complimentary For All Guests'}</span>
              <span>⭐⭐⭐⭐</span>
            </div>
          </div>

          {/* Swimming Pools Card */}
          <div className="bg-stone-800/80 rounded-3xl p-6 sm:p-8 border border-stone-700/80 flex flex-col justify-between">
            <div>
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-6">
                <img
                  src="/resort/home_0.jpg"
                  alt="Swimming Pools at Mousa Coast"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-stone-950">
                  {lang === 'ar' ? 'مسابح متعددة' : 'Multiple Pools'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {lang === 'ar'
                  ? 'حمامات سباحة واسعة ومجهزة بأعلى معايير النظافة'
                  : 'Expansive Swimming Pools with Spotless Cleanliness'}
              </h3>
              <p className="mt-3 text-stone-300 text-sm leading-relaxed">
                {lang === 'ar'
                  ? 'استمتع بحمامات السباحة الكبيرة في فندق موسى كوست، حيث يمكنك السباحة والاسترخاء تحت أشعة الشمس، مع مسابح خاصة للأطفال ومناطق شلالات اصطناعية تضفي لمسة من الجمال والهدوء.'
                  : 'Sprawling freshwater pools surrounded by shaded cabanas, sundecks, and dedicated children’s pools, constantly filtered and sanitized to highest international standards.'}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-700 flex items-center justify-between text-xs text-amber-400 font-bold">
              <span>{lang === 'ar' ? 'مفتوحة يومياً من الصباح حتى الغروب' : 'Open Daily Morning to Sunset'}</span>
              <span>🏊‍♂️🏊‍♀️</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
