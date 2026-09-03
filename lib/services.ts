export type ServiceSubdivision = {
  slug: string;
  name: string;
  children?: ServiceSubdivision[];
};

export type CoreService = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  benefits: string[];
  process: string[];
  subdivisions: ServiceSubdivision[];
};

export const coreServices = [
  {
    slug: "digital-printing",
    name: "Digital Printing",
    shortDescription:
      "Sharp, dependable everyday print products for businesses, schools, churches, events, and institutions.",
    description:
      "From business cards and invitation cards to certificates, booklets, photocopying, scanning, lamination, and promotional print materials, our digital printing service is built for clean detail, practical turnaround, and professional presentation.",
    image: "/service-image/digital-printing.png",
    benefits: [
      "Fast setup for short and medium runs",
      "Professional finishing options",
      "Reliable color and detail for everyday brand materials",
    ],
    process: [
      "Share your artwork, copy, quantity, and preferred size.",
      "We confirm paper stock, finishing, timeline, and production details.",
      "Your approved job is printed, finished, quality checked, and prepared for pickup or delivery.",
    ],
    subdivisions: [
      "ID Cards & Access Cards",
      "Invitation Cards",
      "Certificate & Testimonials",
      "Business Cards",
      "Flyers & Brochures",
      "Magazine & Booklets",
      "Photocopying & Document Printing",
      "Scanning & Lamination Services",
      "Promotional Print Materials",
    ].map(toSubdivision),
  },
  {
    slug: "textile-printing",
    name: "Textile Printing",
    shortDescription:
      "Custom garment and fabric printing for events, uniforms, churches, schools, and corporate teams.",
    description:
      "We produce practical textile printing for T-shirts, DTF, UV DTF, uniforms, commemorative cloths, corporate apparel, and custom event wear with a focus on durability, clarity, and brand consistency.",
    image: "/service-image/textile-printing.png",
    benefits: [
      "Suitable for uniforms, campaigns, events, and groups",
      "Options for detailed artwork and full-color designs",
      "Production guidance for garment type, placement, and quantity",
    ],
    process: [
      "Send the design, garment type, sizes, quantity, and deadline.",
      "We recommend the right print method and confirm placement.",
      "Items are produced, inspected, sorted, and prepared for collection or delivery.",
    ],
    subdivisions: [
      "T-Shirt Printing",
      "DTF Printing",
      "UV DTF Printing",
      "School Uniform Printing",
      "Church Anniversary Cloths",
      "Memorial & Ceremonial Cloths",
      "Corporate Apparel Printing",
      "Custom Event Wear",
    ].map(toSubdivision),
  },
  {
    slug: "embroidery",
    name: "Embroidery",
    shortDescription:
      "Durable stitched branding for polos, uniforms, jackets, hoodies, workwear, and towels.",
    description:
      "Embroidery gives apparel a polished, long-lasting finish. We help organizations apply names, logos, crests, and identity marks to uniforms and garments with a professional stitched result.",
    image: "/service-image/embroidery.png",
    benefits: [
      "Premium professional appearance",
      "Long-lasting branded finish",
      "Ideal for uniforms and frequent-wear apparel",
    ],
    process: [
      "Provide your logo or text, garment type, and quantity.",
      "We confirm stitch placement, size, and thread direction.",
      "Production is completed and checked for neatness and consistency.",
    ],
    subdivisions: [
      "Polo Shirt Embroidery",
      "Corporate Uniform Embroidery",
      "School Uniform Embroidery",
      "Jacket Embroidery",
      "Workwear Embroidery",
      "Hoodie Embroidery",
      "Towel Embroidery",
    ].map(toSubdivision),
  },
  {
    slug: "large-format-printing",
    name: "Large Format Printing",
    shortDescription:
      "High-impact banners, billboards, backdrops, roll-ups, scaffold wraps, and outdoor displays.",
    description:
      "Large format printing helps brands get seen at distance and at scale. We support indoor and outdoor display needs with practical material recommendations for visibility, durability, and installation context.",
    image: "/service-image/large-format-printing.png",
    benefits: [
      "Built for visibility and scale",
      "Material guidance for indoor and outdoor use",
      "Strong options for events, construction, and campaigns",
    ],
    process: [
      "Share dimensions, location, artwork, and installation requirements.",
      "We confirm material, finishing, eyelets, hemming, or stand options.",
      "Your display is printed, finished, and prepared for installation or pickup.",
    ],
    subdivisions: [
      "Banners",
      "Billboards",
      "Backdrops",
      "Roll-up Banners",
      "Scaffold Wraps for Construction",
      "Outdoor Advertising Prints",
      "Event Display Materials",
    ].map(toSubdivision),
  },
  {
    slug: "branding",
    name: "Branding",
    shortDescription:
      "Brand identity, rebranding, packaging, labels, stickers, uniforms, and promotional products.",
    description:
      "Our branding service helps businesses create consistent visual identity across design, packaging, labels, stickers, corporate wear, and promotional products including mugs, pens, keyholders, and souvenirs.",
    image: "/service-image/branding.png",
    benefits: [
      "Consistent identity across print and products",
      "Design-to-production support",
      "Practical branded items customers can keep and use",
    ],
    process: [
      "Tell us your brand goal, audience, use case, and required items.",
      "We align designs, materials, finishes, and production options.",
      "Approved branded assets are produced and checked for consistency.",
    ],
    subdivisions: [
      "Corporate Branding",
      "Logo Design & Brand Identity",
      "Business Rebranding",
      "Packaging Branding",
      "Labels & Stickers",
      "Cutting & Plottering",
      "Corporate Uniform Branding",
    ]
      .map(toSubdivision)
      .concat([
        {
          slug: "promotional-products-branding",
          name: "Promotional Products Branding",
          children: [
            "Branded Mugs",
            "Branded Pens",
            "Keyholders",
            "Souvenirs",
          ].map(toSubdivision),
        },
      ]),
  },
  {
    slug: "visual-production",
    name: "Visual Production",
    shortDescription:
      "Design and digital production support for campaigns, websites, presentations, events, and content.",
    description:
      "Visual Production covers the creative assets that help your brand communicate clearly online, in print, and at events, from graphic design and social media designs to website development, digital marketing, content, and corporate presentations.",
    image: "/service-image/visual-production.png",
    benefits: [
      "Cohesive visuals across digital and print",
      "Support for campaigns, events, and business communication",
      "Creative direction linked to practical production needs",
    ],
    process: [
      "Share your objective, audience, channels, and deadline.",
      "We shape the creative direction and confirm deliverables.",
      "Final visuals are prepared for publishing, printing, or presentation.",
    ],
    subdivisions: [
      "Graphic Design",
      "Social Media Designs",
      "Website Design & Development",
      "Digital Marketing",
      "Content",
      "Event Visual Materials",
      "Corporate Presentation Designs",
    ].map(toSubdivision),
  },
] as const satisfies CoreService[];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toSubdivision(name: string): ServiceSubdivision {
  return { slug: slugify(name), name };
}

