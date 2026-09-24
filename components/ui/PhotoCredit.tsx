import type { wildlifePhotos } from "@/content/wildlife-media";

type CreditedPhoto = (typeof wildlifePhotos)[keyof typeof wildlifePhotos];

// Attribution required by the CC BY-SA licence of the wildlife photographs.
export function PhotoCredit({ photo, className }: { photo: CreditedPhoto; className?: string }) {
  return (
    <figcaption className={className ?? "photo-credit"}>
      <a href={photo.source} target="_blank" rel="noreferrer">
        Photo: {photo.author}
      </a>{" "}
      ·{" "}
      <a href={`https://creativecommons.org/licenses/by-sa/${photo.license}/`} target="_blank" rel="noreferrer">
        CC BY-SA {photo.license}
      </a>
    </figcaption>
  );
}
