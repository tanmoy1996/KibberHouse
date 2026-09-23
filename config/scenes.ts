import type { SceneSettings } from "@/types/scenes";

export const sceneQueries = {
  desktop: "(min-width: 1024px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  mobile: "(max-width: 767px)",
  reduced: "(prefers-reduced-motion: reduce)",
  short: "(max-height: 500px)",
} as const;
// Total scene extent in viewport units, including the visible viewport.
// Only the first two scenes demonstrate pinning; other scenes stay in normal flow.
const natural = {
  height: "compact",
  pin: false,
  scrollLength: { desktop: 100, tablet: 100, mobile: 100 },
} as const;
export const sceneConfig = {
  mountains: {
    ...natural,
    theme: "cold",
    headerTheme: "overlay",
    height: "viewport",
    pin: false,
    scrollLength: { desktop: 100, tablet: 100, mobile: 100 },
  },
  houseReveal: {
    ...natural,
    theme: "light",
    headerTheme: "light",
    height: "viewport",
    pin: true,
    scrollLength: { desktop: 190, tablet: 155, mobile: 125 },
  },
  fieldData: { ...natural, theme: "light", headerTheme: "light" },
  interiorReveal: { ...natural, theme: "warm", headerTheme: "light" },
  bedWarmth: {
    ...natural,
    theme: "warm",
    headerTheme: "light",
  },
  greenhouse: { ...natural, theme: "light", headerTheme: "light" },
  rooms: { ...natural, theme: "warm", headerTheme: "light" },
  houseLife: { ...natural, theme: "light", headerTheme: "light" },
  outsideTransition: { ...natural, theme: "cold", headerTheme: "overlay" },
  wildlife: { ...natural, theme: "cold", headerTheme: "overlay" },
  activities: { ...natural, theme: "light", headerTheme: "light" },
  seasons: { ...natural, theme: "warm", headerTheme: "light" },
  gettingHere: { ...natural, theme: "light", headerTheme: "light" },
  stay: { ...natural, theme: "dark", headerTheme: "overlay" },
  final: { ...natural, theme: "cold", headerTheme: "overlay" },
} as const satisfies Record<string, SceneSettings>;
export type SceneKey = keyof typeof sceneConfig;
export const scrollDebug =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_SCROLL_DEBUG === "true";
