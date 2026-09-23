import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
import { media } from "@/content/media";
export function RoomScene() {
  return (
    <SceneScaffold
      id="room"
      label="06 / Room"
      title="Six rooms."
      settings={sceneConfig.room}
      image={media.home.roomPrimary}
    />
  );
}
