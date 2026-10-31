import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Analytics, CookieBanner } from "@/components/site/Consent";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const verificationOther: Record<string, string> = {};
if (process.env.BING_SITE_VERIFICATION) verificationOther["msvalidate.01"] = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url),
  title: {
    default: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.brandName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.brandName,
  openGraph: {
    type: "website",
    siteName: siteConfig.brandName,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: Object.keys(verificationOther).length ? verificationOther : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f2a45",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink">
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
