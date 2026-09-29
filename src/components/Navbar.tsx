import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { RESORT_CONTACT } from '../data/resortData';
import { Phone, MessageCircle, Menu, X, Globe, Sparkles, MapPin } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.navHome },
    { href: '#accommodations', label: t.navRooms },
    { href: '#aquabeach', label: t.navAquaBeach },
    { href: '#amenities', label: t.navAmenities },
    { href: '#pricing', label: t.navPricing },
    { href: '#calculator', label: t.navCalculator },
    { href: '#gallery', label: t.navGallery },
    { href: '#location', label: t.navLocation },
    { href: '#reviews', label: t.navReviews },
    { href: '#faq', label: t.navFaq },
    { href: '#contact', label: t.navContact },
  ];

  const handleWhatsAppClick = () => {
    const defaultMsg = lang === 'ar'
      ? 'مرحباً، أود الاستفسار عن تفاصيل الحجز والإقامة في فندق موسى كوست'
      : 'Hello, I would like to inquire about booking a stay at Mousa Coast Resort';
    window.open(`https://wa.me/${RESORT_CONTACT.primaryPhoneRaw}?text=${encodeURIComponent(defaultMsg)}`, '_blank');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-900/98 backdrop-blur-md py-2.5 shadow-xl border-b border-stone-800'
          : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent pt-2 pb-4'
      }`}
    >
      {/* Executive Corporate Topbar */}
      <div className="hidden md:block border-b border-white/10 pb-2 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] text-stone-300">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-bold tracking-wide">
              {lang === 'ar' ? RESORT_CONTACT.companyNameAr : RESORT_CONTACT.companyNameEn}
            </span>
            <span className="text-stone-600">|</span>
            <a
              href={`mailto:${RESORT_CONTACT.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors text-stone-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{lang === 'ar' ? 'الإدارة والحجوزات:' : 'Corporate & Bookings:'}</span>
              <span className="text-amber-300 font-mono tracking-tight underline underline-offset-2">
                {RESORT_CONTACT.email}
              </span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-stone-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>{lang === 'ar' ? 'رأس سدر (90 دقيقة من نفق الشهيد أحمد حمدي)' : 'Ras Sudr (90m from Cairo)'}</span>
            </span>
            <span className="text-stone-600">|</span>
            <span className="text-emerald-400 font-bold">
              {lang === 'ar' ? 'استقبال وخدمة 24/7' : '24/7 Concierge'}
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-stone-950 fill-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl font-extrabold text-white tracking-tight">
                  {t.brandName}
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  ⭐⭐⭐⭐
                </span>
              </div>
              <p className="text-xs text-amber-200/80 font-medium">
                {t.tagline}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2.5 py-1.5 rounded-lg text-stone-200 hover:text-amber-400 hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Quick Phone Call (Desktop / Tablet) */}
            <a
              href={`tel:${RESORT_CONTACT.primaryPhoneRaw}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-200 hover:text-white bg-stone-800/80 hover:bg-stone-800 border border-stone-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span dir="ltr">{RESORT_CONTACT.primaryPhoneDisplay}</span>
            </a>

            {/* WhatsApp Booking CTA */}
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-md shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>{t.bookViaWhatsApp}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900/98 border-t border-stone-800 px-4 pt-4 pb-6 mt-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-800 text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {t.brandSub}
              </span>
              <span className="text-amber-400 font-bold">{t.distancePill}</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-stone-200 hover:text-amber-400 hover:bg-stone-800 font-medium text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 mt-2 border-t border-stone-800 flex flex-col gap-2">
              <a
                href={`tel:${RESORT_CONTACT.primaryPhoneRaw}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-800 text-white font-medium text-sm border border-stone-700"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'اتصال مباشر:' : 'Direct Call:'}</span>
                <span dir="ltr">{RESORT_CONTACT.primaryPhoneDisplay}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppClick();
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.bookViaWhatsApp}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
