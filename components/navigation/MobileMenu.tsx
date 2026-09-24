"use client";
import { useEffect, useRef, type RefObject, type KeyboardEvent } from "react";
import Link from "next/link";
import { navigation } from "@/content/navigation";
import { contact, contactPeople } from "@/content/contact";
import { house } from "@/content/house";
import { BrandMark } from "@/components/ui/BrandMark";
import { BookCTA } from "@/components/booking/BookCTA";
import { SocialIcon, type SocialIconName } from "@/components/ui/SocialIcon";
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
  const socialLinks: { label: string; icon: SocialIconName; href: string | null }[] = [
    { label: "Instagram", icon: "instagram", href: contact.instagram },
    { label: "WhatsApp", icon: "whatsapp", href: contact.whatsapp },
    { label: "Facebook", icon: "facebook", href: contact.facebook },
    { label: "Google Maps", icon: "google", href: contact.googleMaps },
  ];
  return (
    <dialog
      ref={dialogRef}
      id={id}
      className="mobile-menu"
      data-tone="light"
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
            <BrandMark variant="dark" size="small" />
          </Link>
          <button
            ref={closeRef}
            type="button"
            className="menu-toggle mobile-menu__close"
            onClick={onClose}
          >
            Close<span className="sr-only"> menu</span>
            <span className="mobile-menu__close-icon" aria-hidden="true" />
          </button>
        </div>

        <p className="home-kicker mobile-menu__kicker">Menu</p>
        {/* Numbered rows with arrows, echoing the home page's labels and line links. */}
        <nav aria-label="Mobile navigation">
          <ol className="mobile-menu__nav">
            {navigation.map((item, index) => (
              <li key={item.href} style={{ "--i": index } as React.CSSProperties}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onNavigate={onClose}
                >
                  <span className="mobile-menu__index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="mobile-menu__label">{item.label}</span>
                  <span className="mobile-menu__arrow" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <BookCTA className="mobile-menu__book" onNavigate={onClose}>
          Book now
        </BookCTA>

        <div className="mobile-menu__foot">
          <div className="mobile-menu__contact">
            {contact.whatsapp && (
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
            )}
            <a href={contactPeople[0].href}>{contactPeople[0].phone}</a>
          </div>
          <ul className="mobile-menu__social" aria-label="Kibber House elsewhere">
            {socialLinks.map((item) =>
              item.href ? (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Kibber House on ${item.label}`}
                  >
                    <SocialIcon name={item.icon} />
                  </a>
                </li>
              ) : null,
            )}
          </ul>
          <p className="home-kicker mobile-menu__place">
            Kibber Village · Spiti Valley · {house.altitude}
          </p>
        </div>
      </div>
    </dialog>
  );
}
