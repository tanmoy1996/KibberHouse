"use client";
import { useCallback, useRef } from "react";
import { PinnedScene } from "./PinnedScene";
import { SceneContent } from "./SceneContent";
import { SceneBackground } from "./SceneBackground";
import { SceneLabel } from "./SceneLabel";
import { sceneConfig } from "@/config/scenes";
import { media } from "@/content/media";
import { bedLayers } from "@/content/rooms";
import type { SceneAnimation } from "@/lib/animations/useScrollScene";
export function BedWarmthScene() {
  const list = useRef<HTMLOListElement>(null);
  const animate = useCallback<SceneAnimation>((timeline, mode) => {
    const items = list.current?.children;
    if (!items) return;
    timeline
      .fromTo(
        items,
        { y: 0 },
        {
          y: mode === "mobile" ? -4 : -10,
          stagger: 0.07,
          duration: 0.58,
          ease: "none",
        },
        0.12,
      )
      .to(items, { y: 0, stagger: 0.025, duration: 0.22, ease: "none" }, 0.76);
  }, []);
  return (
    <PinnedScene
      id="bed-warmth"
      settings={sceneConfig.bedWarmth}
      animate={animate}
      aria-labelledby="bed-title"
    >
      <SceneBackground image={media.home.bedLayers} />
      <SceneContent>
        <SceneLabel>07 / Bed</SceneLabel>
        <h2 id="bed-title" className="scene-heading">
          Warm before you get in.
        </h2>
        <ol ref={list} className="bed-layers">
          {[...bedLayers].reverse().map((layer, index) => (
            <li key={`${layer}-${index}`}>
              <span>{7 - index}</span>
              {layer}
            </li>
          ))}
        </ol>
      </SceneContent>
    </PinnedScene>
  );
}
