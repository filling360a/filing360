/**
 * Filing360 homepage content — researched vs RegisterKaro, IndiaFilings,
 * Vakilsearch/Zolvit, Razorpay Rize, Startupwala, StartYourCompany, IncorpX.
 *
 * Section strategy (post-hero) to beat competitors:
 * 1. Popular services + fees — every winner puts this first
 * 2. Pvt Ltd vs LLP vs OPC — AEO differentiator (usually buried in blogs)
 * 3. Audience paths — Zolvit-style Start / Tax / Brand / NGO
 * 4. How it works — 3 clear steps
 * 5. Fee clarity — honest professional vs govt fees (IncorpX/RegisterEase gap)
 * 6. Why Filing360 — RegisterKaro-style contrast without fluff
 * 7. Documents checklist — AEO answers “what documents do I need?”
 * 8. Full marketplace pillars
 * 9. Expert-led proof block
 * 10. After incorporation — GST / TM / MCA upsell
 * 11. Mid-page lead form
 * 12. Reviews
 * 13. FAQ — answer-engine ready
 */

export const homePopular = {
  title: "Everything your business needs, under one roof",
  subtitle:
    "From company registration to taxes, licenses, and intellectual property — everything you need to start, run, and grow your business, with expert support.",
  trust: "Trusted by 100,000+ businesses",
  items: [
    {
      name: "Section 8 Company",
      feeFrom: 4999,
      timeline: "15–30 business days",
      blurb:
        "Non-profit company under the Companies Act for charitable, educational, or social objects.",
      href: "/services/ngo-non-profit/section-8-company",
      tone: "pink",
    },
    {
      name: "Private Limited Company",
      feeFrom: 1499,
      timeline: "7–14 business days",
      blurb:
        "Best for startups raising equity or issuing ESOPs. Limited liability, share capital, investor-ready.",
      href: "/services/business-registration/private-limited-company",
      tone: "blue",
    },
    {
      name: "GST Registration",
      feeFrom: 999,
      timeline: "3–7 business days",
      blurb:
        "Get your GSTIN for B2B invoices, e-commerce, or when you cross the turnover threshold.",
      href: "/services/tax-gst/gst-registration",
      badge: "Most popular",
      tone: "green",
    },
    {
      name: "Trademark Registration",
      feeFrom: 1499,
      timeline: "Filing in 3–7 days",
      blurb:
        "Protect your brand name and logo. We handle search, TM-A filing, and examination follow-up.",
      href: "/services/intellectual-property/trademark-registration",
      tone: "purple",
    },
    {
      name: "MCA / Secretarial",
      feeFrom: 2999,
      timeline: "Per filing season",
      blurb:
        "Annual ROC filings, director changes, and event-based MCA compliance after incorporation.",
      href: "/services/mca-secretarial",
      tone: "orange",
    },
    {
      name: "Limited Liability Partnership",
      feeFrom: 1499,
      timeline: "7–12 business days",
      blurb:
        "Ideal for consultants and professional firms — limited liability with lighter annual compliance.",
      href: "/services/business-registration/llp",
      tone: "sky",
    },
    {
      name: "One Person Company",
      feeFrom: 1499,
      timeline: "7–14 business days",
      blurb:
        "Solo founders who want company protection without a co-founder — requires a nominee.",
      href: "/services/business-registration/opc",
      tone: "teal",
    },
  ],
} as const;

