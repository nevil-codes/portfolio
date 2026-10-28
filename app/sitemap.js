import { site } from "@/lib/content";

export default function sitemap() {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/resume`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
