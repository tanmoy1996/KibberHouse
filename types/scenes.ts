import type { CSSProperties } from "react";
export type SceneTheme = "light" | "cold" | "dark" | "warm" | "transparent";
export type SceneMode = "desktop" | "tablet" | "mobile";
export type SceneLengths = Record<SceneMode, number>;
export type SceneSettings = {
  theme: SceneTheme;
  headerTheme: "light" | "overlay";
  height: "viewport" | "compact";
  pin: boolean;
  scrollLength: SceneLengths;
};
export type SceneStyle = CSSProperties & {
  "--scene-desktop-length"?: string;
  "--scene-tablet-length"?: string;
  "--scene-mobile-length"?: string;
};
