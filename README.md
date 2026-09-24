# Kibber House

Next.js App Router website with a cinematic homepage, editorial room pages, and a Google Sheets-backed booking enquiry and availability flow.

## Run locally

Node.js 20.9 or newer; Node 24 LTS recommended.

```sh
npm ci
npm run dev
```

Open http://localhost:3000 (or the port reported by Next.js).

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

To enable live booking enquiries and availability, follow
[`docs/google-sheets-booking-setup.md`](docs/google-sheets-booking-setup.md).

Dependencies remain Next.js 16.3.5, React, GSAP and the Tailwind/TypeScript/ESLint toolchain. TypeScript 5.9 and ESLint 9 remain pinned for compatibility with Next's lint plugins. No animation, component, database or smooth-scroll library was added.

## Project structure

- `app/`: root layout, loading boundary, scene-sequence homepage, and nine editorial placeholder routes.
- `components/navigation/`: fixed SiteHeader, fullscreen MobileMenu, HeaderAppearanceProvider.
- `components/booking/BookCTA.tsx`: a real link to `/book`, not a booking form.
- `components/loading/EntryExperience.tsx`: first-entry fallback and resolved-page session marker.
- `components/layout/`: Section, SiteFooter and shared PlaceholderPage.
- `components/ui/`: BrandMark, Button, FieldData, Divider and EditorialImage.
- `components/scenes/`: scene primitives, media wrapper, text reveal and 17 independent story skeletons.
- `config/`: brand/site identity, initial header appearance and scene tuning.
- `content/`: supplied house facts, rooms, activities, seasons, navigation/contact and semantic media map.
- `lib/animations/`: client registration, scoped scene hook, refresh scheduling, motion preference, small transition helpers and development diagnostics.
- `types/`: content and scene contracts.
- `public/images/{exterior,rooms,views,wildlife,activities,food,house}/`, `public/video/`, `public/icons/`: reserved asset locations.

## Design system

`app/globals.css` is the source of colour, type, spacing, width and stacking tokens. Fraunces, Karla and IBM Plex Mono are self-hosted through `next/font/google`; building requires Google Fonts access. Sections adapt semantic foreground, background, rule, muted and accent values. `Section` supports light/snow/barley/cold/dark tones and normal (80rem), wide (90rem), and full widths; prose remains 65ch.

`Button` is a native button; `BookCTA` is a Next Link with compact/default/overlay variants. `EditorialImage` accepts intrinsic dimensions or a static import, required `sizes`, optional aspect ratio and caption, and a `priority` option mapped to Next's `preload`.

## Shared shell

The fixed header is 80px on desktop and 68px below 1024px. It is transparent at the top, gains a readable background after scrolling, hides after downward travel on desktop and returns when scrolling up. Focus reveals it immediately. `SiteHeader` accepts `variant="light"` or `variant="overlay"`. Initial route appearances live in `config/header.ts`; scenes update the existing lightweight context via explicit trigger callbacks.

Mobile navigation uses a native modal `dialog`, so the background is inert. It adds focus wrapping, Escape and Close actions, trigger-focus restoration, body scroll locking with restoration of previous inline styles and scroll offset, and cleanup when navigation or a desktop resize closes the menu. The panel uses `100dvh`, remains internally scrollable on short screens, and opens with one 450ms CSS animation. Reduced motion removes visible animation.

Navigation is shared from `content/navigation.ts`. Social/contact destinations come from `content/contact.ts`; absent values are omitted. Privacy and Terms are disabled text placeholders. The wordmark is typographic until an official asset is supplied; the existing KH favicon is not treated as the official window logo.

`app/loading.tsx` shows branding only during a real pending route boundary. `EntryReady` marks resolved content in session storage, with a memory fallback when storage is blocked. Subsequent client navigations use a small status message if genuinely pending. There is no artificial timer, font gate, forced initial splash or exit hold. A ready static page shows immediately. A new document may display the server-rendered fallback before client storage can be read; normal client routing does not repeat the full entry. New pages should mount `EntryReady` only with resolved content (the shared placeholder already does this).

## Cinematic scene API

`app/page.tsx` stays a Server Component and composes the 17 scenes in story order. Each scene owns its content and may be replaced independently. The animated boundary is the small client `Scene` primitive, with server-rendered children.

