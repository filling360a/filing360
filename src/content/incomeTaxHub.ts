import type { HubMeta, HubPackageRow, HubTocItem, SeoBlock } from "./seoTypes";
import { formatInr } from "./services";

export const IT_HUB_PATH = "/services/income-tax";
export const IT_HUB_UPDATED = "2026-11-10";

export const IT = {
  individual: "/services/income-tax/itr-filing-individual",
  proprietorship: "/services/income-tax/itr-filing-sole-proprietorship",
  company: "/services/income-tax/itr-filing-company",
  partnership: "/services/income-tax/itr-filing-partnership-firm",
  trust: "/services/income-tax/itr-filing-trust-ngo",
  efiling: "/services/income-tax/income-tax-e-filing",
  audit: "/services/income-tax/tax-audit",
  tds: "/services/income-tax/tds-return-filing",
  notice: "/services/income-tax/income-tax-notice",
  revised: "/services/income-tax/revised-return",
  updated: "/services/income-tax/updated-return",
  advanceTax: "/services/income-tax/advance-tax-calculation",
  planning: "/services/income-tax/tax-planning",
  portal: "https://www.incometax.gov.in/",
  blogBelated: "/blog/belated-revised-updated-itr",
  blogAdvance: "/blog/advance-tax-due-dates",
  blogRegime: "/blog/old-vs-new-tax-regime",
  blogAct2025: "/blog/income-tax-act-2025",
} as const;

export const incomeTaxHubMeta: HubMeta = {
  title: "Income Tax Return Filing, Tax Audit & TDS by CAs | Filing360",
  description:
    "Online ITR filing for salaried, NRIs and businesses, tax audit, TDS returns, notice replies and tax planning by Chartered Accountants.",
  h1: "Income Tax Services: ITR Filing, Tax Audit, TDS & Notices",
  keywords: [
    "income tax return filing online",
    "ITR filing by CA",
    "tax audit services",
    "TDS return filing",
    "income tax notice reply",
    "tax planning",
    "NRI ITR filing",
  ],
};

export const incomeTaxToc: HubTocItem[] = [
  { id: "packages", label: "Packages & pricing" },
  { id: "act-2025", label: "Income-tax Act, 2025" },
  { id: "itr-individuals", label: "ITR for individuals" },
  { id: "itr-business", label: "ITR for businesses" },
  { id: "tax-audit", label: "Tax audit" },
  { id: "tds", label: "TDS returns" },
  { id: "notices", label: "Notice reply" },
  { id: "revised-updated", label: "Revised & updated returns" },
  { id: "planning", label: "Tax planning & advance tax" },
  { id: "due-dates", label: "Key due dates" },
  { id: "why", label: "Why Filing360" },
  { id: "faqs", label: "FAQs" },
];

export const incomeTaxPackages: HubPackageRow[] = [
  {
    name: "ITR — Salary",
    includes: "Salary, one house property, interest income",
    price: formatInr(999),
    href: IT.individual,
  },
  {
    name: "ITR — Capital gains",
    includes: "Shares, mutual funds, property sale",
    price: formatInr(2999),
    href: IT.individual,
  },
  {
    name: "ITR — Business / professional",
    includes: "Presumptive or regular books",
    price: formatInr(2499),
    href: IT.proprietorship,
  },
  {
    name: "ITR — NRI",
    includes: "Indian income, DTAA relief",
    price: formatInr(4499),
    href: IT.individual,
  },
  {
    name: "Tax audit",
    includes: "Audit + Form 3CD + ITR support",
    price: `From ${formatInr(7499)}`,
    href: IT.audit,
  },
  {
    name: "TDS returns",
    includes: "Per quarter filing + certificates",
    price: `${formatInr(999)} / quarter`,
    href: IT.tds,
  },
  {
    name: "Tax planning",
    includes: "Regime comparison and advance tax",
    price: `From ${formatInr(99)}`,
    href: IT.planning,
  },
  {
    name: "Advance tax",
    includes: "Calculation, instalments and quarterly review",
    price: formatInr(999),
    href: IT.advanceTax,
  },
  {
    name: "Revised / updated return",
    includes: "Correct mistakes or file ITR-U with CA review",
    price: formatInr(2899),
    href: IT.revised,
  },
  {
    name: "Notice reply",
    includes: "Review, reply and representation",
    price: formatInr(1999),
    href: IT.notice,
  },
];

