import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From DSC and name approval through SPICe+ filing to your certificate of incorporation.",
};

const steps = [
  {
    title: "Digital Signature Certificate (DSC)",
    body: "Directors sign MCA forms electronically. We guide application, video KYC where required, and token delivery.",
  },
  {
    title: "Name approval",
    body: "We check availability against MCA guidelines and trademarks, then file RUN / SPICe+ Part A.",
  },
  {
    title: "SPICe+ / FiLLiP filing",
    body: "MOA, AOA, and incorporation forms prepared and submitted with linked PAN, TAN, and EPFO/ESIC where opted.",
  },
  {
    title: "Certificate of Incorporation",
    body: "On approval you receive COI, PAN, and TAN. Next: bank account and optional GST or trademark.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-paper">
      <div className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <h1 className="font-display text-4xl tracking-tight text-ink md:text-5xl">
            How incorporation moves
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-muted">
            A visual of the standard India company path. Timelines shift with
            MCA queries — we tell you when that happens.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <ol className="relative space-y-0 border-l border-line md:ml-4">
          {steps.map((step, i) => (
            <li key={step.title} className="relative pb-12 pl-8 last:pb-0">
              <span
                className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-seal"
                aria-hidden
              />
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-seal">
                Step {i + 1}
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-tight text-ink">
                {step.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 border border-line bg-ink p-8 text-paper md:p-10">
          <h2 className="font-display text-3xl tracking-tight">
            Ready when your docs are
          </h2>
          <p className="mt-3 max-w-lg text-white/70">
            Start with Private Limited, LLP, or OPC — or ask an expert which
            structure fits.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="on-dark" href="/services/business-registration">
              Business registration
            </Button>
            <Button variant="on-dark-ghost" href="/about">
              {siteConfig.cta.expert}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
