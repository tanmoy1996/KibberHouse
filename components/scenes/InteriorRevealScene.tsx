import { photos } from "@/content/media";
import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
export function InteriorRevealScene() {
  return (
    <SceneScaffold
      id="interior-reveal"
      label="05 / Inside"
      title="Inside the house."
      image={photos.commonSpace}
      settings={sceneConfig.interiorReveal}
    />
  );
}
