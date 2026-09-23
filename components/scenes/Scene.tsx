"use client";
import { useMemo, useRef, type ComponentPropsWithoutRef } from "react";
import { SceneContainer } from "./SceneContainer";
import {
  useScrollScene,
  type SceneAnimation,
} from "@/lib/animations/useScrollScene";
import type { SceneSettings, SceneStyle, SceneTheme } from "@/types/scenes";
import { scrollDebug } from "@/config/scenes";
import { cn } from "@/lib/utils/cn";
const defaultSettings: SceneSettings = {
  theme: "light",
  headerTheme: "light",
  height: "compact",
  pin: false,
  scrollLength: { desktop: 100, tablet: 100, mobile: 100 },
};
const tones = {
  light: "light",
  cold: "cold",
  dark: "dark",
  warm: "barley",
  transparent: undefined,
} as const;
export type SceneProps = Omit<ComponentPropsWithoutRef<"section">, "id"> & {
  id: string;
  settings?: SceneSettings;
  theme?: SceneTheme;
  height?: SceneStyle["minHeight"];
  animate?: SceneAnimation;
  scrub?: boolean | number;
};
export function Scene({
  id,
  settings = defaultSettings,
  theme,
  height,
  animate,
  scrub,
  children,
  className,
  style,
  ...props
}: SceneProps) {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const debugOutput = useRef<HTMLOutputElement>(null);
  const resolved = useMemo(
    () => (theme ? { ...settings, theme } : settings),
    [settings, theme],
  );
  useScrollScene({
    root,
    viewport,
    debugOutput,
    settings: resolved,
    animate,
    scrub,
  });
  const sceneStyle: SceneStyle = {
    "--scene-desktop-length": `${settings.scrollLength.desktop}svh`,
    "--scene-tablet-length": `${settings.scrollLength.tablet}svh`,
    "--scene-mobile-length": `${settings.scrollLength.mobile}svh`,
    ...(height ? { minHeight: height } : {}),
    ...style,
  };
  return (
    <section
      {...props}
      ref={root}
      id={id}
      data-scene={id}
      data-theme={resolved.theme}
      data-tone={tones[resolved.theme]}
      data-pin={settings.pin}
      data-height={settings.height}
      className={cn("scene", className)}
      style={sceneStyle}
    >
      <SceneContainer ref={viewport}>
        {children}
        {scrollDebug && (
          <div className="scene-debug" aria-hidden="true">
            <span>{id}</span>
            <output ref={debugOutput}>0%</output>
            <span className="scene-debug__meter" />
          </div>
        )}
      </SceneContainer>
    </section>
  );
}
