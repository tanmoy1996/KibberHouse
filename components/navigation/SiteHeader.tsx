"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { BookCTA } from "@/components/booking/BookCTA";
import { MobileMenu } from "./MobileMenu";
import { useHeaderAppearance, type HeaderVariant } from "./HeaderAppearance";
const scrollRules = { nearTop: 40 };
export function SiteHeader({ variant = "light" }: { variant?: HeaderVariant }) {
  const pathname = usePathname();
  const appearance = useHeaderAppearance();
  // Route-keyed controls reset open/scroll state without effect-driven state updates.
  return (
    <HeaderControls
      key={pathname}
      pathname={pathname}
      variant={appearance?.variant ?? variant}
    />
  );
}
function HeaderControls({
  pathname,
  variant,
}: {
  pathname: string;
  variant: HeaderVariant;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const closeMenu = useCallback(() => setOpen(false), []);
  useEffect(() => {
    if (open) return;
    let frame = 0;
    function update() {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      setScrolled(y > scrollRules.nearTop);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [open]);
  return (
    <>
      <header
        ref={headerRef}
        className="site-header"
        data-variant={variant}
        data-tone={
          scrolled
            ? "light"
            : variant === "light"
              ? "light"
              : variant === "dark"
                ? "dark"
                : "cold"
        }
        data-scrolled={scrolled}
      >
        <div className="site-header__inner">
          <Link
            href="/"
            className="site-header__brand"
            aria-label="Kibber House — home"
          >
            <BrandMark
              variant={scrolled || variant === "light" ? "dark" : "light"}
              size="small"
            />
          </Link>
          <nav className="desktop-navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <BookCTA
            variant={scrolled || variant === "light" ? "compact" : "overlay"}
            className="site-header__book"
          >
            Book now
          </BookCTA>
          <button
            ref={triggerRef}
            type="button"
            className="menu-toggle site-header__menu"
            aria-expanded={open}
            aria-controls={menuId}
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>
      <MobileMenu
        id={menuId}
        open={open}
        pathname={pathname}
        onClose={closeMenu}
        triggerRef={triggerRef}
      />
    </>
  );
}
