"use client";

import { FormEvent, useId, useState } from "react";
import { publicJsonHeaders } from "@/lib/api-headers";
import type { TrackStatus } from "@/lib/track";

const TONE = {
  progress: "bg-[#e3f2ed] text-[#0b6550]",
  success: "bg-[#e3f2ed] text-[#0b6550]",
  closed: "bg-[#eef4f1] text-[#4a5d68]",
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });

export function TrackForm({ initialRef = "" }: { initialRef?: string }) {
  const uid = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string | undefined>>({});
  const [status, setStatus] = useState<TrackStatus | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setBusy(true);
    setError(null);
    setFields({});
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: publicJsonHeaders,
        body: JSON.stringify({ ref: String(data.get("ref") ?? ""), phone: String(data.get("phone") ?? "") }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        status?: TrackStatus;
        error?: string;
        fields?: Record<string, string[] | undefined>;
      };
      if (res.ok && body.ok && body.status) {
        setStatus(body.status);
        return;
      }
      setStatus(null);
      if (body.fields) setFields({ ref: body.fields.ref?.[0], phone: body.fields.phone?.[0] });
      setError(body.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="rounded-2xl border border-[#d7e4de] bg-white p-5 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.3)] md:p-6" noValidate>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <div>
            <label htmlFor={`${uid}-ref`} className="text-[14px] font-semibold text-[#0f2a45]">Reference number</label>
            <input
              id={`${uid}-ref`}
              name="ref"
              required
              defaultValue={initialRef}
              placeholder="F360-1234 or APP-1234"
              autoComplete="off"
              autoCapitalize="characters"
              aria-invalid={Boolean(fields.ref)}
              aria-describedby={fields.ref ? `${uid}-ref-error` : undefined}
              className="field-lux mt-1.5 uppercase"
            />
            {fields.ref && <p id={`${uid}-ref-error`} className="mt-1 text-[13.5px] font-medium text-[#dc2626]">{fields.ref}</p>}
          </div>
          <div>
            <label htmlFor={`${uid}-phone`} className="text-[14px] font-semibold text-[#0f2a45]">Mobile number</label>
            <input
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              required
              placeholder="The number you gave us"
              autoComplete="tel"
              aria-invalid={Boolean(fields.phone)}
              aria-describedby={fields.phone ? `${uid}-phone-error` : undefined}
              className="field-lux mt-1.5"
            />
            {fields.phone && <p id={`${uid}-phone-error`} className="mt-1 text-[13.5px] font-medium text-[#dc2626]">{fields.phone}</p>}
          </div>
          <button
            type="submit"
            disabled={busy}
            className="h-12 rounded-xl bg-[#0f2a45] px-6 text-[15px] font-semibold text-white transition hover:bg-[#173a58] disabled:opacity-70"
          >
            {busy ? "Checking…" : "Check status"}
          </button>
        </div>
        {error && <p role="alert" className="mt-4 rounded-lg bg-[#fef2f2] px-3 py-2 text-[14px] font-medium text-[#b91c1c]">{error}</p>}
      </form>

      {status && (
        <section aria-live="polite" className="rounded-2xl border border-[#d7e4de] bg-white p-5 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[14px] text-[#5b6e7a]">
                {status.firstName ? `Hi ${status.firstName}, here's the latest on` : "Latest status for"} <span className="font-mono font-semibold text-[#0f2a45]">{status.ref}</span>
              </p>
              <h2 className="mt-1 text-[22px] font-bold text-[#0f2a45]">{status.subject}</h2>
            </div>
            <span className={`rounded-full px-3 py-1 text-[14px] font-semibold ${TONE[status.tone]}`}>{status.stage}</span>
          </div>
          <p className="mt-3 text-[16px] leading-relaxed text-[#2c3f4e]">{status.detail}</p>

          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {status.steps.map((s, i) => (
              <li
                key={s.label}
                className={`rounded-xl border px-3 py-3 text-[14.5px] ${
                  s.state === "done"
                    ? "border-[#c5e8dc] bg-[#e8f6f1] text-[#0b6550]"
                    : s.state === "current"
                      ? "border-[#8ecfbc] bg-[#e3f2ed] font-semibold text-[#0b6550]"
                      : "border-[#d7e4de] text-[#8a9ba6]"
                }`}
              >
                <span className="block text-[12px] uppercase tracking-[0.08em]">Step {i + 1}</span>
                {s.label}
              </li>
            ))}
          </ol>

          <dl className="mt-6 grid gap-2 text-[14.5px] text-[#4a5d68] sm:grid-cols-2">
            <div><dt className="inline font-semibold text-[#2c3f4e]">Submitted: </dt><dd className="inline">{fmt(status.submittedAt)}</dd></div>
            <div><dt className="inline font-semibold text-[#2c3f4e]">Last updated: </dt><dd className="inline">{fmt(status.updatedAt)}</dd></div>
          </dl>
        </section>
      )}
    </div>
  );
}
