import type { Metadata } from "next";
import {
  EditorialPage,
  EditorialBlock,
} from "@/components/layout/EditorialPage";
import { RoomDetails } from "@/components/rooms/RoomDetails";
import { rooms } from "@/content/rooms";
export const metadata: Metadata = {
  title: "Super Deluxe Room",
  description:
    "The one Super Deluxe room at Kibber House, with an attached bathroom and double occupancy.",
};
export default function Page() {
  return (
    <EditorialPage
      eyebrow="Stay / 01"
      title="Super Deluxe"
      introduction="One room. Double occupancy. Attached bathroom."
    >
      <EditorialBlock label="Room record" title="Super Deluxe">
        <RoomDetails room={rooms[0]} />
      </EditorialBlock>
    </EditorialPage>
  );
}
