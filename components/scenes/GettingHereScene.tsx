import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
import { FieldData } from "@/components/ui/field-data";
export function GettingHereScene() {
  return (
    <SceneScaffold
      id="getting-here"
      label="13 / Getting here"
      title="18 km from Kaza."
      settings={sceneConfig.gettingHere}
    >
      <div className="scene-field-data">
        <FieldData label="Kaza" value="18 km" />
        <FieldData label="Key Gompa" value="7 km" />
      </div>
    </SceneScaffold>
  );
}
