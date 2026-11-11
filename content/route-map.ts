// The Spiti circuit from Chandigarh: up through Kinnaur (NH5, then NH505), and back
// over Kunzum Pass and through the Atal Tunnel to Manali, then down the Beas valley.
// Road geometry was traced once from OpenStreetMap data via the OSRM router and
// simplified; distances are cumulative road kilometres along each leg, rounded.
// Altitudes are commonly cited figures. Confirm conditions each season.
import outboundLine from "./route-chandigarh-kibber.json";
import returnLine from "./route-kibber-chandigarh.json";
import detourLines from "./route-detours.json";

// What a place is good for, shown as icons on the map and in the timelines.
export const placeTags = {
  stay: "Stay overnight",
  hiking: "Hiking",
  spiritual: "Spiritual",
  photogenic: "Photogenic",
} as const;
export type PlaceTag = keyof typeof placeTags;

export type RouteStop = {
  name: string;
  lat: number;
  lng: number;
  km: number;
  altitude: string;
  note: string;
  /** Larger marker and label: the ends, overnight halts and passes. */
  major?: boolean;
  tags?: PlaceTag[];
  /** Which side of the marker its name sits on the map, to keep labels apart. */
  label?: "left" | "right" | "top" | "bottom";
};

export type RouteLeg = {
  id: "kinnaur" | "manali";
  label: string;
  title: string;
  /** Where `km` is measured from. */
  from: string;
  season: string;
  line: [number, number][];
  stops: RouteStop[];
};

const chandigarh = { name: "Chandigarh", tags: ["stay"] as PlaceTag[], label: "left" as const, lat: 30.7333, lng: 76.7794, altitude: "350 m" };
const kibber = { name: "Kibber", tags: ["stay", "hiking", "photogenic"] as PlaceTag[], label: "right" as const, lat: 32.3343, lng: 78.0096, altitude: "4,270 m" };
const kaza = { name: "Kaza", tags: ["stay", "spiritual"] as PlaceTag[], label: "right" as const, lat: 32.226, lng: 78.0721, altitude: "3,800 m" };

