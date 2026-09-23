import type { Metadata } from "next";
import {
  EditorialPage,
  EditorialBlock,
} from "@/components/layout/EditorialPage";
import { activities } from "@/content/activities";
import { seasons } from "@/content/seasons";
import { pageHeroes } from "@/content/media";
export const metadata: Metadata = {
  title: "Things to do",
  description:
    "Seasonal wildlife, birding, trekking, village walks, stargazing and summer camping from Kibber House.",
};
export default function Page() {
  return (
    <EditorialPage
      eyebrow="Things to do"
      title="Walk from the door."
      introduction={`${seasons.activityNote} Availability depends on season and conditions.`}
      hero={pageHeroes.wildlife}
    >
      <EditorialBlock label="Activities" title="Outside the house.">
        <div className="activity-list">
          {activities.map((item) => (
            <article key={item.id}>
              <p className="type-label">
                {"season" in item ? item.season : "Seasonal"}
              </p>
              <h2>{item.name}</h2>
              {"subjects" in item && <p>{item.subjects.join(" · ")}</p>}
            </article>
          ))}
        </div>
      </EditorialBlock>
    </EditorialPage>
  );
}
