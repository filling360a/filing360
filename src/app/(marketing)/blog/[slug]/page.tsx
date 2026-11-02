import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/blog/ArticleView";
import { JsonLd } from "@/components/blog/JsonLd";
import { getPostBySlug, getRelatedPosts, listPosts } from "@/lib/blog/queries";
import { extractFaqs, extractHowTo } from "@/lib/blog/structured-data";
import { env } from "@/lib/env";
import { siteConfig } from "@/lib/siteConfig";

export const revalidate = 300;

export async function generateStaticParams() {
  const { posts } = await listPosts({ page: 1, pageSize: 50 });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || undefined;
  const images = post.cover_image_url ? [{ url: post.cover_image_url, alt: post.cover_image_alt ?? post.title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: post.canonical_url || `/blog/${post.slug}` },
    robots: post.noindex ? { index: false, follow: true } : undefined,
    authors: post.author?.full_name ? [{ name: post.author.full_name }] : undefined,
    keywords: post.tags.length ? post.tags : undefined,
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      siteName: siteConfig.brandName,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      section: post.category?.name,
      tags: post.tags,
      images,
    },
    twitter: { card: images ? "summary_large_image" : "summary", title, description, images: images?.map((i) => i.url) },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);
  const url = `${env.siteUrl}/blog/${post.slug}`;
  const faqs = extractFaqs(post.content_html);
  const howTo = extractHowTo(post.content_html);
  const logoUrl = `${env.siteUrl}${siteConfig.logo.src}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.seo_description || post.excerpt || undefined,
      image: post.cover_image_url ? [post.cover_image_url] : undefined,
      datePublished: post.published_at,
      dateModified: post.updated_at,
      wordCount: post.word_count,
      inLanguage: "en-IN",
      articleSection: post.category?.name,
      keywords: post.tags.join(", ") || post.focus_keyword || undefined,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: post.author?.full_name
        ? { "@type": "Person", name: post.author.full_name, jobTitle: post.author.job_title ?? undefined }
        : { "@type": "Organization", name: siteConfig.brandName, url: env.siteUrl },
      publisher: {
        "@type": "Organization",
        name: siteConfig.brandName,
        url: env.siteUrl,
        logo: { "@type": "ImageObject", url: logoUrl },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: env.siteUrl },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${env.siteUrl}/blog` },
        ...(post.category
          ? [{ "@type": "ListItem", position: 3, name: post.category.name, item: `${env.siteUrl}/blog/category/${post.category.slug}` }]
          : []),
        { "@type": "ListItem", position: post.category ? 4 : 3, name: post.title, item: url },
      ],
    },
    ...(faqs.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]
      : []),
    ...(howTo
      ? [
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: howTo.name,
            step: howTo.steps.map((text, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: `Step ${i + 1}`,
              text,
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <ArticleView post={post} related={related} shareUrl={url} />
    </>
  );
}
