import type { Metadata } from "next";

export const siteConfig = {
  name: "GGP Images",
  legalName: "GGP Image and Printing",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ggpimages.com",
  phone: "+233548844321",
  email: "hello@ggpimages.com",
  logo: "/favicon_io/android-chrome-512x512.png",
  ogImage: "/favicon_io/android-chrome-512x512.png",
  address: "ZEN Filling Station via Apremdo New Market, off Apollo, Anaji Rd, Takoradi, Ghana",
};

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function buildMetadata({ title, description, path = "/", keywords = [], type = "website" }: SeoInput): Metadata {
  const canonical = path === "/" ? "/" : path;
  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical },
    keywords,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 512, height: 512, alt: `${siteConfig.name} logo` }],
      locale: "en_GH",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl(siteConfig.ogImage),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: { "@type": "PostalAddress", streetAddress: siteConfig.address, addressLocality: "Takoradi", addressCountry: "GH" },
    priceRange: "$$",
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
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
