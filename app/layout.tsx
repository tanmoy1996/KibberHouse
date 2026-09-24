import type { Metadata } from "next";
import { Fraunces, Karla, IBM_Plex_Mono, Qwitcher_Grypen } from "next/font/google";
import { site } from "@/config/site";
import { shareImage } from "@/lib/seo";
import { contact } from "@/content/contact";
import { house } from "@/content/house";
import { amenities } from "@/content/amenities";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { HeaderAppearanceProvider } from "@/components/navigation/HeaderAppearance";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-fraunces",
  display: "swap",
});
const body = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-karla",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});
const handwritten = Qwitcher_Grypen({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-qwitcher-grypen",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.homeTitle, template: `%s | ${site.title}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.title,
    locale: site.locale,
    title: site.homeTitle,
    description: site.description,
    url: "/",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.homeTitle,
    description: site.description,
    images: [shareImage.url],
  },
  robots: { index: true, follow: true },
};
// Structured data for search: the house, its location, rooms and amenities.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": `${site.url}/#house`,
  name: site.title,
  url: site.url,
  description: site.description,
  image: `${site.url}${shareImage.url}`,
  email: contact.email,
  telephone: contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kibber",
    addressRegion: "Himachal Pradesh",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: contact.coordinates.lat,
    longitude: contact.coordinates.lng,
  },
  hasMap: contact.googleMaps,
  numberOfRooms: house.rooms,
  checkinTime: "12:00",
  checkoutTime: "10:00",
  petsAllowed: true,
  amenityFeature: amenities.map((item) => ({
    "@type": "LocationFeatureSpecification",
    name: item.title,
    value: true,
  })),
  sameAs: [contact.instagram, contact.facebook].filter(Boolean),
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${body.variable} ${mono.variable} ${handwritten.variable}`}
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <HeaderAppearanceProvider>
          <SiteHeader />
          <main id="main" className="site-main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <WhatsAppButton />
        </HeaderAppearanceProvider>
      </body>
    </html>
  );
}
