import type { MediaAsset } from "@/content/media";

export function ImageCredit({ photo }: { photo: MediaAsset }) {
  return photo.credit ? (
    <span className="image-credit">Photo: {photo.credit}</span>
  ) : null;
}
