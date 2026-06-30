import DynamicHero from "@/components/dynamic-hero";
import ReliableSurveillance from "@/components/reliable-surveillance";
import FourCards from "@/components/about/four-cards";
import SplitSectionHelideck from "@/components/activities-helideck/splitsection-helideck";
import InstallationProcess from "@/components/installation-process";
import IndustriesServe from "@/components/industries-serve";
import Faqs from "@/components/faqs";
import CTASection from "@/components/cta-section";
import { portableLightingSolutionsFaqs } from "@/lib/solution-faqs";
import { getStoryblokStoryContent } from "@/lib/storyblok";
import { mapStoryblokContent } from "@/lib/storyblok-mappers";

const fallbackContent = {
  hero: {
    title: "Portable Lighting Solutions",
    backgroundImage: "/portable-lighting/hero.png",
  },
  intro: {
    title: "Portable Lighting Solutions for Safe & Reliable Operations",
    description:
      "Engineered for high visibility and rapid deployment, our portable lighting systems ensure safe aviation operations in remote, temporary, and emergency environments without the need for fixed infrastructure",
    image: "/portable-lighting/specification.png",
    buttonText: "Request a Quote",
    buttonHref: "/contact",
  },
  features: {
    heading: "Engineered for Performance & Reliability",
    features: [
      { icon: "/portable-lighting/1.png", title: "Self-Powered Operation", desc: "Integrated rechargeable battery system enables independent operation without external power sources." },
      { icon: "/portable-lighting/2.png", title: "Advanced LED", desc: "Ultra-bright LED lighting ensures maximum visibility while reducing power consumption and maintenance." },
      { icon: "/portable-lighting/3.png", title: "Rugged Construction", desc: "Built with durable materials and sealed construction (IP-rated) to withstand harsh environmental conditions." },
      { icon: "/portable-lighting/4.png", title: "Portable & Easy to Deploy", desc: "Lightweight design with integrated handles allows quick installation, relocation, and setup." },
    ],
  },
  sections: [
    {
      title: "Reliable Lighting Where You Need It Most",
      image: "/portable-lighting/specs.png",
      imageAlt: "Portable Lighting Specifications",
      paragraphs: [
        "Cranton portable lighting solutions are designed to provide dependable illumination for aviation operations where traditional power sources are unavailable or impractical. Built with advanced LED technology and integrated power systems, these lights deliver consistent performance in demanding conditions.",
        "Ideal for temporary helipads, emergency response, and remote operations, our systems ensure safe landing, take-off, and ground movement anytime, anywhere.",
      ],
      points: [
        { title: "Enables safe night and low-visibility operations" },
        { title: "Eliminates dependency on fixed power infrastructure" },
        { title: "Supports rapid deployment in emergency situations" },
        { title: "Ensures operational continuity in remote locations" },
      ],
    },
  ],
  steps: {
    title: "Designed for Real-World Aviation Needs",
    description: "Our portable lighting systems go beyond basic illumination by offering advanced control and operational features.",
    steps: [
      { id: "01", title: "Wireless Remote Control", desc: "Operate and manage lighting systems remotely, enabling efficient control from a safe distance.", image: "/portable-lighting/step1.png" },
      { id: "02", title: "Air-to-Ground Communication Control", desc: "Optional integration allows direct control between ground systems and aircraft for enhanced coordination.", image: "/portable-lighting/step2.png" },
      { id: "03", title: "Multiple Color Configurations", desc: "Supports various color options to meet different aviation lighting requirements and operational needs.", image: "/portable-lighting/step3.png" },
      { id: "04", title: "Extended Operational Runtime", desc: "Designed for long-lasting performance, ensuring continuous operation.", image: "/portable-lighting/step4.png" },
    ],
  },
  industries: {
    heading: "Where It's Used",
    industries: [
      { name: "Temporary Helipads & Vertipads", image: "/portable-lighting/img1.png" },
      { name: "Remote & Off-Grid Locations", image: "/portable-lighting/img2.png" },
      { name: "Airfield & Taxiway Lighting", image: "/portable-lighting/img3.png" },
      { name: "Disaster Response & Rapid Deployment", image: "/portable-lighting/img4.png" },
      { name: "Emergency & Medical Evacuation Operations", image: "/portable-lighting/img5.png" },
    ],
  },
  faq: {
    heading: "Frequently Asked Questions",
    description: "",
    assistanceHeading: "Need Help ?",
    assistanceDescription: "Need reliable solutions or urgent support? Get in touch with our expert team today.",
    contactPhone: "+44 191 640 75 03",
    contactEmail: "info@crantonelectric.com",
    image: "/faqs/4.png",
  },
  cta: {
    heading: "Need a Portable Helipad Solution?",
    description: "Tell us about your project requirements and our experts will help you design the right solution for your operational needs.",
    buttonText: "Request a Quote",
    buttonHref: "/contact",
  },
};

const PortableLightingSolutions = async () => {
  const rawContent = await getStoryblokStoryContent("portable-lighting-solutions");
  const content = mapStoryblokContent(rawContent, fallbackContent);

  return (
    <div>
      <DynamicHero
        title={content.hero.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portable Lighting Solutions" },
        ]}
        backgroundImage={content.hero.backgroundImage}
      />

      <ReliableSurveillance
        title={content.intro.title}
        description={content.intro.description}
        image={content.intro.image}
        buttonText={content.intro.buttonText}
        buttonHref={content.intro.buttonHref}
      />

      <FourCards
        isBlack={true}
        heading={content.features.heading}
        para=""
        features={content.features.features}
      />

      <SplitSectionHelideck sections={content.sections} />

      <InstallationProcess
        title={content.steps.title}
        description={content.steps.description}
        steps={content.steps.steps}
      />

      <IndustriesServe badge="" heading={content.industries.heading} industries={content.industries.industries} />

      <Faqs
        heading={content.faq.heading}
        description={content.faq.description}
        faqs={portableLightingSolutionsFaqs}
        showNumbers={true}
        assistanceHeading={content.faq.assistanceHeading}
        assistanceDescription={content.faq.assistanceDescription}
        contactPhone={content.faq.contactPhone}
        contactEmail={content.faq.contactEmail}
        image={content.faq.image}
      />

      <CTASection
        heading={content.cta.heading}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
        buttonHref={content.cta.buttonHref}
      />
    </div>
  );
};

export default PortableLightingSolutions;
