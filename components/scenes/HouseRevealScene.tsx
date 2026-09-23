import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
import { media } from "@/content/media";
export function HouseRevealScene() {
  return (
    <SceneScaffold
      id="house-reveal"
      label="02 / House"
      title="Kibber House"
      settings={sceneConfig.houseReveal}
      image={media.home.exterior}
      reveal
    >
      <p className="mt-6">A family homestay at 4,270 m.</p>
      <p className="type-label mt-6">Six rooms</p>
    </SceneScaffold>
  );
}