export const homeCompare = {
  title: "Not sure whether to choose Private Limited, LLP, or OPC?",
  subtitle:
    "Compare key differences, see what fits your goals, and get expert guidance — all in one place.",
  entities: [
    {
      id: "pvt",
      short: "Private Limited",
      href: "/services/business-registration/private-limited-company",
      accent: "blue",
    },
    {
      id: "llp",
      short: "LLP",
      href: "/services/business-registration/llp",
      accent: "green",
    },
    {
      id: "opc",
      short: "OPC",
      href: "/services/business-registration/opc",
      accent: "orange",
    },
  ],
  rows: [
    {
      label: "Best for",
      cells: [
        { text: "Startups planning funding / ESOPs" },
        { text: "Professional firms & consultants" },
        { text: "Solo founders wanting a company" },
      ],
    },
    {
      label: "Founders required",
      cells: [
        { text: "2 directors + 2 shareholders" },
        { text: "2 designated partners" },
        { text: "1 director + 1 nominee" },
      ],
    },
    {
      label: "Liability",
      cells: [
        { text: "Limited", tone: "good" },
        { text: "Limited", tone: "good" },
        { text: "Limited", tone: "good" },
      ],
    },
    {
      label: "Fundraising",
      cells: [
        { text: "Strong (equity / VC)", tone: "good" },
        { text: "Limited", tone: "neutral" },
        { text: "Limited until conversion", tone: "neutral" },
      ],
    },
    {
      label: "Compliance",
      cells: [
        { text: "Higher (ROC annual filings)", tone: "warn" },
        { text: "Lighter (Form 8 & 11)", tone: "good" },
        { text: "Company-like", tone: "info" },
      ],
    },
    {
      label: "Starting fee",
      cells: [
        { text: "₹1,499 + Govt. fees", tone: "fee" },
        { text: "₹1,499 + Govt. fees", tone: "fee" },
        { text: "₹1,499 + Govt. fees", tone: "fee" },
      ],
    },
  ],
  feeNote: "Government fees are additional and shown transparently during checkout.",
  cta: {
    title: "Still not sure which structure fits you?",
    subtitle:
      "Talk to our experts and get a personalised recommendation — at no extra cost.",
  },
  sidebar: {
    title: "Need a recommendation?",
    subtitle:
      "Answer a quick question — we’ll suggest the right structure and call you back.",
    benefits: [
      "Quick 2-minute assessment",
      "Personalized recommendation",
      "Free expert consultation",
      "No obligation",
    ],
  },
} as const;

export const homePaths = {
  eyebrow: "Start here",
  title: "What do you need help with?",
  subtitle:
    "Pick your path. We match you to a specialist and a clear fee estimate — the same journey model top platforms use, without the clutter.",
  items: [
    {
      id: "startup",
      label: "I’m starting a company",
      description:
        "Pvt. Ltd., LLP, or OPC — name check, DSC, SPICe+/FiLLiP, PAN & TAN in one flow.",
      href: "/services/business-registration",
      icon: "/images/startheresection/01_starting_company_icon.png",
    },
    {
      id: "tax",
      label: "I need GST or tax filings",
      description:
        "GST registration, returns, and basic tax compliance so you stay filing-ready.",
      href: "/services/tax-gst",
      icon: "/images/startheresection/02_gst_tax_filings_icon.png",
    },
    {
      id: "brand",
      label: "I want to protect my brand",
      description:
        "Trademark search and filing so your name and logo stay yours.",
      href: "/services/intellectual-property",
      icon: "/images/startheresection/03_trademark_brand_icon.png",
    },
    {
      id: "ngo",
      label: "I’m registering an NGO",
      description:
        "Section 8, trust, society, 12A/80G — guided filings for non-profits.",
      href: "/services/ngo-non-profit",
      icon: "/images/startheresection/04_ngo_registration_icon.png",
    },
  ],
} as const;

export const homeHow = {
  eyebrow: "How it works",
  title: "Three steps. Clear status. Certificate in hand.",
  subtitle:
    "Same conversion flow winners use: enquire → talk to an expert → we file until the authority issues your registration.",
  track: [
    { label: "Enquire" },
    { label: "Get Estimate" },
    { label: "We File" },
  ],
  steps: [
    {
      title: "Tell us what you need",
      body: "Share your name, mobile, city, and service. Takes under a minute — no payment to enquire.",
      short: "Enquire",
    },
    {
      title: "Get a clear fee estimate",
      body: "A specialist confirms entity type, documents, professional fees, and government charges before you pay.",
      short: "Get Estimate",
    },
    {
      title: "We file. You track.",
      body: "DSC, drafting, MCA / GST / IP India filing and follow-ups until your certificate or GSTIN is issued.",
      short: "We File",
    },
  ],
  trust: [
    { label: "No hidden fees" },
    { label: "Expert guidance" },
    { label: "Real-time updates" },
  ],
} as const;

