import { JsonLd } from "@/components/blog/JsonLd";
import { Footer } from "@/components/chrome/Footer";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Header, TopBar } from "@/components/chrome/Header";
import { FloatingContactButtons } from "@/components/chrome/FloatingContactButtons";
import { StickyLeadBar } from "@/components/chrome/StickyLeadBar";
import { AttributionCapture } from "@/components/leads/AttributionCapture";
import { WelcomeLeadPopup } from "@/components/leads/WelcomeLeadPopup";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-seal focus:px-4 focus:py-2 focus:text-[15px] focus:text-paper"
      >
        Skip to content
      </a>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <TopBar />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <StickyLeadBar />
      <FloatingContactButtons />
      <WelcomeLeadPopup />
      <AttributionCapture />
    </>
  );
}
