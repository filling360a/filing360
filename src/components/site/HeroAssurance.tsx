import { siteConfig } from "@/lib/siteConfig";

const { rating, reviewsLabel, businesses, callbackMins } = siteConfig.socialProof;

const steps = [
  { title: "Share your details", body: "Fill the form or give us a call" },
  { title: "Talk to an expert", body: `Callback within ${callbackMins} minutes` },
  { title: "We handle the filing", body: "Track every step online" },
];

/** Fills the space beside a hero lead form with process + trust signals. */
export function HeroAssurance({ className = "" }: { className?: string }) {
  return (
    <div
      className={`max-w-2xl rounded-2xl border border-[#dbeafe] bg-white/85 p-5 shadow-[0_14px_34px_-24px_rgba(15,23,42,0.35)] backdrop-blur lg:p-6 ${className}`}
    >
      <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#64748b]">How it works</p>
      <ol className="mt-3.5 grid grid-cols-3 gap-4">
        {steps.map((s, i) => (
          <li key={s.title} className="relative min-w-0">
            {i < steps.length - 1 && (
              <span className="absolute left-10 -right-3 top-4 h-px bg-[#bfdbfe]" aria-hidden />
            )}
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#2563eb] text-[13px] font-bold text-white shadow-[0_6px_14px_-6px_rgba(37,99,235,0.8)]">
              {i + 1}
            </span>
            <p className="mt-2.5 text-[14.5px] font-bold leading-snug text-[#0b2c5e]">{s.title}</p>
            <p className="mt-0.5 text-[13px] leading-snug text-[#64748b]">{s.body}</p>
          </li>
        ))}
      </ol>

      <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#eef2f7] pt-4 text-[13.5px] text-[#475569]">
        <li className="flex items-center gap-1.5">
          <span className="flex text-[#f59e0b]" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
              </svg>
            ))}
          </span>
          <span>
            <strong className="font-bold text-[#0b2c5e]">{rating}</strong> · {reviewsLabel}
          </span>
        </li>
        <li className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 21h16M6 21V9l6-4 6 4v12M10 21v-5h4v5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>
            <strong className="font-bold text-[#0b2c5e]">{businesses}</strong> businesses served
          </span>
        </li>
        <li className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#16a34a]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
          </svg>
          <span>Confidential &amp; secure</span>
        </li>
      </ul>
    </div>
  );
}
