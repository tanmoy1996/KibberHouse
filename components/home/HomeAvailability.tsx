"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { AvailabilityResponse } from "@/lib/booking/types";

type AvailabilityState =
  | { kind: "idle" | "loading" }
  | { kind: "ready"; data: AvailabilityResponse }
  | { kind: "error"; message: string };

function Counter({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="home-availability__item home-availability__item--count" role="group" aria-label={label}>
      <span className="home-availability__label" aria-hidden="true">{label}</span>
      <div className="home-availability__count">
        <button
          type="button"
          aria-label={`Fewer ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
        >
          −
        </button>
        <output aria-live="polite">{value}</output>
        <button
          type="button"
          aria-label={`More ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export function HomeAvailability() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [state, setState] = useState<AvailabilityState>({ kind: "idle" });

  async function checkAvailability(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setState({ kind: "error", message: "Choose a valid stay." });
      return;
    }

    setState({ kind: "loading" });
    try {
      const response = await fetch(
        `/api/availability?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`,
        { cache: "no-store" },
      );
      const data = (await response.json()) as AvailabilityResponse & {
        message?: string;
      };
      if (!response.ok) throw new Error(data.message || "Availability unavailable.");
      setState({ kind: "ready", data });
    } catch (error) {
      setState({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Live availability is temporarily unavailable.",
      });
    }
  }

  const bookingHref = `/book?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&adults=${adults}&children=${children}`;

  return (
    <div className="home-availability">
      <form onSubmit={checkAvailability} className="home-availability__form">
        <div className="home-availability__item home-availability__item--dates">
          <label>
            <span className="home-availability__label">Check in</span>
            <input
              type="date"
              value={checkIn}
              onChange={(event) => {
                setCheckIn(event.target.value);
                setState({ kind: "idle" });
              }}
              required
            />
          </label>
          <label>
            <span className="home-availability__label">Check out</span>
            <input
              type="date"
              min={checkIn || undefined}
              value={checkOut}
              onChange={(event) => {
                setCheckOut(event.target.value);
                setState({ kind: "idle" });
              }}
              required
            />
          </label>
        </div>
        <Counter label="Adults" value={adults} min={1} max={8} onChange={setAdults} />
        <Counter label="Children" value={children} min={0} max={6} onChange={setChildren} />
        <button
          type="submit"
          className="home-availability__submit"
          disabled={state.kind === "loading"}
        >
          {state.kind === "loading" ? "Checking…" : "Check availability"}
        </button>
        <div className="home-availability__result" aria-live="polite">
          {state.kind === "ready" && (
            <>
              <span>
                {state.data.available
                  ? state.data.rooms
                      .filter((room) => room.available > 0)
                      .map((room) => `${room.available} ${room.roomType}`)
                      .join(" · ")
                  : "No rooms showing for these dates"}
              </span>
              {state.data.available && <Link href={bookingHref}>Continue enquiry →</Link>}
            </>
          )}
          {state.kind === "error" && (
            <>
              <span>{state.message}</span>
              <Link href={bookingHref}>Send an enquiry →</Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
