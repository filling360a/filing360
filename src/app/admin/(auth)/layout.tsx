import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { Logo } from "@/components/chrome/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <Link href="/" className="mb-8 flex items-center gap-3" aria-label={`${siteConfig.brandName} home`}>
        <Logo priority className="h-12 w-auto" />
        <span className="border-l border-[#d7e4de] pl-3 text-lg font-medium text-[#5b6e7a]">Admin</span>
      </Link>
      <div className="w-full max-w-[400px] rounded-2xl border border-[#d7e4de] bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)] sm:p-8">
        {children}
      </div>
    </div>
  );
}
