import type { HubMeta, HubPackageRow, HubTocItem, SeoBlock } from "./seoTypes";
import { formatInr } from "./services";

export const STARTUP_HUB_PATH = "/services/startup";
export const STARTUP_HUB_UPDATED = "2026-11-10";

export const STARTUP = {
  dpiit: "/services/startup/startup-india-dpiit",
  prop: "/services/startup/proprietorship",
  partner: "/services/startup/partnership-firm",
  opc: "/services/startup/opc",
  llp: "/services/startup/llp",
  pvt: "/services/startup/private-limited-company",
  section8: "/services/startup/section-8-company",
  trust: "/services/startup/trust-registration",
  public: "/services/startup/public-limited-company",
  producer: "/services/startup/producer-company",
  subsidiary: "/services/startup/indian-subsidiary",
  msme: "/services/startup/msme-registration",
  blogPvt: "/blog/private-limited-company-registration-process",
  blogSec8: "/blog/section-8-vs-trust-vs-society",
} as const;

export const startupHubMeta: HubMeta = {
  title: "Startup Registration, DPIIT & Udyam Services | Filing360",
  description:
    "Register your startup as a company, LLP, OPC or partnership, get DPIIT recognition and Udyam, set up a producer company or Indian subsidiary.",
  h1: "Startup Registration & Launch Services",
  keywords: [
    "startup registration in India",
    "Startup India registration",
    "DPIIT recognition",
    "Udyam registration",
    "company registration for startups",
    "Indian subsidiary registration",
    "producer company registration",
  ],
};

export const startupToc: HubTocItem[] = [
  { id: "packages", label: "Packages & pricing" },
  { id: "structure", label: "Choose the structure" },
  { id: "register", label: "Register the business" },
  { id: "recognition", label: "DPIIT & Udyam" },
  { id: "compliance", label: "Day-one compliance" },
  { id: "why", label: "Why Filing360" },
  { id: "faqs", label: "FAQs" },
];

export const startupPackages: HubPackageRow[] = [
  {
    name: "Private Limited — Launch",
    includes: "SPICe+ incorporation, MOA/AOA, PAN/TAN, dedicated RM",
    price: `From ${formatInr(3000)}`,
    href: STARTUP.pvt,
  },
  {
    name: "Startup India / DPIIT",
    includes: "Eligibility review, portal filing, follow-up until certificate",
    price: formatInr(5500),
    href: STARTUP.dpiit,
  },
  {
    name: "Proprietorship launch",
    includes: "GST + Udyam path and bank-ready proofs",
    price: `From ${formatInr(999)}`,
    href: STARTUP.prop,
  },
  {
    name: "MSME / Udyam",
    includes: "Correct classification and NIC codes (govt registration free)",
    price: "On request",
    href: STARTUP.msme,
  },
  {
    name: "Producer company / FPO",
    includes: "SPICe+ producer company incorporation",
    price: "On request",
    href: STARTUP.producer,
  },
  {
    name: "Indian subsidiary",
    includes: "Incorporation + FEMA reporting support",
    price: "On request",
    href: STARTUP.subsidiary,
  },
];

export const startupArticle: SeoBlock[] = [
  {
    type: "table",
    id: "structure",
    title: "Step 1: Choose the right structure",
    columns: ["Structure", "Owners", "Liability", "Best for"],
    rows: [
      ["Proprietorship", "1", "Unlimited", "Small local businesses, freelancers starting out"],
      ["Partnership firm", "2–50", "Unlimited", "Family or small businesses with low risk"],
      ["LLP", "2+ partners", "Limited", "Professionals, consultancies, service firms"],
      ["One Person Company", "1", "Limited", "Solo founders who want a company"],
      ["Private limited company", "2–200", "Limited", "Startups planning to raise funds or offer ESOPs"],
      ["Public limited company", "7+", "Limited", "Businesses raising money from the public"],
      ["Producer company", "10+ producers", "Limited", "Farmers, FPOs, artisans and other primary producers"],
      ["Indian subsidiary", "Foreign parent + another shareholder", "Limited", "Foreign companies starting operations in India"],
      ["Section 8 company / trust", "2+", "Limited / trustee duty", "Non-profits and social enterprises"],
    ],
    note: "If you plan to raise venture funding, a private limited company is almost always the right choice.",
  },
  {
    type: "p",
    id: "register",
    title: "Step 2: Register the business",
    body: "Private limited, OPC and public limited companies are incorporated through MCA’s SPICe+ form (PAN, TAN and linked registrations). LLPs use FiLLiP. Partnerships need a deed and Registrar of Firms registration. A proprietorship is established through GST, Udyam and shop licences rather than a single incorporation form.",
  },
  {
    type: "list",
    title: "Special structures we also handle",
    items: [
      "Producer company for farmer producer organisations and primary producers",
      "Indian subsidiary for foreign companies setting up in India",
      "Section 8 company and trust registration for non-profits",
    ],
  },
  {
    type: "p",
    id: "recognition",
    title: "Step 3: Get recognitions that save money",
    body: "Startup India (DPIIT) recognition unlocks self-certification under certain labour and environmental laws, cheaper IP filing, relaxed procurement norms, funding access and a path to the three-year tax holiday. Udyam registration is free and opens CGTMSE loans, delayed-payment protection and tender benefits.",
  },
  {
    type: "table",
    id: "compliance",
    title: "Step 4: Set up compliance from day one",
    columns: ["Area", "What to set up"],
    rows: [
      ["Tax", "PAN, TAN, GST (if required), advance tax, TDS"],
      ["Company law", "First board meeting, auditor, share certificates, INC-20A, annual filings"],
      ["Accounting", "Accounting software, books from day one, monthly reconciliations"],
      ["Employment", "EPF, ESI and professional tax once applicable"],
      ["Intellectual property", "Trademark for your brand name and logo"],
    ],
  },
  {
    type: "list",
    id: "why",
    title: "Why founders choose Filing360",
    items: [
      "One team for registration, tax, accounting and compliance",
      "Honest structure advice — even when a cheaper structure fits better",
      "Startup-friendly packages with fixed fees",
      "Fundraising support: cap table, ESOP plans, valuations and investor compliance",
    ],
  },
];

export const startupFaqs = [
  {
    q: "Which structure is best for a startup?",
    a: "A private limited company if you plan to raise investment or offer ESOPs; an LLP for service businesses without outside investors; a proprietorship or OPC for a solo founder testing an idea.",
  },
  {
    q: "Can I get Startup India recognition as a proprietorship?",
    a: "No. Only private limited companies, registered partnership firms and LLPs are eligible.",
  },
  {
    q: "Is Udyam registration free?",
    a: "Yes. Registration on the government Udyam portal is free and paperless, based on Aadhaar, PAN and GST details.",
  },
  {
    q: "Can a foreign company own 100% of an Indian company?",
    a: "In most sectors, yes, under the automatic route for FDI, subject to sectoral rules and approval requirements for investors from countries sharing a land border with India.",
  },
  {
    q: "How long does it take to start a company?",
    a: "Usually 7–15 working days for a private limited company once documents are ready; Startup India recognition and Udyam can follow within days.",
  },
];
