import Link from "next/link";
import { POSTS_PER_PAGE, type PostCard as PostCardData } from "@/lib/blog/queries";
import { PostCard } from "./PostCard";

type Props = {
  heading: string;
  intro: string;
  breadcrumb?: { href: string; label: string }[];
  posts: PostCardData[];
  total: number;
  page: number;
  basePath: string;
  categories: { slug: string; name: string }[];
  activeCategory?: string;
};

export function BlogListing({ heading, intro, breadcrumb, posts, total, page, basePath, categories, activeCategory }: Props) {
  const pages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const pageHref = (n: number) => (n <= 1 ? basePath : `${basePath}/page/${n}`);
  const [featured, ...rest] = page === 1 ? posts : [undefined, ...posts];

  return (
    <div className="bg-[#f8fafc]">
      <section className="border-b border-[#e2e8f0] bg-gradient-to-br from-[#eff6ff] via-white to-[#f0f9ff]">
        <div className="mx-auto max-w-[1240px] px-5 py-9 md:px-8 md:py-14">
          {breadcrumb && (
            <nav className="mb-3 text-[14.5px] text-[#64748b]" aria-label="Breadcrumb">
              {breadcrumb.map((b, i) => (
                <span key={b.href}>
                  {i > 0 && <span className="mx-2">/</span>}
                  <Link href={b.href} className="hover:text-[#2563eb]">{b.label}</Link>
                </span>
              ))}
            </nav>
          )}
          <h1 className="text-[28px] font-bold tracking-tight text-[#0b2c5e] md:text-[42px]">{heading}</h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-[#475569] md:text-[16.5px]">{intro}</p>
          {categories.length > 0 && (
            <nav className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0" aria-label="Categories">
              <Chip href="/blog" active={!activeCategory}>All</Chip>
              {categories.map((c) => (
                <Chip key={c.slug} href={`/blog/category/${c.slug}`} active={activeCategory === c.slug}>{c.name}</Chip>
              ))}
            </nav>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] px-5 py-9 md:px-8 md:py-12">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#cbd5e1] bg-white px-6 py-16 text-center">
            <p className="text-[17px] font-semibold text-[#0b2c5e]">New guides are on the way</p>
            <p className="mt-1 text-[15px] text-[#64748b]">Check back soon, or talk to an expert for answers right now.</p>
            <Link href="/#hero-lead" className="mt-5 inline-flex h-11 items-center rounded-xl bg-[#2563eb] px-5 text-[15px] font-semibold text-white hover:bg-[#1d4ed8]">
              Get free consultation
            </Link>
          </div>
        ) : (
          <>
            {featured && (
              <div className="mb-6">
                <PostCard post={featured} featured />
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.filter(Boolean).map((post) => (
                <PostCard key={post!.id} post={post!} />
              ))}
            </div>
          </>
        )}

        {pages > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Pagination">
            {page > 1 && <PageLink href={pageHref(page - 1)} rel="prev">← Newer</PageLink>}
            {Array.from({ length: pages }, (_, i) => i + 1)
              .filter((n) => n === 1 || n === pages || Math.abs(n - page) <= 1)
              .map((n, i, arr) => (
                <span key={n} className="flex items-center gap-1.5">
                  {i > 0 && n - arr[i - 1] > 1 && <span className="px-1 text-[#94a3b8]">…</span>}
                  <PageLink href={pageHref(n)} active={n === page}>{n}</PageLink>
                </span>
              ))}
            {page < pages && <PageLink href={pageHref(page + 1)} rel="next">Older →</PageLink>}
          </nav>
        )}
      </div>
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[14.5px] font-semibold transition ${
        active ? "border-[#0b2c5e] bg-[#0b2c5e] text-white" : "border-[#dbeafe] bg-white text-[#1d4ed8] hover:border-[#93c5fd]"
      }`}
    >
      {children}
    </Link>
  );
}

function PageLink({ href, active, rel, children }: { href: string; active?: boolean; rel?: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      rel={rel}
      aria-current={active ? "page" : undefined}
      className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-[14.5px] font-semibold ${
        active ? "bg-[#0b2c5e] text-white" : "border border-[#e2e8f0] bg-white text-[#334155] hover:border-[#93c5fd]"
      }`}
    >
      {children}
    </Link>
  );
}
