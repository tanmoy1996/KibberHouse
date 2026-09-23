"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { BookCTA } from "@/components/booking/BookCTA";
import { MobileMenu } from "./MobileMenu";
import { useHeaderAppearance, type HeaderVariant } from "./HeaderAppearance";
const scrollRules = { nearTop: 40, hideAfter: 120, directionThreshold: 12 };
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
  const [scroll, setScroll] = useState({ hidden: false, scrolled: false });
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const closeMenu = useCallback(() => setOpen(false), []);
  useEffect(() => {
    if (open) return;
    let previous = window.scrollY;
    let travel = 0;
    let direction = 0;
    let frame = 0;
    function update() {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - previous;
      const nextDirection = Math.sign(delta);
      if (nextDirection !== 0 && nextDirection !== direction) travel = 0;
      if (nextDirection !== 0) direction = nextDirection;
      travel += Math.abs(delta);
      previous = y;
      setScroll((current) => {
        let hidden = current.hidden;
        if (
          y < scrollRules.nearTop ||
          headerRef.current?.contains(document.activeElement)
        )
          hidden = false;
        else if (travel >= scrollRules.directionThreshold)
          hidden = direction > 0 && y > scrollRules.hideAfter;
        const scrolled = y > scrollRules.nearTop;
        return current.hidden === hidden && current.scrolled === scrolled
          ? current
          : { hidden, scrolled };
      });
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
          variant === "light" ? "light" : variant === "dark" ? "dark" : "cold"
        }
        data-scrolled={scroll.scrolled}
        data-hidden={scroll.hidden && !open}
        onFocusCapture={() =>
          setScroll((current) => ({ ...current, hidden: false }))
        }
      >
        <div className="site-header__inner">
          <Link
            href="/"
            className="site-header__brand"
            aria-label="Kibber House — home"
          >
            <BrandMark
              variant={variant === "light" ? "dark" : "light"}
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
            variant={variant === "light" ? "compact" : "overlay"}
            className="site-header__book"
          >
            Book
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
