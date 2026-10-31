import { container, FaqList, PageHero, SecondaryButton } from "@/components/site/PageShell";
import { TrackForm } from "@/components/site/TrackForm";
import { company, whatsappLink } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Track Your Application or Request Status",
  description:
    "Check the status of your Filing360 registration, filing or job application using your reference number and mobile number.",
  path: "/track",
});

const FAQS = [
  { q: "Where do I find my reference number?", a: "It's in the confirmation email and on the thank-you screen after you submit a request. Service requests start with F360- and job applications with APP-." },
  { q: "Why does my status say 'Quote shared' for a while?", a: "We're waiting for your go-ahead. Reply to the quote email or WhatsApp us and we'll start right away." },
  { q: "Does this show the government application status too?", a: "Once work begins, your expert shares government SRN / ARN numbers and portal updates with you directly by email and WhatsApp at each milestone." },
  { q: "My status hasn't changed in days. What should I do?", a: `Government portals sometimes take longer than usual. Contact us at ${company.contact.supportEmail} or on WhatsApp with your reference and we'll give you a detailed update.` },
];

export default async function TrackPage({ searchParams }: PageProps<"/track">) {
  const sp = await searchParams;
  const ref = typeof sp.ref === "string" && /^[A-Za-z0-9-]{1,20}$/.test(sp.ref) ? sp.ref.toUpperCase() : "";

  return (
    <div className="bg-[#f3f7fa]">
      <PageHero
        eyebrow="Track status"
        title="Track your request"
        crumbs={[{ name: "Track status", path: "/track" }]}
        intro={<p>Enter your reference number and the mobile number you gave us to see where things stand — for a registration or filing request, or a job application.</p>}
      />
      <section className={`${container} py-10 md:py-14`}>
        <TrackForm initialRef={ref} />
        <div className="mt-6 flex flex-wrap items-center gap-3 text-[15px] text-[#4a5d68]">
          <span>Lost your reference?</span>
          <SecondaryButton href={whatsappLink("Hi Filing360, I'd like an update on my request. My registered mobile is ")}>Ask on WhatsApp</SecondaryButton>
        </div>
      </section>
      <section className={`${container} pb-14`}>
        <h2 className="text-[22px] font-bold text-[#0f2a45] md:text-[26px]">Tracking FAQs</h2>
        <div className="mt-5"><FaqList items={FAQS} /></div>
      </section>
    </div>
  );
}
