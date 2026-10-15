import type { Metadata } from "next";
import { CategoryForm, DeleteCategoryButton } from "@/components/admin/blog/CategoryForms";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireStaff } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Blog categories" };

export default async function CategoriesPage() {
  await requireStaff("blog");
  const db = await createClient();
  const [{ data: categories }, { data: posts }] = await Promise.all([
    db.from("blog_categories").select("*").order("sort_order"),
    db.from("blog_posts").select("category_id"),
  ]);
  const counts = new Map<string, number>();
  for (const p of posts ?? []) if (p.category_id) counts.set(p.category_id, (counts.get(p.category_id) ?? 0) + 1);

  return (
    <>
      <PageHeader back={{ href: "/admin/blog", label: "All posts" }} title="Categories" description="Each category gets its own page at /blog/category/…" />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-3">
          {(categories ?? []).map((c) => (
            <Card key={c.id} className="p-4">
              <details>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">
                    <span className="block font-semibold text-[#0f172a]">{c.name}</span>
                    <span className="block truncate text-[12.5px] text-[#64748b]">/blog/category/{c.slug} · {counts.get(c.id) ?? 0} posts</span>
                  </span>
                  <span className="text-[12.5px] font-semibold text-[#2563eb]">Edit</span>
                </summary>
                <div className="mt-4 border-t border-[#eef2f7] pt-4">
                  <CategoryForm category={c} />
                  <div className="mt-3">
                    <DeleteCategoryButton categoryId={c.id} postCount={counts.get(c.id) ?? 0} />
                  </div>
                </div>
              </details>
            </Card>
          ))}
        </div>
        <Card className="h-fit p-5">
          <h2 className="mb-3 text-[15px] font-bold text-[#0b2c5e]">Add category</h2>
          <CategoryForm />
        </Card>
      </div>
    </>
  );
}
