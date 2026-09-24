import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import { SocialIcon, type SocialIconName } from "@/components/ui/SocialIcon";
import {
  navigation,
  legalNavigation,
} from "@/content/navigation";
import { contact, contactPeople } from "@/content/contact";
import { house } from "@/content/house";
export function SiteFooter() {
  const socialLinks: { label: string; icon: SocialIconName; href: string | null }[] = [
    { label: "Instagram", icon: "instagram", href: contact.instagram },
    { label: "WhatsApp", icon: "whatsapp", href: contact.whatsapp },
    { label: "Facebook", icon: "facebook", href: contact.facebook },
    { label: "Google Maps", icon: "google", href: contact.googleMaps },
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
          <dl className="site-footer__data">
            <div>
              <dt>Address</dt>
              <dd>
                Kibber Village, Spiti Valley
                <br />
                Himachal Pradesh · {house.altitude}
              </dd>
            </div>
            {contactPeople.map((person) => (
              <div key={person.href}>
                <dt>Tel · {person.name}</dt>
                <dd>
                  <a href={person.href}>{person.phone}</a>
                </dd>
              </div>
            ))}
            {contact.email && (
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </dd>
              </div>
            )}
          </dl>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="site-footer__bottom">
          <ul className="site-footer__social" aria-label="Kibber House elsewhere">
            {socialLinks.map((item) =>
              item.href ? (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Kibber House on ${item.label}`}
                    title={item.label}
                  >
                    <SocialIcon name={item.icon} />
                  </a>
                </li>
              ) : null,
            )}
          </ul>
          <ul className="site-footer__legal" aria-label="Legal information">
            <li>© Kibber House</li>
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
