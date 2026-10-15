import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogListing } from "@/components/blog/BlogListing";
import { getCategoryBySlug, listCategories, listPosts } from "@/lib/blog/queries";
import { siteConfig } from "@/lib/siteConfig";

export const revalidate = 300;

export async function generateStaticParams() {
  const categories = await listCategories();
  return categories.map((c) => ({ slug: c.slug, page: [] as string[] }));
}

type Params = PageProps<"/blog/category/[slug]/[[...page]]">["params"];

async function resolve(params: Params) {
  const { slug, page: rest } = await params;
  let page = 1;
  if (rest && rest.length) {
    if (rest.length !== 2 || rest[0] !== "page" || !/^\d+$/.test(rest[1])) return null;
    page = Number(rest[1]);
  }
  return { slug, page };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const resolved = await resolve(params);
  if (!resolved) return {};
  const category = await getCategoryBySlug(resolved.slug);
  if (!category) return {};
  const suffix = resolved.page > 1 ? ` — Page ${resolved.page}` : "";
  const path = `/blog/category/${category.slug}${resolved.page > 1 ? `/page/${resolved.page}` : ""}`;
  const description = category.description ?? `${category.name} guides from ${siteConfig.brandName}.`;
  return {
    title: `${category.name} Guides${suffix}`,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${category.name} Guides`, description, url: path },
  };
}

export default async function BlogCategoryPage({ params }: { params: Params }) {
  const resolved = await resolve(params);
  if (!resolved) notFound();
  const category = await getCategoryBySlug(resolved.slug);
  if (!category) notFound();
  if (resolved.page === 1 && (await params).page?.length) permanentRedirect(`/blog/category/${category.slug}`);

  const [{ posts, total }, categories] = await Promise.all([
    listPosts({ page: resolved.page, categoryId: category.id }),
    listCategories(),
  ]);
  if (resolved.page > 1 && posts.length === 0) notFound();

  return (
    <BlogListing
      heading={`${category.name} guides`}
      intro={category.description ?? `Everything you need to know about ${category.name.toLowerCase()} in India.`}
      breadcrumb={[{ href: "/", label: "Home" }, { href: "/blog", label: "Blog" }]}
      posts={posts}
      total={total}
      page={resolved.page}
      basePath={`/blog/category/${category.slug}`}
      categories={categories}
      activeCategory={category.slug}
    />
  );
}