export const routeLegs: RouteLeg[] = [
  {
    id: "kinnaur",
    label: "Via Shimla",
    title: "Via Shimla",
    from: "Chandigarh",
    season: "Open most of the year",
    line: outboundLine as [number, number][],
    stops: [
      {
        ...chandigarh,
        km: 0,
        note: "Start of the climb. Airport and railhead with connections from Delhi.",
        major: true,
      },
      {
        name: "Shimla",
        tags: ["stay", "hiking", "photogenic"],
        label: "left",
        lat: 31.1049,
        lng: 77.1734,
        km: 120,
        altitude: "2,276 m",
        note: "The old hill capital. A comfortable first night before the long road.",
        major: true,
      },
      {
        name: "Narkanda",
        tags: ["stay", "hiking", "photogenic"],
        label: "left",
        lat: 31.2598,
        lng: 77.4585,
        km: 185,
        altitude: "2,708 m",
        note: "Apple orchards and deodar forest, with the Hatu Peak road above town.",
      },
      {
        name: "Rampur Bushahr",
        tags: ["stay"],
        label: "right",
        lat: 31.4502,
        lng: 77.6298,
        km: 240,
        altitude: "1,005 m",
        note: "Down to the Sutlej. The old Bushahr capital and its Padam Palace.",
      },
      {
        name: "Reckong Peo",
        tags: ["stay", "photogenic"],
        label: "right",
        lat: 31.5374,
        lng: 78.2694,
        km: 340,
        altitude: "2,290 m",
        note: "Kinnaur's headquarters, beneath the Kinner Kailash range. Kalpa is just above.",
        major: true,
      },
      {
        name: "Nako",
        tags: ["stay", "spiritual", "photogenic"],
        label: "right",
        lat: 31.8811,
        lng: 78.6263,
        km: 440,
        altitude: "3,662 m",
        note: "A stone village around a small lake, past the Spiti–Sutlej confluence at Khab.",
      },
      {
        name: "Tabo",
        tags: ["stay", "spiritual"],
        label: "bottom",
        lat: 32.0935,
        lng: 78.3829,
        km: 505,
        altitude: "3,280 m",
        note: "Into Spiti. Tabo Monastery has stood here since 996 AD.",
      },
      {
        ...kaza,
        km: 550,
        note: "Spiti's main town: fuel, cash and the taxi stand for the last climb.",
        major: true,
      },
      {
        ...kibber,
        km: 570,
        note: "Home. Kibber House, high above the Spiti river.",
        major: true,
      },
    ],
  },
  {
    id: "manali",
    label: "Via Manali",
    title: "Via Manali",
    from: "Kibber",
    season: "Kunzum Pass is usually open June to October",
    line: returnLine as [number, number][],
    stops: [
      {
        ...kibber,
        km: 0,
        note: "Leave early: the Kunzum road is slow and the rivers rise through the day.",
        major: true,
      },
      {
        ...kaza,
        km: 19,
        note: "The last fuel and cash machine before Manali. Fill up here.",
        major: true,
      },
      {
        name: "Losar",
        tags: ["stay"],
        label: "right",
        lat: 32.4372,
        lng: 77.7539,
        km: 79,
        altitude: "4,085 m",
        note: "The last village in Spiti, at the foot of the climb to Kunzum.",
      },
      {
        name: "Kunzum Pass",
        tags: ["spiritual", "hiking", "photogenic"],
        label: "right",
        lat: 32.3972,
        lng: 77.6364,
        km: 96,
        altitude: "4,551 m",
        note: "Prayer flags and the Kunzum Devi temple on the pass between Spiti and Lahaul.",
        major: true,
      },
      {
        name: "Batal",
        tags: ["stay", "hiking"],
        label: "left",
        lat: 32.3635,
        lng: 77.6193,
        km: 107,
        altitude: "3,960 m",
        note: "A dhaba on the Chandra river, and the turn for Chandra Taal lake.",
      },
      {
        name: "Chhatru",
        tags: ["stay"],
        label: "bottom",
        lat: 32.3131,
        lng: 77.3845,
        km: 138,
        altitude: "3,360 m",
        note: "Rough road and stream crossings along the Chandra. Tea at the dhabas.",
      },
      {
        name: "Gramphu",
        label: "top",
        lat: 32.3955,
        lng: 77.2552,
        km: 157,
        altitude: "3,200 m",
        note: "The Spiti road meets the Manali–Leh highway.",
      },
      {
        name: "Atal Tunnel",
        label: "left",
        lat: 32.4004,
        lng: 77.1479,
        km: 195,
        altitude: "3,000 m",
        note: "Nine kilometres under the Rohtang ridge, the quickest way to Manali.",
        major: true,
      },
      {
        name: "Manali",
        tags: ["stay", "hiking", "spiritual", "photogenic"],
        label: "left",
        lat: 32.2396,
        lng: 77.1887,
        km: 224,
        altitude: "2,050 m",
        note: "Back among the pines. A good place to break the journey for the night.",
        major: true,
      },
      {
        name: "Kullu",
        tags: ["stay", "spiritual"],
        label: "right",
        lat: 31.9579,
        lng: 77.1092,
        km: 263,
        altitude: "1,220 m",
        note: "Down the Beas valley past orchards and river rafting camps.",
      },
      {
        name: "Mandi",
        tags: ["stay", "spiritual"],
        label: "right",
        lat: 31.7087,
        lng: 76.9318,
        km: 328,
        altitude: "800 m",
        note: "An old temple town on the Beas.",
      },
      {
        name: "Bilaspur",
        tags: ["photogenic"],
        label: "right",
        lat: 31.339,
        lng: 76.7606,
        km: 387,
        altitude: "670 m",
        note: "Beside the Gobind Sagar reservoir on the Sutlej.",
      },
      {
        ...chandigarh,
        km: 487,
        note: "The circuit closes where it began.",
        major: true,
      },
    ],
  },
];

export const circuitKm = routeLegs.reduce((total, leg) => total + leg.stops[leg.stops.length - 1].km, 0);

// Places worth a detour off the circuit. `km` is the road distance from `from`;
// `line` is only the side road, where it leaves the main route.
export type Detour = Omit<RouteStop, "major"> & {
  from: string;
  /** The route it's a side trip from; "spiti" is around Kaza and Kibber, reached on either. */
  route: DetourRoute;
  line: [number, number][];
};

export type DetourRoute = RouteLeg["id"] | "spiti";

export const detourGroups: { route: DetourRoute; title: string; note: string }[] = [
  { route: "kinnaur", title: "Via Shimla", note: "Side trips off the Kinnaur road, before Kaza" },
  { route: "manali", title: "Via Manali", note: "Side trips off the Kunzum road" },
  { route: "spiti", title: "Around Kaza & Kibber", note: "Day trips from Kibber, whichever way you come" },
];

