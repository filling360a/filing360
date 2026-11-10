/** MCA and ROC hub — condensed from the MCA launch article, branded Filing360. */

import type { HubMeta, HubPackageRow, HubTocItem, SeoBlock } from "@/content/seoTypes";
import { formatInr } from "./services";

export const MCA_HUB_PATH = "/services/mca";
export const MCA_HUB_UPDATED = "2026-11-10";

export const MCA = {
  company: "/services/mca/company-compliance",
  llp: "/services/mca/llp-compliance",
  opc: "/services/mca/opc-compliance",
  name: "/services/mca/company-name-change",
  office: "/services/mca/registered-office-change",
  dinKyc: "/services/mca/din-ekyc-filing",
  dinReactivate: "/services/mca/din-reactivation",
  director: "/services/mca/director-change",
  remove: "/services/mca/remove-director",
  adt1: "/services/mca/adt-1-filing",
  dpt3: "/services/mca/dpt-3-filing",
  form11: "/services/mca/llp-form-11-filing",
  dormant: "/services/mca/dormant-status-filing",
  moa: "/services/mca/moa-amendment",
  aoa: "/services/mca/aoa-amendment",
  capital: "/services/mca/authorized-capital-increase",
  transfer: "/services/mca/share-transfer",
  demat: "/services/mca/demat-of-shares",
  windLlp: "/services/mca/winding-up-llp",
  portal: "https://www.mca.gov.in/",
} as const;

export const mcaHubMeta: HubMeta = {
  title: "MCA & ROC Compliance Services Online | Filing360",
  description:
    "Annual ROC filing, ADT-1, DPT-3, DIN KYC, director change, name change, office shift, share transfer, demat and LLP closure by CAs and CSs.",
  h1: "MCA & ROC Compliance Services for Companies and LLPs",
  keywords: [
    "ROC compliance services",
    "MCA compliance",
    "annual compliance for private limited company",
    "ROC filing online",
    "LLP annual filing",
    "AOC-4 MGT-7 filing",
    "company secretarial services",
    "DIR-3 KYC",
    "DPT-3 filing",
    "ADT-1 filing",
  ],
};

export const mcaToc: HubTocItem[] = [
  { id: "packages", label: "Packages & pricing" },
  { id: "what-is-roc-compliance", label: "What is ROC compliance?" },
  { id: "company-calendar", label: "Company annual calendar" },
  { id: "llp-calendar", label: "LLP annual calendar" },
  { id: "event-based", label: "Event-based filings" },
  { id: "penalties", label: "Penalties" },
  { id: "why-filing360", label: "Why Filing360" },
  { id: "faqs", label: "FAQs" },
];

export const mcaPackages: HubPackageRow[] = [
  {
    name: "Annual compliance — private limited company",
    includes: "AOC-4, MGT-7, DIR-3 KYC, ITR-6 and a dedicated accountant. Two- and three-year plans available.",
    price: `${formatInr(19899)} / year`,
    href: MCA.company,
  },
  {
    name: "Annual compliance — OPC",
    includes: "AOC-4, MGT-7A, DIN KYC for one director and ITR-6",
    price: `${formatInr(17899)} / year`,
    href: MCA.opc,
  },
  {
    name: "Annual compliance — LLP",
    includes: "Form 8, Form 11, ITR-5 and DIN eKYC for two designated partners",
    price: `${formatInr(17899)} / year`,
    href: MCA.llp,
  },
  {
    name: "Event-based filings",
    includes: "Name, registered office, director, MOA, AOA and authorised capital",
    price: `From ${formatInr(1499)}`,
    href: MCA.name,
  },
  {
    name: "DIN eKYC / DIN reactivation",
    includes: `DIR-3 KYC or DIR-3 KYC-Web. Reactivation also needs the ${formatInr(5000)} MCA late fee.`,
    price: formatInr(1499),
    href: MCA.dinKyc,
  },
  {
    name: "Demat of shares",
    includes: "ISIN, RTA appointment, depository agreements and PAS-6. Depository and RTA charges are extra.",
    price: formatInr(1999),
    href: MCA.demat,
  },
  {
    name: "LLP winding up",
    includes: "Form 24 strike-off, or voluntary liquidation where the LLP has assets or liabilities",
    price: formatInr(6999),
    href: MCA.windLlp,
  },
];

