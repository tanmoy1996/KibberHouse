import { Scene } from "./Scene";
import { SceneContent } from "./SceneContent";
import { SceneLabel } from "./SceneLabel";
import { BedLayersIllustration } from "./BedLayersIllustration";
import { sceneConfig } from "@/config/scenes";
import { house } from "@/content/house";

const warmthDetails = [
  { value: "7", label: "thoughtful layers" },
  { value: "2", label: "woollen quilts" },
  { value: "1", label: "electric blanket" },
] as const;

export function BedWarmthScene() {
  return (
    <Scene
      id="bed-warmth"
      settings={sceneConfig.bedWarmth}
      className="bed-story"
      aria-labelledby="bed-title"
    >
      <SceneContent>
        <div className="bed-story__intro">
          <div>
            <SceneLabel>05 / Bed</SceneLabel>
            <h2 id="bed-title" className="scene-heading">
              Seven layers.<br />One deeply warm bed.
            </h2>
          </div>
          <p>
            When winter nights outside reach {house.januaryNight}, warmth is
            built into every layer before you climb in.
          </p>
        </div>

        <div className="bed-story__visual">
          <BedLayersIllustration />
          <div className="bed-story__facts" aria-label="Bed warmth details">
            {warmthDetails.map((detail) => (
              <div key={detail.label}>
                <strong>{detail.value}</strong>
                <span>{detail.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="bed-story__note">
          Made up before you arrive. Warmed before you get in.
        </p>
      </SceneContent>
    </Scene>
  );
}
