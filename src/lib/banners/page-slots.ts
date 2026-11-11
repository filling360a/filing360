import { bannerForPath, bannerForPillar, bannerForService } from "@/content/pageBanners";
import { pillars } from "@/content/services";
import { BANNER_SPECS, type BannerSlot } from "./defaults";

/** Static / hub pages that use PageHero or InnerHero banners. */
const STATIC_PAGES: { path: string; label: string; section: string }[] = [
  { path: "/services", label: "All services hub", section: "Services" },
  { path: "/about", label: "About", section: "Company" },
  { path: "/team", label: "Team", section: "Company" },
  { path: "/trust", label: "Trust", section: "Company" },
  { path: "/reviews", label: "Reviews", section: "Company" },
  { path: "/contact", label: "Contact", section: "Company" },
  { path: "/book-consultation", label: "Book consultation", section: "Company" },
  { path: "/partners", label: "Partners", section: "Company" },
  { path: "/refer-and-earn", label: "Refer and earn", section: "Company" },
  { path: "/tools", label: "Tools hub", section: "Tools" },
  { path: "/tools/gst-calculator", label: "GST calculator", section: "Tools" },
  { path: "/tools/income-tax-calculator", label: "Income tax calculator", section: "Tools" },
  { path: "/tools/hra-calculator", label: "HRA calculator", section: "Tools" },
  { path: "/tools/tds-rate-chart", label: "TDS rate chart", section: "Tools" },
  { path: "/tools/company-name-checker", label: "Company name checker", section: "Tools" },
  { path: "/tools/business-structure-chooser", label: "Business structure chooser", section: "Tools" },
  { path: "/government-fees", label: "Government fees", section: "Tools" },
  { path: "/compliance-calendar", label: "Compliance calendar", section: "Tools" },
  { path: "/track", label: "Track application", section: "Tools" },
  { path: "/guides", label: "Guides hub (+ guide pages)", section: "Content" },
  { path: "/glossary", label: "Glossary", section: "Content" },
  { path: "/faq", label: "FAQ", section: "Content" },
  { path: "/documents", label: "Documents hub (+ checklists)", section: "Content" },
  { path: "/for", label: "Industries hub (+ industry pages)", section: "Content" },
  { path: "/company-registration-in", label: "Company registration cities", section: "Content" },
];

function slotFromPath(
  path: string,
  label: string,
  section: string,
  sortOrder: number,
  art = bannerForPath(path),
): BannerSlot {
  return {
    key: `page:${path}`,
    group: "page",
    label,
    pagePath: path,
    defaultSrc: art.src,
    align: art.align,
    object: art.object,
    layout: art.layout === "campaign" ? "campaign" : "split",
    sizeHint: BANNER_SPECS.page.sizeHint,
    ratioHint: BANNER_SPECS.page.ratioHint,
    sortOrder,
    section,
  };
}

/** All editable non-home banner slots (services, pillars, marketing pages). */
export function buildPageBannerSlots(): BannerSlot[] {
  const slots: BannerSlot[] = [];
  let order = 100;

  for (const page of STATIC_PAGES) {
    slots.push(slotFromPath(page.path, page.label, page.section, order));
    order += 10;
  }

  for (const pillar of pillars) {
    const pillarPath = `/services/${pillar.slug}`;
    const pillarArt = bannerForPillar(pillar.slug);
    slots.push(
      slotFromPath(pillarPath, `${pillar.name} hub`, pillar.name, order, pillarArt),
    );
    order += 10;

    for (const service of pillar.services) {
      const path = `/services/${pillar.slug}/${service.slug}`;
      const art = bannerForService(pillar.slug, service.slug);
      slots.push(
        slotFromPath(path, service.shortName ?? service.name, pillar.name, order, art),
      );
      order += 10;
    }
  }

  return slots;
}
