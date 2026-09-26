import { CompareEntities } from "@/components/home/CompareEntities";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { HumanOverview } from "@/components/home/HumanOverview";
import { NextSteps } from "@/components/home/NextSteps";
import { PathPicker } from "@/components/home/PathPicker";
import { Pillars } from "@/components/home/Pillars";
import { PopularServices } from "@/components/home/PopularServices";
import { PricingClarity } from "@/components/home/PricingClarity";
import { Process } from "@/components/home/Process";
import { Proof } from "@/components/home/Proof";
import { WhyUs } from "@/components/home/WhyUs";
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
 * Services → Entity compare (AEO) → Paths → Process → Fee clarity →
 * Why us + docs → Marketplace → Human proof → After incorporation →
 * Reviews → FAQ
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularServices />
      <CompareEntities />
      <PathPicker />
      <Process />
      <PricingClarity />
      <WhyUs />
      <Pillars />
      <HumanOverview />
      <NextSteps />
      <Proof />
      <Faq />
    </>
  );
}
