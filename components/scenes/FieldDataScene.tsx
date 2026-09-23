import { Scene } from "./Scene";
import { SceneContent } from "./SceneContent";
import { SceneLabel } from "./SceneLabel";
import { FieldData } from "@/components/ui/field-data";
import { sceneConfig } from "@/config/scenes";
import { house } from "@/content/house";
export function FieldDataScene() {
  return (
    <Scene
      id="field-data"
      settings={sceneConfig.fieldData}
      aria-labelledby="field-data-title"
    >
      <SceneContent>
        <SceneLabel>03 / Field notes</SceneLabel>
        <h2 id="field-data-title" className="scene-heading">
          Kibber, in numbers.
        </h2>
        <div className="scene-field-data">
          <FieldData label="Altitude" value={house.altitude} />
          <FieldData label="Rooms" value={house.rooms} />
          <FieldData label="Kaza" value={house.distanceFromKaza} />
          <FieldData label="Key Gompa" value={house.distanceFromKeyGompa} />
          <FieldData label="Jan night" value={house.januaryNight} />
        </div>
        <p className="specimen-note">
          Winter temperatures can reach approximately {house.januaryNight}.
        </p>
      </SceneContent>
    </Scene>
  );
}
