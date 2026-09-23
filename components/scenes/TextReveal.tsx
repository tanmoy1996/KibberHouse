"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { getGSAP } from "@/lib/animations/gsap";
import { revealText } from "@/lib/animations/transitions";
export function TextReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const { gsap } = getGSAP();
    const media = gsap.matchMedia();
    media.add(
      `(prefers-reduced-motion: no-preference)`,
      () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 92%",
            toggleActions: "play none none none",
            once: true,
          },
        });
        revealText(timeline, ref.current);
      },
      ref.current,
    );
    // matchMedia's context reverts both animation styles and its own ScrollTrigger.
    return () => media.revert();
  }, []);
  return <div ref={ref}>{children}</div>;
}
