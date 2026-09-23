"use client";
import { getGSAP } from "./gsap";
let pendingFrame: number | null = null;
// Batch scene mounting/font readiness refreshes, never refresh from onUpdate or a ResizeObserver.
export function requestSceneRefresh() {
  if (pendingFrame !== null) return;
  pendingFrame = requestAnimationFrame(() => {
    pendingFrame = null;
    getGSAP().ScrollTrigger.refresh();
  });
}
