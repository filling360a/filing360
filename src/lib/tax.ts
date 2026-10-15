/**
 * Individual income tax for FY 2025-26 (AY 2026-27), resident individuals.
 * Estimates only: ignores special-rate income (capital gains etc.).
 */

export type AgeGroup = "below60" | "60to80" | "above80";

export type TaxInput = {
  grossIncome: number;
  salaried: boolean;
  age: AgeGroup;
  /** Old-regime deductions */
  sec80C: number;
  sec80D: number;
  hraExemption: number;
  homeLoanInterest: number;
  nps80CCD1B: number;
  otherDeductions: number;
  /** Employer NPS contribution — deductible in both regimes */
  employerNps: number;
};

export type RegimeResult = {
  taxableIncome: number;
  baseTax: number;
  rebate: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
  deductions: number;
};

type Slab = [upTo: number, rate: number];

const NEW_SLABS: Slab[] = [
  [400_000, 0],
  [800_000, 0.05],
  [1_200_000, 0.1],
  [1_600_000, 0.15],
  [2_000_000, 0.2],
  [2_400_000, 0.25],
  [Infinity, 0.3],
];

function oldSlabs(age: AgeGroup): Slab[] {
  const exempt = age === "above80" ? 500_000 : age === "60to80" ? 300_000 : 250_000;
  return [
    [exempt, 0],
    ...(exempt < 500_000 ? ([[500_000, 0.05]] as Slab[]) : []),
    [1_000_000, 0.2],
    [Infinity, 0.3],
  ];
}

function slabTax(income: number, slabs: Slab[]): number {
  let tax = 0;
  let prev = 0;
  for (const [upTo, rate] of slabs) {
    if (income <= prev) break;
    tax += (Math.min(income, upTo) - prev) * rate;
    prev = upTo;
  }
  return tax;
}

const SURCHARGE_OLD: Slab[] = [
  [5_000_000, 0],
  [10_000_000, 0.1],
  [20_000_000, 0.15],
  [50_000_000, 0.25],
  [Infinity, 0.37],
];
const SURCHARGE_NEW: Slab[] = SURCHARGE_OLD.slice(0, 4).concat([[Infinity, 0.25]]);

/** Surcharge with marginal relief at each threshold. */
function surchargeFor(income: number, taxFn: (i: number) => number, table: Slab[]): number {
  const idx = table.findIndex(([upTo]) => income <= upTo);
  const rate = table[idx][1];
  if (rate === 0) return 0;
  const tax = taxFn(income);
  const threshold = table[idx - 1][0];
  const lowerRate = table[idx - 1][1];
  const capped = taxFn(threshold) * (1 + lowerRate) + (income - threshold);
  return Math.max(0, Math.min(tax * (1 + rate), capped) - tax);
}

function finish(taxable: number, baseTax: number, rebate: number, surcharge: number, gross: number, deductions: number): RegimeResult {
  const afterRebate = baseTax - rebate;
  const cess = (afterRebate + surcharge) * 0.04;
  const totalTax = Math.round(afterRebate + surcharge + cess);
  return {
    taxableIncome: taxable,
    baseTax: Math.round(baseTax),
    rebate: Math.round(rebate),
    surcharge: Math.round(surcharge),
    cess: Math.round(cess),
    totalTax,
    effectiveRate: gross > 0 ? totalTax / gross : 0,
    deductions,
  };
}

export function newRegimeTax(input: TaxInput): RegimeResult {
  const deductions = (input.salaried ? 75_000 : 0) + Math.max(0, input.employerNps);
  const taxable = Math.max(0, input.grossIncome - deductions);
  const raw = (i: number) => slabTax(i, NEW_SLABS);
  const base = raw(taxable);
  let rebate = 0;
  if (taxable <= 1_200_000) rebate = Math.min(base, 60_000);
  else rebate = Math.max(0, base - (taxable - 1_200_000));
  const afterRebate = (i: number) => {
    const t = raw(i);
    if (i <= 1_200_000) return t - Math.min(t, 60_000);
    return Math.min(t, i - 1_200_000);
  };
  const surcharge = surchargeFor(taxable, afterRebate, SURCHARGE_NEW);
  return finish(taxable, base, rebate, surcharge, input.grossIncome, deductions);
}

export function oldRegimeTax(input: TaxInput): RegimeResult {
  const deductions =
    (input.salaried ? 50_000 : 0) +
    Math.min(Math.max(0, input.sec80C), 150_000) +
    Math.min(Math.max(0, input.sec80D), 100_000) +
    Math.max(0, input.hraExemption) +
    Math.min(Math.max(0, input.homeLoanInterest), 200_000) +
    Math.min(Math.max(0, input.nps80CCD1B), 50_000) +
    Math.max(0, input.otherDeductions) +
    Math.max(0, input.employerNps);
  const taxable = Math.max(0, input.grossIncome - deductions);
  const slabs = oldSlabs(input.age);
  const raw = (i: number) => slabTax(i, slabs);
  const base = raw(taxable);
  const rebate = taxable <= 500_000 ? Math.min(base, 12_500) : 0;
  const surcharge = surchargeFor(taxable, raw, SURCHARGE_OLD);
  return finish(taxable, base, rebate, surcharge, input.grossIncome, deductions);
}

/** HRA exemption: least of HRA received, rent minus 10% of salary, and 50% / 40% of salary. */
export function hraExemption(input: { basicDa: number; hraReceived: number; rentPaid: number; metro: boolean }) {
  const a = Math.max(0, input.hraReceived);
  const b = Math.max(0, input.rentPaid - 0.1 * input.basicDa);
  const c = (input.metro ? 0.5 : 0.4) * Math.max(0, input.basicDa);
  const exempt = Math.min(a, b, c);
  return { exempt, taxable: Math.max(0, a - exempt), parts: { received: a, rentMinus10: b, percentOfSalary: c } };
}

export const GST_RATES = [0.25, 3, 5, 18, 40] as const;

export function gstSplit(amount: number, ratePct: number, mode: "add" | "remove", interState: boolean) {
  const base = mode === "add" ? amount : amount / (1 + ratePct / 100);
  const gst = base * (ratePct / 100);
  return {
    base,
    gst,
    total: base + gst,
    cgst: interState ? 0 : gst / 2,
    sgst: interState ? 0 : gst / 2,
    igst: interState ? gst : 0,
  };
}
