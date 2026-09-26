import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const posts: Record<
  string,
  { title: string; excerpt: string; body: string[] }
> = {
  "private-limited-company-registration-guide": {
    title: "Private Limited Company registration — a plain guide",
    excerpt: "What happens between name check and certificate of incorporation.",
    body: [
      "A Private Limited Company is a separate legal entity under the Companies Act, 2013. Founders usually choose it when they expect to raise equity or want clearer ownership records.",
      "The typical path: obtain DSC for directors, reserve a name, prepare MOA and AOA, file SPICe+, then wait for MCA review. Professional fees and government fees are separate.",
      "This page is a design stub. Replace with full editorial content when content production starts.",
    ],
  },
  "llp-vs-private-limited": {
    title: "LLP vs Private Limited: which structure fits?",
    excerpt: "Liability, funding, and compliance trade-offs in plain language.",
    body: [
      "LLPs suit professional partnerships that want limited liability without share capital complexity. Private Limited companies suit startups that plan to issue shares.",
      "Compliance cost and investor preference usually tip growth companies toward Pvt Ltd.",
      "This page is a design stub for the article template.",
    ],
  },
  "gst-registration-checklist": {
    title: "GST registration checklist for new businesses",
    excerpt: "Documents and thresholds before you apply for GSTIN.",
    body: [
      "Have PAN, address proof, and bank details ready. Composition vs regular scheme depends on turnover and supply type.",
      "Portal filing yields an ARN; GSTIN follows after approval.",
      "This page is a design stub for the article template.",
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <article className="bg-paper">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-sm text-ink-muted">
          <Link href="/blog" className="hover:text-ink">
            Guides
          </Link>
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-ink-muted">{post.excerpt}</p>
        <div className="prose-brand mt-10">
          {post.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
