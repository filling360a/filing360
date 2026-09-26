"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { homeCompare } from "@/content/home";
import { siteConfig } from "@/lib/siteConfig";

type Accent = (typeof homeCompare.entities)[number]["accent"];
type Tone = "good" | "neutral" | "warn" | "info" | "fee";
type EntityId = (typeof homeCompare.entities)[number]["id"];

const headerStyles: Record<Accent, { head: string; icon: string; cell: string }> = {
  blue: {
    head: "bg-[#eff6ff]",
    cell: "bg-[#eff6ff]",
    icon: "bg-[#dbeafe] text-[#2563eb]",
  },
  green: {
    head: "bg-[#ecfdf5]",
    cell: "bg-[#ecfdf5]",
    icon: "bg-[#d1fae5] text-[#059669]",
  },
  orange: {
    head: "bg-[#fff7ed]",
    cell: "bg-[#fff7ed]",
    icon: "bg-[#ffedd5] text-[#ea580c]",
  },
};

const entityIcons: Record<Accent, ReactNode> = {
  blue: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 20h16M6 20V8l6-4 6 4v12M10 12h4M10 16h4" />
    </svg>
  ),
  green: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="9" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M3 19c.8-3 3-5 6-5s5.2 2 6 5M14 14c2.2.2 4 1.6 5 4" />
    </svg>
  ),
  orange: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.5 4-5.5 7-5.5s5.8 2 7 5.5" />
    </svg>
  ),
};

const describeOptions = [
  "Startup raising funding",
  "Consultant / professional firm",
  "Solo founder",
  "Not sure — advise me",
] as const;

function ToneIcon({ tone }: { tone?: string }) {
  if (tone === "good") {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22c55e] text-white">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
          <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (tone === "neutral") {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e2e8f0] text-[#64748b]">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="M7 12h10" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  if (tone === "warn") {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fff7ed] text-[#ea580c]">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 19V9M10 19V5M16 19v-7" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  if (tone === "info") {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[11px] font-bold text-[#2563eb]">
        i
      </span>
    );
  }
  if (tone === "fee") {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-[11px] font-bold text-white">
        ₹
      </span>
    );
  }
  return null;
}

