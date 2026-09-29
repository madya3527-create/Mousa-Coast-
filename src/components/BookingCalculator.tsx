import React, { useState, useMemo, useEffect } from 'react';
import { Language, BookingFormState, BookingSyncData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ROOMS_DATA, RESORT_CONTACT, BANK_DETAILS } from '../data/resortData';
import { calculateStayPricing } from '../utils/pricingCalculator';
import {
  Calendar,
  Users,
  MessageCircle,
  Calculator,
  Percent,
  CheckCircle,
  PhoneCall,
  Sparkles,
  CreditCard,
  UtensilsCrossed,
  Mail,
  Zap,
} from 'lucide-react';

interface BookingCalculatorProps {
  lang: Language;
  preselectedUnitId?: string;
  syncData?: BookingSyncData;
}

export const BookingCalculator: React.FC<BookingCalculatorProps> = ({
  lang,
  preselectedUnitId,
  syncData,
}) => {
  const t = TRANSLATIONS[lang];

  // Helper for tomorrow and day after tomorrow dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [form, setForm] = useState<BookingFormState>({
    checkIn: formatDate(tomorrow),
    checkOut: formatDate(dayAfter),
    unitId: preselectedUnitId || ROOMS_DATA[0].id,
    adults: 2,
    children: 1,
    mealPlan: 'room_only',
    guestName: '',
    guestPhone: '',
    specialRequests: '',
  });

  const [bookingSuccessModal, setBookingSuccessModal] = useState(false);
  const [syncedBanner, setSyncedBanner] = useState<string | null>(null);

  // Sync state whenever syncData from the Quick Booking Popup or outside selection arrives
  useEffect(() => {
    if (syncData) {
      const targetUnitId =
        syncData.unitId && syncData.unitId !== 'any' ? syncData.unitId : form.unitId;

      setForm((prev) => ({
        ...prev,
        unitId: targetUnitId,
        checkIn: syncData.checkIn || prev.checkIn,
        checkOut: syncData.checkOut || prev.checkOut,
        adults: syncData.adults !== undefined ? syncData.adults : prev.adults,
        children: syncData.children !== undefined ? syncData.children : prev.children,
      }));

      const matchedRoom = ROOMS_DATA.find((r) => r.id === targetUnitId);
      if (matchedRoom) {
        setSyncedBanner(
          lang === 'ar'
            ? `تم تحديث الحاسبة بحساب إجمالي التكلفة بناءً على (${matchedRoom.titleAr}) والتواريخ المحددة في النموذج المنبثق ✨`
            : `Calculator updated with total cost for (${matchedRoom.titleEn}) and dates from quick booking popup ✨`
        );
        setTimeout(() => setSyncedBanner(null), 7000);
      }
    } else if (preselectedUnitId) {
      setForm((prev) => ({
        ...prev,
        unitId: preselectedUnitId,
      }));
    }
  }, [syncData, preselectedUnitId, lang]);

  // Selected Room
  const selectedRoom = useMemo(() => {
    return ROOMS_DATA.find((r) => r.id === form.unitId) || ROOMS_DATA[0];
  }, [form.unitId]);

  // Accurate day-by-day calculation based on official 2026 tariff sheets
  const stayPricing = useMemo(() => {
    return calculateStayPricing(
      selectedRoom,
      form.checkIn,
      form.checkOut,
      form.mealPlan,
      form.adults
    );
  }, [selectedRoom, form.checkIn, form.checkOut, form.mealPlan, form.adults]);

  const nights = stayPricing.nights;
  const baseRoomTotal = stayPricing.baseTotal;
  const mealsTotal = stayPricing.mealsTotal;
  const subTotal = stayPricing.subTotal;
  const discountRate = stayPricing.discountRate;
  const discountAmount = stayPricing.discountAmount;
  const finalTotal = stayPricing.finalTotal;

  // Build WhatsApp Message with 2026 tariff reference
  const buildWhatsAppMessage = () => {
    const unitName = lang === 'ar' ? selectedRoom.titleAr : selectedRoom.titleEn;
    const seasonLabel = stayPricing.isSummerPeriod
      ? lang === 'ar' ? 'موسم الصيف والأعياد (تعريفة 2026)' : 'Summer & Holidays (2026 Tariff)'
      : lang === 'ar' ? 'الموسم الشتوي (تعريفة 2026)' : 'Winter Season (2026 Tariff)';
    const mealLabel =
      form.mealPlan === 'breakfast'
        ? lang === 'ar' ? 'مع الإفطار الفندقي بوفيه مفتوح' : 'With Buffet Breakfast'
        : form.mealPlan === 'half_board'
        ? lang === 'ar' ? 'إقامة نصف شاملة (فطور وعشاء)' : 'Half Board'
        : form.mealPlan === 'all_inclusive'
        ? lang === 'ar' ? 'إقامة كاملة (جميع الوجبات ومشروبات)' : 'All Inclusive'
        : lang === 'ar' ? 'بدون وجبات (مطبخ مجهز بالوحدة)' : 'Room Only';

    if (lang === 'ar') {
      return `مرحباً فندق ومنتجع موسى كوست، أود حجز إقامة وفق تسعيرة 2026 الرسمية:
- الوحدة: ${unitName} (${selectedRoom.unitType === 'hotel' ? 'فندقي' : 'شاليه إيجار'})
- التواريخ: من ${form.checkIn} إلى ${form.checkOut} (${nights} ليالي: ${stayPricing.weekdayNights} وسط الأسبوع، ${stayPricing.weekendNights} ويك إند)
- الفترة: ${seasonLabel}
- عدد النزلاء: ${form.adults} بالغين، ${form.children} أطفال
- نظام الوجبات: ${mealLabel}
- الإجمالي التقديري بعد خصم الحجز المباشر (15%): ${finalTotal.toLocaleString()} جنيه مصري
${form.guestName ? `- الاسم: ${form.guestName}` : ''}
${form.guestPhone ? `- الهاتف: ${form.guestPhone}` : ''}
${form.specialRequests ? `- طلبات خاصة: ${form.specialRequests}` : ''}

يرجى تأكيد الإمكانية وحساب العربون عبر بنك CIB. شكراً جزيلاً!`;
    } else {
      return `Hello Mousa Coast Resort, I would like to book a stay based on official 2026 rates:
- Unit: ${unitName} (${selectedRoom.unitType === 'hotel' ? 'Hotel' : 'Rental Chalet'})
- Dates: from ${form.checkIn} to ${form.checkOut} (${nights} Nights: ${stayPricing.weekdayNights} Weekday, ${stayPricing.weekendNights} Weekend)
- Season: ${seasonLabel}
- Guests: ${form.adults} Adults, ${form.children} Children
- Meal Plan: ${mealLabel}
- Estimated Total with 15% discount: ${finalTotal.toLocaleString()} EGP
${form.guestName ? `- Name: ${form.guestName}` : ''}
${form.guestPhone ? `- Phone: ${form.guestPhone}` : ''}
${form.specialRequests ? `- Special Requests: ${form.specialRequests}` : ''}

Please confirm availability and CIB deposit transfer details. Thank you!`;
    }
  };

  const handleSendWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const msg = buildWhatsAppMessage();
    window.open(
      `https://wa.me/${RESORT_CONTACT.primaryPhoneRaw}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  const handleSendEmail = () => {
    const unitName = lang === 'ar' ? selectedRoom.titleAr : selectedRoom.titleEn;
    const mealLabel =
      form.mealPlan === 'breakfast'
        ? lang === 'ar' ? 'مع الإفطار (بوفيه مفتوح)' : 'With Breakfast'
        : form.mealPlan === 'half_board'
        ? lang === 'ar' ? 'إقامة نصف شاملة (فطور وعشاء)' : 'Half Board'
        : form.mealPlan === 'all_inclusive'
        ? lang === 'ar' ? 'إقامة كاملة (Soft All-Inclusive)' : 'All Inclusive'
        : lang === 'ar' ? 'إقامة بدون وجبات' : 'Room Only';

    const subject =
      lang === 'ar'
        ? `طلب حجز إقامة - ${unitName} - منتجع موسى كوست`
        : `Reservation Request - ${unitName} - Mousa Coast Resort`;

    const body =
      lang === 'ar'
        ? `عناية السيد / أحمد ماضي - إدارة التطوير والمبيعات،
فندق ومنتجع موسى كوست (Mousa Coast Developments)

أود تأكيد رغبتي في حجز إقامة بالبيانات المحددة أدناه:
• نوع الوحدة: ${unitName}
• تاريخ الوصول: ${form.checkIn}
• تاريخ المغادرة: ${form.checkOut} (${nights} ليالي)
• عدد النزلاء: ${form.adults} بالغين، ${form.children} أطفال
• نظام الوجبات: ${mealLabel}
• التكلفة التقديرية بعد خصم الحجز المباشر (15%): ${finalTotal.toLocaleString()} جنيه مصري
${form.guestName ? `• اسم النزيل: ${form.guestName}` : ''}
${form.guestPhone ? `• رقم الهاتف: ${form.guestPhone}` : ''}
${form.specialRequests ? `• ملاحظات خاصة: ${form.specialRequests}` : ''}

يرجى إفادتنا بتأكيد الإمكانية وتفاصيل سداد العربون.
شكراً جزيلاً.`
        : `Attention: Ahmed Mady - Sales & Development Management,
Mousa Coast Resort & Developments

I would like to submit a reservation request with the following details:
• Unit Type: ${unitName}
• Check-in Date: ${form.checkIn}
• Check-out Date: ${form.checkOut} (${nights} Nights)
• Guests: ${form.adults} Adults, ${form.children} Children
• Meal Plan: ${mealLabel}
• Estimated Total (15% direct discount applied): ${finalTotal.toLocaleString()} EGP
${form.guestName ? `• Guest Name: ${form.guestName}` : ''}
${form.guestPhone ? `• Contact Phone: ${form.guestPhone}` : ''}
${form.specialRequests ? `• Special Requests: ${form.specialRequests}` : ''}

Please confirm availability and booking guarantee steps.
Best regards.`;

    window.location.href = `mailto:${RESORT_CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleQuickCallback = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccessModal(true);
  };

  return (
    <section id="calculator" className="py-20 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'ar' ? 'حساب فوري وتأكيد سريع' : 'Instant Estimation & Direct Booking'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.calculatorTitle}
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.calculatorSubtitle}
          </p>
        </div>

        {/* Live Synchronization Notification Banner */}
        {syncedBanner && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs sm:text-sm font-bold flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </span>
              <span>{syncedBanner}</span>
            </div>
            <button
              onClick={() => setSyncedBanner(null)}
              className="text-stone-400 hover:text-stone-700 text-xs px-2 py-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Calculator Main Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-stone-200/90 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Form Inputs Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r rtl:lg:border-r-0 rtl:lg:border-l border-stone-200">
              <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                <span>{lang === 'ar' ? 'بيانات الإقامة والمواعيد' : 'Stay Dates & Preferences'}</span>
              </h3>

              <div className="space-y-5">
                {/* Unit Type Selection */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    {t.unitType}
                  </label>
                  <select
                    value={form.unitId}
                    onChange={(e) => setForm({ ...form, unitId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50 font-medium text-stone-900 text-sm"
                  >
                    {ROOMS_DATA.map((r) => (
                      <option key={r.id} value={r.id}>
                        {lang === 'ar' ? r.titleAr : r.titleEn} — ({r.pricePerNight.toLocaleString()}{' '}
                        {lang === 'ar' ? 'ج.م/ليلة' : 'EGP/night'})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      {t.checkIn}
                    </label>
                    <input
                      type="date"
                      value={form.checkIn}
                      onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50 text-stone-900 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      {t.checkOut}
                    </label>
                    <input
                      type="date"
                      value={form.checkOut}
                      onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50 text-stone-900 text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Guests Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      {lang === 'ar' ? 'البالغين (+12 سنة)' : 'Adults (12+ yrs)'}
                    </label>
                    <div className="flex items-center rounded-xl border border-stone-300 bg-stone-50 overflow-hidden">
                      <button
                        type="button"
                        onClick={() =>
                          setForm({ ...form, adults: Math.max(1, form.adults - 1) })
                        }
                        className="px-3.5 py-2.5 text-stone-700 hover:bg-stone-200 font-bold"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-stone-900 text-sm">
                        {form.adults}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            adults: Math.min(selectedRoom.maxGuests, form.adults + 1),
                          })
                        }
                        className="px-3.5 py-2.5 text-stone-700 hover:bg-stone-200 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                      {lang === 'ar' ? 'الأطفال (0-11 سنة)' : 'Children (0-11 yrs)'}
                    </label>
                    <div className="flex items-center rounded-xl border border-stone-300 bg-stone-50 overflow-hidden">
                      <button
                        type="button"
                        onClick={() =>
                          setForm({ ...form, children: Math.max(0, form.children - 1) })
                        }
                        className="px-3.5 py-2.5 text-stone-700 hover:bg-stone-200 font-bold"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-stone-900 text-sm">
                        {form.children}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setForm({ ...form, children: Math.min(4, form.children + 1) })
                        }
                        className="px-3.5 py-2.5 text-stone-700 hover:bg-stone-200 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Meal Plan Selection */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    {lang === 'ar' ? 'نظام الوجبات المفضل' : 'Preferred Meal Plan'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'room_only', ar: 'بدون وجبات', en: 'Room Only', extra: 0 },
                      { id: 'breakfast', ar: 'إفطار بوفيه', en: 'Breakfast', extra: 200 },
                      { id: 'half_board', ar: 'إقامة نصفية (فطور وعشاء)', en: 'Half Board', extra: 500 },
                      { id: 'all_inclusive', ar: 'إقامة كاملة (Soft All-Inc)', en: 'All-Inclusive', extra: 850 },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setForm({ ...form, mealPlan: m.id as any })}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          form.mealPlan === m.id
                            ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-xs'
                            : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                        }`}
                      >
                        <div>{lang === 'ar' ? m.ar : m.en}</div>
                        {m.extra > 0 && (
                          <div className="text-[10px] text-stone-500 mt-1">
                            +{m.extra} {lang === 'ar' ? 'ج.م/فرد' : 'EGP/p'}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest Contact fields */}
                <div className="pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.guestNameLabel} ({lang === 'ar' ? 'اختياري' : 'Optional'})
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'ar' ? 'مثال: محمد علي' : 'e.g., Mohamed Ali'}
                      value={form.guestName}
                      onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.guestPhoneLabel} ({lang === 'ar' ? 'اختياري' : 'Optional'})
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      placeholder="010xxxxxxxx"
                      value={form.guestPhone}
                      onChange={(e) => setForm({ ...form, guestPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-stone-50 text-left"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Price Summary & WhatsApp CTA Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-stone-900 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-400" />
                    <span>{lang === 'ar' ? 'تفاصيل التكلفة التقديرية' : 'Cost Breakdown'}</span>
                  </h4>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5" />
                    <span>-15%</span>
                  </span>
                </div>

                {/* Selected Unit Mini Card */}
                <div className="mt-5 p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700/80 flex items-center gap-3">
                  <img
                    src={selectedRoom.image}
                    alt=""
                    className="w-16 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-bold text-white truncate">
                      {lang === 'ar' ? selectedRoom.titleAr : selectedRoom.titleEn}
                    </h5>
                    <p className="text-xs text-stone-400">
                      {nights} {lang === 'ar' ? 'ليالي' : 'Nights'} • {form.adults}{' '}
                      {lang === 'ar' ? 'بالغين' : 'Adults'}
                    </p>
                  </div>
                </div>

                {/* Itemized list */}
                <div className="mt-6 space-y-3 text-sm text-stone-300">
                  <div className="flex justify-between">
                    <span>
                      {lang === 'ar' ? 'سعر الإقامة الأساسي' : 'Base Room Price'} ({nights}{' '}
                      {lang === 'ar' ? 'ليالٍ' : 'Nights'} × {selectedRoom.pricePerNight.toLocaleString()})
                    </span>
                    <span className="font-semibold text-white">
                      {baseRoomTotal.toLocaleString()} {lang === 'ar' ? 'ج.م' : 'EGP'}
                    </span>
                  </div>

                  {mealsTotal > 0 && (
                    <div className="flex justify-between">
                      <span>{lang === 'ar' ? 'نظام الوجبات الإضافي' : 'Meal Plan Option'}</span>
                      <span className="font-semibold text-white">
                        +{mealsTotal.toLocaleString()} {lang === 'ar' ? 'ج.م' : 'EGP'}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.discountApplied}</span>
                    </span>
                    <span>
                      -{discountAmount.toLocaleString()} {lang === 'ar' ? 'ج.م' : 'EGP'}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-stone-800 flex justify-between items-baseline">
                    <div>
                      <span className="text-xs text-stone-400 block">{t.totalPrice}</span>
                      <span className="text-3xl font-black text-amber-400">
                        {finalTotal.toLocaleString()}
                      </span>{' '}
                      <span className="text-xs font-bold text-stone-300">
                        {lang === 'ar' ? 'جنيه مصري' : 'EGP'}
                      </span>
                    </div>
                    <div className="text-xs text-stone-400 text-right">
                      {lang === 'ar' ? 'شامل الضرائب والخدمة' : 'Taxes & service included'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-stone-800 space-y-2.5">
                <button
                  type="button"
                  onClick={() => handleSendWhatsApp()}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2.5 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>{t.sendWhatsAppBooking}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="w-full py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm bg-stone-800 hover:bg-stone-750 text-amber-300 border border-amber-500/40 hover:border-amber-400 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'ar' ? 'إرسال طلب الحجز بالإيميل الرسمي' : 'Send via Official Email'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleQuickCallback}
                  className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-stone-400 hover:text-white bg-stone-850 hover:bg-stone-800 border border-stone-800 transition-colors flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'ar' ? 'طلب معاودة اتصال هاتفية سريعة' : 'Request Quick Callback'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl relative">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-stone-900">
              {lang === 'ar' ? 'تم استلام طلبكم بنجاح!' : 'Request Received Successfully!'}
            </h3>

            <p className="mt-3 text-sm text-stone-600 leading-relaxed">
              {lang === 'ar'
                ? 'شكراً لتواصلكم مع فندق موسى كوست. سيقوم فريق الحجوزات بالتواصل معكم فوراً لتأكيد التفاصيل وتوفير أفضل العروض.'
                : 'Thank you for contacting Mousa Coast Resort. Our reservation desk will reach out immediately to confirm your stay.'}
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => {
                  setBookingSuccessModal(false);
                  handleSendWhatsApp();
                }}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'ar' ? 'المتابعة عبر واتساب الآن' : 'Continue on WhatsApp Now'}</span>
              </button>

              <button
                onClick={() => setBookingSuccessModal(false)}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition-colors"
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
