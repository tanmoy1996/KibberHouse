"use client";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/animations/prefersReducedMotion";
export function ScrollCue() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const update = () => {
      if (ref.current) ref.current.hidden = window.scrollY > 24;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <p
      ref={ref}
      className="scroll-cue type-label"
      data-reduced-motion={reduced}
    >
      Scroll
      <span aria-hidden="true" />
    </p>
  );
}
