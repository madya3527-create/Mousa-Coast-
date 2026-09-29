import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { RESORT_CONTACT, ROOMS_DATA } from '../data/resortData';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Headphones,
  Mail,
} from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(ROOMS_DATA[0].id);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const unitObj = ROOMS_DATA.find((r) => r.id === selectedUnit);
    const unitTitle = unitObj ? (lang === 'ar' ? unitObj.titleAr : unitObj.titleEn) : '';

    const text =
      lang === 'ar'
        ? `السلام عليكم، استفسار من موقع فندق موسى كوست:
- الاسم: ${name || 'زائر'}
- الهاتف: ${phone || 'غير محدد'}
- الوحدة المطلوبة: ${unitTitle}
- نص الرسالة: ${message || 'أرغب في معرفة أحدث العروض والأسعار المتاحة'}`
        : `Hello, inquiry from Mousa Coast website:
- Name: ${name || 'Visitor'}
- Phone: ${phone || 'Not specified'}
- Unit interested: ${unitTitle}
- Message: ${message || 'I would like to inquire about the latest offers and rates'}`;

    window.open(
      `https://wa.me/${RESORT_CONTACT.primaryPhoneRaw}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
    setSubmitted(true);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const unitObj = ROOMS_DATA.find((r) => r.id === selectedUnit);
    const unitTitle = unitObj ? (lang === 'ar' ? unitObj.titleAr : unitObj.titleEn) : '';

    const subject =
      lang === 'ar'
        ? `طلب استفسار وحجز - ${name || 'عميل'} - فندق موسى كوست`
        : `Reservation Inquiry - ${name || 'Guest'} - Mousa Coast Resort`;

    const body =
      lang === 'ar'
        ? `السيد أحمد ماضي / إدارة التطوير والمبيعات - فندق ومنتجع موسى كوست،

أود تقديم طلب الاستفسار التالي بخصوص الإقامة:
• الاسم: ${name || 'زائر الموقع'}
• رقم الهاتف: ${phone || 'غير محدد'}
• الوحدة المطلوبة: ${unitTitle}
• نص الاستفسار:
${message || 'يرجى موافاتنا بالأسعار والعروض المتاحة لتاريخ إقامتنا.'}

شاكراً لكم حسن تعاونكم الدائم.`
        : `Dear Ahmed Mady / Mousa Coast Developments Management,

I would like to submit the following reservation inquiry:
• Name: ${name || 'Guest'}
• Phone: ${phone || 'Not specified'}
• Preferred Unit: ${unitTitle}
• Inquiry Details:
${message || 'Please send current availability and promotional rates.'}

Best regards.`;

    window.location.href = `mailto:${RESORT_CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-20 bg-stone-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
            <Headphones className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'ar' ? 'خدمة عملاء فورية' : '24/7 Dedicated Support'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t.contactTitle}
          </h2>
          <p className="mt-3 text-stone-300 text-base sm:text-lg leading-relaxed">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Direct Buttons Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* Executive Corporate & Email Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-850 via-stone-800 to-stone-900 border border-amber-500/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  {lang === 'ar' ? 'الإدارة العامة والتطوير السياحي' : 'Executive Management & Corporate'}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-medium">
                  {lang === 'ar' ? 'معتمد' : 'Official'}
                </span>
              </div>

              <div className="text-sm font-bold text-stone-200 mb-1">
                {lang === 'ar' ? RESORT_CONTACT.companyNameAr : RESORT_CONTACT.companyNameEn}
              </div>

              <div className="text-xs text-stone-400 mb-3">
                {lang === 'ar' ? RESORT_CONTACT.departmentAr : RESORT_CONTACT.departmentEn}
              </div>

              <div className="p-3 rounded-2xl bg-stone-900/90 border border-stone-700/80 mb-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-amber-300 font-semibold truncate select-all" dir="ltr">
                    {RESORT_CONTACT.email}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`mailto:${RESORT_CONTACT.email}?subject=${encodeURIComponent(
                    lang === 'ar' ? 'طلب حجز واستفسار - منتجع موسى كوست' : 'Reservation Inquiry - Mousa Coast'
                  )}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 font-bold text-xs sm:text-sm text-stone-950 flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]"
                >
                  <Mail className="w-4 h-4 text-stone-950" />
                  <span>{lang === 'ar' ? 'مراسلة الإدارة بالإيميل' : 'Send Official Email'}</span>
                </a>
              </div>
            </div>

            {/* Primary WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-stone-800 border border-stone-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {lang === 'ar' ? 'الواتساب الرئيسي المباشر' : 'Official Primary WhatsApp'}
                </span>
                <span className="text-xs text-stone-400">{t.workingHours}</span>
              </div>

              <div className="text-2xl font-black text-white mb-2" dir="ltr">
                {RESORT_CONTACT.primaryPhoneDisplay}
              </div>

              <p className="text-xs text-stone-400 mb-4 leading-relaxed">
                {lang === 'ar'
                  ? 'متاح على مدار الساعة للرد الفوري على استفسارات الحجز والتأكيد وإرسال صور الوحدات.'
                  : 'Available 24/7 for instant reservation assistance, rates, and unit photos.'}
              </p>

              <div className="flex gap-2">
                <a
                  href={`https://wa.me/${RESORT_CONTACT.primaryPhoneRaw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.bookViaWhatsApp}</span>
                </a>

                <a
                  href={`tel:${RESORT_CONTACT.primaryPhoneRaw}`}
                  className="py-3 px-4 rounded-xl bg-stone-700 hover:bg-stone-600 font-bold text-xs sm:text-sm text-stone-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                </a>
              </div>
            </div>

            {/* Secondary WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-stone-800 border border-stone-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {lang === 'ar' ? 'خط الحجز البديل' : 'Secondary Reservation Line'}
                </span>
                <span className="text-xs text-stone-400">24/7</span>
              </div>

              <div className="text-2xl font-black text-white mb-2" dir="ltr">
                {RESORT_CONTACT.secondaryPhoneDisplay}
              </div>

              <p className="text-xs text-stone-400 mb-4">
                {lang === 'ar'
                  ? 'خط مساند إضافي لخدمة النزلاء ومتابعة الحجوزات السريعة.'
                  : 'Alternative line for continuous guest service and quick booking.'}
              </p>

              <div className="flex gap-2">
                <a
                  href={`https://wa.me/${RESORT_CONTACT.secondaryPhoneRaw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-stone-700 hover:bg-stone-600 font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'ar' ? 'محادثة الخط الثاني' : 'Chat Second Line'}</span>
                </a>

                <a
                  href={`tel:${RESORT_CONTACT.secondaryPhoneRaw}`}
                  className="py-3 px-4 rounded-xl bg-stone-750 hover:bg-stone-700 font-bold text-xs sm:text-sm text-stone-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                </a>
              </div>
            </div>

            {/* Location & Hours Card */}
            <div className="p-6 rounded-3xl bg-stone-800/60 border border-stone-700/60 space-y-3 text-xs sm:text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>{lang === 'ar' ? RESORT_CONTACT.locationAr : RESORT_CONTACT.locationEn}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  {lang === 'ar'
                    ? 'تسجيل الوصول: 02:00 م | المغادرة: 12:00 ظهراً'
                    : 'Check-in: 02:00 PM | Check-out: 12:00 PM'}
                </span>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-stone-800 p-6 sm:p-8 lg:p-10 rounded-3xl border border-stone-700">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              {lang === 'ar' ? 'أرسل استفسارك أو طلب الحجز' : 'Send Direct Reservation Inquiry'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mb-6">
              {lang === 'ar'
                ? 'املأ البيانات وسيتم تحويلها لرسالة واتساب جاهزة للتواصل المباشر مع موظف الحجوزات فوراً.'
                : 'Fill in your details to instantly send a formatted inquiry to our reservation desk.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t.guestNameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'اسمك الكريم' : 'Your Name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {t.guestPhoneLabel} *
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="010xxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm text-left"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {lang === 'ar' ? 'الوحدة التي ترغب بالاستفسار عنها' : 'Unit of Interest'}
                </label>
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm"
                >
                  {ROOMS_DATA.map((r) => (
                    <option key={r.id} value={r.id}>
                      {lang === 'ar' ? r.titleAr : r.titleEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  {lang === 'ar' ? 'تفاصيل رسالتك أو استفسارك' : 'Your Message / Inquiry'}
                </label>
                <textarea
                  rows={4}
                  placeholder={
                    lang === 'ar'
                      ? 'اذكر تاريخ الوصول التقريبي، عدد الأفراد، أو أي أسئلة أخرى...'
                      : 'Mention approximate arrival dates, guests, or questions...'
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-4 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-xl shadow-emerald-950 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>{lang === 'ar' ? 'إرسال الطلب عبر واتساب' : 'Send via WhatsApp'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  className="py-4 px-5 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <Mail className="w-5 h-5 text-stone-950" />
                  <span>{lang === 'ar' ? 'إرسال للإيميل الرسمي' : 'Send via Email'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
