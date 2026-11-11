import { house } from "./house";

// Approximate journey guidance for the contact page. Figures are typical
// conditions only; confirm them against current local information each season.
export const nearest = {
  town: { name: "Kaza", detail: `${house.distanceFromKaza} · about 40 min by taxi` },
  airport: { name: "Bhuntar (Kullu–Manali), KUU", detail: "via Manali · about 9–10 hrs by road · flights often cancelled" },
} as const;

export const routes = [
  {
    from: "Kullu–Manali airport",
    title: "By air to Bhuntar",
    season: "Flights all year, but often cancelled",
    text: "Fly into Kullu–Manali airport (KUU) at Bhuntar, about 50 km south of Manali. Flights are often cancelled by weather, so keep a spare day or fly into Chandigarh instead. From June to October continue over Kunzum Pass; in winter, drive round through Shimla and Kinnaur instead.",
  },
  {
    from: "Shimla",
    title: "By road through Kinnaur",
    season: "Open all year",
    text: "The lower road follows the Sutlej through Reckong Peo, Nako and Tabo, about 420 km to Kaza. It stays open through the year, though heavy snow can close it for a day or two; best split over two days.",
  },
  {
    from: "Manali",
    title: "By road over Kunzum Pass",
    season: "June to October · closed in winter",
    text: "Through the Atal Tunnel and over Kunzum Pass (4,551 m), about 200 km to Kaza in 7–9 hours. The pass is closed by snow from about November to May.",
  },
  {
    from: "Kaza",
    title: "The last climb",
    season: "All year",
    text: `Kibber is ${house.distanceFromKaza} above Kaza on a steep mountain road. Taxis run up from Kaza, and there is free parking at the house.`,
  },
] as const;
