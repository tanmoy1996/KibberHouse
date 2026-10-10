import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        // Compatible with statically rendered Next.js scripts and the Maps embed.
        { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'" },
      ],
    }];
  },
  // Retired and renamed pages keep their inbound links (and search ranking) alive.
  async redirects() {
    return [
      { source: "/things-to-do", destination: "/experiences", permanent: true },
      { source: "/wildlife", destination: "/experiences#snow-leopard", permanent: true },
      { source: "/getting-here", destination: "/contact", permanent: true },
      { source: "/the-house", destination: "/stay#the-house", permanent: true },
      { source: "/stay/deluxe", destination: "/stay#deluxe", permanent: true },
      { source: "/stay/super-deluxe", destination: "/stay#super-deluxe", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/kibber", destination: "/experiences", permanent: true },
    ];
  },
};

export default nextConfig;
