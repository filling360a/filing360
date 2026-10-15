import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/blog/JsonLd";
import { container, CtaBand, FaqList, PageHero, SectionHeading } from "@/components/site/PageShell";
import { getTool, toolHref, tools } from "@/content/tools";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export function ToolPage({
  slug,
  intro,
  children,
  about,
  faqs,
  interactive = true,
}: {
  slug: string;
  intro: ReactNode;
  children: ReactNode;
  about?: ReactNode;
  faqs?: { q: string; a: string }[];
  interactive?: boolean;
}) {
  const tool = getTool(slug);
  const others = tools.filter((t) => t.slug !== slug);

  return (
    <div className="bg-[#f8fafc]">
      {interactive && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: tool.name,
            description: tool.description,
            url: absoluteUrl(toolHref(tool)),
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            browserRequirements: "Requires JavaScript",
            offers: { "@type": "Offer", price: 0, priceCurrency: "INR" },
            provider: { "@id": `${SITE_URL}/#organization` },
          }}
        />
      )}
      <PageHero
        eyebrow="Free tool"
        title={tool.title}
        crumbs={[
          { name: "Free tools", path: "/tools" },
          { name: tool.name, path: toolHref(tool) },
        ]}
        intro={intro}
      />
      <section className={`${container} py-10 md:py-12`}>{children}</section>
      {about && <section className={`${container} pb-12`}><div className="article-body max-w-3xl">{about}</div></section>}
      {faqs && faqs.length > 0 && (
        <section className={`${container} pb-12`}>
          <SectionHeading title="FAQs" />
          <div className="mt-5"><FaqList items={faqs} /></div>
        </section>
      )}
      <section className={`${container} pb-14`}>
        <p className="text-[15px] font-semibold text-[#0b2c5e]">More free tools</p>
        <ul className="mt-3 flex flex-wrap gap-2.5">
          {others.map((t) => (
            <li key={t.slug}>
              <Link href={toolHref(t)} className="inline-flex rounded-full border border-[#cbd5e1] bg-white px-4 py-2 text-[15px] font-medium text-[#0b2c5e] hover:border-[#2563eb]">
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[13.5px] text-[#64748b]">
          Results are estimates for general guidance, not tax advice. See our <Link href="/disclaimer" className="underline">disclaimer</Link>.
        </p>
      </section>
      <CtaBand />
    </div>
  );
}
