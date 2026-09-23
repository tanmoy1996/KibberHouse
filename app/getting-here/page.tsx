import Image from "next/image";
import { photos } from "@/content/media";
import type { Metadata } from "next";
import {
  EditorialPage,
  EditorialBlock,
} from "@/components/layout/EditorialPage";
import { FieldData } from "@/components/ui/field-data";
import { house } from "@/content/house";
import { contact } from "@/content/contact";
export const metadata: Metadata = {
  title: "Getting Here",
  description:
    "Location facts for Kibber House in Kibber Village, 18 km from Kaza and 7 km from Key Gompa.",
};
export default function Page() {
  return (
    <EditorialPage
      eyebrow="Getting here"
      title="Kibber Village."
      introduction="Spiti Valley, Himachal Pradesh. Road conditions and transport schedules should be checked close to travel."
    >
      <EditorialBlock label="Distances" title="From Kaza to Kibber.">
        <div className="scene-field-data">
          <FieldData label="Kaza" value={house.distanceFromKaza} />
          <FieldData label="Key Gompa" value={house.distanceFromKeyGompa} />
          <FieldData label="Parking" value="On site" />
        </div>
        {contact.googleMaps ? (
          <a className="button button--primary" href={contact.googleMaps}>
            Open Google Maps
          </a>
        ) : (
          <p className="text-muted">
            A verified Google Maps link will be added here.
          </p>
        )}
      </EditorialBlock>
      <EditorialBlock
        label="Routes"
        title="Plan with current local information."
        tone="barley"
      >
        <figure className="route-illustration">
          <a href={photos.route.src} target="_blank" rel="noreferrer" aria-label="Open the route illustration at full size">
            <Image {...photos.route} alt={photos.route.alt} sizes="(min-width: 768px) 640px, 100vw" />
          </a>
          <figcaption>Two journeys to Kibber. Open the illustration to explore the routes. Confirm current road conditions with your hosts before travelling.</figcaption>
        </figure>
        <dl className="definition-list">
          <div>
            <dt>From Manali</dt>
            <dd>Route information pending verification.</dd>
          </div>
          <div>
            <dt>From Shimla</dt>
            <dd>Route information pending verification.</dd>
          </div>
          <div>
            <dt>From Kaza</dt>
            <dd>Kibber is {house.distanceFromKaza} away.</dd>
          </div>
        </dl>
      </EditorialBlock>
    </EditorialPage>
  );
}
