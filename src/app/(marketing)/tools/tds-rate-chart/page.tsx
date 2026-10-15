import { ToolPage } from "@/components/tools/ToolPage";
import { getTool, toolHref } from "@/content/tools";
import { pageMetadata } from "@/lib/seo";

const tool = getTool("tds-rate-chart");
export const metadata = pageMetadata({
  title: tool.title,
  description: tool.description,
  path: toolHref(tool),
  keywords: ["TDS rate chart", "TDS rates FY 2025-26", "TDS on rent", "TDS on professional fees", "194J", "194C"],
});

const ROWS: [section: string, nature: string, threshold: string, rate: string][] = [
  ["192", "Salary", "Basic exemption limit", "Slab rates"],
  ["192A", "Premature EPF withdrawal", "₹50,000", "10%"],
  ["193", "Interest on securities", "₹10,000", "10%"],
  ["194", "Dividend", "₹10,000 a year", "10%"],
  ["194A", "Interest (bank / co-operative / post office)", "₹50,000 a year (₹1 lakh for senior citizens)", "10%"],
  ["194A", "Interest (others)", "₹10,000 a year", "10%"],
  ["194B", "Lottery, crossword, game winnings", "₹10,000 per transaction", "30%"],
  ["194BB", "Horse-race winnings", "₹10,000 per transaction", "30%"],
  ["194C", "Contractors — individual / HUF", "₹30,000 single or ₹1 lakh a year", "1%"],
  ["194C", "Contractors — others", "₹30,000 single or ₹1 lakh a year", "2%"],
  ["194D", "Insurance commission (non-company)", "₹20,000 a year", "2%"],
  ["194H", "Commission or brokerage", "₹20,000 a year", "2%"],
  ["194-I", "Rent — land, building, furniture", "₹50,000 per month or part", "10%"],
  ["194-I", "Rent — plant and machinery", "₹50,000 per month or part", "2%"],
  ["194-IA", "Purchase of immovable property", "₹50 lakh", "1%"],
  ["194-IB", "Rent by individuals / HUFs not under audit", "₹50,000 per month", "2%"],
  ["194J", "Professional fees, royalty, non-compete", "₹50,000 a year", "10%"],
  ["194J", "Fees for technical services, call centres", "₹50,000 a year", "2%"],
  ["194J", "Director's remuneration (non-salary)", "No threshold", "10%"],
  ["194K", "Income from mutual fund units", "₹10,000 a year", "10%"],
  ["194N", "Cash withdrawal from bank", "₹1 crore a year (lower if ITRs not filed)", "2%"],
  ["194-O", "E-commerce payouts to sellers", "₹5 lakh for individuals / HUFs", "0.1%"],
  ["194Q", "Purchase of goods (buyer turnover > ₹10 crore)", "₹50 lakh a year", "0.1%"],
  ["194R", "Business perquisites", "₹20,000 a year", "10%"],
  ["194S", "Transfer of virtual digital assets", "₹50,000 (specified persons) / ₹10,000", "1%"],
  ["194T", "Salary, commission, interest to partners", "₹20,000 a year", "10%"],
];

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      interactive={false}
      intro={<p>TDS rates and thresholds for payments made in FY 2025-26, for resident payees with a valid PAN.</p>}
      about={
        <>
          <h2>Important notes</h2>
          <ul>
            <li>If the payee doesn&apos;t furnish PAN, TDS generally applies at 20% or the normal rate, whichever is higher.</li>
            <li>Rates for payments to non-residents differ (section 195 and DTAA rates).</li>
            <li>Deposit TDS by the 7th of the next month (30 April for March) and file quarterly returns.</li>
            <li>
              From 1 April 2026, the Income-tax Act, 2025 replaces the 1961 Act and consolidates TDS provisions into a single section with tables.
              Section numbers above refer to the 1961 Act; rates broadly carry over, but confirm the FY 2026-27 position with us before relying on
              them.
            </li>
          </ul>
        </>
      }
      faqs={[
        { q: "What is the TDS rate on rent?", a: "10% on rent for land, building or furniture and 2% for plant and machinery, where rent exceeds ₹50,000 for a month or part of a month." },
        { q: "What is the TDS rate on professional fees?", a: "10% on professional fees above ₹50,000 a year, and 2% on fees for technical services." },
        { q: "What happens if TDS is deposited late?", a: "Interest of 1.5% per month applies from the date of deduction to the date of deposit, and a late-filing fee of ₹200 per day for the return." },
      ]}
    >
      <div className="overflow-x-auto rounded-2xl border border-[#e2e8f0] bg-white">
        <table className="w-full min-w-[720px] text-left text-[15px]">
          <caption className="sr-only">TDS rates for FY 2025-26</caption>
          <thead className="bg-[#f1f5f9] text-[#0b2c5e]">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Section (1961 Act)</th>
              <th scope="col" className="px-4 py-3 font-semibold">Nature of payment</th>
              <th scope="col" className="px-4 py-3 font-semibold">Threshold</th>
              <th scope="col" className="px-4 py-3 font-semibold">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0]">
            {ROWS.map(([s, n, t, r]) => (
              <tr key={`${s}-${n}`} className="align-top">
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-[#0b2c5e]">{s}</td>
                <td className="px-4 py-3 text-[#334155]">{n}</td>
                <td className="px-4 py-3 text-[#475569]">{t}</td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-[#0b2c5e]">{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ToolPage>
  );
}
