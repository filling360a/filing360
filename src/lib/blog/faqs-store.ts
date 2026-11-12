import "server-only";
import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import { extractFaqs } from "@/lib/blog/structured-data";
import { normalizeFaqs, type BlogFaq } from "./faqs";

const BUCKET = "blog-media";

/** Legacy storage path used before FAQs moved onto `blog_posts.faqs`. */
export function faqsStoragePath(postId: string) {
  return `site/post-faqs/${postId}.json`;
}

function isMissingFaqsColumn(message: string) {
  return /column .*faqs.* does not exist|Could not find the 'faqs' column/i.test(message);
}

async function readLegacyStorageFaqs(postId: string): Promise<BlogFaq[]> {
  const db = createPublicClient();
  if (!db) return [];
  const path = faqsStoragePath(postId);
  const base = db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  try {
    const res = await fetch(`${base}?t=${Math.floor(Date.now() / 60_000)}`, {
      next: { revalidate: 60, tags: [`post-faqs:${postId}`] },
    });
    if (!res.ok) return [];
    return normalizeFaqs(await res.json());
  } catch {
    return [];
  }
}

async function writeStorageFaqs(postId: string, faqs: BlogFaq[]) {
  const db = await createClient();
  const cleaned = normalizeFaqs(faqs);
  const path = faqsStoragePath(postId);
  if (!cleaned.length) {
    await db.storage.from(BUCKET).remove([path]);
    return;
  }
  // Prefer a Buffer — some runtimes mishandle Blob MIME against bucket allowlists.
  const body = Buffer.from(JSON.stringify(cleaned, null, 2), "utf8");
  const { error } = await db.storage.from(BUCKET).upload(path, body, {
    contentType: "application/json",
    upsert: true,
    cacheControl: "60",
  });
  if (error) throw new Error(error.message);
}

/**
 * Loads structured FAQs for a post.
 * Prefer the `blog_posts.faqs` column; fall back to legacy storage JSON, then HTML extraction.
 */
export const getPostFaqs = cache(async (postId: string, contentHtml?: string): Promise<BlogFaq[]> => {
  const publicDb = createPublicClient();
  if (publicDb) {
    const { data, error } = await publicDb.from("blog_posts").select("faqs, content_html").eq("id", postId).maybeSingle();
    if (!error) {
      const fromColumn = normalizeFaqs(data?.faqs);
      if (fromColumn.length) return fromColumn;
    }

    const legacy = await readLegacyStorageFaqs(postId);
    if (legacy.length) return legacy;

    const html = contentHtml ?? data?.content_html;
    if (html) return extractFaqs(html).map((f) => ({ q: f.question, a: f.answer }));
    return [];
  }

  try {
    const db = await createClient();
    const { data, error } = await db.from("blog_posts").select("faqs, content_html").eq("id", postId).maybeSingle();
    if (!error) {
      const fromColumn = normalizeFaqs(data?.faqs);
      if (fromColumn.length) return fromColumn;
    }
    const html = contentHtml ?? data?.content_html;
    if (html) return extractFaqs(html).map((f) => ({ q: f.question, a: f.answer }));
  } catch {
    /* fall through */
  }

  const legacy = await readLegacyStorageFaqs(postId);
  if (legacy.length) return legacy;

  if (contentHtml) {
    return extractFaqs(contentHtml).map((f) => ({ q: f.question, a: f.answer }));
  }
  return [];
});

/**
 * Persists FAQs on `blog_posts.faqs` when the column exists.
 * Falls back to `blog-media` JSON storage if the migration has not been applied yet.
 */
export async function writePostFaqs(postId: string, faqs: BlogFaq[]) {
  const db = await createClient();
  const cleaned = normalizeFaqs(faqs);
  const { error } = await db.from("blog_posts").update({ faqs: cleaned }).eq("id", postId);
  if (!error) return;
  if (!isMissingFaqsColumn(error.message)) throw new Error(error.message);
  await writeStorageFaqs(postId, cleaned);
}
