"use client";

import { useState } from "react";
import { GST_RATES, gstSplit } from "@/lib/tax";
import { inr, MoneyField, Panel, Row, Toggle } from "./fields";

export function GstCalculator() {
  const [amount, setAmount] = useState(10_000);
  const [rate, setRate] = useState<string>("18");
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [supply, setSupply] = useState<"intra" | "inter">("intra");
  const r = gstSplit(amount, Number(rate), mode, supply === "inter");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel>
        <div className="space-y-4">
          <MoneyField label={mode === "add" ? "Amount before GST" : "Amount including GST"} value={amount} onChange={setAmount} />
          <Toggle label="GST rate" value={rate} options={GST_RATES.map((g) => ({ value: String(g), label: `${g}%` }))} onChange={setRate} />
          <Toggle
            label="Calculation"
            value={mode}
            options={[
              { value: "add", label: "Add GST" },
              { value: "remove", label: "Remove GST (inclusive)" },
            ]}
            onChange={setMode}
          />
          <Toggle
            label="Type of supply"
            value={supply}
            options={[
              { value: "intra", label: "Within state (CGST + SGST)" },
              { value: "inter", label: "Other state (IGST)" },
            ]}
            onChange={setSupply}
          />
        </div>
      </Panel>
      <Panel>
        <h2 className="text-[18px] font-bold text-[#0f2a45]">Result</h2>
        <div className="mt-3" aria-live="polite">
          <Row label="Taxable value" value={inr(r.base)} />
          {supply === "intra" ? (
            <>
              <Row label={`CGST @ ${Number(rate) / 2}%`} value={inr(r.cgst)} />
              <Row label={`SGST / UTGST @ ${Number(rate) / 2}%`} value={inr(r.sgst)} />
            </>
          ) : (
            <Row label={`IGST @ ${rate}%`} value={inr(r.igst)} />
          )}
          <Row label="Total GST" value={inr(r.gst)} />
          <Row label="Invoice total" value={inr(r.total)} strong />
        </div>
      </Panel>
    </div>
  );
}
