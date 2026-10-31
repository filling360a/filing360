import Link from "next/link";
import { CompanyDetails } from "@/components/site/CompanyDetails";
import { container, CtaBand, PageHero, SectionHeading } from "@/components/site/PageShell";
import { policies } from "@/content/policies";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = pageMetadata({
  title: "Trust & Legal — Policies, Security and Disclaimer",
  description: `${siteConfig.brandName} is a private facilitation platform — not a government website. Read our terms, privacy, refund and service delivery policies, and how we protect your documents.`,
  path: "/trust",
});

const PROMISES = [
  { title: "Not a government website", body: "We are a private company. Registrations are issued only by the authority — you can also apply directly on government portals." },
  { title: "Prices split clearly", body: "Our professional fee and government fees are always shown separately. No hidden charges added after you pay." },
  { title: "Qualified professionals", body: "Work that needs a CA, CS or Advocate is done or certified by qualified, practising professionals." },
  { title: "Your documents stay private", body: "Private encrypted storage, role-based access, short-lived links and access logs. We never sell data." },
  { title: "Pay as work progresses", body: "Most services start with a 50% advance; the rest is paid in milestones. Clear refunds if you cancel early." },
  { title: "A named person to escalate to", body: "Every complaint is acknowledged within 24 hours by our Grievance Officer." },
];

export default function TrustPage() {
  return (
    <div className="bg-[#f3f7fa]">
      <PageHero
        eyebrow="Trust & legal"
        title="How we earn your trust"
        crumbs={[{ name: "Trust & legal", path: "/trust" }]}
        intro={
          <p>
            <strong className="text-[#0f2a45]">{siteConfig.brandName} is not a government website.</strong> We are a private, technology-enabled
            facilitation platform that helps you complete registrations, tax filings and compliance in India — with transparent fees and qualified
            professionals.
          </p>
        }
      />

      <section className={`${container} py-10 md:py-14`}>
        <SectionHeading title="Our commitments" />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROMISES.map((p) => (
            <li key={p.title} className="rounded-2xl border border-[#d7e4de] bg-white p-5">
              <p className="text-[17px] font-bold text-[#0f2a45]">{p.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4a5d68]">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-[#d7e4de] bg-white">
        <div className={`${container} py-10 md:py-14`}>
          <SectionHeading title="Policies" intro="Everything that governs how we work with you, written in plain language." />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {policies.map((p) => (
              <li key={p.path}>
                <Link href={p.path} className="group flex h-full flex-col rounded-2xl border border-[#d7e4de] p-5 transition hover:border-[#8ecfbc]">
                  <span className="text-[17px] font-bold text-[#0f2a45] group-hover:text-[#0e7b5b]">{p.title}</span>
                  <span className="mt-1.5 text-[15px] leading-relaxed text-[#4a5d68]">{p.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${container} py-10 md:py-14`}>
        <SectionHeading title="Company details" />
        <div className="mt-6">
          <CompanyDetails />
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
