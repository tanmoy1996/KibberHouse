import type { Metadata } from "next";
import Image from "next/image";
import {
  EditorialPage,
  EditorialBlock,
} from "@/components/layout/EditorialPage";
import { house } from "@/content/house";
import { pageHeroes } from "@/content/media";
import { contact, contactPeople } from "@/content/contact";
export const metadata: Metadata = {
  title: "About",
  description:
    "Kibber House is a family homestay in Kibber Village, Spiti Valley.",
};
export default function Page() {
  return (
    <EditorialPage
      eyebrow="About"
      title="A family house."
      introduction="Kibber House is a family homestay in Kibber Village."
      hero={pageHeroes.house}
    >
      <EditorialBlock label="Kibber House" title={house.positioning}>
        <p>{house.supportingConcept}</p>
      </EditorialBlock>
      <EditorialBlock
        label="Your hosts"
        title="Meet the people behind Kibber House."
        tone="snow"
      >
        <div className="host-grid">
          <article className="host-card">
            <Image
              src="/media/thinley-ji.webp"
              alt="Thinley ji"
              width={1200}
              height={1200}
              sizes="(min-width: 768px) 35vw, 100vw"
            />
            <div>
              <p className="type-label">Kibber House</p>
              <h3>Thinley ji</h3>
              <a href={contactPeople[0].href}>{contactPeople[0].phone}</a>
            </div>
          </article>
          <article className="host-card">
            <Image
              src="/media/tamoghna.webp"
              alt="Tamoghna"
              width={1200}
              height={1200}
              sizes="(min-width: 768px) 35vw, 100vw"
            />
            <div>
              <p className="type-label">Kibber House</p>
              <h3>Tamoghna</h3>
              <a href={contactPeople[1].href}>{contactPeople[1].phone}</a>
              <a href={contact.whatsapp ?? undefined} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </article>
        </div>
      </EditorialBlock>
      <EditorialBlock
        label="Contact us"
        title="Speak directly with Kibber House."
        tone="barley"
      >
        <div className="about-contact-list">
          <div>
            <p className="type-label">Phone</p>
            {contactPeople.map((person) => (
              <p key={person.phone}>
                <a href={person.href}>{person.phone}</a>
                <span>{person.name}</span>
              </p>
            ))}
          </div>
          <div>
            <p className="type-label">WhatsApp</p>
            <p>
              <a href={contact.whatsapp ?? undefined} target="_blank" rel="noopener noreferrer">
                +91 83349 35131
              </a>
              <span>Tamoghna</span>
            </p>
          </div>
          <div>
            <p className="type-label">Email</p>
            <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          </div>
          <div>
            <p className="type-label">Website</p>
            <p><a href={contact.website}>kibberhouse.com</a></p>
          </div>
          <div>
            <p className="type-label">Instagram</p>
            <p>
              <a href={contact.instagram ?? undefined} target="_blank" rel="noopener noreferrer">
                @kibberhouse
              </a>
            </p>
          </div>
        </div>
      </EditorialBlock>
    </EditorialPage>
  );
}