const side = (key: keyof typeof detourLines) => detourLines[key] as [number, number][];

export const detours: Detour[] = [
  {
    name: "Chitkul",
    route: "kinnaur",
    tags: ["stay", "hiking", "spiritual", "photogenic"],
    lat: 31.3518,
    lng: 78.4359,
    km: 41,
    from: "Karcham",
    altitude: "3,450 m",
    note: "The last village before the Tibet border, at the head of the Baspa valley. Turn off at Karcham.",
    label: "right",
    line: side("Chitkul"),
  },
  {
    name: "Sangla",
    route: "kinnaur",
    tags: ["stay", "spiritual", "photogenic"],
    lat: 31.4259,
    lng: 78.2637,
    km: 17,
    from: "Karcham",
    altitude: "2,680 m",
    note: "The main village of the Baspa valley, with the old Kamru fort above it. On the way up to Chitkul.",
    label: "bottom",
    line: side("Sangla"),
  },
  {
    name: "Kalpa",
    route: "kinnaur",
    tags: ["stay", "spiritual", "photogenic"],
    lat: 31.5332,
    lng: 78.2498,
    km: 7,
    from: "Reckong Peo",
    altitude: "2,960 m",
    note: "Apple orchards, old temples and the Kinner Kailash range face-on at sunrise.",
    label: "bottom",
    line: side("Kalpa"),
  },
  {
    name: "Gue",
    route: "kinnaur",
    tags: ["spiritual"],
    lat: 32.1311,
    lng: 78.5697,
    km: 46,
    from: "Nako",
    altitude: "3,170 m",
    note: "A small shrine holding a monk's naturally mummified body, said to be over 500 years old.",
    label: "right",
    line: side("Gue"),
  },
  {
    name: "Dhankar Monastery",
    route: "kinnaur",
    tags: ["stay", "hiking", "spiritual", "photogenic"],
    lat: 32.0895,
    lng: 78.2127,
    km: 27,
    from: "Kaza",
    altitude: "3,894 m",
    note: "An old fort monastery on a crumbling ridge above the meeting of the Spiti and Pin rivers.",
    label: "left",
    line: side("Dhankar"),
  },
  {
    name: "Mudh",
    route: "kinnaur",
    tags: ["stay", "hiking", "photogenic"],
    lat: 31.959,
    lng: 78.0324,
    km: 49,
    from: "Kaza",
    altitude: "3,770 m",
    note: "The last village up the Pin valley, a greener side valley and national park in ibex country. Trails lead on from the road's end.",
    label: "left",
    line: side("Mudh"),
  },
  {
    name: "Sagnam",
    route: "kinnaur",
    tags: ["stay", "spiritual", "photogenic"],
    lat: 32.0331,
    lng: 78.0567,
    km: 36,
    from: "Kaza",
    altitude: "3,620 m",
    note: "A farming village in the Pin valley, where the Parahio river joins the Pin. On the way up to Mudh.",
    label: "right",
    line: side("Sagnam"),
  },
  {
    name: "Komic",
    route: "spiti",
    tags: ["spiritual", "photogenic"],
    lat: 32.2329,
    lng: 78.1099,
    km: 19,
    from: "Kaza",
    altitude: "4,587 m",
    note: "One of the highest villages reached by road, with the old Tangyud monastery.",
    label: "right",
    line: side("Komic"),
  },
  {
    name: "Demul",
    route: "spiti",
    tags: ["stay", "hiking", "photogenic"],
    lat: 32.1697,
    lng: 78.1791,
    km: 31,
    from: "Kaza",
    altitude: "4,340 m",
    note: "A high farming village on the plateau above the Spiti river, with homestays and the walking trail on to Komic.",
    label: "right",
    line: side("Demul"),
  },
  {
    name: "Hikkim",
    route: "spiti",
    tags: ["photogenic"],
    lat: 32.2472,
    lng: 78.0999,
    km: 15,
    from: "Kaza",
    altitude: "4,400 m",
    note: "Home to one of the world's highest post offices. Send a postcard from here.",
    label: "right",
    line: side("Hikkim"),
  },
  {
    name: "Langza",
    route: "spiti",
    tags: ["stay", "hiking", "spiritual", "photogenic"],
    lat: 32.2756,
    lng: 78.0858,
    km: 15,
    from: "Kaza",
    altitude: "4,400 m",
    note: "Fossils in the fields and a great golden Buddha looking over the valley.",
    label: "right",
    line: side("Langza"),
  },
  {
    name: "Rangrik",
    route: "spiti",
    tags: ["spiritual", "photogenic"],
    lat: 32.2556,
    lng: 78.0238,
    km: 8,
    from: "Kaza",
    altitude: "3,690 m",
    note: "A quiet village across the Spiti river from Kaza, with its small monastery.",
    label: "left",
    line: side("Rangrik"),
  },
  {
    name: "Key Monastery",
    route: "spiti",
    tags: ["spiritual", "photogenic"],
    lat: 32.2973,
    lng: 78.0118,
    km: 7,
    from: "Kibber",
    altitude: "4,166 m",
    note: "Spiti's largest monastery, stacked on its hill on the road between Kaza and Kibber.",
    label: "left",
    line: side("Key"),
  },
  {
    name: "Gete",
    route: "spiti",
    tags: ["hiking", "photogenic"],
    lat: 32.3026,
    lng: 78.0196,
    km: 6,
    from: "Kibber",
    altitude: "4,310 m",
    note: "A handful of houses high above Key Monastery, on the back road to Tashigang.",
    label: "right",
    line: side("Gete"),
  },
  {
    name: "Tashigang",
    route: "spiti",
    tags: ["hiking", "photogenic"],
    lat: 32.2939,
    lng: 78.0546,
    km: 13,
    from: "Kibber",
    altitude: "4,420 m",
    note: "A tiny village on the high road from Gete, looking out over the Spiti valley.",
    label: "right",
    line: side("Tashigang"),
  },
  {
    name: "Chicham Bridge",
    route: "spiti",
    tags: ["photogenic"],
    lat: 32.3431,
    lng: 77.997,
    km: 3,
    from: "Kibber",
    altitude: "4,145 m",
    note: "One of Asia's highest bridges, across a deep gorge just beyond Kibber.",
    label: "left",
    line: side("Chicham"),
  },
  {
    name: "Chandratal Lake",
    route: "manali",
    tags: ["stay", "hiking", "photogenic"],
    lat: 32.4747,
    lng: 77.6171,
    km: 15,
    from: "Batal",
    altitude: "4,300 m",
    note: "The crescent 'moon lake', turquoise beneath the peaks. The road ends at the campsites; walk the last kilometre to the shore. Usually reachable June to October.",
    label: "top",
    // Traced from OpenStreetMap: the lake road from the Kunzum road, then the footpath to the shore.
    line: side("Chandratal"),
  },
  {
    name: "Sissu",
    route: "manali",
    tags: ["stay", "photogenic"],
    lat: 32.4689,
    lng: 77.1323,
    km: 10,
    from: "Atal Tunnel",
    altitude: "3,010 m",
    note: "A Lahaul village on the Chandra river, with a tall waterfall across the valley. The road passes through it just beyond the tunnel's north end.",
    label: "top",
    // On the main road itself, so there's no side road to draw.
    line: [],
  },
  {
    name: "Keylong",
    route: "manali",
    tags: ["stay", "spiritual", "photogenic"],
    lat: 32.5718,
    lng: 77.0281,
    km: 41,
    from: "Atal Tunnel",
    altitude: "3,080 m",
    note: "The headquarters of Lahaul, on the Manali–Leh highway, with the Kardang and Shashur monasteries on the slopes around it.",
    label: "left",
    line: side("Keylong"),
  },
  {
    name: "Kasol",
    route: "manali",
    tags: ["stay", "hiking"],
    lat: 32.0104,
    lng: 77.3166,
    km: 30,
    from: "Bhuntar",
    altitude: "1,580 m",
    note: "A riverside village in the Parvati valley, among pines, cafés and trailheads.",
    label: "bottom",
    line: side("Kasol"),
  },
  {
    name: "Tosh",
    route: "manali",
    tags: ["stay", "hiking", "photogenic"],
    lat: 32.0144,
    lng: 77.4519,
    km: 50,
    from: "Bhuntar",
    altitude: "2,400 m",
    note: "A village at the head of the Parvati valley road, beneath snow peaks. The last stretch from Barshaini is steep.",
    label: "right",
    line: side("Tosh"),
  },
];
