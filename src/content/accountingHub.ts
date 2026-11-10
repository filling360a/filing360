import type { HubMeta, HubPackageRow, HubTocItem, SeoBlock } from "./seoTypes";

export const ACCOUNTING_HUB_PATH = "/services/accounting";
export const ACCOUNTING_HUB_UPDATED = "2026-11-10";

export const ACC = {
  books: "/services/accounting/accounting-bookkeeping",
  rcm: "/services/accounting/rcm-preparation",
  sop: "/services/accounting/sop-designing",
  indAs: "/services/accounting/ind-as-conversion",
  ifrs: "/services/accounting/ifrs",
  consolidation: "/services/accounting/consolidation",
  mis: "/services/accounting/mis-dashboard-for-startups",
  blogVcfo: "/blog/what-is-a-virtual-cfo",
  blogMis: "/blog/what-is-mis-reporting",
  blogIndAs116: "/blog/ind-as-116-lease-accounting-example",
} as const;

export const accountingHubMeta: HubMeta = {
  title: "Accounting, MIS, Virtual CFO & Ind AS Services | Filing360",
  description:
    "Bookkeeping, MIS dashboards, Virtual CFO support, SOPs, RCM and Ind AS conversion, consolidation and lease accounting by Chartered Accountants.",
  h1: "Accounting, MIS, Virtual CFO & Ind AS Services",
  keywords: [
    "outsourced accounting",
    "MIS reporting",
    "virtual CFO",
    "Ind AS conversion",
    "consolidation Ind AS",
    "Ind AS 116",
    "SOP designing",
  ],
};

export const accountingToc: HubTocItem[] = [
  { id: "packages", label: "Packages & pricing" },
  { id: "bookkeeping", label: "Bookkeeping" },
  { id: "mis", label: "MIS & dashboards" },
  { id: "vcfo", label: "Virtual CFO" },
  { id: "sop-rcm", label: "SOPs & RCM" },
  { id: "ind-as", label: "Ind AS advisory" },
  { id: "faqs", label: "FAQs" },
];

export const accountingPackages: HubPackageRow[] = [
  {
    name: "Accounting & Bookkeeping",
    includes: "Monthly books, reconciliations and statements",
    price: "From ₹3,000 / month",
    href: ACC.books,
  },
  {
    name: "MIS Dashboard",
    includes: "Owner / investor dashboards from your books",
    price: "₹10,000",
    href: ACC.mis,
  },
  {
    name: "SOP Designing",
    includes: "Finance and compliance process documentation",
    price: "₹25,000",
    href: ACC.sop,
  },
  {
    name: "RCM Preparation",
    includes: "Reverse charge liability identification and process mapping",
    price: "₹25,000",
    href: ACC.rcm,
  },
  {
    name: "Ind AS Conversion",
    includes: "First-time adoption and opening balance sheet",
    price: "From ₹30,000",
    href: ACC.indAs,
  },
  {
    name: "Consolidation",
    includes: "Ind AS 110 / 28 / 111 consolidation workings",
    price: "₹50,000",
    href: ACC.consolidation,
  },
];

export const accountingArticle: SeoBlock[] = [
  {
    type: "p",
    title: "Accounting and Bookkeeping Services",
    body: "Bookkeeping is the daily recording of every sale, purchase, expense, receipt and payment. Accounting goes further: reconciling accounts, making adjustments and preparing financial statements. Without both, GST returns, income tax filings, loans and audits all become harder and costlier.",
  },
  {
    type: "list",
    title: "What the law requires",
    items: [
      "Companies must keep books of account on accrual basis and double-entry system at the registered office under Section 128 of the Companies Act, 2013, preserved for 8 years.",
      "Companies using accounting software must use software with an audit trail (edit log) that cannot be disabled, and keep a daily backup on servers located in India.",
      "GST-registered businesses must keep records for 72 months from the due date of the annual return.",
      "Individuals, firms and LLPs in business or profession must keep books once their income or turnover crosses the limits under the Income-tax law.",
    ],
  },
  {
    type: "list",
    title: "What our accounting service covers",
    items: [
      "Recording sales, purchases, expenses, receipts and payments",
      "Bank, cash, GST and TDS reconciliations",
      "Accounts receivable and payable tracking with ageing",
      "Payroll entries, fixed assets and depreciation",
      "Month-end closing, trial balance and financial statements",
      "Year-end support for audit and income tax",
    ],
  },
  {
    type: "p",
    title: "MIS Reporting & Dashboards",
    body: "Management Information System (MIS) reports turn your books into decisions. A good monthly MIS shows profit, cash flow, receivables, payables, costs and budget versus actual. Dashboards in Power BI, Excel, Zoho Analytics or Looker Studio put the same view on one screen for owners and managers.",
  },
  {
    type: "p",
    title: "Virtual CFO Services",
    body: "A Virtual CFO is an experienced finance leader who works with your business part-time, for a fixed monthly fee. We set budgets and forecasts, manage cash flow, prepare you for bank loans and investor funding, and guide board reporting — sitting on top of your accounting and MIS.",
  },
  {
    type: "p",
    title: "SOPs and Risk & Control Matrices",
    body: "As you grow, undocumented processes break. We design finance SOPs and Risk and Control Matrices (RCM) so audit trails, maker-checker controls and handovers stay reliable.",
  },
  {
    type: "p",
    title: "Ind AS Advisory",
    body: "Indian Accounting Standards bring Indian reporting in line with IFRS, with judgement-heavy areas such as fair values, leases, share-based payments and consolidation. Filing360 helps companies convert to Ind AS, prepare consolidated financial statements, apply Ind AS 116 and Ind AS 102, and get ready for proposed Ind AS 118.",
  },
  {
    type: "table",
    title: "Who must follow Ind AS?",
    columns: ["Category", "Ind AS mandatory from"],
    rows: [
      ["Listed and unlisted companies with net worth of ₹500 crore or more", "FY 2016-17"],
      ["Companies listed or in the process of listing (other than SME), and unlisted companies with net worth of ₹250 crore or more", "FY 2017-18"],
      ["Holding, subsidiary, JV and associate companies of the above", "Same year as the company that triggers it"],
      ["NBFCs with net worth of ₹500 crore or more", "FY 2018-19"],
      ["Other listed NBFCs, and unlisted NBFCs with net worth of ₹250 crore or more", "FY 2019-20"],
      ["Any other company", "Voluntary adoption allowed; once adopted, it cannot be reversed"],
    ],
  },
];

export const accountingFaqs = [
  {
    q: "Which accounting software do you support?",
    a: "Tally, Zoho Books, Busy and similar ledgers. We can also work from Excel exports while you migrate.",
  },
  {
    q: "Is a Virtual CFO the same as bookkeeping?",
    a: "No. Bookkeeping keeps the ledger clean. A Virtual CFO uses those numbers for budgets, cash planning, fundraising and board packs.",
  },
  {
    q: "Do we need Ind AS if we are unlisted and below the net-worth thresholds?",
    a: "Not mandatorily. Voluntary adoption is allowed, but once adopted it cannot be reversed. We assess whether it helps lenders or investors.",
  },
];
