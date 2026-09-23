import { photos } from "@/content/media";
import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
import { house } from "@/content/house";
export function HouseLifeScene() {
  return (
    <SceneScaffold
      id="house-life"
      label="08 / House life"
      title="Stay awhile."
      image={photos.waitingArea}
      settings={sceneConfig.houseLife}
    >
      <ul className="editorial-list">
        {house.commonSpaces.map((space) => (
          <li key={space}>{space}</li>
        ))}
      </ul>
    </SceneScaffold>
  );
}
