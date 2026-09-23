import Link from "next/link";
import type { Room } from "@/types/content";
import { FieldData } from "@/components/ui/field-data";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { media } from "@/content/media";
import { facilities } from "@/content/rooms";
import { house } from "@/content/house";

export function RoomDetails({ room }: { room: Room }) {
  return (
    <div className="room-detail">
      <MediaPlaceholder
        asset={media.home.roomWide}
        label={`${room.name} room`}
      />
      <div className="room-detail__facts">
        <FieldData label="Rooms" value={room.count} />
        <FieldData label="Occupancy" value={room.occupancy} />
        <FieldData label="Bathroom" value={room.bathroom} />
        <FieldData label="Extra bed" value={room.extraBed} />
      </div>
      <h2>Winter comfort</h2>
      <ul className="editorial-list">
        {facilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>Hot water</h2>
      <p>
        {house.hotWater.summer}. {house.hotWater.winter}.
      </p>
      <h2>Meals</h2>
      <dl className="definition-list">
        {house.mealPlans.map((plan) => (
          <div key={plan.code}>
            <dt>{plan.code}</dt>
            <dd>{plan.description}</dd>
          </div>
        ))}
      </dl>
      <p className="button-row">
        <Link className="button button--primary" href="/book">
          Check availability
        </Link>
        <Link className="button button--secondary" href="/stay">
          All rooms
        </Link>
      </p>
    </div>
  );
}
