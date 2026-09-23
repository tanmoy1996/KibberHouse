import type { Metadata } from "next";
import { Fraunces, Karla, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/config/site";
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
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.title}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.title,
    title: site.title,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Kibber House",
              url: site.url,
              email: "kibberhouse@gmail.com",
              description: site.description,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kibber Village",
                addressRegion: "Himachal Pradesh",
                addressCountry: "IN",
              },
            }).replace(/</g, "\\u003c"),
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
