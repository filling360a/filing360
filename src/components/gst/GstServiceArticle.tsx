import { SeoArticle } from "@/components/services/seo/SeoArticle";
import { SeoFaqs } from "@/components/services/seo/SeoFaqs";
import type { GstServicePage } from "@/content/gstServicePages";

export function GstServiceArticle({ page }: { page: GstServicePage }) {
  return <SeoArticle sections={page.sections} related={page.related} />;
}

export function GstServiceFaqs({ page }: { page: GstServicePage }) {
  return (
    <SeoFaqs
      faqs={page.faqs}
      updatedSuffix={page.updated ? `· Updated ${page.updated}` : "· Updated 2 November 2026"}
    />
  );
}
