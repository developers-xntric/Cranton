import DynamicHero from "@/components/dynamic-hero";
import ReliableSurveillance from "@/components/reliable-surveillance";
import FourCards from "@/components/about/four-cards";
import BlackSplitSection from "@/components/activities-aircraft/black-split-section";
import SingleSplitSection from "@/components/activities-aircraft/single-split-section";
import InstallationProcess from "@/components/installation-process";
import IndustriesServe from "@/components/industries-serve";
import Faqs from "@/components/faqs";
import CTASection from "@/components/cta-section";
import { obstructionLightingSolutionsFaqs } from "@/lib/solution-faqs";

const ObstructionLightingSolutions = () => {
  return (
    <div>
      <DynamicHero
        title={"Obstruction Lighting Solutions"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Obstruction Lighting Solutions" },
        ]}
        backgroundImage={"/obstruction-lighting/hero.png"}
      />

      <ReliableSurveillance
        title="Obstruction Lighting Solutions for Safer Airspace"
        description="Cranton obstruction lighting solutions are engineered to mark tall structures and potential hazards, helping pilots maintain safe navigation in all conditions. Designed for reliability and long-term performance, our systems support aviation safety across a wide range of environments."
        image="/obs-main1.png"
        buttonText="Request a Quote"
        buttonHref="/contact"
      />

      <FourCards
        isBlack={true}
        heading="Engineered for Performance & Reliability"
        para=""
        features={[
          {
            icon: "/portable-lighting/1.png",
            title: "High-Visibility Aviation Warning Systems",
            desc: "Designed to provide clear and reliable obstruction marking for enhanced airspace safety.",
          },
          {
            icon: "/portable-lighting/2.png",
            title: "Durable Weather-Resistant Construction",
            desc: "Built to perform in harsh offshore, industrial, coastal, and remote environmental conditions.",
          },
          {
            icon: "/portable-lighting/3.png",
            title: "Energy-Efficient LED Technology",
            desc: "Advanced LED systems deliver long operational life with low power consumption and minimal maintenance.",
          },
          {
            icon: "/portable-lighting/4.png",
            title: "Compliant & Reliable Operation",
            desc: "Engineered to meet international aviation obstruction lighting standards for dependable continuous performance.",
          },
        ]}
      />

      <BlackSplitSection
        isBlack={false}
        sections={[
          {
            id: "low-intensity",
            title: "Low Intensity Obstruction Lights",
            model: "For Close-Range Visibility & Marking",
            description:
              "Low intensity lights are designed for structures with lower heights or where close-range visibility is required. These lights provide steady illumination to clearly mark obstacles in urban and controlled environments.",
            features: [
              "Energy-efficient LED technology",
              "Continuous (steady) lighting output",
              "Compact and low-maintenance design",
              "Suitable for low-height structures",
            ],
            image: "/obstruction-lighting/low-intensity.png",
            imageAlt: "Low Intensity Obstruction Light",
          },
          {
            id: "medium-intensity",
            title: "Medium Intensity Obstruction Lights",
            model: "Balanced Visibility for Mid-Height Structures",
            description:
              "Medium intensity lights provide higher brightness and are typically used on structures of moderate height. They offer flashing or steady modes to enhance visibility during both day and night operations.",
            features: [
              "High-visibility flashing or steady modes",
              "Designed for mid-range obstruction marking",
              "Day and night operational capability",
              "Durable and weather-resistant",
            ],
            image: "/obstruction-lighting/medium-intensity.png",
            imageAlt: "Dual Mode Obstruction Light",
          },
        ]}
      />
      <BlackSplitSection
        sections={[
          {
            id: "high-intensity",
            title: "High Intensity Obstruction Lights",
            model: "Maximum Visibility for Tall Structures",
            description:
              "High intensity obstruction lights are used for very tall structures where maximum visibility is critical. These systems ensure long-range detection and are essential for aviation safety in complex environments.",
            features: [
              "Ultra-high intensity output",
              "Daytime and nighttime visibility",
              "Advanced control and monitoring systems",
              "Designed for critical infrastructure",
            ],
            image: "/activities-aircraft/day-night.png",
            imageAlt: "Medium Intensity Obstruction Light",
          },
          {
            id: "solar-obstruction",
            title: "Solar-Powered Obstruction Lights",
            model: "Energy-Efficient & Independent Operation",
            description:
              "Solar obstruction lights provide a sustainable solution by operating independently of grid power. Ideal for remote locations, they ensure continuous operation using solar energy and battery storage.",
            features: [
              "Solar-powered with battery backup",
              "No external power required",
              "Easy installation and low maintenance",
              "Environmentally friendly solution",
            ],
            image: "/activities-aircraft/maximumrange.png",
            imageAlt: "High Intensity Obstruction Light",
          },
        ]}
      />

      <SingleSplitSection
        id="dual-lighting"
        isBlack={false}
        title="LED Obstruction Lighting Systems"
        model="Advanced Technology for Long-Term Performance"
        description="LED-based obstruction lighting systems deliver superior efficiency, longer lifespan, and consistent performance. They are the preferred choice for modern aviation safety applications."
        features={[
          "Long operational life",
          "Low power consumption",
          "High reliability",
          "Minimal maintenance",
        ]}
        image="/obstruction-lighting/2.png"
        imageAlt="Aviation Warning Light"
      />

      <InstallationProcess
        title="Built for Reliability & Compliance"
        description="Our obstruction lighting systems are engineered to perform in harsh environments while maintaining consistent visibility and operational efficiency."
        steps={[
          {
            id: "01",
            title: "High-Intensity LED Technology",
            desc: "Delivers powerful illumination for maximum visibility in all conditions while maintaining energy efficiency.",
            image: "/obstruction-lighting/step1.png",
          },
          {
            id: "02",
            title: "Weather & Corrosion-Resistant Design",
            desc: "Built to withstand harsh environmental conditions, ensuring reliable performance over time.",
            image: "/obstruction-lighting/step2.png",
          },
          {
            id: "03",
            title: "Long Operational Lifespan",
            desc: "Engineered for extended use, reducing the need for frequent replacements.",
            image: "/obstruction-lighting/step3.png",
          },
          {
            id: "04",
            title: "Low Maintenance Requirements",
            desc: "Designed for minimal upkeep, helping reduce operational costs and downtime.",
            image: "/obstruction-lighting/step4.png",
          },
        ]}
      />

      <IndustriesServe
        badge=""
        heading="Where It's Used"
        industries={[
          { name: "High-rise buildings", image: "/portable-lighting/use1.png" },
          {
            name: "Communication towers",
            image: "/portable-lighting/use2.png",
          },
          { name: "Industrial plants", image: "/portable-lighting/use3.png" },
          {
            name: "Bridges and infrastructure",
            image: "/portable-lighting/use4.png",
          },
          {
            name: "Wind turbines and cranes",
            image: "/portable-lighting/use1.png",
          },
        ]}
      />

      <Faqs
        heading="Frequently Asked Questions"
        description=""
        faqs={obstructionLightingSolutionsFaqs}
        showNumbers={true}
        assistanceHeading="Need Help ?"
        assistanceDescription="Our lighting specialists are ready to help you select the perfect obstruction lighting solution for your operational needs."
        contactPhone="+44 191 640 75 03"
        contactEmail="info@crantonelectric.com"
        image="/faqs/5.png"
      />

      <CTASection
        heading={"Need an Obstruction Lighting Solution?"}
        description={
          "Tell us about your project requirements and our experts will help you design the right solution for your operational needs."
        }
        buttonText={"Request a Quote"}
        buttonHref={"/contact"}
      />
    </div>
  );
};

export default ObstructionLightingSolutions;
