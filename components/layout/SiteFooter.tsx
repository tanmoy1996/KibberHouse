import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import {
  navigation,
  secondaryNavigation,
  legalNavigation,
} from "@/content/navigation";
import { contact } from "@/content/contact";
import { house } from "@/content/house";
export function SiteFooter() {
  const socialLinks = [
    { label: "Instagram", href: contact.instagram },
    { label: "WhatsApp", href: contact.whatsapp },
    { label: "Google Maps", href: contact.googleMaps },
  ];
  return (
    <footer className="site-footer" data-tone="cold">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="stack">
            <Link href="/" aria-label="Kibber House — home">
              <BrandMark variant="light" />
            </Link>
            <p>A family homestay at {house.altitude}.</p>
          </div>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="More from Kibber House">
            {secondaryNavigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            {socialLinks.map((item) =>
              item.href ? (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ) : null,
            )}
            {contact.email && <a href={`mailto:${contact.email}`}>Email</a>}
            {contact.phone && <a href={`tel:${contact.phone}`}>Telephone</a>}
          </nav>
        </div>
        <div className="site-footer__bottom">
          <p className="type-label">
            Kibber Village · Spiti Valley
            <br />
            Himachal Pradesh · {house.altitude}
          </p>
          <ul className="site-footer__legal" aria-label="Legal information">
            {legalNavigation.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
