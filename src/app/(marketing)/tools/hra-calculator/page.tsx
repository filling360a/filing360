import { HraCalculator } from "@/components/tools/HraCalculator";
import { ToolPage } from "@/components/tools/ToolPage";
import { getTool, toolHref } from "@/content/tools";
import { pageMetadata } from "@/lib/seo";

const tool = getTool("hra-calculator");
export const metadata = pageMetadata({
  title: tool.title,
  description: tool.description,
  path: toolHref(tool),
  keywords: ["HRA calculator", "HRA exemption calculator", "house rent allowance exemption"],
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro={<p>Find out how much of your house rent allowance is exempt from tax, and how much is added to your taxable salary.</p>}
      about={
        <>
          <h2>How HRA exemption is calculated</h2>
          <p>The exempt amount is the lowest of three figures:</p>
          <ul>
            <li>the HRA actually received from your employer;</li>
            <li>rent paid minus 10% of your basic salary plus dearness allowance;</li>
            <li>50% of basic + DA if you live in Delhi, Mumbai, Kolkata or Chennai, or 40% elsewhere.</li>
          </ul>
          <p>
            HRA exemption is only available under the old tax regime. If you don&apos;t receive HRA but pay rent, you may be able to claim a
            separate deduction for rent paid, subject to conditions.
          </p>
        </>
      }
      faqs={[
        { q: "Can I claim HRA if I pay rent to my parents?", a: "Yes, if you genuinely pay rent, have a rent agreement and the parent declares it as income. Paying rent to a spouse is generally not accepted." },
        { q: "Do I need my landlord's PAN?", a: "Yes, if the rent you pay exceeds ₹1 lakh in a year." },
        { q: "Can I claim both HRA and home-loan interest?", a: "Yes, in genuine cases — for example, if your own house is in another city or you live in rented accommodation for valid reasons." },
      ]}
    >
      <HraCalculator />
    </ToolPage>
  );
}
