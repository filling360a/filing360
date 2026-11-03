import Image from "next/image";
import { LeadForm } from "@/components/leads/LeadForm";
import { homeMidCta } from "@/content/home";
import { siteConfig } from "@/lib/siteConfig";

export function MidPageCta() {
  return (
    <section className="relative overflow-hidden bg-[#0f2a45]">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#0e7b5b]/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-[#0e7b5b]/20 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-12 md:px-8 lg:px-10 lg:py-20">
        <div>
          <div className="relative mb-6 aspect-[16/10] max-w-md overflow-hidden rounded-3xl border border-white/15">
            <Image
              src="/images/image.png"
              alt=""
              fill
              className="object-cover object-center"
              sizes="420px"
            />
          </div>
          <p className="text-[13.5px] font-semibold uppercase tracking-[0.16em] text-[#8ecfbc]">
            {homeMidCta.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {homeMidCta.title}
          </h2>
          <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/70">
            {homeMidCta.body}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#mid-lead"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-[15px] font-semibold text-[#0f2a45] transition hover:bg-[#e3f2ed]"
            >
              {siteConfig.cta.quote}
              <span aria-hidden>→</span>
            </a>
            <a
              href={`tel:${siteConfig.contact.phoneTel}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 px-5 text-[15px] font-semibold text-white transition hover:border-white/60"
            >
              Call {siteConfig.contact.phone}
            </a>
          </div>
        </div>
        <div className="lg:pl-4">
          <LeadForm id="mid-lead" variant="glass" className="!bg-white/15 !border-white/25 [&_.field-lux]:!bg-white/85" />
        </div>
      </div>
    </section>
  );
}
