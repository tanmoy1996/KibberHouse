import Link from "next/link";
import { EntryReady } from "@/components/loading/EntryExperience";

export default function NotFound() {
  return (
    <div className="home">
      <EntryReady />
      <section className="gallery-cta not-found" data-tone="light" aria-labelledby="not-found-title">
        <p className="home-kicker">Page not found</p>
        <h1 id="not-found-title" className="gallery-cta__title">
          Lost in the mountains
        </h1>
        <p>This path doesn&apos;t lead anywhere. Let&apos;s get you back to the house.</p>
        <Link className="home-line-link" href="/">
          back to home
        </Link>
      </section>
    </div>
  );
}
