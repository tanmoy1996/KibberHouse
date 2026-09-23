import type { Activity } from "@/types/content";
import { seasons } from "./seasons";
export const activities = [
  {
    id: "snow-leopard",
    name: "Snow leopard expeditions",
    season: seasons.snowLeopard,
  },
  {
    id: "wildlife",
    name: "Other wildlife spotting",
    subjects: [
      "Ibex",
      "Wolf",
      "Blue sheep",
      "Red fox",
      "Lammergeier",
      "Golden eagle",
    ],
  },
  { id: "birding", name: "Birding" },
  { id: "trekking", name: "Trekking", subjects: ["Kanamo", "Parang La"] },
  { id: "culture", name: "Culture and heritage" },
  { id: "village-walks", name: "Village walks" },
  { id: "hikes", name: "One-day hikes" },
  { id: "stargazing", name: "Stargazing" },
  { id: "cycles", name: "Cycles on hire" },
  { id: "camping", name: "Camping", season: seasons.camping },
] as const satisfies readonly Activity[];
