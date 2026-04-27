import AirCraftWarningLights from "@/components/activities-aircraft/aircraft-warning-lights";
import GraySplitSection from "@/components/activities-aircraft/graysplitssection";
import SplitSection from "@/components/activities-aircraft/splitsection";
import DynamicHero from "@/components/dynamic-hero";
import ActivitiesAircraft from "../activities-aircraft/page";
import ImageContentSection from "@/components/activities-helideck/image-content-section";
import SplitSectionHelideck from "@/components/activities-helideck/splitsection-helideck";
import FourCards from "@/components/about/four-cards";
import CTASection from "@/components/cta-section";

const ActivitiesHelideck = () => {
  return (
    <div>
      <DynamicHero
        title={"Helideck Consulting"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Helideck Consulting" },
        ]}
        backgroundImage={"/activities-helideck/hero.png"}
      />
      <ImageContentSection
        image="/helideck-consulting/helideck-consulting.png"
        imageAlt="Advanced Oncology Center building"
        title="Helideck Consulting"
        paragraphs={[
          "We are industry experts and provide you the most cost effective and up to date helideck solutions based on your requirements. We provide our clients a free primary consultation to listen to and clarify queries based on their helideck requirements",
          "Cranton Electrical Helideck consulting has designed more ground, rooftop and offshore helideck manufactures than anyone else in the world. Unlike most of our competitors, Cranton Electrical Heliports manufactures has an extensive in-house engineering staff with the capability to design everything for a complete helipad installation, Cranton Electrical Helideck manufactures will design the support structure, fire suppression equipment, snow melting system, and lighting package as needed for your specific project. We are staffed to handle multiple helidecks projects and still give your project the first-class attention it deserves.",
        ]}
        subTitle="Our Consultation Consists Of"
        points={[
          { title: "Drafting the primary plan / concept of the helideck" },
          { title: "Preparing detailed planning based on the approved concept" },
          { title: "Submission and approvals from concerned departments / officials" },
          { title: "Associating with related authorities / agencies in order to meet the applicable standards." },
        ]}
      />
      <FourCards
        isBlack={true}
        heading="Key Features"
        para=""
        features={[{
          icon: "/activities-helideck/1.png",
          title: "Expert Guidance",
          desc: "Provides professional consulting based on industry knowledge and experience.",
        },
        {
          icon: "/activities-helideck/2.png",
          title: "Custom Project Planning ",
          desc: "We follow strict quality standards to ensure all systems are safe, reliable, and durable, every time.",
        },
        {
          icon: "/activities-helideck/3.png",
          title: "Regulatory Compliance",
          desc: "Ensures all designs meet international aviation and safety standards.",
        },
        {
          icon: "/activities-helideck/4.png",
          title: "End-to-End Support",
          desc: "Covers planning, design, approvals, and coordination."
        },
        ]} />
      <SplitSectionHelideck
        sections={[
          {
            title: "Specifications",
            image: "/activities-helideck/specification.png",
            imageAlt: "Engineering Precision",
            paragraphs: [
              "Helideck consulting services are designed to support clients throughout the planning and development process. Our approach focuses on delivering practical, compliant, and efficient solutions tailored to each project.",
              "We work closely with clients and regulatory authorities to ensure that all designs meet aviation standards and operational requirements. Our consulting process is structured to provide clarity, accuracy, and reliable outcomes.",
            ],
            points: [
              { title: "Service Type: Consulting & Planning" },
              { title: "Approach: Custom Project Based" },
              { title: "Compliance: Aviation Standards" },
              { title: "Support: End-to-End" },
            ],
          },
          {
            title: "Applications",
            image: "/helideck-consulting/applications.png",
            imageAlt: "Engineering Precision",
            reverse: true, // 👈 flips layout
            paragraphs: [
              "Helideck consulting services are used in projects where proper planning, safety, and regulatory compliance are essential. These services help ensure that helideck systems are designed and executed correctly from the start.",
              "They are commonly applied in offshore platforms, rooftop helipads, and aviation-related developments, supporting safe and efficient project execution.",
            ],
            points: [
              { title: "Offshore Projects" },
              { title: "Rooftop Helipads" },
              { title: "Aviation Facilities" },
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

export default ActivitiesHelideck;
