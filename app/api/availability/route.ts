import { NextResponse } from "next/server";
import { BookingSheetError, getAvailability } from "@/lib/booking/sheets";
import { isValidStay } from "@/lib/booking/validation";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const checkIn = url.searchParams.get("checkIn");
  const checkOut = url.searchParams.get("checkOut");

  if (!checkIn || !checkOut || !isValidStay(checkIn, checkOut)) {
    return NextResponse.json(
      { message: "Choose a valid check-in and check-out date." },
      { status: 400 },
    );
  }

  try {
    const availability = await getAvailability(checkIn, checkOut);
    return NextResponse.json(availability, {
      headers: { "cache-control": "no-store" },
    });
  } catch (error) {
    const status = error instanceof BookingSheetError ? error.status : 502;
    return NextResponse.json(
      { message: "Live availability is temporarily unavailable." },
      { status },
    );
  }
}
