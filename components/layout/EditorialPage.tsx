import type { ReactNode } from "react";
import Image from "next/image";
import { EntryReady } from "@/components/loading/EntryExperience";
import { Section } from "./section";
import type { MediaAsset } from "@/content/media";

export function EditorialPage({
  eyebrow,
  title,
  introduction,
  hero,
  compact = false,
  children,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  hero?: MediaAsset;
  /** Without a hero image: a short title band instead of the tall one. */
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <EntryReady />
      {hero ? (
        <section
          data-tone="dark"
          className="page-hero page-hero--image"
          aria-labelledby="page-title"
          data-header-overlay
        >
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            className="page-hero__image"
          />
          <div className="page-hero__shade" aria-hidden="true" />
          <div className="section__content section__content--normal page-hero__copy">
            <p className="eyebrow">{eyebrow}</p>
            <h1 id="page-title">{title}</h1>
            <p className="page-introduction">{introduction}</p>
          </div>
        </section>
      ) : (
        <Section
          tone="light"
          className={compact ? "page-hero page-hero--compact" : "page-hero"}
          aria-labelledby="page-title"
        >
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="page-title">{title}</h1>
          <p className="page-introduction">{introduction}</p>
        </Section>
      )}
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
      id={slug(label)}
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
