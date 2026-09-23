"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/contact";

type Status = {
  kind: "idle" | "submitting" | "success" | "error";
  message?: string;
};

export function BookingEnquiryForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
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
      setStatus({
        kind: "success",
        message:
          "Your enquiry has been sent. Your stay is confirmed only after Kibber House confirms availability.",
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
  return (
    <form
      className="booking-form"
      onSubmit={submit}
      noValidate={false}
      aria-describedby="booking-note"
    >
      <div className="form-grid">
        <label>
          Check-in
          <input name="checkIn" type="date" required />
        </label>
        <label>
          Check-out
          <input name="checkOut" type="date" required />
        </label>
        <label>
          Adults
          <input
            name="adults"
            type="number"
            min="1"
            max="12"
            defaultValue="2"
            required
          />
        </label>
        <label>
          Children
          <input
            name="children"
            type="number"
            min="0"
            max="12"
            defaultValue="0"
            required
          />
        </label>
        <label>
          Room preference
          <select name="roomPreference" defaultValue="Any">
            <option>Any</option>
            <option>Deluxe</option>
            <option>Super Deluxe</option>
          </select>
        </label>
        <label>
          Meal preference
          <select name="mealPreference" defaultValue="Breakfast">
            <option>Room + tea</option>
            <option>Breakfast</option>
            <option>Breakfast + dinner</option>
            <option>All meals</option>
          </select>
        </label>
        <label>
          Name
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          Phone
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={30}
          />
        </label>
        <label className="form-wide">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
          />
        </label>
        <label className="form-wide">
          Special requests
          <textarea name="requests" rows={5} maxLength={1500} />
        </label>
      </div>
      <p id="booking-note" className="text-small text-muted">
        This is an enquiry. Availability is confirmed separately by Kibber
        House.
      </p>
      <button
        className="button button--primary"
        disabled={status.kind === "submitting"}
      >
        {status.kind === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
      <div
        className="form-status"
        role="status"
        aria-live="polite"
        data-status={status.kind}
      >
        {status.message}
        {status.kind === "error" && contact.email && (
          <>
            {" "}
            You can email{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>.
          </>
        )}
      </div>
    </form>
  );
}
