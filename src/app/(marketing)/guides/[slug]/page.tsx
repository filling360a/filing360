import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/blog/JsonLd";
import { container, CtaBand, FaqList, PageHero, SectionHeading } from "@/components/site/PageShell";
import { ReviewedBy } from "@/components/site/ReviewedBy";
import { getGuide, guideHref, guides } from "@/content/guides";
import { serviceLinks } from "@/content/links";
import { absoluteUrl, pageMetadata, SITE_URL } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">) {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return pageMetadata({ title: guide.metaTitle, description: guide.description, path: guideHref(guide), type: "article" });
}

const fmt = (iso: string) => new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  const services = serviceLinks(guide.services);
  const related = guide.related.map(getGuide).filter((g) => g !== undefined);
  const [a, b] = guide.table.columns;

  return (
    <div className="bg-[#f3f7fa]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          datePublished: guide.published,
          dateModified: guide.updated,
          mainEntityOfPage: absoluteUrl(guideHref(guide)),
          author: { "@id": `${SITE_URL}/#organization` },
          publisher: { "@id": `${SITE_URL}/#organization` },
          image: absoluteUrl("/opengraph-image"),
          inLanguage: "en-IN",
        }}
      />
      <PageHero
        eyebrow="Comparison guide"
        title={guide.title}
        crumbs={[
          { name: "Guides", path: "/guides" },
          { name: `${a} vs ${b}`, path: guideHref(guide) },
        ]}
        intro={
          <>
            <p>{guide.intro}</p>
            <ReviewedBy className="mt-3 text-[14px] text-[#5b6e7a]" suffix={`· Updated ${fmt(guide.updated)}`} />
          </>
        }
      />

      <article className={`${container} py-10 md:py-14`}>
        <div className="rounded-2xl border border-[#c5e8dc] bg-[#e3f2ed] p-5 md:p-6">
          <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b]">Quick answer</p>
          <p className="mt-2 text-[16.5px] leading-relaxed text-[#0f2a45]">{guide.verdict}</p>
        </div>

        <h2 className="mt-10 text-[22px] font-bold tracking-tight text-[#0f2a45] md:text-[28px]">{a} vs {b} at a glance</h2>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-[#d7e4de] bg-white">
          <table className="w-full min-w-[640px] text-left text-[15px]">
            <thead className="bg-[#eef4f1] text-[#0f2a45]">
              <tr>
                <th scope="col" className="w-[26%] px-4 py-3 font-semibold">Feature</th>
                <th scope="col" className="px-4 py-3 font-semibold">{a}</th>
                <th scope="col" className="px-4 py-3 font-semibold">{b}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d7e4de]">
              {guide.table.rows.map((r) => (
                <tr key={r.label} className="align-top">
                  <th scope="row" className="px-4 py-3 font-semibold text-[#2c3f4e]">{r.label}</th>
                  <td className="px-4 py-3 text-[#4a5d68]">{r.values[0]}</td>
                  <td className="px-4 py-3 text-[#4a5d68]">{r.values[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[guide.chooseFirst, guide.chooseSecond].map((c) => (
            <div key={c.title} className="rounded-2xl border border-[#d7e4de] bg-white p-5">
              <h2 className="text-[18px] font-bold text-[#0f2a45]">{c.title}</h2>
              <ul className="mt-3 space-y-2">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[15.5px] text-[#2c3f4e]">
                    <span className="text-[#0e7b5b]" aria-hidden>✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="article-body mt-10 max-w-3xl">
          {guide.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        {services.length > 0 && (
          <section className="mt-12">
            <SectionHeading title="Get it done with an expert" />
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="group flex h-full flex-col rounded-2xl border border-[#d7e4de] bg-white p-5 transition hover:border-[#8ecfbc]">
                    <span className="text-[16.5px] font-bold text-[#0f2a45] group-hover:text-[#0e7b5b]">{s.name}</span>
                    <span className="mt-auto pt-3 text-[14.5px] font-semibold text-[#0e7b5b]">{s.priceLabel} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-12">
          <SectionHeading title="Frequently asked questions" />
          <div className="mt-5"><FaqList items={guide.faqs} /></div>
        </section>

        {related.length > 0 && (
          <section className="mt-10">
            <p className="text-[15px] font-semibold text-[#0f2a45]">Related guides</p>
            <ul className="mt-2 space-y-1.5">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link href={guideHref(g)} className="text-[15.5px] font-semibold text-[#0e7b5b] hover:underline">{g.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-10 text-[13.5px] leading-relaxed text-[#5b6e7a]">
          This guide is general information, not legal or tax advice. Laws and rates change; confirm the position for your case with a
          professional. See our <Link href="/disclaimer" className="underline">disclaimer</Link>.
        </p>
      </article>
      <CtaBand />
    </div>
  );
}
