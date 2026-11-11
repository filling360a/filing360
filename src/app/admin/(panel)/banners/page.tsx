import type { Metadata } from "next";
import Link from "next/link";
import { BannerEditor } from "@/components/admin/banners/BannerEditor";
import { PageHeader } from "@/components/admin/ui";
import { requireStaff } from "@/lib/auth/dal";
import { BANNER_SPECS } from "@/lib/banners/defaults";
import { listResolvedBanners } from "@/lib/banners/store";

export const metadata: Metadata = { title: "Banners" };

export default async function BannersAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  await requireStaff("banners");
  const { tab } = await searchParams;
  const active = tab === "pages" ? "pages" : "home";
  const banners = await listResolvedBanners(active === "home" ? "home_hero" : "page");
  const specs = active === "home" ? BANNER_SPECS.home_hero : BANNER_SPECS.page;

  return (
    <>
      <PageHeader
        title="Banners"
        description="Update homepage hero slides and service-page banners. The lead form always stays in the same place."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        <Tab href="/admin/banners" active={active === "home"}>
          Home hero
        </Tab>
        <Tab href="/admin/banners?tab=pages" active={active === "pages"}>
          Other pages
        </Tab>
      </div>

      <div className="mb-5 rounded-2xl border border-[#d4ede4] bg-[#e8f6f1] px-4 py-3 text-[13.5px] leading-relaxed text-[#145a45]">
        <p className="font-semibold text-[#0f3f32]">
          {active === "home" ? "Home hero specs" : "Other page banner specs"}
        </p>
        <p>
          Recommended size: <strong>{specs.sizeHint}</strong> · Ratio: <strong>{specs.ratioHint}</strong> · Max{" "}
          {specs.maxMb} MB
        </p>
        <p className="mt-0.5">{specs.note}</p>
      </div>

      <div className="space-y-5">
        {banners.map((banner) => (
          <BannerEditor key={banner.key} banner={banner} />
        ))}
      </div>
    </>
  );
}

function Tab({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex h-10 items-center rounded-xl px-4 text-[14px] font-semibold transition ${
        active ? "bg-[#0f2a45] text-white" : "border border-[#d7e4de] bg-white text-[#2c3f4e] hover:border-[#8ecfbc]"
      }`}
    >
      {children}
    </Link>
  );
}
