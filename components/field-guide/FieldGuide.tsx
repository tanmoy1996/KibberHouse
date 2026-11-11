"use client";

import Image from "next/image";
import { useDeferredValue, useMemo, useState } from "react";
import {
  guideCategories,
  guideEntries,
  guideMonthLabels,
  guideSectionTitles,
  type GuideCategory,
  type GuideEntry,
} from "@/content/field-guide";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CATEGORIES = Object.keys(guideCategories) as GuideCategory[];

const normalise = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

// Everything a visitor might type: names, local names, Latin, where and the note.
const searchText = new Map(
  guideEntries.map((entry) => [
    entry.id,
    normalise(
      [entry.name, ...(entry.otherNames ?? []), entry.latin ?? "", entry.where, entry.note, guideCategories[entry.category]].join(" "),
    ),
  ]),
);


/** "Jan–Mar, Nov–Dec" style summary of a month list, for screen readers. */
function describeMonths(months: number[]) {
  if (months.length === 12) return "all year";
  const sorted = [...months].sort((a, b) => a - b);
  const runs: [number, number][] = [];
  for (const month of sorted) {
    const last = runs[runs.length - 1];
    if (last && month === last[1] + 1) last[1] = month;
    else runs.push([month, month]);
  }
  // Join a run ending in December to one starting in January (e.g. Nov–Mar).
  if (runs.length > 1 && runs[0][0] === 1 && runs[runs.length - 1][1] === 12) {
    runs[0][0] = runs.pop()![0];
  }
  return runs
    .map(([from, to]) => (from === to ? MONTHS[from - 1] : `${MONTHS[from - 1]}–${MONTHS[to - 1]}`))
    .join(", ");
}

export function FieldGuide() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const filtered = Boolean(deferredQuery.trim());

  const results = useMemo(() => {
    const terms = normalise(deferredQuery).split(/\s+/).filter(Boolean);
    return guideEntries.filter(
      (entry) => terms.every((term) => searchText.get(entry.id)!.includes(term)),
    );
  }, [deferredQuery]);

  const clear = () => setQuery("");

  return (
    <div className="guide">
      <div className="guide__controls" data-reveal="fade">
        <label className="guide__search">
          <span className="sr-only">Search the field guide</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="10.5" cy="10.5" r="6" />
            <path d="m15 15 5.5 5.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search: ibex, blue sheep, Chandratal, fossils…"
            autoComplete="off"
            enterKeyHint="search"
          />
          {query && (
            <button
              type="button"
              className="guide__search-clear"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M7 7l10 10M17 7 7 17" />
              </svg>
            </button>
          )}
        </label>

        {/* Announces search results to screen readers only. */}
        <p className="sr-only" role="status">
          {filtered ? `${results.length} ${results.length === 1 ? "result" : "results"}` : ""}
        </p>
      </div>

      {/* One section per category, like the gallery; a section with no matches is hidden. */}
      {CATEGORIES.map((category, i) => {
        const entries = results.filter((entry) => entry.category === category);
        const total = guideEntries.filter((entry) => entry.category === category).length;
        if (!entries.length) return null;
        return (
          <section
            key={category}
            id={category}
            className="gallery-section"
            data-tone="light"
            aria-labelledby={`${category}-title`}
          >
            <header className="gallery-section__head">
              <div>
                <p className="home-kicker">
                  {String(i + 1).padStart(2, "0")} · {guideCategories[category]}
                </p>
                <h2 id={`${category}-title`}>{guideSectionTitles[category]}</h2>
              </div>
              <p className="gallery-section__count">
                {filtered ? `${entries.length} of ${total}` : `${total} entries`}
              </p>
            </header>
            <ul className="guide__grid">
              {entries.map((entry) => (
                <GuideCard key={entry.id} entry={entry} />
              ))}
            </ul>
          </section>
        );
      })}

      {!results.length && (
        <div className="guide__empty">
          <p>Nothing matches that. Try another word.</p>
          <button type="button" className="home-line-link" onClick={clear}>
            clear search
          </button>
        </div>
      )}
    </div>
  );
}

function GuideCard({ entry }: { entry: GuideEntry }) {
  const { photo } = entry;
  const labels = guideMonthLabels[entry.category];
  return (
    <li className="guide-card">
      <figure className="guide-card__media">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 1200px) 24rem, (min-width: 640px) 45vw, 92vw"
        />
        {photo.credit && (
          <figcaption>
            Photo:{" "}
            {photo.credit.source ? (
              <a href={photo.credit.source} target="_blank" rel="noopener noreferrer">
                {photo.credit.author}
              </a>
            ) : (
              photo.credit.author
            )}
            {photo.credit.license && ` · ${photo.credit.license}`}
          </figcaption>
        )}
      </figure>
      <div className="guide-card__body">
        <h3>{entry.name}</h3>
        {(entry.latin || entry.otherNames) && (
          <p className="guide-card__names">
            {entry.latin && <i>{entry.latin}</i>}
            {entry.latin && entry.otherNames && " · "}
            {entry.otherNames?.join(", ")}
          </p>
        )}
        <p className="guide-card__note">{entry.note}</p>
        <p className="guide-card__where">
          <span>Where</span> {entry.where}
        </p>
        {labels && (
          <div className="guide-card__months">
            <ol aria-hidden="true">
              {MONTHS.map((label, i) => {
                const month = i + 1;
                const seen = entry.months.includes(month);
                const best = entry.best?.includes(month);
                return (
                  <li
                    key={label}
                    data-seen={seen || undefined}
                    data-best={best || undefined}
                    title={`${label}: ${best ? labels.best.toLowerCase() : seen ? labels.seen.toLowerCase() : "not seen"}`}
                  >
                    {label[0]}
                  </li>
                );
              })}
            </ol>
            <p className="sr-only">
              {labels.seen} {describeMonths(entry.months)}
              {entry.best ? `; ${labels.best.toLowerCase()} ${describeMonths(entry.best)}` : ""}.
            </p>
            <p className="guide-card__key" aria-hidden="true">
              <span data-seen>{labels.seen}</span>
              {entry.best && <span data-best>{labels.best}</span>}
            </p>
          </div>
        )}
      </div>
    </li>
  );
}
