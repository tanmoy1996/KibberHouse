import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "text";
};
export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn("button", `button--${variant}`, className)}
      {...props}
    />
  );
}
