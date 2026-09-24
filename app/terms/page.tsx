import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/layout/LegalPage";
import { house } from "@/content/house";
import { seasons } from "@/content/seasons";

export const metadata = pageMetadata({
  title: "Terms",
  description:
    "Booking terms and house policies at Kibber House: enquiries, confirmation, check-in and check-out times, and house rules.",
  path: "/terms",
});

export default function Page() {
  return (
    <LegalPage kicker="Legal" title="Terms" lead="A booking enquiry does not confirm a stay.">
      <h2>Enquiries and confirmation</h2>
      <p>
        Dates, room choice and rates are confirmed directly by Kibber House. Your stay is
        booked only once we have confirmed it with you. Rates are available on request.
      </p>
      <h2>Experiences</h2>
      <p>
        {seasons.activityNote} {seasons.wildlifeNote}
      </p>
      <h2>House policies</h2>
      <dl className="legal-policies">
        {house.policies.map((policy) => (
          <div key={policy.label}>
            <dt>{policy.label}</dt>
            <dd>{policy.value}</dd>
          </div>
        ))}
      </dl>
    </LegalPage>
  );
}
