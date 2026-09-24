import type { Metadata } from "next";
import { site } from "@/config/site";

export const shareImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Kibber House among terraced fields and the mountains of Spiti Valley",
};

// Per-page title, description, canonical URL and social previews in one place.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${site.title}` : site.homeTitle;
  return {
    ...(title ? { title } : { title: { absolute: site.homeTitle } }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.title,
      locale: site.locale,
      url: path,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage.url],
    },
  };
}
