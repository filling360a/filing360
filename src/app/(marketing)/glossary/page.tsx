import Link from "next/link";
import { JsonLd } from "@/components/blog/JsonLd";
import { container, CtaBand, PageHero } from "@/components/site/PageShell";
import { glossary } from "@/content/glossary";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Glossary of Business, GST & Tax Terms in India",
  description:
    "Plain-English definitions of CIN, DIN, DSC, SPICe+, GSTIN, GSTR-3B, ITC, TDS, AOC-4, MGT-7, LUT, QRMP and other company, GST and income tax terms.",
  path: "/glossary",
});

export default function GlossaryPage() {
  const terms = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  const letters = [...new Set(terms.map((t) => t.term[0].toUpperCase()))];

  return (
    <div className="bg-[#f8fafc]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Filing360 glossary of business, GST and tax terms",
          url: absoluteUrl("/glossary"),
          hasDefinedTerm: terms.map((t) => ({
            "@type": "DefinedTerm",
            name: t.term,
            description: t.definition,
            url: absoluteUrl(`/glossary#${t.slug}`),
          })),
        }}
      />
      <PageHero
        eyebrow="Glossary"
        title="Business, GST & tax terms explained"
        crumbs={[{ name: "Glossary", path: "/glossary" }]}
        intro={<p>Compliance comes with a lot of acronyms. Here&apos;s what they mean, in plain English.</p>}
      />
      <section className={`${container} py-12`}>
        <nav aria-label="Jump to letter" className="flex flex-wrap gap-1.5">
          {letters.map((l) => (
            <a key={l} href={`#letter-${l}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#cbd5e1] bg-white text-[14px] font-semibold text-[#0b2c5e] hover:border-[#2563eb]">
              {l}
            </a>
          ))}
        </nav>
        <div className="mt-8 space-y-8">
          {letters.map((l) => (
            <section key={l} id={`letter-${l}`} className="scroll-mt-24">
              <h2 className="text-[22px] font-bold text-[#0b2c5e]">{l}</h2>
              <dl className="mt-3 divide-y divide-[#e2e8f0] rounded-2xl border border-[#e2e8f0] bg-white">
                {terms
                  .filter((t) => t.term[0].toUpperCase() === l)
                  .map((t) => (
                    <div key={t.slug} id={t.slug} className="scroll-mt-24 px-5 py-4">
                      <dt className="text-[16.5px] font-bold text-[#0b2c5e]">{t.term}</dt>
                      <dd className="mt-1 text-[15.5px] leading-relaxed text-[#475569]">
                        {t.definition}
                        {t.href && (
                          <>
                            {" "}
                            <Link href={t.href} className="font-semibold text-[#2563eb] hover:underline">Learn more →</Link>
                          </>
                        )}
                      </dd>
                    </div>
                  ))}
              </dl>
            </section>
          ))}
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
