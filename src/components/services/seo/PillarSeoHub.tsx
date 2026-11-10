import Link from "next/link";
import type { ReactNode } from "react";
import { ServiceCard } from "@/components/services/ServiceCard";
import { HubPackagesTable } from "@/components/services/seo/HubPackagesTable";
import { SeoArticle } from "@/components/services/seo/SeoArticle";
import { SeoFaqs } from "@/components/services/seo/SeoFaqs";
import { CtaBand, PrimaryButton, SecondaryButton } from "@/components/site/PageShell";
import { ReviewedBy } from "@/components/site/ReviewedBy";
import { whatsappLink } from "@/content/company";
import type { HubPackageRow, HubTocItem, SeoBlock } from "@/content/seoTypes";
import type { Pillar } from "@/content/services";

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 text-[22px] font-bold tracking-tight text-[#0f2a45] md:text-[28px]">
      {children}
    </h2>
  );
}

export function PillarSeoHub({
  pillar,
  updatedLabel,
  toc,
  packages,
  packageTitle,
  articleSections,
  faqs,
  faqTitle,
  ctaTitle,
  ctaBody,
  ctaPrimaryHref,
  ctaPrimaryLabel,
  whatsappMessage,
  children,
}: {
  pillar: Pillar;
  updatedLabel: string;
  toc: HubTocItem[];
  packages: HubPackageRow[];
  packageTitle: string;
  articleSections: SeoBlock[];
  faqs: { q: string; a: string }[];
  faqTitle?: string;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimaryHref: string;
  ctaPrimaryLabel: string;
  whatsappMessage: string;
  /** Optional extra article content rendered after SeoArticle blocks (custom JSX). */
  children?: ReactNode;
}) {
  return (
    <>
      <div className="mx-auto max-w-[1240px] px-5 pt-6 md:px-8 md:pt-8">
        <ReviewedBy className="text-[13.5px] text-[#5b6e7a]" suffix={`· Updated ${updatedLabel} · Fees exclusive of GST`} />

        <nav aria-label="On this page" className="mt-4 overflow-x-auto rounded-2xl border border-[#d7e4de] bg-white p-4 md:p-5">
          <p className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b]">On this page</p>
          <ol className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
            {toc.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="font-semibold text-[#0f2a45] hover:text-[#0e7b5b]">
                  {i + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <section className="mx-auto max-w-[1240px] space-y-9 px-5 py-8 md:px-8 lg:space-y-12 lg:py-12">
        <HubPackagesTable id="packages" title={packageTitle} packages={packages} />
        <div className="mt-4 flex flex-wrap gap-3">
          <PrimaryButton href={ctaPrimaryHref}>{ctaPrimaryLabel}</PrimaryButton>
          <SecondaryButton href={whatsappLink(whatsappMessage)}>WhatsApp us</SecondaryButton>
        </div>

        {pillar.groups.map((group, gi) => (
          <section key={group.name ?? gi}>
            {group.name && (
              <h3 className="mb-4 text-[18px] font-bold tracking-tight text-[#0f2a45] md:mb-5 md:text-[20px]">
                {group.name}
                <span className="ml-2 align-middle text-[13.5px] font-semibold text-[#8a9ba6]">{group.services.length}</span>
              </h3>
            )}
            <ul className="rail rail-bleed grid gap-4 [--rail-item:72%] [--rail-item-sm:40%] lg:grid-cols-3 xl:grid-cols-4">
              {group.services.map((service) => (
                <li key={service.slug}>
                  <ServiceCard pillar={pillar} service={service} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>

      <article id="article" className="mx-auto max-w-[800px] space-y-9 px-5 py-8 md:space-y-12 md:px-8 md:py-12">
        <SeoArticle sections={articleSections} />
        {children}
      </article>

      <section className="scroll-mt-28 border-t border-[#d7e4de] bg-[#eef4fb]">
        <div className="mx-auto max-w-[800px] px-5 py-10 md:px-8 md:py-14">
          <SeoFaqs faqs={faqs} title={faqTitle ?? `Frequently asked questions on ${pillar.name}`} />
        </div>
      </section>

      <CtaBand title={ctaTitle} body={ctaBody} />

      <div className="flex justify-center pb-10">
        <Link href="/" className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#5b6e7a] hover:text-[#0f2a45]">
          <span aria-hidden>←</span> Back to home
        </Link>
      </div>
    </>
  );
}

export { H2 as HubArticleH2 };
