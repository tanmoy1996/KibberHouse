import type { MetadataRoute } from "next";
import { site } from "@/config/site";
const routes = [
  "",
  "/stay",
  "/stay/deluxe",
  "/stay/super-deluxe",
  "/the-house",
  "/wildlife",
  "/things-to-do",
  "/kibber",
  "/getting-here",
  "/gallery",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority:
      route === "" ? 1 : route === "/stay" ? 0.8 : 0.6,
  }));
}
