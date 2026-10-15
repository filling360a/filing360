import { StructureChooser } from "@/components/tools/StructureChooser";
import { ToolPage } from "@/components/tools/ToolPage";
import { getTool, toolHref } from "@/content/tools";
import { pageMetadata } from "@/lib/seo";

const tool = getTool("business-structure-chooser");
export const metadata = pageMetadata({
  title: tool.title,
  description: tool.description,
  path: toolHref(tool),
  keywords: ["which business structure", "Pvt Ltd vs LLP vs OPC", "best business structure India"],
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro={<p>Private Limited, LLP, OPC, partnership or proprietorship? Answer five questions about your plans and we&apos;ll suggest the best fit.</p>}
      faqs={[
        { q: "Can I change my structure later?", a: "Yes. Partnerships can convert to LLPs, LLPs and OPCs can convert to private limited companies, and a proprietorship's business can be transferred to a company. It's easier to choose well at the start." },
        { q: "Which structure is cheapest to run?", a: "A proprietorship, followed by a partnership and an LLP below the audit thresholds. Companies have the most annual compliance." },
      ]}
    >
      <StructureChooser />
    </ToolPage>
  );
}
