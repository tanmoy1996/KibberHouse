import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/layout/LegalPage";
import { contact } from "@/content/contact";

export const metadata = pageMetadata({
  title: "Privacy",
  description:
    "How Kibber House handles the details you send through booking enquiries, the contact form and WhatsApp.",
  path: "/privacy",
});

export default function Page() {
  return (
    <LegalPage
      kicker="Legal"
      title="Privacy"
      lead="What happens to the details you share with us, in plain words."
    >
      <h2>Booking enquiries</h2>
      <p>
        When you send an enquiry from the Book page, the details you enter (your name,
        phone number, email, dates, guests, room and meal preferences, and any special
        requests) are saved to a private Google Sheet run by Kibber House. We use them
        only to reply to you and to arrange your stay.
      </p>
      <h2>Availability checks</h2>
      <p>
        Checking availability sends only the dates you choose. Nothing personal is
        needed or stored.
      </p>
      <h2>Contact form and WhatsApp</h2>
      <p>
        The form on the Contact page does not store anything on this site. It opens
        WhatsApp with your message ready to send, and anything you send there is handled
        by WhatsApp under its own privacy policy.
      </p>
      <h2>Maps</h2>
      <p>
        The Contact page shows an embedded Google Map, which is loaded from Google and
        covered by Google&apos;s privacy policy.
      </p>
      <h2>Your details</h2>
      <p>
        We do not sell or share your details. To see, correct or delete what you have
        sent us, email{" "}
        {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}.
      </p>
    </LegalPage>
  );
}
