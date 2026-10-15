"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappLink } from "@/content/company";
import { siteConfig } from "@/lib/siteConfig";

export function StickyLeadBar() {
  const pathname = usePathname();
  if (pathname === "/book-consultation" || pathname === "/thank-you") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e2e8f0] bg-white/95 p-3 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
          className="flex h-11 flex-1 items-center justify-center rounded-xl border border-[#c7d7ee] text-[15px] font-semibold text-[#0b2c5e]"
        >
          Call
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 flex-1 items-center justify-center rounded-xl border border-[#bbf7d0] text-[15px] font-semibold text-[#15803d]"
        >
          WhatsApp
        </a>
        <Link
          href={pathname === "/" ? "#hero-lead" : "/book-consultation"}
          className="flex h-11 flex-[1.6] items-center justify-center rounded-xl bg-[#0b2c5e] text-[15px] font-semibold text-white"
        >
          Free quote
        </Link>
      </div>
    </div>
  );
}
