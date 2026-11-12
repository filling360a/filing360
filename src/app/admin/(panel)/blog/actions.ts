"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { assertStaff, AuthError } from "@/lib/auth/dal";
import { normalizeFaqs } from "@/lib/blog/faqs";
import { writePostFaqs } from "@/lib/blog/faqs-store";
import { postStats, sanitizePostHtml } from "@/lib/blog/html";
import { SLUG_PATTERN, slugify } from "@/lib/slug";
import { createClient } from "@/lib/supabase/server";
import type { PostStatus } from "@/lib/supabase/database.types";

export type BlogActionState = {
  ok?: boolean;
  error?: string;
  message?: string;
  status?: PostStatus;
  publishedAt?: string | null;
  category?: { id: string; name: string; slug: string };
} | undefined;

function fail(err: unknown): BlogActionState {
  if (err instanceof AuthError) return { error: err.message };
  console.error("[admin/blog]", err);
  if (err instanceof Error && err.message.trim()) return { error: err.message };
  return { error: "Something went wrong. Please try again." };
}

function revalidatePublicBlog(slugs: (string | null | undefined)[] = []) {
  revalidatePath("/");
  revalidatePath("/blog", "layout");
  for (const slug of slugs) if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/blog/rss.xml");
  revalidatePath("/sitemap.xml");
}

// Path segments used by blog routes; a post with these slugs would be unreachable.
const RESERVED_SLUGS = new Set(["page", "category", "rss", "feed"]);

async function uniqueSlug(db: Awaited<ReturnType<typeof createClient>>, base: string, excludeId?: string) {
  const root = base && !RESERVED_SLUGS.has(base) ? base : `${base || "untitled"}-post`;
  for (let i = 0; i < 50; i++) {
    const candidate = i ? `${root}-${i + 1}` : root;
    let q = db.from("blog_posts").select("id").eq("slug", candidate).limit(1);
    if (excludeId) q = q.neq("id", excludeId);
    const { data } = await q;
    if (!data?.length) return candidate;
  }
  return `${root}-${Date.now()}`;
}

const createSchema = z.object({
  title: z.string().trim().min(3, "Give the post a working title").max(200),
  category_id: z.union([z.uuid(), z.literal("")]).transform((v) => v || null),
});

export async function createPost(_: BlogActionState, formData: FormData): Promise<BlogActionState> {
  let postId: string;
  try {
    const staff = await assertStaff("blog");
    const parsed = createSchema.safeParse({ title: formData.get("title"), category_id: formData.get("category_id") ?? "" });
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };

    const db = await createClient();
    const slug = await uniqueSlug(db, slugify(parsed.data.title));
    const { data, error } = await db
      .from("blog_posts")
      .insert({
        title: parsed.data.title,
        slug,
        category_id: parsed.data.category_id,
        author_id: staff.id,
        created_by: staff.id,
        updated_by: staff.id,
      })
      .select("id")
      .single();
    if (error || !data) return { error: error?.message ?? "Could not create the post" };
    postId = data.id;
  } catch (err) {
    return fail(err);
  }
  redirect(`/admin/blog/${postId}`);
}

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => v || null);

const postSchema = z.object({
  title: z.string().trim().min(3, "Title is too short").max(200),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .max(100)
    .regex(SLUG_PATTERN, "URL slug can only contain lowercase letters, numbers and hyphens"),
  excerpt: optionalText(320),
  content_html: z.string().max(400_000, "The post is too long"),
  cover_image_url: z.union([z.literal(""), z.url().max(1000)]).transform((v) => v || null),
  cover_image_alt: optionalText(200),
  category_id: z.union([z.uuid(), z.literal("")]).transform((v) => v || null),
  author_id: z.union([z.uuid(), z.literal("")]).transform((v) => v || null),
  tags: z
    .array(z.string().trim().toLowerCase().max(40))
    .max(15)
    .transform((tags) => [...new Set(tags.filter(Boolean))]),
  seo_title: optionalText(120),
  seo_description: optionalText(320),
  focus_keyword: optionalText(80),
  canonical_url: z.union([z.literal(""), z.url().max(500)]).transform((v) => v || null),
  noindex: z.boolean(),
  scheduled_for: z.string().nullable(),
  faqs: z
    .array(
      z.object({
        q: z.string().trim().max(300),
        a: z.string().trim().max(2000),
      }),
    )
    .max(30)
    .optional(),
});

