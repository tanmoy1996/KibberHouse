import Link from "next/link";
import type { ComponentProps } from "react";
import { contact } from "@/content/contact";
import { cn } from "@/lib/utils/cn";
type BookCTAProps = Omit<ComponentProps<typeof Link>, "href"> & {
  variant?: "compact" | "default" | "overlay";
};
export function BookCTA({
  variant = "default",
  children,
  className,
  ...props
}: BookCTAProps) {
  return (
    <Link
      {...props}
      href={contact.bookingUrl}
      className={cn("book-cta", `book-cta--${variant}`, className)}
    >
      {children ?? (variant === "compact" ? "Book" : "Book your stay")}
    </Link>
  );
}
