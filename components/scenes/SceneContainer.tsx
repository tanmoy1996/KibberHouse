import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils/cn";
export function SceneContainer({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return <div {...props} className={cn("scene-container", className)} />;
}