export type PostInput = z.input<typeof postSchema>;
export type SaveIntent = "save" | "publish" | "schedule" | "unpublish" | "archive";

export async function savePost(postId: string, input: PostInput, intent: SaveIntent): Promise<BlogActionState> {
  try {
    const staff = await assertStaff("blog");
    if (!z.uuid().safeParse(postId).success) return { error: "Invalid post" };
    const parsed = postSchema.safeParse(input);
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };
    const { scheduled_for, faqs, ...values } = parsed.data;
    if (RESERVED_SLUGS.has(values.slug)) return { error: `"${values.slug}" is reserved — choose a different URL` };

    const db = await createClient();
    const { data: current } = await db.from("blog_posts").select("slug, status, published_at").eq("id", postId).single();
    if (!current) return { error: "Post not found" };

    const { data: clash } = await db.from("blog_posts").select("id").eq("slug", values.slug).neq("id", postId).limit(1);
    if (clash?.length) return { error: `Another post already uses the URL /blog/${values.slug}` };

    const content_html = sanitizePostHtml(values.content_html);
    const { wordCount, readingMinutes } = postStats(content_html);
    const cleanedFaqs = faqs !== undefined ? normalizeFaqs(faqs) : undefined;

    let status: PostStatus = current.status;
    let published_at = current.published_at;
    const now = new Date();

    switch (intent) {
      case "publish":
        status = "published";
        // Keep the original date when updating an already-live post.
        published_at = current.status === "published" && published_at ? published_at : now.toISOString();
        break;
      case "schedule": {
        const when = scheduled_for ? new Date(scheduled_for) : null;
        if (!when || Number.isNaN(when.getTime())) return { error: "Pick a date and time to schedule" };
        if (when <= now) return { error: "Schedule time must be in the future" };
        status = "scheduled";
        published_at = when.toISOString();
        break;
      }
      case "unpublish":
        status = "draft";
        break;
      case "archive":
        status = "archived";
        break;
    }

    if ((status === "published" || status === "scheduled") && content_html.length < 50) {
      return { error: "Add some content before publishing" };
    }

    // Keep FAQs out of this update so missing `faqs` column (migration not applied)
    // cannot block publishing. Persist them separately with DB→storage fallback.
    const { error } = await db
      .from("blog_posts")
      .update({
        ...values,
        content_html,
        word_count: wordCount,
        reading_minutes: readingMinutes,
        status,
        published_at,
        updated_by: staff.id,
      })
      .eq("id", postId);
    if (error) return { error: error.message };

    if (cleanedFaqs !== undefined) {
      try {
        await writePostFaqs(postId, cleanedFaqs);
        revalidateTag(`post-faqs:${postId}`, "max");
      } catch (faqErr) {
        const message = faqErr instanceof Error ? faqErr.message : "Could not save FAQs";
        return {
          error: `Post saved, but FAQs failed: ${message}. Allow application/json on the blog-media bucket, or run the faqs column migration.`,
        };
      }
    }

    const wasLive = current.status === "published" || current.status === "scheduled";
    const isLive = status === "published" || status === "scheduled";
    if (wasLive || isLive) revalidatePublicBlog([current.slug, values.slug]);
    revalidatePath("/admin/blog");

    const messages: Record<SaveIntent, string> = {
      save: "Saved",
      publish: "Published",
      schedule: `Scheduled for ${new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }).format(new Date(published_at!))}`,
      unpublish: "Moved back to drafts",
      archive: "Archived",
    };
    return { ok: true, message: messages[intent], status, publishedAt: published_at };
  } catch (err) {
    return fail(err);
  }
}

