"use client";

import { useId, type ReactNode } from "react";

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.round(n));

export function MoneyField({
  label,
  value,
  onChange,
  hint,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  hint?: string;
  max?: number;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-semibold text-[#0f2a45]">{label}</label>
      <div className="relative mt-1.5">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-[#5b6e7a]" aria-hidden>₹</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={value ? value.toLocaleString("en-IN") : ""}
          placeholder="0"
          onChange={(e) => {
            const n = Number(e.target.value.replace(/[^\d]/g, ""));
            onChange(Number.isFinite(n) ? Math.min(n, max ?? 1e12) : 0);
          }}
          className="field-lux pl-7"
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
      </div>
      {hint && <p id={`${id}-hint`} className="mt-1 text-[13px] text-[#5b6e7a]">{hint}</p>}
    </div>
  );
}

export function Toggle<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[14px] font-semibold text-[#0f2a45]">{label}</legend>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-xl border px-3.5 py-2 text-[14.5px] font-semibold transition ${
              value === o.value ? "border-[#0f2a45] bg-[#0f2a45] text-white" : "border-[#bfd4cb] bg-white text-[#0f2a45] hover:border-[#0e7b5b]"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-[#d7e4de] bg-white p-5 md:p-6 ${className}`}>{children}</div>;
}

export function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-1.5 ${strong ? "border-t border-[#d7e4de] pt-3 text-[17px] font-bold text-[#0f2a45]" : "text-[15px] text-[#4a5d68]"}`}>
      <span>{label}</span>
      <span className={strong ? "" : "font-semibold text-[#2c3f4e]"}>{value}</span>
    </div>
  );
}
