// Contact destinations supplied by the house.
export const contact: {
  email: string | null;
  phone: string | null;
  bookingUrl: string;
  instagram: string | null;
  facebook: string | null;
  whatsapp: string | null;
  whatsappNumber: string;
  googleMaps: string | null;
  directions: string;
  coordinates: { lat: number; lng: number };
  website: string;
} = {
  email: "kibberhouse@gmail.com",
  phone: "+919418841713",
  bookingUrl:
    "https://wa.me/918334935131?text=Hi%2C+I%27d+like+to+book+a+stay+at+Kibber+House.+Please+share+availability+and+rates.",
  instagram: "https://www.instagram.com/kibberhouse/",
  // Add the Facebook page URL here; the footer icon appears once it is set.
  facebook: null,
  whatsapp: "https://wa.me/918334935131?text=Hi%2C+I%27d+like+to+book+a+stay+at+Kibber+House.+Please+share+availability+and+rates.",
  // International format without "+", as wa.me expects.
  whatsappNumber: "918334935131",
  // The house's own map pin, shared by the owners.
  googleMaps: "https://www.google.com/maps?q=32.3343312,78.0096013",
  directions: "https://www.google.com/maps/dir/?api=1&destination=32.3343312,78.0096013",
  coordinates: { lat: 32.3343312, lng: 78.0096013 },
  website: "https://kibberhouse.com",
};

export const contactPeople = [
  {
    name: "Tanzin Thinley",
    phone: "+91 94188 41713",
    href: "tel:+919418841713",
  },
  {
    name: "Tamoghna",
    phone: "+91 89049 57053",
    href: "tel:+918904957053",
  },
] as const;
