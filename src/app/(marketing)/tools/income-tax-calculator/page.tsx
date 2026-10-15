import { IncomeTaxCalculator } from "@/components/tools/IncomeTaxCalculator";
import { ToolPage } from "@/components/tools/ToolPage";
import { getTool, toolHref } from "@/content/tools";
import { pageMetadata } from "@/lib/seo";

const tool = getTool("income-tax-calculator");
export const metadata = pageMetadata({
  title: tool.title,
  description: tool.description,
  path: toolHref(tool),
  keywords: ["income tax calculator", "old vs new regime calculator", "income tax calculator FY 2025-26", "tax calculator India"],
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro={<p>Enter your income and deductions to see your tax under both regimes side by side — including the ₹60,000 rebate, marginal relief, surcharge and cess.</p>}
      about={
        <>
          <h2>How this calculator works</h2>
          <p>
            New regime: standard deduction of ₹75,000 for salaried people and pensioners, slabs of 0% up to ₹4 lakh rising to 30% above ₹24
            lakh, and a rebate that makes tax nil up to ₹12 lakh of taxable income, with marginal relief just above it.
          </p>
          <p>
            Old regime: ₹50,000 standard deduction, deductions such as 80C (₹1.5 lakh), 80D, HRA and home-loan interest (₹2 lakh), and slabs of
            5%, 20% and 30% after the basic exemption for your age group.
          </p>
          <p>
            Surcharge applies above ₹50 lakh (capped at 25% in the new regime), with marginal relief at each threshold, and 4% health and
            education cess on the total. Income taxed at special rates — like capital gains on shares — isn&apos;t included.
          </p>
        </>
      }
      faqs={[
        { q: "Is this calculator updated for FY 2025-26?", a: "Yes. It uses the slabs, standard deduction and rebate announced in Budget 2025 that apply to FY 2025-26 (AY 2026-27)." },
        { q: "Why is my tax zero up to ₹12.75 lakh salary?", a: "Under the new regime, the ₹75,000 standard deduction brings taxable income to ₹12 lakh, and the rebate covers tax on income up to that level." },
        { q: "Does it include capital gains?", a: "No. Capital gains are taxed at special rates and the rebate doesn't apply to them. Ask us for an exact computation if you have them." },
      ]}
    >
      <IncomeTaxCalculator />
    </ToolPage>
  );
}
