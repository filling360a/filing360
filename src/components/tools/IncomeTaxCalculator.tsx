"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { newRegimeTax, oldRegimeTax, type AgeGroup, type RegimeResult, type TaxInput } from "@/lib/tax";
import { inr, MoneyField, Panel, Row, Toggle } from "./fields";

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

function ResultCard({ title, r, best }: { title: string; r: RegimeResult; best: boolean }) {
  return (
    <Panel className={best ? "border-[#0e7b5b] ring-1 ring-[#0e7b5b]" : ""}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[18px] font-bold text-[#0f2a45]">{title}</h3>
        {best && <span className="rounded-full bg-[#e3f2ed] px-2.5 py-0.5 text-[13px] font-semibold text-[#0b6550]">Lower tax</span>}
      </div>
      <p className="mt-3 text-[30px] font-bold tracking-tight text-[#0f2a45]">{inr(r.totalTax)}</p>
      <p className="text-[14px] text-[#5b6e7a]">Effective rate {pct(r.effectiveRate)} of gross income</p>
      <div className="mt-4">
        <Row label="Deductions used" value={inr(r.deductions)} />
        <Row label="Taxable income" value={inr(r.taxableIncome)} />
        <Row label="Tax on slabs" value={inr(r.baseTax)} />
        {r.rebate > 0 && <Row label="Rebate / marginal relief" value={`− ${inr(r.rebate)}`} />}
        {r.surcharge > 0 && <Row label="Surcharge" value={inr(r.surcharge)} />}
        <Row label="Health & education cess (4%)" value={inr(r.cess)} />
        <Row label="Total tax payable" value={inr(r.totalTax)} strong />
      </div>
    </Panel>
  );
}

export function IncomeTaxCalculator() {
  const [input, setInput] = useState<TaxInput>({
    grossIncome: 1_500_000,
    salaried: true,
    age: "below60",
    sec80C: 150_000,
    sec80D: 25_000,
    hraExemption: 0,
    homeLoanInterest: 0,
    nps80CCD1B: 0,
    otherDeductions: 0,
    employerNps: 0,
  });
  const set = <K extends keyof TaxInput>(k: K) => (v: TaxInput[K]) => setInput((s) => ({ ...s, [k]: v }));

  const { nr, or } = useMemo(() => ({ nr: newRegimeTax(input), or: oldRegimeTax(input) }), [input]);
  const diff = Math.abs(nr.totalTax - or.totalTax);
  const newBetter = nr.totalTax <= or.totalTax;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <Panel>
        <h2 className="text-[18px] font-bold text-[#0f2a45]">Your income</h2>
        <div className="mt-4 space-y-4">
          <MoneyField label="Gross annual income" value={input.grossIncome} onChange={set("grossIncome")} hint="Salary (before deductions), business or professional income, interest, rent, etc." />
          <Toggle
            label="Income type"
            value={input.salaried ? "salaried" : "other"}
            options={[
              { value: "salaried", label: "Salaried / pension" },
              { value: "other", label: "Business / other" },
            ]}
            onChange={(v) => set("salaried")(v === "salaried")}
          />
          <Toggle<AgeGroup>
            label="Age"
            value={input.age}
            options={[
              { value: "below60", label: "Below 60" },
              { value: "60to80", label: "60–79" },
              { value: "above80", label: "80+" },
            ]}
            onChange={set("age")}
          />
          <MoneyField label="Employer's NPS contribution" value={input.employerNps} onChange={set("employerNps")} hint="Deductible in both regimes, within limits." />
        </div>
        <h2 className="mt-7 text-[18px] font-bold text-[#0f2a45]">Deductions (old regime only)</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <MoneyField label="80C investments" value={input.sec80C} onChange={set("sec80C")} hint="Max ₹1,50,000" />
          <MoneyField label="80D health insurance" value={input.sec80D} onChange={set("sec80D")} hint="Self, family and parents" />
          <MoneyField label="HRA exemption" value={input.hraExemption} onChange={set("hraExemption")} hint="Use our HRA calculator" />
          <MoneyField label="Home-loan interest" value={input.homeLoanInterest} onChange={set("homeLoanInterest")} hint="Self-occupied, max ₹2,00,000" />
          <MoneyField label="80CCD(1B) NPS" value={input.nps80CCD1B} onChange={set("nps80CCD1B")} hint="Max ₹50,000" />
          <MoneyField label="Other deductions" value={input.otherDeductions} onChange={set("otherDeductions")} hint="80E, 80G, 80TTA, etc." />
        </div>
      </Panel>

      <div className="space-y-4">
        <div aria-live="polite" className={`rounded-2xl p-5 ${newBetter ? "bg-[#e3f2ed] text-[#0b6550]" : "bg-[#e8f6f1] text-[#0b6550]"}`}>
          <p className="text-[17px] font-bold">
            {diff === 0 ? "Both regimes give the same tax." : `The ${newBetter ? "new" : "old"} regime saves you ${inr(diff)}.`}
          </p>
          <p className="mt-1 text-[14.5px] opacity-90">
            Estimate for FY 2025-26 for resident individuals, excluding special-rate income such as capital gains.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <ResultCard title="New regime" r={nr} best={newBetter && diff > 0} />
          <ResultCard title="Old regime" r={or} best={!newBetter} />
        </div>
        <p className="text-[14px] text-[#5b6e7a]">
          Want an expert to file it?{" "}
          <Link href="/services/income-tax/itr-filing-individual" className="font-semibold text-[#0e7b5b] hover:underline">ITR filing by a CA</Link>
          {" · "}
          <Link href="/guides/old-vs-new-tax-regime" className="font-semibold text-[#0e7b5b] hover:underline">Old vs new regime guide</Link>
        </p>
      </div>
    </div>
  );
}
