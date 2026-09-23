import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
import { media } from "@/content/media";
export function OutsideTransitionScene() {
  return (
    <SceneScaffold
      id="outside-transition"
      label="09 / Outside"
      title="Step outside."
      settings={sceneConfig.outsideTransition}
      image={media.home.mountainView}
    />
  );
}
