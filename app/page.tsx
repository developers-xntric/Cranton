import Hero from "@/components/hero";
import Services from "@/components/services";
import StatsSection from "@/components/stats-section";
import BuildingBlocks from "@/components/building-blocks";
import ObstructionLighting from "@/components/obstruction-lighting";
import WhyChooseUs from "@/components/why-choose-us";
import InsightsSection from "@/components/insights-section";
import ContactSection from "@/components/contact-section";
import { ValueCard } from "@/components/about/value-card";
import HomeValue from "@/components/home-value";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <ObstructionLighting />
      <BuildingBlocks />
      <StatsSection />
      <WhyChooseUs />
      <HomeValue
        title="Modular Floating Platform System"
        image="/home/1.png"
        paragraphs={[
          "Our modular floating platform system is engineered to deliver versatile, durable, and scalable solutions for a wide range of water-based applications. Built using high-strength interlocking units, the system allows quick assembly and adaptability, making it ideal for both temporary and permanent installations.",
          "Originally developed for demanding environments, this solution now supports diverse use cases—from marinas and industrial platforms to leisure facilities and specialized operations. Its flexibility enables seamless deployment for work platforms, floating infrastructure, event setups, and even complex operational requirements. Designed for stability, low maintenance, and long-term performance, it provides a reliable foundation for projects that require efficiency both on and above water.",
        ]}
      />
      <HomeValue
        title="Engineered For Rapid Deployment & Operational Reliability"
        image="/home/2.png"
        reverse
        paragraphs={[
          "Our tactical portable helipad solutions are purpose-built to deliver safe, stable, and high-performance landing platforms in time-critical environments. Constructed using high-strength modular systems, they enable fast assembly and deployment with minimal site preparation. The interlocking design ensures structural integrity while maintaining flexibility for use across diverse terrains.",
          "Designed for both emergency and temporary operations, these systems provide exceptional load-bearing capacity, anti-skid safety surfaces, and long-term durability in demanding conditions. With integrated features supporting day and night visibility, Catobo’s portable helipad solutions ensure consistent, reliable performance—helping operators maintain seamless and secure helicopter operations wherever they are needed.",
        ]}
      />
      <InsightsSection />
      <ContactSection />
    </main>
  );
}
