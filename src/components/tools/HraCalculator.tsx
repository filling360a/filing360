"use client";

import { useState } from "react";
import { hraExemption } from "@/lib/tax";
import { inr, MoneyField, Panel, Row, Toggle } from "./fields";

export function HraCalculator() {
  const [basicDa, setBasicDa] = useState(600_000);
  const [hraReceived, setHraReceived] = useState(240_000);
  const [rentPaid, setRentPaid] = useState(300_000);
  const [metro, setMetro] = useState<"metro" | "non">("metro");
  const r = hraExemption({ basicDa, hraReceived, rentPaid, metro: metro === "metro" });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel>
        <p className="text-[14px] text-[#5b6e7a]">Enter yearly amounts.</p>
        <div className="mt-3 space-y-4">
          <MoneyField label="Basic salary + DA" value={basicDa} onChange={setBasicDa} hint="Include DA only if it counts for retirement benefits." />
          <MoneyField label="HRA received" value={hraReceived} onChange={setHraReceived} />
          <MoneyField label="Rent paid" value={rentPaid} onChange={setRentPaid} />
          <Toggle
            label="City you live in"
            value={metro}
            options={[
              { value: "metro", label: "Delhi, Mumbai, Kolkata, Chennai (50%)" },
              { value: "non", label: "Other city (40%)" },
            ]}
            onChange={setMetro}
          />
        </div>
      </Panel>
      <Panel>
        <h2 className="text-[18px] font-bold text-[#0f2a45]">HRA exemption</h2>
        <p className="mt-3 text-[30px] font-bold tracking-tight text-[#0f2a45]" aria-live="polite">{inr(r.exempt)}</p>
        <p className="text-[14px] text-[#5b6e7a]">Taxable HRA: {inr(r.taxable)}</p>
        <p className="mt-4 text-[14.5px] font-semibold text-[#2c3f4e]">Exemption is the lowest of:</p>
        <div className="mt-1">
          <Row label="Actual HRA received" value={inr(r.parts.received)} />
          <Row label="Rent paid minus 10% of salary" value={inr(r.parts.rentMinus10)} />
          <Row label={`${metro === "metro" ? "50%" : "40%"} of salary`} value={inr(r.parts.percentOfSalary)} />
        </div>
        <p className="mt-4 text-[13.5px] text-[#5b6e7a]">
          HRA exemption is available only in the old tax regime. If annual rent exceeds ₹1 lakh, your employer needs your landlord&apos;s PAN.
        </p>
      </Panel>
    </div>
  );
}
