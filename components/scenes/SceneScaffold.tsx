import type { ReactNode } from "react";
import { Scene } from "./Scene";
import { PinnedScene } from "./PinnedScene";
import { SceneContent } from "./SceneContent";
import { SceneBackground } from "./SceneBackground";
import { SceneLabel } from "./SceneLabel";
import { TextReveal } from "./TextReveal";
import type { SceneSettings } from "@/types/scenes";
import type { MediaAsset } from "@/content/media";

type SceneScaffoldProps = {
  id: string;
  label: string;
  title: string;
  settings: SceneSettings;
  image?: MediaAsset | null;
  children?: ReactNode;
  reveal?: boolean;
};
// Small shared composition for the temporary skeletons, replaceable scene by scene.
export function SceneScaffold({
  id,
  label,
  title,
  settings,
  image,
  children,
  reveal = false,
}: SceneScaffoldProps) {
  const Frame = settings.pin ? PinnedScene : Scene;
  const heading = (
    <h2 id={`${id}-title`} className="scene-heading">
      {title}
    </h2>
  );
  return (
    <Frame id={id} settings={settings} aria-labelledby={`${id}-title`}>
      <SceneBackground image={image} />
      <SceneContent>
        <div className={image ? "scene-copy" : undefined}>
        <SceneLabel>{label}</SceneLabel>
        {reveal ? <TextReveal>{heading}</TextReveal> : heading}
        {children}
        </div>
      </SceneContent>
    </Frame>
  );
}
