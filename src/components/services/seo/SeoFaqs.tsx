import { ReviewedBy } from "@/components/site/ReviewedBy";

function H2({ children }: { children: string }) {
  return (
    <h2 className="scroll-mt-28 text-[20px] font-bold tracking-tight text-[#0f2a45] md:text-[26px]">
      {children}
    </h2>
  );
}

export function SeoFaqs({
  faqs,
  title = "Frequently asked questions",
  updatedSuffix,
}: {
  faqs: { q: string; a: string }[];
  title?: string;
  updatedSuffix?: string;
}) {
  return (
    <section id="faqs" className="scroll-mt-28">
      <H2>{title}</H2>
      <div className="mt-5 divide-y divide-[#d7e4de] overflow-hidden rounded-2xl border border-[#d7e4de] bg-white">
        {faqs.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 marker:hidden hover:bg-[#f3f7fa] [&::-webkit-details-marker]:hidden">
              <h3 className="text-[16px] font-semibold text-[#0f2a45]">{item.q}</h3>
              <span className="mt-0.5 shrink-0 text-[#0e7b5b] transition group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-[15.5px] leading-relaxed text-[#4a5d68]">{item.a}</p>
          </details>
        ))}
      </div>
      <ReviewedBy suffix={updatedSuffix} />
    </section>
  );
}
