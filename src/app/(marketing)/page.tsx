import { BannerCarousel } from "@/components/home/BannerCarousel";
import { CompareEntities } from "@/components/home/CompareEntities";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { NextSteps } from "@/components/home/NextSteps";
import { PopularServices } from "@/components/home/PopularServices";
import { Process } from "@/components/home/Process";
import { Proof } from "@/components/home/Proof";
import { SpotlightBanner } from "@/components/home/SpotlightBanner";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `${siteConfig.brandName} — Online Company Registration & Compliance in India`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.brandName} — Register your company online in India`,
    description: siteConfig.description,
    type: "website",
  },
};

/**
 * Post-hero order researched to beat RegisterKaro, IndiaFilings, Zolvit, Rize:
 * Services → Entity compare (AEO) → Process → After incorporation →
 * Reviews → FAQ
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularServices />
      <CompareEntities />
      <BannerCarousel />
      <Process />
      <NextSteps />
      <SpotlightBanner />
      <Proof />
      <Faq />
    </>
  );
}