export function CompareEntities() {
  const [describe, setDescribe] = useState("");
  const [sent, setSent] = useState(false);
  const [suggested, setSuggested] = useState<EntityId>("pvt");

  const suggestedEntity = homeCompare.entities.find((e) => e.id === suggested)!;

  function onRecommend(e: FormEvent) {
    e.preventDefault();
    if (!describe) return;
    if (describe.includes("funding") || describe.includes("Startup")) setSuggested("pvt");
    else if (describe.includes("Consultant")) setSuggested("llp");
    else if (describe.includes("Solo")) setSuggested("opc");
    else setSuggested("pvt");
    setSent(true);
  }

  return (
    <section
      className="relative overflow-hidden bg-[#f3f7fc]"
      id="compare-entities"
      aria-labelledby="compare-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-[#bfdbfe]/30 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1180px] px-5 py-10 md:px-8 lg:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="compare-heading"
            className="text-[24px] font-bold leading-[1.2] tracking-tight text-[#0b2c5e] md:text-[30px]"
          >
            {homeCompare.title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[14px] leading-snug text-[#64748b]">
            {homeCompare.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-stretch">
          {/* Left: table + CTA */}
          <div className="flex min-w-0 flex-col gap-4">
            <div>
              <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_10px_28px_-18px_rgba(15,23,42,0.22)]">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-[#e2e8f0]">
                        <th className="bg-[#f8fafc] px-4 py-3 text-[12px] font-semibold text-[#64748b]">
                          Compare
                        </th>
                        {homeCompare.entities.map((entity) => {
                          const styles = headerStyles[entity.accent];
                          return (
                            <th
                              key={entity.id}
                              className={`px-3 py-3 font-bold text-[#0b2c5e] ${styles.head}`}
                            >
                              <span className="inline-flex items-center gap-2">
                                <span
                                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${styles.icon}`}
                                >
                                  {entityIcons[entity.accent]}
                                </span>
                                {entity.short}
                              </span>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {homeCompare.rows.map((row) => (
                        <tr
                          key={row.label}
                          className="border-b border-[#eef2f7] last:border-b-0"
                        >
                          <th className="bg-[#f8fafc] px-4 py-2.5 align-middle font-semibold text-[#0f172a]">
                            {row.label}
                          </th>
                          {row.cells.map((cell, i) => {
                            const tone = "tone" in cell ? (cell.tone as Tone) : undefined;
                            const entity = homeCompare.entities[i];
                            const styles = headerStyles[entity.accent];
                            return (
                              <td
                                key={`${row.label}-${i}`}
                                className={`px-3 py-2.5 align-middle text-[#475569] ${styles.cell}`}
                              >
                                <span className="inline-flex items-center gap-2">
                                  <ToneIcon tone={tone} />
                                  <span
                                    className={
                                      tone === "fee" ? "font-semibold text-[#0b2c5e]" : ""
                                    }
                                  >
                                    {cell.text}
                                  </span>
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center gap-2 border-t border-[#eef2f7] bg-[#f8fafc]/80 px-4 py-2.5 text-[12px] text-[#64748b]">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#94a3b8] text-[9px] font-bold text-[#64748b]">
                    i
                  </span>
                  {homeCompare.feeNote}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 sm:items-center">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#2563eb] shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M4.5 16.5 12 4l7.5 12.5M9 14h6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 19c1.5 1.5 3 2 4 2s2.5-.5 4-2" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-[14px] font-bold text-[#0b2c5e]">
                    {homeCompare.cta.title}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-snug text-[#64748b]">
                    {homeCompare.cta.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                <a
                  href="#hero-lead"
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#2563eb] px-3.5 text-[12px] font-semibold text-white transition hover:bg-[#1d4ed8]"
                >
                  Get Expert Advice
                </a>
                <Link
                  href="/services/business-registration"
                  className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-[#93c5fd] bg-white px-3.5 text-[12px] font-semibold text-[#2563eb] transition hover:border-[#2563eb]"
                >
                  Start Registration ›
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-[#cbd5e1] bg-white px-3.5 text-[12px] font-semibold text-[#475569] transition hover:border-[#94a3b8]"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>

          {/* Right: recommendation form — matches left column height */}
          <aside className="flex min-h-0">
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#dbeafe] bg-white shadow-[0_20px_48px_-24px_rgba(37,99,235,0.35)]">
              <div
                className="h-1 w-full shrink-0 bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#60a5fa]"
                aria-hidden
              />

              <div className="flex flex-1 flex-col p-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-[#2563eb]">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                      <path d="M12 2l1.4 4.2L18 8l-4.2 1.4L12 14l-1.4-4.6L6 8l4.6-1.8L12 2Zm7 9 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold leading-tight text-[#0b2c5e]">
                      {homeCompare.sidebar.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-snug text-[#64748b]">
                      {homeCompare.sidebar.subtitle}
                    </p>
                  </div>
                </div>

                {/* Benefits — compact row */}
                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                  {homeCompare.sidebar.benefits.map((b) => (
                    <li
                      key={b}
                      className="inline-flex items-center gap-1 text-[10px] font-medium text-[#475569]"
                    >
                      <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-[#22c55e] text-white">
                        <svg viewBox="0 0 24 24" className="h-1.5 w-1.5" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden>
                          <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Form fills remaining height */}
                <div className="mt-3 flex flex-1 flex-col border-t border-[#eef2f7] pt-3">
                  {sent ? (
                    <div className="flex flex-1 flex-col justify-center rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-4 text-center">
                      <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#22c55e] text-white">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                          <path d="m5 12 4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <p className="mt-2 text-[13px] font-bold text-[#0b2c5e]">
                        We&apos;ll call you shortly
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-[#64748b]">
                        <span className="font-semibold text-[#2563eb]">
                          {suggestedEntity.short}
                        </span>{" "}
                        looks like the best fit.
                      </p>
                      <a
                        href="#hero-lead"
                        className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-[#0b2c5e] text-[12px] font-semibold text-white transition hover:bg-[#071f42]"
                      >
                        Get free consultation →
                      </a>
                      <button
                        type="button"
                        className="mt-2 text-[11px] font-medium text-[#64748b] hover:text-[#0b2c5e]"
                        onClick={() => {
                          setSent(false);
                          setDescribe("");
                        }}
                      >
                        Choose a different option
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={onRecommend}
                      className="flex flex-1 flex-col"
                    >
                      <p className="text-[11px] font-semibold text-[#0b2c5e]">
                        What best describes you?
                      </p>
                      <div
                        className="mt-2 flex flex-1 flex-col justify-center gap-1.5"
                        role="radiogroup"
                        aria-label="What best describes you?"
                      >
                        {describeOptions.map((o) => {
                          const active = describe === o;
                          return (
                            <button
                              key={o}
                              type="button"
                              role="radio"
                              aria-checked={active}
                              onClick={() => setDescribe(o)}
                              className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-[11px] leading-snug transition ${
                                active
                                  ? "border-[#2563eb] bg-[#eff6ff] font-semibold text-[#0b2c5e] shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
                                  : "border-[#e8eef5] bg-[#fafbfc] text-[#475569] hover:border-[#93c5fd] hover:bg-[#f8fbff]"
                              }`}
                            >
                              <span
                                className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 ${
                                  active
                                    ? "border-[#2563eb] bg-[#2563eb]"
                                    : "border-[#cbd5e1] bg-white"
                                }`}
                                aria-hidden
                              >
                                {active ? (
                                  <span className="h-1 w-1 rounded-full bg-white" />
                                ) : null}
                              </span>
                              {o}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-auto space-y-2 pt-3">
                        <button
                          type="submit"
                          disabled={!describe}
                          className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-[#2563eb] text-[12px] font-semibold text-white shadow-[0_8px_20px_-10px_rgba(37,99,235,0.7)] transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:bg-[#94a3b8] disabled:shadow-none"
                        >
                          Talk to Our Expert
                          <span aria-hidden>→</span>
                        </button>
                        <a
                          href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                          className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white text-[12px] font-semibold text-[#0b2c5e] transition hover:border-[#2563eb]/35"
                        >
                          Schedule a Call
                        </a>
                      </div>
                    </form>
                  )}
                </div>

                <p className="mt-2.5 text-center text-[9px] text-[#94a3b8]">
                  Confidential · No spam · Expert advisors
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
