export const bookingStatuses = ["Enquiry", "Held", "Confirmed", "Cancelled"] as const;

export type BookingStatus = (typeof bookingStatuses)[number];

export type RoomAvailability = {
  roomType: string;
  total: number;
  booked: number;
  available: number;
};

export type AvailabilityResponse = {
  checkIn: string;
  checkOut: string;
  rooms: RoomAvailability[];
  available: boolean;
};

