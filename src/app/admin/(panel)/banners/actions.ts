"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { assertStaff, AuthError } from "@/lib/auth/dal";
import { type BannerAlign, type BannerOverridesMap } from "@/lib/banners/defaults";
import { getBannerOverrides, getBannerSlots, writeBannerOverrides } from "@/lib/banners/store";

export type BannerActionState = { ok?: boolean; error?: string; message?: string } | undefined;

function fail(err: unknown): BannerActionState {
  if (err instanceof AuthError) return { error: err.message };
  console.error("[admin/banners]", err);
  return { error: "Something went wrong. Please try again." };
}

const saveSchema = z.object({
  key: z.string().min(1),
  imageUrl: z.union([z.literal(""), z.url().max(1000)]).transform((v) => v || null),
  align: z.enum(["left", "right"]),
  object: z.string().trim().max(80).optional(),
  title: z.string().trim().max(120).optional(),
  accent: z.string().trim().max(120).optional(),
  body: z.string().trim().max(400).optional(),
  lightNav: z.coerce.boolean().optional(),
  resetImage: z.coerce.boolean().optional(),
});

function revalidateBannerPages(key: string) {
  revalidateTag("site-banners", "max");
  revalidatePath("/");
  const slot = getBannerSlots().find((s) => s.key === key);
  if (slot?.pagePath && slot.pagePath !== "/") {
    revalidatePath(slot.pagePath);
    // Child pages that inherit a prefix slot (guides, cities, industries…)
    if (["/guides", "/for", "/documents", "/company-registration-in"].includes(slot.pagePath)) {
      revalidatePath(slot.pagePath, "layout");
    }
  }
  revalidatePath("/admin/banners");
}

export async function saveBannerSlot(_: BannerActionState, formData: FormData): Promise<BannerActionState> {
  try {
    await assertStaff("banners");
    const parsed = saveSchema.safeParse({
      key: formData.get("key"),
      imageUrl: formData.get("imageUrl") ?? "",
      align: formData.get("align") ?? "left",
      object: formData.get("object") ?? "",
      title: formData.get("title") ?? "",
      accent: formData.get("accent") ?? "",
      body: formData.get("body") ?? "",
      lightNav: formData.get("lightNav") === "on" || formData.get("lightNav") === "true",
      resetImage: formData.get("resetImage") === "1",
    });
    if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

    const slot = getBannerSlots().find((s) => s.key === parsed.data.key);
    if (!slot) return { error: "Unknown banner slot" };

    const current = await getBannerOverrides();
    const next: BannerOverridesMap = { ...current };
    const prev = next[slot.key] ?? {};

    const imageUrl = parsed.data.resetImage ? null : parsed.data.imageUrl ?? prev.imageUrl ?? null;

    const isHome = slot.group === "home_hero";
    next[slot.key] = {
      imageUrl,
      align: parsed.data.align as BannerAlign,
      object: parsed.data.object || slot.object,
      title: isHome ? parsed.data.title || slot.title || null : prev.title ?? null,
      accent: isHome ? parsed.data.accent || slot.accent || null : prev.accent ?? null,
      body: isHome ? parsed.data.body || slot.body || null : prev.body ?? null,
      lightNav: isHome ? Boolean(parsed.data.lightNav) : prev.lightNav,
      updatedAt: new Date().toISOString(),
    };

    // Avoid empty override objects for untouched defaults
    const o = next[slot.key];
    const unchangedImage = !o.imageUrl;
    const unchangedCopy =
      !isHome ||
      ((o.title ?? null) === (slot.title ?? null) &&
        (o.accent ?? null) === (slot.accent ?? null) &&
        (o.body ?? null) === (slot.body ?? null) &&
        Boolean(o.lightNav) === Boolean(slot.lightNav));
    const unchangedAlign = o.align === slot.align && (o.object || slot.object) === slot.object;
    if (unchangedImage && unchangedCopy && unchangedAlign) {
      delete next[slot.key];
    }

    // Drop legacy short keys when saving the new path-based key
    for (const legacy of [`page:${slot.pagePath.replace(/^\/services\//, "")}`]) {
      if (legacy !== slot.key) delete next[legacy];
    }

    await writeBannerOverrides(next);
    revalidateBannerPages(slot.key);
    return { ok: true, message: parsed.data.resetImage ? "Image reset to default" : "Banner saved" };
  } catch (err) {
    return fail(err);
  }
}
