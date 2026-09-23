import { EntryReady } from "@/components/loading/EntryExperience";
import Link from "next/link";
import { Section } from "./section";
export function PlaceholderPage({ title }: { title: string }) {
  return (
    <Section className="placeholder-page" aria-labelledby="page-title">
      <EntryReady />
      <p className="eyebrow">Kibber House</p>
      <h1 id="page-title" className="intro-heading">
        {title}
      </h1>
      <p className="mt-6 text-muted">This page is being prepared.</p>
      <p className="mt-6">
        <Link href="/" className="underline">
          Return to Kibber House
        </Link>
      </p>
    </Section>
  );
}
