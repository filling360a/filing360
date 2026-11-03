import { company } from "@/content/company";

/** Central brand config — phone/WhatsApp stay in sync with `company.contact`. */
export const siteConfig = {
  brandName: "Filing360",
  tagline: "Your business. Our priority.",
  logo: {
    src: "/images/Filingedge360_logo_v2_transparent.png",
    width: 1319,
    height: 290,
  },
  description:
    "Online company registration, GST, ITR filing and MCA compliance in India — transparent CA-backed fees for Private Limited, LLP, OPC and more.",
  url: "https://filingedge360.com",
  contact: {
    email: company.contact.email,
    phone: company.contact.phone,
    /** WhatsApp number (display). */
    phoneAlt: company.contact.whatsappDisplay,
    phoneDisplay: company.contact.phoneDisplay,
    phoneTel: company.contact.phoneTel,
    whatsapp: company.contact.whatsapp,
    whatsappDisplay: company.contact.whatsappDisplay,
  },
  socialProof: {
    rating: "4.8",
    reviewsLabel: "12,400+ reviews",
    businesses: "50,000+",
    callbackMins: "10",
  },
  cta: {
    browse: "Browse services",
    expert: "Talk to an expert",
    start: "Get started",
    quote: "Get free consultation",
    quoteInstant: "Get free quote",
  },
} as const;

export const leadInterestOptions = [
  "Private Limited Company Registration",
  "LLP / OPC / Partnership Registration",
  "Section 8 / Trust Registration",
  "GST Registration",
  "GST Return Filing",
  "Income Tax Return (ITR) Filing",
  "Tax Planning",
  "Annual MCA Compliance",
  "Accounting & Bookkeeping",
  "CMA Report",
  "TEV Report",
  "Pitch Deck for Startup",
  "Website Designing",
  "Logo Designing",
  "SEO",
  "Performance Marketing",
  "Ads",
  "Not sure — advise me",
] as const;
