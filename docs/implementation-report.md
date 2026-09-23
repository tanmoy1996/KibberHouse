# Site shell and cinematic foundation report

## Scope

The site shell was completed, then the user's subsequent Phase 3 request replaced the specimen homepage with the 17-scene skeleton. Existing tokens, content models, fonts and primitives were retained. Work stops before Phase 4.

## Files created for Phase 3

- `config/scenes.ts`, `config/header.ts`
- `content/media.ts`, `types/scenes.ts`
- `lib/animations/scrollTrigger.ts`, `useScrollScene.ts`, `prefersReducedMotion.ts`, `transitions.ts`, `debug.ts`
- `components/scenes/Scene.tsx`, `PinnedScene.tsx`, `SceneContainer.tsx`, `SceneContent.tsx`, `SceneBackground.tsx`, `SceneLabel.tsx`, `SceneScaffold.tsx`, `SceneRuntime.tsx`, `CinematicImage.tsx`, `TextReveal.tsx`, `ScrollCue.tsx`
- `components/scenes/MountainOpeningScene.tsx`
- `components/scenes/HouseRevealScene.tsx`
- `components/scenes/FieldDataScene.tsx`
- `components/scenes/WindowApproachScene.tsx`
- `components/scenes/InteriorRevealScene.tsx`
- `components/scenes/RoomScene.tsx`
- `components/scenes/BedWarmthScene.tsx`
- `components/scenes/GreenhouseScene.tsx`
- `components/scenes/RoomsScene.tsx`
- `components/scenes/HouseLifeScene.tsx`
- `components/scenes/OutsideTransitionScene.tsx`
- `components/scenes/WildlifeScene.tsx`
- `components/scenes/ActivitiesScene.tsx`
- `components/scenes/SeasonsScene.tsx`
- `components/scenes/GettingHereScene.tsx`
- `components/scenes/StayScene.tsx`
- `components/scenes/FinalScene.tsx`
- `.env.example`, this report

Next.js generated `AGENTS.md` and `CLAUDE.md` on the development-server startup; its installed documentation was consulted.

## Existing files modified for Phase 3

- `app/page.tsx`: server-rendered scene sequence replaces the design-system demonstration.
- `app/globals.css`: predictable scene dimensions, layers, media positioning, field-data grid, debug and reduced-motion rules.
- `components/navigation/HeaderAppearance.tsx`: route-level initial appearance, with scene-controlled overrides.
- `lib/animations/gsap.ts`: centralized client registration replaces the unused starter helper.
- `README.md`: current architecture, configuration and integration guidance.
- Removed the now-unneeded `components/scenes/.gitkeep`.

## Site-shell files created or modified in the preceding work

Created `components/navigation/SiteHeader.tsx`, `MobileMenu.tsx`, `HeaderAppearance.tsx`, `components/ui/BrandMark.tsx`, `components/booking/BookCTA.tsx`, `components/layout/SiteFooter.tsx`, `PlaceholderPage.tsx`, `components/loading/EntryExperience.tsx`, and `app/loading.tsx`.

Created `app/{stay,the-house,wildlife,kibber,getting-here,gallery,about,contact,book}/page.tsx` as title-only editorial placeholders. Modified `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `content/contact.ts`, `content/navigation.ts` and `README.md`. Replaced the old `components/navigation/header.tsx`; removed the booking folder's empty marker.

## Decisions and limited deviations

- Only two short pins demonstrate the infrastructure. Longer 250–300vh examples would add empty scrolling before real scene content is supplied.
- `scrollLength` is total scene extent, including the visible viewport. Stable `svh` reserves space; pin spacing is not added again.
- No image files exist in the reserved public folders. Semantic asset slots are null and render neutral brand-colour backgrounds.
- The typographic wordmark is retained. No official window logo was recreated or animated.
- Actual pending loading boundaries show entry branding; ready content is never delayed. The fallback disappears immediately on readiness rather than holding an exit fade.
- Privacy/Terms remain disabled text and absent social URLs are omitted. Book links to the placeholder route.
- Touch scrolling is tested through Chromium touch emulation; this is not a physical iOS/Android device certification.

## Validation

Production viewport matrix: 375×667, 390×844, 430×932, 768×1024, 1024×768, 1366×768, 1440×900, 1920×1080.

At each size: 17 scenes in DOM order, one h1, no horizontal overflow, both pins retain their viewport and release, midpoint progress matches scroll, header themes switch correctly, navigation/back history cleans up and re-creates pins, footer is reachable, and axe reports no WCAG A/AA violations.

Additional checks: breakpoint/orientation resizing (including 844×390 with no pinning), live reduced-motion changes, native emulated touch swipes, scroll-cue dismissal, and production debug suppression even when the environment flag is true. No browser errors, hydration warnings, ScrollTrigger warnings or React warnings were observed in the production matrix.

The shell was also verified at 375/430/768/1024/1440/1920px for focus trapping, Escape, trigger focus restoration, previous body-style/scroll-position restoration, short-height menu scrolling, route navigation, resize cleanup, desktop hide/show and reduced motion. A temporary pending-response fixture verified the real loading fallback, session navigation skip and blocked-storage fallback; it was removed.

Browser test tools run outside the repository and add no application dependencies. Temporary verification routes are removed from the final build. Automated accessibility checks supplement, rather than replace, manual accessibility review.
