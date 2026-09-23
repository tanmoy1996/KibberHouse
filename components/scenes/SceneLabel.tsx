import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils/cn";
export function SceneLabel({
  className,
  ...props
}: ComponentPropsWithRef<"p">) {
  return <p {...props} className={cn("scene-label type-label", className)} />;
}
