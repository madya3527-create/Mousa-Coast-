import React, { useState } from 'react';
import { Language, Room, RoomCategory } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ROOMS_DATA, RESORT_CONTACT, BANK_DETAILS } from '../data/resortData';
import { Users, Maximize, Eye, BedDouble, MessageCircle, X, Check, Sparkles, ChevronRight, Info, CreditCard } from 'lucide-react';

interface AccommodationsSectionProps {
  lang: Language;
  onSelectRoomForBooking?: (roomId: string) => void;
}

export const AccommodationsSection: React.FC<AccommodationsSectionProps> = ({
  lang,
  onSelectRoomForBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<RoomCategory>('all');
  const [activeModalRoom, setActiveModalRoom] = useState<Room | null>(null);
  const [modalActiveImage, setModalActiveImage] = useState<string>('');
  const t = TRANSLATIONS[lang];

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'hotel') return room.unitType === 'hotel';
    if (selectedCategory === 'rental') return room.unitType === 'rental';
    if (selectedCategory === 'suite') return room.category === 'suite';
    if (selectedCategory === 'villa') return room.category === 'villa';
    return room.category === selectedCategory;
  });

  const openRoomModal = (room: Room) => {
    setActiveModalRoom(room);
    setModalActiveImage(room.image);
  };

  const handleBookOnWhatsApp = (room: Room) => {
    const title = lang === 'ar' ? room.titleAr : room.titleEn;
    const msg =
      lang === 'ar'
        ? `السلام عليكم، أود حجز (${title}) في فندق ومنتجع موسى كوست وفق تسعيرة 2026 الرسمية. هل متوفر في التواريخ القادمة؟`
        : `Hello, I would like to book (${title}) at Mousa Coast Resort under the official 2026 tariff. Is it available for upcoming dates?`;
    window.open(
      `https://wa.me/${RESORT_CONTACT.primaryPhoneRaw}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  return (
    <section id="accommodations" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'ar' ? 'التعريفة والأسعار الرسمية 2026' : 'Official 2026 Rates & Tariffs'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.accommodationsTitle}
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg leading-relaxed">
            {lang === 'ar'
              ? 'الأسعار الرسمية المعتمدة للإقامة الفندقية والشاليهات والفيلات الساحلية للمصريين والأجانب المقيمين لعام 2026.'
              : 'Official approved rates for hotel rooms, serviced chalets, and beachfront villas for 2026.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex items-center justify-center flex-wrap gap-2">
          {[
            { id: 'all', ar: `جميع الوحدات (${ROOMS_DATA.length})`, en: `All Units (${ROOMS_DATA.length})` },
            { id: 'hotel', ar: 'غرف وأجنحة الفندق', en: 'Hotel Rooms & Suites' },
            { id: 'rental', ar: 'شاليهات وفيلات الإيجار (بدون وجبات)', en: 'Rental Chalets & Villas (Room Only)' },
            { id: 'suite', ar: 'الأجنحة الفاخرة', en: 'Executive Suites' },
            { id: 'villa', ar: 'الفيلات الخاصة', en: 'Private Villas' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {lang === 'ar' ? tab.ar : tab.en}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => {
            const title = lang === 'ar' ? room.titleAr : room.titleEn;
            const subtitle = lang === 'ar' ? room.subtitleAr : room.subtitleEn;
            const bed = lang === 'ar' ? room.bedAr : room.bedEn;
            const view = lang === 'ar' ? room.viewAr : room.viewEn;
            const board = lang === 'ar' ? room.boardTypeAr : room.boardTypeEn;

            return (
              <div
                key={room.id}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image & Badges */}
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                  <img
                    src={room.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-black shadow-md ${
                        room.unitType === 'hotel'
                          ? 'bg-amber-400 text-stone-950'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {room.unitType === 'hotel'
                        ? lang === 'ar' ? 'فندق 4 نجوم' : '4-Star Hotel'
                        : lang === 'ar' ? 'شاليه إيجار' : 'Rental Chalet'}
                    </span>
                    {room.popular && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-stone-900/90 text-amber-300 border border-amber-500/40 shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {lang === 'ar' ? 'الأكثر طلباً' : 'Popular'}
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-black/75 text-white backdrop-blur-sm">
                    {board}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                      {title}
                    </h3>
                    <p className="mt-1 text-xs text-stone-500 font-medium">
                      {subtitle}
                    </p>

                    {/* Quick Specs */}
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>
                          {lang === 'ar' ? `حتى ${room.maxGuests} أفراد` : `Up to ${room.maxGuests} Guests`}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{room.area}</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2">
                        <BedDouble className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="truncate">{bed}</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2">
                        <Eye className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="truncate">{view}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Actions */}
                  <div className="mt-6 pt-4 border-t border-stone-100">
                    <div className="mb-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[11px] text-stone-500 block mb-0.5 font-medium">
                            {lang === 'ar' ? 'سعر الليلة (تعريفة 2026):' : 'Rate / Night (2026):'}
                          </span>
                          <span className="text-2xl font-black text-stone-900">
                            {room.pricePerNight.toLocaleString()}
                          </span>{' '}
                          <span className="text-xs font-semibold text-stone-500">
                            {t.egpPerNight}
                          </span>
                        </div>
                        <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {lang === 'ar' ? 'رسمي معتمد' : 'Official'}
                        </span>
                      </div>

                      {/* Weekday vs Weekend micro-tag */}
                      <div className="mt-2.5 grid grid-cols-2 gap-1 text-[11px] bg-stone-50 p-2 rounded-xl border border-stone-200/80 font-mono">
                        <div className="text-stone-600">
                          <span className="block text-[10px] text-stone-400 font-sans font-medium">
                            {lang === 'ar' ? 'وسط الأسبوع' : 'Weekday'}
                          </span>
                          <strong className="text-stone-900 text-xs">
                            {room.rates.summerWeekday.toLocaleString()} {lang === 'ar' ? 'ج.م' : 'EGP'}
                          </strong>
                        </div>
                        <div className="text-amber-700 text-end">
                          <span className="block text-[10px] text-stone-400 font-sans font-medium">
                            {lang === 'ar' ? 'نهاية الأسبوع' : 'Weekend'}
                          </span>
                          <strong className="text-amber-600 text-xs">
                            {room.rates.summerWeekend.toLocaleString()} {lang === 'ar' ? 'ج.م' : 'EGP'}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openRoomModal(room)}
                        className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Info className="w-4 h-4" />
                        <span>{t.viewDetails}</span>
                      </button>

                      <button
                        onClick={() => handleBookOnWhatsApp(room)}
                        className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{t.bookNow}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Room Details Modal */}
      {activeModalRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-stone-200">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalRoom(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Gallery */}
            <div className="relative aspect-16/9 bg-stone-900">
              <img
                src={modalActiveImage || activeModalRoom.image}
                alt={lang === 'ar' ? activeModalRoom.titleAr : activeModalRoom.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 overflow-x-auto py-1 px-1">
                {activeModalRoom.gallery.map((imgSrc, i) => (
                  <button
                    key={i}
                    onClick={() => setModalActiveImage(imgSrc)}
                    className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      (modalActiveImage || activeModalRoom.image) === imgSrc
                        ? 'border-amber-400 scale-105'
                        : 'border-white/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-200">
                <div>
                  <h3 className="text-2xl font-black text-stone-900">
                    {lang === 'ar' ? activeModalRoom.titleAr : activeModalRoom.titleEn}
                  </h3>
                  <p className="text-sm text-stone-500 font-medium">
                    {lang === 'ar' ? activeModalRoom.subtitleAr : activeModalRoom.subtitleEn}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-amber-600">
                    {activeModalRoom.pricePerNight.toLocaleString()}{' '}
                    <span className="text-xs text-stone-500">{t.egpPerNight}</span>
                  </div>
                  <span className="text-xs text-emerald-600 font-bold">
                    {lang === 'ar' ? activeModalRoom.boardTypeAr : activeModalRoom.boardTypeEn}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h4 className="text-sm font-bold text-stone-900 mb-2">
                  {lang === 'ar' ? 'نبذة عن الوحدة الفندقية:' : 'About this Accommodation:'}
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {lang === 'ar' ? activeModalRoom.descriptionAr : activeModalRoom.descriptionEn}
                </p>
              </div>

              {/* Key Features List */}
              <div className="mt-6">
                <h4 className="text-sm font-bold text-stone-900 mb-3">
                  {lang === 'ar' ? 'التجهيزات والمزايا المتوفرة:' : 'Amenities & Inclusions:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-stone-700">
                  {(lang === 'ar' ? activeModalRoom.featuresAr : activeModalRoom.featuresEn).map(
                    (feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Official 2026 Seasonal Tariff Table */}
              <div className="mt-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>{lang === 'ar' ? 'جدول أسعار الإقامة الرسمية لعام 2026:' : 'Official 2026 Tariff Rates:'}</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-stone-900 font-bold">
                    {lang === 'ar' ? 'للمصريين والأجانب المقيمين' : 'Egyptians & Residents'}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-stone-800 text-center border-collapse">
                    <thead>
                      <tr className="border-b border-amber-200 text-[11px] text-stone-600">
                        <th className="py-2 text-start font-bold">
                          {lang === 'ar' ? 'الموسم / الفترة' : 'Season Period'}
                        </th>
                        <th className="py-2 font-bold text-stone-900">
                          {lang === 'ar' ? 'وسط الأسبوع (Week Day)' : 'Week Day'}
                        </th>
                        <th className="py-2 font-bold text-amber-700">
                          {lang === 'ar' ? 'نهاية الأسبوع (Week End)' : 'Week End'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100 font-mono">
                      <tr>
                        <td className="py-2.5 text-start font-sans font-medium text-stone-700">
                          {lang === 'ar'
                            ? '1 أبريل إلى 10 أكتوبر (شم النسيم وعيد الأضحى)'
                            : '1 Apr to 10 Oct (Holidays & Summer)'}
                        </td>
                        <td className="py-2.5 font-bold text-stone-900">
                          {activeModalRoom.rates.summerWeekday.toLocaleString()} {lang === 'ar' ? 'ج.م' : 'EGP'}
                        </td>
                        <td className="py-2.5 font-bold text-amber-700 bg-amber-100/60 rounded">
                          {activeModalRoom.rates.summerWeekend.toLocaleString()} {lang === 'ar' ? 'ج.م' : 'EGP'}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-start font-sans font-medium text-stone-700">
                          {lang === 'ar'
                            ? '10 أكتوبر إلى 31 ديسمبر'
                            : '10 Oct to 31 Dec'}
                        </td>
                        <td className="py-2.5 font-bold text-stone-900">
                          {activeModalRoom.rates.winterWeekday.toLocaleString()} {lang === 'ar' ? 'ج.م' : 'EGP'}
                        </td>
                        <td className="py-2.5 font-bold text-amber-700 bg-amber-100/60 rounded">
                          {activeModalRoom.rates.winterWeekend.toLocaleString()} {lang === 'ar' ? 'ج.م' : 'EGP'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Official CIB Bank Transfer Guarantee Box */}
              <div className="mt-4 p-4 rounded-2xl bg-stone-900 text-stone-200 border border-stone-800 text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'ar' ? 'تأكيد الحجز بسداد العربون عبر الحساب البنكي الرسمي:' : 'Official Bank Deposit Details (CIB):'}</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    CIB Egypt
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                  <div>
                    <span className="text-stone-400 block text-[10px]">
                      {lang === 'ar' ? 'اسم الحساب:' : 'Account Name:'}
                    </span>
                    <strong className="text-white font-sans">{BANK_DETAILS.accountName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">
                      {lang === 'ar' ? 'البنك:' : 'Bank:'}
                    </span>
                    <strong className="text-white font-sans">{lang === 'ar' ? BANK_DETAILS.bankNameAr : BANK_DETAILS.bankName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">
                      {lang === 'ar' ? 'رقم الحساب:' : 'Account Number:'}
                    </span>
                    <strong className="text-amber-300 font-mono select-all text-xs" dir="ltr">{BANK_DETAILS.accountNumber}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">
                      {lang === 'ar' ? 'سويفت كود (Swift):' : 'Swift Code:'}
                    </span>
                    <strong className="text-white font-mono select-all" dir="ltr">{BANK_DETAILS.swiftCode}</strong>
                  </div>
                  <div className="sm:col-span-2 pt-1 border-t border-stone-800">
                    <span className="text-stone-400 block text-[10px]">
                      {lang === 'ar' ? 'الآيبان الدولي (IBAN):' : 'International IBAN:'}
                    </span>
                    <strong className="text-emerald-400 font-mono select-all tracking-wider text-xs block truncate" dir="ltr">
                      {BANK_DETAILS.iban}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    handleBookOnWhatsApp(activeModalRoom);
                    setActiveModalRoom(null);
                  }}
                  className="w-full sm:flex-1 py-3 px-6 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t.confirmViaWhatsApp}</span>
                </button>

                <a
                  href="#calculator"
                  onClick={() => {
                    if (onSelectRoomForBooking) {
                      onSelectRoomForBooking(activeModalRoom.id);
                    }
                    setActiveModalRoom(null);
                  }}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl font-bold text-sm bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center gap-1.5"
                >
                  <span>{lang === 'ar' ? 'حساب السعر لتواريخك' : 'Calculate for Your Dates'}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
