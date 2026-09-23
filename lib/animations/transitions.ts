"use client";
import type { gsap } from "gsap";
// Compose these inside the owning scene's timeline/context; none creates a global trigger.
type Timeline = gsap.core.Timeline;
type Target = gsap.TweenTarget;
type Position = gsap.Position;
export function fadeIn(
  timeline: Timeline,
  target: Target,
  position?: Position,
) {
  return timeline.fromTo(
    target,
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: "none" },
    position,
  );
}
export function fadeOut(
  timeline: Timeline,
  target: Target,
  position?: Position,
) {
  return timeline.to(
    target,
    { opacity: 0, duration: 0.4, ease: "none" },
    position,
  );
}
export function scaleTo(
  timeline: Timeline,
  target: Target,
  scale: number,
  position?: Position,
) {
  return timeline.to(target, { scale, duration: 1, ease: "none" }, position);
}
export function translateTo(
  timeline: Timeline,
  target: Target,
  x: number,
  y: number,
  position?: Position,
) {
  return timeline.to(target, { x, y, duration: 1, ease: "none" }, position);
}
export function revealClip(
  timeline: Timeline,
  target: Target,
  position?: Position,
) {
  return timeline.fromTo(
    target,
    { clipPath: "inset(0 0 100% 0)" },
    { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "none" },
    position,
  );
}
export function revealText(
  timeline: Timeline,
  target: Target,
  position?: Position,
) {
  return timeline.fromTo(
    target,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.45, ease: "power1.out" },
    position,
  );
}
