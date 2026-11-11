import "server-only";
import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import { extractFaqs } from "@/lib/blog/structured-data";
import { normalizeFaqs, type BlogFaq } from "./faqs";

const BUCKET = "blog-media";

export function faqsStoragePath(postId: string) {
  return `site/post-faqs/${postId}.json`;
}

function publicUrl(path: string) {
  const db = createPublicClient();
  if (!db) return null;
  return db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Loads structured FAQs for a post. Falls back to extracting from HTML when empty. */
export const getPostFaqs = cache(async (postId: string, contentHtml?: string): Promise<BlogFaq[]> => {
  const base = publicUrl(faqsStoragePath(postId));
  if (base) {
    try {
      const res = await fetch(`${base}?t=${Math.floor(Date.now() / 60_000)}`, {
        next: { revalidate: 60, tags: [`post-faqs:${postId}`] },
      });
      if (res.ok) {
        const data = normalizeFaqs(await res.json());
        if (data.length) return data;
      }
    } catch {
      /* fall through */
    }
  }

  if (contentHtml) {
    return extractFaqs(contentHtml).map((f) => ({ q: f.question, a: f.answer }));
  }
  return [];
});

export async function writePostFaqs(postId: string, faqs: BlogFaq[]) {
  const db = await createClient();
  const cleaned = normalizeFaqs(faqs);
  const path = faqsStoragePath(postId);
  if (!cleaned.length) {
    await db.storage.from(BUCKET).remove([path]);
    return;
  }
  const blob = new Blob([JSON.stringify(cleaned, null, 2)], { type: "application/json" });
  const { error } = await db.storage.from(BUCKET).upload(path, blob, {
    contentType: "application/json",
    upsert: true,
    cacheControl: "60",
  });
  if (error) throw new Error(error.message);
}
