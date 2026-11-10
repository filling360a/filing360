import { getGstServicePage } from "./gstServicePages";
import type { SeoServicePage } from "./seoTypes";

type Lookup = (slug: string) => SeoServicePage | undefined;

const lookups: Record<string, Lookup> = {
  gst: getGstServicePage,
};

export function registerSeoLookup(pillar: string, lookup: Lookup) {
  lookups[pillar] = lookup;
}

export function getSeoServicePage(pillar: string, slug: string): SeoServicePage | undefined {
  return lookups[pillar]?.(slug);
}

export function hasSeoHub(pillar: string): boolean {
  return (
    pillar in lookups ||
    ["gst", "income-tax", "mca", "accounting", "funds", "startup", "other-services"].includes(pillar)
  );
}
