import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
