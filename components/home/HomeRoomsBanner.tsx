"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { house } from "@/content/house";
import { photos, type MediaAsset } from "@/content/media";

const base = photos.bedDetail;

// Hovering or focusing a room link swaps the banner background to that room.
const roomTypes: { label: string; href: string; photo: MediaAsset }[] = [
  { label: "Deluxe room", href: "/stay#deluxe", photo: photos.bedroom },
  // Placeholder until a photo of the Super Deluxe room itself is supplied.
  { label: "Super Deluxe suite", href: "/stay#super-deluxe", photo: photos.roomSunset },
];

export function HomeRoomsBanner() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="home-banner" data-tone="dark" aria-labelledby="rooms-title">
      <div className="home-banner__frame">
        <div className="home-banner__layers" data-parallax aria-hidden="true">
          <Image src={base.src} alt="" fill sizes="100vw" className="home-banner__layer is-base" />
          {roomTypes.map((room, index) => (
            <Image
              key={room.label}
              src={room.photo.src}
              alt=""
              fill
              sizes="100vw"
              className="home-banner__layer"
              style={{ objectPosition: room.photo.objectPosition }}
              data-active={active === index}
            />
          ))}
        </div>
        <div className="home-banner__meta" data-reveal="fade">
          <p className="home-kicker">The rooms</p>
          <h2 id="rooms-title">Deluxe &amp; Super Deluxe</h2>
          <p>
            Wood-lined and warm against {house.januaryNight} nights, each room looks
            out over village fields to the peaks of the Trans-Himalaya. Every stay
            comes with an attached bathroom, layered bedding and electric blankets.
            Choose from five Deluxe rooms or our Super Deluxe suite, which adds an
            extra room, and settle into the quiet of a village at {house.altitude}.
          </p>
          <Link className="home-outline-button" href="/stay">
            Explore the rooms
          </Link>
          <ul className="home-banner__types" onMouseLeave={() => setActive(null)}>
            {roomTypes.map((room, index) => (
              <li key={room.label}>
                <Link
                  className="home-line-link home-line-link--light"
                  href={room.href}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onBlur={() => setActive(null)}
                >
                  {room.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
