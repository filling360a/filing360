import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-paper px-5 text-center">
      <p className="font-display text-6xl text-seal/40">404</p>
      <h1 className="mt-4 font-display text-3xl text-ink">Page not found</h1>
      <p className="mt-2 max-w-md text-ink-muted">
        That route is not in the {siteConfig.brandName} catalog.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm font-medium text-seal hover:text-seal-deep"
      >
        Back home
      </Link>
    </div>
  );
}
