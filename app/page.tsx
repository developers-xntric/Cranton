import Hero from "@/components/hero";
import Services from "@/components/services";
import StatsSection from "@/components/stats-section";
import BuildingBlocks from "@/components/building-blocks";
import WhyChooseUs from "@/components/why-choose-us";
import InsightsSection from "@/components/insights-section";
import ContactSection from "@/components/contact-section";
import { getStoryblokContent } from "@/lib/storyblok";
import { mapHomeContent } from "@/lib/storyblok-mappers";

const homeFallbackContent = {
  hero: {
    video: "/home/hero-bg.mp4",
    title: "Powering the Future of\nVertical Aviation",
    subtitle:
      "Heliports, Vertiports, and Obstruction Lighting Built for Safety, Precision, and Performance",
    ctaLabel: "Explore Solutions",
    ctaHref: "/about",
  },
  services: [
    {
      title: "Heliports & Vertiports Solutions",
      description:
        "High-strength, durable platform systems designed to provide secure and reliable landing surfaces for offshore and onshore helideck operations.",
      image: "/home/service-4.png",
      link: "/heliports-and-vertiports-solutions",
    },
    {
      title:
        "End-to-End Solutions for Heliports, Vertiports, & Obstruction Lighting",
      description:
        "We engineer future ready high-performance solutions for heliports, vertiports, and advanced air mobility sites with a focus on safety, precision, and compliance.",
      image: null,
      link: "#",
      ctaLabel: "Inquire Now",
      ctaHref: "/contact",
    },
    {
      title: "Heliports & Vertiports Lighting Solutions",
      description:
        "Advanced lighting systems engineered for precision, visibility, and compliance, supporting safe take-off, landing, and ground operations.",
      image: "/home/service-5.png",
      link: "/heliports-and-vertiports-lighting-solutions",
    },
    {
      title: "Portable Helipads & Vertipads",
      description:
        "Rapid-deploy, modular landing solutions designed for temporary and emergency operations, ensuring safe and stable helicopter access across diverse terrains.",
      image: "/home/service-1.png",
      link: "/portable-helipads-and-vertipads",
    },
    {
      title: "Modular Floating Solutions",
      description:
        "Modular, easy-to-deploy floating systems designed for stability and versatility. Ideal for helipads, platforms, and marine applications, delivering reliable performance.",
      image: "/home/service-3.png",
      link: "/modular-floating-solutions",
    },
    {
      title: "Obstruction Lighting Solutions",
      description:
        "High-performance warning lights designed to enhance visibility of structures, ensuring aviation safety and regulatory compliance.",
      image: "/obs.png",
      link: "/obstruction-lighting-solutions",
    },
    {
      title: "Portable Lighting Solutions",
      description:
        "Self-powered, high-intensity lighting systems built for quick setup, enabling safe aviation operations in remote or time-critical environments.",
      image: "/home/service-7.png",
      link: "/portable-lighting-solutions",
    },
  ],
  buildingBlocks: {
    heading: "The Building Blocks of Safe & Reliable Vertiport & Heliport",
    description:
      "Cranton Heliport is engineered with precision, using high-performance materials and systems designed to meet demanding aviation standards. These core elements work together to deliver safety, durability, and long-term operational confidence.",
    blocks: [
      {
        title: "High-Performance Aluminium Profiles",
        description:
          "Precision-engineered aluminium profiles form the foundation of our heliport landing surfaces.",
        icon: "/home/block-card1.png",
      },
      {
        title: "Advanced Electrical & Lighting Systems",
        description:
          "Our integrated electrical systems ensure clear visibility and safe operations in all conditions.",
        icon: "/home/block-card2.png",
      },
      {
        title: "Integrated Helideck Systems",
        description:
          "Cranton helidecks are built for safe, stable, and reliable aviation operations, delivering certified landing environments with long-term durability and high performance.",
        icon: "/home/bc3.png",
      },
      {
        title: "Deck Platforms Fixed & Portable",
        description:
          "Cranton offers both permanent and portable helideck solutions designed for different operational requirements, providing reliable performance, flexibility.",
        icon: "/home/bc4.png",
      },
      {
        title: "Lighting Solutions  Fixed Systems",
        description:
          "Our fixed aviation lighting systems are designed to deliver clear visual guidance, enhanced night operations, and full compliance with heliport and helideck standards. Integrated perimeter lighting, approach lighting, and illuminated markings improve pilot visibility and operational safety in all weather conditions.",
        icon: "/home/bc5.png",
      },
      {
        title: "Lighting Solutions Portable Systems",
        description:
          "Cranton portable lighting solutions provide rapid-deployment illumination for temporary landing zones, emergency response operations, and remote-site aviation support. Lightweight, durable, and easy to transport, these systems ensure dependable visibility wherever operations are required.",
        icon: "/home/bc6.png",
      },
    ],
  },
  statsSection: {
    image: "/home/stats-left.png",
    heading: "Engineering Precision. Manufacturing Excellence",
    paragraphs: [
      "Cranton is a specialist manufacturer and solutions provider for aviation and infrastructure systems, with a strong focus on helideck and helipad solutions, aviation lighting, and electrical safety equipment. We combine engineering expertise with in-house manufacturing to deliver products that meet the highest standards of safety, durability, and compliance.",
      "Built on a foundation of technical knowledge and practical experience, Cranton supports clients across aviation, offshore, healthcare, defense, and industrial sectors. Our products are designed to perform in demanding environments where reliability and precision are critical.",
    ],
    ctaLabel: "About Us",
    ctaHref: "/about",
    stats: [
      { label: "Completed Projects", value: 450, suffix: "" },
      { label: "Countries Served", value: 32, suffix: "+" },
      { label: "Years of Experience", value: 8, suffix: "+" },
    ],
  },
  whyChooseUs: {
    heading: "Why Industry Leaders Choose Cranton",
    description:
      "From manufacturing precision to on-site readiness, Cranton delivers aviation, Vertiport & heliport solutions engineered for performance, compliance, and long-term reliability.",
    image: "/home/why-choose-us.png",
    features: [
      {
        title: "Engineered for Compliance & Safety",
        description:
          "Every solution is carefully designed to meet international aviation standards while ensuring safe, stable, and efficient helideck operations. Our systems are developed to support reliable performance while maintaining strict safety and operational compliance requirements.",
      },
      {
        title: "Manufacturing-Driven Quality",
        description:
          "We combine durable materials, precision engineering, and detailed quality control processes to deliver systems built for long-term performance. Every component is manufactured with consistency and accuracy to ensure dependable operation across demanding project environments.",
      },
      {
        title: "Proven in Real-World Installations",
        description:
          "Our solutions are successfully implemented across offshore platforms, rooftop helipads, and industrial aviation facilities worldwide. These completed installations demonstrate our practical experience in delivering reliable systems for complex operational environments and requirements.",
      },
      {
        title: "Built to Support Your Project Goals",
        description:
          "From planning to installation, every solution is tailored to match your operational requirements and long-term infrastructure objectives. We work closely with clients to deliver scalable, practical, and future-ready helideck systems for every project.",
      },
    ],
    ctaLabel: "Inquire Now",
    ctaHref: "/contact",
  },
  insightsSection: {
    heading: "Insights That Power Smarter Decisions",
    insights: [
      {
        title: "What Is The Difference Between A Helipad And A Vertiport?",
        image: "/home/insights-1.png",
        isLarge: true,
      },
      {
        title: "Decoding The Visual Language Of Vertiport & Heliport Markings",
        image: "/home/insights-2.png",
      },
      {
        title: "Differences Between Helicopter Landing Pads",
        image: "/home/insights-3.png",
      },
      {
        title:
          "Aluminum Vertiports- The Future Of Green Landing Systems For EVTOL/VTOL?",
        image: "/home/insights-4.png",
      },
    ],
  },
};

export default async function Home() {
  const contentRaw = await getStoryblokContent("home", homeFallbackContent);
  const content = mapHomeContent(contentRaw, homeFallbackContent);

  return (
    <main>
      <Hero {...content.hero} />
      <Services services={content.services} />
      <BuildingBlocks {...content.buildingBlocks} />
      <StatsSection {...content.statsSection} />
      <WhyChooseUs {...content.whyChooseUs} />
      <InsightsSection {...content.insightsSection} />
      <ContactSection />
    </main>
  );
}
