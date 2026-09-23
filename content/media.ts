import type { ImageProps } from "next/image";
export type MediaAsset = {
  src: ImageProps["src"];
  alt: string;
  objectPosition?: string;
};
export const photos = {
  bedroom: { src: "/media/bedroom.webp", alt: "Warm wood-lined bedroom with a stove and mountain views through two windows", width: 1678, height: 937 },
  exterior: { src: "/media/homestay.webp", alt: "Kibber House surrounded by fields and the mountains of Spiti", width: 1556, height: 1011 },
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
  route: { src: "/media/route-to-kibber.webp", alt: "Illustrated routes from Delhi to Kibber via Manali and Shimla", width: 941, height: 1672 },
} satisfies Record<string, MediaAsset & { width: number; height: number }>;

export const media = {
  home: {
    landscape: { ...photos.mountains, objectPosition: "center 65%" },
    exterior: photos.exterior,
    window: photos.window,
    roomPrimary: photos.bedroom,
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
