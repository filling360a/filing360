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
      <label htmlFor={id} className="text-[14px] font-semibold text-[#0b2c5e]">{label}</label>
      <div className="relative mt-1.5">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[15px] text-[#64748b]" aria-hidden>₹</span>
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
      {hint && <p id={`${id}-hint`} className="mt-1 text-[13px] text-[#64748b]">{hint}</p>}
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
      <legend className="text-[14px] font-semibold text-[#0b2c5e]">{label}</legend>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-xl border px-3.5 py-2 text-[14.5px] font-semibold transition ${
              value === o.value ? "border-[#0b2c5e] bg-[#0b2c5e] text-white" : "border-[#cbd5e1] bg-white text-[#0b2c5e] hover:border-[#2563eb]"
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
  return <div className={`rounded-2xl border border-[#e2e8f0] bg-white p-5 md:p-6 ${className}`}>{children}</div>;
}

export function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-1.5 ${strong ? "border-t border-[#e2e8f0] pt-3 text-[17px] font-bold text-[#0b2c5e]" : "text-[15px] text-[#475569]"}`}>
      <span>{label}</span>
      <span className={strong ? "" : "font-semibold text-[#334155]"}>{value}</span>
    </div>
  );
}
