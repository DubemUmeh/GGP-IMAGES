import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/programmatic-seo";
import { coreServices } from "@/lib/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/gallery", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/booking", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  ];

  const services = coreServices.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));

  const audiencePages = seoPages.map((page) => ({
    path: `/printing/${page.slug}`,
    priority: 0.72,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...services, ...audiencePages].map((entry) => ({
    url: absoluteUrl(entry.path),
    priority: entry.priority,
    changeFrequency: entry.changeFrequency,
  }));
}
