import Link from "next/link";
import { JsonLd } from "@/components/blog/JsonLd";
import { container, CtaBand, FaqList, PageHero } from "@/components/site/PageShell";
import { commercialRules as rules, company } from "@/content/company";
import { guides, guideHref } from "@/content/guides";
import { faqs as generalFaqs } from "@/content/services";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQs — Company Registration, GST, Income Tax & Our Services",
  description:
    "Answers to common questions about company and LLP registration, GST, income tax, pricing, payments, refunds, timelines and how Filing360 works.",
  path: "/faq",
});

const pick = (slug: string) => guides.find((g) => g.slug === slug)?.faqs ?? [];

const GROUPS: { id: string; title: string; items: { q: string; a: string }[]; more?: { label: string; href: string } }[] = [
  { id: "general", title: "About Filing360", items: generalFaqs },
  {
    id: "registration",
    title: "Company, LLP & OPC registration",
    items: [...pick("llp-vs-private-limited").slice(0, 2), ...pick("opc-vs-private-limited").slice(0, 2)],
    more: { label: "LLP vs Private Limited guide", href: "/guides/llp-vs-private-limited" },
  },
  {
    id: "gst",
    title: "GST",
    items: pick("composition-vs-regular-gst"),
    more: { label: "Composition vs Regular GST guide", href: "/guides/composition-vs-regular-gst" },
  },
  {
    id: "income-tax",
    title: "Income tax",
    items: pick("old-vs-new-tax-regime"),
    more: { label: "Income tax calculator", href: "/tools/income-tax-calculator" },
  },
  {
    id: "payments",
    title: "Payments, refunds & delivery",
    items: [
      { q: "How do I pay?", a: `${rules.paymentMethods.join(", ")}. Most services start with a ${rules.advancePercent}% advance and the balance on delivery or at agreed milestones.` },
      { q: "Will I get a GST invoice?", a: `Yes. A GST-compliant tax invoice is issued within ${rules.invoiceWithinDays} working days of each payment, in the name and GSTIN you provide.` },
      { q: "Can I get a refund?", a: `If you cancel within ${rules.coolingOffHours} hours of payment and no work has started, you get a full refund of the professional fee. After work begins, refunds depend on the stage reached. Government fees once paid are not refundable.` },
      { q: "How do I track my request?", a: `Use your reference number and mobile number on the Track Status page, or contact ${company.contact.supportEmail}.` },
    ],
    more: { label: "Refund policy", href: "/refund-policy" },
  },
];

export default function FaqPage() {
  const all = GROUPS.flatMap((g) => g.items);

  return (
    <div className="bg-[#f8fafc]">
      <JsonLd data={faqJsonLd(all)} />
      <PageHero
        eyebrow="FAQs"
        title="Frequently asked questions"
        crumbs={[{ name: "FAQs", path: "/faq" }]}
        intro={
          <p>
            Quick answers about registrations, tax, GST and working with us. Can&apos;t find yours?{" "}
            <Link href="/contact" className="font-semibold text-[#2563eb] hover:underline">Ask us directly</Link>.
          </p>
        }
      />
      <section className={`${container} grid gap-10 py-12 lg:grid-cols-[220px_minmax(0,1fr)]`}>
        <nav aria-label="FAQ topics" className="lg:sticky lg:top-24 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {GROUPS.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="block rounded-lg px-3 py-1.5 text-[15px] font-medium text-[#0b2c5e] hover:bg-white hover:text-[#2563eb]">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-10">
          {GROUPS.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-24">
              <h2 className="text-[22px] font-bold text-[#0b2c5e] md:text-[26px]">{g.title}</h2>
              <div className="mt-4"><FaqList items={g.items} withSchema={false} /></div>
              {g.more && (
                <Link href={g.more.href} className="mt-3 inline-block text-[15px] font-semibold text-[#2563eb] hover:underline">
                  {g.more.label} →
                </Link>
              )}
            </section>
          ))}
          <p className="text-[15px] text-[#64748b]">
            More in our guides: {guides.map((g, i) => (
              <span key={g.slug}>
                {i > 0 && " · "}
                <Link href={guideHref(g)} className="text-[#2563eb] hover:underline">{g.table.columns.join(" vs ")}</Link>
              </span>
            ))}
          </p>
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
