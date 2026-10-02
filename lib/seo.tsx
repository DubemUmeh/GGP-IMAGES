import type { Metadata } from "next";

export const siteConfig = {
  name: "GGP Images",
  legalName: "GGP IMAGES",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ggpimages.com",
  phone: "0200749306",
  whatsapp: "233243901264",
  email: "info@ggpimages.com",
  logo: "/favicon_io/android-chrome-512x512.png",
  ogImage: "/new-ggp-logo.jpg",
  address:
    "ZEN Filling Station Apremdo, Abenbebom Off Apollo - Anaji Rd, Takoradi, Ghana",
  facebook: "https://www.facebook.com/share/19c5xzaheu/",
  tiktok: "https://www.tiktok.com/@ggpimages?_r=1&_t=ZS-99idChlLCxp",
  instagram: "https://www.instagram.com/ggp_images_gh?igsh=enBqMjB4bWk4aTRh",
};

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  ogImage?: string;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  type = "website",
  ogImage = siteConfig.ogImage,
}: SeoInput): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: path === "/" ? "/" : path },
    keywords: keywords.length ? keywords : undefined,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: { telephone: true, email: true, address: false },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      images: [{ url: absoluteUrl(ogImage), width: 1200, height: 630, alt: `${siteConfig.name} — printing and branding in Takoradi` }],
      locale: "en_GH",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absoluteUrl("#organization"),
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl(siteConfig.ogImage),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Takoradi",
      addressRegion: "Western Region",
      addressCountry: "GH",
    },
    areaServed: [
      { "@type": "City", name: "Takoradi" },
      { "@type": "AdministrativeArea", name: "Western Region" },
      { "@type": "Country", name: "Ghana" },
    ],
    sameAs: [siteConfig.facebook, siteConfig.instagram, siteConfig.tiktok],
    priceRange: "$$",
    knowsAbout: [
      "commercial printing",
      "large format printing",
      "textile printing",
      "embroidery",
      "corporate branding",
      "visual production",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("#website"),
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": absoluteUrl("#organization") },
    inLanguage: "en-GH",
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  image?: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: absoluteUrl(service.path),
    ...(service.image ? { image: absoluteUrl(service.image) } : {}),
    provider: { "@id": absoluteUrl("#organization") },
    areaServed: [
      { "@type": "City", name: "Takoradi" },
      { "@type": "AdministrativeArea", name: "Western Region" },
      { "@type": "Country", name: "Ghana" },
    ],
    serviceType: service.name,
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
