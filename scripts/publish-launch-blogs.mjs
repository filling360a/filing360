/**
 * Publishes the 10 launch blogs into the CMS (blog_posts), so they can be
 * edited later from /admin/blog. Uploads covers to the blog-media bucket.
 *
 * Usage (from karya/): node scripts/publish-launch-blogs.mjs
 */
import { readFileSync } from "node:fs";
import { extname, join } from "node:path";
import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { posts } from "./launch-blogs-data.mjs";

nextEnv.loadEnvConfig(process.cwd());

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !secret) {
  console.error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY must be set in .env.local");
  process.exit(1);
}

const db = createClient(url, secret, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };

function words(html) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text ? text.split(" ").length : 0;
}

async function uploadImage(postId, relPath, kind) {
  const abs = join(process.cwd(), "public", "images", relPath);
  const ext = extname(relPath).toLowerCase();
  const type = MIME[ext] || "image/png";
  const dest = `posts/${postId}/${kind}${ext}`;
  const buf = readFileSync(abs);
  const { error } = await db.storage.from("blog-media").upload(dest, buf, {
    cacheControl: "31536000",
    contentType: type,
    upsert: true,
  });
  if (error) throw new Error(`Upload ${relPath}: ${error.message}`);
  return db.storage.from("blog-media").getPublicUrl(dest).data.publicUrl;
}

const { data: categories, error: catErr } = await db.from("blog_categories").select("id, slug");
if (catErr) {
  console.error("Categories:", catErr.message);
  process.exit(1);
}
const catBySlug = Object.fromEntries((categories ?? []).map((c) => [c.slug, c.id]));

const { data: authors } = await db
  .from("profiles")
  .select("id, full_name, role")
  .in("role", ["admin", "editor"])
  .eq("is_active", true)
  .order("created_at", { ascending: true })
  .limit(1);
const author = authors?.[0];
if (!author) {
  console.error("No admin/editor profile found. Run npm run admin:create first.");
  process.exit(1);
}

console.log(`Author: ${author.full_name ?? author.id} (${author.role})`);
console.log(`Publishing ${posts.length} posts…\n`);

const now = Date.now();
let failed = 0;

for (let i = 0; i < posts.length; i++) {
  const post = posts[i];
  const categoryId = catBySlug[post.category];
  if (!categoryId) {
    console.error(`× ${post.slug}: missing category ${post.category}`);
    failed += 1;
    continue;
  }

  const { data: existing } = await db.from("blog_posts").select("id").eq("slug", post.slug).maybeSingle();
  let postId = existing?.id;
  if (!postId) {
    const { data: created, error } = await db
      .from("blog_posts")
      .insert({
        title: post.title,
        slug: post.slug,
        category_id: categoryId,
        author_id: author.id,
        created_by: author.id,
        updated_by: author.id,
        status: "draft",
      })
      .select("id")
      .single();
    if (error || !created) {
      console.error(`× ${post.slug}: create failed — ${error?.message}`);
      failed += 1;
      continue;
    }
    postId = created.id;
  }

  let coverUrl;
  let inlineUrl;
  try {
    coverUrl = await uploadImage(postId, post.cover, "cover");
    inlineUrl = await uploadImage(postId, post.inline, "inline");
  } catch (err) {
    console.error(`× ${post.slug}: ${err.message}`);
    failed += 1;
    continue;
  }

  const html = post.html.replaceAll("{{INLINE}}", inlineUrl).replaceAll("{{COVER}}", coverUrl);
  const wordCount = words(html);
  const readingMinutes = Math.max(1, Math.round(wordCount / 220));
  const publishedAt = new Date(now - (posts.length - 1 - i) * 36e5).toISOString();

  const payload = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content_html: html,
    cover_image_url: coverUrl,
    cover_image_alt: post.coverAlt,
    category_id: categoryId,
    tags: post.tags,
    status: "published",
    published_at: publishedAt,
    author_id: author.id,
    seo_title: post.seoTitle,
    seo_description: post.seoDescription,
    focus_keyword: post.focusKeyword,
    canonical_url: null,
    noindex: false,
    reading_minutes: readingMinutes,
    word_count: wordCount,
    updated_by: author.id,
  };

  let updateError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const result = await db.from("blog_posts").update(payload).eq("id", postId);
    updateError = result.error;
    if (!updateError) break;
    const transient = /502|503|timeout|fetch/i.test(updateError.message);
    if (!transient || attempt === 3) break;
    await new Promise((r) => setTimeout(r, 1500 * attempt));
  }

  if (updateError) {
    console.error(`× ${post.slug}: save failed — ${updateError.message}`);
    failed += 1;
    continue;
  }

  const flag = wordCount >= 900 ? "ok" : "short";
  console.log(`✓ ${post.slug}  ${wordCount} words  ${flag}  /admin/blog/${postId}`);
}

if (failed) {
  console.error(`\nFinished with ${failed} error(s).`);
  process.exit(1);
}
console.log("\nAll launch blogs are live in the admin CMS and on /blog.");
