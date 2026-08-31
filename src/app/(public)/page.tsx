import { Hero } from "@/components/public/Hero";
import { Marquee } from "@/components/public/Marquee";
import { Stats } from "@/components/public/Stats";
import { Problem } from "@/components/public/Problem";
import { Services } from "@/components/public/Services";
import { FeaturedWork } from "@/components/public/FeaturedWork";
import { Packages } from "@/components/public/Packages";
import { Process } from "@/components/public/Process";
import { WhyMe } from "@/components/public/WhyMe";
import { FAQ } from "@/components/public/FAQ";
import { FinalCta } from "@/components/public/FinalCta";
import { dictionary } from "@/lib/dictionary";
import {
  getFeaturedProjects,
  getServices,
  getPackages,
  getSettings,
} from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, services, packages, settings] = await Promise.all([
    getFeaturedProjects(),
    getServices(),
    getPackages(),
    getSettings(),
  ]);

  return (
    <>
      <Hero isAvailable={settings.is_available} />
      <Marquee items={dictionary.marquee.words} />
      <Stats />
      <Problem />
      <Services services={services} />
      <FeaturedWork projects={featured} />
      <Packages packages={packages} />
      <Process />
      <WhyMe />
      <FAQ />
      <Marquee items={dictionary.marquee.words} className="border-y-0 border-t" />
      <FinalCta />
    </>
  );
}
