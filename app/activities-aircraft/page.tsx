import AirCraftWarningLights from "@/components/activities-aircraft/aircraft-warning-lights";
import GraySplitSection from "@/components/activities-aircraft/graysplitssection";
import SplitSection from "@/components/activities-aircraft/splitsection";
import DynamicHero from "@/components/dynamic-hero";
import { getStoryblokStoryContent } from "@/lib/storyblok";
import { mapStoryblokContent } from "@/lib/storyblok-mappers";

const fallbackContent = {
  hero: {
    title: "Activities",
    backgroundImage: "/activities-aircraft/herobanner.png",
  },
  warningLights: {
    title: "Aircraft Warning Lights",
    paragraphs: [
      "Cranton provides high-performance aircraft warning lights designed to enhance aviation safety by ensuring clear visibility of tall structures and potential obstacles. Our solutions are engineered to meet aviation compliance requirements while delivering reliable performance in demanding environments.",
      "Built with advanced technology and durable materials, these systems offer long operational life, energy efficiency, and minimal maintenance. By ensuring consistent visibility and dependable operation, Cranton's aircraft warning lights help safeguard airspace while supporting the safe development of modern infrastructure.",
    ],
    cards: [
      { id: 1, title: "High-Visibility LED Technology", icon: "light" },
      { id: 2, title: "Engineered for Compliance", icon: "link" },
    ],
    image: "/activities-aircraft/aircraft-warning-lights.png",
    imageAlt: "Aircraft warning lights",
  },
  primarySections: [
    {
      id: "essential-visibility",
      title: "Essential Visibility: Low Intensity",
      model: "L-810",
      image: "/activities-aircraft/essentialvisibility.png",
      imageAlt: "Engineering Precision",
      reverse: true,
      details: [
        { title: "Application:", description: "Designed for nighttime obstruction marking on lower structures or as intermediate markers on taller towers." },
        { title: "Design:", description: "Features a durable yellow housing with a specialized red prismatic dome for omnidirectional signaling." },
        { title: "Mounting:", description: "Robust flange-mount base ensures stability in adverse wind conditions." },
      ],
    },
    {
      id: "robust-signaling",
      title: "Robust Signaling: Medium Intensity (Type B & C)",
      model: "Medium Intensity LED, Type-C & B",
      description: "Engineered for reliable red beacon requirements, these units provide high-contrast visibility for nighttime operations.",
      image: "/activities-aircraft/robust-signaling.png",
      imageAlt: "Engineering Precision",
      details: [
        { title: "Configuration:", description: "Available for Type B (Red Flashing) and Type C (Red Steady) applications." },
        { title: "Build:", description: "Industrial yellow powder-coated housing with a heavy-duty clear lens assembly protecting the internal LED matrix." },
        { title: "Thermal Management:", description: "Integrated cooling fins visible through the clear housing ensure LED longevity." },
      ],
    },
  ],
  secondarySections: [
    {
      title: "Day & Night Performance: Medium Intensity (Type A)",
      model: "Medium Intensity LED, Type-A (Supports A/B & A/C)",
      description: "A high-performance white flashing system designed for dual marking, ensuring visibility against bright daytime skies and transitioning for night operations.",
      image: "/activities-aircraft/day-night.png",
      imageAlt: "Engineering Precision",
      reverse: true,
      details: [
        { title: "Visual Details:", description: "Distinct blue housing with optimized internal LED arrangement designed for maximum light throw and efficiency." },
        { title: "Versatility:", description: "Covers requirements for Type A (White Day/Night), combined with Type B or C capabilities." },
      ],
    },
    {
      id: "high-intensity",
      title: "Maximum Range: High Intensity",
      model: "High Intensity LED, Type-A",
      image: "/activities-aircraft/maximumrange.png",
      imageAlt: "Engineering Precision",
      details: [
        { title: "Application", description: "The critical solution for major structures exceeding 500ft and catenary support systems." },
        { title: "Form Factor", description: "Linear panel design optimized for specific beam spread and intensity requirements." },
        { title: "Durability", description: "Heavy-duty yellow metal enclosure with reinforced mounting brackets for high-altitude installation." },
      ],
    },
  ],
};

const ActivitiesAircraft = async () => {
  const rawContent = await getStoryblokStoryContent("activities-aircraft");
  const content = mapStoryblokContent(rawContent, fallbackContent);

  return (
    <div>
      <DynamicHero
        title={content.hero.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Activities" },
        ]}
        backgroundImage={content.hero.backgroundImage}
      />
      <AirCraftWarningLights {...content.warningLights} />
      <SplitSection sections={content.primarySections} />
      <GraySplitSection sections={content.secondarySections} />
    </div>
  );
};

export default ActivitiesAircraft;
