import React, { useState, useEffect } from 'react';
import { Language, BookingSyncData } from '../types';
import { RESORT_CONTACT, ROOMS_DATA } from '../data/resortData';
import { calculateStayPricing } from '../utils/pricingCalculator';
import {
  MessageCircle,
  Phone,
  X,
  Sparkles,
  Mail,
  Calendar,
  Users,
  Send,
  BedDouble,
  ChevronDown,
  Calculator,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';

interface FloatingWhatsAppProps {
  lang: Language;
  onSyncBooking?: (data: BookingSyncData) => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  lang,
  onSyncBooking,
}) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'direct'>('form');

  // Quick Booking Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const dayAfterStr = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(tomorrowStr);
  const [checkOut, setCheckOut] = useState<string>(dayAfterStr);
  const [unitId, setUnitId] = useState<string>('any');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [guestName, setGuestName] = useState<string>('');
  const [targetPhone, setTargetPhone] = useState<string>(RESORT_CONTACT.primaryPhoneRaw);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Selected Room
  const selectedRoom =
    unitId !== 'any'
      ? ROOMS_DATA.find((r) => r.id === unitId) || ROOMS_DATA[0]
      : ROOMS_DATA[0];

  // Validation Rules
  const totalGuests = adults + children;
  const isCheckInInvalid = !checkIn || checkIn < todayStr;
  const isCheckOutInvalid = !checkOut || checkOut <= checkIn;
  const isCapacityExceeded = unitId !== 'any' && totalGuests > selectedRoom.maxGuests;
  const isNameInvalid = guestName.trim().length > 0 && guestName.trim().length < 3;
  const isNameValid = guestName.trim().length >= 3;

  const isFormValid =
    !isCheckInInvalid && !isCheckOutInvalid && !isCapacityExceeded && !isNameInvalid;

  // Live pricing calculation
  const stayPricing = calculateStayPricing(
    selectedRoom,
    checkIn,
    checkOut,
    'room_only',
    adults
  );

  const nights = stayPricing.nights;

  // Sync to BookingCalculator whenever inputs change if opened
  useEffect(() => {
    if (onSyncBooking && open) {
      onSyncBooking({
        unitId: unitId !== 'any' ? unitId : selectedRoom.id,
        checkIn,
        checkOut,
        adults,
        children,
        syncedAt: Date.now(),
      });
    }
  }, [unitId, checkIn, checkOut, adults, children, open, onSyncBooking, selectedRoom.id]);

  const handleOpenInCalculator = () => {
    if (onSyncBooking) {
      onSyncBooking({
        unitId: unitId !== 'any' ? unitId : selectedRoom.id,
        checkIn,
        checkOut,
        adults,
        children,
        syncedAt: Date.now(),
      });
    }
    setOpen(false);
    const elem = document.getElementById('calculator');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!isFormValid) {
      return;
    }

    const unitTitle =
      unitId !== 'any'
        ? lang === 'ar'
          ? `${selectedRoom.titleAr} (${selectedRoom.pricePerNight.toLocaleString()} ج.م / ليلة)`
          : `${selectedRoom.titleEn} (${selectedRoom.pricePerNight.toLocaleString()} EGP/night)`
        : lang === 'ar'
        ? 'أي وحدة فندقية أو شاليه مناسب متاح'
        : 'Any suitable hotel room or chalet';

    let message = '';
    if (lang === 'ar') {
      message =
        `السلام عليكم، أود حجز إقامة في *فندق ومنتجع موسى كوست رأس سدر*:\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `🏨 *نوع الوحدة:* ${unitTitle}\n` +
        `📅 *تاريخ الوصول:* ${checkIn}\n` +
        `📅 *تاريخ المغادرة:* ${checkOut} (${nights} ${nights > 2 ? 'ليالٍ' : 'ليلة'})\n` +
        `👥 *عدد الأفراد:* ${adults} بالغين${children > 0 ? ` + ${children} أطفال` : ''}\n` +
        (guestName.trim() ? `👤 *اسم الضيف:* ${guestName.trim()}\n` : '') +
        `💰 *إجمالي التكلفة التقديرية المحسوبة:* ${stayPricing.finalTotal.toLocaleString()} ج.م (شامل خصم الحجز المباشر 15%)\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `يرجى تأكيد التوافر وإرسال بيانات حجز العربون على حساب الشركة البنكي المعتمد. شكراً جزيلاً!`;
    } else {
      message =
        `Hello, I would like to reserve a stay at *Mousa Coast Resort Ras Sudr*:\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `🏨 *Unit Requested:* ${unitTitle}\n` +
        `📅 *Check-in:* ${checkIn}\n` +
        `📅 *Check-out:* ${checkOut} (${nights} night${nights > 1 ? 's' : ''})\n` +
        `👥 *Guests:* ${adults} Adults${children > 0 ? `, ${children} Children` : ''}\n` +
        (guestName.trim() ? `👤 *Guest Name:* ${guestName.trim()}\n` : '') +
        `💰 *Estimated Total:* ${stayPricing.finalTotal.toLocaleString()} EGP (15% direct discount applied)\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `Please confirm availability and booking deposit instructions. Thank you!`;
    }

    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const startChatDirect = (number: string) => {
    const text =
      lang === 'ar'
        ? 'مرحباً، أود الاستفسار عن حجز إقامة في فندق موسى كوست وأحدث العروض المتاحة'
        : 'Hello, I would like to inquire about booking a stay at Mousa Coast Resort';
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 end-6 z-50 flex flex-col items-end">
      {/* Expanded Popup Menu */}
      {open && (
        <div className="mb-3 w-[340px] sm:w-[400px] max-h-[85vh] overflow-y-auto rounded-3xl bg-stone-900 border border-stone-750 shadow-2xl p-4 sm:p-5 text-white animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <MessageCircle className="w-5 h-5 fill-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{lang === 'ar' ? 'حجوزات موسى كوست' : 'Mousa Coast Booking'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <p className="text-[11px] text-emerald-400">
                  {lang === 'ar' ? 'خدمة سريعة ومباشرة 24/7' : 'Instant 24/7 Service'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-850 rounded-xl mt-3 border border-stone-800">
            <button
              type="button"
              onClick={() => setActiveTab('form')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'form'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'ar' ? 'حجز سريع مخصص' : 'Quick Booking'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('direct')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'direct'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تواصل فوري' : 'Direct Chat'}</span>
            </button>
          </div>

          {/* TAB 1: Quick Booking Form */}
          {activeTab === 'form' && (
            <form onSubmit={handleQuickFormSubmit} className="mt-3.5 space-y-3.5">
              <p className="text-[11px] text-stone-300 leading-relaxed">
                {lang === 'ar'
                  ? 'حدد التواريخ ونوع الغرفة لاحتساب إجمالي التكلفة فوراً وتجهيز رسالة الواتساب:'
                  : 'Select dates and room type to compute total cost and build your WhatsApp message:'}
              </p>

              {/* 1. Unit Selection with Visual Indicator */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-stone-300 flex items-center gap-1.5">
                    <BedDouble className="w-3 h-3 text-amber-400" />
                    <span>{lang === 'ar' ? 'نوع الغرفة أو الشاليه' : 'Room or Chalet'}</span>
                  </label>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{unitId === 'any' ? (lang === 'ar' ? 'متاح' : 'Available') : (lang === 'ar' ? 'محدد' : 'Selected')}</span>
                  </span>
                </div>
                <div className="relative">
                  <select
                    value={unitId}
                    onChange={(e) => setUnitId(e.target.value)}
                    className="w-full bg-stone-800 border border-emerald-500/30 hover:border-emerald-500/60 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-400 appearance-none cursor-pointer transition-colors"
                  >
                    <option value="any">
                      {lang === 'ar' ? '✨ أي وحدة متاحة (أفضل عرض)' : '✨ Any available (Best offer)'}
                    </option>
                    <optgroup label={lang === 'ar' ? 'الغرف والأجنحة الفندقية (إفطار شامل)' : 'Hotel Rooms & Suites'}>
                      {ROOMS_DATA.filter((r) => r.unitType === 'hotel').map((r) => (
                        <option key={r.id} value={r.id}>
                          {lang === 'ar' ? r.titleAr : r.titleEn} — {r.pricePerNight.toLocaleString()} ج.م
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label={lang === 'ar' ? 'الشاليهات المصيفية (أكوا وشاطئ ومطبخ)' : 'Rental Chalets'}>
                      {ROOMS_DATA.filter((r) => r.unitType === 'rental').map((r) => (
                        <option key={r.id} value={r.id}>
                          {lang === 'ar' ? r.titleAr : r.titleEn} — {r.pricePerNight.toLocaleString()} ج.م
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute end-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* 2. Dates Grid with Real-Time Validation Indicators */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Check-in Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-stone-300 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      <span>{lang === 'ar' ? 'الوصول' : 'Check-in'}</span>
                    </label>
                    {isCheckInInvalid ? (
                      <span className="text-[10px] font-bold text-rose-400 flex items-center gap-0.5">
                        <AlertCircle className="w-3 h-3 text-rose-400" />
                        <span>{lang === 'ar' ? 'غير صالح' : 'Invalid'}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>{lang === 'ar' ? 'صحيح' : 'Valid'}</span>
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      min={todayStr}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className={`w-full rounded-xl px-2.5 py-1.5 text-xs text-stone-100 transition-colors focus:outline-none ${
                        isCheckInInvalid
                          ? 'bg-rose-950/25 border border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/30'
                          : 'bg-stone-800 border border-emerald-500/40 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30'
                      }`}
                      required
                    />
                  </div>
                  {isCheckInInvalid && (
                    <p className="mt-1 text-[10px] text-rose-400 leading-tight flex items-center gap-1 animate-in fade-in">
                      <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                      <span>{lang === 'ar' ? 'لا يمكن اختيار تاريخ ماضٍ' : 'Cannot be in the past'}</span>
                    </p>
                  )}
                </div>

                {/* Check-out Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-stone-300 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      <span>{lang === 'ar' ? 'المغادرة' : 'Check-out'}</span>
                    </label>
                    {isCheckOutInvalid ? (
                      <span className="text-[10px] font-bold text-rose-400 flex items-center gap-0.5">
                        <AlertCircle className="w-3 h-3 text-rose-400" />
                        <span>{lang === 'ar' ? 'خطأ' : 'Error'}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>{nights} {lang === 'ar' ? 'ليالٍ' : 'n'}</span>
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      min={checkIn || todayStr}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className={`w-full rounded-xl px-2.5 py-1.5 text-xs text-stone-100 transition-colors focus:outline-none ${
                        isCheckOutInvalid
                          ? 'bg-rose-950/25 border border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/30'
                          : 'bg-stone-800 border border-emerald-500/40 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30'
                      }`}
                      required
                    />
                  </div>
                  {isCheckOutInvalid && (
                    <p className="mt-1 text-[10px] text-rose-400 leading-tight flex items-center gap-1 animate-in fade-in">
                      <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                      <span>{lang === 'ar' ? 'يجب أن يلي تاريخ الوصول' : 'Must be after check-in'}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* 3. Guests Count with Capacity Validation */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-stone-300 flex items-center gap-1">
                    <Users className="w-3 h-3 text-amber-400" />
                    <span>{lang === 'ar' ? 'عدد النزلاء' : 'Guests'}</span>
                  </span>
                  {isCapacityExceeded ? (
                    <span className="text-[10px] font-bold text-rose-400 flex items-center gap-0.5">
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      <span>{lang === 'ar' ? `تجاوز السعة (أقصى حد ${selectedRoom.maxGuests})` : `Exceeds max (${selectedRoom.maxGuests})`}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>
                        {unitId !== 'any'
                          ? lang === 'ar'
                            ? `ضمن السعة (${totalGuests}/${selectedRoom.maxGuests})`
                            : `Allowed (${totalGuests}/${selectedRoom.maxGuests})`
                          : lang === 'ar'
                          ? `الإجمالي ${totalGuests} أفراد`
                          : `${totalGuests} Guests`}
                      </span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-stone-400 block mb-0.5">
                      {lang === 'ar' ? 'البالغين (12+ سنة)' : 'Adults (12+)'}
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className={`w-full rounded-xl px-3 py-1.5 text-xs text-stone-100 transition-colors focus:outline-none ${
                        isCapacityExceeded
                          ? 'bg-rose-950/25 border border-rose-500'
                          : 'bg-stone-800 border border-emerald-500/40 focus:border-emerald-400'
                      }`}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {lang === 'ar' ? 'أفراد بالغين' : 'Adults'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-stone-400 block mb-0.5">
                      {lang === 'ar' ? 'الأطفال (أقل من 12)' : 'Children (<12)'}
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className={`w-full rounded-xl px-3 py-1.5 text-xs text-stone-100 transition-colors focus:outline-none ${
                        isCapacityExceeded
                          ? 'bg-rose-950/25 border border-rose-500'
                          : 'bg-stone-800 border border-emerald-500/40 focus:border-emerald-400'
                      }`}
                    >
                      {[0, 1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num === 0 ? (lang === 'ar' ? 'بدون أطفال' : 'None') : `${num} ${lang === 'ar' ? 'أطفال' : 'Children'}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {isCapacityExceeded && (
                  <div className="mt-1.5 p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-[10px] text-rose-300 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>
                      {lang === 'ar'
                        ? `سعة (${selectedRoom.titleAr}) القصوى هي ${selectedRoom.maxGuests} أفراد فقط. يرجى تقليل العدد أو اختيار وحدة أخرى أكبر.`
                        : `(${selectedRoom.titleEn}) accommodates a maximum of ${selectedRoom.maxGuests} guests. Please reduce count or pick a larger unit.`}
                    </span>
                  </div>
                )}
              </div>

              {/* 4. Guest Name with Visual State */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-stone-300">
                    {lang === 'ar' ? 'اسم النزيل الكريم' : 'Guest Name'}
                  </label>
                  {isNameInvalid && (
                    <span className="text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
                      <AlertCircle className="w-3 h-3 text-amber-400" />
                      <span>{lang === 'ar' ? 'قصير جداً' : 'Too short'}</span>
                    </span>
                  )}
                  {isNameValid && (
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{lang === 'ar' ? 'مكتمل' : 'Complete'}</span>
                    </span>
                  )}
                  {!guestName && (
                    <span className="text-[10px] text-stone-500">
                      {lang === 'ar' ? 'اختياري' : 'Optional'}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={lang === 'ar' ? 'اكتب اسمك الكريم لتخصيص الحجز' : 'Your full name'}
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className={`w-full rounded-xl px-3 py-1.5 text-xs text-stone-100 placeholder:text-stone-500 transition-colors focus:outline-none ${
                      isNameInvalid
                        ? 'bg-amber-950/20 border border-amber-500 focus:border-amber-400'
                        : isNameValid
                        ? 'bg-stone-800 border border-emerald-500/50 focus:border-emerald-400'
                        : 'bg-stone-800 border border-stone-700 focus:border-stone-500'
                    }`}
                  />
                  {isNameValid && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 absolute end-3 top-2.5 pointer-events-none" />
                  )}
                </div>
              </div>

              {/* 5. Live Cost Calculation Preview Card */}
              <div
                className={`p-3 rounded-xl border text-xs shadow-inner transition-all ${
                  isFormValid
                    ? 'bg-stone-850 border-amber-500/30'
                    : 'bg-stone-850/60 border-stone-750 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between text-stone-400 mb-1">
                  <span>{lang === 'ar' ? 'مدة الإقامة المحسوبة:' : 'Stay Duration:'}</span>
                  <span className="font-bold text-amber-300">
                    {nights} {lang === 'ar' ? (nights > 2 ? 'ليالٍ' : 'ليلة') : `night${nights > 1 ? 's' : ''}`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-stone-400 mb-1">
                  <span>{lang === 'ar' ? 'سعر الليلة الرسمي:' : 'Nightly Rate:'}</span>
                  <span className="font-mono text-stone-200">
                    {selectedRoom.pricePerNight.toLocaleString()} {lang === 'ar' ? 'ج.م' : 'EGP'}
                  </span>
                </div>

                <div className="pt-2 mt-2 border-t border-stone-750 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-emerald-400 font-bold block">
                      {lang === 'ar' ? 'إجمالي تكلفة الحجز:' : 'Total Calculated:'}
                    </span>
                    <span className="text-[10px] text-stone-400 line-through">
                      {stayPricing.subTotal.toLocaleString()} ج.م
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="text-lg font-black text-amber-400 font-mono tracking-tight">
                      {stayPricing.finalTotal.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-stone-300 ms-1">
                      {lang === 'ar' ? 'ج.م' : 'EGP'}
                    </span>
                    <span className="block text-[10px] text-emerald-400 font-semibold">
                      {lang === 'ar' ? '✓ خصم مباشر 15% مطبق' : '✓ 15% direct discount'}
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp destination line toggle */}
              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-0.5">
                <span>{lang === 'ar' ? 'إرسال إلى:' : 'Send to:'}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetPhone(RESORT_CONTACT.primaryPhoneRaw)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                      targetPhone === RESORT_CONTACT.primaryPhoneRaw
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {lang === 'ar' ? 'الأساسي (4550)' : 'Primary (4550)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetPhone(RESORT_CONTACT.secondaryPhoneRaw)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                      targetPhone === RESORT_CONTACT.secondaryPhoneRaw
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {lang === 'ar' ? 'الإضافي (1701)' : 'Support (1701)'}
                  </button>
                </div>
              </div>

              {/* Validation Warning Notice if attempted submit with invalid fields */}
              {submitAttempted && !isFormValid && (
                <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'يرجى مراجعة الحقول المشار إليها باللون الأحمر لتصحيح التاريخ أو عدد الأفراد.'
                      : 'Please correct the highlighted fields in red before submitting.'}
                  </span>
                </div>
              )}

              {/* Buttons: Submit WhatsApp & Open in Full Calculator */}
              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isFormValid
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 active:scale-[0.98]'
                      : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed'
                  }`}
                >
                  {isFormValid ? (
                    <>
                      <Send className="w-4 h-4 fill-white" />
                      <span>{lang === 'ar' ? 'إرسال طلب الحجز للواتساب 🚀' : 'Send Booking to WhatsApp 🚀'}</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-stone-500" />
                      <span>{lang === 'ar' ? 'أكمل البيانات المطلوبة للإرسال' : 'Complete Required Fields'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleOpenInCalculator}
                  className="w-full py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {lang === 'ar' ? 'متابعة الحساب المفصل في حاسبة الأسعار' : 'Open in Full Booking Calculator'}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Direct Chat Lines */}
          {activeTab === 'direct' && (
            <div className="mt-3.5 space-y-2.5">
              <p className="text-xs text-stone-300 leading-relaxed">
                {lang === 'ar'
                  ? 'اختر خط الواتساب المباشر للتحدث فوراً مع ممثل خدمة العملاء والحجوزات:'
                  : 'Choose a direct line to start a quick chat with our reservation agents:'}
              </p>

              {/* Primary line */}
              <button
                onClick={() => startChatDirect(RESORT_CONTACT.primaryPhoneRaw)}
                className="w-full p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 transition-all text-start flex items-center justify-between shadow-md cursor-pointer"
              >
                <div>
                  <span className="text-xs font-bold block">
                    {lang === 'ar' ? `الواتساب الأساسي (${RESORT_CONTACT.primaryPhoneDisplay})` : `Primary Line (${RESORT_CONTACT.primaryPhoneDisplay})`}
                  </span>
                  <span className="text-[10px] text-emerald-100">
                    {lang === 'ar' ? 'الرد الأسرع لحجوزات الشاليهات والغرف' : 'Fastest response for rooms & chalets'}
                  </span>
                </div>
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600 shrink-0" />
              </button>

              {/* Secondary line */}
              <button
                onClick={() => startChatDirect(RESORT_CONTACT.secondaryPhoneRaw)}
                className="w-full p-3 rounded-2xl bg-stone-800 hover:bg-stone-750 transition-all text-start flex items-center justify-between border border-stone-700 cursor-pointer"
              >
                <div>
                  <span className="text-xs font-bold block text-white">
                    {lang === 'ar' ? `الواتساب الإضافي (${RESORT_CONTACT.secondaryPhoneDisplay})` : `Secondary Line (${RESORT_CONTACT.secondaryPhoneDisplay})`}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {lang === 'ar' ? 'خدمة النزلاء والاستفسارات' : 'Customer service & inquiries'}
                  </span>
                </div>
                <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              </button>
            </div>
          )}

          {/* Quick Voice Call & Email Footer */}
          <div className="mt-3 pt-3 border-t border-stone-800 space-y-2">
            <a
              href={`tel:${RESORT_CONTACT.primaryPhoneRaw}`}
              className="group/call w-full p-2.5 rounded-xl bg-stone-850/90 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/30 text-stone-300 hover:text-white transition-all text-center text-xs font-medium flex items-center justify-center gap-2 relative overflow-hidden"
            >
              <div className="relative flex items-center justify-center">
                <Phone className="w-3.5 h-3.5 text-amber-400 group-hover/call:scale-110 transition-transform" />
                <span className="absolute -top-0.5 -end-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
              </div>
              <span className="font-medium tracking-wide">
                {lang === 'ar' ? `أو اتصال هاتفي مباشر (${RESORT_CONTACT.primaryPhoneDisplay})` : `Direct Telephone Call (${RESORT_CONTACT.primaryPhoneDisplay})`}
              </span>
            </a>

            <a
              href={`mailto:${RESORT_CONTACT.email}`}
              className="w-full text-[11px] text-stone-400 hover:text-amber-300 flex items-center justify-center gap-1.5 transition-colors pt-0.5"
            >
              <Mail className="w-3 h-3 text-amber-400" />
              <span className="font-mono text-[10px]" dir="ltr">
                {RESORT_CONTACT.email}
              </span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white/20"
        aria-label="WhatsApp Chat"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-emerald-500 animate-pulse" />
        </div>
        <span className="font-bold text-xs sm:text-sm tracking-wide">
          {lang === 'ar' ? 'حجز سريع عبر واتساب' : 'Quick WhatsApp Booking'}
        </span>
      </button>
    </div>
  );
};
