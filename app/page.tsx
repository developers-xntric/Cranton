import Hero from "@/components/hero";
import Services from "@/components/services";
import StatsSection from "@/components/stats-section";
import BuildingBlocks from "@/components/building-blocks";
import ObstructionLighting from "@/components/obstruction-lighting";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <StatsSection />
      <ObstructionLighting />
      <BuildingBlocks />
    </main>
  );
}

