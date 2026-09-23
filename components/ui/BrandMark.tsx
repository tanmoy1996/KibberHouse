import { brand } from "@/config/brand";
import { cn } from "@/lib/utils/cn";
type BrandMarkProps = {
  variant?: "dark" | "light";
  size?: "small" | "default" | "large";
};
// Preserve this footprint when replacing the fallback with the official asset.
export function BrandMark({
  variant = "dark",
  size = "default",
}: BrandMarkProps) {
  return (
    <span
      className={cn(
        "brand-mark",
        `brand-mark--${variant}`,
        `brand-mark--${size}`,
      )}
      role="img"
      aria-label={brand.name}
    >
      <span aria-hidden="true">
        Kibber
        <br />
        House
      </span>
    </span>
  );
}
