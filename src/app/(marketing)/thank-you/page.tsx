import Link from "next/link";
import { container, PrimaryButton, SecondaryButton } from "@/components/site/PageShell";
import { company, whatsappLink } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Thank you — we've received your request",
  description: "Your request has reached the Filing360 team. An expert will contact you shortly.",
  path: "/thank-you",
  noindex: true,
});

const NEXT_STEPS = [
  { title: "An expert calls you", body: "Usually within 10 minutes during office hours, to understand exactly what you need." },
  { title: "You get a written quote", body: "Professional fee and government fee shown separately — no surprises later." },
  { title: "Share documents online", body: "Upload securely or send on WhatsApp. We check everything before filing." },
];

export default async function ThankYouPage({ searchParams }: PageProps<"/thank-you">) {
  const sp = await searchParams;
  const rawRef = typeof sp.ref === "string" ? sp.ref : "";
  const reference = /^[A-Z0-9-]{4,40}$/.test(rawRef) ? rawRef : "";
  const isBooking = sp.type === "booking";

  return (
    <div className="bg-[#f3f7fa]">
      <section className={`${container} py-14 md:py-20`}>
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#d7e4de] bg-white p-7 text-center shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)] md:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e3f2ed] text-[#0e7b5b]">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-5 text-[28px] font-bold tracking-tight text-[#0f2a45] md:text-[34px]">
            {isBooking ? "Your consultation request is in" : "Thank you — request received"}
          </h1>
          <p className="mt-3 text-[16.5px] leading-relaxed text-[#4a5d68]">
            {isBooking
              ? "We'll confirm your slot by call or WhatsApp shortly. If the time you picked isn't available, we'll suggest the nearest one."
              : `An expert will call you shortly. ${company.hours.label}.`}
          </p>
          {reference && (
            <p className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-xl bg-[#e3f2ed] px-4 py-2.5 text-[15px] text-[#2c3f4e]">
              Your reference number
              <span className="font-mono text-[16px] font-bold text-[#0f2a45]">{reference}</span>
            </p>
          )}
          {reference && (
            <p className="mt-2 text-[14px] text-[#5b6e7a]">
              Save it — you can use it with your phone number to{" "}
              <Link href={`/track?ref=${encodeURIComponent(reference)}`} className="font-semibold text-[#0e7b5b] hover:underline">
                track your request
              </Link>
              .
            </p>
          )}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <SecondaryButton href={whatsappLink(reference ? `Hi, my reference is ${reference}.` : undefined)}>Message us on WhatsApp</SecondaryButton>
            <PrimaryButton href="/services">Browse services</PrimaryButton>
          </div>
        </div>

        <ol className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
          {NEXT_STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-[#d7e4de] bg-white p-5">
              <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#0e7b5b]">Step {i + 1}</span>
              <p className="mt-1 text-[17px] font-bold text-[#0f2a45]">{s.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[#4a5d68]">{s.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-center text-[15px] text-[#5b6e7a]">
          While you wait: read our <Link href="/guides" className="font-semibold text-[#0e7b5b] hover:underline">comparison guides</Link>, check the{" "}
          <Link href="/compliance-calendar" className="font-semibold text-[#0e7b5b] hover:underline">compliance calendar</Link>, or try our{" "}
          <Link href="/tools" className="font-semibold text-[#0e7b5b] hover:underline">free tax tools</Link>.
        </p>
      </section>
    </div>
  );
}
