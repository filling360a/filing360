import Link from "next/link";
import { JsonLd } from "@/components/blog/JsonLd";
import { container, CtaBand, FaqList, PageHero, SectionHeading } from "@/components/site/PageShell";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

const TITLE = "Government Fees for Company, LLP, GST & Trademark Registration";
const DESCRIPTION =
  "Official government fees in India: MCA incorporation and ROC filing fees, LLP fees, late fees, trademark, IEC, FSSAI, DSC costs and stamp duty — separate from professional fees.";
const REVIEWED = "2026-10-15";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/government-fees" });

type Row = [string, string, string?];

const TABLES: { id: string; title: string; intro?: string; head: [string, string]; rows: Row[]; source?: { label: string; href: string } }[] = [
  {
    id: "company",
    title: "Company incorporation (MCA)",
    head: ["Item", "Government fee"],
    rows: [
      ["Name reservation (SPICe+ Part A / RUN)", "₹1,000 per application"],
      ["SPICe+ incorporation, authorised capital up to ₹15 lakh", "Nil MCA filing fee"],
      ["SPICe+ incorporation, authorised capital above ₹15 lakh", "Registration fee scales with authorised capital"],
      ["DIN for up to 3 directors in SPICe+", "Included"],
      ["PAN and TAN for the company", "Included in SPICe+"],
      ["Stamp duty on MoA, AoA and share certificates", "Set by each state; depends on authorised capital", "Paid online with SPICe+"],
    ],
    source: { label: "MCA — fee schedule", href: "https://www.mca.gov.in" },
  },
  {
    id: "roc",
    title: "Annual ROC filing fee (AOC-4, MGT-7 and most forms)",
    intro: "For companies with share capital, the normal filing fee per form depends on nominal share capital.",
    head: ["Nominal share capital", "Fee per form"],
    rows: [
      ["Less than ₹1 lakh", "₹200"],
      ["₹1 lakh to less than ₹5 lakh", "₹300"],
      ["₹5 lakh to less than ₹25 lakh", "₹400"],
      ["₹25 lakh to less than ₹1 crore", "₹500"],
      ["₹1 crore or more", "₹600"],
      ["Companies without share capital", "₹200"],
    ],
  },
  {
    id: "llp",
    title: "LLP fees",
    head: ["Item", "Government fee"],
    rows: [
      ["Name reservation (RUN-LLP)", "₹1,000"],
      ["Incorporation — contribution up to ₹1 lakh", "₹500"],
      ["Incorporation — contribution ₹1 lakh to ₹5 lakh", "₹2,000"],
      ["Incorporation — contribution ₹5 lakh to ₹10 lakh", "₹4,000"],
      ["Incorporation — contribution above ₹10 lakh", "₹5,000"],
      ["Form 8 / Form 11 — contribution up to ₹1 lakh", "₹50 per form"],
      ["Form 8 / Form 11 — contribution above ₹1 crore", "₹600 per form", "Intermediate slabs ₹100–₹400"],
    ],
  },
  {
    id: "late",
    title: "Late fees and penalties",
    head: ["Default", "Late fee"],
    rows: [
      ["AOC-4, MGT-7 / 7A, LLP Form 8, Form 11", "₹100 per day per form", "No upper cap"],
      ["DIR-3 KYC after due date", "₹5,000 per DIN"],
      ["GSTR-3B / GSTR-1", "₹50 per day (₹20 for nil returns)", "Capped by turnover; plus 18% interest on late tax"],
      ["TDS / TCS return", "₹200 per day", "Capped at the TDS amount"],
      ["Income tax return after due date", "Up to ₹5,000", "₹1,000 if total income is up to ₹5 lakh"],
    ],
  },
  {
    id: "other",
    title: "Other registrations",
    head: ["Registration", "Government fee"],
    rows: [
      ["GST registration", "Nil"],
      ["Udyam (MSME) registration", "Nil"],
      ["DPIIT start-up recognition", "Nil"],
      ["Trademark application — individuals, start-ups, small enterprises", "₹4,500 per class (e-filing)"],
      ["Trademark application — others", "₹9,000 per class (e-filing)"],
      ["Import Export Code (IEC)", "₹500"],
      ["FSSAI basic registration", "₹100 per year"],
      ["FSSAI state licence", "₹2,000 – ₹5,000 per year", "Depends on business type and capacity"],
      ["FSSAI central licence", "₹7,500 per year"],
      ["Digital Signature Certificate (Class 3)", "Market price, typically ₹1,000 – ₹2,500", "Issued by licensed certifying authorities, not the government"],
      ["Partnership registration with Registrar of Firms", "Varies by state"],
    ],
  },
];

