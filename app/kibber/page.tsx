import type { Metadata } from "next";
import {
  EditorialPage,
  EditorialBlock,
} from "@/components/layout/EditorialPage";
import { FieldData } from "@/components/ui/field-data";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { house } from "@/content/house";
import { media } from "@/content/media";
export const metadata: Metadata = {
  title: "Kibber Village",
  description:
    "Kibber Village in Spiti Valley at 4,270 m, 18 km from Kaza and 7 km from Key Gompa.",
};
export default function Page() {
  return (
    <EditorialPage
      eyebrow="Kibber · Spiti"
      title="Kibber"
      introduction="A high-altitude village in Spiti Valley, Himachal Pradesh."
    >
      <EditorialBlock
        label="Place"
        title="The mountains begin beyond the last wall."
      >
        <MediaPlaceholder
          asset={media.home.landscape}
          label="Kibber landscape"
        />
        <div className="scene-field-data">
          <FieldData label="Altitude" value={house.altitude} />
          <FieldData label="Kaza" value={house.distanceFromKaza} />
          <FieldData label="Key Gompa" value={house.distanceFromKeyGompa} />
        </div>
      </EditorialBlock>
      <EditorialBlock
        label="Surroundings"
        title="Village, fields and high-altitude wildlife."
        tone="cold"
      >
        <p>
          Kibber House sits in Kibber Village, within the wider Spiti landscape.
          We keep this page to verified facts until more local history is
          supplied.
        </p>
      </EditorialBlock>
    </EditorialPage>
  );
}
