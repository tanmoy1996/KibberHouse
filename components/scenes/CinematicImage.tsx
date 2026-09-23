import Image from "next/image";
import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { MediaAsset } from "@/content/media";
import { cn } from "@/lib/utils/cn";
type CinematicImageProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  asset: MediaAsset;
  objectPosition?: CSSProperties["objectPosition"];
  priority?: boolean;
  sizes?: string;
};
// Animate this wrapper via its ref, never Next/Image's generated internal markup.
export function CinematicImage({
  asset,
  objectPosition = asset.objectPosition ?? "center",
  priority = false,
  sizes = "100vw",
  className,
  ...props
}: CinematicImageProps) {
  return (
    <div {...props} className={cn("cinematic-image", className)}>
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={sizes}
        preload={priority}
        loading={priority ? undefined : "lazy"}
        style={{ objectFit: "cover", objectPosition }}
      />
    </div>
  );
}
