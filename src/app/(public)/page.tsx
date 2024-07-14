import { CallToAction } from "@/app/_components/CallToAction";
import { Faqs } from "@/app/_components/Faqs";

import { Hero } from "@/app/_components/Hero";
import { Pricing } from "@/app/_components/Pricing";
import { PrimaryFeatures } from "@/app/_components/PrimaryFeatures";
import { SecondaryFeatures } from "@/app/_components/SecondaryFeatures";
import { Testimonials } from "@/app/_components/Testimonials";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
    </>
  );
}
