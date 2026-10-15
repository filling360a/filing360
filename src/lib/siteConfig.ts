/** Central brand config */
export const siteConfig = {
  brandName: "Filing360",
  tagline: "Your business. Our priority.",
  logo: {
    src: "/images/Filingedge360_Primary_logo_transparent.png",
    width: 1357,
    height: 312,
  },
  description:
    "Income tax, GST, startup registration and MCA compliance in India — Private Limited, LLP, OPC, GST returns and ITR filing with transparent professional fees + government charges.",
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
  "LLP / OPC / Partnership Registration",
  "Section 8 / Trust Registration",
  "GST Registration",
  "GST Return Filing",
  "Income Tax Return (ITR) Filing",
  "Tax Planning",
  "Annual MCA Compliance",
  "Accounting & Bookkeeping",
  "Not sure — advise me",
] as const;
