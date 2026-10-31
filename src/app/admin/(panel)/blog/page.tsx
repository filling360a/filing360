import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass, Card, EmptyState, inputClass, PageHeader, POST_STATUSES, PostStatusBadge } from "@/components/admin/ui";
import { requireStaff } from "@/lib/auth/dal";
import { formatDateTime, timeAgo } from "@/lib/format";
import type { PostStatus } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Blog" };

const PAGE_SIZE = 25;

export default async function BlogAdminPage({ searchParams }: PageProps<"/admin/blog">) {
  await requireStaff("blog");
  const sp = await searchParams;
  const status = POST_STATUSES.some((s) => s.value === sp.status) ? (sp.status as PostStatus) : undefined;
  const q = typeof sp.q === "string" ? sp.q.replace(/[,()*%\\]/g, " ").trim().slice(0, 80) : "";
  const page = Math.max(1, Number(sp.page) || 1);

  const db = await createClient();
  let query = db
    .from("blog_posts")
    .select(
      "id, title, slug, status, published_at, updated_at, word_count, category:blog_categories(name), author:profiles!blog_posts_author_id_fkey(full_name)",
      { count: "exact" },
    )
    .order("updated_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (status) query = query.eq("status", status);
  if (q) query = query.or(`title.ilike.*${q}*,slug.ilike.*${q}*`);

  const [{ data: posts, count }, counts] = await Promise.all([
    query,
    Promise.all(
      POST_STATUSES.map(async (s) => {
        const { count: c } = await db.from("blog_posts").select("id", { count: "exact", head: true }).eq("status", s.value);
        return [s.value, c ?? 0] as const;
      }),
    ),
  ]);
  const countMap = Object.fromEntries(counts) as Record<PostStatus, number>;
  const all = Object.values(countMap).reduce((a, b) => a + b, 0);
  const pages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));
  const href = (p: { status?: string; page?: number }) => {
    const params = new URLSearchParams();
    if (p.status) params.set("status", p.status);
    if (q) params.set("q", q);
    if (p.page && p.page > 1) params.set("page", String(p.page));
    const s = params.toString();
    return `/admin/blog${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <PageHeader
        title="Blog"
        description="Write, schedule and publish articles."
        actions={
          <>
            <Link href="/admin/blog/categories" className={buttonClass("secondary")}>Categories</Link>
            <Link href="/admin/blog/new" className={buttonClass("primary")}>+ New post</Link>
          </>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-4 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
          {[{ value: undefined, label: "All", n: all }, ...POST_STATUSES.map((s) => ({ value: s.value, label: s.label, n: countMap[s.value] }))].map((tab) => {
            const active = status === tab.value;
            return (
              <Link
                key={tab.label}
                href={href({ status: tab.value })}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold ${active ? "bg-[#0f2a45] text-white" : "text-[#4a5d68] hover:bg-white"}`}
              >
                {tab.label}
                <span className={`rounded-full px-1.5 text-[11px] ${active ? "bg-white/20" : "bg-[#d7e4de]"}`}>{tab.n}</span>
              </Link>
            );
          })}
        </div>
        <form action="/admin/blog" className="flex gap-2">
          {status && <input type="hidden" name="status" value={status} />}
          <input name="q" defaultValue={q} placeholder="Search posts" className={`${inputClass} sm:!w-56`} aria-label="Search posts" />
          <button type="submit" className={buttonClass("dark")}>Search</button>
        </form>
      </div>

      <Card>
        {!posts?.length ? (
          <EmptyState
            title={q || status ? "No posts match" : "No posts yet"}
            description={q || status ? undefined : "Publishing regularly is one of the best ways to grow organic traffic."}
            action={<Link href="/admin/blog/new" className={buttonClass("primary", "sm")}>Write a post</Link>}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-[#d7e4de] text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#5b6e7a]">
                  <th className="px-5 py-3">Title</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Category</th>
                  <th className="px-3 py-3">Author</th>
                  <th className="px-3 py-3">Publish date</th>
                  <th className="px-5 py-3 text-right">Updated</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} className="border-b border-[#e8f0ec] last:border-0 hover:bg-[#f3f7fa]">
                    <td className="max-w-[360px] px-5 py-3">
                      <Link href={`/admin/blog/${p.id}`} className="line-clamp-2 font-semibold text-[#0f2a45] hover:text-[#0e7b5b]">
                        {p.title}
                      </Link>
                      <p className="mt-0.5 truncate text-[12px] text-[#8a9ba6]">/blog/{p.slug} · {p.word_count.toLocaleString("en-IN")} words</p>
                    </td>
                    <td className="px-3 py-3"><PostStatusBadge status={p.status} publishedAt={p.published_at} /></td>
                    <td className="px-3 py-3 text-[#2c3f4e]">{p.category?.name ?? "—"}</td>
                    <td className="px-3 py-3 text-[#2c3f4e]">{p.author?.full_name ?? "—"}</td>
                    <td className="px-3 py-3 text-[12.5px] text-[#5b6e7a]">{p.published_at ? formatDateTime(p.published_at) : "—"}</td>
                    <td className="px-5 py-3 text-right text-[12.5px] text-[#5b6e7a]">{timeAgo(p.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {pages > 1 && (
        <nav className="mt-4 flex items-center justify-between text-[13px]" aria-label="Pagination">
          <span className="text-[#5b6e7a]">Page {page} of {pages}</span>
          <div className="flex gap-2">
            {page > 1 && <Link href={href({ status, page: page - 1 })} className={buttonClass("secondary", "sm")}>← Previous</Link>}
            {page < pages && <Link href={href({ status, page: page + 1 })} className={buttonClass("secondary", "sm")}>Next →</Link>}
          </div>
        </nav>
      )}
    </>
  );
}
