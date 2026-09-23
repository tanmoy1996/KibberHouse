import type { Metadata } from "next";
import Image from "next/image";
import { EditorialPage, EditorialBlock } from "@/components/layout/EditorialPage";
import { photos } from "@/content/media";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore Kibber House, its common spaces, village life and the changing seasons in photos and films.",
};
const collections = [
  { title: "A look around the house.", label: "At home", images: [photos.exterior, photos.bedroom, photos.commonSpace, photos.greenhouse, photos.window, photos.waitingArea, photos.corridor, photos.staircase] },
  { title: "Small moments. Wide horizons.", label: "Life in Kibber", images: [photos.welcome, photos.dryFruit, photos.mountains, photos.villageLife, photos.fields, photos.yak, photos.winter, photos.night] },
];
const films = [
  { src: "first-snow", title: "First snow" },
  { src: "a-moment-in-kibber", title: "A moment in Kibber" },
];
export default function Page() {
  return (
    <EditorialPage eyebrow="Gallery" title="A little closer to Kibber." introduction="Step inside the house, look out across the valley, and settle into the everyday rhythm of Kibber.">
      {collections.map((collection) => (
        <EditorialBlock key={collection.label} label={collection.label} title={collection.title}>
          <div className="photo-gallery">
            {collection.images.map((photo) => (
              <figure key={photo.src}>
                <a href={photo.src} target="_blank" rel="noreferrer" aria-label={`View full image: ${photo.alt}`}>
                  <Image {...photo} alt={photo.alt} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" loading="lazy" />
                </a>
                <figcaption>{photo.alt}</figcaption>
              </figure>
            ))}
          </div>
        </EditorialBlock>
      ))}
      <EditorialBlock label="Films" title="A few moments, in motion." tone="barley">
        <div className="film-gallery">
          {films.map((film) => (
            <figure key={film.src}>
              <video controls playsInline preload="none" poster={`/media/${film.src}-poster.webp`} aria-label={film.title}>
                <source src={`/media/${film.src}.mp4`} type="video/mp4" />
                <a href={`/media/${film.src}.mp4`}>Watch {film.title}</a>
              </video>
              <figcaption>{film.title}</figcaption>
            </figure>
          ))}
        </div>
      </EditorialBlock>
    </EditorialPage>
  );
}
