"use client";

import { useEffect, useSyncExternalStore } from "react";
import { BrandMark } from "@/components/ui/BrandMark";
import { house } from "@/content/house";
const sessionKey = "kibber-house:entered";
const sessionEvent = "kibber-house:entry-ready";
let readyInMemory = false;
function hasEntered() {
  try {
    return readyInMemory || sessionStorage.getItem(sessionKey) === "true";
  } catch {
    return readyInMemory;
  }
}
function subscribe(callback: () => void) {
  window.addEventListener(sessionEvent, callback);
  return () => window.removeEventListener(sessionEvent, callback);
}
// Mounted only with resolved page content, never from the loading fallback.
export function EntryReady() {
  useEffect(() => {
    readyInMemory = true;
    try {
      sessionStorage.setItem(sessionKey, "true");
    } catch {
      /* Memory fallback when storage is unavailable. */
    }
    window.dispatchEvent(new Event(sessionEvent));
  }, []);
  return null;
}
// A genuine Suspense fallback: no timer, font gate, route delay or exit hold.
export function EntryExperience() {
  const entered = useSyncExternalStore(subscribe, hasEntered, () => false);
  if (entered)
    return (
      <div className="route-loading" role="status">
        <p>Loading page…</p>
      </div>
    );
  return (
    <div
      className="entry-screen"
      data-tone="cold"
      role="status"
      aria-label="Loading Kibber House"
    >
      <div className="entry-screen__identity">
        <BrandMark variant="light" size="large" />
        <p className="type-label">
          {house.altitude}
          <br />
          Spiti · Himachal Pradesh
        </p>
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
