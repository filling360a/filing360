/**
 * Service catalogue — mirrors the Filing360 sheet (tabs, packages, prices).
 * Prices are professional fees in INR; government charges are always extra.
 */

export type Package = {
  name: string;
  /** Short label above the name, e.g. "Salaried professionals" */
  audience?: string;
  description?: string;
  /** Omit for "price on request" */
  price?: number;
  /** Struck-through list price */
  originalPrice?: number;
  /** Billing unit shown after the price, e.g. "month", "year", "change request" */
  per?: string;
  priceNote?: string;
  /** Advance needed to start work */
  advance?: number;
  bestFor?: string;
  inclusionsLabel?: string;
  inclusions: string[];
  popular?: boolean;
};

export type CoverageRow = {
  label: string;
  values: (boolean | string)[];
  /** Starts a new labelled block of rows */
  group?: string;
};

export type DataTable = {
  title: string;
  intro?: string;
  firstColumn: string;
  columns: string[];
  rows: { label: string; detail?: string; values: string[] }[];
  total?: { label: string; values: string[] };
};

export type Service = {
  slug: string;
  name: string;
  shortName?: string;
  heading: string;
  tagline: string;
  about?: { title: string; body?: string; points?: string[] };
  why?: { title: string; intro?: string; points: string[]; outro?: string };
  /** Short selling points shown as chips in the hero */
  highlights?: string[];
  positioning?: string;
  compareHref?: string;
  usps?: { title: string; body: string }[];
  packages: Package[];
  coverage?: { title?: string; firstColumn?: string; columns: string[]; rows: CoverageRow[] };
  tables?: DataTable[];
  /** Government charges always billed separately */
  govtFees?: { label: string; amount: string }[];
  /** Applies to the whole service, e.g. transaction / turnover limits */
  scope?: string;
  addOns?: string[];
  notes?: string[];
  terms?: string[];
  tool?: { label: string; href: string; body: string };
  timeline?: string;
  featured?: boolean;
};

export type ServiceGroup = {
  name?: string;
  services: Service[];
};

export type Pillar = {
  slug: string;
  name: string;
  description: string;
  groups: ServiceGroup[];
  services: Service[];
};

const EXCL_GST = "*exclusive of GST";
const EXCL_GST_GOVT = "*exclusive of GST & govt. fees";
const EXCL_TAXES = "*exclusive of taxes";

/** Terms that apply to every package on the site */
export const generalTerms = [
  "All prices are Filing360 professional fees and exclusive of GST (18%) unless stated otherwise.",
  "Government fees, stamp duty, notary and DSC charges are payable by the client at actuals.",
  "Work starts once the advance payment and complete documents are received.",
  "Timelines depend on government portal processing and department approvals, which are outside our control.",
  "Anything outside the listed inclusions — department visits, notices, extra filings or revisions — is quoted separately before we begin.",
  "Annual and multi-year packages cover the stated period from the date of onboarding.",
];

/* ------------------------------------------------------------------ */
/* Shared GST packages (used across several GST tabs)                  */
/* ------------------------------------------------------------------ */

const gstMonthlyPkg: Package = {
  name: "Monthly Filing",
  description:
    "Monthly GST return filing covering both GSTR-1 and GSTR-3B, so every submission is accurate and on time.",
  price: 999,
  per: "month",
  priceNote: EXCL_GST,
  inclusions: ["Dedicated Accountant", "GSTR-1 Filing", "GSTR-3B Filing"],
};

const gstYearPkg: Package = {
  name: "1 Year GST Filing",
  description:
    "A dedicated GST professional handles all your return filings for the year — accurately and on time.",
  price: 7899,
  per: "year",
  priceNote: EXCL_GST,
  inclusions: [
    "Dedicated Accountant",
    "12 Months GSTR-1 Filing",
    "12 Months GSTR-3B Filing",
  ],
  popular: true,
};

const gstYearAnnualPkg: Package = {
  name: "1 Year GST Filing + GST Annual Return",
  description:
    "Complete GST compliance for businesses with turnover up to ₹40 lakh — monthly returns, books-vs-GST reconciliation and your annual return, handled by one Filing360 accountant.",
  price: 19899,
  per: "year",
  priceNote: EXCL_GST,
  inclusions: [
    "Dedicated Accountant",
    "GSTR-1 Filing — 12 Months",
    "GSTR-3B Filing — 12 Months",
    "Books-vs-GST Reconciliation",
    "GSTR-9 Preparation & Filing",
    "GSTR-9C Filing (if required)",
    "ITC Reconciliation",
  ],
};

const gstYearAnnualItrPkg: Package = {
  name: "1 Year GST Filing + GST Annual Return + ITR",
  description:
    "Everything in the annual plan plus your financial statements and income tax return — complete tax compliance for businesses with turnover up to ₹40 lakh, on one Filing360 desk.",
  price: 24899,
  per: "year",
  priceNote: EXCL_GST,
  inclusions: [
    "Dedicated Accountant",
    "GSTR-1 Filing — 12 Months",
    "GSTR-3B Filing — 12 Months",
    "Income Tax Filing",
    "Financial Statements",
    "Books-vs-GST Reconciliation",
    "GSTR-9 Preparation & Filing",
    "GSTR-9C Filing (if required)",
  ],
};

const gstRegistrationPkg: Package = {
  name: "GST Registration",
  description:
    "Complete GST registration with expert support throughout — from application to your GSTIN certificate.",
  price: 999,
  per: "one-time",
  priceNote: EXCL_GST,
  inclusions: ["GST Registration Support", "GST Certificate along with GSTIN"],
};

const RETURN_SCOPE =
  "Return filing plans cover up to 250 transactions a month and turnover up to ₹20 lakh. Higher volumes are quoted separately.";

const monthlyReturnAbout = {
  title: "GST returns, sorted every month",
  points: [
    "GSTR-1 & GSTR-3B? We file them for you",
    "Never miss a deadline with our due-date reminders",
    "A real accountant handles your filing, not a bot",
    "Help with e-invoices and e-way bills whenever you need it",
  ],
};

/* ------------------------------------------------------------------ */
/* Startup incorporation inclusions                                    */
/* ------------------------------------------------------------------ */

const companyIncorporationNote =
  "Register your company in just 7–10 days — online and hassle-free. Fully managed incorporation with complete documentation support. Government fees and DSC charges are borne by the client.";
const companyComplianceNote =
  "Register your company in just 7–10 days with complete incorporation, compliance and accounting support. Government fees and DSC charges are borne by the client.";

/* ------------------------------------------------------------------ */
/* Catalogue                                                           */
/* ------------------------------------------------------------------ */

function pillar(p: Omit<Pillar, "services">): Pillar {
  return { ...p, services: p.groups.flatMap((g) => g.services) };
}

