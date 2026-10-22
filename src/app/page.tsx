import { ExperienceStrip } from "@/components/sections/ExperienceStrip";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExperienceStrip />
      <FeaturedWork />
    </>
  );
}
