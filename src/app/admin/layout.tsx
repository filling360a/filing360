import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: { default: `Admin · ${siteConfig.brandName}`, template: `%s · Admin · ${siteConfig.brandName}` },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f3f7fa] text-[#0f2a45]">{children}</div>;
}
