import DynamicHero from "@/components/dynamic-hero";
import ImageContentSection from "@/components/activities-helideck/image-content-section";
import SplitSectionHelideck from "@/components/activities-helideck/splitsection-helideck";
import FourCards from "@/components/about/four-cards";
import CTASection from "@/components/cta-section";
import { getStoryblokStoryContent } from "@/lib/storyblok";
import { mapStoryblokContent } from "@/lib/storyblok-mappers";

const fallbackContent = {
  hero: { title: "Refurbishing Helidecks", backgroundImage: "/activities-refurbishing/banner.png" },
  intro: {
    image: "/activities-refurbishing/refurbishing-existing-helidecks.png",
    imageAlt: "Refurbishing Existing Helidecks",
    title: "Refurbishing Existing Helidecks",
    paragraphs: [
      "Many helidecks that are decommissioned due to lack of quality or any other damages can be inspected by our team of professionals and issues may be identified. Based on the evaluations, our team submits a performance report of such helidecks to the client. This would include current issues and recommended solutions in order to make it useable. We have the best industry solutions that are cost effective and work with partners in order to refurbish such damaged helidecks, as per the client's requirements.",
    ],
    subTitle: "",
    points: [],
  },
  features: {
    heading: "Key Features",
    features: [
      { icon: "/activities-refurbishing/1.png", title: "Condition Assessment", desc: "Detailed inspection to identify damage and performance issues." },
      { icon: "/activities-refurbishing/2.png", title: "Repair & Upgrade Solutions", desc: "Provides effective repair and modernization of existing helidecks." },
      { icon: "/activities-refurbishing/3.png", title: "Safety Compliance", desc: "Ensures refurbished systems meet current aviation standards." },
      { icon: "/activities-refurbishing/4.png", title: "Extended Lifespan", desc: "Improves durability and extends the operational life of the helideck." },
    ],
  },
  sections: [
    {
      title: "Specifications",
      image: "/activities-refurbishing/specification.png",
      imageAlt: "Engineering Precision",
      paragraphs: [
        "Refurbishing services are designed to restore and upgrade existing helidecks to meet modern safety and performance standards. The process includes detailed inspection, repair planning, and implementation of effective solutions",
        "Our approach ensures structural integrity, improved performance, and compliance with aviation regulations. Each project is customized based on the condition of the helideck and operational requirements.",
      ],
      points: [
        { title: "Service Type: Refurbishment & Upgrade" },
        { title: "Process: Inspection, Repair & Enhancement" },
        { title: "Compliance: Aviation Standards" },
        { title: "Outcome: Improved Performance & Safety" },
      ],
    },
    {
      title: "Applications",
      image: "/activities-refurbishing/application.png",
      imageAlt: "Engineering Precision",
      reverse: true,
      paragraphs: [
        "Refurbishing services are used in projects where existing helidecks require repair, upgrade, or performance improvement. These services help restore structural integrity and ensure safe aircraft operations.",
        "They are widely applied in offshore platforms, rooftop helipads, and industrial facilities, where upgrading existing infrastructure is more efficient than complete replacement.",
      ],
      points: [
        { title: "Offshore Projects" },
        { title: "Rooftop Helipads" },
        { title: "Industrial Sites" },
      ],
    },
  ],
  cta: {
    heading: "Need a Custom Helideck Solution?",
    description: "Get in touch with our experts to discuss your project requirements and receive a tailored helideck solution built for safety, performance, and long-term reliability.",
    buttonText: "Request a Quote",
    buttonHref: "/contact",
  },
};

const ActivitiesRefurbishing = async () => {
  const rawContent = await getStoryblokStoryContent("activities-helideck-refurbishing");
  const content = mapStoryblokContent(rawContent, fallbackContent);

  return (
    <div>
      <DynamicHero
        title={content.hero.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Refurbishing Helidecks" },
        ]}
        backgroundImage={content.hero.backgroundImage}
      />
      <ImageContentSection {...content.intro} />
      <FourCards isBlack={true} heading={content.features.heading} para="" features={content.features.features} />
      <SplitSectionHelideck sections={content.sections} />
      <CTASection {...content.cta} />
    </div>
  );
};

export default ActivitiesRefurbishing;
