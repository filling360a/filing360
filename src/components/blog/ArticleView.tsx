import Link from "next/link";
import { LeadForm } from "@/components/leads/LeadForm";
import { ReviewedBy } from "@/components/site/ReviewedBy";
import { withHeadingIds } from "@/lib/blog/html";
import type { PostCard as PostCardData } from "@/lib/blog/queries";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/siteConfig";
import { CoverImage } from "./CoverImage";
import { PostCard } from "./PostCard";

export type ArticleData = {
  slug: string;
  title: string;
  excerpt: string | null;
  content_html: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  published_at: string | null;
  updated_at: string;
  reading_minutes: number;
  tags: string[];
  category: { slug: string; name: string } | null;
  author: { full_name: string | null; job_title: string | null; bio: string | null; avatar_url: string | null } | null;
};

export function ArticleView({ post, related = [], shareUrl }: { post: ArticleData; related?: PostCardData[]; shareUrl: string }) {
  const { html, toc } = withHeadingIds(post.content_html);
  const body = html.replace(/<img /g, '<img loading="lazy" decoding="async" ');
  const updated =
    post.published_at && new Date(post.updated_at).getTime() - new Date(post.published_at).getTime() > 86_400_000;
  const share = encodeURIComponent(shareUrl);
  const shareText = encodeURIComponent(post.title);
  const authorName = post.author?.full_name ?? `${siteConfig.brandName} Editorial Team`;

  return (
    <article className="bg-white">
      <header className="border-b border-[#d7e4de] bg-gradient-to-br from-[#e3f2ed] via-white to-[#f3f7fa]">
        <div className="mx-auto max-w-[860px] px-5 pb-8 pt-8 md:px-8 md:pb-12 md:pt-12">
          <nav className="text-[14.5px] text-[#5b6e7a]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0e7b5b]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-[#0e7b5b]">Blog</Link>
            {post.category && (
              <>
                <span className="mx-2">/</span>
                <Link href={`/blog/category/${post.category.slug}`} className="hover:text-[#0e7b5b]">{post.category.name}</Link>
              </>
            )}
          </nav>
          <h1 className="mt-4 text-[28px] font-bold leading-[1.18] tracking-tight text-[#0f2a45] md:text-[42px]">{post.title}</h1>
          {post.excerpt && <p className="mt-4 text-[16px] leading-relaxed text-[#4a5d68] md:text-[18px]">{post.excerpt}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14.5px] text-[#5b6e7a]">
            <span className="flex items-center gap-2">
              <Avatar name={authorName} url={post.author?.avatar_url} />
              <span>
                <span className="block font-semibold text-[#0f2a45]">{authorName}</span>
                {post.author?.job_title && <span className="block text-[13.5px]">{post.author.job_title}</span>}
              </span>
            </span>
            <span aria-hidden>·</span>
            <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
            {updated && (
              <>
                <span aria-hidden>·</span>
                <span>Updated <time dateTime={post.updated_at}>{formatDate(post.updated_at)}</time></span>
              </>
            )}
            <span aria-hidden>·</span>
            <span>{post.reading_minutes} min read</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-5 py-8 md:px-8 md:py-12">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <div className="min-w-0">
            {post.cover_image_url && (
              <div className="relative mb-8 aspect-[1.91/1] overflow-hidden rounded-2xl bg-[#e3f2ed]">
                <CoverImage src={post.cover_image_url} alt={post.cover_image_alt ?? post.title} priority sizes="(min-width: 1024px) 800px, 100vw" />
              </div>
            )}

            {toc.length >= 3 && (
              <details className="mb-8 rounded-xl border border-[#d7e4de] bg-[#f3f7fa] p-4 lg:hidden" open>
                <summary className="cursor-pointer text-[15px] font-bold text-[#0f2a45]">In this article</summary>
                <TocList toc={toc} />
              </details>
            )}

            <div className="article-body" dangerouslySetInnerHTML={{ __html: body }} />

            {post.tags.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
                {post.tags.map((t) => (
                  <li key={t} className="rounded-full bg-[#eef4f1] px-3 py-1 text-[14px] font-medium text-[#4a5d68]">#{t}</li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-[#d7e4de] pt-6 text-[14.5px]">
              <span className="font-semibold text-[#2c3f4e]">Share:</span>
              <ShareLink href={`https://wa.me/?text=${shareText}%20${share}`}>WhatsApp</ShareLink>
              <ShareLink href={`https://www.linkedin.com/sharing/share-offsite/?url=${share}`}>LinkedIn</ShareLink>
              <ShareLink href={`https://twitter.com/intent/tweet?text=${shareText}&url=${share}`}>X</ShareLink>
              <ShareLink href={`https://www.facebook.com/sharer/sharer.php?u=${share}`}>Facebook</ShareLink>
            </div>

            <section className="mt-8 flex gap-4 rounded-2xl border border-[#d7e4de] bg-[#f3f7fa] p-5" aria-label="About the author">
              <Avatar name={authorName} url={post.author?.avatar_url} size="lg" />
              <div>
                <p className="text-[13.5px] font-semibold uppercase tracking-[0.08em] text-[#5b6e7a]">Written by</p>
                <p className="mt-0.5 text-[16px] font-bold text-[#0f2a45]">{authorName}</p>
                {post.author?.job_title && <p className="text-[14.5px] text-[#4a5d68]">{post.author.job_title}</p>}
                <p className="mt-2 text-[15px] leading-relaxed text-[#4a5d68]">
                  {post.author?.bio ??
                    `${siteConfig.brandName}'s editorial team works with qualified CAs and company secretaries to explain Indian tax, GST and company law in plain language.`}
                </p>
              </div>
            </section>

            <ReviewedBy className="mt-6 text-[14px] text-[#5b6e7a]" />

            <p className="mt-4 text-[13.5px] leading-relaxed text-[#8a9ba6]">
              This article is for general information and is not legal or tax advice. Rules change often — speak to an expert before acting on it.
            </p>
          </div>

          <aside className="mt-10 lg:mt-0">
            <div className="space-y-6 lg:sticky lg:top-24">
              {toc.length >= 3 && (
                <nav className="hidden rounded-xl border border-[#d7e4de] p-4 lg:block" aria-label="Table of contents">
                  <p className="text-[14.5px] font-bold text-[#0f2a45]">In this article</p>
                  <TocList toc={toc} />
                </nav>
              )}
              <LeadForm id="blog-lead" compact source="blog" />
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-14 border-t border-[#d7e4de] pt-10" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-[22px] font-bold tracking-tight text-[#0f2a45]">Keep reading</h2>
            <div className="rail rail-bleed mt-5 grid gap-5 [--rail-item:84%] [--rail-item-sm:46%] lg:grid-cols-3">
              {related.map((p) => <PostCard key={p.id} post={p} />)}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

function TocList({ toc }: { toc: { id: string; text: string; level: 2 | 3 }[] }) {
  return (
    <ol className="mt-2 space-y-1.5 text-[15px]">
      {toc.map((item) => (
        <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
          <a href={`#${item.id}`} className="text-[#4a5d68] hover:text-[#0e7b5b]">{item.text}</a>
        </li>
      ))}
    </ol>
  );
}

function ShareLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#d7e4de] px-3 py-1 font-medium text-[#2c3f4e] hover:border-[#8ecfbc] hover:text-[#0b6550]">
      {children}
    </a>
  );
}

function Avatar({ name, url, size = "md" }: { name: string; url?: string | null; size?: "md" | "lg" }) {
  const dims = size === "lg" ? "h-14 w-14 text-[18px]" : "h-9 w-9 text-[14.5px]";
  if (url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt="" className={`${dims} shrink-0 rounded-full object-cover`} />;
  }
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span className={`${dims} flex shrink-0 items-center justify-center rounded-full bg-[#0f2a45] font-bold text-white`} aria-hidden>
      {initials}
    </span>
  );
}
