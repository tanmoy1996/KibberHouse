import type { Metadata } from "next";
import {
  EditorialPage,
  EditorialBlock,
} from "@/components/layout/EditorialPage";
export const metadata: Metadata = { title: "Terms" };
export default function Page() {
  return (
    <EditorialPage
      eyebrow="Legal"
      title="Terms"
      introduction="A booking enquiry does not confirm a stay."
    >
      <EditorialBlock
        label="Availability"
        title="Confirmation comes from Kibber House."
      >
        <p>
          Dates, room choice and rates remain subject to direct confirmation.
          Public retail rates are available on request.
        </p>
      </EditorialBlock>
    </EditorialPage>
  );
}
