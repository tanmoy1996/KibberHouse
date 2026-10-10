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
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return NextResponse.json({ message: "Please send a JSON enquiry." }, { status: 415 });
  }
  let body: Record<string, unknown>;
  try {
    // Bound the body before parsing or forwarding it to the booking service.
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing body");
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16_384) {
        await reader.cancel();
        return NextResponse.json({ message: "The enquiry is too large." }, { status: 413 });
      }
      chunks.push(value);
    }
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
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

  const fields = [...required, "requests"];
  if (fields.some((key) => body[key] !== undefined &&
    (typeof body[key] !== "string" || String(body[key]).length > (key === "requests" ? 2000 : 254)))) {
    return NextResponse.json({ message: "Please shorten the enquiry fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email).trim()) ||
    !/^(?:[1-9]|1[0-2])$/.test(String(body.adults)) ||
    !/^(?:[0-9]|1[0-2])$/.test(String(body.children))) {
    return NextResponse.json({ message: "Please enter a valid email and guest count." }, { status: 400 });
  }
  const payload = Object.fromEntries(fields.map((key) => [key, String(body[key] ?? "").trim()]));

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
