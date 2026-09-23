import type { Metadata } from "next";
import {
  EditorialPage,
  EditorialBlock,
} from "@/components/layout/EditorialPage";
import { contact } from "@/content/contact";
export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Kibber House in Kibber Village, Spiti Valley.",
};
export default function Page() {
  const links = [
    { label: "Email", href: contact.email ? `mailto:${contact.email}` : null },
    { label: "Instagram", href: contact.instagram },
    { label: "WhatsApp", href: contact.whatsapp },
    { label: "Call", href: contact.phone ? `tel:${contact.phone}` : null },
    { label: "Google Maps", href: contact.googleMaps },
  ];
  return (
    <EditorialPage
      eyebrow="Contact"
      title="Kibber House"
      introduction="Kibber Village, Spiti Valley, Himachal Pradesh."
    >
      <EditorialBlock
        label="Write to us"
        title={contact.email ?? "Contact details pending."}
      >
        <div className="contact-links">
          {links.map((item) =>
            item.href ? (
              <a key={item.label} href={item.href}>
                {item.label} →
              </a>
            ) : (
              <span key={item.label} aria-disabled="true">
                {item.label} · details pending
              </span>
            ),
          )}
        </div>
      </EditorialBlock>
    </EditorialPage>
  );
}
