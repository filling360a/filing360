"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappLink } from "@/content/company";
import { siteConfig } from "@/lib/siteConfig";

export function StickyLeadBar() {
  const pathname = usePathname();
  if (pathname === "/book-consultation" || pathname === "/thank-you") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d7e4de] bg-white/95 p-3 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
          className="flex h-11 flex-1 items-center justify-center rounded-xl border border-[#c5e8dc] text-[15px] font-semibold text-[#0f2a45]"
        >
          Call
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 flex-1 items-center justify-center rounded-xl border border-[#c5e8dc] text-[15px] font-semibold text-[#0b6550]"
        >
          WhatsApp
        </a>
        <Link
          href={pathname === "/" ? "#hero-lead" : "/book-consultation"}
          className="flex h-11 flex-[1.6] items-center justify-center rounded-xl bg-[#0e7b5b] text-[15px] font-semibold text-white"
        >
          Free quote
        </Link>
      </div>
    </div>
  );
}
