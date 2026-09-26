import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust & disclaimer",
  description: `${siteConfig.brandName} is a private facilitation platform — not a government website.`,
};

export default function TrustPage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <h1 className="font-display text-4xl tracking-tight text-ink md:text-5xl">
          Trust & disclaimer
        </h1>
        <div className="prose-brand mt-8">
          <p>
            <strong className="font-medium text-ink">
              This is not a government website.
            </strong>{" "}
            {siteConfig.brandName} is a private organisation providing
            technology-enabled process facilitation for business registrations
            and compliance in India.
          </p>
          <p>
            Registrations, licenses, and certificates are issued solely by the
            relevant government authorities. Timelines depend on document
            completeness, resubmissions, and portal or administrative delays.
          </p>
          <p>
            {siteConfig.brandName} is not a substitute for advice from an
            Advocate, Chartered Accountant, or Company Secretary. Services that
            require statutory representation are performed only by independent,
            qualified professionals as applicable.
          </p>
          <p>
            Fees charged by {siteConfig.brandName} are facilitative and
            administrative. Government fees are payable to authorities and are
            shown separately wherever prices appear.
          </p>
          <p>
            No assurance or guarantee regarding registration outcomes is given
            or implied.
          </p>
        </div>
        <p className="mt-10 text-sm text-ink-muted">
          Questions?{" "}
          <Link href="/about" className="text-seal hover:text-seal-deep">
            Contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
