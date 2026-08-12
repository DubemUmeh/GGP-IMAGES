export type SeoPage = {
  slug: string;
  service: string;
  audience: string;
  intent: string;
  title: string;
  heading: string;
  description: string;
  faqs: Array<{ question: string; answer: string }>;
  related: string[];
};

export const serviceHubs = [
  { slug: "large-format-printing", service: "Large Format Printing", audiences: ["retail shops", "events", "construction brands"] },
  { slug: "custom-packaging", service: "Custom Packaging", audiences: ["food brands", "cosmetics brands", "retail products"] },
  { slug: "business-stationery", service: "Business Stationery", audiences: ["startups", "schools", "corporate teams"] },
  { slug: "apparel-printing", service: "Apparel Printing", audiences: ["churches", "schools", "event teams"] },
];

export function createSeoPage(hub: (typeof serviceHubs)[number], audience: string): SeoPage {
  const slug = `${hub.slug}-for-${audience.replaceAll(" ", "-")}`;
  return {
    slug,
    service: hub.service,
    audience,
    intent: `quote-ready buyers comparing ${hub.service.toLowerCase()} for ${audience}`,
    title: `${hub.service} for ${audience} in Takoradi | GGP Images`,
    heading: `${hub.service} for ${audience}`,
    description: `Plan durable, brand-accurate ${hub.service.toLowerCase()} for ${audience} with clear material guidance, finish recommendations, artwork checks, and fast quote support from GGP Images.`,
    faqs: [
      { question: `How do I order ${hub.service.toLowerCase()} for ${audience}?`, answer: "Send your artwork, quantity, size, deadline, and delivery location. Our team reviews production details and replies with a practical quote and timeline." },
      { question: "Can GGP Images help improve my artwork before printing?", answer: "Yes. We check resolution, margins, colors, and file format so your finished print looks professional and consistent with your brand." },
      { question: "What makes this page unique from other service pages?", answer: `This template is matched to the needs of ${audience}, including use cases, buying concerns, service recommendations, and FAQs for that segment.` },
    ],
    related: serviceHubs.filter((item) => item.slug !== hub.slug).slice(0, 3).map((item) => `/printing/${item.slug}-for-${audience.replaceAll(" ", "-")}`),
  };
}

export const seoPages = serviceHubs.flatMap((hub) => hub.audiences.map((audience) => createSeoPage(hub, audience)));
