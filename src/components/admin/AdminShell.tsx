"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { signOut } from "@/app/admin/(auth)/actions";
import { siteConfig } from "@/lib/siteConfig";
import { Logo } from "@/components/chrome/Logo";

type Icon = "home" | "leads" | "blog" | "careers" | "team";

const icons: Record<Icon, ReactNode> = {
  home: <path d="M3 11.5 12 4l9 7.5M5 10v10h5v-6h4v6h5V10" />,
  leads: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.9-3.6 3.5-5.5 6.5-5.5s5.6 1.9 6.5 5.5M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.8c1.6.8 2.6 2.5 3 5.2" />
    </>
  ),
  blog: <path d="M5 4h10l4 4v12H5zM15 4v4h4M8.5 12h7M8.5 16h7M8.5 8h3" />,
  careers: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  team: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.1-3.8 3.8-6 7-6s5.9 2.2 7 6" />
    </>
  ),
};

type Props = {
  nav: { href: string; label: string; icon: Icon }[];
  user: { name: string; email: string; role: string };
  children: ReactNode;
};

export function AdminShell({ nav, user, children }: Props) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const links = nav.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={isActive(item.href) ? "page" : undefined}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-semibold transition ${
        isActive(item.href) ? "bg-white/12 text-white" : "text-white/65 hover:bg-white/8 hover:text-white"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {icons[item.icon]}
      </svg>
      {item.label}
    </Link>
  ));

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[232px_1fr]">
      <aside className="hidden flex-col bg-[#0b2c5e] px-3 py-5 lg:sticky lg:top-0 lg:flex lg:h-screen">
        <Link href="/admin" className="mb-6 flex items-center rounded-lg bg-white px-2 py-1" aria-label={`${siteConfig.brandName} admin`}>
          <Logo className="h-9 w-auto" />
        </Link>
        <nav className="flex flex-1 flex-col gap-1" aria-label="Admin">{links}</nav>
        <div className="border-t border-white/10 pt-4">
          <Link href="/admin/account" className="block rounded-lg px-2 py-1.5 hover:bg-white/8">
            <p className="truncate text-[13px] font-semibold text-white">{user.name}</p>
            <p className="truncate text-[12px] text-white/55">{user.role} · {user.email}</p>
          </Link>
          <div className="mt-2 flex gap-1 px-1">
            <Link href="/" target="_blank" className="rounded-md px-2 py-1 text-[12px] font-medium text-white/60 hover:bg-white/8 hover:text-white">
              View site ↗
            </Link>
            <form action={signOut}>
              <button type="submit" className="rounded-md px-2 py-1 text-[12px] font-medium text-white/60 hover:bg-white/8 hover:text-white">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-30 bg-[#0b2c5e] lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/admin" className="flex items-center rounded-md bg-white px-1.5 py-0.5" aria-label={`${siteConfig.brandName} admin`}>
            <Logo className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/admin/account" className="rounded-md px-2 py-1 text-[12px] font-medium text-white/75">
              {user.name.split(" ")[0]}
            </Link>
            <form action={signOut}>
              <button type="submit" className="rounded-md px-2 py-1 text-[12px] font-medium text-white/75">Sign out</button>
            </form>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-2 [scrollbar-width:none]" aria-label="Admin">{links}</nav>
      </header>

      <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-[1280px]">{children}</div>
      </main>
    </div>
  );
}
