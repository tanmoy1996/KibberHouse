import type { Metadata } from "next";
import {
  EditorialPage,
  EditorialBlock,
} from "@/components/layout/EditorialPage";
import { BookingEnquiryForm } from "@/components/booking/BookingEnquiryForm";
import { house } from "@/content/house";
import { contact } from "@/content/contact";
export const metadata: Metadata = {
  title: "Booking enquiry",
  description:
    "Send a stay enquiry to Kibber House. Availability is confirmed directly by the house.",
};
export default function Page() {
  return (
    <EditorialPage
      eyebrow="Book"
      title="Check availability."
      introduction="Send an enquiry for your dates. This is not an instant booking system."
    >
      <EditorialBlock
        label="Stay enquiry"
        title="Tell us when you would like to come."
      >
        <BookingEnquiryForm />
        {contact.whatsapp && (
          <p>
            <a className="button button--secondary" href={contact.whatsapp}>
              WhatsApp
            </a>
          </p>
        )}
      </EditorialBlock>
      <EditorialBlock
        label="House policies"
        title="Before you arrive."
        tone="barley"
      >
        <dl className="definition-list">
          {house.policies.map((policy) => (
            <div key={policy.label}>
              <dt>{policy.label}</dt>
              <dd>{policy.value}</dd>
            </div>
          ))}
        </dl>
      </EditorialBlock>
    </EditorialPage>
  );
}