export const mcaArticle: SeoBlock[] = [
  {
    type: "p",
    title: "What is ROC compliance?",
    body: "ROC compliance is the set of forms, returns and resolutions a company or LLP must file with the Registrar of Companies under the Companies Act, 2013 or the Limited Liability Partnership Act, 2008. Annual filings are due every year even when the business was inactive. Event-based filings are due within a fixed number of days after a change. Missing them leads to an additional fee of ₹100 per day of delay, penalties on the company and its officers, director disqualification and, in time, strike-off.",
  },
  {
    type: "table",
    title: "Annual ROC compliance calendar for a private limited company",
    columns: ["Compliance", "Form", "Due date"],
    rows: [
      ["Auditor appointment intimation", "ADT-1", "Within 15 days of the AGM at which the auditor is appointed"],
      ["Board meetings", "—", "At least 4 a year, with a gap of not more than 120 days (2 a year for small companies and OPCs)"],
      ["Annual General Meeting", "—", "By 30 September (within 6 months of the year-end)"],
      ["Financial statements", "AOC-4", "Within 30 days of the AGM"],
      ["Annual return", "MGT-7 / MGT-7A (small companies and OPCs)", "Within 60 days of the AGM"],
      ["Return of deposits", "DPT-3", "By 30 June each year"],
      ["Director KYC", "DIR-3 KYC", "As per the current MCA KYC cycle, and on any change in contact details"],
      ["MSME outstanding payments", "MSME-1", "Half-yearly, 30 April and 31 October, where applicable"],
      ["Director disclosure of interest", "MBP-1", "At the first board meeting of each financial year"],
      ["Demat reconciliation", "PAS-6", "Half-yearly, for unlisted public companies and private companies required to dematerialise"],
    ],
    note: "With the AGM held by 30 September, AOC-4 usually falls on 29 or 30 October and MGT-7 or MGT-7A on 28 or 29 November. Due dates move when MCA notifies an extension.",
  },
  {
    type: "table",
    title: "Annual compliance calendar for an LLP",
    columns: ["Compliance", "Form", "Due date"],
    rows: [
      ["Annual return", "Form 11", "30 May (within 60 days of the year-end)"],
      ["Statement of Account and Solvency", "Form 8", "30 October"],
      ["Designated partner KYC", "DIR-3 KYC", "As per the current MCA KYC cycle"],
      ["Income tax return", "ITR-5", "31 July, or 31 October if audit is required"],
    ],
    note: "An LLP’s accounts must be audited if turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh.",
  },
  {
    type: "table",
    title: "Event-based MCA services",
    columns: ["Service", "What is filed", "Timing"],
    rows: [
      ["Company name change", "RUN name reservation, special resolution, MGT-14 and INC-24", "Typically 2–4 weeks"],
      ["Registered office change", "INC-22; MGT-14 and INC-23 when the city, ROC or state changes", "3–5 working days in the same city; 2–3 months across states"],
      ["DIN eKYC", "DIR-3 KYC or DIR-3 KYC-Web", "Each KYC cycle, and when mobile, email or address changes"],
      ["DIN reactivation", `DIR-3 KYC with the ${formatInr(5000)} late fee`, "Usually 1–2 working days after filing"],
      ["Director appointment or resignation", "DIR-2, DIR-8, resolution and DIR-12", "Within 30 days"],
      ["Removal of a director", "Section 169 special notice, ordinary resolution and DIR-12", "Special notice at least 14 days before the meeting"],
      ["Auditor appointment", "ADT-1", "Within 15 days of the meeting"],
      ["Return of deposits", "DPT-3", "By 30 June"],
      ["LLP annual return", "Form 11", "By 30 May, even with no business"],
      ["Dormant status", "MSC-1; then MSC-3 each year; MSC-4 to become active", "After the ROC issues the MSC-2 certificate"],
      ["MOA amendment", "Special resolution and MGT-14 (INC-24 for a name change)", "MGT-14 within 30 days"],
      ["AOA amendment", "Special resolution under Section 14 and MGT-14", "Within 30 days"],
      ["Authorised capital increase", "Shareholder resolution, altered capital clause and SH-7", "SH-7 within 30 days"],
      ["Share transfer", "SH-4 or a depository instruction, stamp duty and register update", "Lodge a physical deed within 60 days of execution"],
      ["Demat of shares", "RTA, NSDL or CDSL agreements, ISIN and half-yearly PAS-6", "Required before further issue or transfer where demat is mandatory"],
      ["LLP closure", "Form 24 strike-off, or voluntary liquidation under the IBC", "Strike-off is usually 3–6 months after Form 24"],
    ],
  },
  {
    type: "table",
    title: "Penalties for non-compliance",
    columns: ["Default", "Consequence"],
    rows: [
      ["Late filing of any MCA form", "Additional fee of ₹100 per day of delay, with higher multiples in some cases"],
      ["Financial statements or annual returns not filed for 3 years", "Directors disqualified for 5 years under Section 164(2)"],
      ["No filing for 2 years and no business", "The ROC can strike the company off under Section 248"],
      ["DIR-3 KYC not filed", `DIN deactivated; ${formatInr(5000)} fee to reactivate`],
      ["LLP Form 8 or Form 11 filed late", "₹100 per day per form, with no upper cap"],
      ["Event-based form not filed in time", "Penalty on the company and every officer in default under the relevant section"],
    ],
  },
  {
    type: "list",
    title: "Why choose Filing360 for MCA compliance?",
    items: [
      "Filings prepared by Chartered Accountants and Company Secretaries",
      "Board and shareholder documents included: notices, resolutions, minutes and consent letters",
      "Professional fees quoted before work starts, with government fees shown separately",
      "A compliance calendar with reminders for every annual and event-based due date",
      "MCA V3 filing, including portal errors, resubmissions and ROC queries",
    ],
  },
  {
    type: "p",
    title: "Government fees",
    body: "Government filing fees and stamp duty are charged at actuals. They depend on the form, the company’s authorised capital and the state of the registered office. Filing360 shares that estimate before you pay.",
  },
];

