import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/blog/ArticleView";
import { requireStaff } from "@/lib/auth/dal";
import { env } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Preview" };

export default async function PreviewPostPage({ params }: PageProps<"/admin/blog/[id]/preview">) {
  await requireStaff("blog");
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();

  const db = await createClient();
  const { data: post } = await db
    .from("blog_posts")
    .select("*, category:blog_categories(slug, name), author:profiles!blog_posts_author_id_fkey(full_name, job_title, bio, avatar_url)")
    .eq("id", id)
    .maybeSingle();
  if (!post) notFound();

  return (
    <div className="-mx-4 -my-6 sm:-mx-6 lg:-mx-8 lg:-my-8">
      <div className="sticky top-14 z-20 flex items-center justify-between gap-3 bg-[#fffbeb] px-5 py-2.5 text-[13px] font-semibold text-[#92400e] lg:top-0">
        <span>Preview — this is how the post will look once published ({post.status}).</span>
        <Link href={`/admin/blog/${post.id}`} className="shrink-0 underline">Back to editor</Link>
      </div>
      <ArticleView
        post={{ ...post, published_at: post.published_at ?? new Date().toISOString() }}
        shareUrl={`${env.siteUrl}/blog/${post.slug}`}
      />
    </div>
  );
}
