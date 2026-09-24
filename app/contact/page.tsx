import { pageMetadata } from "@/lib/seo";
import { EditorialPage } from "@/components/layout/EditorialPage";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialIcon, type SocialIconName } from "@/components/ui/SocialIcon";
import { contact, contactPeople } from "@/content/contact";
import { house } from "@/content/house";
import { nearest, routes } from "@/content/travel";

export const metadata = pageMetadata({
  title: "Contact & getting here",
  description:
    "Contact Kibber House and plan the journey to Kibber, Spiti Valley: 18 km from Kaza at 4,270 m, with routes from Delhi, Manali and Shimla.",
  path: "/contact",
});

export default function Page() {
  const { lat, lng } = contact.coordinates;
  const socialLinks: { label: string; icon: SocialIconName; href: string | null }[] = [
    { label: "Instagram", icon: "instagram", href: contact.instagram },
    { label: "WhatsApp", icon: "whatsapp", href: contact.whatsapp },
    { label: "Facebook", icon: "facebook", href: contact.facebook },
    { label: "Google Maps", icon: "google", href: contact.googleMaps },
  ];

  return (
    <EditorialPage
      eyebrow="Contact"
      title="Find us in Kibber"
      introduction={`${house.altitude} in the Spiti Valley, ${house.distanceFromKaza} above Kaza.`}
      compact
    >
      <section className="contact-section" data-tone="light" aria-labelledby="getting-here-title">
        <div className="contact-split">
          <div className="contact-split__intro">
            <p className="home-kicker">Getting here</p>
            <h2 id="getting-here-title">High, remote and worth the road</h2>
            <p>
              Kibber sits high above the Spiti river, one of the world&apos;s highest
              inhabited villages. The journey is part of the stay:
              river gorges, high passes and monasteries along the way, with Key
              Monastery just {house.distanceFromKeyGompa} from the house.
            </p>
          </div>
          <dl className="contact-facts">
            <div>
              <dt>Address</dt>
              <dd>
                Kibber House, Kibber Village
                <br />
                Spiti Valley, Himachal Pradesh
              </dd>
            </div>
            <div>
              <dt>Nearest town</dt>
              <dd>
                {nearest.town.name}
                <span>{nearest.town.detail}</span>
              </dd>
            </div>
            <div>
              <dt>Nearest airport</dt>
              <dd>
                {nearest.airport.name}
                <span>{nearest.airport.detail}</span>
              </dd>
            </div>
            <div>
              <dt>Coordinates</dt>
              <dd>
                {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
              </dd>
            </div>
            <a className="home-line-link" href={contact.directions} target="_blank" rel="noopener noreferrer">
              get directions
            </a>
          </dl>
        </div>
        <div className="contact-map">
          <iframe
            title="Kibber House on Google Maps"
            src={`https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${lat},${lng}!6i12`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="contact-section contact-section--routes" data-tone="snow" aria-labelledby="routes-title">
        <div className="contact-routes">
          <p className="home-kicker">Routes</p>
          <h2 id="routes-title">Four ways up</h2>
          <ol className="contact-routes__list">
            {routes.map((route) => (
              <li key={route.from}>
                <p className="home-kicker">From {route.from}</p>
                <h3>{route.title}</h3>
                <p>{route.text}</p>
              </li>
            ))}
          </ol>
          <p className="contact-routes__note">
            Times are approximate. Passes close with snow and roads change with the
            season, so check current conditions with us before you travel.
          </p>
        </div>
      </section>

      <section className="contact-section" data-tone="light" aria-labelledby="contact-us-title">
        <div className="contact-split">
          <div className="contact-split__intro">
            <p className="home-kicker">Contact us</p>
            <h2 id="contact-us-title">Talk to the family</h2>
            <p>
              Ask us anything about rooms, routes, permits or acclimatisation. We
              answer personally, and WhatsApp is usually the quickest way to reach us.
            </p>
            <dl className="contact-facts">
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
            <ul className="contact-social" aria-label="Kibber House elsewhere">
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
          </div>
          <div className="contact-split__form">
            <h3>Request information</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </EditorialPage>
  );
}
