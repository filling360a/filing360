import type { Metadata } from "next";
import { company, fullAddress, hasValue, legalEntity, socialLinks } from "@/content/company";
import { siteConfig } from "@/lib/siteConfig";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url).replace(/\/$/, "");

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Use the exact title without the "· Filing360" suffix. */
  absoluteTitle?: boolean;
  noindex?: boolean;
  type?: "website" | "article";
  keywords?: string[];
};

/** Canonical, Open Graph and Twitter metadata for a page in one call. */
export function pageMetadata({ title, description, path, absoluteTitle, noindex, type = "website", keywords }: PageMeta): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: siteConfig.brandName,
      locale: "en_IN",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

const ORG_ID = `${SITE_URL}/#organization`;

export function organizationJsonLd() {
  const address = fullAddress();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.brandName,
    legalName: hasValue(company.legalName) ? company.legalName : undefined,
    url: SITE_URL,
    logo: absoluteUrl(siteConfig.logo.src),
    description: siteConfig.description,
    email: company.contact.email,
    telephone: company.contact.phone,
    foundingDate: hasValue(company.foundingYear) ? company.foundingYear : undefined,
    address: address
      ? {
          "@type": "PostalAddress",
          streetAddress: [company.address.street, company.address.locality].filter(hasValue).join(", ") || undefined,
          addressLocality: company.address.city,
          addressRegion: company.address.state,
          postalCode: company.address.postalCode || undefined,
          addressCountry: company.address.country,
        }
      : undefined,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: company.contact.phone,
        email: company.contact.supportEmail,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        contactType: "WhatsApp",
        telephone: company.contact.whatsappDisplay,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: socialLinks().map((s) => s.url).concat(hasValue(company.googleBusinessProfileUrl) ? [company.googleBusinessProfileUrl] : []),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: siteConfig.brandName,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Local business entity for the contact page and city pages. */
export function localBusinessJsonLd() {
  const address = fullAddress();
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: siteConfig.brandName,
    legalName: legalEntity(),
    url: SITE_URL,
    image: absoluteUrl("/icon.png"),
    telephone: company.contact.phone,
    email: company.contact.email,
    priceRange: "₹₹",
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: address ? [company.address.street, company.address.locality].filter(hasValue).join(", ") || undefined : undefined,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.postalCode || undefined,
      addressCountry: company.address.country,
    },
    geo: company.geo ? { "@type": "GeoCoordinates", latitude: company.geo.lat, longitude: company.geo.lng } : undefined,
    hasMap: hasValue(company.mapsUrl) ? company.mapsUrl : undefined,
    areaServed: { "@type": "Country", name: "India" },
    openingHoursSpecification: company.hours.schema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  category: string;
  offers: { name: string; price: number; description?: string }[];
  areaServed?: string;
}) {
  const prices = input.offers.map((o) => o.price);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.category,
    provider: { "@id": ORG_ID },
    areaServed: input.areaServed ? { "@type": "City", name: input.areaServed } : { "@type": "Country", name: "India" },
    offers:
      prices.length > 0
        ? {
            "@type": "AggregateOffer",
            priceCurrency: "INR",
            lowPrice: Math.min(...prices),
            highPrice: Math.max(...prices),
            offerCount: prices.length,
            offers: input.offers.map((o) => ({
              "@type": "Offer",
              name: o.name,
              price: o.price,
              priceCurrency: "INR",
              description: o.description,
              availability: "https://schema.org/InStock",
              url: absoluteUrl(input.path),
            })),
          }
        : undefined,
  };
}

export function webPageJsonLd(input: { name: string; description: string; path: string; type?: string; dateModified?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": ORG_ID },
    dateModified: input.dateModified,
  };
}
