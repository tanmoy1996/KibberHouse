import type { Metadata } from "next";
import {
  EditorialPage,
  EditorialBlock,
} from "@/components/layout/EditorialPage";
export const metadata: Metadata = { title: "Privacy" };
export default function Page() {
  return (
    <EditorialPage
      eyebrow="Legal"
      title="Privacy"
      introduction="This page describes the current enquiry workflow."
    >
      <EditorialBlock label="Enquiries" title="Information you send.">
        <p>
          Booking enquiries contain the details you enter so Kibber House can
          respond. The public site does not use a booking database. A fuller
          policy will be published before online delivery is enabled.
        </p>
      </EditorialBlock>
    </EditorialPage>
  );
}
