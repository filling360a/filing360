import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/blog/JsonLd";
import { LeadForm } from "@/components/leads/LeadForm";
import { container, CtaBand, FaqList, PageHero, SectionHeading } from "@/components/site/PageShell";
import { getGuide, guideHref } from "@/content/guides";
import { getIndustry, industries, industryHref } from "@/content/industries";
import { serviceLinks } from "@/content/links";
import { pageMetadata, webPageJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/for/[industry]">) {
  const ind = getIndustry((await params).industry);
  if (!ind) return {};
  return pageMetadata({ title: ind.metaTitle, description: ind.description, path: industryHref(ind) });
}

export default async function IndustryPage({ params }: PageProps<"/for/[industry]">) {
  const ind = getIndustry((await params).industry);
  if (!ind) notFound();
  const services = serviceLinks(ind.services);
  const guides = ind.guides.map(getGuide).filter((g) => g !== undefined);
  const others = industries.filter((i) => i.slug !== ind.slug);

  return (
    <div className="bg-[#f8fafc]">
      <JsonLd data={webPageJsonLd({ name: ind.metaTitle, description: ind.description, path: industryHref(ind) })} />
      <PageHero
        eyebrow={`For ${ind.name.toLowerCase()}`}
        title={ind.title}
        crumbs={[
          { name: "Who we help", path: "/for" },
          { name: ind.name, path: industryHref(ind) },
        ]}
        intro={<p>{ind.intro}</p>}
        aside={<LeadForm id="industry-lead" source={`industry-${ind.slug}`} />}
      />

      <section className={`${container} py-12`}>
        <SectionHeading title={ind.structure.heading} intro={ind.structure.body} />
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title="What you need to stay compliant" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {ind.compliance.map((c) => (
            <div key={c.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
              <h3 className="text-[17px] font-bold text-[#0b2c5e]">{c.title}</h3>
              <p className="mt-1.5 text-[15.5px] leading-relaxed text-[#475569]">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title={`Services for ${ind.name.toLowerCase()}`} />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="group flex h-full flex-col rounded-2xl border border-[#e2e8f0] bg-white p-5 transition hover:border-[#93c5fd]">
                <span className="text-[17px] font-bold text-[#0b2c5e] group-hover:text-[#2563eb]">{s.name}</span>
                <span className="mt-1.5 text-[15px] leading-relaxed text-[#475569]">{s.tagline}</span>
                <span className="mt-auto pt-3 text-[14.5px] font-semibold text-[#2563eb]">{s.priceLabel} →</span>
              </Link>
            </li>
          ))}
        </ul>
        {guides.length > 0 && (
          <p className="mt-5 text-[15px] text-[#64748b]">
            Read next:{" "}
            {guides.map((g, i) => (
              <span key={g.slug}>
                {i > 0 && " · "}
                <Link href={guideHref(g)} className="font-semibold text-[#2563eb] hover:underline">{g.title}</Link>
              </span>
            ))}
          </p>
        )}
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title="FAQs" />
        <div className="mt-5"><FaqList items={ind.faqs} /></div>
      </section>

      <section className={`${container} pb-14`}>
        <p className="text-[15px] font-semibold text-[#0b2c5e]">We also help</p>
        <ul className="mt-2 flex flex-wrap gap-2.5">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={industryHref(o)} className="inline-flex rounded-full border border-[#cbd5e1] bg-white px-4 py-2 text-[15px] font-medium text-[#0b2c5e] hover:border-[#2563eb]">
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </div>
  );
}
