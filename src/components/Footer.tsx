import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { RESORT_CONTACT } from '../data/resortData';
import { Sparkles, Phone, MessageCircle, MapPin, Heart, Mail } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-black shadow-md">
                <Sparkles className="w-5 h-5 text-stone-950 fill-stone-950" />
              </div>
              <div>
                <span className="text-lg font-black text-white">{t.brandName}</span>
                <p className="text-xs text-amber-400 font-medium">{t.brandSub}</p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {lang === 'ar'
                ? 'فندق ومنتجع موسى كوست - رأس سدر. إحدى مشروعات شركة موسى كوست للتنمية والتطوير السياحي. حيث تلتقي الراحة بالجمال وسط الطبيعة الخلابة لساحل البحر الأحمر وعلى بعد 90 دقيقة فقط من القاهرة.'
                : 'Mousa Coast Resort - Ras Sudr. A flagship project by Mousa Coast Developments. Where comfort meets beauty along the Red Sea coast, just 90 minutes from Cairo.'}
            </p>

            <div className="text-xs text-amber-400 font-bold">
              ⭐⭐⭐⭐ {t.heroBadge}
            </div>
          </div>

          {/* Quick Nav Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {lang === 'ar' ? 'أقسام الموقع' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">
                  {t.navHome}
                </a>
              </li>
              <li>
                <a href="#accommodations" className="hover:text-amber-400 transition-colors">
                  {t.navRooms}
                </a>
              </li>
              <li>
                <a href="#aquabeach" className="hover:text-amber-400 transition-colors">
                  {t.navAquaBeach}
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-amber-400 transition-colors">
                  {t.navAmenities}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-400 transition-colors">
                  {t.navPricing}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  {t.navCalculator}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">
                  {t.navGallery}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Numbers & Official Email */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {lang === 'ar' ? 'أرقام الحجوزات والإيميل' : 'Bookings & Executive Email'}
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={`https://wa.me/${RESORT_CONTACT.primaryPhoneRaw}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-stone-300 hover:text-emerald-400 transition-colors group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span dir="ltr" className="font-semibold">
                  {RESORT_CONTACT.primaryPhoneDisplay} (واتساب 1)
                </span>
              </a>

              <a
                href={`https://wa.me/${RESORT_CONTACT.secondaryPhoneRaw}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-stone-300 hover:text-emerald-400 transition-colors group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span dir="ltr" className="font-semibold">
                  {RESORT_CONTACT.secondaryPhoneDisplay} (واتساب 2)
                </span>
              </a>

              <a
                href={`mailto:${RESORT_CONTACT.email}`}
                className="flex items-center gap-2 text-amber-300 hover:text-white transition-colors pt-1 font-mono text-[11px]"
                dir="ltr"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{RESORT_CONTACT.email}</span>
              </a>

              <div className="pt-2 text-stone-400">
                <span className="block text-[11px] text-stone-500 mb-0.5">
                  {lang === 'ar' ? 'ساعات العمل والحجوزات:' : 'Working Hours:'}
                </span>
                <span className="font-bold text-amber-400">{t.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Address & Travel Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {lang === 'ar' ? 'العنوان والمسافة' : 'Address & Access'}
            </h4>
            <p className="text-xs text-stone-400 flex items-start gap-2 leading-relaxed mb-3">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{lang === 'ar' ? RESORT_CONTACT.locationAr : RESORT_CONTACT.locationEn}</span>
            </p>

            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-[11px] text-stone-400">
              <span className="text-amber-400 font-bold block mb-1">
                🚗 {lang === 'ar' ? 'طريق الوصول السريع:' : 'Express Route:'}
              </span>
              <span>
                {lang === 'ar'
                  ? 'طريق القاهرة السويس -> نفق الشهيد أحمد حمدي -> رأس سدر (90 دقيقة فقط)'
                  : 'Cairo-Suez Highway -> Ahmed Hamdi Tunnel -> Ras Sudr (90 mins)'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>{t.rightsReserved}</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>{t.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
