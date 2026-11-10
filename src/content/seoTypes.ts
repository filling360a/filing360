/** Shared SEO content types for hub + service article pages. */

export type SeoBlock =
  | { type: "p"; id?: string; title?: string; body: string }
  | { type: "list"; id?: string; title: string; items: string[] }
  | { type: "steps"; id?: string; title: string; items: { title: string; body: string }[] }
  | { type: "table"; id?: string; title: string; columns: string[]; rows: string[][]; note?: string };

export type SeoServicePage = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  lead: string;
  highlights: string[];
  cta: string;
  imageAlt: string;
  related: { href: string; label: string }[];
  sections: SeoBlock[];
  faqs: { q: string; a: string }[];
  updated?: string;
};

export type HubTocItem = { id: string; label: string };

export type HubTable = { columns: string[]; rows: string[][]; note?: string };

export type HubPackageRow = {
  name: string;
  includes: string;
  price: string;
  href: string;
};

export type HubMeta = {
  title: string;
  description: string;
  h1: string;
  keywords: string[];
};
