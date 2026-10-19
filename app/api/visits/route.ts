import { logVisit } from "@/lib/booking/sheets";

const fields = ["sessionId", "path", "referrer", "utmSource", "utmMedium", "utmCampaign", "device", "language", "timezone"];

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return new Response(null, { status: 403 });
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return new Response(null, { status: 415 });
  }
  try {
    const reader = request.body?.getReader();
    if (!reader) return new Response(null, { status: 400 });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 4096) {
        await reader.cancel();
        return new Response(null, { status: 413 });
      }
      chunks.push(value);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || typeof body !== "object" || Array.isArray(body) ||
      fields.some(key => typeof body[key] !== "string" || body[key].length > 300) ||
      !/^[a-f0-9-]{36}$/i.test(body.sessionId) || !body.path.startsWith("/") ||
      body.path.includes("?") || body.path.includes("#")) {
      return new Response(null, { status: 400 });
    }
    await logVisit(Object.fromEntries(fields.map(key => [key, body[key]])));
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 503 });
  }
}
