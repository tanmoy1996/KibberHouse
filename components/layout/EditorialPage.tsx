import type { ReactNode } from "react";
import { EntryReady } from "@/components/loading/EntryExperience";
import { Section } from "./section";

export function EditorialPage({
  eyebrow,
  title,
  introduction,
  children,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  children: ReactNode;
}) {
  return (
    <>
      <EntryReady />
      <Section tone="light" className="page-hero" aria-labelledby="page-title">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-title">{title}</h1>
        <p className="page-introduction">{introduction}</p>
      </Section>
      {children}
    </>
  );
}

export function EditorialBlock({
  label,
  title,
  children,
  tone = "light",
}: {
  label: string;
  title: string;
  children: ReactNode;
  tone?: "light" | "snow" | "barley" | "cold" | "dark";
}) {
  return (
    <Section
      tone={tone}
      className="editorial-block"
      aria-labelledby={`${slug(label)}-title`}
    >
      <div className="editorial-grid">
        <p className="eyebrow">{label}</p>
        <div className="stack">
          <h2 id={`${slug(label)}-title`}>{title}</h2>
          {children}
        </div>
      </div>
    </Section>
  );
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
