import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { PostCard as PostCardData } from "@/lib/blog/queries";
import { CoverImage } from "./CoverImage";

export function PostCard({ post, featured }: { post: PostCardData; featured?: boolean }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] ${
        featured ? "md:grid md:grid-cols-[1.15fr_1fr]" : ""
      }`}
    >
      <div className={`relative aspect-[1.91/1] overflow-hidden bg-gradient-to-br from-[#dbeafe] to-[#eff6ff] ${featured ? "md:aspect-auto md:min-h-[300px]" : ""}`}>
        {post.cover_image_url ? (
          <CoverImage
            src={post.cover_image_url}
            alt={post.cover_image_alt ?? ""}
            priority={featured}
            sizes={featured ? "(min-width: 768px) 640px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
            className="transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[42px] font-bold text-[#2563eb]/25" aria-hidden>F360</span>
        )}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${featured ? "md:justify-center md:p-8" : ""}`}>
        <div className="flex items-center gap-2 text-[13.5px] font-semibold">
          {post.category && <span className="uppercase tracking-[0.08em] text-[#2563eb]">{post.category.name}</span>}
          <span className="text-[#94a3b8]">{post.reading_minutes} min read</span>
        </div>
        <h3 className={`mt-2 font-bold leading-snug tracking-tight text-[#0b2c5e] ${featured ? "text-[22px] md:text-[28px]" : "text-[17px]"}`}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className={`mt-2 text-[15px] leading-relaxed text-[#64748b] ${featured ? "md:text-[16.5px]" : "line-clamp-3"}`}>{post.excerpt}</p>
        )}
        <p className="mt-auto pt-4 text-[14px] text-[#94a3b8]">
          <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
        </p>
      </div>
    </article>
  );
}
