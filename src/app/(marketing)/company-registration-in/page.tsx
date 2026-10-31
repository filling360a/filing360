import { container, CtaBand, LinkCards, PageHero, PrimaryButton } from "@/components/site/PageShell";
import { cities, cityHref } from "@/content/cities";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Company Registration Across India — City Guides",
  description:
    "Register a private limited company, LLP or OPC in Delhi, Mumbai, Bangalore, Pune, Hyderabad, Chennai, Kolkata, Ahmedabad, Jaipur, Noida or Gurgaon — with local ROC, GST and professional-tax guidance.",
  path: "/company-registration-in",
});

export default function CitiesHubPage() {
  return (
    <div className="bg-[#f3f7fa]">
      <PageHero
        eyebrow="Locations"
        title="Company registration in your city"
        crumbs={[{ name: "Company registration", path: "/company-registration-in" }]}
        intro={
          <p>
            Incorporation is filed online with the MCA, so we can register your company anywhere in India. Your registered office decides your
            Registrar of Companies, GST state and local rules — here&apos;s what applies in each major city.
          </p>
        }
      >
        <PrimaryButton href="/book-consultation">Talk to an expert</PrimaryButton>
      </PageHero>
      <section className={`${container} py-12`}>
        <LinkCards
          items={cities.map((c) => ({
            href: cityHref(c),
            title: `Company registration in ${c.name}`,
            meta: `${c.state} · ${c.roc}`,
            body: c.intro,
          }))}
        />
      </section>
      <CtaBand />
    </div>
  );
}
