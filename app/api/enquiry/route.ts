import { NextResponse } from "next/server";
import { BookingSheetError, createEnquiry } from "@/lib/booking/sheets";
import { isValidStay, phoneError } from "@/lib/booking/validation";

const required = [
  "checkIn",
  "checkOut",
  "adults",
  "children",
  "roomPreference",
  "mealPreference",
  "name",
  "phone",
  "email",
] as const;
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { message: "The enquiry could not be read." },
      { status: 400 },
    );
  }
  if (
    required.some(
      (key) => typeof body[key] !== "string" || !String(body[key]).trim(),
    )
  )
    return NextResponse.json(
      { message: "Please complete every required field." },
      { status: 400 },
    );

  if (!isValidStay(body.checkIn, body.checkOut)) {
    return NextResponse.json(
      { message: "Check-out must be after check-in." },
      { status: 400 },
    );
  }

  const invalidPhone = phoneError(body.phone);
  if (invalidPhone) {
    return NextResponse.json({ message: invalidPhone }, { status: 400 });
  }

  const payload = Object.fromEntries(
    Object.entries(body).map(([key, value]) => [key, String(value).trim()]),
  );

  try {
    const result = await createEnquiry(payload);
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof BookingSheetError ? error.status : 502;
    return NextResponse.json(
      { message: "The enquiry could not be sent. Please email us directly." },
      { status },
    );
  }
}
