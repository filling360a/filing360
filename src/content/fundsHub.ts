import type { HubMeta, HubPackageRow, HubTocItem, SeoBlock } from "./seoTypes";

export const FUNDS_HUB_PATH = "/services/funds";
export const FUNDS_HUB_UPDATED = "2026-11-10";

export const FUNDS = {
  cma: "/services/funds/cma-report",
  tev: "/services/funds/tev-report",
  pitch: "/services/funds/pitch-deck-for-startup",
  blogCma: "/blog/what-is-a-cma-report",
} as const;

export const fundsHubMeta: HubMeta = {
  title: "Project Finance, CMA & TEV Report Services | Filing360",
  description:
    "Bank-ready CMA data, detailed project reports and TEV studies by Chartered Accountants for term loans, working capital and MSME schemes.",
  h1: "Project Finance, CMA & TEV Report Services",
  keywords: [
    "CMA report",
    "TEV report",
    "project finance",
    "detailed project report",
    "DSCR",
    "working capital loan",
    "CGTMSE",
  ],
};

export const fundsToc: HubTocItem[] = [
  { id: "packages", label: "Packages & pricing" },
  { id: "advisory", label: "Project finance advisory" },
  { id: "cma", label: "CMA report" },
  { id: "dpr", label: "Detailed project report" },
  { id: "tev", label: "TEV report" },
  { id: "ratios", label: "Key bank ratios" },
  { id: "process", label: "Our process" },
  { id: "faqs", label: "FAQs" },
];

export const fundsPackages: HubPackageRow[] = [
  {
    name: "CMA Report",
    includes: "Past, current and projected financials in bank CMA format",
    price: "On request",
    href: FUNDS.cma,
  },
  {
    name: "TEV Report",
    includes: "Techno-economic viability study for lenders",
    price: "On request",
    href: FUNDS.tev,
  },
  {
    name: "Pitch Deck for Startup",
    includes: "Investor-ready deck with CA-backed numbers",
    price: "On request",
    href: FUNDS.pitch,
  },
];

export const fundsArticle: SeoBlock[] = [
  {
    type: "p",
    title: "Project Finance Advisory",
    body: "Project finance is the funding of a new project or expansion, usually through a term loan repaid from the project’s own cash flows. Filing360’s Chartered Accountants prepare bank-ready proposals covering cost of project, means of finance, projections, DSCR and sensitivity analysis.",
  },
  {
    type: "table",
    title: "What banks ask — what we prepare",
    columns: ["Bank’s question", "What we prepare"],
    rows: [
      ["How much does the project cost?", "Cost of project: land, building, plant and machinery, pre-operative expenses, contingencies, margin money for working capital"],
      ["Who is putting in money?", "Means of finance: promoter contribution, term loan, subsidies, unsecured loans"],
      ["Will the project earn enough?", "Projected profit and loss, balance sheet and cash flow for the loan tenure"],
      ["Can the loan be repaid?", "DSCR, repayment schedule, moratorium, break-even and sensitivity analysis"],
      ["What if things go wrong?", "Sensitivity on sales, prices and costs; security and guarantees"],
    ],
  },
  {
    type: "p",
    title: "CMA Report",
    body: "A CMA (Credit Monitoring Arrangement) report presents your past, current and projected financials in a standard format that banks use to assess working capital and term loan proposals. It includes operating statements, balance sheet analysis, current assets and liabilities, the assessed bank finance and fund flow.",
  },
  {
    type: "p",
    title: "Detailed Project Report (DPR)",
    body: "A DPR is the complete business case for a project: promoters, market, technical details, cost, financing, projections and viability. Banks, NBFCs, investors and government subsidy schemes ask for a DPR before considering a project.",
  },
  {
    type: "p",
    title: "TEV Report",
    body: "A Techno-Economic Viability (TEV) study is an independent assessment of whether a project is technically sound and financially viable. Banks commonly ask for TEV studies for large project loans, greenfield projects and restructuring. Many banks accept TEV reports only from consultants on their empanelled list; we confirm your bank’s requirement before starting.",
  },
  {
    type: "table",
    title: "Key ratios banks look at",
    columns: ["Ratio", "What it shows", "Common comfort level*"],
    rows: [
      ["Debt Service Coverage Ratio (DSCR)", "Ability to repay loan instalments and interest from cash profit", "Average 1.5 or more"],
      ["Current ratio", "Short-term liquidity", "1.33 or more"],
      ["Debt-equity ratio", "Leverage on the project", "Around 2:1 to 3:1 for projects"],
      ["TOL/TNW", "Total outside liabilities to tangible net worth", "3 or less"],
      ["Interest coverage", "Profit available to pay interest", "2 or more"],
      ["Break-even point", "Capacity utilisation needed to cover costs", "As low as possible"],
    ],
    note: "*Actual benchmarks vary by bank, sector and loan size.",
  },
  {
    type: "steps",
    title: "Our process",
    items: [
      { title: "Discovery call", body: "understand the project, funding need and bank preference." },
      { title: "Data collection", body: "financial statements, ITRs, quotations, sales data and plans." },
      { title: "Model and report", body: "projections, ratios and the report in the bank’s format." },
      { title: "Review with you", body: "test assumptions and sensitivity." },
      { title: "Bank support", body: "answer follow-up queries until sanction." },
    ],
  },
];

export const fundsFaqs = [
  {
    q: "How long does a CMA or project report take?",
    a: "Typical turnaround is 7–15 working days after complete data is shared, depending on complexity and bank format.",
  },
  {
    q: "Do you guarantee loan sanction?",
    a: "No consultant can guarantee a sanction. We prepare bank-ready documents that meet lender expectations and support you through queries.",
  },
  {
    q: "Which MSME schemes can you support?",
    a: "CGTMSE, Mudra, Stand-Up India, PMEGP and similar schemes where a CMA or DPR is required.",
  },
];