export const pillars: Pillar[] = [
  pillar({
    slug: "income-tax",
    name: "Income Tax",
    description:
      "Tax planning, ITR filing for every kind of taxpayer, TDS returns, notices and PAN/TAN — handled by tax experts.",
    groups: [
      {
        name: "Tax planning & e-filing",
        services: [
          {
            slug: "tax-planning",
            name: "Tax Planning",
            heading: "Tax Planning",
            tagline:
              "Maximise your financial potential with Filing360 — personalised tax planning for salaried individuals, businesses and NRIs.",
            about: {
              title: "Advance tax planner plans",
              body: "Our dedicated team of professionals provides personalised assistance to individuals and businesses, helping you with:",
              points: [
                "An in-depth tax report based on your investments",
                "Every potential tax-saving investment option",
                "All types of tax planning in one place — individual, business, NRI and capital gains",
              ],
            },
            packages: [
              {
                name: "Basic Tax Planner",
                audience: "Tax planning (DIY)",
                description: "Plan your own taxes with our guided do-it-yourself planner.",
                price: 99,
                priceNote: EXCL_TAXES,
                inclusions: ["Self-serve tax planning tool"],
              },
              {
                name: "TaxSaver Pro",
                price: 1699,
                priceNote: EXCL_TAXES,
                inclusionsLabel: "What it includes",
                inclusions: [
                  "For salaried taxpayers",
                  "Old vs new tax regime: which is best for you?",
                  "Increase savings by salary restructuring",
                  "Tax-saving opportunities suited to your goals",
                  "Bifurcation of HRA calculation",
                ],
                popular: true,
              },
              {
                name: "TaxSaver Advance",
                price: 2599,
                priceNote: EXCL_TAXES,
                inclusionsLabel: "What it includes",
                inclusions: [
                  "For taxpayers with income other than salary",
                  "Sold a property? Get solutions against capital gains",
                  "Tax calculation and saving opportunities based on your tax slab",
                  "Tax loss harvesting solutions",
                  "Advance tax calculation",
                  "Personalised tax-saving options for business income",
                  "Bifurcation of HRA calculation",
                ],
              },
              {
                name: "Advance Tax Calculation",
                price: 899,
                priceNote: EXCL_TAXES,
                inclusionsLabel: "What it includes",
                inclusions: [
                  "Advance tax calculation based on source of income",
                  "Quarterly review",
                  "Assistance with challan payment",
                ],
              },
              {
                name: "TaxSaver NRI",
                price: 4199,
                priceNote: EXCL_TAXES,
                inclusionsLabel: "What it includes",
                inclusions: [
                  "Guidance on taxation of foreign investments",
                  "Tax implications on NRO/NRE accounts",
                  "Applicability of DTAA provisions",
                  "Optimised tax strategies for RSU/ESOP, including advance tax on sale",
                  "Understanding residential status under Indian law",
                ],
              },
            ],
          },
          {
            slug: "income-tax-e-filing",
            name: "Income Tax E-Filing",
            heading: "Income Tax E-Filing by Experts",
            tagline:
              "Expert-assisted ITR filing plans for salaried professionals, traders, freelancers and global wealth builders — with year-round support on the top plan.",
            about: {
              title: "Pick the plan that matches your income",
              body: "Every plan is filed by a Filing360 tax expert. Choose based on where your income comes from — the table below shows exactly what each plan covers.",
            },
            packages: [
              {
                name: "Basic",
                audience: "Salaried professionals",
                price: 2499,
                originalPrice: 6247,
                priceNote: "*+18% GST",
                inclusionsLabel: "Plan benefits",
                inclusions: [
                  "Late filing handled end-to-end",
                  "Instant filing — 24 hrs guaranteed",
                  "Maximum tax savings — avg. ₹26,686",
                  "Real-time tax consultation — 30 mins",
                  "File in 24 hrs",
                ],
              },
              {
                name: "Premium",
                audience: "Traders and freelancers",
                price: 3999,
                originalPrice: 9997,
                priceNote: "*+18% GST",
                inclusionsLabel: "Plan benefits",
                inclusions: [
                  "Everything in Basic +",
                  "Live tax filing — 45 mins",
                  "Instant filing — 24 hrs guaranteed",
                  "Accuracy check (AI + expert) — 100%",
                  "Maximum tax refunds — avg. ₹30,990",
                  "Investors' favourite",
                ],
                popular: true,
              },
              {
                name: "Elite",
                audience: "Global wealth builders",
                price: 5999,
                originalPrice: 14997,
                priceNote: "*+18% GST",
                inclusionsLabel: "Plan benefits",
                inclusions: [
                  "Everything in Premium +",
                  "Priority filing — 72 hrs guaranteed",
                  "Live tax-savings advisory — 120 mins",
                  "Protect ESOP/RSU gains — no penalty",
                  "Accurate Schedule FA filing — 100%",
                  "Maximum tax refunds — avg. ₹46,882",
                  "Maximise wealth",
                ],
              },
              {
                name: "Luxe",
                audience: "Year-round peace of mind",
                price: 19999,
                originalPrice: 49997,
                priceNote: "*+18% GST",
                inclusionsLabel: "Plan benefits",
                inclusions: [
                  "Everything in Elite +",
                  "Past tax savings unlocked — ~₹1 L/year",
                  "Wealth tax advisory — year round",
                  "Protect investments — no extra tax",
                  "Advance tax filing — zero penalty",
                  "HUF evaluation — save ~₹1.2 L/year",
                ],
              },
            ],
            coverage: {
              columns: ["Basic", "Premium", "Elite", "Luxe"],
              rows: [
                {
                  label: "Salary, rental & interest income",
                  values: ["Salary < ₹50 L", true, true, true],
                },
                { label: "Capital gains: MFs, stocks, crypto", values: [false, true, true, true] },
                { label: "F&O and intraday", values: [false, true, true, true] },
                {
                  label: "Business / freelance income",
                  values: [false, "Freelance income", "Business > ₹50 L", "Any range"],
                },
                { label: "ESOPs & RSUs", values: [false, false, true, true] },
                { label: "US stocks & foreign income", values: [false, false, true, true] },
                { label: "Fast DS declaration", values: [false, false, false, false] },
              ],
            },
            tables: [
              {
                title: "Charges",
                firstColumn: "Charge",
                columns: ["Basic", "Premium", "Elite", "Luxe"],
                rows: [
                  { label: "Plan amount", values: ["₹6,247", "₹9,997", "₹14,997", "₹49,997"] },
                  { label: "Discount", values: ["− ₹3,748", "− ₹5,998", "− ₹8,998", "− ₹29,998"] },
                  { label: "Net of discount", values: ["₹2,499", "₹3,999", "₹5,999", "₹19,999"] },
                  { label: "GST (18%)", values: ["₹449.82", "₹719.82", "₹1,079.82", "₹3,599.82"] },
                  { label: "Advance payable", detail: "30% of the final amount", values: ["₹884.65", "₹1,415.65", "₹2,123.65", "₹7,079.65"] },
                ],
                total: {
                  label: "Final amount to be paid",
                  values: ["₹2,948.82", "₹4,718.82", "₹7,078.82", "₹23,598.82"],
                },
              },
            ],
            notes: [
              "18% GST applies on the net plan amount.",
              "30% of the final amount is payable as an advance when the service starts.",
            ],
            featured: true,
          },
        ],
      },
      {
        name: "ITR filing",
        services: [
          {
            slug: "itr-filing-individual",
            name: "ITR Filing — Individual",
            shortName: "ITR — Individual",
            heading: "ITR Filing for Individuals",
            tagline:
              "From a single salary to F&O, crypto, RSUs and foreign income — pick the plan that fits your income sources and let our experts file your return.",
            about: {
              title: "Plans for every income profile",
              body: "Each plan lists the income sources it is suited for. Not sure which one you need? Talk to us and we'll recommend the right plan before you pay.",
            },
            packages: [
              {
                name: "Salary + 1 House Property",
                price: 999,
                priceNote: EXCL_TAXES,
                inclusionsLabel: "Suited for",
                inclusions: [
                  "Single & multiple employers",
                  "Single house property",
                  "Income from other sources",
                  "Agriculture income",
                ],
              },
              {
                name: "Salary + More than 1 House Property",
                price: 1099,
                priceNote: EXCL_TAXES,
                inclusionsLabel: "Suited for",
                inclusions: [
                  "Single & multiple employers",
                  "Multiple house property",
                  "Income from other sources",
                  "Agriculture income",
                ],
              },
              {
                name: "Business & Professional",
                price: 2499,
                priceNote: EXCL_TAXES,
                inclusionsLabel: "Suited for",
                inclusions: [
                  "Single & multiple employers",
                  "Single & multiple house property",
                  "Business & professional income (non-audit) — without B/S & P/L*",
                  "Income from other sources",
                  "Agriculture income",
                ],
                popular: true,
              },
              {
                name: "Capital Gain",
                price: 2999,
                priceNote: EXCL_TAXES,
                inclusionsLabel: "Suited for",
                inclusions: [
                  "Single & multiple employers",
                  "Single & multiple house property",
                  "Multiple capital gain income",
                  "Business & professional income (non-audit) — without B/S & P/L*",
                  "Income from other sources",
                  "Agriculture income",
                ],
              },
              {
                name: "Futures & Options",
                price: 4499,
                priceNote: EXCL_TAXES,
                inclusionsLabel: "Suited for",
                inclusions: [
                  "F&O income/loss (non-audit)",
                  "Speculative income",
                  "Single & multiple employers",
                  "Single & multiple house property",
                  "Multiple capital gain income",
                  "Income from other sources",
                  "Business & professional income (non-audit) — without B/S & P/L*",
                  "Agriculture income",
                ],
              },
              {
                name: "Cryptocurrency",
                price: 4499,
                priceNote: EXCL_TAXES,
                inclusionsLabel: "Suited for",
                inclusions: [
                  "Crypto income",
                  "F&O income/loss (non-audit)",
                  "Speculative income",
                  "Single & multiple employers",
                  "Single & multiple house property",
                  "Multiple capital gain income",
                  "Business & professional income (non-audit) — without B/S & P/L*",
                  "Income from other sources",
                  "Agriculture income",
                ],
              },
              {
                name: "NRIs Having Indian Income",
                price: 4499,
                priceNote: EXCL_TAXES,
                inclusionsLabel: "Suited for",
                inclusions: [
                  "Single & multiple employers",
                  "Single & multiple house property",
                  "Multiple capital gain income",
                  "RSU/ESOP",
                  "Business & professional income (non-audit) — without B/S & P/L*",
                  "Crypto income",
                  "F&O income/loss (non-audit)",
                  "Speculative income",
                  "Income from other sources",
                  "Agriculture income",
                ],
              },
              {
                name: "Resident with Foreign Income (Basic)",
                price: 4999,
                priceNote: EXCL_GST,
                inclusionsLabel: "Suited for",
                inclusions: [
                  "Foreign salary (including foreign tax relief)",
                  "DTAA tax relief",
                  "Single & multiple employers",
                  "Single & multiple house property",
                  "Multiple capital gain income",
                  "Business & professional income (non-audit) — without B/S & P/L*",
                  "Crypto income",
                  "F&O income/loss (non-audit)",
                  "Speculative income",
                  "Income from other sources (including foreign dividend)",
                  "Agriculture income",
                ],
              },
              {
                name: "Resident with Foreign Income from RSU/ESOP",
                price: 7499,
                priceNote: EXCL_GST,
                inclusionsLabel: "Suited for",
                inclusions: [
                  "Reporting and calculation of RSU/ESOP",
                  "Foreign salary (including foreign tax relief)",
                  "DTAA tax relief",
                  "Single & multiple employers",
                  "Single & multiple house property",
                  "Multiple capital gain income",
                  "Business & professional income (non-audit) — without B/S & P/L*",
                  "Crypto income",
                  "F&O income/loss (non-audit)",
                  "Speculative income",
                  "Income from other sources",
                  "Agriculture income",
                ],
              },
              {
                name: "Premium Tax Filing",
                price: 9999,
                priceNote: EXCL_GST,
                inclusionsLabel: "Suited for",
                inclusions: [
                  "All sources of income covered in other plans (non-audit)",
                  "High-volume transactions / multiple broker statements",
                  "Complex tax situations",
                  "Customised computation sheet (on request)",
                  "Preparation of Balance Sheet and P&L",
                  "Income tax forms filing (Form 67 / 10E / 10-IEA etc.)",
                  "Revised / updated ITR — if required for the relevant year",
                  "Dedicated relationship manager",
                  "Priority post-filing support and query resolution",
                  "Dedicated Google Meet session with a tax expert — detailed explanation & advisory",
                ],
              },
            ],
            notes: [
              "*Preparation of Balance Sheet & P/L: ₹1,000 extra.",
              "Attestation: ₹500 extra.",
              "Claiming relief on arrears received: ₹499 over and above the plan price.",
              "18% GST applies on the base plan amount.",
              "15% advance is payable when the service starts.",
            ],
            featured: true,
          },
          {
            slug: "itr-filing-sole-proprietorship",
            name: "ITR Filing — Sole Proprietorship",
            shortName: "ITR — Sole Proprietorship",
            heading: "ITR Filing for Sole Proprietors",
            tagline:
              "Business income tax return for proprietors, prepared from your books with presumptive-tax options and deductions reviewed by an expert.",
            packages: [],
          },
          {
            slug: "itr-filing-company",
            name: "ITR Filing — Company",
            shortName: "ITR — Company",
            heading: "ITR-6 Filing for Companies",
            tagline:
              "Income tax return for private limited, one person and public companies, with financial statements and tax computation reviewed by experts.",
            packages: [],
          },
          {
            slug: "itr-filing-trust-ngo",
            name: "ITR Filing — Trust / NGOs",
            shortName: "ITR — Trust / NGOs",
            heading: "ITR-7 Filing for Trusts & NGOs",
            tagline:
              "Income tax return for trusts, societies and Section 8 companies, including exemption claims and 12A / 80G compliance.",
            packages: [],
          },
          {
            slug: "itr-filing-partnership-firm",
            name: "ITR Filing — Partnership Firm",
            shortName: "ITR — Partnership Firm",
            heading: "ITR-5 Filing for Partnership Firms",
            tagline:
              "Income tax return for partnership firms and LLPs, including partner remuneration and interest computation.",
            packages: [],
          },
        ],
      },
      {
        name: "Other income tax services",
        services: [
          {
            slug: "tds-return-filing",
            name: "TDS Return Filing",
            heading: "TDS Return Filing",
            tagline:
              "Quarterly TDS returns prepared and filed on time, with challan reconciliation and Form 16 / 16A generation.",
            packages: [],
          },
          {
            slug: "income-tax-notice",
            name: "Income Tax Notice",
            heading: "Income Tax Notice Response",
            tagline:
              "Received a notice from the Income Tax Department? Our experts review it, draft the reply and file it on the e-filing portal.",
            packages: [],
          },
          {
            slug: "pan-tan-registration",
            name: "PAN / TAN Registration",
            heading: "PAN & TAN Registration",
            tagline:
              "Apply for PAN or TAN for your business, firm, trust or yourself — application, documents and tracking handled for you.",
            packages: [],
          },
          {
            slug: "tax-audit",
            name: "Tax Audit",
            heading: "Tax Audit Packages",
            tagline:
              "Tax audit under Section 44AB for businesses and professionals crossing the audit threshold — audit report and ITR filing handled together.",
            packages: [],
          },
        ],
      },
    ],
  }),

  pillar({
    slug: "gst",
    name: "GST",
    description:
      "Apply for a GST number online and get your GSTIN in 3–7 working days, then never miss a return. Registration, monthly filing, LUT, amendment, cancellation and revocation at fixed prices.",
    groups: [
      {
        name: "GST registration",
        services: [
          {
            slug: "gst-applicability-evaluation",
            name: "Evaluation of GST Applicability",
            shortName: "GST Applicability Check",
            heading: "Do You Need GST Registration?",
            tagline:
              "Find out whether GST registration is mandatory for your business — based on turnover, the nature of supply and where you sell.",
            packages: [
              {
                name: "GST Applicability Evaluation",
                description:
                  "An expert reviews your business model and tells you whether you need GST registration — and which scheme suits you.",
                price: 99,
                per: "one-time",
                priceNote: EXCL_GST,
                inclusions: [
                  "Turnover & threshold check",
                  "Inter-state and e-commerce review",
                  "Scheme recommendation (regular / composition)",
                ],
              },
            ],
            tool: {
              label: "Open the GST applicability checker",
              href: "https://claude.ai/artifact/Bkfp1Yn8YcFhgPeVhvPfe2",
              body: "Answer a few quick questions to check whether GST applies to you.",
            },
          },
          {
            slug: "gst-registration",
            name: "GST Registration",
            heading: "GST Registration Online",
            tagline:
              "Get your GST number without visiting any office. CAs prepare REG-01, handle Aadhaar authentication and officer queries, and deliver your GST certificate in 3–7 working days.",
            about: {
              title: "Get GST-registered without the headache",
              body: "Starting a business is hard enough, and your GST registration shouldn't add to the stress. At Filing360, our team handles the paperwork so you can get back to running your business. It's 100% online and works from anywhere in India. Here's what we take care of:",
              points: [
                "Preparing your full application, so you don't have to fill in a single confusing form",
                "Getting your TRN (Temporary Reference Number) generated right away",
                "Filing and getting your ARN (Application Reference Number)",
                "Getting your GST certificate delivered to you",
                "Ongoing help after registration, so you're never stuck figuring out GST on your own",
              ],
            },
            packages: [
              gstRegistrationPkg,
              gstMonthlyPkg,
              gstYearPkg,
              gstYearAnnualPkg,
              gstYearAnnualItrPkg,
            ],
            timeline: "3–7 business days",
            featured: true,
          },
          {
            slug: "gst-composition-scheme",
            name: "GST Composition Scheme",
            shortName: "Composition Scheme",
            heading: "GST Composition Scheme Registration",
            tagline:
              "Pay a low, fixed tax on turnover and file returns only four times a year plus one annual return. We check eligibility, file your option, and handle CMP-08 and GSTR-4.",
            packages: [
              {
                name: "Composition opt-in",
                description: "Eligibility check and CMP-02 / REG-01 composition option filing.",
                price: 999,
                per: "one-time",
                priceNote: EXCL_GST,
                inclusions: [
                  "Eligibility and tax comparison",
                  "CMP-02 or REG-01 composition option",
                  "Bill of supply format guidance",
                ],
              },
              {
                name: "Yearly Filing",
                description: "All four CMP-08 returns plus the annual GSTR-4.",
                price: 5999,
                per: "year",
                priceNote: EXCL_GST,
                inclusions: [
                  "Dedicated Accountant",
                  "CMP-08 filing — 4 quarters",
                  "GSTR-4 annual return",
                ],
                popular: true,
              },
            ],
            timeline: "Same week",
            featured: true,
          },
        ],
      },
      {
        name: "GST return filing by professionals",
        services: [
          {
            slug: "gst-nil-return-filing",
            name: "Return Filing — Nil Transaction",
            shortName: "Nil Return Filing",
            heading: "Nil GST Return Filing",
            tagline:
              "No sales or purchases this period? You still need to file. We file your nil GSTR-1 and GSTR-3B so you avoid late fees.",
            packages: [
              {
                name: "Nil Return Filing — 3 Months",
                price: 999,
                per: "3 months",
                priceNote: EXCL_GST,
                inclusions: [
                  "Nil GSTR-1 filing",
                  "Nil GSTR-3B filing",
                  "Filing acknowledgements",
                ],
              },
            ],
          },
          {
            slug: "gst-return-filing-regular",
            name: "Return Filing — Regular",
            shortName: "Regular Return Filing",
            heading: "GST Return Filing Online",
            tagline:
              "Monthly GST compliance, fully handled. We reconcile GSTR-2B, prepare GSTR-1 and GSTR-3B, share the challan and file on time so you keep ITC and avoid late fees.",
            about: monthlyReturnAbout,
            packages: [gstMonthlyPkg, gstYearPkg, gstYearAnnualPkg, gstYearAnnualItrPkg],
            scope: RETURN_SCOPE,
            addOns: ["GSTR-2B vs books reconciliation"],
            featured: true,
          },
          {
            slug: "gst-return-filing-composition",
            name: "Return Filing — Composite Dealer",
            shortName: "Composite Dealer Filing",
            heading: "Quarterly GST Filing for Composition Dealers",
            tagline:
              "GST return filing by accountants for businesses under the Composition Scheme — CMP-08 every quarter and GSTR-4 every year.",
            about: {
              title: "Pay a flat rate, file less often",
              body: "Small businesses can file less often at a flat, lower tax rate under the Composition Scheme (CMP-08, GSTR-4). We check whether the scheme suits you and handle every challan, upload and return on time.",
            },
            packages: [
              {
                name: "Quarterly Filing",
                description: "CMP-08 filed for one quarter by a dedicated accountant.",
                price: 1999,
                per: "quarter",
                priceNote: EXCL_GST,
                inclusions: ["Dedicated Accountant", "CMP-08 filing — 1 quarter"],
              },
              {
                name: "Yearly Filing",
                description: "All four CMP-08 returns plus the annual GSTR-4.",
                price: 5999,
                per: "year",
                priceNote: EXCL_GST,
                inclusions: [
                  "Dedicated Accountant",
                  "CMP-08 filing — 4 quarters",
                  "GSTR-4 annual return",
                ],
              },
              {
                name: "Quarterly Filing — For 1 Year",
                description:
                  "Composition Scheme returns for the full year, filed by a dedicated accountant.",
                price: 2999,
                per: "year",
                priceNote: EXCL_GST,
                inclusions: ["Dedicated Accountant", "Quarterly return filing — 4 quarters"],
              },
            ],
            scope: RETURN_SCOPE,
            addOns: ["GSTR-2B vs books reconciliation"],
          },
          {
            slug: "gst-return-filing-qrmp",
            name: "Return Filing — QRMP Scheme",
            shortName: "QRMP Filing",
            heading: "Quarterly GST Filing under QRMP",
            tagline:
              "GST return filing by accountants under the Quarterly Return Monthly Payment scheme — quarterly GSTR-1 and GSTR-3B with monthly tax payments.",
            about: {
              title: "Quarterly returns, monthly payments",
              body: "Businesses with turnover up to ₹5 crore can file quarterly with monthly tax payments under QRMP. We check whether the scheme suits you and handle every challan, upload and return on time.",
            },
            packages: [
              {
                name: "Quarterly Filing",
                description: "Quarterly GSTR-1 and GSTR-3B plus the monthly tax challans for one quarter.",
                price: 1799,
                per: "quarter",
                priceNote: EXCL_GST,
                inclusions: [
                  "Dedicated Accountant",
                  "GSTR-1 & GSTR-3B — 1 quarter",
                  "Monthly PMT-06 challans",
                ],
              },
              {
                name: "Yearly Filing",
                description: "All four QRMP quarters with monthly tax payments handled for you.",
                price: 6999,
                per: "year",
                priceNote: EXCL_GST,
                inclusions: [
                  "Dedicated Accountant",
                  "GSTR-1 & GSTR-3B — 4 quarters",
                  "Monthly PMT-06 challans",
                ],
              },
              {
                name: "Quarterly Filing — For 1 Year",
                description: "QRMP returns for the full year, filed by a dedicated accountant.",
                price: 2999,
                per: "year",
                priceNote: EXCL_GST,
                inclusions: ["Dedicated Accountant", "Quarterly return filing — 4 quarters"],
              },
            ],
            scope: RETURN_SCOPE,
            addOns: ["GSTR-2B vs books reconciliation"],
          },
          {
            slug: "gst-return-filing-freelancer",
            name: "Return Filing — Freelancer",
            shortName: "Freelancer Filing",
            heading: "Monthly GST Filing for Freelancers",
            tagline: "GST return filing by accountants, covering GSTR-1 and GSTR-3B filings.",
            about: monthlyReturnAbout,
            packages: [
              gstMonthlyPkg,
              gstYearPkg,
              {
                name: "Freelancer Yearly Filing",
                description:
                  "A full year of freelancer GST returns, filed every month by a dedicated accountant.",
                price: 8999,
                per: "year",
                priceNote: EXCL_GST,
                inclusions: [
                  "Dedicated Accountant",
                  "12 Months GSTR-1 Filing",
                  "12 Months GSTR-3B Filing",
                ],
              },
              gstYearAnnualPkg,
              gstYearAnnualItrPkg,
            ],
            scope: RETURN_SCOPE,
            addOns: ["GSTR-2B vs books reconciliation"],
          },
          {
            slug: "gst-return-filing-online-seller",
            name: "Return Filing — Trader / Online Seller",
            shortName: "Trader / Online Seller Filing",
            heading: "GST Filing for Traders & Online Sellers",
            tagline:
              "Monthly GST returns for traders and e-commerce sellers, including TCS credit matching from marketplaces.",
            about: monthlyReturnAbout,
            packages: [
              {
                name: "Monthly Filing",
                description: "GSTR-1 and GSTR-3B filed every month by a dedicated accountant.",
                price: 999,
                per: "month",
                priceNote: EXCL_GST,
                inclusions: ["Dedicated Accountant", "GSTR-1 Filing", "GSTR-3B Filing"],
              },
              {
                name: "1 Year GST Filing",
                description: "All monthly returns for the year at a better price.",
                price: 10999,
                per: "year",
                priceNote: EXCL_GST,
                inclusions: [
                  "Dedicated Accountant",
                  "12 Months GSTR-1 Filing",
                  "12 Months GSTR-3B Filing",
                ],
                popular: true,
              },
            ],
            scope: RETURN_SCOPE,
            addOns: ["GSTR-2B vs books reconciliation"],
          },
          {
            slug: "gst-annual-return-filing",
            name: "Return Filing — Annual Return & GST Reconciliation",
            shortName: "Annual Return (GSTR-9)",
            heading: "GST Annual Return Filing (GSTR-9 and GSTR-9C)",
            tagline:
              "GSTR-9 is the annual return that eligible regular GST-registered taxpayers must file. It consolidates all monthly/quarterly returns filed during the financial year. File GSTR-9 online easily and avoid penalties.",
            about: {
              title: "File your GST annual return",
              body: "File your GST Annual Return (GSTR-9) online with expert assistance. Ensure accurate reporting of your yearly GST data and stay compliant with GST regulations.",
              points: [
                "Preparation of GSTR-9",
                "Filing on the GST portal",
                "Acknowledgement & confirmation",
                "Expert review & compliance check",
              ],
            },
            packages: [
              {
                name: "GST Annual Return Filing",
                description:
                  "GSTR-9 annual return filing for taxpayers registered under the regular GST scheme.",
                price: 14999,
                per: "year",
                priceNote: EXCL_GST,
                inclusions: [
                  "Books-vs-GST Reconciliation",
                  "GSTR-9 Preparation & Filing",
                  "GSTR-9C Filing (if required)",
                  "Dedicated Tax Expert Review",
                  "Post-Filing Clarification Support",
                ],
              },
              {
                name: "Annual Return & GST Reconciliation",
                description:
                  "GSTR-9 annual return together with a reconciliation of your GST returns for the year.",
                price: 11999,
                per: "year",
                priceNote: EXCL_GST,
                inclusions: [
                  "Dedicated Accountant",
                  "GST Reconciliation",
                  "GSTR-9 Preparation & Filing",
                ],
              },
            ],
          },
        ],
      },
      {
        name: "LUT, amendment & closure",
        services: [
          {
            slug: "gst-lut-filing",
            name: "GST LUT Filing",
            heading: "LUT Filing Online for Exporters",
            tagline:
              "GST LUT allows exporters to supply goods or services without payment of IGST by submitting a Letter of Undertaking on the GST portal. Apply online easily and stay compliant with GST export regulations.",
            about: {
              title: "Apply for GST LUT",
              body: "File your GST LUT online to export goods or services without payment of IGST. Get expert assistance and seamless compliance for the financial year.",
              points: [
                "Preparation of LUT application",
                "Filing of LUT on the GST portal",
                "LUT acknowledgement",
                "Export without payment of IGST by furnishing LUT",
              ],
            },
            packages: [
              {
                name: "GST LUT Filing",
                description: "Filing of the GST LUT form for exporters.",
                price: 999,
                per: "LUT",
                priceNote: EXCL_GST,
                inclusions: [
                  "Preparation of LUT Application",
                  "Filing of LUT on GST Portal",
                  "LUT Acknowledgement (FY-wise)",
                  "Export / SEZ invoice format support",
                  "Compliance reminder alerts",
                ],
              },
              gstMonthlyPkg,
              gstYearPkg,
              gstYearAnnualPkg,
              gstYearAnnualItrPkg,
            ],
          },
          {
            slug: "gstr-10-filing",
            name: "GST Registration Cancellation — GSTR-10 Filing",
            shortName: "GSTR-10 (Cancellation)",
            heading: "GSTR-10 Filing",
            tagline:
              "GSTR-10 is the final return that must be filed when a GST registration is cancelled or surrendered. It contains details of stock, liabilities and ITC reversal. File GSTR-10 online easily and stay compliant.",
            about: {
              title: "File your GST final return (GSTR-10)",
              body: "File your GST final return (GSTR-10) online with expert assistance. Ensure accurate reporting after GST cancellation and avoid late fees and penalties.",
              points: [
                "Preparation of GSTR-10",
                "Filing on the GST portal",
                "Acknowledgement & confirmation",
                "Expert review & compliance check",
              ],
            },
            why: {
              title: "Why GSTR-10 filing is essential",
              intro:
                "Closed your GST registration? You're not quite done yet. GSTR-10, also called the Final Return, is the last step to wrap things up properly with the GST department. Here's why you shouldn't skip it:",
              points: [
                "It officially closes your GST chapter. Cancelling your registration isn't enough on its own — GSTR-10 declares the stock, inputs and capital goods you had on hand when you shut down, so the books close cleanly.",
                "It keeps penalties away. Miss the deadline (3 months from the cancellation date or the cancellation order, whichever is later) and a late fee of ₹200 a day kicks in, up to ₹10,000.",
                "It saves you from a tax notice. If you don't file, the department can send you a notice and then assess your tax liability on its own, often with interest and penalty added.",
                "It gives you peace of mind. No loose ends, no surprise demands years later.",
              ],
              outro:
                "Let Filing360 handle it. We'll calculate your closing stock, figure out any tax payable and file your GSTR-10 on time, so you can move on without the headache.",
            },
            packages: [
              {
                name: "Basic",
                description:
                  "A taxable person whose GST registration is cancelled or surrendered has to file Form GSTR-10, the Final Return — a statement of stock held on the day immediately before cancellation takes effect.",
                price: 999,
                per: "one-time",
                priceNote: EXCL_GST,
                inclusions: ["GSTR-10 filed", "Acknowledgement copy"],
              },
            ],
          },
          {
            slug: "gst-revocation",
            name: "GST Registration Revocation",
            shortName: "GST Revocation",
            heading: "Restore Your Cancelled GST Registration",
            tagline:
              "GST revocation allows taxpayers to restore a cancelled GST number. If your GST was cancelled due to non-filing, errors or notices, apply for revocation online and restart your business legally.",
            about: {
              title: "Apply for GST revocation online",
              body: "Get your cancelled GST registration restored with our expert GST revocation service. We prepare and file your revocation application (FORM GST REG-21) and ensure quick compliance.",
              points: [
                "Review of cancellation order",
                "Drafting the revocation application",
                "Filing on the GST portal",
                "Follow-up & approval support",
              ],
            },
            packages: [
              {
                name: "GST Revocation",
                description:
                  "Restore your cancelled GST registration with Filing360. We handle end-to-end revocation — from drafting and filing the application to department follow-ups — so your business can get back to operations without delays.",
                price: 999,
                per: "one-time",
                priceNote: EXCL_GST,
                inclusions: [
                  "Preparation & filing of revocation application",
                  "Follow-up and clarifications",
                  "Reactivated GSTIN",
                  "GST compliance advisory",
                ],
              },
              gstMonthlyPkg,
              gstYearPkg,
              gstYearAnnualPkg,
              gstYearAnnualItrPkg,
            ],
            terms: [
              "The online process takes about an hour. Depending on the case, a department visit may be required, which is charged additionally.",
            ],
          },
          {
            slug: "gst-amendment",
            name: "GST Amendment",
            heading: "GST Registration Amendment",
            tagline:
              "GST amendment lets you update your GST registration details such as business name, address, partners, authorised signatory, bank details and more. File your amendment online quickly and stay compliant.",
            about: {
              title: "File your GST amendment with experts",
              body: "Make changes to your GST registration easily with our professional GST amendment service. We handle document preparation, verification and online filing so your business details stay accurate and compliant.",
              points: [
                "GST amendment preparation & review",
                "Online filing on the GST portal",
                "Application tracking & acknowledgement",
                "Expert compliance verification",
              ],
            },
            packages: [
              {
                name: "Basic",
                description:
                  "Fully managed amendment of core and non-core fields on the GST portal — trade name, contact details, business activities, principal place of business, and additional places of business.",
                price: 999,
                per: "change request",
                priceNote: EXCL_GST,
                inclusions: [
                  "Assisted GST Amendment Filing",
                  "Updated GST Registration Certificate",
                  "Amendment Acknowledgement",
                  "Documentation & GST Advisory",
                  "Support Until Approval",
                ],
              },
              gstMonthlyPkg,
              gstYearPkg,
              gstYearAnnualPkg,
              gstYearAnnualItrPkg,
            ],
            terms: ["The amendment fee is charged for each change request."],
          },
          {
            slug: "gst-cancellation",
            name: "GST Cancellation",
            heading: "GST Cancellation Online",
            tagline:
              "Close your GSTIN the right way — Form REG-16, stock reversal and the final return GSTR-10 — so you avoid late fees and future notices.",
            packages: [
              {
                name: "GST Cancellation",
                description: "REG-16 filing, stock reversal computation, cancellation order follow-up and GSTR-10.",
                price: 999,
                per: "one-time",
                priceNote: EXCL_GST,
                inclusions: [
                  "Pending-return review",
                  "ITC reversal on closing stock",
                  "REG-16 filing",
                  "GSTR-10 final return",
                  "Support until REG-19",
                ],
              },
            ],
            timeline: "About 30 days",
          },
          {
            slug: "gst-notice-reply",
            name: "GST Notice Reply",
            heading: "GST Notice Reply Service",
            tagline:
              "A CA reviews your GST notice within 24 hours, reconciles the period and drafts a point-by-point reply — ASMT-10, DRC-01, DRC-01B, DRC-01C, REG-17 or GSTR-3A.",
            packages: [],
            timeline: "Review in 24 hours",
          },
          {
            slug: "gst-refund",
            name: "GST Refund",
            heading: "GST Refund Application Online",
            tagline:
              "Identify every refund you are eligible for, file Form RFD-01 with statements, and follow up until the amount reaches your bank.",
            packages: [],
            timeline: "Follow-up till credit",
          },
          {
            slug: "virtual-office-gstin",
            name: "Set Up Your Virtual Office + GSTIN",
            shortName: "Virtual Office + GSTIN",
            heading: "Virtual Office with GST Registration",
            tagline:
              "Get a virtual office address with the documents needed for GST registration — and your GSTIN, handled together.",
            packages: [],
          },
        ],
      },
    ],
  }),

  pillar({
    slug: "startup",
    name: "Startup",
    description:
      "Register the right structure — proprietorship to private limited, Section 8 and trusts — plus Startup India and MSME.",
    groups: [
      {
        services: [
          {
            slug: "startup-india-dpiit",
            name: "Startup India / DPIIT Registration",
            shortName: "Startup India / DPIIT",
            heading: "Startup India (DPIIT) Recognition",
            tagline:
              "Get your startup recognised by DPIIT under Startup India to unlock tax benefits, easier compliance and eligibility for government schemes.",
            packages: [
              {
                name: "DPIIT Recognition",
                price: 5500,
                per: "one-time",
                priceNote: EXCL_GST,
                inclusions: [
                  "Eligibility review",
                  "Application filing on the Startup India portal",
                  "Follow-up until recognition",
                ],
              },
            ],
          },
          {
            slug: "proprietorship",
            name: "Proprietorship",
            heading: "Proprietorship Registration in India",
            tagline:
              "Register your proprietorship firm in India quickly and legally. Get GST, Udyam, PAN support and complete sole proprietorship registration online with expert assistance.",
            about: {
              title: "Start your proprietorship",
              body: "Proprietorship registration is the easiest way to start a single-owner business in India. We provide complete proprietorship registration services, including GST, Udyam and bank account setup, for a fast and compliant launch.",
              points: [
                "Expert registration consultation",
                "End-to-end documentation support",
                "Dedicated compliance expert",
                "GST registration & monthly filing support",
                "Income tax return filing assistance",
              ],
            },
            packages: [gstRegistrationPkg, gstMonthlyPkg, gstYearPkg],
          },
          {
            slug: "partnership-firm",
            name: "Partnership",
            heading: "Register Your Partnership Firm in India",
            tagline:
              "Register your partnership firm in India with complete legal support, including partnership deed drafting, PAN & GST registration, and ongoing compliance assistance.",
            about: {
              title: "Start your partnership firm",
              body: "Partnership firm registration lets two or more individuals legally run a business together. We provide complete support, including partnership deed drafting, PAN card, GST registration and expert assistance for a smooth registration.",
              points: [
                "Partnership deed drafting",
                "PAN card & GST registration",
                "Income tax & GST return filing",
                "Dedicated compliance expert",
                "Required documents guidance",
              ],
            },
            packages: [
              {
                name: "Partnership Deed",
                description:
                  "Get your partnership firm in just 5–7 days — online and hassle-free — with an expert-drafted deed. Government fees, stamp paper and notary charges are borne by the client.",
                price: 2899,
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "Partnership Deed Draft",
                  "PAN Card Registration",
                  "Shipping and Handling",
                  "GST Registration",
                  "Bank Account Opening Assistance",
                ],
              },
              {
                name: "Partnership — Deed & GST",
                description:
                  "Expert-drafted deed plus GST registration, 12 months of GST return filing and 1-year access to accounting software. Government fees, stamp paper and notary charges are borne by the client.",
                price: 10899,
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "Partnership Deed Draft",
                  "PAN Card Registration",
                  "Shipping and Handling",
                  "GST Registration",
                  "GSTR-1 Filing — 12 Months",
                  "GSTR-3B Filing — 12 Months",
                  "Bank Account Opening Assistance",
                ],
                popular: true,
              },
              {
                name: "Partnership — Deed, GST & ITR",
                description:
                  "Everything in Deed & GST plus business ITR-5 filing and 1-year access to accounting software. Government fees, stamp paper and notary charges are borne by the client.",
                price: 14899,
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "Partnership Deed Draft",
                  "PAN Card Registration",
                  "Shipping and Handling",
                  "GST Registration",
                  "GSTR-1 Filing — 12 Months",
                  "GSTR-3B Filing — 12 Months",
                  "ITR-5 Return Filing",
                  "Bank Account Opening Assistance",
                ],
              },
            ],
            timeline: "5–7 days",
          },
          {
            slug: "opc",
            name: "One Person Company",
            shortName: "OPC",
            heading: "One Person Company Registration in India",
            tagline:
              "Register your One Person Company (OPC) in India with expert assistance. Get MCA name approval, MOA & AOA drafting, PAN & TAN registration, and complete compliance support to start your business legally.",
            about: {
              title: "Start your OPC registration",
              body: "Register your One Person Company in India with MCA filing, name approval, PAN and Certificate of Incorporation to build a compliant, single-owner business.",
              points: [
                "MCA name approval",
                "OPC incorporation",
                "MOA & AOA drafting",
                "PAN & TAN registration",
                "Required documents guidance",
              ],
            },
            packages: [
              {
                name: "Incorporation",
                description: companyIncorporationNote,
                price: 2899,
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "Unlimited Name Approval Attempts",
                  "Company Incorporation",
                  "MOA & AOA Drafting",
                  "1 DIN for Director",
                  "Authorized Capital with No Limit",
                  "PAN & TAN Registration",
                  "ESI & PF Registration",
                  "GST Registration",
                  "Bank Account Opening Assistance",
                ],
              },
              {
                name: "Incorporation and Compliance",
                description: companyComplianceNote,
                price: 19899,
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "Unlimited Name Approval Attempts",
                  "Company Incorporation",
                  "MOA & AOA Drafting",
                  "1 DIN for Director",
                  "Authorized Capital with No Limit",
                  "PAN & TAN Registration",
                  "ESI & PF Registration",
                  "GST Registration",
                  "MCA Annual Filing (MGT-7 & AOC-4)",
                  "DIN E-KYC for 2 Directors",
                  "ITR-6 Return Filing",
                  "Financial Statement",
                  "Automated Bookkeeping",
                  "Bank Account Opening Assistance",
                ],
                popular: true,
              },
            ],
            timeline: "7–10 days",
            featured: true,
          },
          {
            slug: "llp",
            name: "Limited Liability Partnership",
            shortName: "LLP",
            heading: "LLP Registration in India",
            tagline:
              "Register your Limited Liability Partnership (LLP) in India with expert assistance. Get MCA name approval, LLP incorporation, LLP agreement drafting, PAN & TAN registration, and complete compliance support.",
            about: {
              title: "Start your LLP registration",
              body: "Register your LLP in India with MCA filing, name approval, PAN and Certificate of Incorporation to set up a compliant and flexible partnership business.",
              points: [
                "MCA name approval",
                "LLP incorporation",
                "LLP agreement drafting",
                "PAN & TAN registration",
                "Required documents guidance",
              ],
            },
            packages: [
              {
                name: "Incorporation",
                description:
                  "Register your LLP in just 7–10 days — online and hassle-free. Fully managed incorporation with complete documentation support. Government fees, stamp paper, notary and DSC charges are borne by the client.",
                price: 2899,
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "Unlimited Name Approval Attempts",
                  "LLP Deed Drafting",
                  "LLP Incorporation",
                  "5 DPINs for Partners",
                  "Contribution with No Limit",
                  "PAN & TAN Registration",
                  "GST Registration",
                  "Bank Account Opening Assistance",
                ],
              },
              {
                name: "Incorporation and Compliance",
                description:
                  "Register your LLP in 7–10 days with complete incorporation, compliance and accounting support. Government fees, stamp paper, notary and DSC charges are borne by the client.",
                price: 9899,
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "Unlimited Name Approval Attempts",
                  "LLP Deed Drafting",
                  "LLP Incorporation",
                  "5 DPINs for Partners",
                  "Contribution with No Limit",
                  "PAN & TAN Registration",
                  "GST Registration",
                  "MCA Annual Filing (Form-8 & Form-11)",
                  "DIN E-KYC for 2 Partners",
                  "ITR-5 Return Filing",
                  "Financial Statement",
                  "Bank Account Opening Assistance",
                ],
                popular: true,
              },
            ],
            timeline: "7–10 days",
            featured: true,
          },
          {
            slug: "private-limited-company",
            name: "Private Limited Company",
            shortName: "Pvt. Ltd.",
            heading: "Private Limited Company Registration in India",
            tagline:
              "Register your Private Limited Company in India with expert assistance. Get name approval, MOA & AOA drafting, PAN & TAN registration, GST registration, and complete compliance support.",
            about: {
              title: "Start your company",
              body: "Register your Private Limited Company in India with filing through the MCA, including name approval, PAN and Certificate of Incorporation — a compliant, investor-ready business.",
              points: [
                "MCA name approval",
                "Company incorporation",
                "MOA & AOA drafting",
                "PAN & TAN registration",
                "Required documents guidance",
              ],
            },
            highlights: [
              "CA-backed",
              "Dedicated RM",
              "Pay 50% advance",
              "Free 30-min consultation",
              "Zero hidden charges",
            ],
            compareHref: "/compare",
            positioning:
              "India's only CA-backed company registration where you pay 50% to start, get a dedicated RM, and a free 30-min consultation — zero hidden charges, guaranteed.",
            usps: [
              {
                title: "Free 30-min consultation call",
                body: "Every customer — regardless of plan — gets a free 30-minute call with a CA before paying anything. No competitor offers this. You start with an advisor, not just a vendor.",
              },
              {
                title: "Dedicated relationship manager",
                body: "One RM assigned from start to finish. You don't get passed between teams — you WhatsApp one person. No team-based, impersonal service.",
              },
              {
                title: "CA-backed credibility",
                body: "All filings are verified and signed by a qualified CA. Unlike facilitation-only services and pure tech platforms, you get real professional accountability — which matters when it's your first company.",
              },
              {
                title: "Pay only 50% advance",
                body: "Work starts at 50% advance. The balance is paid in milestones tied to actual progress — not demanded upfront — so there's less risk for you.",
              },
              {
                title: "Zero hidden charges",
                body: "Government fees (DSC, stamp duty, ROC) are disclosed upfront and always listed separately. Our professional fee is GST-inclusive — no GST surprises, no state-wise surcharges buried in fine print.",
              },
              {
                title: "3-tier model — only one in market",
                body: "No competitor has a meaningful mid-tier. Launch (₹3,000) for price-sensitive founders, Build (₹9,999) for the sweet spot, Grow (₹25,000) for founders who want Year 1 managed — upgrade as you grow.",
              },
            ],
            packages: [
              {
                name: "Launch",
                audience: "Get registered. Pay ₹1,500 today.",
                bestFor: "Students & first-time founders who want basic registration",
                price: 3000,
                advance: 1500,
                priceNote: "*inclusive of GST · govt. fees extra",
                inclusions: [
                  "Free 30-min pre-consultation call",
                  "Dedicated relationship manager",
                  "CA-backed verification & signing",
                  "Company name search & approval",
                  "MOA & AOA drafting",
                  "DIN for 2 directors",
                  "SPICe+ form filing",
                  "Incorporation certificate",
                  "PAN & TAN registration",
                ],
              },
              {
                name: "Build",
                audience: "Register + all licences. Start at ₹5,000.",
                bestFor: "Entrepreneurs who want all registrations sorted in one go",
                price: 9999,
                advance: 5000,
                priceNote: "*inclusive of GST · govt. fees extra",
                inclusions: [
                  "Everything in Launch +",
                  "Share certificate drafting",
                  "Statutory register setup",
                  "GST registration",
                  "ESI & PF registration",
                  "Professional tax registration",
                  "MSME / Udyam registration",
                  "Startup India / DPIIT application",
                  "Bank account opening support",
                  "Post-incorporation guidance checklist",
                ],
                popular: true,
              },
              {
                name: "Grow",
                audience: "Full Year 1 compliance. Zero surprises.",
                bestFor: "Serious founders who want Year 1 fully managed",
                price: 25000,
                advance: 12500,
                priceNote: "*inclusive of GST · govt. fees extra",
                inclusions: [
                  "Everything in Build +",
                  "MCA annual return filing (MGT-7)",
                  "Financial statements (AOC-4)",
                  "ITR-6 (company tax return)",
                  "GST return filing (12 months)",
                  "DIN e-KYC for 2 directors",
                  "Automated bookkeeping (Year 1)",
                  "Board meeting minutes (2 meetings)",
                  "Statutory compliance calendar",
                  "WhatsApp + call RM access",
                  "Quarterly CA review calls (4/year)",
                ],
              },
            ],
            coverage: {
              title: "Compare plans",
              firstColumn: "What's included",
              columns: ["Launch", "Build", "Grow"],
              rows: [
                { group: "Core USPs", label: "Free 30-min pre-consultation call", values: [true, true, true] },
                { label: "Dedicated relationship manager (RM)", values: [true, true, true] },
                { label: "CA-backed verification & signing", values: [true, true, true] },
                { label: "Pay only 50% advance to start", values: [true, true, true] },
                { label: "Step-by-step balance payment", values: [true, true, true] },
                { label: "Zero hidden charges", values: [true, true, true] },
                { group: "Registration", label: "Company name search & approval", values: [true, true, true] },
                { label: "MOA & AOA drafting", values: [true, true, true] },
                { label: "DIN for 2 directors", values: [true, true, true] },
                { label: "SPICe+ form filing", values: [true, true, true] },
                { label: "Incorporation certificate", values: [true, true, true] },
                { label: "PAN & TAN registration", values: [true, true, true] },
                { label: "Share certificate drafting", values: [false, true, true] },
                { label: "Statutory register setup", values: [false, true, true] },
                { group: "Licences & registrations", label: "GST registration", values: [false, true, true] },
                { label: "ESI & PF registration", values: [false, true, true] },
                { label: "Professional tax registration", values: [false, true, true] },
                { label: "MSME / Udyam registration", values: [false, true, true] },
                { label: "Startup India / DPIIT application", values: [false, true, true] },
                { label: "Bank account opening support", values: [false, true, true] },
                { group: "Year 1 compliance", label: "MCA annual return filing (MGT-7)", values: [false, false, true] },
                { label: "Financial statements (AOC-4)", values: [false, false, true] },
                { label: "ITR-6 (company tax return)", values: [false, false, true] },
                { label: "GST return filing (12 months)", values: [false, false, true] },
                { label: "DIN e-KYC for 2 directors", values: [false, false, true] },
                { label: "Automated bookkeeping (Year 1)", values: [false, false, true] },
                { label: "Board meeting minutes (2 meetings)", values: [false, false, true] },
                { label: "Statutory compliance calendar", values: [false, false, true] },
                { group: "Premium support", label: "WhatsApp + call RM access", values: [false, false, true] },
                { label: "Quarterly CA review calls (4/year)", values: [false, false, true] },
                { label: "Post-incorporation guidance checklist", values: [false, true, true] },
              ],
            },
            tables: [
              {
              title: "Step-by-step payment schedule",
              intro: "Pay only 50% advance to start. The balance is paid in milestones — no lump-sum surprise.",
              firstColumn: "Milestone / stage",
              columns: ["Launch (₹3,000)", "Build (₹9,999)", "Grow (₹25,000)"],
              rows: [
                {
                  label: "Step 1 — Book & start",
                  detail: "Pay 50% advance",
                  values: ["₹1,500", "₹5,000", "₹12,500"],
                },
                {
                  label: "Step 2 — Before SPICe+ filing",
                  detail: "Name approved, documents ready",
                  values: ["₹1,500 (final — work complete)", "₹2,500", "₹6,250"],
                },
                {
                  label: "Step 3 — After incorporation certificate",
                  detail: "Company registered!",
                  values: ["—", "₹2,499 (final)", "₹6,250"],
                },
                {
                  label: "Step 4 — 6-month compliance milestone",
                  detail: "Mid-year ROC & GST check",
                  values: ["—", "—", "₹6,250 (if applicable) — balance, Year 1 halfway done"],
                },
              ],
              total: {
                label: "Total professional fees (incl. GST)",
                values: ["₹3,000", "₹9,999", "₹25,000"],
              },
              },
            ],
            govtFees: [
              { label: "DSC token", amount: "₹1,150 per director (govt. fixed)" },
              { label: "Stamp duty", amount: "₹1,700 – ₹8,500 (state-wise)" },
              { label: "ROC filing fees", amount: "₹2,000 – ₹5,000" },
            ],
            terms: [
              "Plan prices are inclusive of GST. Government fees (DSC, stamp duty, ROC) are always charged separately and paid directly to government authorities — they are not collected by Filing360.",
            ],
            addOns: [
              "PF Return",
              "TDS Return",
              "Additional DIN",
              "Post-incorporation activities",
              "Auditor appointment",
              "Charges (CHG-1, CHG-4, CHG-9)",
            ],
            timeline: "7–10 days",
            featured: true,
          },
          {
            slug: "section-8-company",
            name: "Section 8 Company",
            heading: "Section 8 Company Registration in India",
            tagline:
              "Register a Section 8 Company in India with expert assistance. Includes MCA name approval, MOA & AOA drafting, PAN & TAN registration, and statutory compliance support. Start your non-profit legally today.",
            about: {
              title: "Start your Section 8 company",
              body: "Section 8 company registration for non-profits in India. We offer complete NGO registration services, including name approval, MOA & AOA drafting, licence and incorporation certificate.",
              points: [
                "MCA name approval",
                "Company incorporation",
                "MOA & AOA drafting",
                "PAN & TAN registration",
                "Required documents guidance",
              ],
            },
            packages: [
              {
                name: "Incorporation",
                description: companyIncorporationNote,
                price: 2899,
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "Unlimited Name Approval Attempts",
                  "Company Incorporation",
                  "MOA & AOA Drafting",
                  "3 DINs for Directors",
                  "RD Licence",
                  "Support for Unlimited Shareholders",
                  "Authorized Capital with No Limit",
                  "PAN & TAN Registration",
                  "ESI & PF Registration",
                  "Bank Account Opening Assistance",
                ],
              },
              {
                name: "Incorporation and Compliance",
                description: companyComplianceNote,
                price: 19899,
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "Unlimited Name Approval Attempts",
                  "Company Incorporation",
                  "MOA & AOA Drafting",
                  "3 DINs for Directors",
                  "RD Licence",
                  "Support for Unlimited Shareholders",
                  "Authorized Capital with No Limit",
                  "PAN & TAN Registration",
                  "ESI & PF Registration",
                  "MCA Annual Filing (MGT-7 & AOC-4)",
                  "DIR-3 eKYC Web Form",
                  "ITR-7 Return Filing",
                  "Financial Statement",
                  "Automated Bookkeeping",
                  "Bank Account Opening Assistance",
                  "AGM",
                  "Board Meeting",
                  "Directors Appointment",
                ],
                popular: true,
              },
            ],
            addOns: ["PF Return", "TDS Return"],
            timeline: "7–10 days",
            featured: true,
          },
          {
            slug: "trust-registration",
            name: "Trust Registration",
            heading: "Trust Registration in India",
            tagline:
              "Register a trust in India with expert assistance including trust deed drafting, PAN registration and statutory compliance support to start your non-profit legally today.",
            about: {
              title: "Start your trust registration",
              body: "Trust registration for non-profits in India with complete legal support. Our service includes trust deed drafting, PAN registration and the registration certificate, for a smooth and hassle-free process.",
              points: [
                "Trust deed drafting",
                "PAN card registration",
                "Income tax filing",
                "Dedicated compliance expert",
              ],
            },
            packages: [
              {
                name: "Trust Deed",
                description:
                  "Get your trust registered in just 5–7 days — online and hassle-free — with an expert-drafted deed. Government fees, stamp paper and notary charges are borne by the client.",
                price: 2899,
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "Trust Deed Draft",
                  "PAN Card Registration",
                  "Bank Account Opening Assistance",
                ],
              },
              {
                name: "Trust — Deed & ITR",
                description:
                  "Expert-drafted trust deed, ITR filing and 1-year access to accounting software. Government fees, stamp paper and notary charges are borne by the client.",
                price: 10899,
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "Trust Deed Draft",
                  "PAN Card Registration",
                  "ITR-7 Return Filing",
                  "Bank Account Opening Assistance",
                ],
              },
              {
                name: "Trust — Deed, ITR, 12A & 80G",
                description:
                  "Expert-drafted trust deed, ITR filing, 12A & 80G registration and 1-year access to accounting software. Government fees, stamp paper and notary charges are borne by the client.",
                price: 26899,
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "Trust Deed Draft",
                  "PAN Card Registration",
                  "ITR-7 Return Filing",
                  "12A Registration",
                  "80G Registration",
                  "Bank Account Opening Assistance",
                ],
                popular: true,
              },
            ],
            timeline: "5–7 days",
          },
          {
            slug: "public-limited-company",
            name: "Public Limited Company",
            heading: "Public Limited Company Registration in India",
            tagline:
              "Incorporate a Public Limited Company in India with complete legal support. Includes MCA name approval, MOA & AOA drafting, PAN & TAN registration, and statutory compliance support. Ideal for large businesses and fundraising.",
            about: {
              title: "Start your public limited company",
              body: "Public Limited Company registration in India enables capital raising. We provide full incorporation services, including MCA filing, share structure and Certificate of Incorporation.",
              points: [
                "MCA name approval",
                "Company incorporation",
                "MOA & AOA drafting",
                "PAN & TAN registration",
                "Required documents guidance",
              ],
            },
            packages: [],
          },
          {
            slug: "producer-company",
            name: "Producer Company",
            heading: "Producer Company Registration in India",
            tagline:
              "Incorporate a Farmer Producer Company in India with expert assistance. Includes MCA name approval, MOA & AOA drafting, PAN & TAN registration, and complete incorporation support. Ideal for farmers and producer groups.",
            about: {
              title: "Start your producer company",
              body: "Register your Producer Company in India through the MCA, including name approval, incorporation, MOA & AOA, and statutory registrations, so farmers and producers can operate through a compliant corporate structure.",
              points: [
                "MCA name approval",
                "Producer company incorporation",
                "MOA & AOA drafting",
                "PAN & TAN registration",
                "Required documents guidance",
              ],
            },
            packages: [],
          },
          {
            slug: "indian-subsidiary",
            name: "Indian Subsidiary",
            heading: "Indian Subsidiary of a Foreign Company",
            tagline:
              "Set up a wholly-owned subsidiary of your foreign company in India as a private limited company, with FDI reporting and ongoing compliance support.",
            packages: [],
          },
          {
            slug: "msme-registration",
            name: "MSME Registration",
            shortName: "MSME / Udyam",
            heading: "MSME (Udyam) Registration",
            tagline:
              "Register your business as an MSME on the Udyam portal to access priority lending, subsidies and protection against delayed payments.",
            packages: [],
          },
        ],
      },
    ],
  }),

  pillar({
    slug: "mca",
    name: "MCA",
    description:
      "Annual ROC compliance for companies, LLPs and OPCs, plus every event-based MCA filing after incorporation.",
    groups: [
      {
        name: "Annual compliance",
        services: [
          {
            slug: "company-compliance",
            name: "Company Compliance",
            heading: "Company Annual Filing & ROC Compliance",
            tagline:
              "Company annual filing, mandated by the Companies Act, 2013, requires all registered companies, including private limited companies, to submit financial statements (AOC-4) and annual returns (MGT-7/MGT-7A) to the Registrar of Companies.",
            about: {
              title: "File your company compliance",
              points: [
                "AOC-4, MGT-7, DIR-3 KYC",
                "ITR-6 filing",
                "Dedicated compliance manager",
                "MSME form, DPT-3",
                "Automated bookkeeping & filing",
              ],
            },
            packages: [
              {
                name: "MCA Compliance — 1 Year",
                description:
                  "Maintain accounts, MCA and income tax compliance for your company with a dedicated Filing360 accountant.",
                price: 19899,
                per: "year",
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "MCA Annual Filing (AOC-4 & MGT-7)",
                  "ITR-6 Return Filing",
                  "DIR-3 Filing for Directors",
                  "Dedicated Compliance Advisor",
                  "Dedicated Accountant",
                  "Accounting Software Access",
                  "Automated Bookkeeping",
                ],
                popular: true,
              },
              {
                name: "MCA Compliance — 2 Years",
                description:
                  "Two years of accounts, MCA and income tax compliance with a dedicated Filing360 accountant.",
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "MCA Annual Filing (AOC-4 & MGT-7)",
                  "ITR-6 Return Filing",
                  "DIR-3 Filing for Directors",
                  "Dedicated Compliance Advisor",
                  "Dedicated Accountant",
                  "Accounting Software Access",
                  "Automated Bookkeeping",
                ],
              },
              {
                name: "MCA Compliance — 3 Years",
                description:
                  "Three years of accounts, MCA and income tax compliance with a dedicated Filing360 accountant.",
                priceNote: EXCL_GST_GOVT,
                inclusions: [
                  "MCA Annual Filing (AOC-4 & MGT-7)",
                  "ITR-6 Return Filing",
                  "DIR-3 Filing for Directors",
                  "Dedicated Compliance Advisor",
                  "Dedicated Accountant",
                  "Accounting Software Access",
                  "Automated Bookkeeping",
                ],
              },
            ],
            featured: true,
          },
          {
            slug: "llp-compliance",
            name: "LLP Compliance",
            heading: "LLP Annual Filing & ROC Compliance",
            tagline:
              "LLPs must comply with the Limited Liability Partnership Act, 2008 by filing Form 8 and Form 11 annually with the MCA. Timely filing keeps your LLP legally compliant and penalty-free.",
            about: {
              title: "File your LLP compliance",
              points: [
                "Form 8 filing",
                "Form 11 filing",
                "ITR-5 filing",
                "Dedicated compliance manager",
                "Automated bookkeeping & filing",
              ],
            },
            packages: ["Basic", "2 Years", "3 Years"].map((name) => ({
              name,
              description:
                "File your business tax returns and stay compliant with a dedicated Filing360 accountant and online compliance dashboard.",
              priceNote: EXCL_GST_GOVT,
              inclusions: [
                "Financial Statements",
                "DIN E-KYC for 2 Directors",
                "Income Tax Filing",
                "Annual Return Filing",
                "Online Compliance Dashboard",
              ],
            })),
            terms: ["Audit fees, if applicable, are payable directly to the auditor."],
          },
          {
            slug: "opc-compliance",
            name: "OPC Compliance",
            heading: "OPC Annual Filing & ROC Compliance",
            tagline:
              "OPC annual filing, mandated by the Companies Act, 2013, requires all registered One Person Companies to submit financial statements (AOC-4) and annual returns (MGT-7A) to the Registrar of Companies.",
            about: {
              title: "File your OPC compliance",
              points: [
                "AOC-4, MGT-7A, DIR-3 KYC",
                "ITR-6 filing",
                "Dedicated compliance manager",
                "Automated bookkeeping & filing",
              ],
            },
            packages: [
              "MCA Compliance — 1 Year",
              "MCA Compliance — 2 Years",
              "MCA Compliance — 3 Years",
            ].map((name) => ({
              name,
              description:
                "File your business tax returns and stay compliant with a dedicated Filing360 accountant and online compliance dashboard.",
              priceNote: EXCL_GST_GOVT,
              inclusions: [
                "Accounting Software — 1 Year",
                "Online Compliance Dashboard",
                "Dedicated Accountant",
                "Dedicated Compliance Advisor",
                "MCA Annual Filing (AOC-4 & MGT-7A for OPC)",
                "Annual Bookkeeping",
                "Financial Statement Preparation",
                "ITR-6 Return Filing",
                "DIN KYC for 1 Director",
              ],
            })),
          },
        ],
      },
      {
        name: "Changes & event-based filings",
        services: [
          {
            slug: "company-name-change",
            name: "Name Change — Company",
            shortName: "Company Name Change",
            heading: "Change Company Name Online",
            tagline:
              "Easily change your company name with Filing360. We handle the MCA filing, board resolution and MOA/AOA updates, so you get your fresh Certificate of Incorporation quickly and legally.",
            packages: [],
          },
          {
            slug: "registered-office-change",
            name: "Registered Office Change",
            heading: "Change of Registered Office",
            tagline:
              "Shift your registered office within the city, to another ROC or to another state — with resolutions and MCA forms filed for you.",
            packages: [],
          },
          {
            slug: "din-ekyc-filing",
            name: "DIN eKYC Filing",
            heading: "DIN eKYC (DIR-3 KYC) Filing",
            tagline:
              "Annual DIR-3 KYC for every director holding a DIN — file on time and keep your DIN active.",
            packages: [],
          },
          {
            slug: "din-reactivation",
            name: "DIN Reactivation",
            heading: "DIN Reactivation",
            tagline:
              "DIN deactivated for a missed KYC? We file DIR-3 KYC with the late fee and get your DIN reactivated.",
            packages: [],
          },
          {
            slug: "director-change",
            name: "Director Change",
            heading: "Appointment of Director",
            tagline:
              "Appoint a new director with consent, board resolutions and DIR-12 filed with the ROC.",
            packages: [],
          },
          {
            slug: "remove-director",
            name: "Remove Director",
            heading: "Resignation / Removal of Director",
            tagline:
              "Record a director's resignation or removal with the required resolutions and DIR-11 / DIR-12 filings.",
            packages: [],
          },
          {
            slug: "adt-1-filing",
            name: "ADT-1 Filing",
            heading: "Auditor Appointment — ADT-1 Filing",
            tagline:
              "Intimate the ROC about your auditor's appointment in Form ADT-1 within 15 days of the meeting.",
            packages: [],
          },
          {
            slug: "dpt-3-filing",
            name: "DPT-3 Filing",
            heading: "DPT-3 Filing",
            tagline:
              "Annual return of deposits and outstanding loans in Form DPT-3, due by 30 June every year.",
            packages: [],
          },
          {
            slug: "llp-form-11-filing",
            name: "LLP Form 11 Filing",
            heading: "LLP Form 11 Filing",
            tagline:
              "Annual return of an LLP in Form 11, due by 30 May, with partner and contribution details.",
            packages: [],
          },
          {
            slug: "dormant-status-filing",
            name: "Dormant Status Filing",
            heading: "Dormant Company Status (MSC-1)",
            tagline:
              "Apply for dormant status for a company with no significant transactions, and reduce your ongoing compliance.",
            packages: [],
          },
          {
            slug: "moa-amendment",
            name: "MOA Amendment",
            heading: "MOA Amendment",
            tagline:
              "Change your company's objects, name or capital clause with a special resolution and MGT-14 filing.",
            packages: [],
          },
          {
            slug: "aoa-amendment",
            name: "AOA Amendment",
            heading: "AOA Amendment",
            tagline:
              "Alter your Articles of Association with a special resolution and MGT-14 filed with the ROC.",
            packages: [],
          },
          {
            slug: "authorized-capital-increase",
            name: "Authorized Capital Increase",
            heading: "Increase Authorised Capital",
            tagline:
              "Increase your company's authorised share capital with SH-7 filing, resolutions and an updated MOA.",
            packages: [],
          },
          {
            slug: "share-transfer",
            name: "Share Transfer",
            heading: "Share Transfer",
            tagline:
              "Transfer shares between shareholders with the SH-4 transfer deed, stamp duty guidance and register updates.",
            packages: [],
          },
          {
            slug: "demat-of-shares",
            name: "Demat of Shares",
            heading: "Dematerialisation of Shares",
            tagline:
              "Convert physical share certificates to demat form, with ISIN and depository coordination.",
            packages: [],
          },
          {
            slug: "winding-up-llp",
            name: "Winding Up — LLP",
            heading: "Close an LLP",
            tagline: "Close an inactive LLP with Form 24 strike-off filing and the required statements.",
            packages: [],
          },
          {
            slug: "winding-up-company",
            name: "Winding Up — Company",
            heading: "Close a Company",
            tagline:
              "Strike off a defunct company with STK-2 filing, indemnity bond and statement of accounts.",
            packages: [],
          },
          {
            slug: "commencement-inc-20a",
            name: "Commencement (INC-20A)",
            heading: "Commencement of Business — INC-20A",
            tagline:
              "File the declaration for commencement of business (INC-20A) within 180 days of incorporation.",
            packages: [],
          },
        ],
      },
    ],
  }),

  pillar({
    slug: "funds",
    name: "Funds",
    description:
      "Bankable CMA reports, TEV studies and investor-ready pitch decks for loans, project finance and fundraising.",
    groups: [
      {
        services: [
          {
            slug: "cma-report",
            name: "CMA Report",
            heading: "CMA Report",
            tagline:
              "Credit Monitoring Arrangement (CMA) data prepared for bank loans, working-capital limits and project finance.",
            packages: [],
            featured: true,
          },
          {
            slug: "tev-report",
            name: "TEV Report",
            shortName: "TEV Report",
            heading: "TEV Report",
            tagline:
              "Techno-Economic Viability (TEV) study for lenders and institutions evaluating your project’s commercial feasibility.",
            packages: [],
          },
          {
            slug: "pitch-deck-for-startup",
            name: "Pitch Deck for Startup",
            shortName: "Pitch Deck",
            heading: "Pitch Deck for Startup",
            tagline:
              "Investor-ready pitch decks covering problem, market, traction, financials and ask — built with CA-backed numbers.",
            packages: [],
          },
        ],
      },
    ],
  }),

  pillar({
    slug: "accounting",
    name: "Accounting / CFO",
    description:
      "Bookkeeping, Virtual CFO, Ind AS / IFRS, consolidation, MIS and finance SOPs — for growing businesses.",
    groups: [
      {
        name: "Accounting & CFO",
        services: [
          {
            slug: "accounting-bookkeeping",
            name: "Accounting & Bookkeeping",
            heading: "Accounting & Bookkeeping",
            tagline:
              "Monthly bookkeeping, reconciliations and financial statements maintained by a dedicated Filing360 accountant.",
            packages: [],
            featured: true,
          },
          {
            slug: "rcm-preparation",
            name: "RCM Preparation",
            heading: "RCM Preparation",
            tagline:
              "Identify and prepare GST reverse charge (RCM) liabilities so your returns and input credit stay accurate.",
            packages: [],
          },
          {
            slug: "sop-designing",
            name: "SOP Designing",
            heading: "SOP Designing",
            tagline:
              "Standard operating procedures for finance, accounts and compliance processes, tailored to your business.",
            packages: [],
          },
          {
            slug: "ind-as-conversion",
            name: "Ind AS Conversion",
            heading: "Ind AS Conversion",
            tagline:
              "Convert your financial statements to Indian Accounting Standards (Ind AS) with impact analysis and disclosures.",
            packages: [],
          },
          {
            slug: "ifrs",
            name: "IFRS",
            heading: "IFRS Reporting",
            tagline:
              "IFRS-compliant financial statements and conversion support for businesses reporting to overseas parents or investors.",
            packages: [],
          },
          {
            slug: "consolidation",
            name: "Consolidation",
            heading: "Consolidation of Financial Statements",
            tagline:
              "Consolidated financial statements for groups with subsidiaries, associates or joint ventures.",
            packages: [],
          },
          {
            slug: "mis-dashboard-for-startups",
            name: "MIS Dashboard for Startups",
            shortName: "MIS Dashboard",
            heading: "MIS Dashboard for Startups",
            tagline:
              "Monthly MIS dashboards that show founders and investors revenue, burn, runway and key metrics at a glance.",
            packages: [],
          },
        ],
      },
    ],
  }),

  pillar({
    slug: "other-services",
    name: "Other Services",
    description:
      "Website, logo, SEO, performance marketing and ads — digital presence that supports your brand and growth.",
    groups: [
      {
        services: [
          {
            slug: "website-designing",
            name: "Website Designing",
            heading: "Website Designing",
            tagline:
              "Clean, conversion-focused websites for startups and professional firms — built to load fast and look credible.",
            packages: [],
            featured: true,
          },
          {
            slug: "logo-designing",
            name: "Logo Designing",
            heading: "Logo Designing",
            tagline: "A professional logo for your new business, designed to work across print and digital.",
            packages: [],
          },
          {
            slug: "seo",
            name: "SEO",
            heading: "Search Engine Optimisation (SEO)",
            tagline:
              "Technical and content SEO so your service pages and blogs rank for the queries your customers actually search.",
            packages: [],
          },
          {
            slug: "performance-marketing",
            name: "Performance Marketing",
            heading: "Performance Marketing",
            tagline:
              "Paid acquisition programmes measured on leads and ROAS — not vanity clicks — across search and social.",
            packages: [],
          },
          {
            slug: "ads",
            name: "Ads",
            heading: "Ads",
            tagline:
              "Google, Meta and LinkedIn ad creatives and campaigns tuned for compliance and professional-service leads.",
            packages: [],
          },
        ],
      },
    ],
  }),
];

