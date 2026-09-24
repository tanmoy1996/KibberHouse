// Page-level initial appearance, before scene triggers mount (also works without JavaScript).
// Routes that open on a full-bleed image (the home hero or EditorialPage's photo hero)
// start with a transparent header over the image, turning solid on scroll.
const overlayRoutes = [
  "/",
  "/stay",
  "/experiences",
];
export const headerAppearanceByRoute: Record<string, "light" | "overlay"> =
  Object.fromEntries(overlayRoutes.map((route) => [route, "overlay"]));
