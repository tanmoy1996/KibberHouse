"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { CircleMarker, LatLngBounds, Map as LeafletMap, Polyline } from "leaflet";
import {
  circuitKm,
  detours,
  placeTags,
  routeLegs,
  type Detour,
  type PlaceTag,
  type RouteLeg,
  type RouteStop,
} from "@/content/route-map";
import { placePhotos } from "@/content/place-photos";
import { TagIcon, tagIconHtml } from "./TagIcon";

const LEG_COLOURS: Record<RouteLeg["id"], string> = {
  kinnaur: "#6e2b24", // --color-madder
  manali: "#276a63", // --color-chorten
};
const STOP_COLOUR = "#c87f2e"; // --color-butter-lamp
const DETOUR_COLOUR = "#7a4a12"; // --color-brass
const HOME = "Kibber";

const LABEL_OFFSETS: Record<NonNullable<RouteStop["label"]>, [number, number]> = {
  right: [8, 0],
  left: [-8, 0],
  top: [0, -8],
  bottom: [0, 8],
};

type View = "circuit" | RouteLeg["id"];

const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Standard OpenStreetMap tiles need no key but are meant for light use only.
// With a free MapTiler key (NEXT_PUBLIC_MAPTILER_KEY) the map switches to MapTiler's
// Outdoor style, which shows the mountain terrain and suits regular traffic.
function tiles() {
  const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;
  if (key) {
    return {
      url: `https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}{r}.png?key=${key}`,
      maxZoom: 18,
      attribution: `<a href="https://www.maptiler.com/copyright/">&copy; MapTiler</a> ${OSM_ATTRIBUTION}`,
    };
  }
  return {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    maxZoom: 19,
    attribution: OSM_ATTRIBUTION,
  };
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// The photo sits above the text; its width and height are reserved so the popup
// doesn't jump when the image arrives. Third-party photos carry their credit.
const photoHtml = (name: string) => {
  const photo = placePhotos[name];
  if (!photo) return "";
  const credit = photo.credit
    ? `<figcaption>Photo: <a href="${escapeHtml(photo.credit.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(photo.credit.author)}</a> · ${escapeHtml(photo.credit.license)}</figcaption>`
    : "";
  return `<figure class="route-map__photo"><img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt)}" width="720" height="480" loading="lazy" decoding="async">${credit}</figure>`;
};

const TAGS = Object.keys(placeTags) as PlaceTag[];

// Tags by place name, across both legs and the detours, for the map filter.
const TAGS_BY_PLACE = new Map<string, PlaceTag[]>(
  [...routeLegs.flatMap((leg) => leg.stops), ...detours].map((place) => [place.name, place.tags ?? []]),
);

const tagsHtml = (tags: PlaceTag[] = []) =>
  tags.length
    ? `<ul class="route-map__tags">${tags
        .map((tag) => `<li>${tagIconHtml(tag)}${placeTags[tag]}</li>`)
        .join("")}</ul>`
    : "";

const POPUP_OPTIONS = {
  className: "route-map__popup",
  closeButton: false,
  minWidth: 260,
  maxWidth: 260,
} as const;

const popupHtml = (stop: RouteStop, leg: RouteLeg) =>
  `${photoHtml(stop.name)}<strong>${stop.name}</strong><span>${stop.altitude} · ${
    stop.km === 0 ? "start of the route" : `${stop.km} km from ${leg.from}`
  }</span>${tagsHtml(stop.tags)}<p>${stop.note}</p>`;

const detourPopupHtml = (place: Detour) =>
  `${photoHtml(place.name)}<em>Worth the detour</em><strong>${place.name}</strong><span>${place.altitude} · ${place.km} km from ${place.from}</span>${tagsHtml(place.tags)}<p>${place.note}</p>`;

type Placed = { marker: CircleMarker; rank: number; name: string };

// Every place is labelled, but where the map is too small to fit them all
// (narrow screens, wide views), labels are placed by rank (Kibber, then the
// major stops, then the rest) and one that would collide with a label already
// placed is hidden until the map is zoomed in or the place is hovered.
function declutter(markers: Placed[], filter: PlaceTag | null = null) {
  const placed: DOMRect[] = [];
  // With a highlight chosen, matching places get first claim on the space.
  const score = ({ rank, name }: Placed) =>
    rank + (filter && !(TAGS_BY_PLACE.get(name) ?? []).includes(filter) ? 10 : 0);
  const ordered = [...markers].sort((a, b) => score(a) - score(b));
  for (const { marker } of ordered) {
    const element = marker.getTooltip()?.getElement();
    if (!element) continue;
    element.classList.remove("is-crowded");
    const box = element.getBoundingClientRect();
    const hits = placed.some(
      (other) =>
        box.left < other.right && box.right > other.left &&
        box.top < other.bottom && box.bottom > other.top,
    );
    if (hits) element.classList.add("is-crowded");
    else placed.push(box);
  }
}

export function RouteMap() {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const lines = useRef<Partial<Record<RouteLeg["id"], Polyline[]>>>({});
  const bounds = useRef<Partial<Record<View, LatLngBounds>>>({});
  // One marker per place; Kibber, Kaza and Chandigarh sit on both legs.
  const markers = useRef<Map<string, CircleMarker>>(new Map());
  const [view, setView] = useState<View>("circuit");
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState<PlaceTag | null>(null);
  const filterRef = useRef<PlaceTag | null>(null);
  const placed = useRef<Placed[]>([]);
  const matches = (name: string) => !filter || (TAGS_BY_PLACE.get(name) ?? []).includes(filter);

  useEffect(() => {
    let cancelled = false;

    // Leaflet touches `window` on import, so load it only in the browser.
    import("leaflet").then((L) => {
      if (cancelled || !container.current || map.current) return;

      const instance = L.map(container.current, { scrollWheelZoom: false, zoomSnap: 0.25 });
      map.current = instance;

      const { url, ...options } = tiles();
      L.tileLayer(url, options).addTo(instance);

      // Side roads go down first, so the main road is drawn over the shared junctions.
      for (const place of detours) {
        if (place.line.length < 2) continue;
        L.polyline(place.line, { color: "#fbfaf7", weight: 6, opacity: 0.8 }).addTo(instance);
        L.polyline(place.line, {
          color: DETOUR_COLOUR,
          weight: 2.5,
          opacity: 0.9,
          dashArray: "4 6",
        }).addTo(instance);
      }

      const all = L.latLngBounds([]);
      for (const leg of routeLegs) {
        // A pale casing under each road line keeps it readable over the tiles.
        const casing = L.polyline(leg.line, { color: "#fbfaf7", weight: 8, opacity: 0.9 });
        const road = L.polyline(leg.line, { color: LEG_COLOURS[leg.id], weight: 4, opacity: 0.95 });
        casing.addTo(instance);
        road.addTo(instance);
        lines.current[leg.id] = [casing, road];
        bounds.current[leg.id] = road.getBounds();
        all.extend(road.getBounds());
      }
      bounds.current.circuit = all;

      // A small dot on the main road marks where each side road turns off.
      for (const place of detours) {
        if (place.line.length < 2) continue;
        L.circleMarker(place.line[0], {
          radius: 3.5,
          color: "#fbfaf7",
          weight: 1.5,
          fillColor: DETOUR_COLOUR,
          fillOpacity: 1,
          interactive: false,
        }).addTo(instance);
      }

      const placement = placed.current;
      for (const leg of routeLegs) {
        for (const stop of leg.stops) {
          if (markers.current.has(stop.name)) continue;
          const marker = L.circleMarker([stop.lat, stop.lng], {
            radius: stop.major ? 8 : 6,
            color: "#fbfaf7",
            weight: 2,
            fillColor: stop.name === HOME ? LEG_COLOURS.kinnaur : STOP_COLOUR,
            fillOpacity: 1,
          })
            .addTo(instance)
            .bindTooltip(stop.name, {
              permanent: true,
            // Clicks on the name reach the marker, so the name opens the description too.
            interactive: true,
              direction: stop.label ?? "right",
              offset: LABEL_OFFSETS[stop.label ?? "right"],
              className: stop.major ? "route-map__label" : "route-map__label route-map__label--minor",
            })
            .bindPopup(popupHtml(stop, leg), POPUP_OPTIONS);
          placement.push({ marker, name: stop.name, rank: stop.name === HOME ? 0 : stop.major ? 1 : 2 });
          const hover = (on: boolean) => () =>
            marker.getTooltip()?.getElement()?.classList.toggle("is-hovered", on);
          marker.on("mouseover", hover(true)).on("mouseout", hover(false));
          marker.on("click", () => setActive(stop.name));
          marker.on("popupclose", () =>
            setActive((current) => (current === stop.name ? null : current)),
          );
          markers.current.set(stop.name, marker);
        }
      }

      for (const place of detours) {
        const marker = L.circleMarker([place.lat, place.lng], {
          radius: 5.5,
          color: DETOUR_COLOUR,
          weight: 2.5,
          fillColor: "#fbfaf7",
          fillOpacity: 1,
        })
          .addTo(instance)
          .bindTooltip(place.name, {
            permanent: true,
            interactive: true,
            direction: place.label ?? "right",
            offset: LABEL_OFFSETS[place.label ?? "right"],
            className: "route-map__label route-map__label--detour",
          })
          .bindPopup(detourPopupHtml(place), POPUP_OPTIONS);
        placement.push({ marker, name: place.name, rank: 3 });
        const hover = (on: boolean) => () =>
          marker.getTooltip()?.getElement()?.classList.toggle("is-hovered", on);
        marker.on("mouseover", hover(true)).on("mouseout", hover(false));
        marker.on("click", () => setActive(place.name));
        marker.on("popupclose", () =>
          setActive((current) => (current === place.name ? null : current)),
        );
        markers.current.set(place.name, marker);
      }

      // Re-fit an open popup once its photo has loaded, so it pans fully into view.
      instance.on("popupopen", (event) => {
        const img = event.popup.getElement()?.querySelector("img");
        if (img && !img.complete) img.addEventListener("load", () => event.popup.update(), { once: true });
      });

      const tidy = () => declutter(placement, filterRef.current);
      instance.on("zoomend", tidy);
      instance.fitBounds(all, { padding: [32, 32] });
      tidy();
    });

    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
      lines.current = {};
      bounds.current = {};
      markers.current = new Map();
      placed.current = [];
    };
  }, []);

  // Fade the places that don't match the chosen highlight.
  useEffect(() => {
    for (const [name, marker] of markers.current) {
      const match = !filter || (TAGS_BY_PLACE.get(name) ?? []).includes(filter);
      marker.setStyle({ opacity: match ? 1 : 0.3, fillOpacity: match ? 1 : 0.3 });
      if (match && filter) marker.bringToFront();
      marker.getTooltip()?.getElement()?.classList.toggle("is-filtered-out", !match);
    }
    filterRef.current = filter;
    declutter(placed.current, filter);
  }, [filter]);

  const showView = (next: View) => {
    setView(next);
    for (const leg of routeLegs) {
      const dimmed = next !== "circuit" && next !== leg.id;
      const [casing, road] = lines.current[leg.id] ?? [];
      casing?.setStyle({ opacity: dimmed ? 0.4 : 0.9 });
      road?.setStyle({ opacity: dimmed ? 0.25 : 0.95 });
      if (!dimmed) road?.bringToFront();
    }
    const target = bounds.current[next];
    if (target) map.current?.flyToBounds(target, { padding: [32, 32], duration: 0.8 });
  };

  // Open the description once the map has settled, so it can pan into view.
  const flyThenOpen = (lat: number, lng: number, zoom: number, marker?: CircleMarker) => {
    const instance = map.current;
    if (!instance || !marker) return;
    // Bring the map back into view when a place is picked from the lists below it.
    const canvas = container.current;
    if (canvas) {
      const box = canvas.getBoundingClientRect();
      const header = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      if (box.top < header || box.bottom > window.innerHeight) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        canvas.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }
    }
    instance.closePopup();
    instance.once("moveend", () => marker.openPopup());
    instance.flyTo([lat, lng], zoom, { duration: 0.8 });
  };

  const focusStop = (leg: RouteLeg, stop: RouteStop) => {
    setActive(stop.name);
    const marker = markers.current.get(stop.name);
    marker?.setPopupContent(popupHtml(stop, leg));
    flyThenOpen(stop.lat, stop.lng, 10, marker);
  };

  const focusDetour = (place: Detour) => {
    setActive(place.name);
    // The places around Kaza sit close together, so zoom in further for them.
    const zoom = place.from === "Kaza" || place.from === "Kibber" ? 11 : 10;
    flyThenOpen(place.lat, place.lng, zoom, markers.current.get(place.name));
  };

  const legs = view === "circuit" ? routeLegs : routeLegs.filter((leg) => leg.id === view);

  return (
    <div className="route-map">
      <div className="route-map__bar">
        <div className="route-map__views" role="group" aria-label="Show on the map">
          <button type="button" aria-pressed={view === "circuit"} onClick={() => showView("circuit")}>
            Full circuit · {circuitKm.toLocaleString("en-IN")} km
          </button>
          {routeLegs.map((leg) => (
            <button
              key={leg.id}
              type="button"
              aria-pressed={view === leg.id}
              onClick={() => showView(leg.id)}
            >
              <span className="route-map__swatch" style={{ background: LEG_COLOURS[leg.id] }} />
              {leg.label}
            </button>
          ))}
        </div>
        <p className="route-map__legend">
          <span className="route-map__ring" aria-hidden="true" />
          Worth the detour
        </p>
      </div>
      <div className="route-map__filters" role="group" aria-label="Highlight places for">
        <span className="route-map__filters-label">Highlight</span>
        {TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            aria-pressed={filter === tag}
            onClick={() => setFilter((current) => (current === tag ? null : tag))}
          >
            <TagIcon tag={tag} className="route-map__tag-icon" />
            {placeTags[tag]}
          </button>
        ))}
      </div>
      <div
        ref={container}
        className="route-map__canvas"
        role="region"
        aria-label="Map of the circuit from Chandigarh to Kibber and back via Manali"
      />
      {legs.map((leg) => (
        <div key={leg.id} className="route-map__leg">
          <p className="route-map__leg-head">
            <span className="route-map__swatch" style={{ background: LEG_COLOURS[leg.id] }} />
            <strong>{leg.title}</strong>
            <span>
              {leg.stops[leg.stops.length - 1].km} km · {leg.season}
            </span>
          </p>
          <ol
            className="route-map__stops"
            aria-label={`Places on the way: ${leg.title}`}
            style={{ "--leg-colour": LEG_COLOURS[leg.id] } as CSSProperties}
          >
            {leg.stops.map((stop) => (
              <li key={stop.name}>
                <button
                  type="button"
                  onClick={() => focusStop(leg, stop)}
                  aria-pressed={active === stop.name}
                  className={matches(stop.name) ? "route-map__stop" : "route-map__stop is-filtered-out"}
                >
                  <span className="route-map__km">{stop.km} km</span>
                  <span className="route-map__name">{stop.name}</span>
                  <span className="route-map__alt">{stop.altitude}</span>
                  <PlaceIcons tags={stop.tags} />
                </button>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <div className="route-map__leg">
        <p className="route-map__leg-head">
          <span className="route-map__ring" aria-hidden="true" />
          <strong>Worth the detour</strong>
          <span>Side trips off the circuit, with the road distance from the turn-off town</span>
        </p>
        <ul
          className="route-map__stops route-map__stops--detours"
          aria-label="Places worth a detour"
          style={{ "--leg-colour": DETOUR_COLOUR } as CSSProperties}
        >
          {detours.map((place) => (
            <li key={place.name}>
              <button
                type="button"
                onClick={() => focusDetour(place)}
                aria-pressed={active === place.name}
                className={matches(place.name) ? "route-map__stop" : "route-map__stop is-filtered-out"}
              >
                <span className="route-map__km">
                  {place.km} km from {place.from}
                </span>
                <span className="route-map__name">{place.name}</span>
                <span className="route-map__alt">{place.altitude}</span>
                <PlaceIcons tags={place.tags} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PlaceIcons({ tags = [] }: { tags?: PlaceTag[] }) {
  if (!tags.length) return null;
  return (
    <span className="route-map__icons">
      {tags.map((tag) => (
        <span key={tag} title={placeTags[tag]}>
          <TagIcon tag={tag} className="route-map__tag-icon" />
        </span>
      ))}
      <span className="sr-only">{tags.map((tag) => placeTags[tag]).join(", ")}</span>
    </span>
  );
}
