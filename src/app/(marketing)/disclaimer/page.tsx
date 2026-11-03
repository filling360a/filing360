import Link from "next/link";
import { LegalDocument } from "@/components/site/LegalDocument";
import { legalEntity } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Disclaimer — Private Facilitation Platform Notice",
  description:
    "Filing360 is a private facilitation platform, not a government website or law firm. Read about information accuracy, outcomes and professional services.",
  path: "/disclaimer",
  absoluteTitle: true,
});

export default function DisclaimerPage() {
  return (
    <LegalDocument
      path="/disclaimer"
      intro="Please read this disclaimer before using our website or services."
      sections={[
        {
          id: "not-government",
          title: "Not a government website",
          body: (
            <p>
              filingedge360.com is owned and operated by {legalEntity()}, a private organisation. It is <strong>not</strong> a government website and is
              not affiliated with, endorsed by or acting for the Ministry of Corporate Affairs, GSTN, the Income Tax Department, DPIIT, the Ministry
              of MSME or any other government body. Registrations, licences and certificates are issued only by the relevant authority. You can
              also apply directly on the official government portals, often for the government fee alone.
            </p>
          ),
        },
        {
          id: "not-law-firm",
          title: "Not a law firm or CA firm",
          body: (
            <p>
              Filing360 provides technology-enabled facilitation. Where the law requires a Chartered Accountant, Company Secretary, Cost Accountant
              or Advocate to certify, sign or represent, that work is done by independent, qualified professionals in their own professional
              capacity. Using our website does not create an advocate–client relationship.
            </p>
          ),
        },
        {
          id: "information",
          title: "Information on the website",
          body: (
            <p>
              Guides, calculators, tax rates, due dates and FAQs are prepared carefully and reviewed periodically, but laws, rates and deadlines change
              — often at short notice through notifications and extensions. They are general information, not advice for your situation. Please
              confirm with an expert or the official source before acting. Calculator results are estimates.
            </p>
          ),
        },
        {
          id: "outcomes",
          title: "No guarantee of outcomes",
          body: (
            <p>
              We do not guarantee approval of any name, application or registration, any particular refund amount, or completion within a specific
              time, because these depend on the authority and on the information you provide. Timelines shown are typical, not promised. See our{" "}
              <Link href="/service-delivery-policy">Service Delivery Policy</Link>.
            </p>
          ),
        },
        {
          id: "reviews",
          title: "Reviews and results",
          body: (
            <p>
              Reviews and case examples describe individual experiences. Your results depend on your facts and documents and may differ. Figures such
              as savings or refunds are illustrative.
            </p>
          ),
        },
        {
          id: "third-party",
          title: "Third-party names and links",
          body: (
            <p>
              Names and logos of government bodies, banks and other organisations are used only to identify them and belong to their owners. Links to
              external websites are provided for convenience; we are not responsible for their content or availability.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Liability",
          body: (
            <p>
              Our liability for services is set out in our <Link href="/terms">Terms of Use</Link>. We are not liable for decisions you take based only
              on general information published on the website.
            </p>
          ),
        },
      ]}
    />
  );
}
