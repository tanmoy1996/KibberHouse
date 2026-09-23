import { photos } from "@/content/media";
import { SceneScaffold } from "./SceneScaffold";
import { sceneConfig } from "@/config/scenes";
export function SeasonsScene() {
  return (
    <SceneScaffold
      id="seasons"
      label="14 / Seasons"
      title="The valley changes."
      image={photos.winter}
      settings={sceneConfig.seasons}
    >
      <div className="season-split">
        <article>
          <p className="type-label">Winter</p>
          <h3>Snow leopard season.</h3>
          <p>Cold, snow, clear atmosphere and a warm house.</p>
        </article>
        <article>
          <p className="type-label">Summer</p>
          <h3>Fields and walking.</h3>
          <p>Birding, trekking, village life and camping where available.</p>
        </article>
      </div>
    </SceneScaffold>
  );
}