export const homePricing = {
  title: "Professional fees vs government fees — always separated",
  subtitle:
    "Competitors often blur this. Filing360 shows both so you never discover stamp duty after you pay.",
  professional: {
    title: "Professional fee",
    subtitle: "Our service fees for end-to-end support",
    items: [
      "Expert guidance from qualified professionals",
      "Document drafting and compliance support",
      "Portal filing assistance",
      "Status updates until completion",
    ],
    footerTitle: "One partner. End-to-end support.",
    footerBody: "From documents to delivery, we’ve got you covered.",
  },
  government: {
    title: "Government fees",
    subtitle: "Statutory charges paid to the government",
    items: [
      "MCA / GST / IP India charges",
      "State stamp duty (varies by state and capital)",
      "DSC costs (varies by entity)",
      "Confirmed in writing first",
    ],
    footerTitle: "You pay exactly what the government charges.",
    footerBody: "We share the breakdown upfront, in writing.",
  },
  upsells: {
    title: "No surprise upsells",
    body: "Optional add-ons (GST, trademark, annual ROC) are offered after you understand the base package — never forced at checkout.",
    footerTitle: "Your goals, your choice.",
    footerBody: "Add services only when you need them.",
  },
  trust: [
    {
      title: "No hidden charges",
      sub: "What you see is what you pay.",
    },
    {
      title: "Written estimate first",
      sub: "Exact total shared before filing.",
    },
    {
      title: "Transparent checkout",
      sub: "Full cost breakdown, always.",
    },
  ],
  note: "Typical all-in for a resident Pvt. Ltd. with ₹1 lakh capital often lands roughly ₹4,000–₹15,000 depending on state stamp duty and DSC — we quote your exact total before filing.",
} as const;

export const homeWhy = {
  title: "Built to fix what frustrates founders on other platforms",
  subtitle:
    "A better way to start and grow your business — transparent, expert-led, and built for founders.",
  items: [
    {
      title: "Honest fee split",
      body: "Professional fee and government charges called out separately — before payment, not in the fine print.",
      icon: "fee",
      badge: "Clear pricing",
      tone: "blue",
    },
    {
      title: "One named specialist",
      body: "A dedicated expert owns your filing. No rotating scripts or “your ticket has been escalated.”",
      icon: "specialist",
      badge: "Your expert",
      tone: "green",
    },
    {
      title: "Right entity first",
      body: "We help you choose Pvt. Ltd., LLP, or OPC for your goals — not the package with the highest margin.",
      icon: "entity",
      badge: "Right advice",
      tone: "purple",
    },
    {
      title: "Same desk after incorporation",
      body: "GST, trademark, and annual MCA compliance on the same platform so you don’t juggle three vendors.",
      icon: "desk",
      badge: "Long-term partner",
      tone: "orange",
    },
  ],
  contrast: [
    {
      bad: "Blurred “all-inclusive” prices that hide stamp duty",
      good: "Written estimate with govt. fees itemised",
    },
    {
      bad: "Pressure to buy extras on day one",
      good: "Optional add-ons after incorporation",
    },
    {
      bad: "Anonymous call-centre handoffs",
      good: "Named specialist through certificate",
    },
  ],
  benefits: [
    { title: "Transparent", body: "No hidden costs", icon: "shield" },
    { title: "Founder-first", body: "Your goals, not ours", icon: "people" },
    { title: "Expert-led", body: "Qualified professionals", icon: "award" },
  ],
  cta: "Talk to an expert",
  ctaNote:
    "Get clarity on your registration, compliance and more — in a free consultation.",
  noteTop: "A simpler,\nfairer way",
} as const;

