import "server-only";
import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import {
  BANNER_SLOTS,
  type BannerOverridesMap,
  type BannerSlot,
  type ResolvedBanner,
} from "./defaults";

export const BANNER_OVERRIDES_PATH = "site/banners.json";
const BUCKET = "blog-media";

function publicUrl(path: string) {
  const db = createPublicClient();
  if (!db) return null;
  return db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export const getBannerOverrides = cache(async (): Promise<BannerOverridesMap> => {
  const base = publicUrl(BANNER_OVERRIDES_PATH);
  if (!base) return {};
  try {
    const res = await fetch(`${base}?t=${Math.floor(Date.now() / 60_000)}`, {
      next: { revalidate: 60, tags: ["site-banners"] },
    });
    if (!res.ok) return {};
    const data = (await res.json()) as BannerOverridesMap;
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
});

export function resolveSlot(slot: BannerSlot, overrides: BannerOverridesMap): ResolvedBanner {
  const o = overrides[slot.key] ?? {};
  const src = o.imageUrl?.trim() || slot.defaultSrc;
  return {
    ...slot,
    src,
    align: o.align ?? slot.align,
    object: o.object?.trim() || slot.object,
    title: o.title ?? slot.title,
    accent: o.accent ?? slot.accent,
    body: o.body ?? slot.body,
    lightNav: o.lightNav ?? slot.lightNav,
    isCustomImage: Boolean(o.imageUrl?.trim()),
  };
}

export async function listResolvedBanners(group?: BannerSlot["group"]): Promise<ResolvedBanner[]> {
  const overrides = await getBannerOverrides();
  return BANNER_SLOTS.filter((s) => !group || s.group === group)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((s) => resolveSlot(s, overrides));
}

export async function getHomeHeroSlides() {
  const slides = await listResolvedBanners("home_hero");
  return slides.map((s) => ({
    src: s.src,
    align: s.align,
    object: s.object,
    title: s.title ?? "",
    accent: s.accent ?? "",
    body: s.body ?? "",
    lightNav: s.lightNav,
  }));
}

export async function getPageBannerOverride(serviceKey: string) {
  const overrides = await getBannerOverrides();
  const slot = BANNER_SLOTS.find((s) => s.key === `page:${serviceKey}`);
  if (!slot) return null;
  return resolveSlot(slot, overrides);
}

export async function writeBannerOverrides(next: BannerOverridesMap) {
  const db = await createClient();
  const blob = new Blob([JSON.stringify(next, null, 2)], { type: "application/json" });
  const { error } = await db.storage.from(BUCKET).upload(BANNER_OVERRIDES_PATH, blob, {
    contentType: "application/json",
    upsert: true,
    cacheControl: "60",
  });
  if (error) throw new Error(error.message);
}
