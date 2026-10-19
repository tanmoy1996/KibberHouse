import { contact } from "@/content/contact";

export function enquiryWhatsAppUrl(details: Record<string, string>, bookingId: string) {
  const lines = [
    "Hi Kibber House, I'd like to enquire about a stay.",
    `Enquiry reference: ${bookingId}`,
    `Check-in: ${details.checkIn}`,
    `Check-out: ${details.checkOut}`,
    `Adults: ${details.adults}`,
    `Children: ${details.children}`,
  ];
  for (const [key, label] of Object.entries({ name: "Name", phone: "Phone", email: "Email", roomPreference: "Room preference", mealPreference: "Meal preference", requests: "Special requests" })) {
    if (details[key]) lines.push(`${label}: ${details[key]}`);
  }
  lines.push("", "Please confirm availability and rates.");
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}
