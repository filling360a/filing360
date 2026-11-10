import { FUNDS, FUNDS_HUB_PATH } from "./fundsHub";
import type { SeoServicePage } from "./seoTypes";

export const fundsServicePages: Record<string, SeoServicePage> = {
  "cma-report": {
    slug: "cma-report",
    metaTitle: "CMA Report for Bank Loan & Working Capital | Filing360",
    metaDescription:
      "Bank-ready CMA data prepared by Chartered Accountants for term loans, cash credit and working capital renewals, in your bank’s format.",
    keywords: ["CMA report", "CMA data for bank loan", "working capital CMA", "MPBF", "fund flow statement"],
    h1: "CMA Report for Bank Loans",
    lead: "Banks assess working capital and term loans using CMA data. We prepare past, current and projected financials in the format your bank expects, with clear MPBF workings and fund flow.",
    highlights: ["Bank format", "CA-prepared", "Query support"],
    cta: "Get My CMA Ready",
    imageAlt: "CMA report preparation by Filing360",
    related: [
      { href: FUNDS_HUB_PATH, label: "Funds hub" },
      { href: FUNDS.tev, label: "TEV report" },
      { href: FUNDS.pitch, label: "Pitch deck" },
      { href: FUNDS.blogCma, label: "What is a CMA report?" },
    ],
    sections: [
      {
        type: "list",
        title: "What’s included",
        items: [
          "Operating statements and projected P&L",
          "Balance sheet analysis and ratio pack",
          "Current assets and liabilities assessment",
          "Maximum Permissible Bank Finance (MPBF) workings where required",
          "Fund flow and cash flow statements",
          "Support for bank follow-up queries",
        ],
      },
      {
        type: "list",
        title: "Documents we usually need",
        items: [
          "Last 2–3 years’ financial statements and ITRs",
          "Provisional / current-year trial balance",
          "Bank statements and existing sanction letters",
          "Sales and purchase summaries, GST returns where relevant",
          "Project cost quotes for expansion or machinery",
        ],
      },
    ],
    faqs: [
      {
        q: "Is CMA the same as a project report?",
        a: "No. CMA focuses on financial assessment in a bank template. A DPR covers market, technical and financial aspects of a project.",
      },
      {
        q: "Can you match a specific bank’s CMA Excel?",
        a: "Yes. Share the template or bank name and we prepare data in that format.",
      },
    ],
  },

  "tev-report": {
    slug: "tev-report",
    metaTitle: "TEV Report – Techno-Economic Viability Study | Filing360",
    metaDescription:
      "Independent TEV studies for project loans, greenfield projects and restructuring — technical and financial viability assessed by CAs.",
    keywords: ["TEV report", "techno economic viability", "TEV study for bank loan", "project viability"],
    h1: "TEV Report (Techno-Economic Viability)",
    lead: "A TEV study tells the lender whether your project is technically sound and financially viable. We prepare an independent assessment covering technology, market, costs, returns and risks.",
    highlights: ["Independent assessment", "Bank liaison", "CA-led"],
    cta: "Request a TEV Quote",
    imageAlt: "TEV report by Filing360",
    related: [
      { href: FUNDS_HUB_PATH, label: "Funds hub" },
      { href: FUNDS.cma, label: "CMA report" },
      { href: FUNDS.pitch, label: "Pitch deck" },
    ],
    sections: [
      {
        type: "list",
        title: "What a TEV covers",
        items: [
          "Promoters, management and industry context",
          "Technical feasibility: process, capacity, technology and utilities",
          "Market demand and competitive position",
          "Cost of project and means of finance",
          "Financial projections, DSCR and sensitivity",
          "Risks, mitigants and overall viability opinion",
        ],
      },
      {
        type: "p",
        title: "Empanelment note",
        body: "Many banks accept TEV reports only from consultants on their empanelled list. We confirm your bank’s requirement before starting so you do not lose time.",
      },
    ],
    faqs: [
      {
        q: "When do banks ask for a TEV?",
        a: "Typically for larger project loans, greenfield projects, restructuring and high-risk sectors.",
      },
      {
        q: "How is TEV different from DPR?",
        a: "A DPR is the promoter’s business case. A TEV is an independent viability opinion for the lender.",
      },
    ],
  },

  "pitch-deck-for-startup": {
    slug: "pitch-deck-for-startup",
    metaTitle: "Startup Pitch Deck with CA-Backed Numbers | Filing360",
    metaDescription:
      "Investor-ready pitch decks covering problem, market, traction, financials and ask — built with Chartered Accountant-backed numbers.",
    keywords: ["startup pitch deck", "investor pitch deck", "fundraising deck", "pitch deck financials"],
    h1: "Pitch Deck for Startup Fundraising",
    lead: "Investors skim decks in minutes. We build a clear story with realistic unit economics, projections and an ask that matches your runway — numbers reviewed by Chartered Accountants.",
    highlights: ["CA-backed financials", "Investor narrative", "Revision rounds"],
    cta: "Build My Pitch Deck",
    imageAlt: "Startup pitch deck by Filing360",
    related: [
      { href: FUNDS_HUB_PATH, label: "Funds hub" },
      { href: FUNDS.cma, label: "CMA report" },
      { href: FUNDS.tev, label: "TEV report" },
    ],
    sections: [
      {
        type: "list",
        title: "Typical slide flow",
        items: [
          "Problem and solution",
          "Market size and opportunity",
          "Product, traction and go-to-market",
          "Business model and unit economics",
          "Competition and moat",
          "Team",
          "Financial projections and use of funds",
          "The ask",
        ],
      },
      {
        type: "p",
        title: "Also useful for term-loan / DPR storytelling",
        body: "When you need a bank-facing narrative alongside CMA or TEV work, we align the pitch narrative with the same cost of project, means of finance and repayment story so lenders and investors hear one consistent plan.",
      },
    ],
    faqs: [
      {
        q: "Do you write the full investor memo too?",
        a: "Yes, on request — a short narrative memo that expands the deck for diligence.",
      },
      {
        q: "Can you update numbers after fundraising feedback?",
        a: "Yes. Revision rounds are included in the agreed scope.",
      },
    ],
  },
};

export function getFundsServicePage(slug: string) {
  return fundsServicePages[slug];
}
