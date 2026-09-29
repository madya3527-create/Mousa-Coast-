import React, { useState } from 'react';
import { Language, Room } from '../types';
import { ROOMS_DATA, RESORT_CONTACT, BANK_DETAILS } from '../data/resortData';
import {
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Calculator,
  Copy,
  Check,
  ShieldCheck,
  Info,
  Calendar,
  Users,
  Maximize,
  ArrowUpDown,
  Building2,
  Home,
  Crown,
  Phone,
  Mail,
} from 'lucide-react';

interface PricingTableSectionProps {
  lang: Language;
  onSelectRoomForBooking?: (roomId: string) => void;
}

export const PricingTableSection: React.FC<PricingTableSectionProps> = ({
  lang,
  onSelectRoomForBooking,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'hotel' | 'rental'>('all');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [showSeasonDetails, setShowSeasonDetails] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (filterType === 'all') return true;
    return room.unitType === filterType;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
    if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
    return 0;
  });

  const handleBookOnWhatsApp = (room: Room) => {
    const title = lang === 'ar' ? room.titleAr : room.titleEn;
    const msg =
      lang === 'ar'
        ? `مرحباً، أود تأكيد حجز (${title}) بسعر ${room.pricePerNight.toLocaleString()} ج.م / ليلة وفق جدول الأسعار الرسمي لمنتجع موسى كوست. هل متوفر في التواريخ القادمة؟`
        : `Hello, I would like to book (${title}) at ${room.pricePerNight.toLocaleString()} EGP/night as per Mousa Coast official price list. Is it available for upcoming dates?`;
    window.open(
      `https://wa.me/${RESORT_CONTACT.primaryPhoneRaw}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  const handleCopyRatesSummary = () => {
    const header =
      lang === 'ar'
        ? `📋 *قائمة الأسعار الرسمية المعتمدة لعام 2026 - فندق ومنتجع موسى كوست رأس سدر*\n${RESORT_CONTACT.companyNameAr}\n━━━━━━━━━━━━━━━━━━━\n\n🏨 *الغرف والأجنحة الفندقية (شاملة بوفيه الإفطار المفتوح):*\n`
        : `📋 *Official Approved Rates 2026 - Mousa Coast Resort Ras Sudr*\n${RESORT_CONTACT.companyNameEn}\n━━━━━━━━━━━━━━━━━━━\n\n🏨 *Hotel Rooms & Suites (Includes Open Buffet Breakfast):*\n`;

    const hotelLines = ROOMS_DATA.filter((r) => r.unitType === 'hotel')
      .map(
        (r) =>
          `• ${lang === 'ar' ? r.titleAr : r.titleEn} (${r.maxGuests} ${lang === 'ar' ? 'أفراد' : 'Guests'}): ${r.pricePerNight.toLocaleString()} ${lang === 'ar' ? 'ج.م / ليلة' : 'EGP/night'}`
      )
      .join('\n');

    const chaletHeader =
      lang === 'ar'
        ? `\n\n🏡 *الشاليهات المصيفية (شاملة الشاطئ وحمامات السباحة والأكوا بارك ومطبخ مجهز):*\n`
        : `\n\n🏡 *Serviced Rental Chalets (Includes Beach, Pools, Aqua Park & Kitchen):*\n`;

    const chaletLines = ROOMS_DATA.filter((r) => r.unitType === 'rental')
      .map(
        (r) =>
          `• ${lang === 'ar' ? r.titleAr : r.titleEn} (${r.maxGuests} ${lang === 'ar' ? 'أفراد' : 'Guests'}): ${r.pricePerNight.toLocaleString()} ${lang === 'ar' ? 'ج.م / ليلة' : 'EGP/night'}`
      )
      .join('\n');

    const footer =
      lang === 'ar'
        ? `\n━━━━━━━━━━━━━━━━━━━\n📞 الحجز والاستعلام 24/7:\nهاتف: ${RESORT_CONTACT.primaryPhoneDisplay} - ${RESORT_CONTACT.secondaryPhoneDisplay}\nواتساب: https://wa.me/${RESORT_CONTACT.primaryPhoneRaw}\nإيميل الإدارة: ${RESORT_CONTACT.email}\n🏦 تأكيد الحجز بالعربون على حساب: ${BANK_DETAILS.accountNameAr} (بنك CIB)`
        : `\n━━━━━━━━━━━━━━━━━━━\n📞 24/7 Reservations:\nPhone: ${RESORT_CONTACT.primaryPhoneDisplay} - ${RESORT_CONTACT.secondaryPhoneDisplay}\nWhatsApp: https://wa.me/${RESORT_CONTACT.primaryPhoneRaw}\nOfficial Email: ${RESORT_CONTACT.email}\n🏦 Bank Deposit: ${BANK_DETAILS.accountName} (CIB Egypt)`;

    const fullText = header + hotelLines + chaletHeader + chaletLines + footer;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 3000);
    });
  };

  const scrollToCalculator = (roomId: string) => {
    if (onSelectRoomForBooking) {
      onSelectRoomForBooking(roomId);
    }
    const elem = document.getElementById('calculator');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Subtle luxury ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'ar' ? 'جدول وقائمة الأسعار الرسمية 2026' : 'Official Approved Rate Directory 2026'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {lang === 'ar' ? 'أسعار الإقامة المعتمدة والشفافة' : 'Certified Direct Accommodation Rates'}
          </h2>

          <p className="mt-3.5 text-stone-300 text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'التعريفة الرسمية المعتمدة لعام 2026 لجميع الغرف والأجنحة الفندقية والشاليهات العائلية في منتجع وفندق موسى كوست برأس سدر مع ضمان أفضل سعر مباشر بدون عمولات وسيطة.'
              : 'Official 2026 approved tariff for all hotel rooms, royal suites, and family chalets at Mousa Coast Resort with best direct rate guarantee.'}
          </p>

          {/* Quick Copy & Guarantee Action Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyRatesSummary}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-stone-800 hover:bg-stone-750 text-amber-300 border border-stone-700 hover:border-amber-500/50 transition-all cursor-pointer shadow-sm"
              title={lang === 'ar' ? 'نسخ قائمة الأسعار بالكامل لمشاركتها عبر واتساب' : 'Copy entire price list'}
            >
              {copiedSummary ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">
                    {lang === 'ar' ? 'تم نسخ قائمة الأسعار بنجاح!' : 'Rates Copied to Clipboard!'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>
                    {lang === 'ar' ? 'نسخ قائمة الأسعار للمشاركة عبر واتساب' : 'Copy Official Rate Card'}
                  </span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowSeasonDetails(!showSeasonDetails)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-stone-800 hover:bg-stone-750 text-stone-300 border border-stone-700 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>
                {showSeasonDetails
                  ? lang === 'ar'
                    ? 'إخفاء تفاصيل مواسم الصيف والشتاء'
                    : 'Hide Seasonal Details'
                  : lang === 'ar'
                  ? 'عرض تفاصيل الصيف والشتاء وعطلات الأسبوع'
                  : 'Show Seasonal & Weekend Breakdown'}
              </span>
            </button>
          </div>
        </div>

        {/* Filter and Sorting Controls */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-800 pb-5">
          {/* Category Tabs */}
          <div className="flex items-center flex-wrap gap-2">
            {[
              { id: 'all', ar: `جميع الوحدات (${ROOMS_DATA.length})`, en: `All Units (${ROOMS_DATA.length})`, icon: Building2 },
              { id: 'hotel', ar: 'غرف وأجنحة الفندق (5)', en: 'Hotel Rooms & Suites (5)', icon: Crown },
              { id: 'rental', ar: 'الشاليهات المصيفية (6)', en: 'Rental Chalets (6)', icon: Home },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id as any)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    filterType === tab.id
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                      : 'bg-stone-800/80 text-stone-300 hover:bg-stone-750 hover:text-white border border-stone-700/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? tab.ar : tab.en}</span>
                </button>
              );
            })}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'ar' ? 'الترتيب:' : 'Sort:'}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-800 text-stone-200 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="default">{lang === 'ar' ? 'الترتيب الافتراضي' : 'Default'}</option>
              <option value="price-asc">{lang === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
              <option value="price-desc">{lang === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
            </select>
          </div>
        </div>

        {/* Pricing Cards & Desktop Table */}
        <div className="mt-8 space-y-4">
          {filteredRooms.map((room) => {
            const title = lang === 'ar' ? room.titleAr : room.titleEn;
            const subtitle = lang === 'ar' ? room.subtitleAr : room.subtitleEn;
            const board = lang === 'ar' ? room.boardTypeAr : room.boardTypeEn;
            const bed = lang === 'ar' ? room.bedAr : room.bedEn;
            const originalPrice = room.originalPrice || Math.round(room.pricePerNight * 1.15);
            const discountPct = Math.round(
              ((originalPrice - room.pricePerNight) / originalPrice) * 100
            );

            return (
              <div
                key={room.id}
                className="bg-stone-850/90 border border-stone-800 hover:border-amber-500/40 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/40 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  {/* Photo & Unit Summary */}
                  <div className="lg:col-span-5 flex items-start gap-4">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-700/80 bg-stone-800">
                      <img
                        src={room.image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span
                        className={`absolute top-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-black ${
                          room.unitType === 'hotel'
                            ? 'bg-amber-400 text-stone-950'
                            : 'bg-emerald-500 text-white'
                        }`}
                      >
                        {room.unitType === 'hotel'
                          ? lang === 'ar'
                            ? 'فندق 4★'
                            : '4★ Hotel'
                          : lang === 'ar'
                          ? 'شاليه'
                          : 'Chalet'}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          {title}
                        </h3>
                        {room.popular && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {lang === 'ar' ? 'الأكثر طلباً' : 'Popular'}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-400 mt-1 line-clamp-1">{subtitle}</p>

                      <div className="mt-2.5 flex items-center gap-3 text-xs text-stone-300 flex-wrap">
                        <span className="inline-flex items-center gap-1 bg-stone-800 px-2 py-1 rounded-md border border-stone-750">
                          <Users className="w-3.5 h-3.5 text-amber-400" />
                          <span>{lang === 'ar' ? `${room.maxGuests} أفراد` : `${room.maxGuests} Pax`}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 bg-stone-800 px-2 py-1 rounded-md border border-stone-750">
                          <Maximize className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{room.area}</span>
                        </span>
                        <span className="text-[11px] text-stone-400 truncate max-w-[180px]">
                          {bed}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Board and Included Perks */}
                  <div className="lg:col-span-3 text-xs text-stone-300 border-t lg:border-t-0 lg:border-r lg:border-l border-stone-800 pt-3 lg:pt-0 lg:px-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-stone-100">{board}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-400 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>
                        {room.unitType === 'hotel'
                          ? lang === 'ar'
                            ? 'شامل خدمة الغرف اليومية والواي فاي والمسابح'
                            : 'Daily housekeeping, Wi-Fi, pool access'
                          : lang === 'ar'
                          ? 'شامل دخول مجاني للأكوا بارك والشاطئ الخاص'
                          : 'Free Aqua Park and private beach access'}
                      </span>
                    </div>
                    {showSeasonDetails && room.rates && (
                      <div className="mt-2 pt-2 border-t border-stone-800 text-[11px] text-stone-400 space-y-1">
                        <div className="flex justify-between">
                          <span>{lang === 'ar' ? 'صيف (وسط الأسبوع):' : 'Summer Weekday:'}</span>
                          <span className="font-mono text-stone-200">{room.rates.summerWeekday.toLocaleString()} ج.م</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{lang === 'ar' ? 'صيف (نهاية الأسبوع):' : 'Summer Weekend:'}</span>
                          <span className="font-mono text-amber-300 font-bold">{room.rates.summerWeekend.toLocaleString()} ج.م</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Official Price Tag & Actions */}
                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-stone-800">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-400 line-through">
                          {originalPrice.toLocaleString()} ج.م
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {lang === 'ar' ? `وفر ${discountPct}%` : `Save ${discountPct}%`}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">
                          {room.pricePerNight.toLocaleString()}
                        </span>
                        <span className="text-xs font-semibold text-stone-400">
                          {lang === 'ar' ? 'ج.م / ليلة' : 'EGP / night'}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 block mt-0.5 font-medium">
                        {lang === 'ar' ? '✓ أفضل سعر مباشر شامل كافة الرسوم' : '✓ Direct rate inclusive of fees'}
                      </span>
                    </div>

                    {/* Booking Buttons */}
                    <div className="flex items-center gap-2 w-full sm:w-auto lg:w-full justify-end">
                      <button
                        onClick={() => scrollToCalculator(room.id)}
                        className="flex-1 sm:flex-initial lg:flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 hover:border-amber-400/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        title={lang === 'ar' ? 'حساب التكلفة حسب التواريخ' : 'Calculate stay cost'}
                      >
                        <Calculator className="w-3.5 h-3.5 text-amber-400" />
                        <span>{lang === 'ar' ? 'حساب التكلفة' : 'Calculate'}</span>
                      </button>

                      <button
                        onClick={() => handleBookOnWhatsApp(room)}
                        className="flex-1 sm:flex-initial lg:flex-1 py-2.5 px-3.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-md shadow-emerald-950/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'حجز فوري' : 'Book Now'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Trust & Guarantee Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-stone-850 to-stone-900 border border-amber-500/30 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Guarantee 1 */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {lang === 'ar' ? 'ضمان أفضل سعر مباشر' : 'Best Rate Direct Guarantee'}
                </h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {lang === 'ar'
                    ? 'الحجز مباشرة مع إدارة موسى كوست يضمن لك الحصول على أقل سعر متاح وبدون أي عمولات وسطاء.'
                    : 'Booking directly with Mousa Coast ensures lowest available rate with zero broker fees.'}
                </p>
              </div>
            </div>

            {/* Guarantee 2 - Bank confirmation */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {lang === 'ar' ? 'حساب بنكي رسمي معتمد' : 'Official Corporate Bank Account'}
                </h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {lang === 'ar'
                    ? `${BANK_DETAILS.accountNameAr} لدى ${BANK_DETAILS.bankNameAr}. تأكيد فوري ومضمون للعربون.`
                    : `${BANK_DETAILS.accountName} at CIB Bank Egypt for secure official deposit confirmations.`}
                </p>
              </div>
            </div>

            {/* Guarantee 3 - Corporate Contacts */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {lang === 'ar' ? 'إدارة المبيعات والتطوير' : 'Executive Management'}
                </h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed font-mono">
                  {RESORT_CONTACT.email}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-stone-300 font-bold">
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>{RESORT_CONTACT.primaryPhoneDisplay}</span>
                  <span className="text-stone-600">|</span>
                  <span>{RESORT_CONTACT.secondaryPhoneDisplay}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
