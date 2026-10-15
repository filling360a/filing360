import type { MetadataRoute } from "next";
import { calendarYear } from "@/content/calendar";
import { cities, cityHref } from "@/content/cities";
import { company } from "@/content/company";
import { checklistHref, checklists } from "@/content/documents";
import { guideHref, guides } from "@/content/guides";
import { industries, industryHref } from "@/content/industries";
import { policies } from "@/content/policies";
import { reviews } from "@/content/reviews";
import { pillars } from "@/content/services";
import { team } from "@/content/team";
import { toolHref, tools } from "@/content/tools";
import { listAllPostsForFeed, listCategories } from "@/lib/blog/queries";
import { listOpenJobs } from "@/lib/careers/queries";
import { env } from "@/lib/env";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.siteUrl;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1, lastModified: now },
    { url: `${base}/services`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${base}/pricing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/compare`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/how-it-works`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/trust`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/blog`, changeFrequency: "daily", priority: 0.8, lastModified: now },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/book-consultation`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/track`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/partners`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/refer-and-earn`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/compliance-calendar`, changeFrequency: "monthly", priority: 0.8, lastModified: new Date(calendarYear.reviewed) },
    { url: `${base}/government-fees`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/glossary`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guides`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/documents`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tools`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/for`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/company-registration-in`, changeFrequency: "monthly", priority: 0.7 },
    ...(team.length > 0 ? [{ url: `${base}/team`, changeFrequency: "monthly" as const, priority: 0.5 }] : []),
    ...(reviews.length > 0 ? [{ url: `${base}/reviews`, changeFrequency: "weekly" as const, priority: 0.6 }] : []),
    ...policies.map((p) => ({
      url: `${base}${p.path}`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
      lastModified: new Date(company.policiesUpdated),
    })),
  ];

  const contentPages: MetadataRoute.Sitemap = [
    ...cities.map((c) => ({ url: `${base}${cityHref(c)}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...guides.map((g) => ({ url: `${base}${guideHref(g)}`, changeFrequency: "monthly" as const, priority: 0.7, lastModified: new Date(g.updated) })),
    ...checklists.map((c) => ({ url: `${base}${checklistHref(c)}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...industries.map((i) => ({ url: `${base}${industryHref(i)}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...tools.map((t) => ({ url: `${base}${toolHref(t)}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];

  const servicePages: MetadataRoute.Sitemap = pillars.flatMap((pillar) => [
    { url: `${base}/services/${pillar.slug}`, changeFrequency: "monthly" as const, priority: 0.8 },
    ...pillar.services.map((service) => ({
      url: `${base}/services/${pillar.slug}/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ]);

  const [posts, categories, jobs] = await Promise.all([listAllPostsForFeed(), listCategories(), listOpenJobs()]);

  const jobPages: MetadataRoute.Sitemap = [
    { url: `${base}/careers`, changeFrequency: "weekly", priority: 0.5 },
    ...jobs.map((j) => ({
      url: `${base}/careers/${j.slug}`,
      lastModified: j.published_at ? new Date(j.published_at) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/blog/category/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const postPages: MetadataRoute.Sitemap = posts
    .filter((p) => !p.noindex)
    .map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticPages, ...servicePages, ...contentPages, ...categoryPages, ...postPages, ...jobPages];
}
