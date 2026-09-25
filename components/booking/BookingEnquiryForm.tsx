"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact, contactPeople } from "@/content/contact";
import { house } from "@/content/house";
import { photos, type MediaAsset } from "@/content/media";
import { tariff, type MealCode } from "@/content/tariff";
import { estimateStay, formatInr, formatUsd } from "@/lib/booking/estimate";
import type { AvailabilityResponse } from "@/lib/booking/types";
import { isIsoDate, isValidStay, phoneError } from "@/lib/booking/validation";

type Status = {
  kind: "idle" | "submitting" | "success" | "error";
  message?: string;
};

// `value` is what the enquiry sheet records; keep it stable.
const roomOptions: { value: string; label: string; note: string; photo: MediaAsset }[] = [
  { value: "Any", label: "No preference", note: "Whichever suits your dates", photo: photos.bedDetail },
  { value: "Deluxe", label: "Deluxe", note: `${house.roomCategories.deluxe} rooms · mountain view`, photo: photos.bedroom },
  { value: "Super Deluxe", label: "Super Deluxe", note: `${house.roomCategories.superDeluxe} suite · with an extra room`, photo: photos.roomSunset },
];

const mealValues: Record<string, string> = {
  EP: "Room + tea",
  CP: "Breakfast",
  MAP: "Breakfast + dinner",
  AP: "All meals",
};
const mealOptions = house.mealPlans.map((plan) => ({ ...plan, value: mealValues[plan.code] }));

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));
const nightsBetween = (from: string, to: string) =>
  Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);

function Counter({
  label,
  name,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="book-counter" role="group" aria-label={label}>
      <span className="book-field__label" aria-hidden="true">{label}</span>
      <div className="book-counter__pill">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)}>
          −
        </button>
        <output aria-live="polite">{value}</output>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)}>
          +
        </button>
      </div>
      <input type="hidden" name={name} value={value} />
    </div>
  );
}

