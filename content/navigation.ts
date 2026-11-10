export const navigation = [
  { label: "Home", href: "/" },
  { label: "Stay", href: "/stay" },
  { label: "Experiences", href: "/experiences" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;
// Footer-only links: pages kept out of the main menu.
export const footerNavigation = [
  ...navigation,
  { label: "Routes", href: "/routes" },
  { label: "Field guide", href: "/field-guide" },
] as const;
export const legalNavigation = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;
