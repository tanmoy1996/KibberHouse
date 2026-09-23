import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
import { activities } from "@/content/activities";
export function ActivitiesScene() {
  return (
    <SceneScaffold
      id="activities"
      label="13 / Activities"
      title="Walk from the door."
      settings={sceneConfig.activities}
    >
      <p>{activities.map((activity) => activity.name).join(" · ")}</p>
    </SceneScaffold>
  );
}
