export type Language = 'ar' | 'en';

export type RoomCategory = 'all' | 'hotel' | 'rental' | 'apartment' | 'suite' | 'room' | 'villa';

export interface RoomRates {
  summerWeekday: number; // 1 Apr - 10 Oct (Sham El Nessim & Eid al-Adha)
  summerWeekend: number;
  winterWeekday: number; // 10 Oct - 31 Dec
  winterWeekend: number;
}

export interface Room {
  id: string;
  category: 'apartment' | 'suite' | 'room' | 'villa';
  unitType: 'hotel' | 'rental';
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  count: number;
  area: string;
  maxGuests: number;
  bedAr: string;
  bedEn: string;
  viewAr: string;
  viewEn: string;
  pricePerNight: number;
  originalPrice?: number;
  rates: RoomRates;
  image: string;
  gallery: string[];
  descriptionAr: string;
  descriptionEn: string;
  featuresAr: string[];
  featuresEn: string[];
  boardTypeAr: string;
  boardTypeEn: string;
  popular?: boolean;
}

export interface Amenity {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: string;
  image: string;
  tagAr: string;
  tagEn: string;
}

export interface Review {
  id: string;
  name: string;
  cityAr: string;
  cityEn: string;
  rating: number;
  dateAr: string;
  dateEn: string;
  commentAr: string;
  commentEn: string;
  unitTypeAr: string;
  unitTypeEn: string;
}

export interface FaqItem {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  category: 'booking' | 'location' | 'facilities' | 'policy';
}

export interface BookingFormState {
  checkIn: string;
  checkOut: string;
  unitId: string;
  adults: number;
  children: number;
  mealPlan: 'room_only' | 'breakfast' | 'half_board' | 'all_inclusive';
  guestName: string;
  guestPhone: string;
  specialRequests: string;
}

export interface BookingSyncData {
  unitId?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  syncedAt?: number;
}