export async function deletePost(postId: string): Promise<BlogActionState> {
  try {
    await assertStaff("team");
    const db = await createClient();
    const { data: post } = await db.from("blog_posts").select("slug").eq("id", postId).single();
    const { error } = await db.from("blog_posts").delete().eq("id", postId);
    if (error) return { error: error.message };
    revalidateTag(`post-faqs:${postId}`, "max");
    revalidatePublicBlog([post?.slug]);
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function restoreRevision(postId: string, revisionId: string): Promise<BlogActionState> {
  try {
    const staff = await assertStaff("blog");
    const db = await createClient();
    const { data: rev } = await db
      .from("blog_post_revisions")
      .select("title, excerpt, content_html")
      .eq("id", revisionId)
      .eq("post_id", postId)
      .single();
    if (!rev) return { error: "Revision not found" };
    const { wordCount, readingMinutes } = postStats(rev.content_html);
    const { data: post, error } = await db
      .from("blog_posts")
      .update({ ...rev, word_count: wordCount, reading_minutes: readingMinutes, updated_by: staff.id })
      .eq("id", postId)
      .select("slug, status")
      .single();
    if (error) return { error: error.message };
    if (post.status === "published" || post.status === "scheduled") revalidatePublicBlog([post.slug]);
    revalidatePath(`/admin/blog/${postId}`);
    return { ok: true, message: "Revision restored" };
  } catch (err) {
    return fail(err);
  }
}

const categorySchema = z.object({
  name: z.string().trim().min(2, "Enter a name").max(60),
  slug: z.string().trim().toLowerCase().max(60).optional(),
  description: optionalText(300),
  sort_order: z.coerce.number().int().min(0).max(1000).default(0),
});

export async function saveCategory(categoryId: string | null, _: BlogActionState, formData: FormData): Promise<BlogActionState> {
  try {
    await assertStaff("blog");
    const parsed = categorySchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };
    const slug = slugify(parsed.data.slug || parsed.data.name, 60);
    if (!SLUG_PATTERN.test(slug)) return { error: "Invalid slug" };

    const db = await createClient();
    const values = { name: parsed.data.name, description: parsed.data.description, sort_order: parsed.data.sort_order, slug };
    if (categoryId) {
      const { error } = await db.from("blog_categories").update(values).eq("id", categoryId);
      if (error) return { error: error.code === "23505" ? "A category with that URL already exists" : error.message };
      revalidatePublicBlog();
      revalidatePath("/admin/blog/categories");
      revalidatePath("/admin/blog");
      return { ok: true, message: "Category updated", category: { id: categoryId, name: values.name, slug } };
    }

    const { data, error } = await db.from("blog_categories").insert(values).select("id, name, slug").single();
    if (error || !data) return { error: error?.code === "23505" ? "A category with that URL already exists" : error?.message ?? "Could not create category" };

    revalidatePublicBlog();
    revalidatePath("/admin/blog/categories");
    revalidatePath("/admin/blog");
    return { ok: true, message: "Category added", category: data };
  } catch (err) {
    return fail(err);
  }
}

/** Create a category from the post editor / new-post form without leaving the page. */
export async function createCategoryQuick(name: string): Promise<BlogActionState> {
  const form = new FormData();
  form.set("name", name);
  form.set("sort_order", "100");
  return saveCategory(null, undefined, form);
}

export async function deleteCategory(categoryId: string): Promise<BlogActionState> {
  try {
    await assertStaff("blog");
    const db = await createClient();
    const { error } = await db.from("blog_categories").delete().eq("id", categoryId);
    if (error) return { error: error.message };
    revalidatePublicBlog();
    revalidatePath("/admin/blog/categories");
    return { ok: true, message: "Category deleted" };
  } catch (err) {
    return fail(err);
  }
}
