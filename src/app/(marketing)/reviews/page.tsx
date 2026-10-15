import { JsonLd } from "@/components/blog/JsonLd";
import { container, CtaBand, PageHero, PrimaryButton, SecondaryButton } from "@/components/site/PageShell";
import { company, hasValue } from "@/content/company";
import { reviews, reviewSummary } from "@/content/reviews";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Client Reviews & Testimonials",
  description:
    "Read what founders, freelancers and businesses say about Filing360's company registration, GST and tax filing services.",
  path: "/reviews",
  noindex: reviews.length === 0,
});

function Stars({ value }: { value: number }) {
  return (
    <span className="text-[#f59e0b]" aria-label={`${value} out of 5 stars`}>
      {"★".repeat(value)}
      <span className="text-[#e2e8f0]">{"★".repeat(5 - value)}</span>
    </span>
  );
}

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { month: "short", year: "numeric" });

export default function ReviewsPage() {
  const summary = reviewSummary();
  const sorted = [...reviews].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-[#f8fafc]">
      {summary && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": sorted.map((r) => ({
              "@type": "Review",
              itemReviewed: { "@id": absoluteUrl("/#organization") },
              author: { "@type": "Person", name: r.name },
              reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
              reviewBody: r.text,
              datePublished: r.date,
            })),
          }}
        />
      )}
      <PageHero
        eyebrow="Reviews"
        title="What our clients say"
        crumbs={[{ name: "Reviews", path: "/reviews" }]}
        intro={
          summary ? (
            <p>
              Rated <strong>{summary.average}/5</strong> across {summary.count} verified reviews from clients we&apos;ve worked with.
            </p>
          ) : (
            <p>Honest feedback from people we&apos;ve helped register, file and stay compliant.</p>
          )
        }
      >
        {hasValue(company.googleReviewUrl) && <PrimaryButton href={company.googleReviewUrl}>Leave a review on Google</PrimaryButton>}
        {hasValue(company.googleBusinessProfileUrl) && (
          <SecondaryButton href={company.googleBusinessProfileUrl}>See us on Google</SecondaryButton>
        )}
      </PageHero>

      <section className={`${container} py-12`}>
        {sorted.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#cbd5e1] bg-white p-8 text-center">
            <p className="text-[18px] font-bold text-[#0b2c5e]">Client reviews are being collected</p>
            <p className="mx-auto mt-2 max-w-xl text-[15.5px] leading-relaxed text-[#475569]">
              We only publish genuine reviews, with the client&apos;s permission. If you&apos;ve worked with us, we&apos;d love to hear how it went.
            </p>
          </div>
        ) : (
          <ul className="columns-1 gap-5 md:columns-2 lg:columns-3">
            {sorted.map((r) => (
              <li key={`${r.name}-${r.date}`} className="mb-5 break-inside-avoid rounded-2xl border border-[#e2e8f0] bg-white p-5">
                <Stars value={r.rating} />
                <p className="mt-3 text-[15.5px] leading-relaxed text-[#334155]">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-4 text-[15px] font-bold text-[#0b2c5e]">{r.name}</p>
                <p className="text-[13.5px] text-[#64748b]">
                  {[r.service, r.city, fmtDate(r.date), `via ${r.source}`].filter(Boolean).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <CtaBand title="Ready to get started?" />
    </div>
  );
}
