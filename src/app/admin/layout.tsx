import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: { default: `Admin · ${siteConfig.brandName}`, template: `%s · Admin · ${siteConfig.brandName}` },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f6f8fb] text-[#0f172a]">{children}</div>;
}
