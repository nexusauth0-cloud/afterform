import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { Ticker } from "@/components/layout/ticker";
import { AcquireSection } from "@/components/product/acquire-section";
import { ProductInspector } from "@/components/product/product-inspector";
import { StorySection } from "@/components/story/story-section";
import { TechSpecs } from "@/components/tech/tech-specs";
import { Lookbook } from "@/components/lookbook/lookbook";
import { WaitlistSection } from "@/components/waitlist/waitlist-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <AcquireSection />
      <ProductInspector />
      <StorySection />
      <TechSpecs />
      <Lookbook />
      <WaitlistSection />
    </>
  );
}