export const homeDocuments = {
  title: "Documents usually needed for company registration",
  subtitle:
    "For a typical Private Limited / OPC with resident directors. Exact list depends on your case — we’ll confirm on the consultation call.",
  items: [
    {
      label: "PAN and Aadhaar of directors / subscribers",
      icon: "id",
    },
    {
      label: "Passport-size photograph",
      icon: "photo",
    },
    {
      label: "Address proof (utility bill / bank statement, recent)",
      icon: "home",
    },
    {
      label: "Registered office proof + owner NOC (home address OK in most cases)",
      icon: "doc",
    },
    {
      label: "Digital Signature Certificate (DSC) for signing filings",
      icon: "pen",
    },
    {
      label: "For NRI / foreign directors: apostilled / notarised passport & address proofs",
      icon: "globe",
    },
  ],
  tip: "Not sure about your case? Our experts will guide you with the exact list.",
  trust: ["100% Confidential", "No obligation", "Trusted by 10,000+ founders"],
} as const;

export const homeMarketplace = {
  title: "All registrations & compliance in one place",
  subtitle:
    "From company registration to ongoing compliance, get expert support, transparent pricing, and end-to-end service — all in one place.",
  /** Short card blurbs + 3 checklist highlights */
  cards: {
    "business-registration": {
      blurb: "Incorporate the right entity with clear fees and MCA support.",
      highlights: [
        "Pvt. Ltd. · LLP · OPC",
        "Partnership & proprietorship",
        "Name + SPICe+ support",
      ],
      tone: "blue",
    },
    "ngo-non-profit": {
      blurb: "Section 8, trusts, societies, and tax exemptions.",
      highlights: ["Section 8 company", "Trust & society", "12A / 80G / FCRA"],
      tone: "purple",
    },
    "tax-gst": {
      blurb: "GST, income tax, and notices — filed accurately.",
      highlights: ["GST registration", "ITR & TDS", "Notice support"],
      tone: "green",
    },
    "intellectual-property": {
      blurb: "Protect names, logos, inventions, and creative work.",
      highlights: [
        "Trademark filing",
        "Copyright & design",
        "Patent coordination",
      ],
      tone: "amber",
    },
    licenses: {
      blurb: "Trade, food, import-export, and quality certifications.",
      highlights: ["FSSAI · Shop Act", "IEC · MSME / Udyam", "ISO partners"],
      tone: "teal",
    },
    "mca-secretarial": {
      blurb: "Stay compliant after incorporation — annual filings & changes.",
      highlights: [
        "Annual ROC filings",
        "Director changes",
        "Name / office updates",
      ],
      tone: "sky",
    },
    "global-incorporation": {
      blurb: "Set up abroad with coordinated partners.",
      highlights: ["UAE · Singapore", "USA · UK", "Partner-led setup"],
      tone: "violet",
    },
    advisory: {
      blurb: "Expert time for decisions paperwork alone can't solve.",
      highlights: ["CA consultation", "Virtual CFO", "Contracts & agreements"],
      tone: "indigo",
    },
  } as Record<
    string,
    {
      blurb: string;
      highlights: string[];
      tone: "blue" | "purple" | "green" | "amber" | "teal" | "sky" | "violet" | "indigo";
    }
  >,
  bar: [
    {
      title: "Expert guidance",
      body: "Work with experienced professionals",
      icon: "people",
    },
    {
      title: "Transparent pricing",
      body: "Clear fees before you pay",
      icon: "tag",
    },
    {
      title: "One platform",
      body: "Registration to compliance",
      icon: "bolt",
    },
    {
      title: "Trusted by businesses",
      body: "Founders across India",
      icon: "shield",
    },
  ],
  noteLeft: "Start · Build ·\nStay Compliant",
  noteRight: "Your Compliance\nPartner",
} as const;

