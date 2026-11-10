import type { PlaceTag } from "@/content/route-map";

// 24×24 line icons, drawn with the current text colour. The same paths serve the
// React lists and the HTML strings Leaflet uses for popups.
export const TAG_ICON_PATHS: Record<PlaceTag, string> = {
  // A bed
  stay: "M3 6v13M3 15h18M21 19v-6a3 3 0 0 0-3-3h-7v5M7 12.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5z",
  // Mountains
  hiking: "M2.5 20 9 8.5l4 7 2.5-4L21.5 20zM9 8.5 10.5 11",
  // A chorten (stupa)
  spiritual: "M12 2.5v2.5M10.5 5h3l1 3h-5zM8 8h8c0 3.4-1.7 5.5-4 5.5S8 11.4 8 8zM6.5 13.5h11v3h-11zM5 16.5h14V20H5z",
  // A camera
  photogenic:
    "M4 7.5h3.2L9 5h6l1.8 2.5H20a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z",
};

const SVG_ATTRS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function TagIcon({ tag, className }: { tag: PlaceTag; className?: string }) {
  return (
    <svg {...SVG_ATTRS} className={className} aria-hidden="true" focusable="false">
      <path d={TAG_ICON_PATHS[tag]} />
    </svg>
  );
}

export const tagIconHtml = (tag: PlaceTag) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${TAG_ICON_PATHS[tag]}"/></svg>`;
