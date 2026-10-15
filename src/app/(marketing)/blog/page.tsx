import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/BlogListing";
import { listCategories, listPosts } from "@/lib/blog/queries";
import { siteConfig } from "@/lib/siteConfig";

export const revalidate = 300;

const description =
  "Plain-language guides on company registration, GST, income tax and compliance in India — written and reviewed by CAs.";

export const metadata: Metadata = {
  title: "Blog — Business, Tax & Compliance Guides",
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: `${siteConfig.brandName} Blog` }] },
  },
  openGraph: { title: `${siteConfig.brandName} Blog`, description, url: "/blog", type: "website" },
};

export default async function BlogIndexPage() {
  const [{ posts, total }, categories] = await Promise.all([listPosts({ page: 1 }), listCategories()]);
  return (
    <BlogListing
      heading="Guides for founders & businesses"
      intro={description}
      posts={posts}
      total={total}
      page={1}
      basePath="/blog"
      categories={categories}
    />
  );
}