/** Lowest listed price across a service's packages */
export function servicePriceFrom(service: Service): number | null {
  const prices = service.packages
    .map((p) => p.price)
    .filter((p): p is number => typeof p === "number");
  return prices.length ? Math.min(...prices) : null;
}

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

export function serviceHref(pillar: Pillar, service: Service) {
  return `/services/${pillar.slug}/${service.slug}`;
}

/** Category link — goes straight to the service when the category has only one */
export function pillarHref(pillar: Pillar) {
  return pillar.services.length === 1
    ? serviceHref(pillar, pillar.services[0])
    : `/services/${pillar.slug}`;
}

export function getAllFeaturedServices() {
  return pillars.flatMap((pillar) =>
    pillar.services
      .filter((s) => s.featured && servicePriceFrom(s) !== null)
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

export function formatPer(per?: string) {
  if (!per) return "";
  return per === "one-time" ? "one-time" : `per ${per}`;
}

export const faqs = [
  {
    q: "Is Filing360 a government website?",
    a: "No. Filing360 is a private facilitation platform. Company registrations, GSTINs and tax registrations are issued only by government authorities such as the Ministry of Corporate Affairs (MCA), GSTN and the Income Tax Department.",
  },
  {
    q: "What is included in the professional fee vs government fees?",
    a: "Professional fees cover expert guidance, document drafting and filing assistance. Our prices are exclusive of GST. Government fees, stamp duty, notary and Digital Signature Certificate (DSC) costs are extra and vary by state, authorised capital and entity type. We share the full estimate in writing before you pay.",
  },
  {
    q: "How long does Private Limited company registration take in India?",
    a: "With complete documents, most incorporations take about 7–10 days. Name objections, incomplete proofs or MCA queries can extend this. Foreign or NRI directors usually need more time for apostille and notarisation.",
  },
  {
    q: "What documents are required to register a company?",
    a: "Typically: PAN and Aadhaar of directors/subscribers, photographs, address proof, registered office proof with owner NOC, and DSC for signing. Exact requirements depend on whether you choose Pvt. Ltd., LLP or OPC and whether directors are residents.",
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
    a: "Not always on day one. GST is typically required when you cross the turnover threshold, sell online across states, or otherwise fall under mandatory categories. Our ₹99 GST applicability evaluation tells you whether you need it — and GST registration is included in our company incorporation packages.",
  },
  {
    q: "Do you help after incorporation?",
    a: "Yes. GST return filing, income tax returns, annual MCA compliance (AOC-4, MGT-7, director KYC) and event-based changes are all handled on the same desk, so you don’t chase multiple vendors.",
  },
];
