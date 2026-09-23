import Image, { type ImageProps } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
type EditorialImageProps = Omit<
  ImageProps,
  "fill" | "className" | "style" | "sizes" | "priority" | "preload"
> & {
  aspectRatio?: CSSProperties["aspectRatio"];
  caption?: ReactNode;
  className?: string;
  sizes: string;
  priority?: boolean;
};
export function EditorialImage({
  aspectRatio,
  caption,
  className,
  sizes,
  priority = false,
  alt,
  ...props
}: EditorialImageProps) {
  return (
    <figure className={cn("editorial-image", className)}>
      <div className="editorial-image__frame" style={{ aspectRatio }}>
        <Image
          {...props}
          alt={alt}
          sizes={sizes}
          preload={priority}
          className="editorial-image__asset"
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
