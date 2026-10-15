import Link from "next/link";
import { JsonLd } from "@/components/blog/JsonLd";
import { container, CtaBand, FaqList, PageHero, PrimaryButton, SectionHeading } from "@/components/site/PageShell";
import { calendarEvents, calendarYear, monthlyDeadlines, QRMP_NOTE, type CalendarTag } from "@/content/calendar";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

const TITLE = `Compliance Calendar ${calendarYear.label} — GST, TDS, Income Tax & ROC Due Dates`;
const DESCRIPTION = `Every important due date for ${calendarYear.label}: GSTR-1, GSTR-3B, CMP-08, TDS returns, advance tax, ITR, AOC-4, MGT-7, LLP Form 8 and Form 11 — month by month.`;

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/compliance-calendar",
  keywords: ["compliance calendar", "GST due dates", "TDS due dates", "ROC filing due dates", "advance tax due dates", "income tax calendar"],
});

const TAG_STYLE: Record<CalendarTag, string> = {
  GST: "bg-[#ecfdf5] text-[#047857]",
  "TDS / TCS": "bg-[#fef3c7] text-[#92400e]",
  "Income tax": "bg-[#eff6ff] text-[#1d4ed8]",
  "ROC / MCA": "bg-[#f5f3ff] text-[#6d28d9]",
  Payroll: "bg-[#fdf2f8] text-[#be185d]",
};

const monthKey = (iso: string) => iso.slice(0, 7);
const monthLabel = (key: string) => new Date(`${key}-01T00:00:00+05:30`).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
const dayLabel = (iso: string) => new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

function Tag({ tag }: { tag: CalendarTag }) {
  return <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[12.5px] font-semibold ${TAG_STYLE[tag]}`}>{tag}</span>;
}

export default function ComplianceCalendarPage() {
  const months = new Map<string, typeof calendarEvents>();
  for (const e of calendarEvents) {
    const k = monthKey(e.date);
    months.set(k, [...(months.get(k) ?? []), e]);
  }

  return (
    <div className="bg-[#f8fafc]">
      <JsonLd data={webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/compliance-calendar", dateModified: calendarYear.reviewed })} />
      <PageHero
        eyebrow="Compliance calendar"
        title={`Compliance calendar ${calendarYear.label}`}
        crumbs={[{ name: "Compliance calendar", path: "/compliance-calendar" }]}
        intro={
          <p>
            Every GST, TDS, income tax and ROC deadline for businesses in India, month by month. Missing a date means late fees and interest —
            we can track them for you.
          </p>
        }
      >
        <PrimaryButton href="/book-consultation">Get deadline reminders</PrimaryButton>
      </PageHero>

      <section className={`${container} py-12`}>
        <div className="rounded-2xl border border-[#fde68a] bg-[#fffbeb] p-4 text-[15px] leading-relaxed text-[#78350f]">
          Dates follow current law as reviewed on{" "}
          {new Date(`${calendarYear.reviewed}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}. The
          CBDT, CBIC and MCA often extend deadlines by notification, and when a due date falls on a holiday the next working day may apply.
          Always confirm before relying on a date.
        </div>

        <h2 className="mt-10 text-[22px] font-bold tracking-tight text-[#0b2c5e] md:text-[28px]">Every month</h2>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e2e8f0] bg-white">
          <table className="w-full min-w-[640px] text-left text-[15px]">
            <thead className="bg-[#f1f5f9] text-[#0b2c5e]">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Due by</th>
                <th scope="col" className="px-4 py-3 font-semibold">Compliance</th>
                <th scope="col" className="px-4 py-3 font-semibold">Who</th>
                <th scope="col" className="px-4 py-3 font-semibold">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {monthlyDeadlines.map((d) => (
                <tr key={d.title} className="align-top">
                  <td className="whitespace-nowrap px-4 py-3 font-bold text-[#0b2c5e]">{d.day}</td>
                  <td className="px-4 py-3 text-[#334155]">{d.title}</td>
                  <td className="px-4 py-3 text-[#64748b]">{d.who}</td>
                  <td className="px-4 py-3"><Tag tag={d.tag} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[14.5px] text-[#64748b]">{QRMP_NOTE}</p>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title="Month-by-month due dates" />
        <nav aria-label="Months" className="mt-4 flex flex-wrap gap-2">
          {[...months.keys()].map((k) => (
            <a key={k} href={`#m-${k}`} className="rounded-full border border-[#cbd5e1] bg-white px-3 py-1.5 text-[14px] font-medium text-[#0b2c5e] hover:border-[#2563eb]">
              {monthLabel(k)}
            </a>
          ))}
        </nav>
        <div className="mt-6 space-y-6">
          {[...months.entries()].map(([k, events]) => (
            <section key={k} id={`m-${k}`} className="scroll-mt-24 rounded-2xl border border-[#e2e8f0] bg-white">
              <h3 className="border-b border-[#e2e8f0] px-5 py-3 text-[18px] font-bold text-[#0b2c5e]">{monthLabel(k)}</h3>
              <ul className="divide-y divide-[#f1f5f9]">
                {events.map((e) => (
                  <li key={`${e.date}-${e.title}`} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-start sm:gap-4">
                    <time dateTime={e.date} className="w-20 shrink-0 font-bold text-[#0b2c5e]">{dayLabel(e.date)}</time>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15.5px] text-[#334155]">
                        {e.href ? <Link href={e.href} className="hover:text-[#2563eb] hover:underline">{e.title}</Link> : e.title}
                      </p>
                      <p className="text-[14px] text-[#64748b]">{e.who}</p>
                    </div>
                    <Tag tag={e.tag} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className={`${container} pb-14`}>
        <SectionHeading title="Penalties for missing deadlines" />
        <div className="mt-5">
          <FaqList
            items={[
              { q: "What is the late fee for GSTR-3B?", a: "₹50 per day (₹20 per day for nil returns), split equally between CGST and SGST, subject to caps based on turnover — plus 18% annual interest on tax paid late." },
              { q: "What is the penalty for late TDS returns?", a: "A late fee of ₹200 per day until the return is filed, capped at the TDS amount, plus interest on late deposit of TDS. Penalties can also apply for not filing at all." },
              { q: "What happens if I miss ROC filing dates?", a: "The MCA charges an additional fee of ₹100 per day of delay for each form such as AOC-4, MGT-7, Form 8 and Form 11, with no upper cap. Prolonged default can lead to disqualification of directors." },
              { q: "What if I miss the ITR deadline?", a: "You can file a belated return with a late fee of up to ₹5,000 (₹1,000 if income is up to ₹5 lakh), plus interest on unpaid tax. Some losses can't be carried forward in a belated return." },
            ]}
          />
        </div>
      </section>
      <CtaBand title="Never miss a deadline again" body="We track every due date for your business and file on time — GST, TDS, income tax and ROC — with reminders before each one." />
    </div>
  );
}
