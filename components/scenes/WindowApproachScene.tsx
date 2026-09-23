import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
import { media } from "@/content/media";
export function WindowApproachScene() {
  return (
    <SceneScaffold
      id="window-approach"
      label="04 / Window"
      title="Come inside."
      settings={sceneConfig.windowApproach}
      image={media.home.window}
    />
  );
}
