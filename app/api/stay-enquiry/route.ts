import { createEnquiry, BookingSheetError } from "@/lib/booking/sheets";
import { isValidStay } from "@/lib/booking/validation";

export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return Response.json({ message: "Please send JSON." }, { status: 415 });
  }
  let body;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing body");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 1024) {
        await reader.cancel();
        return Response.json({ message: "Request too large." }, { status: 413 });
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return Response.json({ message: "The enquiry could not be read." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body) ||
    !isValidStay(body.checkIn, body.checkOut) ||
    typeof body.adults !== "string" || !/^[1-8]$/.test(body.adults) ||
    typeof body.children !== "string" || !/^[0-6]$/.test(body.children)) {
    return Response.json({ message: "Choose valid dates and guest counts." }, { status: 400 });
  }
  try {
    return Response.json(await createEnquiry({
      checkIn: body.checkIn, checkOut: body.checkOut,
      adults: body.adults, children: body.children,
      name: "", phone: "", email: "", roomPreference: "Any", mealPreference: "",
      requests: "Homepage enquiry; continuing on WhatsApp.",
    }));
  } catch (error) {
    return Response.json({ message: "Your enquiry could not be saved. Please try again." },
      { status: error instanceof BookingSheetError ? error.status : 502 });
  }
}
