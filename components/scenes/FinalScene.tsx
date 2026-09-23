import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
import { BookCTA } from "@/components/booking/BookCTA";
import { house } from "@/content/house";
export function FinalScene() {
  return (
    <SceneScaffold
      id="final"
      label="15 / Kibber"
      title="Kibber House"
      settings={sceneConfig.final}
    >
      <p>A family homestay at {house.altitude}.</p>
      <div className="mt-8">
        <BookCTA variant="overlay">Check availability</BookCTA>
      </div>
    </SceneScaffold>
  );
}
