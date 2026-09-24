import { brand } from "@/config/brand";
export const house = {
  ...brand,
  altitude: "4,270 m",
  distanceFromKaza: "18 km",
  distanceFromKeyGompa: "7 km",
  rooms: 6,
  roomCategories: { superDeluxe: 1, deluxe: 5 },
  januaryNight: "−25 °C",
  supportingConcept:
    "Six warm rooms and a greenhouse where guests can sit comfortably while winter temperatures outside can reach approximately −25 °C.",
  commonSpaces: [
    "Dedicated working space",
    "Sitting lounge",
    "Greenhouse lounge",
    "Reading lounge",
    "Indoor games",
    "Music room",
  ],
  hotWater: {
    summer: "24 hours from April to September",
    winter: "3 buckets per room daily, complimentary, from October to March",
  },
  mealPlans: [
    { code: "EP", description: "Room and tea twice daily" },
    { code: "CP", description: "Room, breakfast and tea twice daily" },
    { code: "MAP", description: "Room, breakfast, dinner and tea twice daily" },
    {
      code: "AP",
      description: "Room, breakfast, lunch, dinner and tea twice daily",
    },
  ],
  policies: [
    { label: "Check-in", value: "12:00 PM" },
    { label: "Check-out", value: "10:00 AM" },
    { label: "Early or late", value: "Subject to availability" },
    { label: "Smoking", value: "Not permitted inside" },
    {
      label: "Alcohol",
      value: "Not permitted in common spaces or in front of other guests",
    },
    { label: "Pets", value: "Welcome; extra charge applies" },
    { label: "Campfire", value: "On request; extra charge applies" },
    { label: "Quiet hours", value: "From 10:00 PM" },
    { label: "Government photo ID", value: "Required for all guests" },
    { label: "Laundry", value: "Chargeable on request" },
  ],
} as const;
