import type { Room } from "@/types/content";
export const rooms = [
  {
    id: "super-deluxe",
    name: "Super Deluxe",
    count: 1,
    bathroom: "attached",
    occupancy: "double",
    extraBed: "available on request",
  },
  {
    id: "deluxe",
    name: "Deluxe",
    count: 5,
    bathroom: "attached",
    occupancy: "double",
    extraBed: "available on request",
  },
] as const satisfies readonly Room[];
// House-level facilities; category-specific allocation has not been supplied.
export const facilities = [
  "Electric blankets",
  "Warm blankets",
  "Bukhari heating",
  "Mud floor with carpets where applicable",
  "Attached bathrooms",
  "Geyser",
  "Bathroom heater",
  "Wi-Fi subject to weather/network conditions",
  "Generator backup",
  "Free on-site parking",
] as const;

export const bedLayers = [
  "Bed Frame",
  "Mattress",
  "Electric Blanket",
  "Woollen Quilt",
  "Bed Sheet",
  "Woollen Quilt",
  "Duvet",
] as const;
