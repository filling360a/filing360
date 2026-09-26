"use client";

import { siteConfig } from "@/lib/siteConfig";

export function StickyLeadBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e2e8f0] bg-white/95 p-3 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
          className="flex h-11 flex-1 items-center justify-center rounded-xl border border-[#c7d7ee] text-sm font-semibold text-[#0b2c5e]"
        >
          Call
        </a>
        <a
          href="#hero-lead"
          className="flex h-11 flex-[2] items-center justify-center rounded-xl bg-[#0b2c5e] text-sm font-semibold text-white"
        >
          Free quote
        </a>
      </div>
    </div>
  );
}
