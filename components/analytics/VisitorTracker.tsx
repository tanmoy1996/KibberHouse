"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function VisitorTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  const session = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastPath.current === pathname || navigator.doNotTrack === "1") return;
    lastPath.current = pathname;
    try {
      session.current = sessionStorage.getItem("kh-visit-session") || crypto.randomUUID();
      sessionStorage.setItem("kh-visit-session", session.current);
    } catch {
      session.current ||= crypto.randomUUID();
    }
    const params = new URLSearchParams(window.location.search);
    let referrer = "";
    try {
      const source = new URL(document.referrer);
      // Keep the source page, excluding query strings that may contain personal data.
      referrer = `${source.origin}${source.pathname}`.slice(0, 300);
    } catch { /* No referrer. */ }
    const payload = {
      sessionId: session.current,
      path: pathname,
      referrer,
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop/tablet",
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    void fetch("/api/visits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => { /* Analytics must never interrupt browsing. */ });
  }, [pathname]);

  return null;
}
