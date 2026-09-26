/** Central brand config */
export const siteConfig = {
  brandName: "Filing360",
  tagline: "Your business. Our priority.",
  description:
    "Online company registration and compliance in India — Private Limited, LLP, OPC, GST, trademark, and NGO filings with transparent professional fees + government charges.",
  url: "https://filing360.in",
  contact: {
    email: "hello@filing360.in",
    phone: "+91 98765 43210",
    phoneAlt: "+91 98765 43211",
    phoneDisplay: "98765 43210 · 98765 43211",
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
  "LLP Registration",
  "One Person Company (OPC)",
  "GST Registration",
  "Trademark Registration",
  "Section 8 / NGO Registration",
  "Annual MCA Compliance",
  "Not sure — advise me",
] as const;