export const homeHuman = {
  eyebrow: "Expert-led filings",
  titleLead: "You build the business.",
  titleAccent: "We handle the paperwork.",
  body: "Filing360 helps founders with business registration, compliance and government filings. Expert-led support for MCA, GST, and IP India — so you can focus on what you do best.",
  points: [
    {
      label: "Name availability & objection handling",
      icon: "search",
    },
    {
      label: "MOA / AOA or LLP deed drafting support",
      icon: "doc",
    },
    {
      label: "DSC, DIN/DPIN, and portal filings",
      icon: "shield",
    },
    {
      label: "Clear status updates until certificate delivery",
      icon: "chart",
    },
  ],
  filings: [
    { title: "MCA Registration", badge: "MCA" },
    { title: "GST Registration", badge: "GST" },
    { title: "IP India Trademarks", badge: "IP" },
  ],
  noteLeft: "You build the\nnext big thing",
  noteRight: "From registration to\ncompliance and beyond",
  stats: [
    { title: "10,000+ Businesses", body: "supported", icon: "people" },
    { title: "Transparent pricing", body: "No hidden costs", icon: "rupee" },
    { title: "Dedicated specialist", body: "From start to finish", icon: "user" },
    { title: "Regular updates", body: "Until certificate delivery", icon: "bolt" },
  ],
} as const;

export const homeNext = {
  eyebrow: "After incorporation",
  title: "Registration is day one — stay compliant from day two",
  subtitle:
    "Top platforms win lifetime value with post-incorporation services. Filing360 keeps GST, brand, and ROC on the same desk.",
  secondaryCta: "View all compliance services",
  secondaryHref: "/services/mca-secretarial",
  footerNote: "GST • Trademark • ROC — all on one desk",
  highlights: [
    { title: "GST", body: "Keep returns on track", tone: "blue" },
    { title: "Trademark", body: "Protect your brand", tone: "purple" },
    { title: "ROC", body: "Stay compliant always", tone: "green" },
  ],
  items: [
    {
      title: "GST registration & returns",
      body: "GSTIN via AGILE-PRO-S or separate filing, then return support as you scale.",
      href: "/services/tax-gst",
      icon: "gst",
      badge: "Popular",
      badgeIcon: "fire",
      tone: "blue",
    },
    {
      title: "Trademark protection",
      body: "Lock your brand name and logo before copycats do.",
      href: "/services/intellectual-property",
      icon: "tm",
      badge: "Protect your brand",
      badgeIcon: "crown",
      tone: "purple",
    },
    {
      title: "Annual MCA compliance",
      body: "AOC-4, MGT-7, director KYC — avoid late fees and ROC notices.",
      href: "/services/mca-secretarial",
      icon: "mca",
      badge: "Avoid late fees",
      badgeIcon: "chart",
      tone: "green",
    },
  ],
} as const;

export const homeMidCta = {
  eyebrow: "Free consultation",
  title: "Not sure which entity fits — Pvt. Ltd., LLP, or OPC?",
  body: "Tell us your plans. We’ll recommend a structure, share a fee breakdown with government charges, and list the documents you need.",
} as const;

export const homeReviews = {
  eyebrow: "Founder feedback",
  titleLead: "What people say after",
  titleAccent: "filing with us",
  subtitle:
    "Trusted by 10,000+ founders, freelancers and growing businesses across India.",
  items: [
    {
      quote:
        "Name objection was sorted in one round. The quote matched what we paid — including stamp duty.",
      name: "Ananya R.",
      role: "Founder, SaaS startup",
      service: "Private Limited",
      initials: "AR",
    },
    {
      quote:
        "Registered our Pvt. Ltd. and trademark without juggling three different agencies.",
      name: "Vikram S.",
      role: "Co-founder, D2C brand",
      service: "Pvt. Ltd. + TM",
      initials: "VS",
    },
    {
      quote:
        "Section 8 paperwork was explained in plain language. No pressure to buy extras.",
      name: "Meera K.",
      role: "Trustee, non-profit",
      service: "Section 8",
      initials: "MK",
    },
  ],
} as const;

export const homeReadyCta = {
  title: "Ready to register your company?",
  body: "Get expert guidance, transparent pricing and end-to-end support for registration and compliance — all in one place.",
  points: ["Expert consultation", "Transparent pricing", "End-to-end support"],
} as const;

export const homeDisclaimer =
  "Filing360 is a private company providing process facilitation. This is not a government website. Registrations and approvals are issued solely by the relevant government authorities (MCA, GSTN, IP India, etc.). Timelines depend on complete documentation and authority processing." as const;
