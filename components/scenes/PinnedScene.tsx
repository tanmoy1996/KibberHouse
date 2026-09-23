"use client";
import { useMemo } from "react";
import { Scene, type SceneProps } from "./Scene";
import type { SceneLengths } from "@/types/scenes";
type PinnedSceneProps = SceneProps & {
  settings: NonNullable<SceneProps["settings"]>;
  scrollLength?: number | SceneLengths;
};
export function PinnedScene({
  settings,
  scrollLength,
  ...props
}: PinnedSceneProps) {
  const pinned = useMemo(
    () => ({
      ...settings,
      pin: true,
      scrollLength:
        typeof scrollLength === "number"
          ? {
              desktop: scrollLength,
              tablet: scrollLength,
              mobile: scrollLength,
            }
          : (scrollLength ?? settings.scrollLength),
    }),
    [settings, scrollLength],
  );
  return <Scene {...props} settings={pinned} />;
}