export function BookingEnquiryForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const statusRef = useRef<HTMLDivElement>(null);
  // Shown once the field has been left or a send attempted, not while typing a first try.
  const [phoneMessage, setPhoneMessage] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState("Any");
  const [meal, setMeal] = useState("Breakfast");
  const [availability, setAvailability] = useState<
    | { kind: "idle" }
    | { kind: "ready"; data: AvailabilityResponse }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  // Carry over a stay started in the home page availability bar (/book?checkIn=…).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const count = (key: string, min: number, max: number) => {
      const n = Number(params.get(key));
      return params.has(key) && Number.isInteger(n) && n >= min && n <= max ? n : null;
    };
    const inDate = params.get("checkIn");
    const outDate = params.get("checkOut");
    const a = count("adults", 1, 12);
    const c = count("children", 0, 12);
    const r = roomOptions.find((option) => option.value === params.get("room"));
    /* eslint-disable react-hooks/set-state-in-effect -- one-time read of the URL on mount */
    if (isIsoDate(inDate)) setCheckIn(inDate);
    if (isIsoDate(outDate)) setCheckOut(outDate);
    if (a !== null) setAdults(a);
    if (c !== null) setChildren(c);
    if (r) setRoom(r.value);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Bring the outcome into view: on small screens the summary sits below the form.
  useEffect(() => {
    if (status.kind !== "success" && status.kind !== "error") return;
    statusRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    statusRef.current?.focus({ preventScroll: true });
  }, [status.kind]);

  useEffect(() => {
    if (!isValidStay(checkIn, checkOut)) return;

    const controller = new AbortController();

    fetch(
      `/api/availability?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`,
      { signal: controller.signal, cache: "no-store" },
    )
      .then(async (response) => {
        const result = (await response.json()) as AvailabilityResponse & {
          message?: string;
        };
        if (!response.ok) throw new Error(result.message || "Availability unavailable.");
        setAvailability({ kind: "ready", data: result });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setAvailability({
          kind: "error",
          message: error instanceof Error ? error.message : "Availability unavailable.",
        });
      });

    return () => controller.abort();
  }, [checkIn, checkOut]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const phone = form.elements.namedItem("phone") as HTMLInputElement;
    const invalidPhone = phoneError(phone.value);
    phone.setCustomValidity(invalidPhone ?? "");
    setPhoneMessage(invalidPhone);
    if (!form.reportValidity()) return;
    setStatus({ kind: "submitting" });
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok)
        throw new Error(result.message || "Online sending is unavailable.");
      form.reset();
      setPhoneMessage(null);
      setCheckIn("");
      setCheckOut("");
      setAdults(2);
      setChildren(0);
      setRoom("Any");
      setMeal("Breakfast");
      setAvailability({ kind: "idle" });
      setStatus({
        kind: "success",
        message:
          "Thank you. We will be in touch personally; your stay is confirmed only once Kibber House confirms availability.",
      });
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Online sending is unavailable.",
      });
    }
  }

  const validStay = isValidStay(checkIn, checkOut);
  const nights = validStay ? nightsBetween(checkIn, checkOut) : 0;
  const mealPlan = mealOptions.find((plan) => plan.value === meal);
  const roomLabel = roomOptions.find((option) => option.value === room)?.label;
  const estimate =
    validStay && mealPlan
      ? estimateStay({ checkIn, nights, adults, children, roomName: room, meal: mealPlan.code as MealCode })
      : null;

  return (
    <form className="book-form" onSubmit={submit} aria-describedby="booking-note">
      <div className="book-form__steps">
        <fieldset className="book-step" data-reveal="fade">
          <legend>
            <span className="home-kicker">01 · Your stay</span>
            <span className="book-step__title">When would you like to come?</span>
          </legend>
          <div className="book-grid">
            <label className="book-field">
              <span className="book-field__label">Check-in</span>
              <input
                name="checkIn"
                type="date"
                value={checkIn}
                onChange={(event) => {
                  setCheckIn(event.target.value);
                  setAvailability({ kind: "idle" });
                }}
                required
              />
            </label>
            <label className="book-field">
              <span className="book-field__label">Check-out</span>
              <input
                name="checkOut"
                type="date"
                min={checkIn || undefined}
                value={checkOut}
                onChange={(event) => {
                  setCheckOut(event.target.value);
                  setAvailability({ kind: "idle" });
                }}
                required
              />
            </label>
            <Counter label="Adults" name="adults" value={adults} min={1} max={12} onChange={setAdults} />
            <Counter label="Children" name="children" value={children} min={0} max={12} onChange={setChildren} />
          </div>
        </fieldset>

        <fieldset className="book-step" data-reveal="fade">
          <legend>
            <span className="home-kicker">02 · Room &amp; meals</span>
            <span className="book-step__title">How would you like to stay?</span>
          </legend>
          <div className="book-rooms" role="radiogroup" aria-label="Room preference">
            {roomOptions.map((option) => (
              <label key={option.value} className="book-room">
                <input
                  type="radio"
                  name="roomPreference"
                  value={option.value}
                  checked={room === option.value}
                  onChange={() => setRoom(option.value)}
                />
                <span className="book-room__media">
                  <Image src={option.photo.src} alt="" fill sizes="(min-width: 900px) 18vw, 45vw" />
                </span>
                <span className="book-room__label">{option.label}</span>
                <span className="book-room__note">{option.note}</span>
              </label>
            ))}
          </div>
          <div className="book-meals" role="radiogroup" aria-label="Meal plan">
            {mealOptions.map((plan) => (
              <label key={plan.code} className="book-meal">
                <input
                  type="radio"
                  name="mealPreference"
                  value={plan.value}
                  checked={meal === plan.value}
                  onChange={() => setMeal(plan.value)}
                />
                <span className="book-meal__code">{plan.code}</span>
                <span className="book-meal__text">{plan.description}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="book-step" data-reveal="fade">
          <legend>
            <span className="home-kicker">03 · Your details</span>
            <span className="book-step__title">Where can we reach you?</span>
          </legend>
          <div className="book-grid">
            <label className="book-field">
              <span className="book-field__label">Name</span>
              <input name="name" autoComplete="name" required maxLength={100} />
            </label>
            <label className="book-field" data-invalid={phoneMessage ? "" : undefined}>
              <span className="book-field__label">Phone</span>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                maxLength={30}
                placeholder="+91 98765 43210"
                aria-invalid={phoneMessage ? true : undefined}
                aria-describedby="phone-hint"
                onBlur={(event) => {
                  const message = event.currentTarget.value.trim() ? phoneError(event.currentTarget.value) : null;
                  event.currentTarget.setCustomValidity(message ?? "");
                  setPhoneMessage(message);
                }}
                onChange={(event) => {
                  // Clear the error as soon as the number becomes valid.
                  if (phoneMessage && !phoneError(event.currentTarget.value)) {
                    event.currentTarget.setCustomValidity("");
                    setPhoneMessage(null);
                  }
                }}
              />
              <span id="phone-hint" className="book-field__hint" aria-live="polite">
                {phoneMessage ?? "Add your country code if you are outside India."}
              </span>
            </label>
            <label className="book-field book-field--wide">
              <span className="book-field__label">Email</span>
              <input name="email" type="email" autoComplete="email" required maxLength={200} />
            </label>
            <label className="book-field book-field--wide">
              <span className="book-field__label">Special requests</span>
              <textarea
                name="requests"
                rows={4}
                maxLength={1500}
                placeholder="Arrival time, dietary needs, an extra bed, a campfire…"
              />
            </label>
          </div>
        </fieldset>
      </div>

      <aside className="book-summary" aria-label="Your stay">
        <p className="home-kicker">Your stay</p>
        <dl className="book-summary__list">
          <div>
            <dt>Dates</dt>
            <dd>
              {validStay ? (
                <>
                  {formatDate(checkIn)} – {formatDate(checkOut)}
                  <span>
                    {nights} {nights === 1 ? "night" : "nights"}
                  </span>
                </>
              ) : (
                <span>Choose your dates</span>
              )}
            </dd>
          </div>
          <div>
            <dt>Guests</dt>
            <dd>
              {adults} {adults === 1 ? "adult" : "adults"}
              {children > 0 && `, ${children} ${children === 1 ? "child" : "children"}`}
            </dd>
          </div>
          <div>
            <dt>Room</dt>
            <dd>{roomLabel}</dd>
          </div>
          <div>
            <dt>Meal plan</dt>
            <dd>
              {mealPlan?.code}
              <span>{mealPlan?.description}</span>
            </dd>
          </div>
        </dl>

        <div className="book-estimate" aria-live="polite">
          <p className="home-kicker">Estimated tariff</p>
          {!estimate && <p className="book-estimate__empty">Choose your dates to see the amount.</p>}
          {estimate?.kind === "on-request" && (
            <p className="book-estimate__empty">
              Stays between {tariff.onRequest.dates} are quoted on request. Send your enquiry and we will
              write back with a rate.
            </p>
          )}
          {estimate?.kind === "priced" && (
            <>
              <ul className="book-estimate__lines">
                {estimate.lines.map((line) => (
                  <li key={line.label}>
                    <span>
                      {line.label}
                      <small>{line.detail}</small>
                    </span>
                    <span className="price price--small">
                      <strong>{formatUsd(line.amount)}</strong>
                      <span>{formatInr(line.amount)}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="book-estimate__total">
                <span>Total</span>
                <span className="price">
                  <strong>{formatUsd(estimate.total)}</strong>
                  <span>{formatInr(estimate.total)}</span>
                </span>
              </p>
              <p className="book-estimate__note">
                {room === "Any" && "Priced as Deluxe. "}
                Children at the 5–11 rate; under 5 stay free. Charged in rupees; dollars are
                approximate. Taxes extra where applicable. The rate we confirm is final.
              </p>
            </>
          )}
          <p className="book-estimate__discount">
            Longer stay, group or returning guest? <Link href="/contact">Contact us for a discount.</Link>
          </p>
        </div>

        <div className="book-summary__availability" aria-live="polite" data-state={availability.kind}>
          {availability.kind === "idle" && validStay && "Checking live availability…"}
          {availability.kind === "ready" && (
            <>
              <strong>
                {availability.data.available
                  ? "Rooms are showing as available."
                  : "No rooms are currently showing as available."}
              </strong>
              <span>
                {availability.data.rooms
                  .map((r) => `${r.roomType}: ${r.available} available`)
                  .join(" · ")}
              </span>
            </>
          )}
          {availability.kind === "error" && (
            <span>Live availability could not be checked. You can still send an enquiry.</span>
          )}
        </div>

        <button type="submit" className="book-summary__submit" disabled={status.kind === "submitting"}>
          {status.kind === "submitting" ? "Sending…" : "Send enquiry"}
        </button>
        <p id="booking-note" className="book-summary__note">
          This is an enquiry. Availability is confirmed separately by Kibber House.
        </p>
        <div
          ref={statusRef}
          className="book-summary__status"
          role="status"
          aria-live="polite"
          tabIndex={-1}
          data-status={status.kind}
        >
          {(status.kind === "success" || status.kind === "error") && (
            <>
              <span className="book-summary__status-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  {status.kind === "success" ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M12 7v6M12 16.5v.5" />}
                </svg>
              </span>
              <strong>{status.kind === "success" ? "Enquiry sent" : "Not sent"}</strong>
              <p>
                {status.message}
                {status.kind === "error" && contact.email && (
                  <>
                    {" "}
                    You can email <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                  </>
                )}
              </p>
            </>
          )}
        </div>

        <div className="book-summary__talk">
          <p className="home-kicker">Prefer to talk?</p>
          {contact.whatsapp && (
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
          )}
          <a href={contactPeople[0].href}>{contactPeople[0].phone}</a>
        </div>
      </aside>
    </form>
  );
}
