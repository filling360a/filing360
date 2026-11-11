import "server-only";
import { cache } from "react";
import type { BannerArt } from "@/content/pageBanners";
import { bannerForPath } from "@/content/pageBanners";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import {
  HOME_HERO_SLOTS,
  type BannerOverridesMap,
  type BannerSlot,
  type ResolvedBanner,
} from "./defaults";
import { buildPageBannerSlots } from "./page-slots";

export const BANNER_OVERRIDES_PATH = "site/banners.json";
const BUCKET = "blog-media";

let cachedSlots: BannerSlot[] | null = null;

/** All banner slots (home + every page with a hero banner). */
export function getBannerSlots(): BannerSlot[] {
  if (!cachedSlots) {
    cachedSlots = [...HOME_HERO_SLOTS, ...buildPageBannerSlots()];
  }
  return cachedSlots;
}

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

/** Older keys used before path-based keys (`page:income-tax/slug`). */
function legacyOverrideKeys(slot: BannerSlot): string[] {
  const keys: string[] = [];
  const service = slot.pagePath.match(/^\/services\/([^/]+\/[^/]+)$/);
  if (service) keys.push(`page:${service[1]}`);
  return keys;
}

function overrideFor(slot: BannerSlot, overrides: BannerOverridesMap) {
  if (overrides[slot.key]) return overrides[slot.key];
  for (const key of legacyOverrideKeys(slot)) {
    if (overrides[key]) return overrides[key];
  }
  return {};
}

export function resolveSlot(slot: BannerSlot, overrides: BannerOverridesMap): ResolvedBanner {
  const o = overrideFor(slot, overrides);
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
  return getBannerSlots()
    .filter((s) => !group || s.group === group)
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

function normalizePath(path: string) {
  if (!path.startsWith("/")) return `/${path}`;
  return path.replace(/\/+$/, "") || "/";
}

/**
 * Resolves the banner art for any marketing path, applying admin overrides.
 * Exact page match first; then longest prefix slot (e.g. /guides covers /guides/foo).
 */
export async function resolveBannerArt(path: string): Promise<BannerArt> {
  const normalized = normalizePath(path);
  const overrides = await getBannerOverrides();
  const pageSlots = getBannerSlots().filter((s) => s.group === "page");

  const exact = pageSlots.find((s) => s.pagePath === normalized);
  if (exact) {
    const resolved = resolveSlot(exact, overrides);
    return {
      src: resolved.src,
      align: resolved.align,
      object: resolved.object,
      layout: resolved.layout === "campaign" ? "campaign" : undefined,
    };
  }

  const prefixes = pageSlots
    .filter((s) => s.pagePath !== "/" && (normalized === s.pagePath || normalized.startsWith(`${s.pagePath}/`)))
    .sort((a, b) => b.pagePath.length - a.pagePath.length);
  if (prefixes[0]) {
    const resolved = resolveSlot(prefixes[0], overrides);
    return {
      src: resolved.src,
      align: resolved.align,
      object: resolved.object,
      layout: resolved.layout === "campaign" ? "campaign" : undefined,
    };
  }

  return bannerForPath(normalized);
}

/** @deprecated prefer resolveBannerArt with full path */
export async function getPageBannerOverride(serviceKey: string) {
  const path = serviceKey.startsWith("/") ? serviceKey : `/services/${serviceKey}`;
  const art = await resolveBannerArt(path);
  const slot = getBannerSlots().find((s) => s.pagePath === normalizePath(path));
  if (!slot) {
    return {
      ...art,
      key: `page:${path}`,
      group: "page" as const,
      label: path,
      pagePath: path,
      defaultSrc: art.src,
      layout: (art.layout ?? "split") as "split" | "campaign",
      sizeHint: "",
      ratioHint: "",
      sortOrder: 0,
      isCustomImage: false,
    };
  }
  return resolveSlot(slot, await getBannerOverrides());
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
