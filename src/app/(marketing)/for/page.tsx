import { container, CtaBand, LinkCards, PageHero } from "@/components/site/PageShell";
import { industries, industryHref } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Who We Help — Start-ups, Sellers, Freelancers, NGOs & Doctors",
  description:
    "Registration, tax and compliance services tailored for start-ups, e-commerce sellers, freelancers, NGOs and doctors in India.",
  path: "/for",
});

export default function IndustriesHubPage() {
  return (
    <div className="bg-[#f8fafc]">
      <PageHero
        eyebrow="Who we help"
        title="Compliance that fits how you work"
        crumbs={[{ name: "Who we help", path: "/for" }]}
        intro={<p>Every business has its own tax and filing quirks. Pick yours to see what applies and how we can help.</p>}
      />
      <section className={`${container} py-12`}>
        <LinkCards items={industries.map((i) => ({ href: industryHref(i), title: i.name, body: i.description }))} />
      </section>
      <CtaBand />
    </div>
  );
}
