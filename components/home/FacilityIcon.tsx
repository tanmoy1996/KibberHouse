type IconName = "warmth" | "blanket" | "water" | "power" | "wifi" | "workspace" | "parking" | "meals";

export function FacilityIcon({ name }: { name: IconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...common}>
      {name === "warmth" && (
        <>
          <path d="M18 36c-5-6-3-11 1-15 1 4 4 5 4 8 3-4 2-9 6-14 6 7 8 16 2 21" />
          <path d="M21 37c-2-3-1-6 2-9 0 3 3 4 3 7 1-2 2-4 2-6 3 3 4 6 1 9" />
        </>
      )}
      {name === "blanket" && (
        <>
          <rect x="8" y="13" width="32" height="22" rx="3" />
          <path d="M8 20h32" />
          <path d="M25.5 23.5l-4 5h5l-4 5" />
        </>
      )}
      {name === "power" && (
        <>
          <rect x="8" y="15" width="28" height="18" rx="2" />
          <path d="M36 20.5h3v7h-3" />
          <path d="M23.5 18.5l-4.5 6h6l-4.5 6" />
        </>
      )}
      {name === "water" && (
        <>
          <path d="M24 8c-5 8-11 14-11 21a11 11 0 0 0 22 0c0-7-6-13-11-21Z" />
          <path d="M19 31c1 3 3 4 6 4" />
        </>
      )}
      {name === "wifi" && (
        <>
          <path d="M8 18c9-8 23-8 32 0" />
          <path d="M14 24c6-5 14-5 20 0" />
          <path d="M20 30c3-2 5-2 8 0" />
          <circle cx="24" cy="36" r="1.5" />
        </>
      )}
      {name === "workspace" && (
        <>
          <rect x="8" y="10" width="32" height="22" rx="1" />
          <path d="M18 39h12M24 32v7M8 27h32" />
        </>
      )}
      {name === "parking" && (
        <>
          <circle cx="24" cy="24" r="17" />
          <path d="M20 34V14h7a6 6 0 0 1 0 12h-7M20 26h7" />
        </>
      )}
      {name === "meals" && (
        <>
          <path d="M12 8v13c0 4 5 4 5 0V8M14.5 8v28M33 36V8c-5 3-7 9-7 15h7" />
        </>
      )}
    </svg>
  );
}

