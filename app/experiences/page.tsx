import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { EntryReady } from "@/components/loading/EntryExperience";
import { HomeMotion } from "@/components/home/HomeMotion";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { activities } from "@/content/activities";
import { house } from "@/content/house";
import { photos, type MediaAsset } from "@/content/media";
import { seasons } from "@/content/seasons";
import { wildlifePhotos } from "@/content/wildlife-media";

export const metadata = pageMetadata({
  title: "Experiences in Spiti",
  description:
    "Snow leopard expeditions (mid-December to mid-March), wildlife spotting, birding, treks to Kanamo and Parang La, village walks, Key Monastery and stargazing, all from Kibber House.",
  path: "/experiences",
});

type ActivityId = (typeof activities)[number]["id"];
const byId = (id: ActivityId) => activities.find((item) => item.id === id)!;
const detail = (item: (typeof activities)[number]) =>
  "season" in item ? item.season : "subjects" in item ? item.subjects.join(" · ") : null;

type Credited = (typeof wildlifePhotos)[keyof typeof wildlifePhotos];
const chapters: {
  id: string;
  label: string;
  title: string;
  intro: string;
  photo: MediaAsset & { width: number; height: number };
  credit?: Credited;
  items: ActivityId[];
}[] = [
  {
    id: "wildlife",
    label: "Wildlife & birds",
    title: "Across the high slopes",
    intro:
      "Blue sheep on the scree, wolves and foxes at the edges of the fields, lammergeiers and golden eagles riding the thermals.",
    photo: wildlifePhotos.bharal,
    credit: wildlifePhotos.bharal,
    items: ["wildlife", "birding"],
  },
  {
    id: "on-foot",
    label: "On foot & on wheels",
    title: "Trails from the door",
    intro:
      "Walk the village lanes, climb above the fields for a day, set out on a longer trek, or take it slowly on a bicycle.",
    photo: photos.fields,
    items: ["village-walks", "hikes", "trekking", "cycles"],
  },
  {
    id: "culture",
    label: "Culture & night skies",
    title: "Monasteries by day, stars by night",
    intro: `Key Monastery is ${house.distanceFromKeyGompa} from the house. After dark, the sky above Kibber fills with stars.`,
    photo: photos.keyMonastery,
    items: ["culture", "stargazing", "camping"],
  },
];

export default function Page() {
  const leopard = byId("snow-leopard");

  return (
    <div className="home experiences-page" data-header-overlay>
      <EntryReady />
      <HomeMotion />

      <section className="experiences-hero" data-tone="dark" aria-labelledby="experiences-title">
        <Image
          src={photos.nightSkyWide.src}
          alt={photos.nightSkyWide.alt}
          fill
          preload
          sizes="100vw"
          className="experiences-hero__image"
        />
        <div className="experiences-hero__veil" aria-hidden="true" />
        <div className="experiences-hero__copy">
          <p className="home-kicker">Experiences</p>
          <h1 id="experiences-title">Walk from the door</h1>
          <p className="experiences-hero__lead">
            Snow leopard ridges, village lanes and wide night skies. Everything here
            begins at Kibber House.
          </p>
        </div>
        <a className="home-hero__scroll" href="#experiences-intro">
          <span>Scroll down</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <section id="experiences-intro" className="experiences-intro" data-tone="light" aria-label="About these experiences">
        <p className="experiences-note" data-reveal="fade">
          {seasons.activityNote} Availability depends on season and conditions.
        </p>
        <nav className="gallery-nav" aria-label="Experience themes" data-reveal="fade">
          <a href="#snow-leopard">Snow leopard</a>
          {chapters.map((chapter) => (
            <a key={chapter.id} href={`#${chapter.id}`}>
              {chapter.label}
            </a>
          ))}
        </nav>
      </section>

      <section id="snow-leopard" className="home-split experiences-feature" data-tone="light" aria-labelledby="leopard-title">
        <div className="home-split__inner">
          <figure className="home-split__media" data-reveal="curtain-left">
            <Image
              src={wildlifePhotos.leopard.src}
              alt={wildlifePhotos.leopard.alt}
              width={wildlifePhotos.leopard.width}
              height={wildlifePhotos.leopard.height}
              sizes="(min-width: 800px) 38vw, 88vw"
            />
          </figure>
          <div className="home-split__content" data-reveal="fade">
            <p className="home-kicker">Featured · {"season" in leopard && leopard.season}</p>
            <h2 id="leopard-title">{leopard.name}</h2>
            <p>
              Through the winter months, local spotters work the ridges from first light,
              and you watch at a respectful distance, on the leopard&apos;s own terms.
            </p>
            <p className="experiences-note">{seasons.wildlifeNote}</p>
            <PhotoCredit photo={wildlifePhotos.leopard} className="photo-credit experiences-feature__credit" />
          </div>
        </div>
      </section>

      {chapters.map((chapter, i) => (
        <section
          key={chapter.id}
          id={chapter.id}
          className="experiences-chapter"
          data-tone={i % 2 === 0 ? "snow" : "light"}
          data-flip={i % 2 === 1 ? "" : undefined}
          aria-labelledby={`${chapter.id}-title`}
        >
          <div className="experiences-chapter__inner">
            <figure className="experiences-chapter__media" data-reveal={i % 2 === 1 ? "curtain-right" : "curtain-left"}>
              <Image
                src={chapter.photo.src}
                alt={chapter.photo.alt}
                width={chapter.photo.width}
                height={chapter.photo.height}
                sizes="(min-width: 800px) 40vw, 88vw"
                style={{ objectPosition: chapter.photo.objectPosition }}
              />
              {chapter.credit && <PhotoCredit photo={chapter.credit} />}
            </figure>
            <div className="experiences-chapter__content" data-reveal="fade">
              <p className="home-kicker">
                {String(i + 1).padStart(2, "0")} · {chapter.label}
              </p>
              <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
              <p className="experiences-chapter__intro">{chapter.intro}</p>
              <ul className="experiences-list">
                {chapter.items.map((id) => {
                  const item = byId(id);
                  const extra = detail(item);
                  return (
                    <li key={id}>
                      <span className="experiences-list__name">{item.name}</span>
                      {extra && <span className="experiences-list__detail">{extra}</span>}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="gallery-cta" data-tone="light" aria-labelledby="experiences-cta-title">
        <div data-reveal="fade">
          <h2 id="experiences-cta-title" className="gallery-cta__title">
            Plan your days with us
          </h2>
          <p>Tell us what you would like to do, and we will tell you what is possible in your season.</p>
          <Link className="home-line-link" href="/contact">
            ask about experiences
          </Link>
        </div>
      </section>
    </div>
  );
}
