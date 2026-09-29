import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { RESORT_CONTACT } from '../data/resortData';
import { Star, Clock, MessageCircle, ChevronDown, CheckCircle2, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const handleWhatsAppClick = () => {
    const defaultMsg =
      lang === 'ar'
        ? 'مرحباً، أود حجز إقامة في فندق موسى كوست والاستفسار عن العروض المتاحة'
        : 'Hello, I would like to book a stay at Mousa Coast Resort and inquire about current offers';
    window.open(`https://wa.me/${RESORT_CONTACT.primaryPhoneRaw}?text=${encodeURIComponent(defaultMsg)}`, '_blank');
  };

  return (
    <section id="home" className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background imagery with subtle dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/resort/facade.jpg"
          alt="Mousa Coast Resort Grand Architectural Facade & Entrance"
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/50" />
        <div className="absolute inset-0 bg-radial at-center from-transparent via-stone-950/20 to-stone-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Badges bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {t.heroBadge}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            {t.distancePill}
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-white/10 text-stone-200 border border-white/10 backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            {lang === 'ar' ? 'رأس سدر - خليج السويس' : 'Ras Sudr - Gulf of Suez'}
          </span>
        </div>

        {/* Main Title & Slogan */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight max-w-5xl mx-auto drop-shadow-md">
          {t.heroTitle}
        </h1>

        <p className="mt-3 text-xl sm:text-2xl font-bold text-amber-300 tracking-wide">
          « {t.tagline} »
        </p>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-stone-200 max-w-3xl mx-auto leading-relaxed font-normal drop-shadow">
          {t.heroSubtitle}
        </p>

        {/* Trust points */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-stone-300">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'ar' ? 'شاطئ رملي خاص بالكامل' : '100% Private Sandy Beach'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'ar' ? 'أكوا بارك ومسابح لجميع الأعمار' : 'Aqua Park & Multi-depth Pools'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'ar' ? 'ركوب خيل وسبا ومطاعم' : 'Horse Riding, Spa & Dining'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.directBookingGuarantee}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
          <button
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-base bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-xl shadow-emerald-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            <span>{t.bookViaWhatsApp}</span>
          </button>

          <a
            href="#pricing"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-base bg-amber-500/90 hover:bg-amber-400 text-stone-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-stone-950" />
            <span>{lang === 'ar' ? 'جدول الأسعار الرسمي' : 'Official Rate Card'}</span>
          </a>

          <a
            href="#accommodations"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-base bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{t.navRooms}</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
