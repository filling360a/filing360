import Link from "next/link";
import type { GstBlock, GstServicePage } from "@/content/gstServicePages";

function H2({ children }: { children: string }) {
  return <h2 className="scroll-mt-28 text-[20px] font-bold tracking-tight text-[#0f2a45] md:text-[26px]">{children}</h2>;
}

function Table({ block }: { block: Extract<GstBlock, { type: "table" }> }) {
  return (
    <section>
      <H2>{block.title}</H2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#d7e4de] bg-white">
        <table className="w-full min-w-[560px] text-left text-[14.5px]">
          <thead className="bg-[#eef4f1] text-[#0f2a45]">
            <tr>
              {block.columns.map((c) => (
                <th key={c} scope="col" className="px-4 py-3 font-semibold">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d7e4de]">
            {block.rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell, i) => (
                  <td key={`${row[0]}-${i}`} className={`px-4 py-3 leading-relaxed text-[#2c3f4e] ${i === 0 ? "font-semibold text-[#0f2a45]" : ""}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {block.note ? <p className="border-t border-[#d7e4de] px-4 py-3 text-[13.5px] leading-relaxed text-[#5b6e7a]">{block.note}</p> : null}
      </div>
    </section>
  );
}

function Block({ block }: { block: GstBlock }) {
  if (block.type === "table") return <Table block={block} />;
  if (block.type === "p") {
    return (
      <section>
        {block.title ? <H2>{block.title}</H2> : null}
        <p className="mt-3 max-w-3xl text-[15.5px] leading-[1.7] text-[#2c3f4e]">{block.body}</p>
      </section>
    );
  }
  if (block.type === "list") {
    return (
      <section>
        <H2>{block.title}</H2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15.5px] leading-[1.65] text-[#2c3f4e]">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    );
  }
  return (
    <section>
      <H2>{block.title}</H2>
      <ol className="mt-4 space-y-3">
        {block.items.map((item, i) => (
          <li key={item.title} className="flex gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e3f2ed] text-[13px] font-bold text-[#0e7b5b]">
              {i + 1}
            </span>
            <p className="text-[15.5px] leading-[1.65] text-[#2c3f4e]">
              <strong className="font-semibold text-[#0f2a45]">{item.title}:</strong> {item.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function GstServiceArticle({ page }: { page: GstServicePage }) {
  return (
    <>
      <div className="space-y-9 md:space-y-12">
        {page.sections.map((block, i) => (
          <Block key={`${block.type}-${i}`} block={block} />
        ))}
      </div>

      {page.related.length > 0 ? (
        <p className="text-[15px] leading-relaxed text-[#5b6e7a]">
          Related:{" "}
          {page.related.map((link, i) => (
            <span key={link.href}>
              {i > 0 ? " · " : null}
              <Link href={link.href} className="font-semibold text-[#0e7b5b] hover:text-[#0b6550]">
                {link.label}
              </Link>
            </span>
          ))}
        </p>
      ) : null}
    </>
  );
}

export function GstServiceFaqs({ page }: { page: GstServicePage }) {
  return (
    <section id="faqs" className="scroll-mt-28">
      <H2>Frequently asked questions</H2>
      <div className="mt-5 divide-y divide-[#d7e4de] overflow-hidden rounded-2xl border border-[#d7e4de] bg-white">
        {page.faqs.map((item) => (
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
      <p className="mt-4 text-[13.5px] text-[#5b6e7a]">Reviewed by Filing360 Chartered Accountants · Updated 2 November 2026</p>
    </section>
  );
}
