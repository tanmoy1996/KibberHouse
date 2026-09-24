"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/animations/prefersReducedMotion";

// Curtain and fade reveals for [data-reveal], and a gentle parallax for [data-parallax].
// Content stays visible without JavaScript or with reduced motion: hiding only
// starts once `.home--motion` is set here.
export function HomeMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".home");
    if (!root || prefersReducedMotion()) return;

    root.classList.add("home--motion");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    root.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));

    // Browsers with scroll-driven animations run the parallax in CSS on the
    // compositor; this scroll listener is only the fallback for the rest.
    const layers = CSS.supports("animation-timeline: view()")
      ? []
      : Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    function update() {
      frame = 0;
      const viewport = window.innerHeight;
      for (const layer of layers) {
        const rect = layer.parentElement!.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewport) continue;
        // -1 when the frame enters from below, 1 when it leaves at the top.
        const progress = (viewport - rect.top) / (viewport + rect.height) * 2 - 1;
        // Matches the CSS keyframes: ±14% of the layer uses its full overhang.
        const clamped = Math.max(-1, Math.min(1, progress));
        layer.style.transform = `translate3d(0, ${(clamped * 14).toFixed(2)}%, 0)`;
      }
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    if (layers.length) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      root.classList.remove("home--motion");
    };
  }, []);

  return null;
}
