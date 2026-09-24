import { house } from "./house";

// Approximate journey guidance for the contact page. Figures are typical
// conditions only; confirm them against current local information each season.
export const nearest = {
  town: { name: "Kaza", detail: `${house.distanceFromKaza} · about 40 min by taxi` },
  airport: { name: "Bhuntar (Kullu–Manali), KUU", detail: "via Manali · about 9–10 hrs by road" },
} as const;

export const routes = [
  {
    from: "Delhi",
    title: "Overnight to the mountains",
    text: "Overnight Volvo buses run from Delhi to Manali (about 12–14 hrs), and to Shimla for the Kinnaur route. Continue to Kaza by local HRTC bus or shared taxi.",
  },
  {
    from: "Bhuntar airport",
    title: "Via Manali and Kunzum Pass",
    text: "Fly into Bhuntar, 50 km from Manali, then drive about 200 km to Kaza through the Atal Tunnel and over Kunzum Pass (7–9 hrs). Usually open June to October.",
  },
  {
    from: "Shimla & Chandigarh",
    title: "Through Kinnaur",
    text: "The longer, lower road follows the Sutlej through Reckong Peo, Nako and Tabo. Shimla to Kaza is about 420 km, best split over two days. Open most of the year.",
  },
  {
    from: "Kaza",
    title: "The last climb",
    text: `Kibber is ${house.distanceFromKaza} above Kaza on a steep mountain road. Taxis run up from Kaza, and there is free parking at the house.`,
  },
] as const;
