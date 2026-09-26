export type Service = {
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  professionalFeeFrom: number;
  timeline: string;
  inclusions: string[];
  featured?: boolean;
  bestFor: string[];
};

export type Pillar = {
  slug: string;
  name: string;
  description: string;
  services: Service[];
};

export const pillars: Pillar[] = [
  {
    slug: "business-registration",
    name: "Business registration",
    description:
      "Incorporate the right entity for funding, liability, and scale — with clear fees and MCA filing support.",
    services: [
      {
        slug: "private-limited-company",
        name: "Private Limited Company",
        shortName: "Pvt. Ltd.",
        description:
          "The preferred structure for startups raising equity. Limited liability, share capital, and investor-ready governance.",
        professionalFeeFrom: 1499,
        timeline: "7–14 business days",
        inclusions: [
          "Name approval (SPICe+ Part A)",
          "MOA & AOA drafting",
          "DSC support & DIN",
          "Incorporation certificate",
          "Company PAN & TAN",
        ],
        featured: true,
        bestFor: [
          "Startups seeking investment",
          "Teams issuing shares",
          "Service businesses scaling",
        ],
      },
      {
        slug: "llp",
        name: "Limited Liability Partnership",
        shortName: "LLP",
        description:
          "Partnership flexibility with limited liability — ideal for professional firms and consultants.",
        professionalFeeFrom: 1499,
        timeline: "7–12 business days",
        inclusions: [
          "Name reservation",
          "FiLLiP filing",
          "DSC & DPIN support",
          "LLP agreement guidance",
          "PAN & TAN",
        ],
        featured: true,
        bestFor: [
          "Professional services",
          "Partner-led firms",
          "Lower compliance preference",
        ],
      },
      {
        slug: "opc",
        name: "One Person Company",
        shortName: "OPC",
        description:
          "Corporate protection for solo founders — limited liability with single ownership.",
        professionalFeeFrom: 1499,
        timeline: "7–14 business days",
        inclusions: [
          "Name approval",
          "MOA & AOA",
          "DSC & DIN",
          "Nominee setup guidance",
          "PAN & TAN",
        ],
        featured: true,
        bestFor: [
          "Solo founders",
          "Freelancers going corporate",
          "Minimal co-founder setup",
        ],
      },
      {
        slug: "partnership-firm",
        name: "Partnership Firm",
        description: "Register a partnership under the Indian Partnership Act.",
        professionalFeeFrom: 999,
        timeline: "5–10 business days",
        inclusions: ["Deed drafting support", "Registration filing", "PAN guidance"],
        bestFor: ["Small partnerships"],
      },
      {
        slug: "sole-proprietorship",
        name: "Sole Proprietorship",
        description: "Lightweight setup for individual businesses with basic registrations.",
        professionalFeeFrom: 799,
        timeline: "3–7 business days",
        inclusions: ["Udyam / shop guidance", "Bank KYC support"],
        bestFor: ["Solo operators"],
      },
      {
        slug: "public-limited-company",
        name: "Public Limited Company",
        description: "Structure for businesses planning broader capital and public markets.",
        professionalFeeFrom: 9999,
        timeline: "15–25 business days",
        inclusions: ["SPICe+ filing", "Governance setup", "PAN & TAN"],
        bestFor: ["Large-scale capital plans"],
      },
    ],
  },
  {
    slug: "ngo-non-profit",
    name: "NGO & non-profit",
    description:
      "Section 8, trusts, societies, and tax exemptions — structured for mission-driven organisations.",
    services: [
      {
        slug: "section-8-company",
        name: "Section 8 Company",
        description:
          "Non-profit company under the Companies Act for charitable, educational, and social objects.",
        professionalFeeFrom: 4999,
        timeline: "15–30 business days",
        inclusions: [
          "Name & object drafting",
          "License under Section 8",
          "MOA & AOA",
          "Incorporation support",
        ],
        featured: true,
        bestFor: ["Foundations", "Social enterprises", "Education non-profits"],
      },
      {
        slug: "trust-registration",
        name: "Trust Registration",
        description: "Public or private trust registration with deed support.",
        professionalFeeFrom: 3999,
        timeline: "10–20 business days",
        inclusions: ["Trust deed", "Registration filing"],
        bestFor: ["Charitable trusts"],
      },
      {
        slug: "society-registration",
        name: "Society Registration",
        description: "Society registration under state Societies Acts.",
        professionalFeeFrom: 3499,
        timeline: "15–25 business days",
        inclusions: ["Bye-laws", "Registrar filing"],
        bestFor: ["Member-based associations"],
      },
      {
        slug: "12a-80g",
        name: "12A & 80G Registration",
        description: "Income-tax registrations for NGO donor benefits.",
        professionalFeeFrom: 2999,
        timeline: "10–20 business days",
        inclusions: ["Application drafting", "Filing & follow-up"],
        bestFor: ["Registered NGOs seeking donations"],
      },
      {
        slug: "fcra",
        name: "FCRA Registration",
        description: "Foreign contribution compliance for eligible organisations.",
        professionalFeeFrom: 14999,
        timeline: "Varies by MHA",
        inclusions: ["Eligibility review", "Application support"],
        bestFor: ["NGOs receiving foreign funds"],
      },
    ],
  },
  {
    slug: "tax-gst",
    name: "Tax & GST",
    description: "GST, income tax, and notices — filed accurately with clear ownership.",
    services: [
      {
        slug: "gst-registration",
        name: "GST Registration",
        description: "Obtain GSTIN with document checks and portal filing support.",
        professionalFeeFrom: 999,
        timeline: "3–7 business days",
        inclusions: ["Document checklist", "Portal filing", "ARN tracking"],
        featured: true,
        bestFor: ["New businesses", "Crossing turnover thresholds"],
      },
      {
        slug: "itr-filing",
        name: "ITR Filing",
        description: "Individual and business return filing with deduction review.",
        professionalFeeFrom: 799,
        timeline: "2–5 business days",
        inclusions: ["Form selection", "Computation", "e-Filing"],
        bestFor: ["Salaried", "Founders", "Freelancers"],
      },
      {
        slug: "tds-returns",
        name: "TDS Return Filing",
        description: "Quarterly TDS compliance for deductors.",
        professionalFeeFrom: 1499,
        timeline: "Per quarter",
        inclusions: ["Return preparation", "Filing"],
        bestFor: ["Employers", "Companies"],
      },
      {
        slug: "professional-tax",
        name: "Professional Tax",
        description: "State professional tax registration and filings where applicable.",
        professionalFeeFrom: 699,
        timeline: "3–7 business days",
        inclusions: ["State-wise filing"],
        bestFor: ["Employers in PT states"],
      },
    ],
  },
  {
    slug: "intellectual-property",
    name: "Intellectual property",
    description: "Protect names, logos, inventions, and creative work.",
    services: [
      {
        slug: "trademark-registration",
        name: "Trademark Registration",
        description:
          "Search, class selection, and filing for brand names and logos in India.",
        professionalFeeFrom: 1499,
        timeline: "Filing in 3–7 days; exam timeline varies",
        inclusions: [
          "Trademark search",
          "Class recommendation",
          "Application filing",
          "Status tracking",
        ],
        featured: true,
        bestFor: ["Startups branding", "Product names", "Logos"],
      },
      {
        slug: "copyright-registration",
        name: "Copyright Registration",
        description: "Protect original literary, artistic, and software works.",
        professionalFeeFrom: 1999,
        timeline: "Filing in 5–10 days",
        inclusions: ["Application", "Diary number tracking"],
        bestFor: ["Creators", "Software teams"],
      },
      {
        slug: "patent-registration",
        name: "Patent Registration",
        description: "Provisional and complete specification support with attorney network.",
        professionalFeeFrom: 24999,
        timeline: "Varies",
        inclusions: ["Prior-art guidance", "Drafting coordination"],
        bestFor: ["Deep-tech inventors"],
      },
      {
        slug: "design-registration",
        name: "Design Registration",
        description: "Industrial design protection for product appearance.",
        professionalFeeFrom: 3999,
        timeline: "Filing in 7–14 days",
        inclusions: ["Drawings review", "Filing"],
        bestFor: ["Product companies"],
      },
    ],
  },
  {
    slug: "licenses",
    name: "Licenses",
    description: "Trade, food, import-export, and quality certifications to operate legally.",
    services: [
      {
        slug: "fssai",
        name: "FSSAI License",
        description: "Food business registration or license based on turnover and scope.",
        professionalFeeFrom: 1499,
        timeline: "7–15 business days",
        inclusions: ["Category selection", "Portal filing"],
        featured: true,
        bestFor: ["Restaurants", "Food brands", "Cloud kitchens"],
      },
      {
        slug: "shop-establishment",
        name: "Shop & Establishment",
        description: "State shop act registration for commercial establishments.",
        professionalFeeFrom: 999,
        timeline: "5–10 business days",
        inclusions: ["State portal filing"],
        bestFor: ["Offices", "Retail"],
      },
      {
        slug: "iec",
        name: "IEC Registration",
        description: "Import Export Code from DGFT for cross-border trade.",
        professionalFeeFrom: 1499,
        timeline: "3–7 business days",
        inclusions: ["DGFT filing", "IEC allotment support"],
        bestFor: ["Exporters", "Importers"],
      },
      {
        slug: "msme-udyam",
        name: "MSME / Udyam",
        description: "Udyam registration for MSME benefits.",
        professionalFeeFrom: 499,
        timeline: "1–3 business days",
        inclusions: ["Online registration"],
        bestFor: ["MSMEs"],
      },
      {
        slug: "iso",
        name: "ISO Certification",
        description: "ISO 9001 and related certifications via accredited partners.",
        professionalFeeFrom: 9999,
        timeline: "Varies by scope",
        inclusions: ["Gap guidance", "Partner coordination"],
        bestFor: ["Process-driven firms"],
      },
    ],
  },
  {
    slug: "mca-secretarial",
    name: "MCA / secretarial",
    description: "Stay compliant after incorporation — annual filings and event-based changes.",
    services: [
      {
        slug: "annual-filings",
        name: "Annual Filings (AOC-4 / MGT-7)",
        description: "Yearly ROC returns for private limited companies.",
        professionalFeeFrom: 2999,
        timeline: "Per filing season",
        inclusions: ["Form preparation", "MCA filing"],
        featured: true,
        bestFor: ["Pvt. Ltd. companies"],
      },
      {
        slug: "director-changes",
        name: "Appointment / Resignation of Directors",
        description: "DIR forms and board resolutions for director events.",
        professionalFeeFrom: 2499,
        timeline: "5–10 business days",
        inclusions: ["Resolutions", "MCA forms"],
        bestFor: ["Growing boards"],
      },
      {
        slug: "name-change",
        name: "Change of Company Name",
        description: "Name approval and MoA amendment filings.",
        professionalFeeFrom: 3999,
        timeline: "10–20 business days",
        inclusions: ["RUN/SPICe+", "Altered MoA"],
        bestFor: ["Rebrands"],
      },
      {
        slug: "registered-office-change",
        name: "Change of Registered Office",
        description: "Within city, state, or across RoC jurisdictions.",
        professionalFeeFrom: 2999,
        timeline: "7–20 business days",
        inclusions: ["INC forms", "Address proof review"],
        bestFor: ["Relocations"],
      },
    ],
  },
  {
    slug: "global-incorporation",
    name: "Global incorporation",
    description: "Set up abroad with coordinated partners in key jurisdictions.",
    services: [
      {
        slug: "uae-company",
        name: "Company Registration — UAE",
        description: "Mainland and free-zone company setup coordination.",
        professionalFeeFrom: 49999,
        timeline: "Varies by zone",
        inclusions: ["Partner coordination", "Document checklist"],
        featured: true,
        bestFor: ["Cross-border founders"],
      },
      {
        slug: "singapore-company",
        name: "Company Registration — Singapore",
        description: "Pte. Ltd. incorporation support.",
        professionalFeeFrom: 39999,
        timeline: "Varies",
        inclusions: ["Partner filing", "KYC guidance"],
        bestFor: ["APAC expansion"],
      },
      {
        slug: "usa-company",
        name: "Company Registration — USA",
        description: "LLC / C-Corp formation coordination in popular states.",
        professionalFeeFrom: 29999,
        timeline: "Varies",
        inclusions: ["State filing coordination"],
        bestFor: ["US market entry"],
      },
      {
        slug: "uk-company",
        name: "Company Registration — UK",
        description: "Ltd company formation with Companies House partners.",
        professionalFeeFrom: 24999,
        timeline: "Varies",
        inclusions: ["Partner filing"],
        bestFor: ["UK operations"],
      },
    ],
  },
  {
    slug: "advisory",
    name: "Advisory",
    description: "Expert time for decisions that paperwork alone cannot solve.",
    services: [
      {
        slug: "ca-consultation",
        name: "CA Consultation",
        description: "Structured call with a chartered accountant on structure, tax, or compliance.",
        professionalFeeFrom: 999,
        timeline: "Same / next day slots",
        inclusions: ["30–45 min session", "Written summary"],
        featured: true,
        bestFor: ["Founders choosing a structure"],
      },
      {
        slug: "virtual-cfo",
        name: "Virtual CFO",
        description: "Ongoing financial oversight for growing companies.",
        professionalFeeFrom: 24999,
        timeline: "Monthly retainer",
        inclusions: ["MIS", "Compliance calendar", "Board packs"],
        bestFor: ["Seed to Series A"],
      },
      {
        slug: "contracts",
        name: "Contracts & Agreements",
        description: "Founders’ agreements, NDAs, and commercial contracts.",
        professionalFeeFrom: 4999,
        timeline: "5–10 business days",
        inclusions: ["Draft + 1 revision"],
        bestFor: ["Early teams"],
      },
    ],
  },
];

