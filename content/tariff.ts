import type { rooms } from "@/content/rooms";

export type RoomCategoryId = (typeof rooms)[number]["id"];
export type MealCode = "EP" | "CP" | "MAP" | "AP";
export type Season = "on" | "off";

// All amounts in ₹, per room per night, for two guests sharing. INR is what guests pay;
// USD is shown only as a guide, converted at `usdRate`.
export const tariff = {
  usdRate: 93,
  seasons: {
    on: { label: "On-season", dates: "1 Oct – 31 Mar" },
    off: { label: "Off-season", dates: "1 Apr – 31 Jul" },
  },
  onRequest: { dates: "1 Aug – 30 Sep", note: "Rates on request — write to us with your dates." },
  // Room rent, with tea twice daily (EP).
  rooms: {
    "super-deluxe": { on: 7000, off: 3000 },
    deluxe: { on: 6000, off: 2000 },
  } satisfies Record<RoomCategoryId, Record<Season, number>>,
  // Meals on top of room rent, per room per night for two, in any room and season.
  meals: { EP: 0, CP: 1000, MAP: 1400, AP: 2000 } satisfies Record<MealCode, number>,
  extraAdult: { on: 1000, off: 700 },
  child: { on: 700, off: 500 },
  notIncluded: [
    "Transportation",
    "Snacks",
    "Personal expenses",
    "Activities and permits where applicable",
    "Extra pillow and blanket",
    "Laundry",
  ],
} as const;

// On-season Oct–Mar, off-season Apr–Jul; Aug–Sep is quoted on request (null).
export function seasonOf(iso: string): Season | null {
  const month = Number(iso.slice(5, 7));
  if (month >= 10 || month <= 3) return "on";
  if (month <= 7) return "off";
  return null;
}
