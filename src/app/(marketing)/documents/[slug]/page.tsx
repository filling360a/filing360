import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/blog/JsonLd";
import { container, CtaBand, PageHero, PrimaryButton, SecondaryButton } from "@/components/site/PageShell";
import { checklistHref, checklists, getChecklist } from "@/content/documents";
import { serviceLink } from "@/content/links";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return checklists.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/documents/[slug]">) {
  const c = getChecklist((await params).slug);
  if (!c) return {};
  return pageMetadata({
    title: `Documents Required for ${c.name} — Checklist`,
    description: `Complete checklist of documents required for ${c.name.toLowerCase()} in India. ${c.intro}`.slice(0, 300),
    path: checklistHref(c),
  });
}

export default async function ChecklistPage({ params }: PageProps<"/documents/[slug]">) {
  const c = getChecklist((await params).slug);
  if (!c) notFound();
  const service = serviceLink(c.service);
  const items = c.groups.flatMap((g) => g.items.map((i) => i.name));

  return (
    <div className="bg-[#f3f7fa]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Documents required for ${c.name}`,
          url: absoluteUrl(checklistHref(c)),
          numberOfItems: items.length,
          itemListElement: items.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
        }}
      />
      <PageHero
        eyebrow="Document checklist"
        title={`Documents required for ${c.name}`}
        crumbs={[
          { name: "Document checklists", path: "/documents" },
          { name: c.name, path: checklistHref(c) },
        ]}
        intro={<p>{c.intro}</p>}
      >
        {service && <PrimaryButton href={service.href}>{`${service.name} — ${service.priceLabel}`}</PrimaryButton>}
        <SecondaryButton href="/book-consultation">Ask an expert</SecondaryButton>
      </PageHero>

      <section className={`${container} grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_320px]`}>
        <div className="space-y-6">
          {c.groups.map((g) => (
            <section key={g.title} className="rounded-2xl border border-[#d7e4de] bg-white">
              <h2 className="border-b border-[#d7e4de] px-5 py-3 text-[18px] font-bold text-[#0f2a45]">{g.title}</h2>
              <ul className="divide-y divide-[#eef4f1]">
                {g.items.map((i) => (
                  <li key={i.name} className="flex gap-3 px-5 py-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#8a9ba6] text-[12px] text-transparent" aria-hidden>
                      ✓
                    </span>
                    <div>
                      <p className="text-[15.5px] font-semibold text-[#2c3f4e]">{i.name}</p>
                      {i.note && <p className="text-[14.5px] text-[#5b6e7a]">{i.note}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <aside className="space-y-4">
          {c.tips.length > 0 && (
            <div className="rounded-2xl border border-[#c5e8dc] bg-[#e3f2ed] p-5">
              <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b]">Tips from our team</p>
              <ul className="mt-3 space-y-2.5">
                {c.tips.map((t) => (
                  <li key={t} className="text-[15px] leading-relaxed text-[#0f2a45]">{t}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-2xl border border-[#d7e4de] bg-white p-5">
            <p className="text-[15px] font-semibold text-[#0f2a45]">Other checklists</p>
            <ul className="mt-2 space-y-1.5">
              {checklists
                .filter((o) => o.slug !== c.slug)
                .slice(0, 6)
                .map((o) => (
                  <li key={o.slug}>
                    <Link href={checklistHref(o)} className="text-[14.5px] text-[#0e7b5b] hover:underline">{o.name}</Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </section>
      <CtaBand title="Send us your documents — we'll check them for free" body="Share scans on WhatsApp or email. We'll flag anything missing before a single form is filed." />
    </div>
  );
}
