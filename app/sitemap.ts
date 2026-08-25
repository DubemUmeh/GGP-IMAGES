import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/programmatic-seo";
import { coreServices } from "@/lib/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/services", "/gallery", "/faq", "/contact"];
  return [...staticRoutes, ...coreServices.map((service) => `/services/${service.slug}`), ...seoPages.map((page) => `/printing/${page.slug}`)].map((url) => ({ url: absoluteUrl(url), lastModified: new Date(), changeFrequency: url.startsWith("/printing") ? "weekly" : "monthly", priority: url === "/" ? 1 : 0.8 }));
}
