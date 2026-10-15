import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/blog/JsonLd";
import { company, formatPolicyDate, legalEntity } from "@/content/company";
import { policies, policyByPath, type PolicyPath } from "@/content/policies";
import { webPageJsonLd } from "@/lib/seo";
import { container, PageHero } from "./PageShell";

export type LegalSection = { id: string; title: string; body: ReactNode };

export function LegalDocument({ path, intro, sections }: { path: PolicyPath; intro: ReactNode; sections: LegalSection[] }) {
  const policy = policyByPath(path);
  return (
    <div className="bg-white">
      <JsonLd data={webPageJsonLd({ name: policy.title, description: policy.summary, path, dateModified: company.policiesUpdated })} />
      <PageHero
        eyebrow="Trust & legal"
        title={policy.title}
        crumbs={[
          { name: "Trust & legal", path: "/trust" },
          { name: policy.title, path },
        ]}
        intro={
          <>
            <p>{intro}</p>
            <p className="mt-3 text-[14px] text-[#64748b]">
              Last updated: <time dateTime={company.policiesUpdated}>{formatPolicyDate()}</time> · Issued by {legalEntity()}
            </p>
          </>
        }
      />

      <div className={`${container} grid gap-10 py-10 md:py-14 lg:grid-cols-[240px_minmax(0,1fr)]`}>
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-24">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-[#64748b]">On this page</p>
            <ol className="mt-3 space-y-2 border-l border-[#e2e8f0] text-[14px]">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-3 text-[#475569] hover:border-[#2563eb] hover:text-[#2563eb]">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0">
          <article className="article-body max-w-3xl text-[16px] leading-relaxed text-[#334155]">
            {sections.map((s, i) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id} className="scroll-mt-24">
                  {i + 1}. {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </article>

          <div className="mt-12 max-w-3xl rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5 md:p-6">
            <p className="text-[16px] font-bold text-[#0b2c5e]">Questions about this policy?</p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-[#475569]">
              Write to{" "}
              <a href={`mailto:${company.contact.supportEmail}`} className="font-semibold text-[#2563eb] hover:underline">
                {company.contact.supportEmail}
              </a>
              . For complaints, see our{" "}
              <Link href="/grievance-redressal" className="font-semibold text-[#2563eb] hover:underline">
                grievance redressal process
              </Link>
              .
            </p>
          </div>

          <nav aria-label="Other policies" className="mt-10 max-w-3xl">
            <p className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-[#64748b]">Other policies</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {policies
                .filter((p) => p.path !== path)
                .map((p) => (
                  <li key={p.path}>
                    <Link href={p.path} className="text-[15px] font-medium text-[#0b2c5e] hover:text-[#2563eb]">
                      {p.title} →
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
