import Link from "next/link";
import type { Metadata } from "next";
import {
  featureComparison,
  positioningVs,
  pricingComparison,
  type CompareTable,
} from "@/content/compare";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Filing360 vs IndiaFilings, Startupwala, Vakilsearch & Razorpay Rize",
  description:
    "How Filing360 company registration compares on price, GST, government fees, dedicated RM, CA backing and Year 1 compliance.",
};

const PVT_LTD_HREF = "/services/startup/private-limited-company";

function Mark({ value }: { value: string }) {
  const included = value.startsWith("✔");
  const excluded = value.startsWith("✘");
  if (!included && !excluded) {
    return <span className="text-[14px] font-semibold text-[#0f2a45] md:text-[15px]">{value}</span>;
  }
  const note = value.slice(1).trim();
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          included ? "bg-[#e3f2ed] text-[#0e7b5b]" : "bg-[#fee2e2] text-[#dc2626]"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" aria-label={included ? "Yes" : "No"}>
          {included ? (
            <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          )}
        </svg>
      </span>
      {note && <span className="text-[13px] leading-tight text-[#5b6e7a] md:text-[13px]">{note}</span>}
    </span>
  );
}

function ComparisonTable({ table, label }: { table: CompareTable; label: string }) {
  return (
    <section>
      <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b] md:text-[13.5px]">{label}</p>
      <h2 className="mt-1 text-[20px] font-bold tracking-tight text-[#0f2a45] md:text-[26px]">{table.title}</h2>
      <p className="mt-1 text-[14px] text-[#8a9ba6] lg:hidden">Swipe the table sideways to see every provider →</p>
      <div className="mt-4 max-h-[75vh] overflow-auto overscroll-contain rounded-2xl border border-[#d7e4de] bg-white md:mt-6 lg:max-h-none">
        <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left lg:min-w-[900px]">
          <thead className="sticky top-0 z-[2]">
            <tr>
              <th className="sticky left-0 z-[1] w-[150px] border-b border-r border-[#d7e4de] bg-[#f3f7fa] px-3 py-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#5b6e7a] md:w-auto md:border-r-0 md:px-5 md:py-4 md:text-[13.5px]">
                {table.firstColumn}
              </th>
              {table.columns.map((c) => (
                <th
                  key={c.name}
                  className={`border-b border-[#d7e4de] px-3 py-3 text-center text-[14px] font-bold md:py-4 md:text-[15px] ${
                    c.ours ? "bg-[#e3f2ed] text-[#0b6550]" : "bg-[#f3f7fa] text-[#0f2a45]"
                  }`}
                >
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.label}>
                <td className="sticky left-0 w-[150px] border-b border-r border-[#e8f0ec] bg-white px-3 py-2.5 text-[14px] font-medium leading-snug text-[#2c3f4e] md:w-auto md:border-r-0 md:px-5 md:py-3.5 md:text-[15px]">
                  {row.label}
                </td>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className={`border-b border-[#e8f0ec] px-3 py-2.5 text-center md:py-3.5 ${table.columns[i]?.ours ? "bg-[#f5f9ff]" : ""}`}
                  >
                    <Mark value={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function ComparePage() {
  return (
    <div className="bg-[#f3f7fa]">
      <section className="border-b border-[#d7e4de] bg-gradient-to-br from-[#e3f2ed] via-white to-[#f3f7fa]">
        <div className="mx-auto max-w-[1240px] px-5 py-8 md:px-8 md:py-14 lg:py-20">
          <nav className="text-[14.5px] text-[#5b6e7a]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0e7b5b]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0f2a45]">Compare</span>
          </nav>
          <h1 className="mt-3 max-w-4xl text-[26px] font-bold tracking-tight text-[#0f2a45] sm:text-[32px] md:mt-4 lg:text-[46px]">
            How {siteConfig.brandName} stacks up
          </h1>
          <p className="mt-3 max-w-3xl text-[15.5px] leading-relaxed text-[#4a5d68] md:mt-4 md:text-[16px]">
            Company registration with {siteConfig.brandName} compared against IndiaFilings, Startupwala,
            Vakilsearch and Razorpay Rize — on price, what&apos;s actually included, and the support you get.
          </p>
          <p className="mt-4 max-w-4xl rounded-xl bg-[#0f2a45] px-4 py-3.5 text-[15px] font-medium leading-relaxed text-white md:mt-6 md:px-6 md:py-5 md:text-[16px]">
            &ldquo;India&apos;s only CA-backed company registration where you pay 50% to start, get a dedicated
            RM, and a free 30-min consultation — zero hidden charges, guaranteed.&rdquo;
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3 md:mt-8">
            <Link
              href={`${PVT_LTD_HREF}#packages`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0e7b5b] px-4 text-[15px] font-semibold text-white transition hover:bg-[#0b6550] sm:px-5"
            >
              <span className="sm:hidden">See plans</span>
              <span className="hidden sm:inline">See Launch, Build &amp; Grow plans</span>
              <span aria-hidden>→</span>
            </Link>
            <a
              href={`${PVT_LTD_HREF}#service-lead`}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-[#bfd4cb] bg-white px-4 text-[15px] font-semibold text-[#0f2a45] hover:border-[#8a9ba6] sm:px-5"
            >
              <span className="sm:hidden">Free consultation</span>
              <span className="hidden sm:inline">Book a free 30-min consultation</span>
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] space-y-9 px-5 py-9 md:space-y-12 md:px-8 md:py-12 lg:space-y-14 lg:py-16">
        <ComparisonTable table={pricingComparison} label="Section A" />
        <ComparisonTable table={featureComparison} label="Section B" />

        <section>
          <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b] md:text-[13.5px]">Section C</p>
          <h2 className="mt-1 text-[20px] font-bold tracking-tight text-[#0f2a45] md:text-[26px]">
            {siteConfig.brandName} vs each provider
          </h2>
          <ul className="rail rail-bleed mt-5 grid gap-5 [--rail-item:84%] [--rail-item-sm:46%] md:mt-6 lg:grid-cols-2">
            {positioningVs.map((item) => (
              <li key={item.competitor} className="flex flex-col rounded-2xl border border-[#d7e4de] bg-white p-5 md:p-6">
                <p className="text-[16px] font-bold text-[#0f2a45] md:text-[17px]">{item.competitor}</p>
                <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#8a9ba6] md:mt-4 md:text-[13.5px]">The catch</p>
                <p className="mt-1 text-[15px] leading-relaxed text-[#4a5d68] md:text-[15px]">{item.weakness}</p>
                <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0e7b5b] md:mt-4 md:text-[13.5px]">
                  With {siteConfig.brandName}
                </p>
                <p className="mt-1 flex-1 rounded-xl bg-[#e8f6f1] px-4 py-3 text-[15px] font-medium leading-relaxed text-[#0f3f32] md:text-[15px]">
                  {item.response}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-[13.5px] leading-relaxed text-[#8a9ba6] md:text-[14px]">
          Competitor prices and inclusions are as publicly advertised on their websites at the time of
          writing and may have changed since. &ldquo;Real cost&rdquo; figures are estimates including GST and
          typical government fees. {siteConfig.brandName} professional fees for Launch, Build and Grow are
          inclusive of GST; government fees (DSC, stamp duty, ROC) are always extra and listed separately.
        </p>
      </div>
    </div>
  );
}
