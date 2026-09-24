import Image from "next/image";
import Link from "next/link";
import { EntryReady } from "@/components/loading/EntryExperience";
import { HomeAvailability } from "./HomeAvailability";
import { HomeRoomsBanner } from "./HomeRoomsBanner";
import { HomeGallery } from "./HomeGallery";
import { HomeMotion } from "./HomeMotion";
import { FacilityIcon } from "./FacilityIcon";
import { contact, contactPeople } from "@/content/contact";
import { house } from "@/content/house";
import { amenities } from "@/content/amenities";
import { photos } from "@/content/media";
import { wildlifePhotos } from "@/content/wildlife-media";
import { PhotoCredit } from "@/components/ui/PhotoCredit";

const promos = [
  {
    label: "Table",
    title: "Food for the altitude",
    text: "Home-cooked Spitian meals, warm tea twice a day and flexible meal plans shaped around your days out.",
    href: "/stay#meals",
    link: "discover the table",
    photo: photos.welcome,
  },
  {
    label: "Warmth",
    title: `Made for ${house.januaryNight} nights`,
    text: "Electric blankets, woollen quilts, Bukhari heating and a sunlit greenhouse lounge for the coldest months.",
    href: "/stay#winter",
    link: "discover the house",
    photo: photos.greenhouse,
  },
];


const gallery = [
  photos.commonSpace,
  photos.bedDetail,
  photos.ibex,
  photos.fields,
  photos.nightVision,
  photos.window,
  photos.winter,
  photos.dryFruit,
];

