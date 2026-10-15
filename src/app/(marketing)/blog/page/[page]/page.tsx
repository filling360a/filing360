import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogListing } from "@/components/blog/BlogListing";
import { listCategories, listPosts } from "@/lib/blog/queries";

export const revalidate = 300;

export function generateStaticParams() {
  return [];
}

function parsePage(value: string): number | null {
  return /^\d+$/.test(value) ? Number(value) : null;
}

export async function generateMetadata({ params }: PageProps<"/blog/page/[page]">): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog — Page ${page}`,
    description: "Business, tax and compliance guides for Indian founders.",
    alternates: { canonical: `/blog/page/${page}` },
  };
}

export default async function BlogPagedPage({ params }: PageProps<"/blog/page/[page]">) {
  const page = parsePage((await params).page);
  if (!page) notFound();
  if (page === 1) permanentRedirect("/blog");

  const [{ posts, total }, categories] = await Promise.all([listPosts({ page }), listCategories()]);
  if (posts.length === 0) notFound();

  return (
    <BlogListing
      heading="Guides for founders & businesses"
      intro={`Page ${page} of our business, tax and compliance guides.`}
      posts={posts}
      total={total}
      page={page}
      basePath="/blog"
      categories={categories}
    />
  );
}
