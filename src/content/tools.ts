export type Tool = { slug: string; name: string; title: string; description: string; short: string };

export const tools: Tool[] = [
  {
    slug: "income-tax-calculator",
    name: "Income tax calculator",
    title: "Income Tax Calculator FY 2025-26 — Old vs New Regime",
    description:
      "Free income tax calculator for FY 2025-26 (AY 2026-27). Compare old and new regime tax with standard deduction, 87A rebate, marginal relief, surcharge and cess.",
    short: "Compare old and new regime tax in seconds.",
  },
  {
    slug: "gst-calculator",
    name: "GST calculator",
    title: "GST Calculator — Add or Remove GST, CGST, SGST & IGST",
    description: "Free GST calculator: add GST to a price or extract GST from an inclusive amount, with CGST/SGST and IGST split at 0.25%, 3%, 5%, 18% and 40%.",
    short: "Add or remove GST with a CGST / SGST / IGST split.",
  },
  {
    slug: "hra-calculator",
    name: "HRA exemption calculator",
    title: "HRA Exemption Calculator — How Much HRA Is Tax-Free?",
    description: "Calculate your HRA exemption under the old tax regime from basic salary, HRA received, rent paid and city — with the full working.",
    short: "Work out how much of your HRA is tax-free.",
  },
  {
    slug: "tds-rate-chart",
    name: "TDS rate chart",
    title: "TDS Rate Chart FY 2025-26 — Sections, Rates & Thresholds",
    description: "TDS rates and thresholds for FY 2025-26: salary, interest, rent, professional fees, contractors, commission, property purchase, e-commerce and more.",
    short: "TDS rates and thresholds by payment type.",
  },
  {
    slug: "company-name-checker",
    name: "Company name checker",
    title: "Company Name Checker — Test Your Name Against MCA Rules",
    description: "Check a proposed private limited, OPC, LLP or Section 8 name against MCA naming rules: suffixes, restricted words, special characters and distinctiveness.",
    short: "Test a proposed name against MCA naming rules.",
  },
  {
    slug: "business-structure-chooser",
    name: "Business structure chooser",
    title: "Which Business Structure Should I Choose? — Free Quiz",
    description: "Answer five questions to find whether a Private Limited Company, OPC, LLP, partnership, proprietorship or Section 8 company suits you best.",
    short: "Pvt Ltd, LLP, OPC or proprietorship? Find out in 5 questions.",
  },
];

export const toolHref = (t: Pick<Tool, "slug">) => `/tools/${t.slug}`;
export const getTool = (slug: string) => tools.find((t) => t.slug === slug)!;
