"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/contact";

// Composes the enquiry as a WhatsApp message to the house; nothing is stored on the site.
export function ContactForm() {
  const [error, setError] = useState("");

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    if (!field("name") || !field("message")) {
      setError("Please add your name and a message.");
      return;
    }
    setError("");
    const lines = [`Hi Kibber House, I'm ${field("name")}.`];
    if (field("dates")) lines.push(`Dates: ${field("dates")}`);
    if (field("guests")) lines.push(`Guests: ${field("guests")}`);
    lines.push("", field("message"));
    const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-form" onSubmit={send} noValidate>
      <label>
        <span>Name</span>
        <input name="name" autoComplete="name" required />
      </label>
      <div className="contact-form__row">
        <label>
          <span>Travel dates</span>
          <input name="dates" placeholder="e.g. 12–16 June" />
        </label>
        <label>
          <span>Guests</span>
          <input name="guests" inputMode="numeric" placeholder="2 adults" />
        </label>
      </div>
      <label>
        <span>Message</span>
        <textarea name="message" rows={5} required placeholder="Rooms, routes, permits, acclimatisation…" />
      </label>
      {error && (
        <p className="contact-form__error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="contact-form__submit">
        Send on WhatsApp
      </button>
      <p className="contact-form__note">
        Opens WhatsApp with your message ready to send. Nothing is stored on this site.
      </p>
    </form>
  );
}
