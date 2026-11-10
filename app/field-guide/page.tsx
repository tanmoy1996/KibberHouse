import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { EntryReady } from "@/components/loading/EntryExperience";
import { HomeMotion } from "@/components/home/HomeMotion";
import { FieldGuide } from "@/components/field-guide/FieldGuide";
import { house } from "@/content/house";
import { guideCategories, type GuideCategory } from "@/content/field-guide";

export const metadata = pageMetadata({
  title: "Field guide to Spiti",
  description:
    "The wildlife, birds, wild plants, crops, rocks and fossils around Kibber in Spiti Valley, and the months to see them: snow leopard, ibex, bharal, lammergeier, seabuckthorn, barley and ammonite fossils.",
  path: "/field-guide",
});

export default function Page() {
  return (
    <div className="home gallery-page field-guide-page">
      <EntryReady />
      <HomeMotion />

      <section className="home-meta" data-tone="light" aria-labelledby="field-guide-title">
        <div data-reveal="fade">
          <p className="home-kicker">Field guide</p>
          <h1 id="field-guide-title">What lives around Kibber</h1>
          <p>
            Snow leopards and ibex, lammergeiers overhead, blue poppies in the scree,
            barley on the terraces and fossils from an ancient sea, all within reach of
            the house at {house.altitude}, with the months to look for each.
          </p>
        </div>
        <nav className="gallery-nav" aria-label="Field guide sections" data-reveal="fade">
          {(Object.keys(guideCategories) as GuideCategory[]).map((category) => (
            <a key={category} href={`#${category}`}>
              {guideCategories[category]}
            </a>
          ))}
        </nav>
      </section>

      <FieldGuide />

      <section className="gallery-cta" data-tone="light" aria-labelledby="field-guide-cta-title">
        <div data-reveal="fade">
          <h2 id="field-guide-cta-title" className="gallery-cta__title">
            Come and look for yourself
          </h2>
          <p>
            We know where the ibex graze and which ridges the snow leopard walks. Sightings
            are never guaranteed, but we will help you make the most of your days.
          </p>
          <Link className="home-line-link" href="/experiences">
            see our experiences
          </Link>
        </div>
      </section>
    </div>
  );
}