export default function GovernmentFeesPage() {
  return (
    <div className="bg-[#f8fafc]">
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/government-fees", dateModified: REVIEWED })} />
      <PageHero
        eyebrow="Government fees"
        title="Government fees, explained"
        crumbs={[{ name: "Government fees", path: "/government-fees" }]}
        intro={
          <p>
            Every quote from Filing360 shows two parts: our professional fee, and government fees paid to the MCA, GST, Trademark Registry or
            state at actuals. Here are the official fees so you know exactly what you&apos;re paying for.
          </p>
        }
      />

      <section className={`${container} py-12`}>
        <nav aria-label="Sections" className="flex flex-wrap gap-2">
          {TABLES.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="rounded-full border border-[#cbd5e1] bg-white px-3 py-1.5 text-[14px] font-medium text-[#0b2c5e] hover:border-[#2563eb]">
              {t.title}
            </a>
          ))}
        </nav>

        <div className="mt-8 space-y-10">
          {TABLES.map((t) => (
            <section key={t.id}>
              <SectionHeading id={t.id} title={t.title} intro={t.intro} />
              <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2e8f0] bg-white">
                <table className="w-full min-w-[560px] text-left text-[15px]">
                  <thead className="bg-[#f1f5f9] text-[#0b2c5e]">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">{t.head[0]}</th>
                      <th scope="col" className="px-4 py-3 font-semibold">{t.head[1]}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0]">
                    {t.rows.map(([label, fee, note]) => (
                      <tr key={label} className="align-top">
                        <th scope="row" className="px-4 py-3 font-medium text-[#334155]">{label}</th>
                        <td className="px-4 py-3 text-[#0b2c5e]">
                          <span className="font-semibold">{fee}</span>
                          {note && <span className="block text-[13.5px] text-[#64748b]">{note}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {t.source && (
                <p className="mt-2 text-[13.5px] text-[#64748b]">
                  Source:{" "}
                  <a href={t.source.href} target="_blank" rel="noopener noreferrer" className="underline">{t.source.label}</a>
                </p>
              )}
            </section>
          ))}
        </div>

        <p className="mt-10 rounded-2xl border border-[#fde68a] bg-[#fffbeb] p-4 text-[14.5px] leading-relaxed text-[#78350f]">
          Fees are as notified by the respective authorities and reviewed on 15 October 2026. Governments revise fees from time to time; your
          quote always reflects the fee payable on the date of filing. See our <Link href="/payment-terms" className="underline">payment terms</Link>.
        </p>
      </section>

      <section className={`${container} pb-14`}>
        <SectionHeading title="Questions about government fees" />
        <div className="mt-5">
          <FaqList
            items={[
              { q: "Are government fees included in your package price?", a: "No. Package prices are our professional fees. Government fees, stamp duty and DSC costs are listed separately on your quote and charged at actuals, with receipts." },
              { q: "Why does stamp duty differ between states?", a: "Stamp duty is a state subject. Each state sets its own rates for the MoA, AoA and share certificates, usually based on authorised capital." },
              { q: "Are government fees refundable?", a: "Once paid to a government portal, fees are generally not refundable by the department, even if an application is rejected. See our refund policy for details." },
            ]}
          />
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
