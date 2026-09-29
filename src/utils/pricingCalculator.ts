import { Room } from '../types';

export interface CalculatedStayPricing {
  nights: number;
  weekdayNights: number;
  weekendNights: number;
  baseTotal: number;
  isSummerPeriod: boolean;
  discountRate: number;
  discountAmount: number;
  subTotal: number;
  finalTotal: number;
  averageNightlyRate: number;
  mealsTotal: number;
}

export function calculateStayPricing(
  room: Room,
  checkInStr: string,
  checkOutStr: string,
  mealPlan: 'room_only' | 'breakfast' | 'half_board' | 'all_inclusive' = 'room_only',
  adults: number = 2
): CalculatedStayPricing {
  let weekdayNights = 0;
  let weekendNights = 0;
  let calculatedBaseTotal = 0;

  const start = new Date(checkInStr);
  const end = new Date(checkOutStr);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
    const defaultRate = room.rates?.summerWeekday || room.pricePerNight;
    const discount = Math.round(defaultRate * 0.15);
    return {
      nights: 1,
      weekdayNights: 1,
      weekendNights: 0,
      baseTotal: defaultRate,
      isSummerPeriod: true,
      discountRate: 0.15,
      discountAmount: discount,
      subTotal: defaultRate,
      finalTotal: defaultRate - discount,
      averageNightlyRate: defaultRate - discount,
      mealsTotal: 0,
    };
  }

  const curr = new Date(start);
  let summerCount = 0;
  let totalNights = 0;

  while (curr < end) {
    totalNights++;
    const m = curr.getMonth(); // 0-indexed: 3 = April, 9 = October
    const d = curr.getDate();
    const dayOfWeek = curr.getDay(); // 0=Sun, 4=Thu, 5=Fri, 6=Sat

    // Season: 1 April to 10 October (Summer & Eid al-Adha & Sham El Nessim)
    const isSummer = (m > 3 && m < 9) || (m === 3 && d >= 1) || (m === 9 && d <= 10);
    if (isSummer) summerCount++;

    // Egyptian weekend: Thursday and Friday nights
    const isWeekend = dayOfWeek === 4 || dayOfWeek === 5;
    if (isWeekend) {
      weekendNights++;
    } else {
      weekdayNights++;
    }

    let nightRate = room.pricePerNight;
    if (room.rates) {
      if (isSummer) {
        nightRate = isWeekend ? room.rates.summerWeekend : room.rates.summerWeekday;
      } else {
        nightRate = isWeekend ? room.rates.winterWeekend : room.rates.winterWeekday;
      }
    }

    calculatedBaseTotal += nightRate;
    curr.setDate(curr.getDate() + 1);
  }

  const nights = totalNights > 0 ? totalNights : 1;

  // Meal cost per adult per night
  let mealCostPerAdultNight = 0;
  switch (mealPlan) {
    case 'breakfast':
      // Hotel units already include breakfast in the 2026 tariff!
      mealCostPerAdultNight = room.unitType === 'hotel' ? 0 : 200;
      break;
    case 'half_board':
      mealCostPerAdultNight = room.unitType === 'hotel' ? 300 : 500;
      break;
    case 'all_inclusive':
      mealCostPerAdultNight = room.unitType === 'hotel' ? 650 : 850;
      break;
    default:
      mealCostPerAdultNight = 0;
  }

  const mealsTotal = mealCostPerAdultNight * adults * nights;
  const subTotal = calculatedBaseTotal + mealsTotal;
  const discountRate = 0.15; // 15% direct booking benefit
  const discountAmount = Math.round(subTotal * discountRate);
  const finalTotal = subTotal - discountAmount;

  return {
    nights,
    weekdayNights,
    weekendNights,
    baseTotal: calculatedBaseTotal,
    isSummerPeriod: summerCount >= totalNights / 2,
    discountRate,
    discountAmount,
    subTotal,
    finalTotal,
    averageNightlyRate: Math.round(finalTotal / nights),
    mealsTotal,
  };
}
