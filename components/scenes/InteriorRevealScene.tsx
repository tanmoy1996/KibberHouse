import { photos } from "@/content/media";
import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
export function InteriorRevealScene() {
  return (
    <SceneScaffold
      id="interior-reveal"
      label="04 / Inside"
      title="Inside the house."
      image={photos.commonSpace}
      settings={sceneConfig.interiorReveal}
    >
      <p>
        Through the door and out of the wind. Wood-lined corridors, a stove
        kept lit, and a common room hung with prayer flags.
      </p>
    </SceneScaffold>
  );
}
