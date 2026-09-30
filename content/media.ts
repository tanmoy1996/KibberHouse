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
  exteriorSnow: { src: "/media/kibber-house-snow-aerial.webp", alt: "Aerial view of Kibber House after fresh snow, with terraced fields and snow-capped peaks behind", objectPosition: "58% 62%", width: 2400, height: 1350 },
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
  nightSkyWide: { src: "/media/night-sky-wide.webp", alt: "The Milky Way over snow-capped peaks, with the lit windows of Kibber House below", width: 1672, height: 941 },
  nutsAndTea: { src: "/media/nuts-and-tea.jpg", alt: "Tea and a bowl of dried fruit and nuts served in warm sunlight", width: 1254, height: 1254 },
  snowLeopard: { src: "/media/generated-wildlife-hero.webp", alt: "Snow leopard resting among pale Himalayan rocks", objectPosition: "12% 40%", width: 1672, height: 941 },
  kibberVillage: { src: "/media/generated-kibber-hero.webp", alt: "Whitewashed houses of Kibber village above barley fields and snow peaks", objectPosition: "72% 60%", width: 1672, height: 941 },
  keyMonastery: { src: "/media/key-monastery.webp", alt: "Key Monastery stacked on its hilltop beneath a deep blue Spiti sky", objectPosition: "50% 42%", width: 1440, height: 2560 },
  superDeluxe: { src: "/media/super-deluxe-suite.webp", alt: "The Super Deluxe suite: a wood-beamed bedroom with a red woven rug, two sitting chairs and corner windows onto the mountains", width: 1448, height: 1086 },
  roomSunset: { src: "/media/generated-stay-hero.webp", alt: "A spacious wood-beamed bedroom with sunset light through two mountain-facing windows", width: 1672, height: 941 },
  route: { src: "/media/route-to-kibber.webp", alt: "Illustrated routes from Delhi to Kibber via Manali and Shimla", width: 941, height: 1672 },
} satisfies Record<string, MediaAsset & { width: number; height: number }>;

export const media = {
  home: {
    landscape: { ...photos.mountains, objectPosition: "center 65%" },
    exterior: photos.exteriorSnow,
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
} satisfies Record<string, MediaAsset>;

// Our own wildlife photographs from the high slopes of Spiti, resized to WebP.
const w = (name: string, alt: string, height = 1350) => ({ src: `/media/wildlife/${name}.webp`, alt, width: 1800, height });
export const wildlife = {
  leopardCub: w("leopard-cub", "A snow leopard cub watches from a snowy ridge while its mother rests in the foreground"),
  leopardRockWall: w("leopard-rock-wall", "A snow leopard picking its way down a sandstone rock face", 1200),
  leopardSnowDescent: w("leopard-snow-descent", "A snow leopard walking down a fresh snow slope between rocky outcrops", 1200),
  leopardSnowClose: w("leopard-snow-close", "A snow leopard crouched in the snow, its thick tail curled behind it"),
  leopardFamilyCliff: w("leopard-family-cliff", "Three snow leopards together on a narrow cliff ledge"),
  leopardYawnCub: w("leopard-yawn-cub", "A snow leopard yawning on a rock ledge as its cub clambers over it", 1200),
  leopardScree: w("leopard-scree", "A snow leopard lying on a bare patch of scree between snowfields"),
  leopardsLedge: w("leopards-ledge", "Two snow leopards on a sunlit ledge beneath layered cliffs"),
  leopardsCave: w("leopards-cave", "Two snow leopards resting in the shade of a long rock overhang"),
  leopardCliffCurled: w("leopard-cliff-curled", "A snow leopard curled against a cliff, almost invisible against the rock"),
  leopardLedgeWalk: w("leopard-ledge-walk", "A snow leopard walking along a rocky ledge below a snowfield"),
  leopardSnowShadow: w("leopard-snow-shadow", "A snow leopard crossing a snowy slope, its long shadow stretched beside it"),
  leopardSlope: w("leopard-slope", "A snow leopard pausing on a gravel slope to look up"),
  ibexSnowfall: w("ibex-snowfall", "A Himalayan ibex facing the camera in falling snow"),
  ibexMist: w("ibex-mist", "A Himalayan ibex with sweeping horns on a misty mountainside"),
  ibexHerd: w("ibex-herd", "A herd of Himalayan ibex resting on a scree slope"),
  ibexGrazingSnow: w("ibex-grazing-snow", "Three ibex browsing shrubs on a snowy slope"),
  ibexRestingSnow: w("ibex-resting-snow", "A male ibex with heavy ridged horns resting on snow and scree"),
  ibexPortrait: w("ibex-portrait", "Close portrait of a dark-coated ibex with a long beard"),
  bharalRidge: w("bharal-ridge", "A bharal, or blue sheep, standing on a rocky ridge against a deep blue sky"),
  bharalPair: w("bharal-pair", "Two young bharal looking down from a hillside", 1200),
  bharalBacklit: w("bharal-backlit", "A bharal with curved horns peering over a rock, backlit by the sky"),
  foxDen: w("fox-den", "A red fox peering out of a snow-covered rock den"),
  foxSnowSitting: w("fox-snow-sitting", "A red fox sitting in deep snow, looking straight at the camera"),
  foxSnowStanding: w("fox-snow-standing", "A red fox standing on a snowdrift between boulders"),
  foxByRock: w("fox-by-rock", "A red fox sitting in the snow beside a large boulder"),
  lammergeierGrass: w("lammergeier-grass", "A lammergeier, or bearded vulture, standing on a grassy rocky slope"),
  lammergeierScree: w("lammergeier-scree", "A lammergeier gliding low over a pale scree slope"),
  lammergeierSnowRocks: w("lammergeier-snow-rocks", "A lammergeier flying over snow and dark rocks"),
  lammergeierOverSnow: w("lammergeier-over-snow", "A lammergeier banking over a snowfield, seen from above"),
  lammergeierPerched: w("lammergeier-perched", "A lammergeier perched on a steep rock slab"),
  lammergeierBlueSky: w("lammergeier-blue-sky", "A lammergeier soaring overhead in a clear blue sky"),
  lammergeierJuvenile: w("lammergeier-juvenile", "A young lammergeier soaring beneath white clouds"),
  goldenEagleNest: w("golden-eagle-nest", "A golden eagle on its large stick nest on a cliff ledge"),
} satisfies Record<string, MediaAsset & { width: number; height: number }>;
