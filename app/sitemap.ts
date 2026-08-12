import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/programmatic-seo";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/services", "/gallery", "/faq", "/contact"];
  return [...staticRoutes, ...seoPages.map((page) => `/printing/${page.slug}`)].map((url) => ({ url: absoluteUrl(url), lastModified: new Date(), changeFrequency: url.startsWith("/printing") ? "weekly" : "monthly", priority: url === "/" ? 1 : 0.8 }));
}
