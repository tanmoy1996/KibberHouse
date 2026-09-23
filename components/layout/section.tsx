import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";
type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: "light" | "snow" | "barley" | "cold" | "dark";
  width?: "normal" | "wide" | "full";
};
export function Section({
  tone = "light",
  width = "normal",
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section {...props} data-tone={tone} className={cn("section", className)}>
      <div className={cn("section__content", `section__content--${width}`)}>
        {children}
      </div>
    </section>
  );
}
