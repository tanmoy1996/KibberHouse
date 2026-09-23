import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";
export function SceneContent({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={cn("scene-content", className)} />;
}
