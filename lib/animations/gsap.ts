"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
let registered = false;
export function getGSAP() {
  if (typeof window === "undefined")
    throw new Error("GSAP must initialize in a client effect.");
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    registered = true;
  }
  return { gsap, ScrollTrigger };
}
