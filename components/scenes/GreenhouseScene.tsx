import { photos } from "@/content/media";
import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
export function GreenhouseScene() {
  return (
    <SceneScaffold
      id="greenhouse"
      label="08 / Greenhouse"
      title="−25 °C outside."
      image={photos.greenhouse}
      settings={sceneConfig.greenhouse}
    >
      <h3>The greenhouse.</h3>
      <p>
        A place to sit in shirtsleeves while winter stays on the other side of
        the glass.
      </p>
    </SceneScaffold>
  );
}
