"use client";
import { getGSAP } from "./gsap";
import { requestSceneRefresh } from "./scrollTrigger";
declare global {
  interface Window {
    kibberScroll?: {
      inspect: () => {
        id: string;
        progress: number;
        start: number;
        end: number;
        active: boolean;
      }[];
      refresh: () => void;
    };
  }
}
// Installed only with the development debug flag; never exposed in production.
export function installScrollDebug() {
  window.kibberScroll = {
    inspect: () =>
      getGSAP()
        .ScrollTrigger.getAll()
        .map((trigger) => ({
          id: String(trigger.vars.id ?? "text-reveal"),
          progress: trigger.progress,
          start: trigger.start,
          end: trigger.end,
          active: trigger.isActive,
        })),
    refresh: requestSceneRefresh,
  };
  return () => {
    delete window.kibberScroll;
  };
}
