"use client";

import Link from "next/link";
import { useEffect } from "react";
import { siteConfig } from "@/lib/siteConfig";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-background px-5 py-16 text-center">
      <p className="font-display text-6xl text-seal/40">Oops</p>
      <h1 className="mt-4 font-display text-3xl text-ink">Something went wrong</h1>
      <p className="mt-2 max-w-md text-ink-muted">
        A temporary problem stopped this page from loading. Please try again — if it keeps happening, call us on{" "}
        <a href={`tel:${siteConfig.contact.phoneTel}`} className="font-semibold text-ink underline">
          {siteConfig.contact.phone}
        </a>
        .
      </p>
      {error.digest && <p className="mt-2 text-[13px] text-ink-muted">Error reference: {error.digest}</p>}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex h-11 items-center rounded-xl bg-seal px-5 text-[15px] font-semibold text-white hover:bg-seal-deep"
        >
          Try again
        </button>
        <Link href="/" className="inline-flex h-11 items-center rounded-xl border border-line px-5 text-[15px] font-semibold text-ink hover:border-seal">
          Go home
        </Link>
      </div>
    </div>
  );
}
