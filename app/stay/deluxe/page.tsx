import type { Metadata } from "next";
import {
  EditorialPage,
  EditorialBlock,
} from "@/components/layout/EditorialPage";
import { RoomDetails } from "@/components/rooms/RoomDetails";
import { rooms } from "@/content/rooms";
export const metadata: Metadata = {
  title: "Deluxe Rooms",
  description:
    "Five Deluxe rooms at Kibber House, each with an attached bathroom and double occupancy.",
};
export default function Page() {
  return (
    <EditorialPage
      eyebrow="Stay / 02"
      title="Deluxe"
      introduction="Five rooms. Double occupancy. Attached bathrooms."
    >
      <EditorialBlock label="Room record" title="Deluxe">
        <RoomDetails room={rooms[1]} />
      </EditorialBlock>
    </EditorialPage>
  );
}
