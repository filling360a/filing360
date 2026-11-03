import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/blog/JsonLd";
import { GstHub } from "@/components/gst/GstHub";
import { ServiceCard } from "@/components/services/ServiceCard";
import { LeadForm } from "@/components/leads/LeadForm";
import { InnerHero, bannerMarks } from "@/components/site/InnerHero";
import { PrimaryButton, SecondaryButton } from "@/components/site/PageShell";
import { GST, GST_HUB_PATH, gstFaqs, gstHubMeta, gstPrices } from "@/content/gstHub";
import { bannerForPillar, splitHeading } from "@/content/pageBanners";
import { formatInr, getPillar, pillars } from "@/content/services";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ pillar: string }> };

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) return {};
  if (slug === "gst") {
    return pageMetadata({
      title: gstHubMeta.title,
      description: gstHubMeta.description,
      path: GST_HUB_PATH,
      absoluteTitle: true,
      keywords: gstHubMeta.keywords,
    });
  }
  return pageMetadata({
    title: `${pillar.name} Services Online in India | Filing360`,
    description: pillar.description.slice(0, 155),
    path: `/services/${pillar.slug}`,
    absoluteTitle: true,
    keywords: [`${pillar.name} services`, `${pillar.name} online India`, "Filing360"],
  });
}

function GstPillar({ pillar }: { pillar: NonNullable<ReturnType<typeof getPillar>> }) {
  return (
    <div className="bg-[#f3f7fa]">
      <JsonLd
        data={[
          serviceJsonLd({
            name: "GST Registration and Return Filing",
            description: gstHubMeta.description,
            path: GST_HUB_PATH,
            category: "GST Registration, GST Return Filing, LUT, Amendment, Cancellation, Revocation",
            offers: [
              { name: "GST Registration", price: gstPrices.registration, description: "Application, ARN tracking, query replies, GST certificate" },
              { name: "GST Return Filing – Monthly", price: gstPrices.monthly, description: "GSTR-1, GSTR-3B, GSTR-2B reconciliation" },
              { name: "GST Return Filing – Composition", price: gstPrices.compositionYear, description: "CMP-08 for 4 quarters + GSTR-4" },
              { name: "GST Annual Return", price: gstPrices.annual, description: "GSTR-9 (+ GSTR-9C if applicable)" },
              { name: "LUT Filing", price: gstPrices.lut, description: "RFD-11 filing for one financial year" },
              { name: "GST Amendment", price: gstPrices.amendment, description: "REG-14 with documentation" },
              { name: "GST Cancellation (GSTR-10)", price: gstPrices.cancellation, description: "REG-16 / GSTR-10" },
              { name: "GST Revocation", price: gstPrices.revocation, description: "REG-21 with documentation" },
            ],
          }),
          faqJsonLd(gstFaqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "GST", path: GST_HUB_PATH },
          ]),
        ]}
      />
      <InnerHero
        art={bannerForPillar("gst")}
        title={gstHubMeta.h1}
        imageAlt="GST registration process by Filing360"
        body={
          <p>
            Apply for a GST number online and get your GSTIN in 3–7 working days, then never miss a return again. Filing360’s Chartered Accountants handle new GST registration, monthly and quarterly return filing, LUT, amendments, cancellation and revocation, all at transparent, fixed prices.
          </p>
        }
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "GST" },
        ]}
        marks={[
          { label: "100% online process", well: "bg-[#e3f2ed] text-[#0e7b5b]", icon: bannerMarks.check },
          { label: "Dedicated CA for your business", well: "bg-[#e8f2ee] text-[#0f2a45]", icon: bannerMarks.shield },
          { label: "Due-date reminders on WhatsApp", well: "bg-[#d4ede4] text-[#0b6550]", icon: bannerMarks.doc },
          { label: `Plans starting at ${formatInr(gstPrices.from)}`, well: "bg-[#e3f2ed] text-[#0e7b5b]", icon: bannerMarks.rupee },
        ]}
        actions={
          <>
            <PrimaryButton href={GST.reg}>Get GST Registration</PrimaryButton>
            <SecondaryButton href="#pillar-lead">Talk to a CA Free</SecondaryButton>
          </>
        }
        form={
          <LeadForm
            id="pillar-lead"
            compact
            source="pillar-gst"
            service={{ slug: "gst-registration", name: "GST Registration" }}
            title="Get a free quote"
            submitLabel="Get free quote"
            interestLabel="Service"
            badge="15-min CA call · No obligation"
          />
        }
      />
      <GstHub pillar={pillar} />
    </div>
  );
}

export default async function PillarPage({ params }: Props) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();
  if (slug === "gst") return <GstPillar pillar={pillar} />;

  const heading = splitHeading(`${pillar.name} services`);

  return (
    <div className="bg-[#f3f7fa]">
      <InnerHero
        art={bannerForPillar(pillar.slug)}
        title={heading.title}
        accent={heading.accent}
        body={<p>{pillar.description}</p>}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: pillar.name },
        ]}
        marks={[
          {
            label: `${pillar.services.length} services`,
            well: "bg-[#e3f2ed] text-[#0e7b5b]",
            icon: bannerMarks.doc,
          },
          {
            label: "100% online",
            well: "bg-[#e8f2ee] text-[#0f2a45]",
            icon: bannerMarks.check,
          },
          {
            label: "Expert filed",
            well: "bg-[#d4ede4] text-[#0b6550]",
            icon: bannerMarks.shield,
          },
          {
            label: "Pan-India",
            well: "bg-[#e3f2ed] text-[#0e7b5b]",
            icon: bannerMarks.building,
          },
        ]}
        form={
          <LeadForm
            id="pillar-lead"
            compact
            source={`pillar-${pillar.slug}`}
            title="Get a free quote"
            submitLabel="Get free quote"
            interestLabel="Service"
            badge="Fast · Easy · No Obligation"
          />
        }
      />

      <div className="mx-auto max-w-[1240px] space-y-9 px-5 py-8 md:px-8 lg:space-y-12 lg:py-16">
        {pillar.groups.map((group, gi) => (
          <section key={group.name ?? gi}>
            {group.name && (
              <h2 className="mb-4 text-[18px] font-bold tracking-tight text-[#0f2a45] md:mb-5 md:text-[20px]">
                {group.name}
                <span className="ml-2 align-middle text-[13.5px] font-semibold text-[#8a9ba6]">
                  {group.services.length}
                </span>
              </h2>
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

        <div className="flex justify-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#5b6e7a] hover:text-[#0f2a45]">
            <span aria-hidden>←</span> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
