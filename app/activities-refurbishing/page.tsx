import AirCraftWarningLights from "@/components/activities-aircraft/aircraft-warning-lights";
import GraySplitSection from "@/components/activities-aircraft/graysplitssection";
import SplitSection from "@/components/activities-aircraft/splitsection";
import DynamicHero from "@/components/dynamic-hero";
import ActivitiesAircraft from "../activities-aircraft/page";
import ImageContentSection from "@/components/activities-helideck/image-content-section";
import SplitSectionHelideck from "@/components/activities-helideck/splitsection-helideck";
import FourCards from "@/components/about/four-cards";
import CTASection from "@/components/cta-section";

const ActivitiesRefurbishing = () => {
    return (
        <div>
            <DynamicHero
                title={"Activities"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Activities" }, 
                ]}
                backgroundImage={"/activities-helideck/hero.png"}
            />
            <ImageContentSection
  image="/activities-refurbishing/activities-refurbishing.png"
  imageAlt="Refurbishing Existing Helidecks"
  title="Refurbishing Existing Helidecks"
  paragraphs={[
    "Many helidecks that are decommissioned due to lack of quality or any other damages can be inspected by our team of professionals and issues may be identified. Based on the evaluations, our team submits a performance report of such helidecks to the client. This would include current issues and recommended solutions in order to make it useable. We have the best industry solutions that are cost effective and work with partners in order to refurbish such damaged helidecks, as per the clientâ€™s requirements.",
  ]}
  subTitle=""
    points={[]}
/>
            <FourCards
                            isBlack={true}
                            heading="Key Features"
                            para=""
                            features={[{
                                icon: "/activities-refurbishing/1.png",
                                title: "Condition Assessment",
                                desc: "Detailed inspection to identify damage and performance issues.",
                            },
                            {
                                icon: "/activities-refurbishing/2.png",
                                title: "Repair & Upgrade Solutions",
                                desc: "Provides effective repair and modernization of existing helidecks.",
                            },
                            {
                                icon: "/activities-refurbishing/3.png",
                                title: "Safety Compliance",
                                desc: "Ensures refurbished systems meet current aviation standards.",
                            },
                            {
                                icon: "/activities-refurbishing/4.png",
                                title: "Extended Lifespan",
                                desc: "Improves durability and extends the operational life of the helideck.",
                            },
                            ]} />
            <SplitSectionHelideck
  sections={[
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
      reverse: true, // 👈 flips layout
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
  ]}
/>
            <CTASection
        
        heading={
          "Need a Custom Helideck Solution?"
        }
        description={"Get in touch with our experts to discuss your project requirements and receive a tailored helideck solution built for safety, performance, and long-term reliability."}
        buttonText={"Request a Quote"}
        buttonHref={"/contact"}
      />
               
        </div>
    )
}

export default ActivitiesRefurbishing
