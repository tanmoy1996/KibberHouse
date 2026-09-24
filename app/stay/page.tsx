import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { EntryReady } from "@/components/loading/EntryExperience";
import { HomeMotion } from "@/components/home/HomeMotion";
import { HomeAvailability } from "@/components/home/HomeAvailability";
import { HomeGallery } from "@/components/home/HomeGallery";
import { FacilityIcon } from "@/components/home/FacilityIcon";
import { amenities } from "@/content/amenities";
import { house } from "@/content/house";
import { photos, type MediaAsset } from "@/content/media";
import { bedLayers, rooms } from "@/content/rooms";

export const metadata = pageMetadata({
  title: "Rooms & the house",
  description:
    "Six warm, mountain-view rooms at Kibber House in Spiti: five Deluxe rooms and a Super Deluxe suite, shared lounges, a sunlit greenhouse, home meals and seven-layer beds for −25 °C nights.",
  path: "/stay",
});

const roomPhotos: Record<(typeof rooms)[number]["id"], MediaAsset & { width: number; height: number }> = {
  "super-deluxe": photos.roomSunset,
  deluxe: photos.bedroom,
};

const housePhotos = [
  photos.exterior,
  photos.commonSpace,
  photos.greenhouse,
  photos.window,
  photos.waitingArea,
  photos.corridor,
  photos.staircase,
  photos.winter,
];

const warmth = [
  {
    title: "Bukhari heating",
    text: "The traditional Spitian stove keeps the house warm through the long winter evenings.",
  },
  {
    title: "Bathroom heaters",
    text: "Electric heaters in the bathrooms take the edge off the coldest mornings.",
  },
  {
    title: "Hot water",
    text: `${house.hotWater.summer}; in winter, ${house.hotWater.winter.replace(/^3/, "three")}.`,
  },
  {
    title: "The greenhouse",
    text: `A sunlit lounge where you can sit comfortably while it drops towards ${house.januaryNight} outside.`,
  },
  {
    title: "Power backup",
    text: "A generator keeps the lights and blankets on when the mountain grid goes down.",
  },
];

