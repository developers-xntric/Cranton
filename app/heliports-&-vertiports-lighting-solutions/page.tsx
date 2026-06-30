import DynamicHero from "@/components/dynamic-hero";
import Faqs from "@/components/faqs";
import HvGrey from "@/components/hv-grey";
import HvLeftRight from "@/components/hv-left-right";
import ITValueCard from "@/components/it-value-card";
import { heliportsVertiportsLightingSolutionsFaqs } from "@/lib/solution-faqs";
import ThreeCards from "@/components/three-cards";
import Urban from "@/components/urban";
import { getStoryblokStoryContent } from "@/lib/storyblok";
import { mapStoryblokContent } from "@/lib/storyblok-mappers";

const fallbackContent = {
  hero: { title: "Heliports & Vertiports Lighting Solutions", backgroundImage: "/heliport-vertiports/hero.png" },
  intro: {
    btn: "Inquire Now",
    title: "Heliports & Vertiports Lighting Solutions",
    subtitle: "Smart, Safe & Future-Ready Air Mobility Infrastructure",
    description1: "Crantron delivers advanced lighting systems engineered for modern heliports and next-generation vertiports. Designed to meet international aviation standards, our solutions ensure maximum visibility, operational safety, and energy efficiency across all landing environments day or night.",
    description2: "From precision landing guidance to environmental awareness, our lighting portfolio supports safe aircraft operations in even the most demanding conditions.",
    image2: "/heliport-vertiports/right1.jpg",
    image1: "/heliport-vertiports/newleft.png",
  },
  ecosystem: [
    {
      title: "Complete Lighting Ecosystem",
      subtitle: "End-to-End Airside Visibility.",
      image: "/heliport-vertiports/ecosystem.png",
      imageAlt: "Engineering Precision",
      points: [
        { title: "LED Perimeter Lights (Surface Mounted)", description: "Elevated lighting systems designed to clearly define helideck and landing area boundaries for safe operations." },
        { title: "LED Perimeter Lights (Flush Mounted)", description: "Low-profile inset lighting solutions that provide clear visual guidance while maintaining a smooth deck surface." },
        { title: "LED Wind Direction Indicator", description: "Illuminated wind indication systems that provide pilots with clear wind direction visibility in all operating conditions." },
        { title: "LED Wind Direction Indicator", description: "Illuminated wind indication systems that provide pilots with clear wind direction visibility in all operating conditions." },
        { title: "LED H and Circle Lights", description: "Aviation beacons designed to improve site identification and visibility from long operational distances." },
        { title: "LED Low Intensity Obstruction Lights", description: "Reliable obstruction warning lights developed to improve visibility and enhance aviation safety around structures and elevated areas." },
      ],
      paragraphs: [""],
    },
  ],
  features: {
    heading: "Engineered for Reliability, Efficiency & Safety",
    features: [
      { icon: "/heliport-vertiports/1.png", title: "High-Performance LED Technology", desc: "Up to 100,000-hour lifespan with consistent brightness" },
      { icon: "/heliport-vertiports/2.png", title: "Energy Efficiency", desc: "Low power consumption reduces operational costs" },
      { icon: "/heliport-vertiports/3.png", title: "Rugged Construction", desc: "Corrosion-resistant materials designed for demanding environments" },
      { icon: "/heliport-vertiports/4.png", title: "Environmental Protection", desc: "IP-rated systems for resistance against dust and water ingress" },
      { icon: "/heliport-vertiports/5.png", title: "Flexible Control Options", desc: "Adjustable light intensity for different operational requirements" },
      { icon: "/heliport-vertiports/6.png", title: "Pilot-Centric Design", desc: "Glare reduction and NVG compatibility for enhanced safety" },
    ],
  },
  flushLights: [
    {
      title: "FATO / TLOF Flush Mounted Helipad Lights",
      subtitle: "Precision Guidance Without Obstruction",
      paragraphs: [
        "Crantron's flush mounted helipad lights are designed for seamless integration into landing surfaces, providing clear visual guidance without creating physical obstacles for aircraft or ground operations.",
        "Ideal for Final Approach and Take-Off (FATO) and Touchdown and Lift-Off (TLOF) areas, these lights deliver dependable performance in both day and night operations.",
      ],
      image: "/heliport-vertiports/fato.png",
      imageAlt: "Engineering Precision",
      keytitle: "Key Features:",
      points: [
        { title: "Omnidirectional light output for uniform visibility" },
        { title: "Low power consumption (approximately 15W)" },
        { title: "Long-life integrated LED (up to 100,000 hours)" },
        { title: "IP67-rated for dust and water protection" },
        { title: "High-strength cast aluminium construction" },
        { title: "Night Vision Goggle (NVG) compatibility with optional IR LED" },
        { title: "Designed to withstand extreme temperatures (-40C to +60C)" },
      ],
      greytitle: "Why It Matters",
      greypara: "Flush-mounted lighting eliminates surface obstructions while maintaining optimal visibility making it ideal for high-traffic or space-constrained heliports and vertiports.",
    },
  ],
  hoodedLights: [
    {
      reverse: true,
      title: "Hooded LED Floodlights",
      subtitle: "High-Performance Surface Illumination",
      paragraphs: [
        "Crantron's hooded LED floodlights are engineered to illuminate landing zones, surrounding terrain, and potential obstacles, providing pilots with enhanced situational awareness during approach and landing.",
        "The integrated hood minimizes glare, ensuring visibility without compromising pilot comfort or safety.",
      ],
      image: "/heliport-vertiports/hooded.png",
      imageAlt: "Engineering Precision",
      keytitle: "Key Features:",
      points: [
        { title: "High-intensity LED lighting with up to 100,000-hour lifespan" },
        { title: "Anti-glare hood design for pilot-friendly operation" },
        { title: "IP65-rated for outdoor durability" },
        { title: "High-efficiency optical system with minimal light spill" },
        { title: "Designed for operation in harsh environments (-30C to +70C)" },
        { title: "Stable performance in high wind conditions" },
        { title: "Adjustable light intensity options" },
      ],
      greytitle: "Why It Matters",
      greypara: "Improves landing accuracy by giving pilots a clear, well-lit view of terrain conditions and potential hazards",
    },
  ],
  windcone: [
    {
      title: "Illuminated Wind Direction Indicator (Windcone)",
      subtitle: "Accurate Wind Visibility for Safer Landings",
      paragraphs: [
        "Wind awareness is critical for safe helicopter and eVTOL operations. Crantron's illuminated wind direction indicators provide clear, real-time wind visibility even in low-light and challenging weather conditions.",
        "Fully aligned with aviation requirements, these systems ensure pilots can easily interpret wind conditions from a distance.",
      ],
      image: "/heliport-vertiports/wind.png",
      imageAlt: "Engineering Precision",
      keytitle: "Key Features:",
      points: [
        { title: "Clearly visible from long distances (up to 200 meters)" },
        { title: "Available in internally and externally illuminated configurations" },
        { title: "Constructed with stainless steel or marine-grade coated poles" },
        { title: "Designed to withstand extreme wind speeds" },
        { title: "Smooth 360 rotation for accurate wind indication" },
        { title: "Multiple windsock sizes available" },
        { title: "Optional tiltable pole for simplified maintenance" },
      ],
      greytitle: "Why It Matters",
      greypara: "Provides essential environmental information, enabling safer, more controlled landing and take-off operations.",
    },
  ],
  future: {
    btn: "Inquire Now",
    title: "Built for the Future of Urban Air Mobility",
    subtitle: "Supporting Next-Generation Aviation",
    description1: "Crantron's lighting solutions are designed to support the growth of Urban Air Mobility (UAM) and electric aviation infrastructure.",
    description2: "",
    solutions: [
      "Compatible with modern eVTOL platforms",
      "Designed for high-frequency operations",
      "Scalable for future expansion",
      "Low maintenance with long operational life",
      "Proven performance in critical aviation environments",
    ],
    image1: "/hv1.png",
    image2: "/hv2.png",
  },
  faq: {
    heading: "Frequently Asked Questions",
    assistanceHeading: "Need Help ?",
    assistanceDescription: "Need reliable solutions or urgent support? Get in touch with our expert team today.",
    contactPhone: "+44 191 640 75 03",
    contactEmail: "info@crantonelectric.com",
    image: "/faqs/6.png",
  },
};

const HeliportsLightingSolutions = async () => {
  const rawContent = await getStoryblokStoryContent("heliports-and-vertiports-lighting-solutions");
  const content = mapStoryblokContent(rawContent, fallbackContent);

  return (
    <div>
      <DynamicHero
        title={content.hero.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Heliports & Vertiports Lighting Solutions" },
        ]}
        backgroundImage={content.hero.backgroundImage}
      />
      <ITValueCard {...content.intro} />
      <HvGrey sections={content.ecosystem} />
      <ThreeCards isBlack={true} heading={content.features.heading} para="" features={content.features.features} />
      <HvLeftRight sections={content.flushLights} />
      <HvLeftRight sections={content.hoodedLights} />
      <HvLeftRight sections={content.windcone} isBlack={true} />
      <Urban {...content.future} />
      <Faqs
        heading={content.faq.heading}
        description=""
        faqs={heliportsVertiportsLightingSolutionsFaqs}
        showNumbers={true}
        assistanceHeading={content.faq.assistanceHeading}
        assistanceDescription={content.faq.assistanceDescription}
        contactPhone={content.faq.contactPhone}
        contactEmail={content.faq.contactEmail}
        image={content.faq.image}
      />
    </div>
  );
};

export default HeliportsLightingSolutions;
