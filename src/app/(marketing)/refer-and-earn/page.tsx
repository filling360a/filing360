import { LeadForm } from "@/components/leads/LeadForm";
import { container, FaqList, PageHero, SectionHeading } from "@/components/site/PageShell";
import { company, hasValue, referralProgram as rp } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

const reward = hasValue(rp.referrerReward) ? rp.referrerReward : "a thank-you reward";
const discount = hasValue(rp.friendDiscount) ? rp.friendDiscount : "";

export const metadata = pageMetadata({
  title: "Refer & Earn — Recommend Filing360 to a Friend",
  description: `Know someone starting a business or filing taxes? Refer them to Filing360 and earn ${reward} when they become a client.`,
  path: "/refer-and-earn",
});

const STEPS = [
  { title: "Share their details", body: "Use the form with your friend's name and number — with their permission — and mention your own name and number in the note." },
  { title: "We take it from there", body: "An expert contacts them, understands what they need and shares a quote." },
  { title: "You get rewarded", body: `When they sign up and pay in full, you receive ${reward}${discount ? ` and they get ${discount}` : ""}.` },
];

export default function ReferPage() {
  const terms = [
    `A referral counts when the referred person becomes a new paying client within ${rp.validityDays} days of the referral and has not contacted us before.`,
    `The reward is paid ${rp.payoutAfterDays} days after the referred client's full payment, by UPI or bank transfer, after any refund window has closed.`,
    "Government fees and taxes are excluded from any percentage-based reward.",
    "Only refer people who have agreed to be contacted. We will tell them you referred them.",
    "Self-referrals, duplicate referrals and referrals from our employees or partners are not eligible.",
    "If the same person is referred by more than one person, the first valid referral counts.",
    "Rewards may be subject to TDS where applicable. We may ask for your PAN for payouts above the threshold.",
    `${company.brand} may change or end the program at any time; referrals already made before a change are honoured on the earlier terms.`,
  ];

  return (
    <div className="bg-[#f8fafc]">
      <PageHero
        eyebrow="Refer & earn"
        title={`Recommend us. Earn ${reward}.`}
        crumbs={[{ name: "Refer & earn", path: "/refer-and-earn" }]}
        intro={
          <p>
            Know a founder, freelancer or small business that needs a registration, GST or tax help? Introduce them to Filing360 — they get
            expert help{discount ? ` and ${discount}` : ""}, and you get rewarded when they become a client.
          </p>
        }
        aside={
          <LeadForm
            id="referral-lead"
            source="referral"
            extra="message"
            title="Refer a friend"
            subtitle="Enter your friend's details. Add your name and mobile in the note so we can reward you."
            submitLabel="Send referral"
            messagePlaceholder="Referred by: your name and mobile number"
          />
        }
      />

      <section className={`${container} py-12`}>
        <SectionHeading title="How it works" />
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
              <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#2563eb]">Step {i + 1}</span>
              <p className="mt-1 text-[17px] font-bold text-[#0b2c5e]">{s.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[#475569]">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${container} pb-12`}>
        <SectionHeading title="Program terms" />
        <ol className="article-body mt-5 list-decimal rounded-2xl border border-[#e2e8f0] bg-white p-6 pl-10">
          {terms.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      </section>

      <section className={`${container} pb-14`}>
        <SectionHeading title="Questions" />
        <div className="mt-5">
          <FaqList
            items={[
              { q: "Is there a limit on referrals?", a: "No. Refer as many people as you like — each valid referral earns a reward." },
              { q: "How will I know my referral converted?", a: "We'll message you when your referral becomes a client and again when your reward is paid." },
              { q: "Can existing clients refer?", a: "Yes. Existing clients are our best source of referrals." },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
