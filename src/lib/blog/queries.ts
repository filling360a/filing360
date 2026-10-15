import "server-only";
import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";

export const POSTS_PER_PAGE = 12;

const CARD_SELECT =
  "id, slug, title, excerpt, cover_image_url, cover_image_alt, published_at, updated_at, reading_minutes, category:blog_categories(slug, name)" as const;

const FULL_SELECT =
  "*, category:blog_categories(id, slug, name), author:profiles!blog_posts_author_id_fkey(id, full_name, job_title, bio, avatar_url)" as const;

function livePosts() {
  const db = createPublicClient();
  if (!db) return null;
  return { db, now: new Date().toISOString() };
}

export type PostCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  published_at: string | null;
  updated_at: string;
  reading_minutes: number;
  category: { slug: string; name: string } | null;
};

export async function listPosts({
  page = 1,
  categoryId,
  pageSize = POSTS_PER_PAGE,
}: { page?: number; categoryId?: string; pageSize?: number } = {}): Promise<{ posts: PostCard[]; total: number }> {
  const ctx = livePosts();
  if (!ctx) return { posts: [], total: 0 };
  const from = (page - 1) * pageSize;
  let query = ctx.db
    .from("blog_posts")
    .select(CARD_SELECT, { count: "exact" })
    .in("status", ["published", "scheduled"])
    .lte("published_at", ctx.now)
    .order("published_at", { ascending: false })
    .range(from, from + pageSize - 1);
  if (categoryId) query = query.eq("category_id", categoryId);
  const { data, count, error } = await query;
  if (error) console.error("[blog] listPosts:", error.message);
  return { posts: data ?? [], total: count ?? 0 };
}

export const getPostBySlug = cache(async (slug: string) => {
  const ctx = livePosts();
  if (!ctx) return null;
  const { data, error } = await ctx.db
    .from("blog_posts")
    .select(FULL_SELECT)
    .eq("slug", slug)
    .in("status", ["published", "scheduled"])
    .lte("published_at", ctx.now)
    .maybeSingle();
  if (error) console.error("[blog] getPostBySlug:", error.message);
  return data;
});

export type PublicPost = NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>;

export const listCategories = cache(async () => {
  const db = createPublicClient();
  if (!db) return [];
  const { data } = await db.from("blog_categories").select("id, slug, name, description").order("sort_order");
  return data ?? [];
});

export async function getCategoryBySlug(slug: string) {
  const categories = await listCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function getRelatedPosts(post: { id: string; category_id: string | null }, limit = 3): Promise<PostCard[]> {
  const ctx = livePosts();
  if (!ctx) return [];
  const base = () =>
    ctx.db
      .from("blog_posts")
      .select(CARD_SELECT)
      .in("status", ["published", "scheduled"])
      .lte("published_at", ctx.now)
      .neq("id", post.id)
      .order("published_at", { ascending: false })
      .limit(limit);

  const sameCategory = post.category_id ? (await base().eq("category_id", post.category_id)).data ?? [] : [];
  if (sameCategory.length >= limit) return sameCategory;
  const latest = (await base()).data ?? [];
  const seen = new Set(sameCategory.map((p) => p.id));
  return [...sameCategory, ...latest.filter((p) => !seen.has(p.id))].slice(0, limit);
}

export async function listAllPostsForFeed(limit = 1000) {
  const ctx = livePosts();
  if (!ctx) return [];
  const { data } = await ctx.db
    .from("blog_posts")
    .select("slug, title, excerpt, published_at, updated_at, noindex, category:blog_categories(name)")
    .in("status", ["published", "scheduled"])
    .lte("published_at", ctx.now)
    .order("published_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}
