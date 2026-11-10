import Link from "next/link";
import type { SeoBlock, SeoServicePage } from "@/content/seoTypes";

function H2({ id, children }: { id?: string; children: string }) {
  return (
    <h2 id={id} className="scroll-mt-28 text-[20px] font-bold tracking-tight text-[#0f2a45] md:text-[26px]">
      {children}
    </h2>
  );
}

function Table({ block }: { block: Extract<SeoBlock, { type: "table" }> }) {
  return (
    <section>
      <H2 id={block.id}>{block.title}</H2>
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
                  <td
                    key={`${row[0]}-${i}`}
                    className={`px-4 py-3 leading-relaxed text-[#2c3f4e] ${i === 0 ? "font-semibold text-[#0f2a45]" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {block.note ? (
          <p className="border-t border-[#d7e4de] px-4 py-3 text-[13.5px] leading-relaxed text-[#5b6e7a]">
            {block.note}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function Block({ block }: { block: SeoBlock }) {
  if (block.type === "table") return <Table block={block} />;
  if (block.type === "p") {
    return (
      <section>
        {block.title ? <H2 id={block.id}>{block.title}</H2> : null}
        <p className="mt-3 max-w-3xl text-[15.5px] leading-[1.7] text-[#2c3f4e]">{block.body}</p>
      </section>
    );
  }
  if (block.type === "list") {
    return (
      <section>
        <H2 id={block.id}>{block.title}</H2>
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
      <H2 id={block.id}>{block.title}</H2>
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

export function SeoArticle({
  sections,
  related,
}: {
  sections: SeoBlock[];
  related?: SeoServicePage["related"];
}) {
  return (
    <>
      <div className="space-y-9 md:space-y-12">
        {sections.map((block, i) => (
          <Block key={`${block.type}-${i}`} block={block} />
        ))}
      </div>

      {related && related.length > 0 ? (
        <p className="text-[15px] leading-relaxed text-[#5b6e7a]">
          Related:{" "}
          {related.map((link, i) => (
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
