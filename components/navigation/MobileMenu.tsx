"use client";
import { useEffect, useRef, type RefObject, type KeyboardEvent } from "react";
import Link from "next/link";
import { navigation } from "@/content/navigation";
import { house } from "@/content/house";
import { BrandMark } from "@/components/ui/BrandMark";
import { BookCTA } from "@/components/booking/BookCTA";
type MobileMenuProps = {
  id: string;
  open: boolean;
  pathname: string;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};
export function MobileMenu({
  id,
  open,
  pathname,
  onClose,
  triggerRef,
}: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const body = document.body;
    const root = document.documentElement;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
      rootOverflow: root.style.overflow,
    };
    const scrollbar = window.innerWidth - root.clientWidth;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (scrollbar > 0)
      body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbar}px`;
    root.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => {
      if (desktop.matches) onClose();
    };
    desktop.addEventListener("change", onResize);
    const trigger = triggerRef.current;
    return () => {
      desktop.removeEventListener("change", onResize);
      dialog.close();
      Object.assign(body.style, {
        position: previous.position,
        top: previous.top,
        width: previous.width,
        overflow: previous.overflow,
        paddingRight: previous.paddingRight,
      });
      root.style.overflow = previous.rootOverflow;
      window.scrollTo({ top: scrollY, behavior: "instant" });
      trigger?.focus({ preventScroll: true });
    };
  }, [open, onClose, triggerRef]);
  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const items = dialogRef.current?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    if (!items?.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  return (
    <dialog
      ref={dialogRef}
      id={id}
      className="mobile-menu"
      data-tone="cold"
      aria-label="Site navigation"
      onKeyDown={trapFocus}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="mobile-menu__inner">
        <div className="mobile-menu__top">
          <Link href="/" onNavigate={onClose} aria-label="Kibber House — home">
            <BrandMark variant="light" size="small" />
          </Link>
          <button
            ref={closeRef}
            type="button"
            className="menu-toggle"
            onClick={onClose}
          >
            Close<span className="sr-only"> menu</span>
          </button>
        </div>
        <nav aria-label="Mobile navigation" className="mobile-menu__nav">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onNavigate={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__booking">
          <BookCTA variant="overlay" onNavigate={onClose} />
        </div>
        <p className="mobile-menu__field type-label">
          Kibber Village
          <br />
          Spiti Valley
          <br />
          {house.altitude}
        </p>
      </div>
    </dialog>
  );
}
