// Contact destinations supplied by the house.
export const contact: {
  email: string | null;
  phone: string | null;
  bookingUrl: string;
  instagram: string | null;
  whatsapp: string | null;
  googleMaps: string | null;
  website: string;
} = {
  email: "kibberhouse@gmail.com",
  phone: "+919418841713",
  bookingUrl:
    "https://wa.me/918334935131?text=Hi%2C+I%27d+like+to+book+a+stay+at+Kibber+House.+Please+share+availability+and+rates.",
  instagram: "https://www.instagram.com/kibberhouse/",
  whatsapp: "https://wa.me/918334935131?text=Hi%2C+I%27d+like+to+book+a+stay+at+Kibber+House.+Please+share+availability+and+rates.",
  googleMaps: null,
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
