import { listAllPostsForFeed } from "@/lib/blog/queries";
import { env } from "@/lib/env";
import { siteConfig } from "@/lib/siteConfig";

export const revalidate = 900;

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET() {
  const posts = (await listAllPostsForFeed(50)).filter((p) => !p.noindex);
  const items = posts
    .map((p) => {
      const url = `${env.siteUrl}/blog/${p.slug}`;
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.published_at ?? p.updated_at).toUTCString()}</pubDate>${
        p.category ? `\n      <category>${escape(p.category.name)}</category>` : ""
      }${p.excerpt ? `\n      <description>${escape(p.excerpt)}</description>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${siteConfig.brandName} Blog`)}</title>
    <link>${env.siteUrl}/blog</link>
    <description>${escape(siteConfig.description)}</description>
    <language>en-IN</language>
    <atom:link href="${env.siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
