import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialPage,
  EditorialBlock,
} from "@/components/layout/EditorialPage";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { rooms, facilities } from "@/content/rooms";
import { house } from "@/content/house";
import { pageHeroes, photos } from "@/content/media";
import { contact } from "@/content/contact";
export const metadata: Metadata = {
  title: "Rooms",
  description:
    "Six rooms at Kibber House: one Super Deluxe and five Deluxe, all with attached bathrooms.",
};
export default function Page() {
  return (
    <EditorialPage
      eyebrow="Stay"
      title="Six rooms."
      introduction="One Super Deluxe. Five Deluxe. All have attached bathrooms."
      hero={pageHeroes.stay}
    >
      <EditorialBlock label="Rooms" title="A warm room at 4,270 m.">
        <figure className="stay-bedroom">
          <Image {...photos.bedroom} alt={photos.bedroom.alt} sizes="(min-width: 1024px) 75vw, 100vw" />
          <figcaption>Wood, warm light, and a view of the mountains.</figcaption>
        </figure>
        <div className="room-links">
          {rooms.map((room) => (
            <article key={room.id}>
              <p className="type-label">
                {room.count} {room.count === 1 ? "room" : "rooms"}
              </p>
              <h3>{room.name}</h3>
              <p>Double occupancy. Extra bed available on request.</p>
              <Link href={`/stay/${room.id}`}>View room →</Link>
            </article>
          ))}
        </div>
      </EditorialBlock>
      <EditorialBlock
        label="Winter comfort"
        title="Warm before you get in."
        tone="barley"
      >
        <div className="stay-photo-pair">
          <MediaPlaceholder asset={photos.window} label="Mountain views" />
          <MediaPlaceholder asset={photos.greenhouse} label="Greenhouse lounge" />
        </div>
        <ul className="editorial-list">
          {facilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          {house.hotWater.summer}. {house.hotWater.winter}.
        </p>
      </EditorialBlock>
      <EditorialBlock label="Food" title="Choose the meals you need.">
        <MediaPlaceholder asset={photos.waitingArea} label="Tea in the common room" />
        <dl className="definition-list">
          {house.mealPlans.map((plan) => (
            <div key={plan.code}>
              <dt>{plan.code}</dt>
              <dd>{plan.description}</dd>
            </div>
          ))}
        </dl>
        <a className="button button--primary" href={contact.bookingUrl} target="_blank" rel="noopener noreferrer">
          Check availability on WhatsApp
        </a>
      </EditorialBlock>
    </EditorialPage>
  );
}
