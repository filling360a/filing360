"use client";

import { useMemo, useState } from "react";
import { BannerEditor } from "@/components/admin/banners/BannerEditor";
import { inputClass } from "@/components/admin/ui";
import type { ResolvedBanner } from "@/lib/banners/defaults";

export function PageBannersPanel({ banners }: { banners: ResolvedBanner[] }) {
  const [q, setQ] = useState("");
  const [section, setSection] = useState("all");

  const sections = useMemo(() => {
    const set = new Set<string>();
    for (const b of banners) if (b.section) set.add(b.section);
    return ["all", ...Array.from(set)];
  }, [banners]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return banners.filter((b) => {
      if (section !== "all" && b.section !== section) return false;
      if (!needle) return true;
      return (
        b.label.toLowerCase().includes(needle) ||
        b.pagePath.toLowerCase().includes(needle) ||
        (b.section ?? "").toLowerCase().includes(needle)
      );
    });
  }, [banners, q, section]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by page name or URL…"
          aria-label="Search banners"
          className={`${inputClass} sm:!w-72`}
        />
        <p className="text-[13px] text-[#5b6e7a]">
          Showing <span className="font-semibold text-[#0f2a45]">{filtered.length}</span> of {banners.length} pages
        </p>
      </div>

      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
        {sections.map((s) => {
          const active = section === s;
          const count = s === "all" ? banners.length : banners.filter((b) => b.section === s).length;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setSection(s)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition ${
                active ? "bg-[#0f2a45] text-white" : "border border-[#d7e4de] bg-white text-[#2c3f4e] hover:border-[#8ecfbc]"
              }`}
            >
              {s === "all" ? "All" : s}
              <span className={`rounded-full px-1.5 text-[11px] ${active ? "bg-white/20" : "bg-[#d7e4de]"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {!filtered.length ? (
        <p className="rounded-2xl border border-[#d7e4de] bg-white px-5 py-8 text-center text-[14px] text-[#5b6e7a]">
          No pages match that search.
        </p>
      ) : (
        <div className="space-y-5">
          {filtered.map((banner) => (
            <BannerEditor key={banner.key} banner={banner} />
          ))}
        </div>
      )}
    </div>
  );
}
