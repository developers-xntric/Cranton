import Hero from "@/components/hero";
import Services from "@/components/services";
import StatsSection from "@/components/stats-section";
import BuildingBlocks from "@/components/building-blocks";
import ObstructionLighting from "@/components/obstruction-lighting";
import WhyChooseUs from "@/components/why-choose-us";
import InsightsSection from "@/components/insights-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <ObstructionLighting />
      <BuildingBlocks />
      <StatsSection />
      <WhyChooseUs />
      <InsightsSection  />
    </main>
  );
}

