"use client";

import { useId, useState } from "react";
import { Panel, Toggle } from "./fields";

type Entity = "pvt" | "opc" | "llp" | "sec8";

const SUFFIX: Record<Entity, { label: string; re: RegExp; correct: string }> = {
  pvt: { label: "Private Limited", re: /\s(private limited|pvt\.? ltd\.?)$/i, correct: "Private Limited" },
  opc: { label: "OPC", re: /\s\(?opc\)? private limited$|\sprivate limited$/i, correct: "(OPC) Private Limited" },
  llp: { label: "LLP", re: /\s(llp|limited liability partnership)$/i, correct: "LLP" },
  sec8: { label: "Section 8", re: /\s(foundation|forum|association|federation|chambers|confederation|council|electoral trust)$/i, correct: "Foundation / Association / Council" },
};

const APPROVAL_WORDS: [RegExp, string][] = [
  [/\b(bank|banking)\b/i, "“Bank” needs approval from the Reserve Bank of India."],
  [/\b(insurance|insurer|reinsurance)\b/i, "Insurance-related words need approval from IRDAI."],
  [/\b(stock exchange|mutual fund|asset management|venture capital)\b/i, "Securities-related words need a SEBI no-objection."],
  [/\bnidhi\b/i, "“Nidhi” is reserved for Nidhi companies under specific rules."],
  [/\b(national|union|central|federal|republic|government)\b/i, "Words like National, Union, Central, Federal or Republic need the central government's approval."],
  [/\b(board|commission|authority|undertaking|ministry|municipal|panchayat)\b/i, "Words suggesting a government body are not allowed without approval."],
  [/\b(president|rashtrapati|prime minister|chief minister|governor)\b/i, "Names of constitutional offices are protected under the Emblems and Names Act."],
  [/\b(co-?operative|sahakari)\b/i, "“Co-operative” can't be used by a company or LLP."],
];

const GENERIC = new Set(["solutions", "services", "technologies", "tech", "enterprises", "ventures", "global", "international", "consulting", "consultants", "traders", "trading", "group", "industries", "infotech", "systems", "digital"]);

type Check = { ok: boolean | "warn"; text: string };

function check(raw: string, entity: Entity): Check[] {
  const name = raw.trim().replace(/\s+/g, " ");
  if (!name) return [];
  const out: Check[] = [];
  const suffix = SUFFIX[entity];
  const hasSuffix = suffix.re.test(` ${name}`);
  out.push(
    hasSuffix
      ? { ok: true, text: `Ends with the right suffix for this entity.` }
      : { ok: "warn", text: `Should end with “${suffix.correct}” — we add it automatically when filing.` },
  );
  const core = name.replace(suffix.re, "").replace(/\s\(?opc\)?$/i, "").trim();
  if (/[^a-z0-9&.\-' ]/i.test(core)) out.push({ ok: false, text: "Use only letters, numbers, spaces and & . - ' — other symbols are rejected." });
  else out.push({ ok: true, text: "No disallowed special characters." });

  const words = core.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length < 2) out.push({ ok: "warn", text: "Add a descriptive word that reflects your business, e.g. “Brightleaf Foods” rather than “Brightleaf”." });
  if (words.length > 0 && words.every((w) => GENERIC.has(w))) {
    out.push({ ok: false, text: "The name is made up only of generic words — the MCA rejects these as not distinctive." });
  }
  for (const [re, msg] of APPROVAL_WORDS) if (re.test(core)) out.push({ ok: "warn", text: msg });
  if (/\b(limited|ltd|llp|private|pvt)\b/i.test(core)) out.push({ ok: false, text: "Don't use “Limited”, “Private” or “LLP” in the middle of the name." });
  if (core.length > 0 && core.length < 3) out.push({ ok: false, text: "The name is too short." });
  const problems = out.filter((c) => c.ok !== true).length - (hasSuffix ? 0 : 1);
  if (problems === 0) {
    out.push({ ok: true, text: "No obvious rule problems. Next: check it isn't identical or too similar to an existing company, LLP or registered trademark." });
  }
  return out;
}

const ICON = { true: "✓", warn: "!", false: "✕" } as const;
const TONE = {
  true: "bg-[#dcfce7] text-[#15803d]",
  warn: "bg-[#fef3c7] text-[#92400e]",
  false: "bg-[#fee2e2] text-[#b91c1c]",
} as const;

export function NameChecker() {
  const id = useId();
  const [name, setName] = useState("");
  const [entity, setEntity] = useState<Entity>("pvt");
  const results = check(name, entity);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel>
        <label htmlFor={id} className="text-[14px] font-semibold text-[#0b2c5e]">Proposed name</label>
        <input
          id={id}
          value={name}
          maxLength={120}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Brightleaf Foods Private Limited"
          className="field-lux mt-1.5"
          autoComplete="off"
        />
        <div className="mt-4">
          <Toggle
            label="Entity type"
            value={entity}
            options={[
              { value: "pvt", label: "Private Limited" },
              { value: "opc", label: "OPC" },
              { value: "llp", label: "LLP" },
              { value: "sec8", label: "Section 8" },
            ]}
            onChange={setEntity}
          />
        </div>
        <p className="mt-5 text-[13.5px] leading-relaxed text-[#64748b]">
          This checks naming rules only. It doesn&apos;t search the MCA or trademark registers — we do that for you before filing.
        </p>
      </Panel>
      <Panel>
        <h2 className="text-[18px] font-bold text-[#0b2c5e]">Checks</h2>
        {results.length === 0 ? (
          <p className="mt-3 text-[15px] text-[#64748b]">Type a name to see how it measures up against MCA naming rules.</p>
        ) : (
          <ul className="mt-3 space-y-2.5" aria-live="polite">
            {results.map((r) => (
              <li key={r.text} className="flex gap-3 text-[15px] text-[#334155]">
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${TONE[String(r.ok) as keyof typeof TONE]}`} aria-hidden>
                  {ICON[String(r.ok) as keyof typeof ICON]}
                </span>
                {r.text}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 space-y-1.5 text-[14.5px]">
          <a href="https://www.mca.gov.in" target="_blank" rel="noopener noreferrer" className="block font-semibold text-[#2563eb] hover:underline">
            Search existing company & LLP names on the MCA portal ↗
          </a>
          <a href="https://ipindia.gov.in" target="_blank" rel="noopener noreferrer" className="block font-semibold text-[#2563eb] hover:underline">
            Search registered trademarks on IP India ↗
          </a>
        </div>
      </Panel>
    </div>
  );
}
