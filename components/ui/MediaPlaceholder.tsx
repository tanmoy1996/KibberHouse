import type { MediaAsset } from "@/content/media";
import { CinematicImage } from "@/components/scenes/CinematicImage";

export function MediaPlaceholder({
  asset,
  label,
}: {
  asset?: MediaAsset | null;
  label: string;
}) {
  return (
    <figure className="media-placeholder">
      {asset ? (
        <CinematicImage asset={asset} sizes="(min-width: 1024px) 80vw, 100vw" />
      ) : (
        <div aria-hidden="true" />
      )}
      {!asset && <figcaption>Photography pending · {label}</figcaption>}
    </figure>
  );
}
