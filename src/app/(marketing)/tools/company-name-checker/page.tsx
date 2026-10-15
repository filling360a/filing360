import { NameChecker } from "@/components/tools/NameChecker";
import { ToolPage } from "@/components/tools/ToolPage";
import { getTool, toolHref } from "@/content/tools";
import { pageMetadata } from "@/lib/seo";

const tool = getTool("company-name-checker");
export const metadata = pageMetadata({
  title: tool.title,
  description: tool.description,
  path: toolHref(tool),
  keywords: ["company name checker", "company name availability", "LLP name check", "MCA name rules"],
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro={<p>Most name rejections are avoidable. Test your proposed name against the MCA&apos;s naming rules before you apply.</p>}
      about={
        <>
          <h2>Company naming rules in brief</h2>
          <ul>
            <li>The name must not be identical or too similar to an existing company, LLP or registered trademark.</li>
            <li>Private companies end with “Private Limited”, OPCs with “(OPC) Private Limited” and LLPs with “LLP”.</li>
            <li>Words like Bank, Insurance, Mutual Fund, National or Board need regulator or government approval.</li>
            <li>Plurals, spelling changes, added punctuation or a change of tense don&apos;t make a name different.</li>
            <li>Purely generic names made only of words like “Solutions” or “Services” aren&apos;t distinctive enough.</li>
          </ul>
          <h2>Tips for approval first time</h2>
          <ul>
            <li>Combine a unique coined word with a word describing your activity — e.g. “Zorvex Logistics”.</li>
            <li>Make sure the activity word matches the main object in your MoA.</li>
            <li>Check trademarks too: a name that conflicts with a registered mark can be challenged later.</li>
          </ul>
        </>
      }
      faqs={[
        { q: "How many names can I propose?", a: "SPICe+ Part A lets you propose up to two names in one application, and you get one resubmission if both are rejected." },
        { q: "How long is a reserved name valid?", a: "A name approved through SPICe+ Part A is reserved for 20 days, within which you must file for incorporation." },
      ]}
    >
      <NameChecker />
    </ToolPage>
  );
}