export const serviceOptions = coreServices.map((service) => service.name);
export const serviceSlugOptions = coreServices.map((service) => service.slug);

export function getServiceBySlug(slug: string) {
  return coreServices.find((service) => service.slug === slug);
}

export function getServiceByName(name: string) {
  return coreServices.find((service) => service.name === name);
}

export function flattenSubdivisions(service: CoreService) {
  return service.subdivisions.flatMap((item) => [
    item,
    ...(item.children ?? []),
  ]);
}

export function getSubdivision(serviceSlug: string, subdivisionSlug?: string) {
  const service = getServiceBySlug(serviceSlug);
  if (!service || !subdivisionSlug) return undefined;
  return flattenSubdivisions(service).find(
    (subdivision) => subdivision.slug === subdivisionSlug,
  );
}

export function isValidServiceSubdivision(
  serviceSlug: string,
  subdivisionSlug: string,
) {
  return Boolean(getSubdivision(serviceSlug, subdivisionSlug));
}

export const SUBDIVISION_KEY_SEPARATOR = ":::";

export function buildSubdivisionKey(
  serviceSlug: string,
  subdivisionSlug: string,
) {
  return `${serviceSlug}${SUBDIVISION_KEY_SEPARATOR}${subdivisionSlug}`;
}

export function parseSubdivisionKey(
  key: string,
): { serviceSlug: string; subdivisionSlug: string } | null {
  const [serviceSlug, subdivisionSlug] = key.split(SUBDIVISION_KEY_SEPARATOR);
  if (!serviceSlug || !subdivisionSlug) return null;
  return { serviceSlug, subdivisionSlug };
}

export function resolveSubdivisionKey(key: string) {
  const parsed = parseSubdivisionKey(key);
  if (!parsed) return null;
  const service = getServiceBySlug(parsed.serviceSlug);
  const subdivision = getSubdivision(
    parsed.serviceSlug,
    parsed.subdivisionSlug,
  );
  if (!service || !subdivision) return null;
  return { service, subdivision };
}
