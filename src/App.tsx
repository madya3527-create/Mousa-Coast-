import React, { useState, useEffect } from 'react';
import { Language, BookingSyncData } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { AccommodationsSection } from './components/AccommodationsSection';
import { AquaBeachSection } from './components/AquaBeachSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { PricingTableSection } from './components/PricingTableSection';
import { BookingCalculator } from './components/BookingCalculator';
import { LocationSection } from './components/LocationSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [preselectedUnitId, setPreselectedUnitId] = useState<string | undefined>(undefined);
  const [bookingSyncData, setBookingSyncData] = useState<BookingSyncData | undefined>(undefined);

  // Synchronize document dir and lang with state
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleSelectRoomForBooking = (roomId: string) => {
    setPreselectedUnitId(roomId);
    setBookingSyncData((prev) => ({
      ...prev,
      unitId: roomId,
      syncedAt: Date.now(),
    }));
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* Fixed Navigation Header */}
      <Navbar lang={lang} onToggleLang={toggleLanguage} activeSection="home" />

      {/* Hero Welcome Banner */}
      <main className="flex-1">
        <Hero lang={lang} />

        {/* 4-Star & Capacity Key Stats */}
        <StatsSection lang={lang} />

        {/* Rooms, Suites & Chalets (60 apartments, 13 suites, 30 rooms) */}
        <AccommodationsSection
          lang={lang}
          onSelectRoomForBooking={handleSelectRoomForBooking}
        />

        {/* Aqua Park, Private Sandy Beach & Pools */}
        <AquaBeachSection lang={lang} />

        {/* 10 Key Amenities & Facilities */}
        <AmenitiesSection lang={lang} />

        {/* Official Approved Rate Directory & Pricing Guide 2026 */}
        <PricingTableSection
          lang={lang}
          onSelectRoomForBooking={handleSelectRoomForBooking}
        />

        {/* Dynamic Interactive Booking & Price Estimator with WhatsApp Confirmation */}
        <BookingCalculator
          lang={lang}
          preselectedUnitId={preselectedUnitId}
          syncData={bookingSyncData}
        />

        {/* Location & 90-Min Drive Route from Cairo */}
        <LocationSection lang={lang} />

        {/* Photo Gallery & Lightbox */}
        <GallerySection lang={lang} />

        {/* Guest Reviews & Trust */}
        <ReviewsSection lang={lang} />

        {/* FAQ Accordion */}
        <FaqSection lang={lang} />

        {/* Direct Contacts & Inquiry Form */}
        <ContactSection lang={lang} />
      </main>

      {/* Comprehensive Footer */}
      <Footer lang={lang} />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp
        lang={lang}
        onSyncBooking={(data) => setBookingSyncData(data)}
      />
    </div>
  );
}
