import type { HubMeta, HubPackageRow, HubTocItem, SeoBlock } from "./seoTypes";

export const OTHER_HUB_PATH = "/services/other-services";
export const OTHER_HUB_UPDATED = "2026-11-10";

export const OTHER = {
  website: "/services/other-services/website-designing",
  logo: "/services/other-services/logo-designing",
  seo: "/services/other-services/seo",
  performance: "/services/other-services/performance-marketing",
  ads: "/services/other-services/ads",
} as const;

export const otherServicesHubMeta: HubMeta = {
  title: "Website Design, SEO & Digital Marketing Services | Filing360",
  description:
    "Website design, logo, SEO, performance marketing and Google and Meta ads management for startups and small businesses, with transparent reporting.",
  h1: "Website, SEO & Digital Marketing Services for Small Businesses",
  keywords: [
    "digital marketing services for small business",
    "website design services",
    "SEO services",
    "performance marketing agency",
    "Google Ads management",
    "Meta ads services",
    "logo design",
  ],
};

export const otherServicesToc: HubTocItem[] = [
  { id: "packages", label: "Packages & pricing" },
  { id: "website", label: "Website designing" },
  { id: "logo", label: "Logo designing" },
  { id: "seo", label: "SEO" },
  { id: "performance", label: "Performance marketing" },
  { id: "ads", label: "Ads management" },
  { id: "together", label: "How they work together" },
  { id: "why", label: "Why Filing360" },
  { id: "faqs", label: "FAQs" },
];

export const otherServicesPackages: HubPackageRow[] = [
  {
    name: "Business website",
    includes: "Mobile-first site, SEO structure, forms and analytics",
    price: "₹5,499",
    href: OTHER.website,
  },
  {
    name: "Logo + brand kit",
    includes: "Original logo with trademark check and brand basics",
    price: "₹2,499",
    href: OTHER.logo,
  },
  {
    name: "SEO",
    includes: "Technical, on-page, content, local SEO and reporting",
    price: "₹9,999",
    href: OTHER.seo,
  },
  {
    name: "Ads management",
    includes: "Google / Meta / LinkedIn management (ad spend extra)",
    price: "₹9,999",
    href: OTHER.ads,
  },
  {
    name: "Performance marketing",
    includes: "Full-funnel strategy, tracking, landing pages and optimisation",
    price: "₹9,999",
    href: OTHER.performance,
  },
];

export const otherServicesArticle: SeoBlock[] = [
  {
    type: "p",
    id: "website",
    title: "Website Designing",
    body: "A website is your 24×7 office. We design fast, mobile-first websites with clear service pages, enquiry forms and WhatsApp integration, built on WordPress, Shopify or modern frameworks depending on your needs.",
  },
  {
    type: "table",
    title: "What you get",
    columns: ["What you get", "Why it matters"],
    rows: [
      ["Mobile-first, fast-loading design", "Most visitors in India browse on phones"],
      ["SEO-ready structure", "Pages are easy for Google to crawl and rank"],
      ["Lead capture", "Forms, click-to-call, WhatsApp and booking"],
      ["Privacy and security", "HTTPS, privacy policy and consent aligned with India’s data protection law"],
      ["Analytics", "Google Analytics and Search Console set up from day one"],
    ],
  },
  {
    type: "p",
    id: "logo",
    title: "Logo Designing",
    body: "An original logo, checked against registered trademarks and assigned to you in writing, plus the brand basics: colours, fonts and versions for every use.",
  },
  {
    type: "p",
    id: "seo",
    title: "SEO (Search Engine Optimisation)",
    body: "SEO brings you visitors who are already searching for what you offer, without paying for every click. We handle technical SEO, on-page optimisation, content, local SEO and link building, and report results every month.",
  },
  {
    type: "p",
    id: "performance",
    title: "Performance Marketing",
    body: "Performance marketing is advertising measured by results: leads, sales and cost per acquisition, not just impressions. We plan the funnel, run campaigns across channels, build landing pages, track conversions and optimise for return on ad spend.",
  },
  {
    type: "p",
    id: "ads",
    title: "Ads Management",
    body: "Hands-on setup and management of campaigns on Google Search, Performance Max, YouTube, Meta (Facebook and Instagram) and LinkedIn, including keyword research, audiences, creatives, bidding and conversion tracking.",
  },
  {
    type: "table",
    id: "together",
    title: "How these services work together",
    columns: ["Stage", "Service"],
    rows: [
      ["Look professional", "Logo and brand identity, website"],
      ["Get found for free", "SEO and Google Business Profile"],
      ["Grow faster", "Performance marketing and ads"],
      ["Measure", "Analytics, monthly reporting and cost per lead"],
    ],
  },
  {
    type: "list",
    id: "why",
    title: "Why choose Filing360?",
    items: [
      "Numbers-first: we track cost per lead and return on spend, not vanity metrics",
      "Small-business friendly: packages that start small and scale with results",
      "No lock-in on assets: your website, ad accounts and analytics stay in your name",
      "One partner for your digital presence and your compliance",
    ],
  },
];

export const otherServicesFaqs = [
  {
    q: "How long does it take to build a website?",
    a: "A business website usually takes 2–4 weeks; e-commerce websites take 4–8 weeks, depending on content and features.",
  },
  {
    q: "Will I own my website and ad accounts?",
    a: "Yes. Domain, hosting, website, Google and Meta ad accounts and analytics are set up in your name.",
  },
  {
    q: "How soon does SEO show results?",
    a: "Usually 3–6 months for long-tail and local searches, longer for competitive terms.",
  },
  {
    q: "Is the ad budget included in your fee?",
    a: "No. Ad spend is paid directly to Google, Meta or LinkedIn from your account; our fee covers strategy and management.",
  },
  {
    q: "Do you guarantee first-page rankings?",
    a: "No one can honestly guarantee rankings. We commit to best-practice work and transparent monthly reporting.",
  },
];
