import { OTHER, OTHER_HUB_PATH } from "./otherServicesHub";
import type { SeoServicePage } from "./seoTypes";

export const otherServicesServicePages: Record<string, SeoServicePage> = {
  "website-designing": {
    slug: "website-designing",
    metaTitle: "Website Design & Development for Small Businesses | Filing360",
    metaDescription:
      "Fast, mobile-first, SEO-ready websites for startups and small businesses: business sites, e-commerce, landing pages, with analytics and lead capture.",
    keywords: [
      "website design services",
      "website development company",
      "business website design",
      "small business website",
      "e-commerce website development",
      "website design cost India",
    ],
    h1: "Website Design and Development",
    lead: "We build websites that load fast, look professional on every screen and turn visitors into enquiries. Every site is built SEO-ready, with analytics set up and full ownership handed over to you.",
    highlights: ["Delivered in 2–4 weeks", "You own everything"],
    cta: "Get a Website Quote",
    imageAlt: "Website design for small businesses by Filing360",
    related: [
      { href: OTHER_HUB_PATH, label: "Digital services hub" },
      { href: OTHER.seo, label: "SEO services" },
      { href: OTHER.logo, label: "Logo designing" },
    ],
    sections: [
      {
        type: "table",
        title: "Types of websites",
        columns: ["Type", "Suits", "Typical platform"],
        rows: [
          ["Business / service website", "Professionals, consultants, service companies", "WordPress or modern frameworks"],
          ["Landing pages", "Ad campaigns, product launches", "Custom or page builders"],
          ["E-commerce", "D2C brands, retailers", "Shopify or WooCommerce"],
          ["Custom web apps", "Portals, dashboards, booking systems", "Custom development"],
        ],
      },
      {
        type: "list",
        title: "What’s included",
        items: [
          "Discovery call and sitemap",
          "Custom design for desktop and mobile",
          "SEO-friendly URLs, titles and headings",
          "Contact forms, click-to-call, WhatsApp and Google Maps",
          "Speed optimisation (Core Web Vitals) and HTTPS",
          "Privacy policy, terms and cookie consent",
          "Google Analytics, Search Console and sitemap submission",
          "Training to update content yourself",
          "Initial free support after launch",
        ],
      },
      {
        type: "steps",
        title: "Our process",
        items: [
          { title: "Discovery", body: "discovery call and sitemap." },
          { title: "Content", body: "you share material, or we write it." },
          { title: "Design", body: "mock-ups and approval." },
          { title: "Build", body: "development and testing on mobile and desktop." },
          { title: "Launch", body: "indexing, analytics and handover." },
        ],
      },
      {
        type: "p",
        title: "Data protection",
        body: "Websites that collect personal data should comply with the Digital Personal Data Protection Act, 2023: clear notices, consent and secure handling. We build these basics into every site.",
      },
    ],
    faqs: [
      {
        q: "Do you write the content?",
        a: "We can, including SEO-optimised service pages.",
      },
      {
        q: "Who owns the domain and hosting?",
        a: "You do; we set them up in your name.",
      },
    ],
  },

  "logo-designing": {
    slug: "logo-designing",
    metaTitle: "Logo Design & Brand Kit for Startups | Filing360",
    metaDescription:
      "Original logo design with trademark availability check, brand colours, fonts and file formats for print and digital.",
    keywords: ["logo design", "brand identity kit", "startup logo", "trademark check logo"],
    h1: "Logo Designing",
    lead: "An original logo, checked against registered trademarks and assigned to you in writing, plus the brand basics: colours, fonts and versions for every use.",
    highlights: ["Trademark check", "Full file pack"],
    cta: "Design My Logo",
    imageAlt: "Logo designing by Filing360",
    related: [
      { href: OTHER_HUB_PATH, label: "Digital services hub" },
      { href: OTHER.website, label: "Website designing" },
    ],
    sections: [
      {
        type: "list",
        title: "What you receive",
        items: [
          "Primary logo and simplified mark",
          "Colour palette and typography guidance",
          "PNG, SVG and print-ready files",
          "Usage notes for website, stationery and social",
          "Basic trademark conflict check before final handover",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a trademark registration included?",
        a: "No. We check conflicts and can refer you for trademark filing separately.",
      },
    ],
  },

  seo: {
    slug: "seo",
    metaTitle: "SEO Services for Small Businesses & Startups | Filing360",
    metaDescription:
      "Technical SEO, on-page optimisation, content, local SEO and link building with monthly reporting. Get more enquiries from Google.",
    keywords: [
      "SEO services",
      "SEO company India",
      "local SEO services",
      "SEO for small business",
      "on-page SEO",
      "technical SEO audit",
    ],
    h1: "SEO Services",
    lead: "Rank for the searches your customers are already making. We fix what holds your site back, create content that answers real questions, and build authority — with clear monthly reports.",
    highlights: ["Free SEO audit to start", "Monthly reporting"],
    cta: "Get My Free SEO Audit",
    imageAlt: "SEO services by Filing360",
    related: [
      { href: OTHER_HUB_PATH, label: "Digital services hub" },
      { href: OTHER.website, label: "Website designing" },
      { href: OTHER.ads, label: "Ads management" },
    ],
    sections: [
      {
        type: "table",
        title: "What we do",
        columns: ["Area", "Work"],
        rows: [
          ["Technical SEO", "Crawling and indexing, site speed, mobile usability, structured data, sitemaps, redirects"],
          ["Keyword research", "Search terms by intent and value, mapped to pages"],
          ["On-page SEO", "Titles, meta descriptions, headings, internal links, image optimisation"],
          ["Content", "Service pages and blogs written for searchers, not just search engines"],
          ["Local SEO", "Google Business Profile, reviews strategy, local citations, city pages"],
          ["Authority", "Quality backlinks from relevant directories, publications and partners"],
          ["Reporting", "Rankings, traffic, leads and next month’s plan"],
        ],
      },
      {
        type: "list",
        title: "What we will not do",
        items: [
          "Buy links, stuff keywords, create doorway pages or promise guaranteed rankings — these tactics risk Google penalties.",
        ],
      },
      {
        type: "table",
        title: "Timeline",
        columns: ["Period", "What to expect"],
        rows: [
          ["Month 1", "Audit, fixes, keyword map, Search Console set up"],
          ["Months 2–3", "Content and local SEO; impressions grow"],
          ["Months 3–6", "Long-tail and local rankings, rising enquiries"],
          ["6 months+", "Competitive terms, compounding traffic"],
        ],
      },
    ],
    faqs: [
      {
        q: "Is SEO better than ads?",
        a: "They work best together: ads bring leads now, SEO builds lasting traffic.",
      },
      {
        q: "Do you work on websites you didn’t build?",
        a: "Yes, after an audit.",
      },
    ],
  },

  "performance-marketing": {
    slug: "performance-marketing",
    metaTitle: "Performance Marketing Services – Leads & ROAS | Filing360",
    metaDescription:
      "Results-driven performance marketing: funnel strategy, multi-channel campaigns, landing pages, conversion tracking and optimisation for CPL and ROAS.",
    keywords: [
      "performance marketing agency",
      "performance marketing services",
      "lead generation agency",
      "ROAS optimisation",
      "digital marketing for D2C",
      "conversion rate optimisation",
    ],
    h1: "Performance Marketing",
    lead: "Spend on marketing that pays for itself. We plan your customer acquisition funnel, run campaigns across the right channels, and optimise every week for cost per lead, cost per acquisition and return on ad spend.",
    highlights: ["Retainer on quote", "Ad spend paid by you"],
    cta: "Plan My Growth",
    imageAlt: "Performance marketing by Filing360",
    related: [
      { href: OTHER_HUB_PATH, label: "Digital services hub" },
      { href: OTHER.ads, label: "Ads management" },
      { href: OTHER.website, label: "Website designing" },
    ],
    sections: [
      {
        type: "list",
        title: "How we work",
        items: [
          "Goals and unit economics: target cost per lead or acquisition based on your margins and customer lifetime value",
          "Funnel plan: awareness, consideration and conversion stages across channels",
          "Tracking: pixels, conversion events, CRM integration and UTM tagging",
          "Landing pages: built and tested for conversion",
          "Campaigns: search, social, video and retargeting",
          "Optimisation: weekly testing of audiences, creatives, bids and pages",
          "Reporting: spend, leads, sales, CPL, CPA and ROAS",
        ],
      },
      {
        type: "table",
        title: "Metrics we manage",
        columns: ["Metric", "Meaning"],
        rows: [
          ["CPL", "Cost per lead"],
          ["CPA / CAC", "Cost per acquisition or customer"],
          ["ROAS", "Revenue ÷ ad spend"],
          ["CVR", "Conversion rate of visitors to leads or sales"],
          ["LTV", "Lifetime value of a customer"],
        ],
      },
      {
        type: "p",
        title: "Who it suits",
        body: "D2C and e-commerce brands, education and coaching, healthcare, real estate, B2B services, and professional firms with a clear service and price.",
      },
    ],
    faqs: [
      {
        q: "How is this different from ads management?",
        a: "Ads management runs campaigns on specific platforms; performance marketing owns the full funnel, tracking, landing pages and cross-channel budget to hit business targets.",
      },
      {
        q: "What budget do I need?",
        a: "It depends on your industry and goals; we start with a test budget and scale what works.",
      },
    ],
  },

  ads: {
    slug: "ads",
    metaTitle: "Google Ads & Meta Ads Management Services | Filing360",
    metaDescription:
      "Setup and management of Google Search, Performance Max, YouTube, Facebook, Instagram and LinkedIn ads, with conversion tracking and monthly reports.",
    keywords: [
      "Google Ads management services",
      "Meta ads services",
      "Facebook ads agency",
      "Instagram ads management",
      "LinkedIn ads for B2B",
      "PPC management",
    ],
    h1: "Google, Meta and LinkedIn Ads Management",
    lead: "Professional setup and day-to-day management of your ad campaigns, so you stop wasting budget on the wrong clicks and start getting enquiries you can measure.",
    highlights: ["Monthly management", "Ad spend excluded"],
    cta: "Manage My Ads",
    imageAlt: "Google and Meta ads management by Filing360",
    related: [
      { href: OTHER_HUB_PATH, label: "Digital services hub" },
      { href: OTHER.performance, label: "Performance marketing" },
      { href: OTHER.seo, label: "SEO services" },
    ],
    sections: [
      {
        type: "table",
        title: "Platforms",
        columns: ["Platform", "Best for"],
        rows: [
          ["Google Search", "Capturing people actively searching for your service"],
          ["Google Performance Max", "E-commerce and lead generation across Google’s network"],
          ["YouTube", "Awareness and explainer videos"],
          ["Meta (Facebook, Instagram)", "Consumer products, local businesses, lead forms, retargeting"],
          ["LinkedIn", "B2B services, hiring, high-value professional audiences"],
        ],
      },
      {
        type: "list",
        title: "What’s included",
        items: [
          "Account setup or audit, in your name",
          "Keyword and audience research",
          "Ad copy and creative guidance",
          "Conversion tracking (forms, calls, WhatsApp, purchases)",
          "Negative keywords and placement exclusions",
          "Bid and budget management",
          "Monthly report with clear next steps",
        ],
      },
    ],
    faqs: [
      {
        q: "Is there a minimum ad spend?",
        a: "No platform minimum for most, but a meaningful test budget is needed to learn what works.",
      },
      {
        q: "Can you take over our existing account?",
        a: "Yes, after an audit of current campaigns.",
      },
    ],
  },
};

export function getOtherServicesServicePage(slug: string) {
  return otherServicesServicePages[slug];
}