export const mcaFaqs: { q: string; a: string }[] = [
  {
    q: "Is ROC compliance required if my company had no business this year?",
    a: "Yes. AOC-4, MGT-7 or MGT-7A, DPT-3 and DIR-3 KYC are still due. If the company will stay inactive, consider applying for dormant status.",
  },
  {
    q: "What happens if I don’t file ROC returns?",
    a: "You pay ₹100 per day of delay per form. After three years of non-filing, the directors can be disqualified and the company can be struck off.",
  },
  {
    q: "What is the due date for AOC-4 and MGT-7?",
    a: "AOC-4 is due within 30 days of the AGM and MGT-7 or MGT-7A within 60 days of the AGM. With the AGM by 30 September, these usually fall on 29 or 30 October and 28 or 29 November.",
  },
  {
    q: "Is ADT-1 required every year?",
    a: "No. ADT-1 is filed when an auditor is appointed, typically for a five-year term, and again on reappointment or a change of auditor.",
  },
  {
    q: "Who must file DPT-3?",
    a: "Every company except government companies, banking companies, NBFCs and housing finance companies, even if it has not accepted deposits. The form reports loans and other receipts that are not deposits.",
  },
  {
    q: "Can an LLP be closed without filing pending returns?",
    a: "No. Pending Form 8 and Form 11 must be filed before applying for strike-off in Form 24.",
  },
  {
    q: "Is demat of shares compulsory for private companies?",
    a: "Yes for private companies other than small companies, under the Companies (Prospectus and Allotment of Securities) Rules. Small companies are currently exempt.",
  },
  {
    q: "How long does a company name change take?",
    a: "Typically 2–4 weeks, depending on name approval and ROC processing.",
  },
];
