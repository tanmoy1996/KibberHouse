import { NextResponse } from "next/server";

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
  const endpoint = process.env.BOOKING_ENQUIRY_WEBHOOK_URL;
  if (!endpoint)
    return NextResponse.json(
      { message: "Online enquiry delivery is not configured yet." },
      { status: 503 },
    );
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!response.ok)
    return NextResponse.json(
      { message: "The enquiry could not be sent. Please email us directly." },
      { status: 502 },
    );
  return NextResponse.json({ ok: true });
}
