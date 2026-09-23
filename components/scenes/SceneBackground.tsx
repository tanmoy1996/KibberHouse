import type { ReactNode } from "react";
import type { MediaAsset } from "@/content/media";
import type { SceneTheme } from "@/types/scenes";
import { CinematicImage } from "./CinematicImage";
type SceneBackgroundProps = {
  image?: MediaAsset | null;
  tone?: SceneTheme;
  priority?: boolean;
  sizes?: string;
  children?: ReactNode;
};
// Children reserve a media slot for a future video; no video loading/playback is implemented.
export function SceneBackground({
  image,
  tone,
  priority,
  sizes,
  children,
}: SceneBackgroundProps) {
  return (
    <div className="scene-background" data-background-tone={tone}>
      {image && (
        <CinematicImage asset={image} priority={priority} sizes={sizes} />
      )}
      {children}
    </div>
  );
}
