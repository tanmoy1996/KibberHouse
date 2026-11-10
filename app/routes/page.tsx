import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { EntryReady } from "@/components/loading/EntryExperience";
import { HomeMotion } from "@/components/home/HomeMotion";
import { contact } from "@/content/contact";
import { house } from "@/content/house";
import { routes } from "@/content/travel";
import { circuitKm } from "@/content/route-map";
import { RouteMap } from "@/components/routes/RouteMap";

export const metadata = pageMetadata({
  title: "Routes to Kibber",
  description:
    "The Spiti circuit to Kibber House: up from Chandigarh through Shimla and Kinnaur, back over Kunzum Pass and the Atal Tunnel to Manali, with the places on the way, side trips to Chandratal Lake, Chitkul, Kalpa, Pin Valley, Dhankar, Key, Langza, Hikkim and Komic, and other routes from Delhi and Bhuntar.",
  path: "/routes",
});

const sections = [
  { id: "chandigarh-to-kibber", label: "Route map", title: "The Spiti circuit" },
  { id: "ways-up", label: "Getting here", title: "Four ways up" },
] as const;

function SectionHead({ index, aside }: { index: number; aside?: string }) {
  const section = sections[index];
  return (
    <header className="gallery-section__head" data-reveal="fade">
      <div>
        <p className="home-kicker">
          {String(index + 1).padStart(2, "0")} · {section.label}
        </p>
        <h2 id={`${section.id}-title`}>{section.title}</h2>
      </div>
      {aside && <p className="gallery-section__count">{aside}</p>}
    </header>
  );
}

export default function Page() {
  return (
    <div className="home gallery-page routes-page">
      <EntryReady />
      <HomeMotion />

      <section className="home-meta" data-tone="light" aria-labelledby="routes-page-title">
        <div data-reveal="fade">
          <p className="home-kicker">Routes</p>
          <h1 id="routes-page-title">The road to Kibber</h1>
          <p>
            {house.altitude} in the Spiti Valley, {house.distanceFromKaza} above Kaza.
            Every road here climbs through river gorges, high passes and old
            monastery villages.
          </p>
        </div>
        <nav className="gallery-nav" aria-label="Route sections" data-reveal="fade">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </nav>
      </section>

      <section
        id={sections[0].id}
        className="gallery-section"
        data-tone="light"
        aria-labelledby={`${sections[0].id}-title`}
      >
        <SectionHead index={0} aside={`about ${circuitKm.toLocaleString("en-IN")} km`} />
        <div className="routes-page__journey" data-reveal="fade">
          <p className="routes-page__lede">
            Most guests make a loop of it: up from Chandigarh through Shimla and
            Kinnaur, where the climb is gradual, and back over Kunzum Pass and
            through the Atal Tunnel to Manali. Allow two or three days each way.
            The ringed places are worth a detour off the main road. Tap any place
            to see it on the map.
          </p>
          <RouteMap />
          <a
            className="home-line-link"
            href={contact.directions}
            target="_blank"
            rel="noopener noreferrer"
          >
            open in google maps
          </a>
        </div>
      </section>

      <section
        id={sections[1].id}
        className="gallery-section"
        data-tone="light"
        aria-labelledby={`${sections[1].id}-title`}
      >
        <SectionHead index={1} aside={`${routes.length} routes`} />
        <div className="contact-routes" data-reveal="fade">
          <ol className="contact-routes__list">
            {routes.map((item) => (
              <li key={item.from}>
                <p className="home-kicker">From {item.from}</p>
                <h3>{item.title}</h3>
                <p className="contact-routes__season">{item.season}</p>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
          <p className="contact-routes__note">
            Times are approximate. Passes close with snow and roads change with the
            season, so check current conditions with us before you travel.
          </p>
        </div>
      </section>

      <section className="gallery-cta" data-tone="light" aria-labelledby="routes-cta-title">
        <div data-reveal="fade">
          <h2 id="routes-cta-title" className="gallery-cta__title">
            Not sure which way to come?
          </h2>
          <p>Tell us your dates and starting point, and we will suggest the best road for the season.</p>
          <Link className="home-line-link" href="/contact">
            ask about routes
          </Link>
        </div>
      </section>
    </div>
  );
}
