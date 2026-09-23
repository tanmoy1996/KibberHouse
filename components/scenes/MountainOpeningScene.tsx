import Link from "next/link";
import { Scene } from "./Scene";
import { SceneBackground } from "./SceneBackground";
import { SceneContent } from "./SceneContent";
import { sceneConfig } from "@/config/scenes";
import { photos, mediaLoading } from "@/content/media";
import { house } from "@/content/house";
import { contact } from "@/content/contact";

export function MountainOpeningScene() {
  return (
    <Scene id="mountains" settings={sceneConfig.mountains} className="home-hero" aria-labelledby="mountains-title">
      <SceneBackground image={photos.exterior} {...mediaLoading.opening} />
      <SceneContent className="home-hero__content">
        <div className="home-hero__copy">
          <p className="type-label">Kibber Village · Spiti Valley · {house.altitude}</p>
          <h1 id="mountains-title">Stay higher.<br />Live closer.</h1>
          <p>A warm house, wide mountain views, and time to feel at home in Spiti.</p>
          <div className="home-hero__actions">
            <Link className="button button--primary" href="/stay">Explore the rooms</Link>
            <a className="home-hero__enquire" href={contact.bookingUrl} target="_blank" rel="noopener noreferrer">Plan your stay on WhatsApp <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <a className="home-hero__discover type-label" href="#house-reveal">Discover Kibber House <span aria-hidden="true">↓</span></a>
      </SceneContent>
    </Scene>
  );
}
