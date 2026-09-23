import { WildlifePhoto } from "@/components/ui/WildlifePhoto";
import { wildlifePhotos } from "@/content/wildlife-media";
import type { Metadata } from "next";
import {
  EditorialPage,
  EditorialBlock,
} from "@/components/layout/EditorialPage";
import { activities } from "@/content/activities";
import { seasons } from "@/content/seasons";
import { pageHeroes } from "@/content/media";
export const metadata: Metadata = {
  title: "Wildlife",
  description:
    "Seasonal snow leopard expeditions, birding and wildlife spotting around Kibber in Spiti.",
};
export default function Page() {
  const wildlife = activities.find((item) => item.id === "wildlife");
  return (
    <EditorialPage
      eyebrow="Wildlife"
      title="Look carefully."
      introduction="Wildlife is seen at distance and on its own terms. Sightings are not guaranteed."
      hero={pageHeroes.wildlife}
    >
      <EditorialBlock
        label="Snow leopard"
        title="Mid-December to mid-March."
        tone="cold"
      >
        <WildlifePhoto photo={wildlifePhotos.leopard} />
        <p>Local spotters work the ridges from first light.</p>
        <p>
          {seasons.activityNote} {seasons.wildlifeNote}
        </p>
      </EditorialBlock>
      <EditorialBlock
        label="Other wildlife"
        title="Across the high-altitude landscape."
      >
        <WildlifePhoto photo={wildlifePhotos.bharal} />
        <ul className="editorial-list">
          {wildlife?.subjects?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </EditorialBlock>
      <EditorialBlock
        label="Birding"
        title="Watch the ridges and open sky."
        tone="barley"
      >
        <WildlifePhoto photo={wildlifePhotos.bird} />
        <p>
          Birding depends on season and conditions. Lammergeier and golden eagle
          are among the species that may be spotted.
        </p>
      </EditorialBlock>
    </EditorialPage>
  );
}
