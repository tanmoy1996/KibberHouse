import type { ImageProps } from "next/image";
export type MediaAsset = {
  src: ImageProps["src"];
  alt: string;
  objectPosition?: string;
};
export const photos = {
  bedroom: { src: "/media/bedroom.webp", alt: "Warm wood-lined bedroom with a stove and mountain views through two windows", width: 1678, height: 937 },
  bedDetail: { src: "/media/bed-detail.jpg", alt: "A warmly lit Kibber House bed dressed with a red patterned textile", width: 1571, height: 1001 },
  bedLayersPhoto: { src: "/media/bed-layers-photo.jpg", alt: "The layered mattress, electric blanket, quilts and pillows prepared for a cold night", width: 1764, height: 891 },
  exterior: { src: "/media/kibber-house-exterior.webp", alt: "Kibber House surrounded by terraced fields and the mountains of Spiti", width: 2752, height: 1536 },
  commonSpace: { src: "/media/common-space.webp", alt: "Wood-lined common room with prayer flags and a central stove", width: 941, height: 1672 },
  greenhouse: { src: "/media/greenhouse.webp", alt: "Sunlit greenhouse lounge with patterned cushions", width: 941, height: 1672 },
  window: { src: "/media/window.webp", alt: "Mountain and field views through the wooden windows", width: 1448, height: 1086 },
  waitingArea: { src: "/media/waiting-area.webp", alt: "Seating and tea beside the stove", width: 941, height: 1671 },
  corridor: { src: "/media/corridor.webp", alt: "A sunny desk at the end of the wood-lined corridor", width: 941, height: 1670 },
  staircase: { src: "/media/staircase.webp", alt: "Sunlight on the wooden staircase", width: 941, height: 1670 },
  winter: { src: "/media/winter-view.webp", alt: "Kibber House surrounded by fresh snow", width: 1731, height: 909 },
  welcome: { src: "/media/welcome-table.webp", alt: "Dried fruit and a carved wooden bowl on the welcome table", width: 1238, height: 2200 },
  dryFruit: { src: "/media/dry-fruit.webp", alt: "Sunlight on almonds, cashews, pistachios and raisins", width: 1237, height: 2200 },
  mountains: { src: "/media/mountain-light.webp", alt: "Evening light on mountains above the village", width: 1238, height: 2200 },
  villageLife: { src: "/media/village-life.webp", alt: "People walking beneath golden mountain slopes", width: 1238, height: 2200 },
  fields: { src: "/media/village-fields.webp", alt: "Village houses and green fields beneath steep mountains", width: 1238, height: 2200 },
  yak: { src: "/media/yak.webp", alt: "A yak grazing beside a village path", width: 1237, height: 2200 },
  night: { src: "/media/night-view.webp", alt: "Stars above the dark mountain skyline", width: 941, height: 1672 },
  nightVision: { src: "/media/night-vision.jpg", alt: "The Milky Way above dark Himalayan peaks and the warmly lit windows of Kibber House", width: 1091, height: 1441 },
  nightSkyWide: { src: "/media/night-sky-wide.webp", alt: "The Milky Way over snow-capped peaks, with the lit windows of Kibber House below", width: 1672, height: 941 },
  ibex: { src: "/media/ibex.jpg", alt: "A Himalayan ibex standing among sunlit mountain grasses", width: 1060, height: 1484 },
  nutsAndTea: { src: "/media/nuts-and-tea.jpg", alt: "Tea and a bowl of dried fruit and nuts served in warm sunlight", width: 1254, height: 1254 },
  snowLeopard: { src: "/media/generated-wildlife-hero.webp", alt: "Snow leopard resting among pale Himalayan rocks", objectPosition: "12% 40%", width: 1672, height: 941 },
  kibberVillage: { src: "/media/generated-kibber-hero.webp", alt: "Whitewashed houses of Kibber village above barley fields and snow peaks", objectPosition: "72% 60%", width: 1672, height: 941 },
  keyMonastery: { src: "/media/key-monastery.webp", alt: "Key Monastery stacked on its hilltop beneath a deep blue Spiti sky", objectPosition: "50% 42%", width: 1440, height: 2560 },
  roomSunset: { src: "/media/generated-stay-hero.webp", alt: "A spacious wood-beamed bedroom with sunset light through two mountain-facing windows", width: 1672, height: 941 },
  route: { src: "/media/route-to-kibber.webp", alt: "Illustrated routes from Delhi to Kibber via Manali and Shimla", width: 941, height: 1672 },
} satisfies Record<string, MediaAsset & { width: number; height: number }>;

export const media = {
  home: {
    landscape: { ...photos.mountains, objectPosition: "center 65%" },
    exterior: photos.exterior,
    window: photos.window,
    bedLayers: null,
    roomWide: photos.bedroom,
    mountainView: photos.fields,
  },
};
// Only the opening image is eligible for preload; all later images remain lazy.
export const mediaLoading = {
  opening: { priority: true, sizes: "100vw" },
  subsequent: { priority: false, sizes: "100vw" },
} as const;

export const pageHeroes = {
  stay: {
    src: "/media/generated-stay-hero.webp",
    alt: "Warm wood-lined bedroom at Kibber House overlooking the mountains",
  },
  house: {
    src: "/media/generated-house-hero.webp",
    alt: "Kibber House among fields and mountains in Spiti Valley",
  },
} satisfies Record<string, MediaAsset>;
