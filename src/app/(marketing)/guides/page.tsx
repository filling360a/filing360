import { container, CtaBand, LinkCards, PageHero, SectionHeading } from "@/components/site/PageShell";
import { guideHref, guides } from "@/content/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Business & Tax Comparison Guides",
  description:
    "Plain-English comparisons to help you choose: LLP vs Private Limited, OPC vs Pvt Ltd, Proprietorship vs Partnership, Old vs New tax regime, and GST Composition vs Regular.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <div className="bg-[#f8fafc]">
      <PageHero
        eyebrow="Guides"
        title="Compare your options before you decide"
        crumbs={[{ name: "Guides", path: "/guides" }]}
        intro={<p>Side-by-side comparisons written by our tax and compliance team — with a clear recommendation for each situation.</p>}
      />
      <section className={`${container} py-12`}>
        <LinkCards
          items={guides.map((g) => ({
            href: guideHref(g),
            title: g.title,
            body: g.description,
            meta: `${g.table.columns[0]} vs ${g.table.columns[1]}`,
          }))}
        />
      </section>
      <section className={`${container} pb-14`}>
        <SectionHeading title="More resources" />
        <div className="mt-5">
          <LinkCards
            items={[
              { href: "/tools", title: "Free tax tools", body: "Income tax, GST and HRA calculators, TDS rate chart and more." },
              { href: "/compliance-calendar", title: "Compliance calendar", body: "Every GST, TDS, income tax and ROC due date in one place." },
              { href: "/documents", title: "Document checklists", body: "Exactly what to keep ready for each registration and filing." },
            ]}
          />
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
