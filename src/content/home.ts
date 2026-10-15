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
    "From startup registration to GST, income tax, and MCA compliance — everything you need to start, run, and grow your business, with expert support.",
  trust: "Trusted by 100,000+ businesses",
  items: [
    {
      name: "Section 8 Company",
      feeFrom: 2899,
      feeNote: "+ GST & govt. fees",
      timeline: "7–10 days",
      blurb:
        "Non-profit company with RD licence, MOA & AOA drafting, PAN & TAN — start your NGO legally.",
      href: "/services/startup/section-8-company",
      tone: "pink",
    },
    {
      name: "Private Limited Company",
      feeFrom: 3000,
      feeNote: "Incl. GST · govt. fees extra",
      timeline: "7–10 days",
      blurb:
        "CA-backed incorporation with a dedicated RM. GST-inclusive fee — pay just 50% to start.",
      href: "/services/startup/private-limited-company",
      tone: "blue",
    },
    {
      name: "GST Registration",
      feeFrom: 999,
      feeNote: "+ GST",
      timeline: "3–7 business days",
      blurb:
        "Your GSTIN, done in no time — application, TRN, ARN and certificate handled by Filing360.",
      href: "/services/gst/gst-registration",
      badge: "Most popular",
      tone: "green",
    },
    {
      name: "Income Tax Return (ITR)",
      feeFrom: 999,
      feeNote: "+ GST",
      timeline: "Filed by experts",
      blurb:
        "ITR plans for salary, house property, business, capital gains, F&O, crypto, NRIs and foreign income.",
      href: "/services/income-tax/itr-filing-individual",
      tone: "purple",
    },
    {
      name: "Annual MCA Compliance",
      feeFrom: 19899,
      feeNote: "+ GST & govt. fees",
      timeline: "Per financial year",
      blurb:
        "AOC-4, MGT-7, ITR-6 and director KYC with a dedicated accountant and compliance advisor.",
      href: "/services/mca/company-compliance",
      tone: "orange",
    },
    {
      name: "Limited Liability Partnership",
      feeFrom: 2899,
      feeNote: "+ GST & govt. fees",
      timeline: "7–10 days",
      blurb:
        "Ideal for consultants and professional firms — limited liability with lighter annual compliance.",
      href: "/services/startup/llp",
      tone: "sky",
    },
    {
      name: "One Person Company",
      feeFrom: 2899,
      feeNote: "+ GST & govt. fees",
      timeline: "7–10 days",
      blurb:
        "Solo founders who want company protection without a co-founder — requires a nominee.",
      href: "/services/startup/opc",
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
      href: "/services/startup/private-limited-company",
      accent: "blue",
    },
    {
      id: "llp",
      short: "LLP",
      href: "/services/startup/llp",
      accent: "green",
    },
    {
      id: "opc",
      short: "OPC",
      href: "/services/startup/opc",
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
        { text: "₹3,000 incl. GST + Govt. fees", tone: "fee" },
        { text: "₹2,899 + GST + Govt. fees", tone: "fee" },
        { text: "₹2,899 + GST + Govt. fees", tone: "fee" },
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
        "Proprietorship, partnership, LLP, OPC or Pvt. Ltd. — name approval, PAN & TAN in one flow.",
      href: "/services/startup",
      icon: "/images/startheresection/01_starting_company_icon.png",
    },
    {
      id: "tax",
      label: "I need GST registration or returns",
      description:
        "GST registration, monthly and quarterly returns, LUT and annual returns — filed by accountants.",
      href: "/services/gst",
      icon: "/images/startheresection/02_gst_tax_filings_icon.png",
    },
    {
      id: "income-tax",
      label: "I need to file income tax",
      description:
        "ITR filing, tax planning, TDS returns and notices — plans for every kind of income.",
      href: "/services/income-tax",
      icon: "itr",
    },
    {
      id: "ngo",
      label: "I’m registering an NGO",
      description:
        "Section 8 company or trust registration, with 12A & 80G — guided filings for non-profits.",
      href: "/services/startup/section-8-company",
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
      "MCA / GST / Income Tax charges",
      "State stamp duty (varies by state and capital)",
      "DSC costs (varies by entity)",
      "Confirmed in writing first",
    ],
    footerTitle: "You pay exactly what the government charges.",
    footerBody: "We share the breakdown upfront, in writing.",
  },
  upsells: {
    title: "No surprise upsells",
    body: "Optional add-ons (GST, income tax, annual ROC) are offered after you understand the base package — never forced at checkout.",
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
      body: "GST, income tax, and annual MCA compliance on the same platform so you don’t juggle three vendors.",
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
    "income-tax": {
      blurb: "Tax planning, ITR filing, TDS returns and notices.",
      highlights: ["Tax planning from ₹99", "ITR filing from ₹999", "TDS · notices · PAN/TAN"],
      tone: "purple",
    },
    gst: {
      blurb: "Registration, returns by accountants, LUT and amendments.",
      highlights: ["GST registration ₹999", "Monthly returns ₹999/month", "LUT · GSTR-10 · revocation"],
      tone: "green",
    },
    startup: {
      blurb: "Register the right structure for your business.",
      highlights: [
        "Pvt. Ltd. from ₹3,000 incl. GST",
        "LLP · OPC from ₹2,899",
        "Partnership · proprietorship",
        "Section 8 · trust · DPIIT",
      ],
      tone: "blue",
    },
    mca: {
      blurb: "Stay compliant after incorporation — annual filings & changes.",
      highlights: ["Company · LLP · OPC compliance", "Director & DIN filings", "MOA / AOA / capital changes"],
      tone: "sky",
    },
    consultation: {
      blurb: "Talk to an expert before you decide.",
      highlights: ["Business structure", "GST & income tax", "MCA questions"],
      tone: "indigo",
    },
    accounting: {
      blurb: "Bookkeeping and financial statements, done for you.",
      highlights: ["Monthly bookkeeping", "Reconciliations", "Financial statements"],
      tone: "teal",
    },
    "other-services": {
      blurb: "Specialist finance and brand services for growing teams.",
      highlights: ["Logo · SOP designing", "Ind AS · IFRS · consolidation", "MIS dashboards"],
      tone: "amber",
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
  body: "Filing360 helps founders with business registration, compliance and government filings. Expert-led support for MCA, GST, and Income Tax — so you can focus on what you do best.",
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
    "Top platforms win lifetime value with post-incorporation services. Filing360 keeps GST, income tax, and ROC on the same desk.",
  secondaryCta: "View all compliance services",
  secondaryHref: "/services/mca",
  footerNote: "GST • Income Tax • ROC — all on one desk",
  highlights: [
    { title: "GST", body: "Keep returns on track", tone: "blue" },
    { title: "Income Tax", body: "File ITR on time", tone: "purple" },
    { title: "ROC", body: "Stay compliant always", tone: "green" },
  ],
  items: [
    {
      title: "GST registration & returns",
      body: "GSTIN in no time, then monthly or quarterly returns filed by a dedicated accountant.",
      href: "/services/gst",
      icon: "gst",
      badge: "Popular",
      badgeIcon: "fire",
      tone: "blue",
    },
    {
      title: "Income tax filing",
      body: "Business ITR, TDS returns and tax planning — filed accurately and on time.",
      href: "/services/income-tax",
      icon: "itr",
      badge: "Save more tax",
      badgeIcon: "crown",
      tone: "purple",
    },
    {
      title: "Annual MCA compliance",
      body: "AOC-4, MGT-7, director KYC — avoid late fees and ROC notices.",
      href: "/services/mca/company-compliance",
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
        "Registered our Pvt. Ltd. and got GST sorted without juggling three different agencies.",
      name: "Vikram S.",
      role: "Co-founder, D2C brand",
      service: "Pvt. Ltd. + GST",
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
