"use client";

import Link from "next/link";
import { useState } from "react";
import { Panel } from "./fields";

type Answer = string;
type Structure = "pvt" | "opc" | "llp" | "partnership" | "proprietorship" | "sec8";

const QUESTIONS: { id: string; q: string; options: { value: Answer; label: string }[] }[] = [
  {
    id: "purpose",
    q: "What's the purpose of the organisation?",
    options: [
      { value: "profit", label: "A business that makes profit" },
      { value: "nonprofit", label: "Charity / non-profit work" },
    ],
  },
  {
    id: "founders",
    q: "How many founders or owners?",
    options: [
      { value: "1", label: "Just me" },
      { value: "2+", label: "Two or more" },
    ],
  },
  {
    id: "funding",
    q: "Do you plan to raise money from investors or give ESOPs?",
    options: [
      { value: "yes", label: "Yes, or likely" },
      { value: "maybe", label: "Maybe later" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "liability",
    q: "How important is protecting personal assets from business debts?",
    options: [
      { value: "high", label: "Very important" },
      { value: "low", label: "Not a big concern right now" },
    ],
  },
  {
    id: "compliance",
    q: "How much annual paperwork and cost are you comfortable with?",
    options: [
      { value: "low", label: "As little as possible" },
      { value: "ok", label: "Fine if it's worth it" },
    ],
  },
];

const RESULTS: Record<Structure, { name: string; why: string; href: string; guide?: { label: string; href: string } }> = {
  pvt: {
    name: "Private Limited Company",
    why: "Best for raising investment, issuing ESOPs and building credibility with large customers. Limited liability, with more annual compliance.",
    href: "/services/startup/private-limited-company",
    guide: { label: "LLP vs Private Limited", href: "/guides/llp-vs-private-limited" },
  },
  opc: {
    name: "One Person Company (OPC)",
    why: "A company with a single owner — limited liability and a corporate identity, with lighter compliance. Convert to Pvt Ltd when you take investment.",
    href: "/services/startup/opc",
    guide: { label: "OPC vs Private Limited", href: "/guides/opc-vs-private-limited" },
  },
  llp: {
    name: "Limited Liability Partnership (LLP)",
    why: "Limited liability for partners with lower compliance than a company. Ideal for services and professional firms that won't raise equity.",
    href: "/services/startup/llp",
    guide: { label: "LLP vs Private Limited", href: "/guides/llp-vs-private-limited" },
  },
  partnership: {
    name: "Partnership Firm",
    why: "The quickest, cheapest way for two or more people to start together. Liability is unlimited, so consider an LLP as you grow.",
    href: "/services/startup/partnership-firm",
    guide: { label: "Proprietorship vs Partnership", href: "/guides/proprietorship-vs-partnership" },
  },
  proprietorship: {
    name: "Sole Proprietorship",
    why: "The simplest way to start alone — no separate registration law, taxed at your slab rates. Liability is unlimited.",
    href: "/services/startup/proprietorship",
    guide: { label: "Proprietorship vs Partnership", href: "/guides/proprietorship-vs-partnership" },
  },
  sec8: {
    name: "Section 8 Company",
    why: "The most credible non-profit structure for CSR funding and institutional donors. A trust can be simpler for small charities.",
    href: "/services/startup/section-8-company",
  },
};

function recommend(a: Record<string, Answer>): { main: Structure; alt?: Structure } {
  if (a.purpose === "nonprofit") return { main: "sec8" };
  const solo = a.founders === "1";
  if (a.funding === "yes") return { main: "pvt", alt: solo ? "opc" : undefined };
  if (solo) {
    if (a.liability === "high") return { main: "opc", alt: a.funding === "maybe" ? "pvt" : "proprietorship" };
    return { main: "proprietorship", alt: "opc" };
  }
  if (a.funding === "maybe") return { main: a.compliance === "low" ? "llp" : "pvt", alt: a.compliance === "low" ? "pvt" : "llp" };
  if (a.liability === "high") return { main: "llp", alt: a.compliance === "ok" ? "pvt" : "partnership" };
  return { main: a.compliance === "low" ? "partnership" : "llp", alt: a.compliance === "low" ? "llp" : "partnership" };
}

export function StructureChooser() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const visible = QUESTIONS.filter((q) => answers.purpose !== "nonprofit" || q.id === "purpose");
  const done = visible.every((q) => answers[q.id]);
  const rec = done ? recommend(answers) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <Panel>
        <ol className="space-y-6">
          {visible.map((q, i) => (
            <li key={q.id}>
              <fieldset>
                <legend className="text-[16px] font-bold text-[#0b2c5e]">{i + 1}. {q.q}</legend>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {q.options.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      aria-pressed={answers[q.id] === o.value}
                      onClick={() => setAnswers((s) => ({ ...s, [q.id]: o.value }))}
                      className={`rounded-xl border px-4 py-2.5 text-[15px] font-semibold transition ${
                        answers[q.id] === o.value ? "border-[#0b2c5e] bg-[#0b2c5e] text-white" : "border-[#cbd5e1] bg-white text-[#0b2c5e] hover:border-[#2563eb]"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </li>
          ))}
        </ol>
        {Object.keys(answers).length > 0 && (
          <button type="button" onClick={() => setAnswers({})} className="mt-6 text-[14.5px] font-semibold text-[#64748b] hover:text-[#0b2c5e]">
            Start over
          </button>
        )}
      </Panel>
      <div aria-live="polite">
        {rec ? (
          <Panel className="border-[#16a34a] ring-1 ring-[#16a34a]">
            <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#15803d]">Our suggestion</p>
            <h2 className="mt-1 text-[24px] font-bold text-[#0b2c5e]">{RESULTS[rec.main].name}</h2>
            <p className="mt-2 text-[15.5px] leading-relaxed text-[#475569]">{RESULTS[rec.main].why}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={RESULTS[rec.main].href} className="inline-flex h-11 items-center rounded-xl bg-[#0b2c5e] px-5 text-[15px] font-semibold text-white hover:bg-[#123a74]">
                See packages & pricing
              </Link>
              {RESULTS[rec.main].guide && (
                <Link href={RESULTS[rec.main].guide!.href} className="inline-flex h-11 items-center rounded-xl border border-[#cbd5e1] px-5 text-[15px] font-semibold text-[#0b2c5e] hover:border-[#2563eb]">
                  {RESULTS[rec.main].guide!.label}
                </Link>
              )}
            </div>
            {rec.alt && (
              <p className="mt-5 border-t border-[#e2e8f0] pt-4 text-[15px] text-[#475569]">
                Also worth considering:{" "}
                <Link href={RESULTS[rec.alt].href} className="font-semibold text-[#2563eb] hover:underline">{RESULTS[rec.alt].name}</Link>
              </p>
            )}
            <p className="mt-4 text-[13.5px] text-[#64748b]">
              A starting point, not legal advice. A free call with our team will confirm the right fit.
            </p>
          </Panel>
        ) : (
          <Panel>
            <p className="text-[16px] font-semibold text-[#0b2c5e]">Answer {visible.length} quick questions</p>
            <p className="mt-1.5 text-[15px] text-[#475569]">We&apos;ll suggest the structure that best fits your plans, with a link to compare alternatives.</p>
          </Panel>
        )}
      </div>
    </div>
  );
}
