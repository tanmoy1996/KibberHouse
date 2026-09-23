import type { Metadata } from "next";
import {
  EditorialPage,
  EditorialBlock,
} from "@/components/layout/EditorialPage";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { house } from "@/content/house";
import { facilities } from "@/content/rooms";
import { photos } from "@/content/media";
export const metadata: Metadata = {
  title: "The House",
  description:
    "Six rooms, warm common spaces and a greenhouse lounge at Kibber House.",
};
export default function Page() {
  return (
    <EditorialPage
      eyebrow="The house"
      title="Built to be lived in."
      introduction={house.supportingConcept}
    >
      <EditorialBlock label="Inside" title="Six rooms. A greenhouse.">
        <MediaPlaceholder
          asset={photos.commonSpace}
          label="Inside Kibber House"
        />
        <p>{house.positioning}</p>
      </EditorialBlock>
      <EditorialBlock
        label="Life inside"
        title="Space to sit, read, work and play."
        tone="barley"
      >
        <MediaPlaceholder asset={photos.greenhouse} label="Greenhouse lounge" />
        <ul className="editorial-list">
          {house.commonSpaces.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </EditorialBlock>
      <EditorialBlock
        label="Winter comfort"
        title="The practical things matter."
      >
        <ul className="editorial-list">
          {facilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          {house.hotWater.summer}. {house.hotWater.winter}.
        </p>
      </EditorialBlock>
      <EditorialBlock label="Food" title="Four meal arrangements." tone="snow">
        <dl className="definition-list">
          {house.mealPlans.map((plan) => (
            <div key={plan.code}>
              <dt>{plan.code}</dt>
              <dd>{plan.description}</dd>
            </div>
          ))}
        </dl>
      </EditorialBlock>
    </EditorialPage>
  );
}