```tsx
<Scene
  id="editorial"
  settings={sceneConfig.fieldData}
  aria-labelledby="editorial-title"
>
  <SceneContent>
    <h2 id="editorial-title">Field notes</h2>
  </SceneContent>
</Scene>
```

`Scene` accepts an id, theme, className, children, optional min-height, settings, scrub setting and a future animation callback. Theme options are light/cold/dark/warm/transparent; warm uses Barley. `SceneBackground` places a solid tone or semantic image beneath `SceneContent`, and reserves a children slot for future video. No playback or video scrubbing is implemented.

`PinnedScene` shares the same API, with an optional numeric or breakpoint-specific `scrollLength`. Length means the **total** scene extent: 150 is 150 viewport heights in percent (150svh), including the visible viewport, so the actual pin travel is 50svh. The outer section reserves its height during SSR. The inner viewport is pinned with `pinSpacing: false`; this prevents adding the reserved space twice. Stable `svh` sizes avoid browser-chrome height churn; the menu uses `dvh` because it must fill the current visible viewport.

Only Mountains and House Reveal demonstrate pinning. Their total desktop/tablet/mobile lengths are 150/130/115 and 160/135/115 respectively. Other scenes are natural-flow placeholders. Short screens at 500px or below skip pinning. An oversized viewport frame also falls back to natural flow at setup. Tune the constants in `config/scenes.ts`, not in scene JSX.

`useScrollScene` returns a mutable normalized progress ref and writes `--scene-progress` on its own section. It does not set React state on each scroll frame. Optional `animate(timeline, mode)` callbacks must be defined in a Client Component and kept stable with `useCallback`; use refs for animation targets. `scrub` defaults to true. The callbacks receive desktop/tablet/mobile mode, allowing later scenes to simplify mobile transformations.

`getGSAP()` is the single client registration entry point. It runs from effects, not server rendering. Each scene owns a GSAP context and matchMedia scope. Cleanup reverts only that scope's triggers, timelines and inline styles. No `killAll`, scroll normalization, wheel interception or manual scroll restoration override is used. ScrollTrigger handles normal resize/orientation events; small touch-browser chrome resizes are ignored. Initial scene mounts and font readiness schedule one coalesced refresh rather than an observer/scroll refresh loop.

`transitions.ts` provides small timeline helpers for fade, scale, translation, clipping and a 16px text reveal. One heading demonstrates the text reveal. No final scene animation is present. Add selective `will-change` only while a future heavy transformation is active; none is permanently enabled now.

## Reduced motion and media

Reduced motion disables all pinning and timeline setup, restores animated inline styles, removes reserved pin height, and leaves every scene in readable DOM order. CSS handles the initial server render as well as live preference changes. Header themes and navigation continue working.

`content/media.ts` maps landscape, exterior, window, roomPrimary, bedLayers, roomWide and mountainView to approved media. All are explicitly null because no photographs were supplied. This produces solid scene backgrounds, not broken image requests. Add paths or static imports and descriptive alt text only when the real files arrive; decorative images can use empty alt text.

`CinematicImage` uses Next Image fill, cover, configurable object position, responsive sizes and a stable outer ref for future transforms. Only the opening image is eligible for preload; later images are lazy. No filters, overlays, rounded corners, stock images or generated substitutes are applied.

## Stacking and diagnostics

Global layers in `globals.css`: content 0, cinematic 10, header 20, overlay 30, menu 40, loader 50. The native modal menu also enters the browser top layer. Each scene has isolated background/media/overlay/content/foreground layers, keeping all scene content beneath global navigation.

```sh
NEXT_PUBLIC_SCROLL_DEBUG=true npm run dev
```

Debug mode shows trigger markers, scene identifiers and progress. `window.kibberScroll.inspect()` returns trigger diagnostics; `.refresh()` requests one refresh after a deliberate development change. The hook is removed when the homepage unmounts. Production ignores the debug flag even if set to true. See `.env.example`.

## Validation and scope

See [docs/implementation-report.md](docs/implementation-report.md) for the file manifest, validation coverage and implementation decisions. Indexing remains disabled until real public content and the canonical origin are ready. No rates, B2B information, invented room claims, final cinematic choreography or booking functionality were introduced.
