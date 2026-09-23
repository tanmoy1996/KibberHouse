"use client";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { headerAppearanceByRoute } from "@/config/header";
export type HeaderVariant = "light" | "dark" | "overlay";
type Appearance = {
  variant: HeaderVariant | null;
  setVariant: (variant: HeaderVariant | null) => void;
};
const HeaderContext = createContext<Appearance | null>(null);
export function HeaderAppearanceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [override, setOverride] = useState<{
    pathname: string;
    variant: HeaderVariant;
  } | null>(null);
  const setVariant = useCallback(
    (variant: HeaderVariant | null) => {
      setOverride(variant ? { pathname, variant } : null);
    },
    [pathname],
  );
  return (
    <HeaderContext.Provider
      value={{
        variant:
          override?.pathname === pathname
            ? override.variant
            : (headerAppearanceByRoute[pathname] ?? null),
        setVariant,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}
// Explicit scene triggers set the active variant; no DOM scanning or scene logic here.
export function useHeaderAppearance() {
  return useContext(HeaderContext);
}
