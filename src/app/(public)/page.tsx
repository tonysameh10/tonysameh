import { Hero } from "@/components/public/Hero";
import { Stats } from "@/components/public/Stats";
import { Problem } from "@/components/public/Problem";
import { Services } from "@/components/public/Services";
import { FeaturedWork } from "@/components/public/FeaturedWork";
import { Packages } from "@/components/public/Packages";
import { Process } from "@/components/public/Process";
import { WhyMe } from "@/components/public/WhyMe";
import { FAQ } from "@/components/public/FAQ";
import { FinalCta } from "@/components/public/FinalCta";

export default function HomePage() {
  // TODO: Phase 5 - replace with Supabase queries
  const isAvailable = true;

  return (
    <>
      <Hero isAvailable={isAvailable} />
      <Stats />
      <Problem />
      <Services />
      <FeaturedWork />
      <Packages />
      <Process />
      <WhyMe />
      <FAQ />
      <FinalCta />
    </>
  );
}
