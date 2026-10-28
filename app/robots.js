import { site } from "@/lib/content";

export default function robots() {
  return {
    // The PDF in public/ is a private-style CV (address, phone, birth date) —
    // keep it out of search results even while it's still deployed.
    rules: { userAgent: "*", allow: "/", disallow: "/resume.pdf" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
