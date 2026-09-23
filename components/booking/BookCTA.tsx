"use client";

import type { ComponentProps } from "react";
import { contact } from "@/content/contact";
import { cn } from "@/lib/utils/cn";
type BookCTAProps = Omit<ComponentProps<"a">, "href"> & {
  variant?: "compact" | "default" | "overlay";
  onNavigate?: () => void;
};
export function BookCTA({
  variant = "default",
  children,
  className,
  onNavigate,
  onClick,
  ...props
}: BookCTAProps) {
  return (
    <a
      {...props}
      href={contact.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onNavigate?.();
      }}
      className={cn("book-cta", `book-cta--${variant}`, className)}
    >
      {children ?? (variant === "compact" ? "Book" : "Book your stay")}
    </a>
  );
}
