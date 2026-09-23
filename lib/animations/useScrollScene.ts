"use client";
import { useEffect, useRef, type RefObject } from "react";
import type { gsap } from "gsap";
import { sceneQueries, scrollDebug } from "@/config/scenes";
import type { SceneMode, SceneSettings } from "@/types/scenes";
import { useHeaderAppearance } from "@/components/navigation/HeaderAppearance";
import { getGSAP } from "./gsap";
import { requestSceneRefresh } from "./scrollTrigger";
export type SceneAnimation = (
  timeline: gsap.core.Timeline,
  mode: SceneMode,
) => void;
type ScrollSceneOptions = {
  root: RefObject<HTMLElement | null>;
  viewport: RefObject<HTMLDivElement | null>;
  debugOutput: RefObject<HTMLOutputElement | null>;
  settings: SceneSettings;
  animate?: SceneAnimation;
  scrub?: boolean | number;
};
export function useScrollScene({
  root,
  viewport,
  debugOutput,
  settings,
  animate,
  scrub = true,
}: ScrollSceneOptions) {
  const progress = useRef(0);
  const appearance = useHeaderAppearance();
  const setHeaderVariant = appearance?.setVariant;
  useEffect(() => {
    const element = root.current;
    const frame = viewport.current;
    if (!element || !frame) return;
    const { gsap, ScrollTrigger } = getGSAP();
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        sceneQueries,
        (match) => {
          const conditions = match.conditions ?? {};
          const mode: SceneMode = conditions.desktop
            ? "desktop"
            : conditions.tablet
              ? "tablet"
              : "mobile";
          const reduced = Boolean(conditions.reduced);
          const pin =
            settings.pin &&
            !reduced &&
            !conditions.short &&
            frame.scrollHeight <= window.innerHeight + 1;
          element.dataset.motion = reduced ? "reduced" : mode;
          element.dataset.pinActive = String(pin);
          let timeline: gsap.core.Timeline | undefined;
          if (!reduced && animate) {
            timeline = gsap.timeline({ paused: true });
            animate(timeline, mode);
          }
          function updateProgress(value: number) {
            progress.current = value;
            element!.style.setProperty("--scene-progress", String(value));
            if (debugOutput.current)
              debugOutput.current.value = `${Math.round(value * 100)}%`;
          }
          ScrollTrigger.create({
            id: `scene:${element.id}`,
            trigger: element,
            pin: pin ? frame : false,
            pinSpacing: false,
            start: pin ? "top top" : "top bottom",
            end: pin
              ? () =>
                  `+=${Math.max(1, element.offsetHeight - frame.offsetHeight)}`
              : "bottom top",
            animation: timeline,
            scrub: reduced ? false : scrub,
            invalidateOnRefresh: true,
            markers: scrollDebug,
            onUpdate: (self) => updateProgress(self.progress),
            onRefresh: (self) => updateProgress(self.progress),
          });
          // Explicit refs and trigger callbacks, never page-wide scene DOM scanning.
          const headerLine = () =>
            parseFloat(
              getComputedStyle(document.documentElement).getPropertyValue(
                "--header-height",
              ),
            ) * parseFloat(getComputedStyle(document.documentElement).fontSize);
          ScrollTrigger.create({
            id: `header:${element.id}`,
            trigger: element,
            start: () => `top top+=${headerLine()}`,
            end: () => `bottom top+=${headerLine()}`,
            onToggle: (self) => {
              if (self.isActive) setHeaderVariant?.(settings.headerTheme);
            },
            onRefresh: (self) => {
              if (self.isActive) setHeaderVariant?.(settings.headerTheme);
            },
          });
          return () => {
            timeline?.revert({ suppressEvents: true });
            element.style.removeProperty("--scene-progress");
            delete element.dataset.motion;
            delete element.dataset.pinActive;
            progress.current = 0;
          };
        },
        element,
      );
    }, element);
    requestSceneRefresh();
    return () => {
      media.revert();
      context.revert();
    };
  }, [root, viewport, debugOutput, settings, animate, scrub, setHeaderVariant]);
  return progress;
}