export const pathPickers = [
  {
    id: "startup",
    label: "I’m starting a company",
    description:
      "Pvt. Ltd., LLP, or OPC — name, DSC, SPICe+, PAN & TAN in one flow.",
    href: "/services/business-registration",
  },
  {
    id: "tax",
    label: "I need GST or tax filings",
    description:
      "GST registration, returns, and basic tax compliance for your business.",
    href: "/services/tax-gst",
  },
  {
    id: "brand",
    label: "I want to protect my brand",
    description:
      "Trademark search and filing so your name and logo stay yours.",
    href: "/services/intellectual-property",
  },
  {
    id: "ngo",
    label: "I’m registering an NGO",
    description:
      "Section 8, trust, society, 12A/80G — guided by compliance experts.",
    href: "/services/ngo-non-profit",
  },
] as const;

export function getPillar(slug: string) {
  return pillars.find((p) => p.slug === slug);
}

export function getService(pillarSlug: string, serviceSlug: string) {
  const pillar = getPillar(pillarSlug);
  if (!pillar) return null;
  const service = pillar.services.find((s) => s.slug === serviceSlug);
  if (!service) return null;
  return { pillar, service };
}

export function getAllFeaturedServices() {
  return pillars.flatMap((pillar) =>
    pillar.services
      .filter((s) => s.featured)
      .map((service) => ({ pillar, service })),
  );
}

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const faqs = [
  {
    q: "Is Filing360 a government website?",
    a: "No. Filing360 is a private facilitation platform. Company registrations, GSTINs, and trademarks are issued only by government authorities such as the Ministry of Corporate Affairs (MCA), GSTN, and IP India.",
  },
  {
    q: "What is included in the professional fee vs government fees?",
    a: "Professional fees cover expert guidance, document drafting support, and filing assistance. Government fees, state stamp duty, and Digital Signature Certificate (DSC) costs are extra and vary by state, authorised capital, and entity type. We share the full estimate in writing before you pay.",
  },
  {
    q: "How long does Private Limited company registration take in India?",
    a: "With complete documents and DSC ready, most resident incorporations take about 7–14 business days. Name objections, incomplete proofs, or MCA queries can extend this. Foreign or NRI directors usually need more time for apostille and notarisation.",
  },
  {
    q: "What documents are required to register a company?",
    a: "Typically: PAN and Aadhaar of directors/subscribers, photographs, address proof, registered office proof with owner NOC, and DSC for signing. Exact requirements depend on whether you choose Pvt. Ltd., LLP, or OPC and whether directors are residents.",
  },
  {
    q: "Can I use my home address as the registered office?",
    a: "Yes. In most cases a residential address can be used if you provide a recent utility bill and a No Objection Certificate from the owner, as required under MCA norms.",
  },
  {
    q: "Which is better — Private Limited, LLP, or OPC?",
    a: "Pvt. Ltd. suits startups planning equity funding and ESOPs. LLP suits professional partnerships wanting limited liability with lighter governance. OPC suits a single founder who wants corporate protection with a nominee. We’ll recommend based on your goals on the consultation call.",
  },
  {
    q: "Do I need GST registration when I incorporate?",
    a: "Not always on day one. GST is typically required when you cross the turnover threshold, sell online across states, or otherwise fall under mandatory categories. Many founders add GSTIN via SPICe+ AGILE-PRO-S or right after incorporation — we advise based on your model.",
  },
  {
    q: "Do you help after incorporation?",
    a: "Yes. You can add GST registration, trademark, and annual MCA compliance (AOC-4, MGT-7, director KYC, etc.) on the same desk so you don’t chase multiple vendors.",
  },
];
