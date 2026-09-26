import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides",
  description: "Design stubs for SEO article templates.",
};

const stubs = [
  {
    slug: "private-limited-company-registration-guide",
    title: "Private Limited Company registration — a plain guide",
  },
  {
    slug: "llp-vs-private-limited",
    title: "LLP vs Private Limited: which structure fits?",
  },
  {
    slug: "gst-registration-checklist",
    title: "GST registration checklist for new businesses",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <h1 className="font-display text-4xl tracking-tight text-ink md:text-5xl">
          Guides
        </h1>
        <p className="mt-4 max-w-xl text-ink-muted">
          Thin content stubs for the SEO article template — design only in this
          phase.
        </p>
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {stubs.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block py-5 font-display text-xl text-ink hover:text-seal"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
