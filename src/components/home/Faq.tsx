import { siteConfig } from "@/lib/siteConfig";
import { faqs } from "@/content/services";

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section className="border-t border-[#e2e8f0] bg-[#eef4fb]" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[1320px] px-5 py-10 md:px-8 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <h2 className="text-[24px] font-bold leading-tight tracking-tight text-[#0b1f3a] md:text-4xl">
              Frequently asked questions about company registration in India
            </h2>
            <p className="mt-2 max-w-xl text-[15px] text-[#64748b] md:mt-3 md:text-[16px]">
              Straight answers on fees, documents, timelines, entity choice, GST,
              and who issues your registration — written for both people and
              answer engines.
            </p>
          </div>
          <a
            href="#hero-lead"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0b2c5e] px-6 text-[15px] font-semibold text-white transition hover:bg-[#071f42]"
          >
            {siteConfig.cta.quote}
            <span aria-hidden>→</span>
          </a>
        </div>

        <ul className="mt-6 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white md:mt-10">
          {faqs.map((item) => (
            <li key={item.q} className="border-b border-[#e2e8f0] last:border-b-0">
              <details className="group px-4 py-3.5 md:px-6 md:py-4">
                <summary className="cursor-pointer list-none text-[16px] font-semibold text-[#0b1f3a] marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <h3 className="text-[15px] font-semibold md:text-[16px]">{item.q}</h3>
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb] transition group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#64748b]">
                  {item.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
