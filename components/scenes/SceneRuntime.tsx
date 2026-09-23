"use client";
import { useEffect } from "react";
import { useHeaderAppearance } from "@/components/navigation/HeaderAppearance";
import { requestSceneRefresh } from "@/lib/animations/scrollTrigger";
import { scrollDebug } from "@/config/scenes";
import { installScrollDebug } from "@/lib/animations/debug";
import { EntryReady } from "@/components/loading/EntryExperience";
export function SceneRuntime() {
  const appearance = useHeaderAppearance();
  const setVariant = appearance?.setVariant;
  useEffect(() => {
    let mounted = true;
    const removeDebug = scrollDebug ? installScrollDebug() : undefined;
    void document.fonts.ready.then(() => {
      if (mounted) requestSceneRefresh();
    });
    return () => {
      mounted = false;
      removeDebug?.();
      setVariant?.(null);
    };
  }, [setVariant]);
  return <EntryReady />;
}
