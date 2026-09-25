import { rooms } from "@/content/rooms";
import { seasonOf, tariff, type MealCode, type RoomCategoryId, type Season } from "@/content/tariff";

export type EstimateLine = { label: string; detail: string; amount: number };
export type Estimate =
  | { kind: "priced"; lines: EstimateLine[]; total: number }
  | { kind: "on-request" };

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 });
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
export const formatInr = (amount: number) => inr.format(amount);
export const formatUsd = (amount: number) => usd.format(Math.round(amount / tariff.usdRate));

const addDays = (iso: string, days: number) =>
  new Date(Date.parse(`${iso}T00:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10);
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
const shortDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

type Segment = { season: Season; start: string; nights: number };

// Consecutive nights at the same rate; null when any night is quoted on request.
function segments(checkIn: string, nights: number): Segment[] | null {
  const result: Segment[] = [];
  for (let i = 0; i < nights; i++) {
    const date = addDays(checkIn, i);
    const season = seasonOf(date);
    if (!season) return null;
    const last = result.at(-1);
    if (last?.season === season) last.nights++;
    else result.push({ season, start: date, nights: 1 });
  }
  return result;
}

// Fill the preferred category first, then the other, within the rooms the house has.
function allocate(count: number, preferred: RoomCategoryId) {
  const order = [...rooms].sort((a, b) => Number(b.id === preferred) - Number(a.id === preferred));
  let left = count;
  return order
    .map((room) => {
      const n = Math.min(room.count, left);
      left -= n;
      return { room, n };
    })
    .filter(({ n }) => n > 0);
}

export function estimateStay({
  checkIn,
  nights,
  adults,
  children,
  roomName,
  meal,
}: {
  checkIn: string;
  nights: number;
  adults: number;
  children: number;
  roomName: string;
  meal: MealCode;
}): Estimate {
  const parts = segments(checkIn, nights);
  if (!parts) return { kind: "on-request" };

  // Two guests share a room; a third adult takes an extra bed rather than another room.
  const totalRooms = rooms.reduce((sum, room) => sum + room.count, 0);
  const roomCount = Math.min(totalRooms, Math.max(1, Math.ceil(adults / 3)));
  const extraAdults = Math.max(0, adults - roomCount * 2);
  const preferred = rooms.find((room) => room.name === roomName)?.id ?? "deluxe";
  const allocation = allocate(roomCount, preferred);

  const lines: EstimateLine[] = [];
  for (const { season, start, nights: n } of parts) {
    const suffix = parts.length > 1 ? ` · from ${shortDate.format(new Date(`${start}T00:00:00Z`))}` : "";
    const per = (count: number, unit: string, rate: number) =>
      `${plural(count, unit)} × ${formatInr(rate)} × ${plural(n, "night")}`;

    for (const { room, n: count } of allocation) {
      const rate = tariff.rooms[room.id][season];
      lines.push({ label: `${room.name} room${suffix}`, detail: per(count, "room", rate), amount: count * rate * n });
    }
    if (tariff.meals[meal] > 0) {
      const rate = tariff.meals[meal];
      lines.push({ label: `Meals · ${meal}${suffix}`, detail: per(roomCount, "room", rate), amount: roomCount * rate * n });
    }
    if (extraAdults > 0) {
      const rate = tariff.extraAdult[season];
      lines.push({ label: `Extra adult${suffix}`, detail: per(extraAdults, "adult", rate), amount: extraAdults * rate * n });
    }
    if (children > 0) {
      const rate = tariff.child[season];
      lines.push({ label: `Child 5–11${suffix}`, detail: per(children, "child", rate).replace("childs", "children"), amount: children * rate * n });
    }
  }

  return { kind: "priced", lines, total: lines.reduce((sum, line) => sum + line.amount, 0) };
}
