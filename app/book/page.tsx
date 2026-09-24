import { pageMetadata } from "@/lib/seo";
import { EntryReady } from "@/components/loading/EntryExperience";
import { HomeMotion } from "@/components/home/HomeMotion";
import { BookingEnquiryForm } from "@/components/booking/BookingEnquiryForm";
import { house } from "@/content/house";

export const metadata = pageMetadata({
  title: "Book your stay",
  description:
    "Check live room availability at Kibber House in Spiti Valley and send a booking enquiry. We confirm every stay personally.",
  path: "/book",
});

export default function Page() {
  return (
    <div className="home book-page">
      <EntryReady />
      <HomeMotion />

      <section className="home-meta" data-tone="light" aria-labelledby="book-title">
        <div data-reveal="fade">
          <p className="home-kicker">Book your stay</p>
          <h1 id="book-title">Plan your stay</h1>
          <p>
            Check live room availability, then send us your details. We will confirm
            your stay personally.
          </p>
        </div>
      </section>

      <section className="book-section" data-tone="light" aria-label="Booking enquiry">
        <BookingEnquiryForm />
      </section>

      <section className="book-section book-section--policies" data-tone="snow" aria-labelledby="policies-title">
        <div className="book-policies">
          <header data-reveal="fade">
            <p className="home-kicker">Good to know</p>
            <h2 id="policies-title">House notes</h2>
          </header>
          <dl className="book-policies__list" data-reveal="fade">
            {house.policies.map((policy) => (
              <div key={policy.label}>
                <dt>{policy.label}</dt>
                <dd>{policy.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
