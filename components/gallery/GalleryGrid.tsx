"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaAsset } from "@/content/media";

type Photo = MediaAsset & { width: number; height: number };

// Masonry of photos; each opens in a lightbox (native <dialog>: focus trap and Esc for free).
export function GalleryGrid({ photos, label }: { photos: Photo[]; label: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (direction: 1 | -1) =>
      setIndex((i) => (i === null ? i : (i + direction + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className="gallery-masonry" aria-label={label}>
        {photos.map((photo, i) => (
          <li key={String(photo.src)} data-reveal="fade">
            <button type="button" onClick={() => open(i)} aria-label={`Enlarge: ${photo.alt}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                style={{ objectPosition: photo.objectPosition }}
              />
              <span className="gallery-masonry__caption" aria-hidden="true">
                {photo.alt}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="gallery-lightbox"
        aria-label={`${label}: photo viewer`}
        onClose={() => setIndex(null)}
        // A click on the backdrop (the dialog itself, not its content) closes it.
        onClick={(event) => event.target === event.currentTarget && close()}
      >
        {current && (
          <figure className="gallery-lightbox__figure">
            <Image
              key={String(current.src)}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="90vw"
              className="gallery-lightbox__image"
            />
            <figcaption>
              <span>{current.alt}</span>
              <span className="gallery-lightbox__count">
                {index! + 1} / {photos.length}
              </span>
            </figcaption>
          </figure>
        )}
        <button type="button" className="gallery-lightbox__close" onClick={close} aria-label="Close">
          ×
        </button>
        <button
          type="button"
          className="gallery-lightbox__nav gallery-lightbox__nav--prev"
          onClick={() => step(-1)}
          aria-label="Previous photo"
        >
          ←
        </button>
        <button
          type="button"
          className="gallery-lightbox__nav gallery-lightbox__nav--next"
          onClick={() => step(1)}
          aria-label="Next photo"
        >
          →
        </button>
      </dialog>
    </>
  );
}
