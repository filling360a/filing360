"use client";

import { usePathname } from "next/navigation";
import { whatsappLink } from "@/content/company";
import { siteConfig } from "@/lib/siteConfig";

const HIDE_ON = ["/book-consultation", "/thank-you", "/admin"];

/** Desktop-only floating contacts — mobile uses StickyLeadBar instead. */
export function FloatingContactButtons() {
  const pathname = usePathname();
  if (HIDE_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;

  const phoneHref = `tel:${siteConfig.contact.phoneTel}`;

  return (
    <div
      className="fab-stack pointer-events-none fixed bottom-6 right-5 z-[55] hidden flex-col items-center gap-4 md:flex"
      aria-label="Quick contact"
    >
      <a
        href={phoneHref}
        className="fab-btn fab-btn-call pointer-events-auto"
        aria-label={`Call ${siteConfig.contact.phoneDisplay}`}
      >
        <span className="fab-ring fab-ring-a" aria-hidden />
        <span className="fab-ring fab-ring-b" aria-hidden />
        <span className="fab-btn-face">
          <PhoneIcon />
        </span>
      </a>

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fab-btn fab-btn-wa pointer-events-auto"
        aria-label="Chat on WhatsApp"
      >
        <span className="fab-ring fab-ring-a" aria-hidden />
        <span className="fab-ring fab-ring-b" aria-hidden />
        <span className="fab-badge" aria-hidden>
          2
        </span>
        <span className="fab-btn-face">
          <WhatsAppIcon />
        </span>
      </a>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor" aria-hidden>
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.9Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[26px] w-[26px]" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.94.56 3.74 1.53 5.28L2 22l5.05-1.62a9.8 9.8 0 0 0 4.99 1.34h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.74 13.95c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.93-4.36-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.36.26-.29.57-.36.76-.36h.55c.17 0 .41-.07.64.49.24.58.81 2 .88 2.14.07.15.12.32.02.51-.1.19-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.19.73-.85.93-1.14.2-.29.39-.24.66-.15.26.1 1.68.79 1.96.94.29.14.48.22.55.34.07.12.07.71-.17 1.39Z" />
    </svg>
  );
}
