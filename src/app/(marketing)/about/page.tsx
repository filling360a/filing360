import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.brandName} — a design-led legal facilitation marketplace for India.`,
};

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <h1 className="font-display text-4xl tracking-tight text-ink md:text-5xl">
          About {siteConfig.brandName}
        </h1>
        <div className="prose-brand mt-8 max-w-2xl">
          <p>
            {siteConfig.brandName} is building the incorporation and compliance
            marketplace India deserves: full catalog breadth with the calm of a
            product company — not a lead farm.
          </p>
          <p>
            We facilitate documentation and filings through qualified
            professionals. Approvals come from MCA, GSTN, trademark offices, and
            other authorities — never from us.
          </p>
          <p>
            From first registration to ongoing compliance, {siteConfig.brandName}{" "}
            keeps fees transparent and specialists accountable.
          </p>
        </div>

        <div className="mt-12 border border-line bg-paper-deep/40 p-6 md:p-8">
          <h2 className="font-display text-2xl text-ink">Talk to an expert</h2>
          <p className="mt-2 text-sm text-ink-muted">
            UI phase — wire this to your CRM later. For now, reach us at{" "}
            <a
              className="font-medium text-seal hover:text-seal-deep"
              href={`mailto:${siteConfig.contact.email}`}
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
          <div className="mt-6">
            <Button href={`mailto:${siteConfig.contact.email}`}>
              Email {siteConfig.brandName}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
