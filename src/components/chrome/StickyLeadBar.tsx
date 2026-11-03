"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappLink } from "@/content/company";
import { siteConfig } from "@/lib/siteConfig";

export function StickyLeadBar() {
  const pathname = usePathname();
  if (pathname === "/book-consultation" || pathname === "/thank-you") return null;

  return (
    <div className="sticky-lead-bar fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="border-t border-[#cfe0d9] bg-white/95 px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-10px_30px_-18px_rgba(15,42,69,0.35)] backdrop-blur-md">
        <div className="flex items-center gap-2">
          <a
            href={`tel:${siteConfig.contact.phoneTel}`}
            className="sticky-lead-btn sticky-lead-call group"
            aria-label={`Call ${siteConfig.contact.phoneDisplay}`}
          >
            <span className="sticky-lead-icon sticky-lead-icon-call">
              <PhoneIcon />
            </span>
            <span>Call</span>
          </a>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="sticky-lead-btn sticky-lead-wa group"
            aria-label="Chat on WhatsApp"
          >
            <span className="sticky-lead-icon sticky-lead-icon-wa">
              <WhatsAppIcon />
              <span className="sticky-lead-dot" aria-hidden />
            </span>
            <span>WhatsApp</span>
          </a>

          <Link
            href={pathname === "/" ? "#hero-lead" : "/book-consultation"}
            className="sticky-lead-btn sticky-lead-quote group"
          >
            <span>Free quote</span>
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 transition group-active:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              aria-hidden
            >
              <path d="M5 12h12M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.9Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.94.56 3.74 1.53 5.28L2 22l5.05-1.62a9.8 9.8 0 0 0 4.99 1.34h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.74 13.95c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.93-4.36-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.36.26-.29.57-.36.76-.36h.55c.17 0 .41-.07.64.49.24.58.81 2 .88 2.14.07.15.12.32.02.51-.1.19-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.19.73-.85.93-1.14.2-.29.39-.24.66-.15.26.1 1.68.79 1.96.94.29.14.48.22.55.34.07.12.07.71-.17 1.39Z" />
    </svg>
  );
}
