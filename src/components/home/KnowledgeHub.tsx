import Link from "next/link";
import { CoverImage } from "@/components/blog/CoverImage";
import { homeKnowledge } from "@/content/home";
import { listPosts } from "@/lib/blog/queries";

export async function KnowledgeHub() {
  const { posts } = await listPosts({ page: 1, pageSize: 3 });
  if (posts.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="knowledge-hub-heading">
      <div className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 lg:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="knowledge-hub-heading"
            className="text-[28px] font-bold leading-[1.15] tracking-tight text-[#0f2a45] md:text-[36px]"
          >
            {homeKnowledge.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#5b6e7a] md:mt-3 md:text-[15.5px]">
            {homeKnowledge.subtitle}
          </p>
        </div>

        <ul className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-10">
          {posts.map((post) => (
            <li key={post.id}>
              <article className="group flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e8f2ee]">
                  {post.cover_image_url ? (
                    <CoverImage
                      src={post.cover_image_url}
                      alt={post.cover_image_alt ?? ""}
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span
                      className="absolute inset-0 flex items-center justify-center text-[36px] font-bold text-[#0e7b5b]/25"
                      aria-hidden
                    >
                      F360
                    </span>
                  )}
                  {post.category ? (
                    <span className="absolute bottom-0 left-0 bg-[#0f2a45] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8ecfbc]">
                      {post.category.name}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-[18px] font-bold leading-snug tracking-tight text-[#0f2a45] md:text-[19px]">
                  <Link href={`/blog/${post.slug}`} className="transition hover:text-[#0e7b5b]">
                    {post.title}
                  </Link>
                </h3>

                {post.excerpt ? (
                  <p className="mt-2 line-clamp-3 text-[14.5px] leading-relaxed text-[#5b6e7a]">{post.excerpt}</p>
                ) : null}

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#0f2a45] transition hover:text-[#0e7b5b]"
                >
                  Read more
                  <span aria-hidden className="text-[14px] transition group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center md:mt-10">
          <Link
            href={homeKnowledge.href}
            className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#0e7b5b] transition hover:text-[#0f2a45]"
          >
            {homeKnowledge.cta}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
