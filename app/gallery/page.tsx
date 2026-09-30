import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { EntryReady } from "@/components/loading/EntryExperience";
import { HomeMotion } from "@/components/home/HomeMotion";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { photos, wildlife } from "@/content/media";

export const metadata = pageMetadata({
  title: "Gallery",
  description:
    "Photos and films of Kibber House and life in Kibber: wood-lined rooms, the greenhouse lounge, Key Monastery, village fields, snow leopards, ibex and the Spiti night sky.",
  path: "/gallery",
});

// Real photographs only; generated imagery stays out of the gallery.
const collections = [
  {
    id: "the-house",
    label: "At home",
    title: "A look around the house",
    images: [
      photos.exteriorSnow,
      photos.bedroom,
      photos.bedDetail,
      photos.commonSpace,
      photos.greenhouse,
      photos.window,
      photos.waitingArea,
      photos.corridor,
      photos.staircase,
      photos.winter,
    ],
  },
  {
    id: "life-in-kibber",
    label: "Life in Kibber",
    title: "Small moments, wide horizons",
    images: [
      photos.welcome,
      photos.nutsAndTea,
      photos.dryFruit,
      photos.mountains,
      photos.villageLife,
      photos.fields,
      photos.keyMonastery,
      photos.yak,
      photos.night,
    ],
  },
  {
    id: "wildlife",
    label: "Wildlife",
    title: "Neighbours on the high slopes",
    images: [
      wildlife.leopardCub,
      wildlife.ibexSnowfall,
      wildlife.foxDen,
      wildlife.leopardRockWall,
      wildlife.bharalRidge,
      wildlife.lammergeierGrass,
      wildlife.leopardSnowDescent,
      wildlife.ibexHerd,
      wildlife.foxSnowSitting,
      wildlife.leopardFamilyCliff,
      wildlife.ibexMist,
      wildlife.goldenEagleNest,
      wildlife.leopardSnowClose,
      wildlife.bharalPair,
      wildlife.lammergeierScree,
      wildlife.leopardYawnCub,
      wildlife.ibexGrazingSnow,
      wildlife.foxSnowStanding,
      wildlife.leopardsLedge,
      wildlife.ibexRestingSnow,
      wildlife.lammergeierSnowRocks,
      wildlife.leopardScree,
      wildlife.bharalBacklit,
      wildlife.foxByRock,
      wildlife.leopardsCave,
      wildlife.ibexPortrait,
      wildlife.lammergeierOverSnow,
      wildlife.leopardSnowShadow,
      wildlife.lammergeierPerched,
      wildlife.leopardCliffCurled,
      wildlife.lammergeierBlueSky,
      wildlife.leopardLedgeWalk,
      wildlife.lammergeierJuvenile,
      wildlife.leopardSlope,
    ],
  },
];

const films = [
  { src: "first-snow", title: "First snow" },
  { src: "a-moment-in-kibber", title: "A few days in Spiti" },
];

export default function Page() {
  return (
    <div className="home gallery-page">
      <EntryReady />
      <HomeMotion />

      <section className="home-meta" data-tone="light" aria-labelledby="gallery-title">
        <div data-reveal="fade">
          <p className="home-kicker">Gallery</p>
          <h1 id="gallery-title">A little closer to Kibber</h1>
          <p>
            Step inside the house, look out across the valley, and settle into the
            everyday rhythm of Kibber.
          </p>
        </div>
        <nav className="gallery-nav" aria-label="Gallery collections" data-reveal="fade">
          {collections.map((collection) => (
            <a key={collection.id} href={`#${collection.id}`}>
              {collection.label}
            </a>
          ))}
          <a href="#films">Films</a>
        </nav>
      </section>

      {collections.map((collection, i) => (
        <section
          key={collection.id}
          id={collection.id}
          className="gallery-section"
          data-tone="light"
          aria-labelledby={`${collection.id}-title`}
        >
          <header className="gallery-section__head" data-reveal="fade">
            <div>
              <p className="home-kicker">
                {String(i + 1).padStart(2, "0")} · {collection.label}
              </p>
              <h2 id={`${collection.id}-title`}>{collection.title}</h2>
            </div>
            <p className="gallery-section__count">{collection.images.length} photographs</p>
          </header>
          <GalleryGrid photos={collection.images} label={collection.title} />
        </section>
      ))}

      <section id="films" className="gallery-films" data-tone="dark" aria-labelledby="films-title">
        <div className="gallery-films__inner">
          <div className="gallery-films__intro" data-reveal="fade">
            <p className="home-kicker">Films</p>
            <h2 id="films-title">A few moments, in motion</h2>
            <p>
              A yak grazing as the first snow drifts in, and a few days of Spiti in
              half a minute: flocks, momos, waterfalls and prayer flags.
            </p>
          </div>
          {films.map((film) => (
            <figure key={film.src} className="gallery-films__film" data-reveal="curtain">
              <video controls playsInline preload="none" poster={`/media/${film.src}-poster.webp`} aria-label={film.title}>
                <source src={`/media/${film.src}.mp4`} type="video/mp4" />
                <a href={`/media/${film.src}.mp4`}>Watch {film.title}</a>
              </video>
              <figcaption>{film.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="gallery-cta" data-tone="light" aria-labelledby="gallery-cta-title">
        <div data-reveal="fade">
          <h2 id="gallery-cta-title" className="gallery-cta__title">
            See it for yourself
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
