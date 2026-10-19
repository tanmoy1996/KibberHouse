"use client";

import { useEffect, useRef, useState } from "react";

export function HomeHeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function update() {
      if (preference.matches) video.current?.pause();
      else void video.current?.play().catch(() => { /* Poster remains if autoplay is blocked. */ });
    }
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  return (
    <>
      <video
        ref={video}
        className="home-hero__image home-hero__video"
        poster="/media/home-house-poster.webp"
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="A drone approaches Kibber House among snow-covered mountains"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src="/media/home-house-loop.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        className="home-hero__video-toggle"
        aria-label={playing ? "Pause background video" : "Play background video"}
        onClick={() => {
          if (playing) video.current?.pause();
          else void video.current?.play().catch(() => {});
        }}
      >
        {playing ? "Pause video" : "Play video"}
      </button>
    </>
  );
}