export const incomeTaxArticle: SeoBlock[] = [
  {
    type: "p",
    title: "Income-tax Act, 2025: what you should know",
    body: "The Income-tax Act, 2025 replaced the Income-tax Act, 1961 from 1 April 2026. The new law uses a single “tax year” in place of “previous year” and “assessment year”, and reorganises and renumbers most sections, while tax rates have largely continued. Filing360 works under both laws, so returns, notices and planning use the correct provisions for each year.",
  },
  {
    type: "table",
    title: "Which law applies",
    columns: ["Period", "Law that applies"],
    rows: [
      ["FY 2025-26 and earlier years (returns filed in 2026 and later for these years)", "Income-tax Act, 1961"],
      ["Tax year 2026-27 onwards", "Income-tax Act, 2025"],
    ],
  },
  {
    type: "p",
    title: "ITR Filing for Individuals",
    body: "We compare the old and new tax regimes, check AIS, TIS and Form 26AS, claim eligible deductions and refunds, and file accurately for salaried employees, investors and NRIs.",
  },
  {
    type: "table",
    title: "Usual ITR forms for individuals",
    columns: ["Taxpayer", "Usual form"],
    rows: [
      ["Resident with salary, one house property, other sources and small LTCG on listed shares (total income up to ₹50 lakh)", "ITR-1"],
      ["Individuals and HUFs with capital gains, foreign assets, more than one house property, or income above ₹50 lakh, without business income", "ITR-2"],
      ["Individuals and HUFs with business or professional income", "ITR-3"],
      ["Residents opting for presumptive taxation (income up to ₹50 lakh)", "ITR-4"],
    ],
  },
  {
    type: "p",
    title: "ITR Filing for Businesses and Professionals",
    body: "Proprietors, professionals, partnership firms, LLPs and companies file ITR-3, ITR-4, ITR-5 or ITR-6. We prepare the computation of income, apply presumptive schemes where beneficial, reconcile with GST and TDS data, and file on time.",
  },
  {
    type: "p",
    title: "Tax Audit",
    body: "Businesses with turnover above ₹1 crore (₹10 crore where cash receipts and payments are each within 5%) and professionals with gross receipts above ₹50 lakh must get their accounts audited and file the tax audit report before the return. Certain presumptive taxpayers declaring lower profits are also covered.",
  },
  {
    type: "p",
    title: "TDS Return Filing",
    body: "Every person deducting TDS must deposit it by the due date and file quarterly TDS returns (24Q for salary, 26Q for other payments to residents, 27Q for non-residents, and 27EQ for TCS), then issue Form 16 or 16A.",
  },
  {
    type: "p",
    id: "notices",
    title: "Income Tax Notice Reply",
    body: "Notices for mismatches, defective returns, scrutiny or reassessment have strict timelines. We read the notice, reconcile your data, draft the reply and represent you before the tax department, including faceless proceedings.",
  },
  {
    type: "p",
    id: "revised-updated",
    title: "Revised and Updated Returns",
    body: "Need to correct a filed ITR before 31 December of the assessment year? File a revised return under Section 139(5). Missed that window? An updated return (ITR-U) under Section 139(8A) can still fix past years — up to 48 months after the assessment year — with additional tax. We advise which route fits and file it correctly the first time.",
  },
  {
    type: "p",
    id: "planning",
    title: "Tax Planning and Advance Tax",
    body: "Good tax planning is done during the year, not in March. We plan salary structure, investments, capital gains, business expenses and advance tax instalments so you stay compliant and avoid interest under Sections 234B and 234C.",
  },
  {
    type: "table",
    title: "Key income tax due dates (FY 2025-26)",
    columns: ["Compliance", "Due date"],
    rows: [
      ["ITR for individuals and others not requiring audit", "31 July 2026 (subject to any extension)"],
      ["Tax audit report", "30 September 2026"],
      ["ITR for audit cases", "31 October 2026"],
      ["ITR for transfer pricing cases", "30 November 2026"],
      ["Belated and revised returns", "31 December 2026 (subject to any change)"],
      ["Advance tax instalments for the current year", "15 June, 15 September, 15 December, 15 March"],
      ["TDS returns", "31 July, 31 October, 31 January, 31 May"],
    ],
  },
  {
    type: "list",
    title: "Why choose Filing360?",
    items: [
      "CA-reviewed returns: every return is checked by a Chartered Accountant before filing",
      "Regime comparison: old vs new tax regime calculated for you every year",
      "AIS and 26AS reconciliation to avoid mismatch notices",
      "Notice support: help if the department raises any query later",
      "Transparent fixed fees by type of income",
    ],
  },
];

export const incomeTaxFaqs = [
  {
    q: "Which tax regime is better for me?",
    a: "It depends on your income and deductions. The new regime has lower rates and a rebate that makes income up to ₹12 lakh tax-free for resident individuals (₹12.75 lakh for salaried with the standard deduction), but allows few deductions. We calculate both and recommend the lower one.",
  },
  {
    q: "Can I file my ITR after 31 July?",
    a: "Yes, a belated return can be filed by 31 December with a late fee, but some benefits, such as carrying forward certain losses, are lost.",
  },
  {
    q: "Do I need to file an ITR if my income is below the taxable limit?",
    a: "Not always, but filing is required in certain cases, such as high deposits or spending, foreign assets, or to claim a refund. It also helps with loans and visas.",
  },
  {
    q: "What happens if I don’t file TDS returns on time?",
    a: "A late fee of ₹200 per day applies, up to the TDS amount, plus possible penalty and interest on late deposit.",
  },
  {
    q: "Are the old section numbers still valid?",
    a: "For FY 2025-26 and earlier years, yes. From tax year 2026-27, the Income-tax Act, 2025 applies with new numbering.",
  },
];
