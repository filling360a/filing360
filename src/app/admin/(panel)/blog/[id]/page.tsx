import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostEditor } from "@/components/admin/blog/PostEditor";
import { requireStaff } from "@/lib/auth/dal";
import { env } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Edit post" };

export default async function EditPostPage({ params }: PageProps<"/admin/blog/[id]">) {
  const staff = await requireStaff("blog");
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();

  const db = await createClient();
  const [{ data: post }, { data: categories }, { data: authors }, { data: revisions }] = await Promise.all([
    db.from("blog_posts").select("*").eq("id", id).maybeSingle(),
    db.from("blog_categories").select("id, name").order("sort_order"),
    db.from("profiles").select("id, full_name, email").eq("is_active", true).in("role", ["admin", "editor"]).order("full_name"),
    db
      .from("blog_post_revisions")
      .select("id, title, created_at, editor:profiles!blog_post_revisions_edited_by_fkey(full_name)")
      .eq("post_id", id)
      .order("created_at", { ascending: false })
      .limit(30),
  ]);
  if (!post) notFound();

  return (
    <PostEditor
      post={post}
      categories={categories ?? []}
      authors={authors ?? []}
      revisions={(revisions ?? []).map((r) => ({ id: r.id, title: r.title, created_at: r.created_at, editor: r.editor?.full_name ?? null }))}
      siteUrl={env.siteUrl}
      canDelete={staff.role === "admin"}
    />
  );
}
