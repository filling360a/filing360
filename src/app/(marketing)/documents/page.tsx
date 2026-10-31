import { container, CtaBand, LinkCards, PageHero } from "@/components/site/PageShell";
import { checklistHref, checklists } from "@/content/documents";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Document Checklists for Registrations & Tax Filings",
  description:
    "Know exactly what documents you need for company, LLP, OPC, GST, MSME and Section 8 registration, and for ITR filing — before you start.",
  path: "/documents",
});

export default function DocumentsHubPage() {
  return (
    <div className="bg-[#f3f7fa]">
      <PageHero
        eyebrow="Document checklists"
        title="What documents do I need?"
        crumbs={[{ name: "Document checklists", path: "/documents" }]}
        intro={<p>Keep these ready and your registration or filing moves without back-and-forth. Each list is maintained by our compliance team.</p>}
      />
      <section className={`${container} py-12`}>
        <LinkCards items={checklists.map((c) => ({ href: checklistHref(c), title: c.name, body: c.intro }))} />
      </section>
      <CtaBand />
    </div>
  );
}
