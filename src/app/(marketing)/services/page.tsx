import { ServicesHub } from "@/components/services/ServicesHub";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "All Services — Company Registration, GST, ITR & MCA",
  description:
    "Browse Filing360 services with transparent fees: company registration, GST returns, ITR filing, MCA compliance, accounting and fundraising support across India.",
  path: "/services",
  absoluteTitle: true,
  keywords: [
    "company registration services",
    "GST filing services",
    "ITR filing online",
    "MCA compliance",
    "Filing360 services",
  ],
});

export default function ServicesHubPage() {
  return <ServicesHub />;
}
