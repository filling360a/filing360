import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const LINKS = [
  ["All services", "/services"],
  ["Pricing", "/pricing"],
  ["Free tax tools", "/tools"],
  ["Compliance calendar", "/compliance-calendar"],
  ["Track your request", "/track"],
  ["Contact us", "/contact"],
] as const;

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-paper px-5 py-16 text-center">
      <p className="font-display text-6xl text-seal/40">404</p>
      <h1 className="mt-4 font-display text-3xl text-ink">Page not found</h1>
      <p className="mt-2 max-w-md text-ink-muted">
        The page you&apos;re looking for has moved or doesn&apos;t exist. These might help:
      </p>
      <ul className="mt-6 flex max-w-xl flex-wrap justify-center gap-2.5">
        {LINKS.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-[15px] font-medium text-ink hover:border-seal hover:text-seal">
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/" className="mt-8 text-[15px] font-medium text-seal hover:text-seal-deep">
        Back to {siteConfig.brandName} home
      </Link>
    </div>
  );
}
