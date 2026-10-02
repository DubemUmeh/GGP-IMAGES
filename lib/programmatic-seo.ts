import { coreServices } from "@/lib/services";

export type SeoPage = {
  slug: string;
  service: string;
  audience: string;
  intent: string;
  title: string;
  heading: string;
  description: string;
  intro: string;
  considerations: string[];
  faqs: Array<{ question: string; answer: string }>;
  related: string[];
};

const audienceProfiles = {
  businesses: {
    label: "Businesses",
    needs: ["consistent brand presentation", "professional customer-facing materials", "reliable production timelines"],
  },
  schools: {
    label: "Schools",
    needs: ["uniformity across student materials", "clear institutional identification", "repeatable print requirements"],
  },
  "churches-and-events": {
    label: "Churches and Events",
    needs: ["event visibility", "coordinated branded materials", "deadline-sensitive production"],
  },
} as const;

export const serviceHubs = coreServices.map((service) => ({
  slug: service.slug,
  service: service.name,
}));

function profileFor(audience: string) {
  return audienceProfiles[audience as keyof typeof audienceProfiles] ?? audienceProfiles.businesses;
}

export function createSeoPage(
  hub: (typeof serviceHubs)[number],
  audienceKey: keyof typeof audienceProfiles,
): SeoPage {
  const audience = profileFor(audienceKey);
  const slug = `${hub.slug}-for-${audienceKey}`;

  return {
    slug,
    service: hub.service,
    audience: audience.label,
    intent: `quote-ready customers looking for ${hub.service.toLowerCase()} for ${audience.label.toLowerCase()} in Takoradi`,
    title: `${hub.service} for ${audience.label} in Takoradi | GGP Images`,
    heading: `${hub.service} for ${audience.label}`,
    description: `${hub.service} for ${audience.label.toLowerCase()} in Takoradi. GGP Images helps with ${audience.needs[0]}, ${audience.needs[1]}, and practical production planning.`,
    intro: `${hub.service} often has different production requirements depending on who will use the finished work. For ${audience.label.toLowerCase()}, GGP Images focuses on ${audience.needs.join(", ")}.`,
    considerations: [
      `Choose materials and finishing around ${audience.needs[0]}.`,
      `Confirm quantities and artwork early when ${audience.needs[1]} is important.`,
      `Share the final deadline so production can be planned around ${audience.needs[2]}.`,
    ],
    faqs: [
      {
        question: `How do I order ${hub.service.toLowerCase()} for ${audience.label.toLowerCase()}?`,
        answer: `Send the required quantity, dimensions or specifications, artwork status, deadline, and delivery location. GGP Images can then recommend the appropriate production route.`,
      },
      {
        question: `Can GGP Images help prepare artwork for ${hub.service.toLowerCase()}?`,
        answer: "Yes. Artwork can be reviewed for resolution, dimensions, margins, colour, readability, and production suitability before the job is finalized.",
      },
      {
        question: `What should I include when requesting a ${hub.service.toLowerCase()} quote?`,
        answer: `Include the intended use, quantity, size, preferred material or finish if known, deadline, and delivery requirements. Attach existing artwork where available.`,
      },
    ],
    related: serviceHubs.filter((item) => item.slug !== hub.slug).slice(0, 3).map((item) => `/services/${item.slug}`),
  };
}

export const seoPages = serviceHubs.flatMap((hub) =>
  (Object.keys(audienceProfiles) as Array<keyof typeof audienceProfiles>).map((audience) =>
    createSeoPage(hub, audience),
  ),
);

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}
