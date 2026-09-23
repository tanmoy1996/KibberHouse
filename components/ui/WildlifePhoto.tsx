import Image from "next/image";
import { wildlifePhotos } from "@/content/wildlife-media";

export function WildlifePhoto({ photo }: { photo: (typeof wildlifePhotos)[keyof typeof wildlifePhotos] }) {
  return (
    <figure className="wildlife-photo">
      <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 1024px) 75vw, 100vw" />
      <figcaption>
        {photo.caption}
        <span><a href={photo.source} target="_blank" rel="noreferrer">Photo: {photo.author}</a> · <a href={`https://creativecommons.org/licenses/by-sa/${photo.license}/`} target="_blank" rel="noreferrer">CC BY-SA {photo.license}</a> · Resized to WebP.</span>
      </figcaption>
    </figure>
  );
}
