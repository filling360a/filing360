import { homeCompare } from "@/content/home";

type EntityId = (typeof homeCompare.entities)[number]["id"];
type Tone = "good" | "neutral" | "warn" | "info" | "fee";

const column: Record<
  EntityId,
  { head: string; cell: string; ink: string; scoreOn: string; scoreOff: string }
> = {
  pvt: {
    head: "bg-[#0f2a45] text-white",
    cell: "bg-[#e8eef4]",
    ink: "text-[#0f2a45]",
    scoreOn: "bg-[#0f2a45]",
    scoreOff: "bg-[#c5d0db]",
  },
  llp: {
    head: "bg-[#0e7b5b] text-white",
    cell: "bg-[#e5f5ee]",
    ink: "text-[#0b4f3c]",
    scoreOn: "bg-[#0e7b5b]",
    scoreOff: "bg-[#b7e0ce]",
  },
  opc: {
    head: "bg-[#8a5a2b] text-white",
    cell: "bg-[#f7efe4]",
    ink: "text-[#5c3d1f]",
    scoreOn: "bg-[#8a5a2b]",
    scoreOff: "bg-[#e4d2b8]",
  },
};

const fundScore: Record<EntityId, number> = { pvt: 5, llp: 2, opc: 2 };
const complianceScore: Record<EntityId, number> = { pvt: 4, llp: 2, opc: 3 };

export function CompareEntities() {
  return (
    <section
      className="relative scroll-mt-24 overflow-hidden bg-[#f3f7fa]"
      id="compare-entities"
      aria-labelledby="compare-heading"
    >
      <div className="relative mx-auto max-w-[1180px] px-5 pb-3 pt-2 md:px-8 md:pt-3 lg:pb-5 lg:pt-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="compare-heading"
            className="text-balance text-[26px] font-bold leading-[1.22] tracking-[-0.03em] text-[#0f2a45] sm:text-[28px] md:text-[32px]"
          >
            Not sure whether to choose{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span
                className="absolute inset-x-[-0.08em] bottom-[0.08em] h-[0.36em] rounded-sm bg-[#c5e8dc]"
                aria-hidden
              />
              <span className="relative">Private Limited, LLP, or OPC</span>
            </span>
            ?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-pretty text-[15px] leading-snug text-[#2c3f4e] md:text-[15.5px]">
            {homeCompare.subtitle}
          </p>
        </div>

        <div className="mt-5 overflow-hidden rounded-[18px] border border-[#d7e4de] bg-white shadow-[0_18px_40px_-28px_rgba(15,42,69,0.3)] md:mt-7">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[20%]" />
                <col className="w-[26.66%]" />
                <col className="w-[26.66%]" />
                <col className="w-[26.66%]" />
              </colgroup>
              <thead>
                <tr>
                  <th className="bg-[#f7fbf9] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1e3d56]">
                    Compare
                  </th>
                  {homeCompare.entities.map((entity) => (
                    <th key={entity.id} className={`px-5 py-3.5 ${column[entity.id].head}`}>
                      <p className="flex items-center gap-1.5 text-[15px] font-bold">
                        <EntityGlyph id={entity.id} />
                        {entity.short}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {homeCompare.rows.map((row) => (
                  <tr key={row.label} className="border-t border-[#e8f0ec]">
                    <th className="bg-[#f7fbf9] px-5 py-4 align-middle text-[14px] font-semibold text-[#0f2a45]">
                      {row.label}
                    </th>
                    {row.cells.map((cell, i) => {
                      const entity = homeCompare.entities[i];
                      const tone = "tone" in cell ? (cell.tone as Tone) : undefined;
                      const skin = column[entity.id];
                      return (
                        <td
                          key={`${row.label}-${entity.id}`}
                          className={`px-5 py-4 align-middle text-[14px] leading-snug ${skin.cell} ${skin.ink}`}
                        >
                          {row.label === "Fundraising" ? (
                            <Score
                              value={fundScore[entity.id]}
                              filled={skin.scoreOn}
                              empty={skin.scoreOff}
                              label={`${entity.short} fundraising`}
                              caption={cell.text}
                            />
                          ) : row.label === "Compliance" ? (
                            <Score
                              value={complianceScore[entity.id]}
                              filled={skin.scoreOn}
                              empty={skin.scoreOff}
                              label={`${entity.short} compliance`}
                              caption={cell.text}
                            />
                          ) : tone === "good" ? (
                            <span className={`inline-flex items-center gap-1.5 font-medium ${skin.ink}`}>
                              <Check />
                              {cell.text}
                            </span>
                          ) : tone === "fee" ? (
                            <span className={`font-bold ${skin.ink}`}>{cell.text}</span>
                          ) : (
                            cell.text
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="flex items-start gap-2 border-t border-[#e8f0ec] bg-[#f7fbf9] px-4 py-3 text-[13px] leading-snug text-[#1e3d56] sm:px-5">
            <InfoMark />
            <span>
              <span className="md:hidden">Swipe the table to compare. </span>
              {homeCompare.feeNote}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Score({
  value,
  filled,
  empty,
  label,
  caption,
}: {
  value: number;
  filled: string;
  empty: string;
  label: string;
  caption: string;
}) {
  const pips = [0, 1, 2, 3, 4];
  return (
    <div>
      <div className="flex gap-[3px]" aria-label={`${label}: ${value} of 5`}>
        {pips.map((pip) => (
          <span
            key={pip}
            className={`h-[7px] w-[18px] rounded-full ${pip < value ? filled : empty}`}
          />
        ))}
      </div>
      <p className="mt-1.5 text-[13px] leading-snug">{caption}</p>
    </div>
  );
}

function EntityGlyph({ id, className = "h-3.5 w-3.5" }: { id: EntityId; className?: string }) {
  if (id === "pvt") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M4 20h16M6 20V8l6-4 6 4v12M10 12h4M10 16h4" />
      </svg>
    );
  }
  if (id === "llp") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="9" cy="8" r="3" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M3 19c.8-3 3-5 6-5s5.2 2 6 5M14 14c2.2.2 4 1.6 5 4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.5 4-5.5 7-5.5s5.8 2 7 5.5" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden>
      <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoMark() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 11v5M12 8h.01" strokeLinecap="round" />
    </svg>
  );
}
