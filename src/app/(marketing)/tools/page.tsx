import { container, CtaBand, LinkCards, PageHero } from "@/components/site/PageShell";
import { toolHref, tools } from "@/content/tools";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free Tax & Business Tools — Income Tax, GST, HRA, TDS",
  description:
    "Free calculators and tools for Indian taxpayers and founders: income tax (old vs new regime), GST, HRA exemption, TDS rate chart, company name checker and business structure chooser.",
  path: "/tools",
});

export default function ToolsHubPage() {
  return (
    <div className="bg-[#f3f7fa]">
      <PageHero
        eyebrow="Free tools"
        title="Free tax & business tools"
        crumbs={[{ name: "Free tools", path: "/tools" }]}
        intro={<p>Quick, accurate calculators built by our tax team. No sign-up, nothing stored — everything runs in your browser.</p>}
      />
      <section className={`${container} py-12`}>
        <LinkCards items={tools.map((t) => ({ href: toolHref(t), title: t.name, body: t.short }))} />
      </section>
      <CtaBand />
    </div>
  );
}
