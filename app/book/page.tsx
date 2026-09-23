import { redirect } from "next/navigation";
import { contact } from "@/content/contact";

export default function Page() {
  redirect(contact.bookingUrl);
}
