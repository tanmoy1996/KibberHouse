import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
import { seasons } from "@/content/seasons";
export function WildlifeScene() {
  return (
    <SceneScaffold
      id="wildlife"
      label="12 / Wildlife"
      title="Look carefully."
      settings={sceneConfig.wildlife}
    >
      <p className="mt-6 text-muted">
        {seasons.wildlifeNote} {seasons.activityNote}
      </p>
    </SceneScaffold>
  );
}
