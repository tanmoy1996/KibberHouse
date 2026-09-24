import type { AvailabilityResponse } from "./types";

const timeoutMs = 10_000;

function config() {
  const endpoint = process.env.BOOKING_SHEET_WEB_APP_URL;
  const secret = process.env.BOOKING_SHEET_SECRET;

  if (!endpoint || !secret) {
    throw new BookingSheetError("Booking sheet integration is not configured.", 503);
  }

  return { endpoint, secret };
}

async function sheetFetch(url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    throw new BookingSheetError("The booking sheet could not be reached.", 502);
  }

  return response;
}

export class BookingSheetError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

export async function getAvailability(checkIn: string, checkOut: string) {
  const { endpoint, secret } = config();
  const url = new URL(endpoint);
  url.searchParams.set("action", "availability");
  url.searchParams.set("secret", secret);
  url.searchParams.set("checkIn", checkIn);
  url.searchParams.set("checkOut", checkOut);

  const response = await sheetFetch(url.toString());
  const result = (await response.json()) as AvailabilityResponse & {
    ok?: boolean;
    message?: string;
  };
  if (result.ok === false) {
    throw new BookingSheetError(result.message || "Availability lookup failed.", 502);
  }
  return result;
}

export async function createEnquiry(payload: Record<string, string>) {
  const { endpoint, secret } = config();
  const response = await sheetFetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action: "createEnquiry", secret, ...payload }),
  });

  const result = (await response.json()) as {
    ok: boolean;
    bookingId?: string;
    message?: string;
  };
  if (!result.ok || !result.bookingId) {
    throw new BookingSheetError(result.message || "The enquiry could not be saved.", 502);
  }
  return { ok: true as const, bookingId: result.bookingId };
}
