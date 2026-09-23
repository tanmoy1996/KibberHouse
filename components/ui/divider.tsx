import { cn } from "@/lib/utils/cn";
export function Divider({ className }: { className?: string }) {
  return <hr className={cn("divider", className)} />;
}
