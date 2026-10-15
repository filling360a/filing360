/**
 * Cells starting with "✔" render as included, "✘" as not included;
 * any text after the mark is shown as a note.
 */
export type CompareTable = {
  title: string;
  firstColumn: string;
  columns: { name: string; ours?: boolean }[];
  rows: { label: string; values: string[] }[];
};

export const pricingComparison: CompareTable = {
  title: "Pricing comparison (basic registration)",
  firstColumn: "Parameter",
  columns: [
    { name: "Filing360 Launch", ours: true },
    { name: "Filing360 Build", ours: true },
    { name: "IndiaFilings Plan A" },
    { name: "Startupwala Basic" },
    { name: "Vakilsearch" },
    { name: "Razorpay Rize" },
  ],
  rows: [
    { label: "Advertised price", values: ["₹3,000", "₹9,999", "₹2,899 + GST", "₹13,999", "₹6,999", "₹1,499"] },
    { label: "GST inclusive?", values: ["✔ Yes", "✔ Yes", "✘ + 18% GST", "✔ Yes", "✘ Extra", "✘ Extra"] },
    {
      label: "Govt. fees inclusive?",
      values: ["✘ Extra (transparent)", "✘ Extra (transparent)", "✘ Extra", "✔ Included", "✘ Extra", "✘ Extra"],
    },
    {
      label: "Real cost (est. total)",
      values: ["₹3,000 + Govt.", "₹9,999 + Govt.", "₹10,000–₹14,000", "₹13,999–₹18,000", "₹10,000–₹15,000", "₹5,000–₹8,000"],
    },
    {
      label: "DSC included?",
      values: ["✘ Extra (transparent)", "✘ Extra (transparent)", "✘ Extra", "✔ Included", "✘ Extra", "✔ Included"],
    },
    { label: "GST registration", values: ["✘", "✔", "✔", "✘", "✔", "✘"] },
    { label: "MSME registration", values: ["✘", "✔", "✘", "✔ (combo only)", "✘", "✘"] },
    { label: "Startup India / DPIIT", values: ["✘", "✔", "✘", "✘", "✘", "✘"] },
    { label: "ESI & PF", values: ["✘", "✔", "✔", "✘", "✘", "✘"] },
  ],
};

export const featureComparison: CompareTable = {
  title: "Feature & USP comparison",
  firstColumn: "USP / feature",
  columns: [
    { name: "Filing360 Launch", ours: true },
    { name: "Filing360 Grow", ours: true },
    { name: "IndiaFilings Plan B" },
    { name: "Startupwala" },
    { name: "Vakilsearch" },
    { name: "Razorpay Rize" },
  ],
  rows: [
    { label: "Free pre-consultation call (30 min)", values: ["✔", "✔", "✘", "✘", "✘", "✘"] },
    {
      label: "Dedicated RM (single point of contact)",
      values: ["✔", "✔", "✘ Team-based", "✘ Team-based", "✘ Team-based", "✘ Team-based"],
    },
    { label: "CA-backed service", values: ["✔", "✔", "✔", "✘ Facilitation only", "✔", "✘"] },
    {
      label: "Pay only 50% advance",
      values: ["✔", "✔", "✘ Full upfront", "✔ 50% model", "✘ Full upfront", "✘ Full upfront"],
    },
    { label: "Zero hidden charges (stated)", values: ["✔", "✔", "✘ GST & Govt. extra", "✔", "✘", "✔"] },
    { label: "Year 1 MCA + ITR + GST compliance", values: ["✘", "✔", "✔", "✘", "✘ Separate cost", "✘"] },
    { label: "Bookkeeping (Year 1)", values: ["✘", "✔", "✔ (LEDGERS)", "✘", "✘", "✘"] },
    { label: "Quarterly CA review calls", values: ["✘", "✔ (4 calls)", "✘", "✘", "✘", "✘"] },
    { label: "Board meeting minutes", values: ["✘", "✔", "✘", "✘", "✘", "✘"] },
    { label: "WhatsApp RM access", values: ["✔", "✔", "✘", "✘", "✘", "✘"] },
    { label: "Pan-India service", values: ["✔", "✔", "✔", "✔", "✔", "✔"] },
  ],
};

export const positioningVs: { competitor: string; weakness: string; response: string }[] = [
  {
    competitor: "vs Razorpay Rize (₹1,499)",
    weakness:
      "Cheapest in market — but no CA, no RM, no consultation call. Pure self-service tech platform.",
    response:
      "Filing360 gives you a real CA + dedicated RM + 30-min free call for just ₹1,500 more. You get a person, not a portal.",
  },
  {
    competitor: "vs Startupwala (₹13,999)",
    weakness:
      "Their basic plan is ₹13,999 — and still doesn't include GST registration or Startup India.",
    response: "Filing360 Build does more for ₹9,999. And you pay only ₹5,000 to start.",
  },
  {
    competitor: "vs IndiaFilings Plan B (₹19,899 + 18% GST = ₹23,480)",
    weakness:
      "Advertised as ₹19,899 but add 18% GST → ₹23,480. Add govt. fees → ₹30,000+. No RM, no CA calls.",
    response:
      "Filing360 Grow = ₹25,000. All inclusive. Dedicated RM. 4 CA review calls. One price. No surprises.",
  },
  {
    competitor: "vs Vakilsearch (₹6,999)",
    weakness:
      "₹6,999 for basic registration — but add GST, govt. fees, and it becomes ₹10,000+. Team-based support, no dedicated RM.",
    response:
      "Filing360 Launch = ₹3,000 for the same registration. Half the price. CA-backed. Dedicated RM. Free consultation.",
  },
];
