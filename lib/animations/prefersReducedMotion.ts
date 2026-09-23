"use client";
import { useSyncExternalStore } from "react";
import { sceneQueries } from "@/config/scenes";
function subscribe(callback: () => void) {
  const query = window.matchMedia(sceneQueries.reduced);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
export function prefersReducedMotion() {
  return (
    typeof window === "undefined" ||
    window.matchMedia(sceneQueries.reduced).matches
  );
}
// Conservative SSR fallback. Scene matchMedia owns the animation lifecycle separately.
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, prefersReducedMotion, () => true);
}
