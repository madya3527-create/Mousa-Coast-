# Professional Luxury Facade & Executive Email Integration

Transforming Mousa Coast Resort into an executive, high-end 4-star hospitality and developments platform with a cinematic architectural facade showcase and official corporate communication channels.

## User Review & Critical Decisions

> [!IMPORTANT]
> The plan integrates both recent user requirements:
> 1. **Professional Facade Image**: Implementing the cinematic, illuminated modern architectural resort facade at golden hour into the Hero section and an interactive architectural showcase.
> 2. **Official Corporate Email**: Setting `Ahmed.mady@mousacoastdevelopments.com` as the primary executive contact for reservations, corporate retreats, and sales, integrated across the header, contact cards, booking modal, and corporate footer.

- **Hero Facade Architecture**: We replace generic imagery with the newly generated high-definition 4-star resort facade featuring warm interior cove lighting, reflective pool waters, illuminated palm avenues, and discreet "MOUSA COAST" signage.
- **Corporate Developer Accreditation**: Introducing "Mousa Coast Developments" (شركة موسى كوست للتنمية والتطوير السياحي) corporate branding to give guests and corporate clients maximum trust and professional credibility.
- **Dual Booking Channel**: In the Booking Calculator, users can now choose between instant WhatsApp booking and direct official Email Reservation sent directly to `Ahmed.mady@mousacoastdevelopments.com` with formatted guest, date, and unit details.

---

## 1. Overview & Core Concept

- **What It Delivers**:
  1. **Cinematic First Impression**: A striking, ultra-luxury facade photography experience that establishes 4-star authority in the first 3 seconds of page load.
  2. **Official Executive Inquiries**: Dedicated corporate and reservation email channel (`Ahmed.mady@mousacoastdevelopments.com`) with one-click copy, direct mailto generation, and structured email booking.
  3. **Refined Corporate Touchpoints**: Professional top bar contact line, executive management card in the contact section, and legal corporate footer.
- **Target Audience**: Discerning vacationers, families, VIP guests, and corporate entities planning company retreats or group bookings at Ras Sudr.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Hero Facade Experience**:
   - Visitors land on a full-bleed, cinematic twilight facade view of the resort with a measured 60% gradient scrim.
   - Clear value proposition: *90 minutes from Cairo*, *4-Star Certified Hospitality*, and direct instant booking.
2. **Top Bar Executive Quick Access**:
   - A discreet, elegant top bar displays the corporate email `Ahmed.mady@mousacoastdevelopments.com` alongside the 24/7 hotline and language toggle.
3. **Interactive Booking via Email & WhatsApp**:
   - In the booking calculator, after selecting dates and room type, guests can click either:
     - **WhatsApp Confirmation**: Instant messaging with reservation agents.
     - **Email Confirmation**: Formats an executive reservation inquiry addressed to `Ahmed.mady@mousacoastdevelopments.com` with unit code, nights count, and discounted pricing.
4. **Executive Contact Card**:
   - In the Contact section, a distinguished "الإدارة العامة والمبيعات / General Management & Sales" card highlights the official email with a quick copy button and prompt status.

### Visual Styling & Palette
- **Hero Background**: `/resort/facade.jpg` with high-resolution responsive rendering and smooth CSS Ken Burns ambient reveal.
- **Accent Tokens**: Warm amber (`#F59E0B`) and emerald (`#10B981`) paired with deep architectural charcoal (`#1C1917` / `stone-900`) and pure ivory canvas.
- **Anti-Slop Discipline**: No generic floating badges; all metadata is cleanly unboxed with crisp typographic dividers (`·`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Primary Hero Image vs. Carousel**
  - *Chosen Approach*: Single dominant, pristine high-resolution facade anchor for the Hero, with thumbnail switcher to beach and pool views.
  - *Why*: Complies with the Focal Anchor principle in the Universal Design Constitution; one definitive visual anchor creates higher perceived value than a busy rotating carousel.
- **Decision 2: Dual Reservation Path (WhatsApp + Email)**
  - *Chosen Approach*: Offer both WhatsApp and Email in the booking summary.
  - *Why*: WhatsApp is ideal for fast personal bookings, while corporate clients and discerning guests often require official email confirmations for expense and record keeping.

---

## 4. Technical Architecture & Component Implementation

```
┌────────────────────────────────────────────────────────┐
│ App.tsx                                                │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Navbar: Includes topbar with official email       │  │
│  │ (Ahmed.mady@mousacoastdevelopments.com)          │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Hero.tsx: Displays /resort/facade.jpg backdrop    │  │
│  │ with luxury scrim, badge & direct booking CTA     │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ BookingCalculator.tsx: Dual Action                │  │
│  │ [WhatsApp Book] + [Official Email Book]          │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ContactSection.tsx: Executive Inquiries Card     │  │
│  │ with email, copy button, and mailto composer     │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Footer.tsx: "Mousa Coast Developments" imprint   │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Planned File Changes
1. **`src/data/resortData.ts`**:
   - Update `RESORT_CONTACT.email` to `Ahmed.mady@mousacoastdevelopments.com`.
   - Add `RESORT_CONTACT.corporateNameAr` ("شركة موسى كوست للتنمية والتطوير السياحي") and `corporateNameEn` ("Mousa Coast Developments").
   - Update Gallery to include the facade image under `architecture` category.
2. **`src/components/Hero.tsx`**:
   - Set `/resort/facade.jpg` as the primary background image with responsive fallback and elegant visual presentation.
3. **`src/components/Navbar.tsx`**:
   - Add a subtle top bar showing the corporate email and phone hotline for instant executive credibility.
4. **`src/components/ContactSection.tsx`**:
   - Enhance the email contact block into a dedicated Executive & Sales Management card with one-click copy and instant email trigger.
5. **`src/components/BookingCalculator.tsx`**:
   - Add an "إرسال طلب الحجز بالإيميل / Send via Official Email" button that generates a pre-formatted email to `Ahmed.mady@mousacoastdevelopments.com`.
6. **`src/components/Footer.tsx`**:
   - Add the official corporate email, developer legal imprint, and direct mail link.
