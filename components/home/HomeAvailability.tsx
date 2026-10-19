"use client";

import { enquiryWhatsAppUrl } from "@/lib/booking/whatsapp";
import { StayDatePicker } from "@/components/booking/StayDatePicker";
import { useState, type FormEvent } from "react";

type AvailabilityState = {
  kind: "idle" | "loading" | "saved" | "error";
  message?: string;
  whatsappUrl?: string;
};

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
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
            {/* <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4" /> */}
            <path d="M6.5 10h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
        <output aria-live="polite">{value}</output>
        <button
          type="button"
          aria-label={`More ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
            {/* <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4" /> */}
            <path d="M6.5 10h7M10 6.5v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
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

  async function sendEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.kind === "loading" || state.kind === "saved") return;
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setState({ kind: "error", message: "Choose a valid stay." });
      return;
    }

    // Reserve the tab during the click so browsers do not block it after saving.
    const whatsappTab = window.open("about:blank", "_blank");
    if (whatsappTab) whatsappTab.opener = null;
    setState({ kind: "loading" });
    try {
      const details = { checkIn, checkOut, adults: String(adults), children: String(children) };
      const response = await fetch("/api/stay-enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(details),
      });
      const data = await response.json();
      if (!response.ok || !data.bookingId) throw new Error(data.message || "Your enquiry could not be saved.");
      const whatsappUrl = enquiryWhatsAppUrl(details, data.bookingId);
      setState({ kind: "saved", message: "Enquiry saved. Continue on WhatsApp to send your message.", whatsappUrl });
      if (whatsappTab) whatsappTab.location.replace(whatsappUrl);
    } catch (error) {
      whatsappTab?.close();
      setState({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your enquiry could not be saved. Please try again.",
      });
    }
  }


  return (
    <div className="home-availability">
      <form onSubmit={sendEnquiry} className="home-availability__form">
        <div className="home-availability__item home-availability__item--dates">
          <StayDatePicker checkIn={checkIn} checkOut={checkOut} onChange={(start, end) => {
            setCheckIn(start);
            setCheckOut(end);
            setState({ kind: "idle" });
          }} />
        </div>
        <Counter label="Adults" value={adults} min={1} max={8} onChange={value => { setAdults(value); setState({ kind: "idle" }); }} />
        <Counter label="Children" value={children} min={0} max={6} onChange={value => { setChildren(value); setState({ kind: "idle" }); }} />
        <button
          type="submit"
          className="home-availability__submit"
          disabled={state.kind === "loading" || state.kind === "saved"}
        >
          {state.kind === "loading" ? "Saving…" : state.kind === "saved" ? "Enquiry saved" : "Enquire on WhatsApp"}
        </button>
        <div className="home-availability__result" aria-live="polite">
        </div>
      </form>
    </div>
  );
}
