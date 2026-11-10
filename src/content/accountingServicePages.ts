import { ACC, ACCOUNTING_HUB_PATH } from "./accountingHub";
import type { SeoServicePage } from "./seoTypes";

export const accountingServicePages: Record<string, SeoServicePage> = {
  "accounting-bookkeeping": {
    slug: "accounting-bookkeeping",
    metaTitle: "Accounting & Bookkeeping Services Online | Filing360",
    metaDescription:
      "Monthly bookkeeping, reconciliations and financial statements by Chartered Accountants on Tally, Zoho Books or your software.",
    keywords: ["outsourced accounting", "bookkeeping services", "monthly bookkeeping", "Tally accounting"],
    h1: "Accounting & Bookkeeping Services",
    lead: "Clean books are the foundation for GST, income tax, loans and audits. Filing360’s accountants keep your ledger current with monthly reconciliations and statements you can trust.",
    highlights: ["Monthly close", "GST & TDS reconciliations", "Dedicated accountant"],
    cta: "Start Bookkeeping",
    imageAlt: "Accounting and bookkeeping by Filing360",
    related: [
      { href: ACCOUNTING_HUB_PATH, label: "Accounting hub" },
      { href: ACC.mis, label: "MIS dashboard" },
      { href: ACC.blogVcfo, label: "What is a Virtual CFO?" },
    ],
    sections: [
      {
        type: "list",
        title: "What’s included",
        items: [
          "Recording sales, purchases, expenses, receipts and payments",
          "Bank, cash, GST and TDS reconciliations",
          "Receivable and payable ageing",
          "Payroll entries, fixed assets and depreciation",
          "Month-end closing and financial statements",
          "Year-end support for audit and income tax",
        ],
      },
      {
        type: "p",
        title: "Virtual CFO add-on",
        body: "Need budgets, cash planning and board reporting on top of books? Ask about our Virtual CFO layer — an experienced finance lead on a fixed monthly fee rather than a full-time hire.",
      },
    ],
    faqs: [
      {
        q: "How do we share data?",
        a: "Secure folder, WhatsApp, or direct access to your accounting software — whichever you prefer.",
      },
      {
        q: "Can you take over mid-year?",
        a: "Yes. We review opening balances, clear backlog, and then run a steady monthly close.",
      },
    ],
  },

  "mis-dashboard-for-startups": {
    slug: "mis-dashboard-for-startups",
    metaTitle: "MIS Reporting & Dashboards for Businesses | Filing360",
    metaDescription:
      "Monthly MIS packs and live dashboards for owners, lenders and investors — profit, cash, receivables and KPIs from your books.",
    keywords: ["MIS reporting", "MIS dashboard", "management information system", "business dashboard"],
    h1: "MIS Reporting & Dashboards",
    lead: "A good monthly MIS shows profit, cash, receivables, payables and budget versus actual on a few pages. We build the pack — and optional live dashboards — so you act before problems grow.",
    highlights: ["Budget vs actual", "Cash & ageing", "Owner-ready"],
    cta: "Build My MIS",
    imageAlt: "MIS dashboard by Filing360",
    related: [
      { href: ACCOUNTING_HUB_PATH, label: "Accounting hub" },
      { href: ACC.books, label: "Bookkeeping" },
      { href: ACC.blogMis, label: "What is MIS reporting?" },
    ],
    sections: [
      {
        type: "table",
        title: "Typical monthly MIS pack",
        columns: ["Report", "What it tells you"],
        rows: [
          ["Profit and loss with budget vs actual", "Are we making money, and where are we off plan?"],
          ["Cash flow and bank position", "How much cash we have and need"],
          ["Receivables ageing", "Who owes us and for how long"],
          ["Payables ageing", "What we owe and when"],
          ["Product, customer or branch profitability", "What earns and what drains"],
          ["Key ratios and KPIs", "Margins, working capital days, growth"],
        ],
      },
      {
        type: "p",
        title: "Dashboards",
        body: "We build dashboards in Power BI, Excel, Zoho Analytics or Google Looker Studio, connected to your accounting data, so owners and managers see sales, margins, cash and receivables at a glance.",
      },
    ],
    faqs: [
      {
        q: "Do we need bookkeeping with you first?",
        a: "Clean source data helps. We can start from your existing books if they are reliable.",
      },
      {
        q: "How often is MIS updated?",
        a: "Usually monthly; weekly flash packs are available for high-growth teams.",
      },
    ],
  },

  "sop-designing": {
    slug: "sop-designing",
    metaTitle: "Finance SOP Designing Services | Filing360",
    metaDescription:
      "Standard operating procedures for finance, accounts and compliance — tailored so handovers, audits and growth stay controlled.",
    keywords: ["SOP designing", "finance SOP", "accounting process documentation"],
    h1: "SOP Designing for Finance & Compliance",
    lead: "As teams grow, tribal knowledge breaks. We document how invoices, payments, payroll, GST and month-end close should run — with clear owners and timelines.",
    highlights: ["Process maps", "Owner & timeline", "Audit-ready"],
    cta: "Design My SOPs",
    imageAlt: "Finance SOP designing by Filing360",
    related: [
      { href: ACCOUNTING_HUB_PATH, label: "Accounting hub" },
      { href: ACC.rcm, label: "RCM preparation" },
      { href: ACC.books, label: "Bookkeeping" },
    ],
    sections: [
      {
        type: "list",
        title: "Typical SOP set",
        items: [
          "Procure-to-pay and order-to-cash",
          "Bank payments and maker-checker",
          "GST invoice and return calendar",
          "Payroll and statutory deductions",
          "Month-end and year-end close",
          "Document retention and access",
        ],
      },
    ],
    faqs: [
      {
        q: "Do SOPs replace software?",
        a: "No. SOPs define how people use your tools consistently.",
      },
    ],
  },

  "rcm-preparation": {
    slug: "rcm-preparation",
    metaTitle: "Risk & Control Matrix (RCM) Preparation | Filing360",
    metaDescription:
      "Risk and Control Matrices for finance processes — identify risks, map controls and prepare for internal or statutory audit.",
    keywords: ["risk control matrix", "RCM preparation", "internal controls", "IFC"],
    h1: "Risk & Control Matrix (RCM) Preparation",
    lead: "An RCM lists process risks and the controls that mitigate them. We build practical matrices for finance cycles so audits and IFC reviews go smoother.",
    highlights: ["Process risks", "Control mapping", "Audit support"],
    cta: "Prepare My RCM",
    imageAlt: "Risk and control matrix by Filing360",
    related: [
      { href: ACCOUNTING_HUB_PATH, label: "Accounting hub" },
      { href: ACC.sop, label: "SOP designing" },
      { href: ACC.books, label: "Bookkeeping" },
    ],
    sections: [
      {
        type: "steps",
        title: "Our approach",
        items: [
          { title: "Walkthrough", body: "map how each finance process actually runs." },
          { title: "Risks", body: "identify what can go wrong — error, fraud, compliance miss." },
          { title: "Controls", body: "document preventive and detective controls with owners." },
          { title: "Gaps", body: "recommend fixes where controls are missing or weak." },
        ],
      },
    ],
    faqs: [
      {
        q: "Is this the same as GST RCM?",
        a: "No. Here RCM means Risk and Control Matrix for internal controls, not GST reverse charge.",
      },
    ],
  },

  "ind-as-conversion": {
    slug: "ind-as-conversion",
    metaTitle: "Ind AS Conversion & First-Time Adoption | Filing360",
    metaDescription:
      "Ind AS conversion under Ind AS 101: gap analysis, opening balance sheet, reconciliations, Schedule III Division II statements and training.",
    keywords: ["Ind AS conversion", "Ind AS 101", "first-time adoption Ind AS", "Indian GAAP to Ind AS"],
    h1: "Ind AS Conversion Services",
    lead: "Moving from Indian GAAP to Ind AS is a project, not a year-end adjustment. We deliver gap analysis, opening Ind AS balance sheet, reconciliations and first-time adoption disclosures.",
    highlights: ["Ind AS 101", "Opening balance sheet", "Team training"],
    cta: "Start Ind AS Conversion",
    imageAlt: "Ind AS conversion by Filing360",
    related: [
      { href: ACCOUNTING_HUB_PATH, label: "Accounting hub" },
      { href: ACC.consolidation, label: "Consolidation" },
      { href: ACC.ifrs, label: "IFRS / Ind AS 118 readiness" },
      { href: ACC.blogIndAs116, label: "Ind AS 116 example" },
    ],
    sections: [
      {
        type: "list",
        title: "Our conversion service covers",
        items: [
          "Gap analysis between current policies and Ind AS",
          "Choice of Ind AS 101 exemptions",
          "Opening balance sheet adjustments: financial instruments, ECL, leases, deferred tax, employee benefits, revenue",
          "Ind AS financial statements under Schedule III Division II with comparatives",
          "Reconciliations and first-time adoption disclosures",
          "Accounting policy manual and training for your finance team",
        ],
      },
    ],
    faqs: [
      {
        q: "When must we transition?",
        a: "When you cross net-worth or listing thresholds under the Companies (Indian Accounting Standards) Rules, from the following accounting period with comparatives.",
      },
    ],
  },

  consolidation: {
    slug: "consolidation",
    metaTitle: "Ind AS Consolidation Services | Filing360",
    metaDescription:
      "Consolidated financial statements under Ind AS 110, 28 and 111 — subsidiaries, associates, JVs, NCI and purchase price allocation.",
    keywords: ["Ind AS consolidation", "Ind AS 110", "consolidated financial statements", "equity method"],
    h1: "Consolidation as per Ind AS",
    lead: "Every company with a subsidiary, associate or joint venture must prepare consolidated financial statements. We prepare consolidation workings, eliminations, NCI, goodwill and purchase price allocation.",
    highlights: ["Ind AS 110 / 28 / 111", "Eliminations", "PPA support"],
    cta: "Get Consolidation Help",
    imageAlt: "Ind AS consolidation by Filing360",
    related: [
      { href: ACCOUNTING_HUB_PATH, label: "Accounting hub" },
      { href: ACC.indAs, label: "Ind AS conversion" },
      { href: ACC.ifrs, label: "IFRS advisory" },
    ],
    sections: [
      {
        type: "table",
        title: "Investee accounting",
        columns: ["Investee", "Standard", "Method"],
        rows: [
          ["Subsidiary (control)", "Ind AS 110", "Full line-by-line consolidation, with non-controlling interest"],
          ["Associate (significant influence)", "Ind AS 28", "Equity method"],
          ["Joint venture", "Ind AS 111 and Ind AS 28", "Equity method"],
          ["Joint operation", "Ind AS 111", "Share of assets, liabilities, income and expenses"],
          ["Acquisition of a business", "Ind AS 103", "Purchase price allocation, goodwill or capital reserve"],
        ],
      },
    ],
    faqs: [
      {
        q: "Do private companies need consolidation?",
        a: "Yes, under Section 129(3) when they have subsidiaries, associates or JVs, subject to applicable exemptions.",
      },
    ],
  },

  ifrs: {
    slug: "ifrs",
    metaTitle: "IFRS & Ind AS 118 Readiness | Filing360",
    metaDescription:
      "IFRS advisory and readiness for proposed Ind AS 118 (aligned with IFRS 18), plus lease and ESOP accounting support under Ind AS.",
    keywords: ["IFRS advisory", "Ind AS 118", "IFRS 18", "Ind AS 116", "ESOP accounting Ind AS 102"],
    h1: "IFRS Advisory & Ind AS 118 Readiness",
    lead: "Stay ahead of presentation and disclosure changes. We help finance teams prepare for proposed Ind AS 118 (aligned with IFRS 18) and strengthen lease (Ind AS 116) and share-based payment (Ind AS 102) accounting.",
    highlights: ["Presentation readiness", "Lease registers", "ESOP accounting"],
    cta: "Talk to an Ind AS Expert",
    imageAlt: "IFRS and Ind AS advisory by Filing360",
    related: [
      { href: ACCOUNTING_HUB_PATH, label: "Accounting hub" },
      { href: ACC.indAs, label: "Ind AS conversion" },
      { href: ACC.blogIndAs116, label: "Ind AS 116 example" },
    ],
    sections: [
      {
        type: "list",
        title: "How we help",
        items: [
          "Impact assessment of Ind AS 118 / IFRS 18 presentation categories",
          "Ind AS 116 lease identification, measurement and registers",
          "Ind AS 102 ESOP / share-based payment expense and disclosures",
          "Policy memos and illustrative disclosures for audit committees",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Ind AS 118 already mandatory?",
        a: "Follow the MCA / ICAI notification timeline. We prepare policies and mock statements so you are ready when it applies.",
      },
    ],
  },
};

export function getAccountingServicePage(slug: string) {
  return accountingServicePages[slug];
}
