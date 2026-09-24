import type { ReactNode } from "react";
import { EntryReady } from "@/components/loading/EntryExperience";

// Text pages (privacy, terms) in the home page language: centred intro, then a reading column.
export function LegalPage({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <div className="home legal-page">
      <EntryReady />
      <section className="home-meta" data-tone="light" aria-labelledby="legal-title">
        <div>
          <p className="home-kicker">{kicker}</p>
          <h1 id="legal-title">{title}</h1>
          <p className="home-meta__lead">{lead}</p>
        </div>
      </section>
      <section className="legal-body" data-tone="light" aria-label={title}>
        <div className="legal-body__inner">{children}</div>
      </section>
    </div>
  );
}
