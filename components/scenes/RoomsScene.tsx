import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
import { media } from "@/content/media";
import Link from "next/link";
export function RoomsScene() {
  return (
    <SceneScaffold
      id="rooms"
      label="09 / Stay"
      title="One Super Deluxe. Five Deluxe."
      settings={sceneConfig.rooms}
      image={media.home.roomWide}
    >
      <div className="room-links">
        <article>
          <p className="type-label">1 room</p>
          <h3>Super Deluxe</h3>
          <Link href="/stay/super-deluxe">View room →</Link>
        </article>
        <article>
          <p className="type-label">5 rooms</p>
          <h3>Deluxe</h3>
          <Link href="/stay/deluxe">View rooms →</Link>
        </article>
      </div>
    </SceneScaffold>
  );
}