export function HomePage() {
  return (
    <div className="home" data-header-overlay>
      <EntryReady />
      <HomeMotion />

      <section className="home-hero" data-tone="dark" aria-label="Kibber House">
        <div className="home-hero__media">
          <Image
            src={photos.exterior.src}
            alt={photos.exterior.alt}
            fill
            preload
            sizes="100vw"
            className="home-hero__image"
          />
          <div className="home-hero__veil" aria-hidden="true" />
          <a className="home-hero__scroll" href="#welcome">
            <span>Scroll down</span>
            <i aria-hidden="true" />
          </a>
        </div>
        <HomeAvailability />
      </section>

      <section id="welcome" className="home-meta" data-tone="light" aria-labelledby="home-title">
        <div data-reveal="fade">
          <p className="home-kicker">A family homestay at {house.altitude}</p>
          <h1 id="home-title">Kibber House, Spiti Valley</h1>
          <p className="home-meta__lead">
            Clear air, slow mornings and the quiet rhythm of a Himalayan village.
          </p>
          <p>
            A warm, family-run house in one of the world&apos;s highest inhabited
            villages. Come for unhurried meals, close encounters with the wild, and
            the particular stillness that only arrives at altitude.
          </p>
        </div>
      </section>

      <section className="home-about" data-tone="light" aria-label="About the stay">
        <div className="home-about__inner">
          <div className="home-about__left">
            <p className="home-about__title" data-reveal="fade">
              Your Spitian
              <br />
              Hideaway
            </p>
            <figure className="home-about__small" data-reveal="curtain-left">
              <Image
                src={photos.staircase.src}
                alt={photos.staircase.alt}
                fill
                sizes="(min-width: 800px) 28vw, 70vw"
              />
            </figure>
            <Link className="home-line-link" href="/stay#the-house">
              inside the house
            </Link>
          </div>
          <div className="home-about__media">
            <p className="home-about__caption" data-reveal="fade">
              Flocks on the road, momos in the kitchen,
              <br />
              waterfalls, prayer flags and wide skies
            </p>
            <figure className="home-about__big" data-reveal="curtain-right">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/media/a-moment-in-kibber-poster.webp"
                aria-label="A montage of days in Spiti: a flock of sheep on the road, making momos, waterfalls, prayer flags and mountain skies"
              >
                <source src="/media/a-moment-in-kibber.mp4" type="video/mp4" />
              </video>
            </figure>
          </div>
        </div>
      </section>

      <HomeRoomsBanner />

      <section className="home-promos" data-tone="light" aria-labelledby="promos-title">
        <header className="home-centred-head" data-reveal="fade">
          <p className="home-kicker">Made for the mountains</p>
          <h2 id="promos-title">Comfort, considered</h2>
        </header>
        <div className="home-promos__inner">
          {promos.map((promo) => (
            <article key={promo.label} className="home-promos__item" data-reveal="fade">
              <Link href={promo.href} className="home-promos__image" tabIndex={-1} aria-hidden="true">
                <Image
                  src={promo.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 900px) 32vw, 88vw"
                />
              </Link>
              <p className="home-kicker">{promo.label}</p>
              <h3>{promo.title}</h3>
              <p>{promo.text}</p>
              <Link className="home-line-link" href={promo.href}>
                {promo.link}
              </Link>
            </article>
          ))}
        </div>
        <div className="home-amenities" data-reveal="fade">
          <p className="home-kicker" id="amenities-title">Amenities</p>
          <ul className="home-facilities" aria-labelledby="amenities-title">
            {amenities.map((facility) => (
              <li key={facility.title}>
                <FacilityIcon name={facility.icon} />
                <span>{facility.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* <section className="home-split" data-tone="light" aria-labelledby="seasons-title">
        <div className="home-split__inner">
          <figure className="home-split__media" data-reveal="curtain-left">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/media/first-snow-poster.webp"
              aria-label="First snow falling over Kibber"
            >
              <source src="/media/first-snow.mp4" type="video/mp4" />
            </video>
          </figure>
          <div className="home-split__content" data-reveal="fade">
            <h2 id="seasons-title">Every season</h2>
            <p>
              Golden barley fields in late summer, clear autumn skies, and a winter
              of snow, silence and snow leopard country. Kibber reveals itself
              differently each time you arrive, and the house stays open for all of it.
            </p>
            <Link className="home-line-link" href="/experiences">
              discover the seasons
            </Link>
            <figure className="home-split__small">
              <Image
                src={photos.yak.src}
                alt={photos.yak.alt}
                width={photos.yak.width}
                height={photos.yak.height}
                sizes="(min-width: 800px) 26vw, 60vw"
              />
            </figure>
          </div>
        </div>
      </section> */}

      <HomeGallery photos={gallery} />

      <section className="home-split" data-tone="light" aria-labelledby="experiences-title">
        <div className="home-split__inner">
          <figure className="home-split__media" data-reveal="curtain-left">
            <Image
              src={photos.keyMonastery.src}
              alt={photos.keyMonastery.alt}
              width={photos.keyMonastery.width}
              height={photos.keyMonastery.height}
              sizes="(min-width: 800px) 38vw, 88vw"
              style={{ objectPosition: photos.keyMonastery.objectPosition }}
            />
          </figure>
          <div className="home-split__content" data-reveal="fade">
            <h2 id="experiences-title">Experiences</h2>
            <p>
              Spiti reveals itself slowly, through high silence, village rhythm and
              the wild that moves across its slopes. From Kibber, walk into blue sheep,
              ibex and snow leopard country, visit Key Monastery just{" "}
              {house.distanceFromKeyGompa} away, spend unhurried days among the
              village&apos;s fields and lanes, and end each one beneath some of the
              clearest night skies in the Himalaya.
            </p>
            <Link className="home-line-link" href="/experiences">
              discover our experiences
            </Link>
            <figure className="home-split__small">
              <Image
                src={wildlifePhotos.leopard.src}
                alt={wildlifePhotos.leopard.alt}
                width={wildlifePhotos.leopard.width}
                height={wildlifePhotos.leopard.height}
                sizes="(min-width: 800px) 26vw, 60vw"
              />
              <PhotoCredit photo={wildlifePhotos.leopard} />
            </figure>
          </div>
        </div>
      </section>

      <section className="home-contact" data-tone="light" aria-labelledby="contact-title">
        <div className="home-contact__inner">
          <div className="home-contact__left">
            <figure className="home-contact__small" data-reveal="curtain">
              <Image
                src={photos.nutsAndTea.src}
                alt={photos.nutsAndTea.alt}
                fill
                sizes="(min-width: 800px) 30vw, 88vw"
              />
            </figure>
            <div className="home-contact__content" data-reveal="fade">
              <h2 id="contact-title">Come up to Kibber</h2>
              <p>
                Tell us your dates and we will confirm your stay personally, with
                help on routes, permits and acclimatisation.
              </p>
              <dl className="home-contact__data">
                <div>
                  <dt>Address</dt>
                  <dd>Kibber Village, Spiti Valley, Himachal Pradesh · {house.altitude}</dd>
                </div>
                {contactPeople.map((person) => (
                  <div key={person.href}>
                    <dt>Tel</dt>
                    <dd>
                      <a href={person.href}>{person.phone}</a> · {person.name}
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
              <Link className="home-line-link" href="/book">
                check availability
              </Link>
            </div>
          </div>
          <figure className="home-contact__big" data-reveal="curtain-right">
            <Image
              src={photos.mountains.src}
              alt={photos.mountains.alt}
              fill
              sizes="(min-width: 800px) 56vw, 88vw"
            />
          </figure>
        </div>
      </section>
    </div>
  );
}
