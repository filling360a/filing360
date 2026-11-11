import { BannerCarousel } from "@/components/home/BannerCarousel";
import { CompareEntities } from "@/components/home/CompareEntities";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { KnowledgeHub } from "@/components/home/KnowledgeHub";
import { NextSteps } from "@/components/home/NextSteps";
import { PopularServices } from "@/components/home/PopularServices";
import { Process } from "@/components/home/Process";
import { Proof } from "@/components/home/Proof";
import { SpotlightBanner } from "@/components/home/SpotlightBanner";
import { getHomeHeroSlides } from "@/lib/banners/store";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Online Company Registration, GST & ITR Filing in India | Filing360",
  description:
    "Register a Private Limited, LLP or OPC online. File GST and ITR with CA experts, transparent fees and pan-India support — from Filing360.",
  path: "/",
  absoluteTitle: true,
  keywords: [
    "company registration India",
    "private limited company registration",
    "GST registration",
    "ITR filing",
    "MCA compliance",
  ],
});

/**
 * Post-hero order researched to beat RegisterKaro, IndiaFilings, Zolvit, Rize:
 * Services → Entity compare (AEO) → Process → After incorporation →
 * Knowledge Hub → Reviews → FAQ
 */
export default async function HomePage() {
  const slides = await getHomeHeroSlides();
  return (
    <>
      <Hero slides={slides} />
      <PopularServices />
      <CompareEntities />
      <BannerCarousel />
      <Process />
      <NextSteps />
      <SpotlightBanner />
      <KnowledgeHub />
      <Proof />
      <Faq />
    </>
  );
}
