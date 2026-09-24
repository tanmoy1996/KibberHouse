"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { MediaAsset } from "@/content/media";

type Photo = MediaAsset & { width: number; height: number };

export function HomeGallery({
  photos,
  kicker = "From the house",
  title = "A closer look",
  id,
}: {
  photos: Photo[];
  kicker?: string;
  title?: string;
  id?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);

  function scroll(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section id={id} className="home-gallery" data-tone="light" aria-labelledby="gallery-title">
      <header className="home-gallery__head" data-reveal="fade">
        <div>
          <p className="home-kicker">{kicker}</p>
          <h2 id="gallery-title">{title}</h2>
        </div>
        <div className="home-gallery__controls">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous photos">
            ←
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next photos">
            →
          </button>
        </div>
      </header>
      <ul ref={trackRef} className="home-gallery__track" tabIndex={0} aria-label="Photos of Kibber House">
        {photos.map((photo) => (
          <li key={String(photo.src)} style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 800px) 40vw, 80vw" />
          </li>
        ))}
      </ul>
      <div className="home-gallery__foot">
        <Link className="home-line-link" href="/gallery">
          view the gallery
        </Link>
      </div>
    </section>
  );
}
