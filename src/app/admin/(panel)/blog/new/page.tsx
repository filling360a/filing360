import type { Metadata } from "next";
import { NewPostForm } from "@/components/admin/blog/NewPostForm";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireStaff } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "New post" };

export default async function NewPostPage() {
  await requireStaff("blog");
  const db = await createClient();
  const { data: categories } = await db.from("blog_categories").select("id, name").order("sort_order");
  return (
    <>
      <PageHeader back={{ href: "/admin/blog", label: "All posts" }} title="New post" description="Start with a working title — you can change everything later." />
      <Card className="max-w-xl p-5 sm:p-6">
        <NewPostForm categories={categories ?? []} />
      </Card>
    </>
  );
}
