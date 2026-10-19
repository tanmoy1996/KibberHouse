"use client";

import { useId, useRef, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";

function dateFromIso(value: string) {
  return value ? new Date(`${value}T00:00:00`) : undefined;
}
function isoFromDate(value?: Date) {
  if (!value) return "";
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
}
const format = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function StayDatePicker({ checkIn, checkOut, onChange }: {
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
}) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const [today] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const from = dateFromIso(checkIn);
  const to = dateFromIso(checkOut);
  const complete = !!from && !!to && to > from;
  const nights = complete ? Math.round((Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) - Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())) / 86400000) : 0;
  function select(range: DateRange | undefined, day: Date) {
    // A completed range starts fresh with the next click.
    if (complete) onChange(isoFromDate(day), "");
    else onChange(isoFromDate(range?.from), isoFromDate(range?.to));
  }

  return (
    <div className="stay-dates">
      <button type="button" className="stay-dates__trigger" aria-haspopup="dialog" aria-controls={id} onClick={() => dialog.current?.showModal()}>
        <span><small>Check-in</small><strong>{from ? format.format(from) : "Choose date"}</strong></span>
        <span className="stay-dates__arrow" aria-hidden="true">→</span>
        <span><small>Check-out</small><strong>{to ? format.format(to) : "Choose date"}</strong></span>
      </button>
      <input type="hidden" name="checkIn" value={checkIn} />
      <input type="hidden" name="checkOut" value={checkOut} />
      <dialog ref={dialog} id={id} className="stay-dates__dialog" aria-labelledby={`${id}-title`} onClick={event => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.current?.close();
        }
      }}>
        <div className="stay-dates__heading">
          <h2 id={`${id}-title`}>Choose your stay</h2>
          <button type="button" aria-label="Close calendar" onClick={() => dialog.current?.close()}>×</button>
        </div>
        <p className="stay-dates__hint" aria-live="polite">{complete ? `${nights} ${nights === 1 ? "night" : "nights"} · ${format.format(from)} – ${format.format(to)}` : from ? "Now choose your check-out date." : "Choose your check-in date, then check-out."}</p>
        <DayPicker
          mode="range"
          selected={from ? { from, to } : undefined}
          onSelect={select}
          min={1}
          disabled={{ before: today }}
          startMonth={today}
          endMonth={new Date(today.getFullYear() + 5, 11, 31)}
          defaultMonth={from && from >= today ? from : today}
          captionLayout="dropdown"
          navLayout="around"
          fixedWeeks
          excludeDisabled
          showOutsideDays
          autoFocus
        />
        <div className="stay-dates__actions">
          <button type="button" onClick={() => onChange("", "")}>Clear dates</button>
          <button type="button" disabled={!complete} onClick={() => dialog.current?.close()}>Use these dates</button>
        </div>
      </dialog>
    </div>
  );
}
