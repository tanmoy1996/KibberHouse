import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
import { BookCTA } from "@/components/booking/BookCTA";
import Link from "next/link";
export function StayScene() {
  return (
    <SceneScaffold
      id="stay"
      label="16 / Stay"
      title="Stay a little longer."
      settings={sceneConfig.stay}
    >
      <div className="mt-8">
        <BookCTA variant="overlay" />
        <Link className="button button--text" href="/stay">
          View rooms
        </Link>
      </div>
    </SceneScaffold>
  );
}
