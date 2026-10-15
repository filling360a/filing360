import { GstCalculator } from "@/components/tools/GstCalculator";
import { ToolPage } from "@/components/tools/ToolPage";
import { getTool, toolHref } from "@/content/tools";
import { pageMetadata } from "@/lib/seo";

const tool = getTool("gst-calculator");
export const metadata = pageMetadata({
  title: tool.title,
  description: tool.description,
  path: toolHref(tool),
  keywords: ["GST calculator", "GST inclusive calculator", "reverse GST calculator", "CGST SGST calculator"],
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro={<p>Add GST to a price, or work backwards from a GST-inclusive amount — with the CGST / SGST split for sales within your state and IGST for sales to other states.</p>}
      about={
        <>
          <h2>GST rates in India</h2>
          <p>
            Since 22 September 2025, most goods and services fall in two main slabs — 5% and 18% — with a 40% rate for luxury and sin goods.
            Special rates of 0.25% (rough diamonds and precious stones) and 3% (gold, silver and jewellery) continue, and many essentials are
            exempt.
          </p>
          <h2>CGST, SGST and IGST</h2>
          <p>
            For a sale within the same state, GST is split equally between the Centre (CGST) and the state (SGST, or UTGST in union
            territories). For a sale to another state, the full amount is charged as IGST.
          </p>
          <h2>Removing GST from an inclusive price</h2>
          <p>Taxable value = inclusive amount ÷ (1 + rate ÷ 100). For example, ₹1,180 including 18% GST is ₹1,000 plus ₹180 GST.</p>
        </>
      }
      faqs={[
        { q: "Are 12% and 28% GST rates still used?", a: "Most items earlier taxed at 12% and 28% were moved to 5%, 18% or 40% from 22 September 2025. A few items may have transitional or special treatment — check the HSN-specific rate." },
        { q: "Which rate applies to my product?", a: "It depends on the HSN or SAC code. Our GST applicability evaluation confirms the correct rate and registration requirement for your business." },
      ]}
    >
      <GstCalculator />
    </ToolPage>
  );
}
