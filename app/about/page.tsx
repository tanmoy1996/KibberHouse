import type { Metadata } from "next";
import {
  EditorialPage,
  EditorialBlock,
} from "@/components/layout/EditorialPage";
import { house } from "@/content/house";
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
    >
      <EditorialBlock label="Kibber House" title={house.positioning}>
        <p>{house.supportingConcept}</p>
        <p>The family story will be added here when supplied.</p>
      </EditorialBlock>
    </EditorialPage>
  );
}