const sentence = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export default function Page() {
  // Deluxe first: it is the room most guests will stay in.
  const orderedRooms = [...rooms].sort((a, b) => b.count - a.count);

  return (
    <div className="home stay-page" data-header-overlay>
      <EntryReady />
      <HomeMotion />

      {/* 1 · Image hero with the availability bar, no copy. */}
      <section className="home-hero" data-tone="dark" aria-label="Check availability">
        <div className="home-hero__media">
          <Image
            src={photos.bedDetail.src}
            alt={photos.bedDetail.alt}
            fill
            preload
            sizes="100vw"
            className="home-hero__image stay-hero__image"
          />
          <div className="home-hero__veil" aria-hidden="true" />
          <a className="home-hero__scroll" href="#the-stay">
            <span>Scroll down</span>
            <i aria-hidden="true" />
          </a>
        </div>
        <HomeAvailability />
      </section>

      {/* 2 · About the stay. */}
      <section id="the-stay" className="home-meta" data-tone="light" aria-labelledby="stay-title">
        <div data-reveal="fade">
          <p className="home-kicker">The stay</p>
          <h1 id="stay-title">Six warm rooms at {house.altitude}</h1>
          <p className="home-meta__lead">
            A family home in Kibber, {house.positioning.replace(/^Kibber House is /, "")}
          </p>
          <p>
            Wood-lined rooms with attached bathrooms, layered beds and a mountain view
            from every one. Around them, lounges for reading, working and playing, a
            sunlit greenhouse, and a kitchen that cooks Spitian meals to your plan.
          </p>
        </div>
      </section>

      {/* 3 · Rooms. */}
      <section className="stay-rooms" data-tone="light" aria-labelledby="rooms-title">
        <header className="gallery-section__head" data-reveal="fade">
          <div>
            <p className="home-kicker">The rooms</p>
            <h2 id="rooms-title">Deluxe &amp; Super Deluxe</h2>
          </div>
          <p className="gallery-section__count">{house.rooms} rooms</p>
        </header>
        <div className="stay-rooms__grid">
          {orderedRooms.map((room, i) => {
            const photo = roomPhotos[room.id];
            return (
              <article key={room.id} id={room.id} className="stay-room" data-reveal="fade">
                <figure className="stay-room__media" data-reveal={i === 0 ? "curtain-left" : "curtain-right"}>
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 800px) 44vw, 88vw" />
                </figure>
                <p className="home-kicker">
                  {room.count}{" "}
                  {room.layout.startsWith("Suite") ? "suite" : room.count === 1 ? "room" : "rooms"}
                </p>
                <h3>{room.name}</h3>
                <p className="stay-room__summary">{room.summary}</p>
                <ul className="stay-room__facts">
                  <li>
                    <span>Layout</span>
                    {sentence(room.layout)}
                  </li>
                  <li>
                    <span>View</span>
                    {sentence(room.view)}
                  </li>
                  <li>
                    <span>Occupancy</span>
                    {sentence(room.occupancy)}
                  </li>
                  <li>
                    <span>Bathroom</span>
                    {sentence(room.bathroom)}
                  </li>
                  <li>
                    <span>Extra bed</span>
                    {sentence(room.extraBed)}
                  </li>
                </ul>
                <Link className="home-line-link" href={`/book?room=${encodeURIComponent(room.name)}`}>
                  book the {room.name.toLowerCase()}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4 · The house. */}
      <HomeGallery id="the-house" photos={housePhotos} kicker="The house" title="Built to be lived in" />

      {/* 5 · Amenities, shared spaces and meals. */}
      <section id="meals" className="stay-amenities" data-tone="snow" aria-labelledby="amenities-title">
        <div className="stay-amenities__inner">
          <div className="home-amenities" data-reveal="fade">
            <p className="home-kicker" id="amenities-title">Amenities</p>
            <ul className="home-facilities" aria-labelledby="amenities-title">
              {amenities.map((item) => (
                <li key={item.title}>
                  <FacilityIcon name={item.icon} />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="stay-amenities__cols">
            <div data-reveal="fade">
              <p className="home-kicker">Shared spaces</p>
              <ul className="experiences-list">
                {house.commonSpaces.map((space) => (
                  <li key={space}>
                    <span className="experiences-list__name">{space}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal="fade">
              <p className="home-kicker">Meal plans</p>
              <dl className="stay-meals">
                {house.mealPlans.map((plan) => (
                  <div key={plan.code}>
                    <dt>{plan.code}</dt>
                    <dd>{plan.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 6 · Ready for the cold. */}
      <section id="winter" className="stay-winter" data-tone="dark" aria-labelledby="winter-title">
        <div className="stay-winter__inner">
          <header className="stay-winter__head" data-reveal="fade">
            <p className="home-kicker">Ready for the cold</p>
            <h2 id="winter-title">Made for {house.januaryNight} nights</h2>
            <p>
              Winter in Kibber is serious, so the house is ready for it: heated spaces,
              hot water, power backup and, above all, the beds.
            </p>
          </header>

          <div className="stay-bed">
            <figure className="stay-bed__media" data-reveal="curtain-left">
              <Image
                src={photos.bedLayersPhoto.src}
                alt={photos.bedLayersPhoto.alt}
                width={photos.bedLayersPhoto.width}
                height={photos.bedLayersPhoto.height}
                sizes="(min-width: 900px) 50vw, 88vw"
              />
            </figure>
            <div className="stay-bed__layers" data-reveal="fade">
              <p className="home-kicker">{bedLayers.length} layers in every bed</p>
              {/* Drawn top-down, as you would climb in. */}
              <ol className="stay-layers" reversed>
                {[...bedLayers].reverse().map((layer, i) => (
                  <li key={`${layer}-${i}`} style={{ "--i": i } as React.CSSProperties}>
                    <span>{layer}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <ul className="stay-warmth">
            {warmth.map((item) => (
              <li key={item.title} data-reveal="fade">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gallery-cta" data-tone="light" aria-labelledby="stay-cta-title">
        <div data-reveal="fade">
          <h2 id="stay-cta-title" className="gallery-cta__title">
            Stay a while
          </h2>
          <p>Tell us your dates and we will confirm your stay personally.</p>
          <Link className="home-line-link" href="/book">
            check availability
          </Link>
        </div>
      </section>
    </div>
  );
}
