import { HomePage } from "@/components/home/HomePage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ description: site.description, path: "/" });

export default function Home() {
  return <HomePage />;
}
