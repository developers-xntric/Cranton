import FourCards from '@/components/about/four-cards';
import SplitSectionHelideck from '@/components/activities-helideck/splitsection-helideck';
import CTASection from '@/components/cta-section';
import DynamicHero from '@/components/dynamic-hero';
import Faqs from '@/components/faqs';
import IndustriesServe from '@/components/industries-serve';
import { heliportsVertiportsSolutionsFaqs } from '@/lib/solution-faqs';
import SecondHeli from '@/components/second-heli';
import { getStoryblokStoryContent } from '@/lib/storyblok';
import { mapStoryblokContent } from '@/lib/storyblok-mappers';

const fallbackContent = {
  hero: { title: "Heliports & Vertiports Solutions", backgroundImage: "/hhero.png" },
  intro: {
    heading: "Reliable Heliports & Vertiports for Offshore, Urban & Remote Operations",
    desc: "Engineered for safety, durability, and operational efficiency, our heliport and vertiport solutions support secure helicopter landing operations across offshore, marine, industrial, and remote environments.",
    heading2: "Built for Safe Aviation Operations",
    desc2: "Cranton's heliport and vertiport solutions are designed to deliver stable, compliant, and high-performance landing areas for helicopters operating in demanding environments. Built using durable materials and precision engineering, our systems ensure long-term reliability, operational safety, and efficient deployment. <br /> <br /> From offshore energy facilities to temporary remote operations, our heliports and vertiports are tailored to meet aviation standards while supporting safe and uninterrupted helicopter access.",
    para: [
      "Designed for offshore platforms, vessels, and remote industrial sites where reliable helicopter access is essential.",
      "Manufactured using high-strength materials to withstand harsh marine, weather, and operational conditions.",
      "Engineered with anti-slip surfaces, integrated lighting compatibility, and balanced structural stability for safe helicopter operations.",
      "Available in multiple sizes and configurations to suit operational, industrial, and aviation requirements.",
    ],
    titles: [
      "Offshore & Remote Deployment",
      "Durable Structural Engineering",
      "Safe Landing Surface",
      "Custom Platform Solutions",
    ],
    image: "/newheliport.png",
  },
  features: {
    heading: "Engineered for Performance",
    features: [
      { icon: "/h1.png", title: "High Load Capacity", desc: "Built to support demanding helicopter operations with stable load distribution and structural integrity." },
      { icon: "/h2.png", title: "Weatherproof & Durable", desc: "Designed to perform in challenging marine and offshore environments with long-lasting durability." },
      { icon: "/h3.png", title: "Compliance Ready", desc: "Manufactured to align with aviation and heliport operational standards for safe and reliable performance." },
      { icon: "/h4.png", title: "Fast Installation", desc: "Efficient assembly and deployment process minimizes operational downtime and installation complexity." },
    ],
  },
  sections: [
    {
      title: "Designed for Demanding Aviation Environments",
      image: "/hb.png",
      imageAlt: "Engineering",
      paragraphs: [
        "Cranton helideck platforms are engineered to provide safe, durable, and reliable landing infrastructure for offshore and land-based aviation operations. Manufactured using high-strength aluminium, our platforms are designed to perform in harsh environmental conditions while maintaining structural integrity, operational safety, and long-term efficiency.",
        "From permanent installations to portable deployment systems, every helideck platform is developed to meet international aviation standards and project-specific operational requirements. With a strong focus on lightweight construction, corrosion resistance, and low maintenance performance, Cranton delivers dependable solutions for critical aviation environments.",
      ],
      points: [
        { title: "Lightweight Aluminium Construction", description: "Strong, corrosion-resistant structures designed for demanding environments." },
        { title: "Fixed & Portable Platform Solutions", description: "Flexible helideck systems for permanent, temporary, and remote operations." },
        { title: "Engineered For Harsh Conditions", description: "Built to withstand offshore, marine, industrial, and remote environments." },
        { title: "Safe, Durable & Compliant", description: "Designed to meet international aviation safety and operational standards." },
      ],
    },
  ],
  industries: {
    heading: "Where It's Used",
    industries: [
      { name: "Emergency & Medical Operations", image: "/w11new.png" },
      { name: "Marine & Vessel Operations", image: "/w12new.png" },
      { name: "Construction & Infrastructure Projects", image: "/w13.png" },
      { name: "Temporary Aviation Installations", image: "/w14new.png" },
      { name: "Emergency Response Sites", image: "/w15new.png" },
      { name: "Healthcare", image: "/w16new.png" },
    ],
  },
  faq: {
    heading: "Frequently Asked Questions",
    assistanceHeading: "Need Help ?",
    assistanceDescription: "Our lighting specialists are ready to help you select the perfect obstruction lighting solution for your operational needs.",
    contactPhone: "+44 191 640 75 03",
    contactEmail: "info@crantonelectric.com",
    image: "/faqs/1.png",
  },
  cta: {
    heading: "Need a Reliable Heliport & Vertiport Solution?",
    description: "Tell us about your project requirements and our experts will help you design the right solution for your operational needs.",
  },
};

const HelideckPlatformSolutions = async () => {
  const rawContent = await getStoryblokStoryContent("heliports-and-vertiports-solutions");
  const content = mapStoryblokContent(rawContent, fallbackContent);

  return (
    <div>
      <DynamicHero
        title={content.hero.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Heliports & Vertiports Solutions" },
        ]}
        backgroundImage={content.hero.backgroundImage}
      />
      <SecondHeli {...content.intro} />
      <FourCards heading={content.features.heading} para={null} isBlack={true} features={content.features.features} />
      <SplitSectionHelideck sections={content.sections} />
      <IndustriesServe badge="" heading={content.industries.heading} industries={content.industries.industries} className="md:py-0! md:pb-10!" />
      <Faqs
        heading={content.faq.heading}
        description=""
        image={content.faq.image}
        faqs={heliportsVertiportsSolutionsFaqs}
        showNumbers={true}
        assistanceHeading={content.faq.assistanceHeading}
        assistanceDescription={content.faq.assistanceDescription}
        contactPhone={content.faq.contactPhone}
        contactEmail={content.faq.contactEmail}
      />
      <CTASection heading={content.cta.heading} description={content.cta.description} />
    </div>
  );
};

export default HelideckPlatformSolutions;
