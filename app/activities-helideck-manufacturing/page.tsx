import DynamicHero from "@/components/dynamic-hero";
import ActivityContent from "@/components/activities-helideck/activity-content";
import CTASection from "@/components/cta-section";
import SplitSectionHelideck from "@/components/activities-helideck/splitsection-helideck";
import FourCards from "@/components/about/four-cards";

const ActivitiesHelideckManufacturing = () => {
    return (
        <div>
            <DynamicHero
                title={"Helideck Manufacturing"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Helideck Manufacturing" },
                ]}
                backgroundImage={"/helideck-manufacturing/hero.png"}
            />

            <ActivityContent
                topImages={[
                    "/helideck-manufacturing/left.png",
                    "/helideck-manufacturing/right.png"
                ]}
                title="Manufacturing & Construction Of Helidecks"
                paragraphs={[
                    "Based on the field survey or preliminary analysis of your existing helideck by our expert team, we decide if repair, refurbishing, and modernization of your existing helideck might require refurbishing for your existing helideck. In addition to our design and construction expertise, we offer a complete range of repair, refurbishing and modernization services for existing helidecks. Cranton Electrical has designed more ground, rooftop and offshore helideck manufacturers than anyone else in the world. Unlike most of our competitors, Cranton Electrical Heliports manufacturers has an extensive in-house engineering staff with the capability to design everything for a complete helipad installation. Cranton Electrical Helideck manufacturers will design the support structure, fire suppression equipment, snow melting system, and lighting package as needed for your specific project. We are staffed to handle multiple helidecks projects and still give your project the first-class attention it deserves."
                ]}
                listBlocks={[
                    {
                        title: "The Following is A List Of Some Of The Services Offered By Cranton Electrical",
                        description: "Cranton Electrical is prepared to perform the following services for our clients to meet their specific project requirements. With long experience and our attention to details. The results speak for safety performance and reliability.",
                        items: [
                            { title: "Preparation of primary layout design for new helidecks." },
                            { title: "Reconstruction of existing helidecks." },
                            { title: "Condition assessment, maintenance and performance inspection reports." },
                            { title: "Budgetary planning." },
                            { title: "Design developed with regards to load, wind and infrastructure that fits the helideck." },
                            { title: "Final construction plan of the global helideck installations." },
                            { title: "Installation supervision and technical support services for any types of helideck installation." },
                            { title: "Complete line of helideck accessories." },
                        ]
                    },
                    {
                        title: "Benefits For Operator",
                        items: [
                            { title: "Reduce risk of accident / incident during critical takeoff and landing phases of the flight." },
                            { title: "Increase the overall safe service of the helideck." },
                            { title: "Ensures accurate assessment of the helideck condition and performance, providing a clear footprint to the client." },
                            { title: "Helps the client to avoid structural and maintenance issues during the initial phase of refurbishing." },
                            { title: "Reduces project risk and budget." },
                            { title: "Elimination of installation and restoration issues on existing structure of the helideck." },
                            { title: "Increased safety and performance for both pilot and crew." },
                            { title: "Compliance with all regulatory requirements." },
                        ]
                    }
                ]}
            />
            <FourCards
                isBlack={true}
                heading="Key Features"
                para=""
                features={[{
                    icon: "/helideck-manufacturing/1.png",
                    title: "End-to-End Execution",
                    desc: "Detailed inspection to identify damage and performance issues.",
                },
                {
                    icon: "/helideck-manufacturing/2.png",
                    title: "Custom Helideck Design",
                    desc: "Provides effective repair and modernization of existing helidecks.",
                },
                {
                    icon: "/helideck-manufacturing/3.png",
                    title: "High-Quality Materials",
                    desc: "Ensures refurbished systems meet current aviation standards.",
                },
                {
                    icon: "/helideck-manufacturing/4.png",
                    title: "Precision Engineering",
                    desc: "Improves durability and extends the operational life of the helideck.",
                },
                ]} />
            <SplitSectionHelideck
                sections={[
                    {
                        title: "Specifications",
                        image: "/helideck-manufacturing/specification.png",
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
                        image: "/helideck-manufacturing/application.png",
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
                heading={"Need a Custom Helideck Solution?"}
                description={"Get in touch with our experts to discuss your manufacturing and construction requirements and receive a tailored helideck solution built for safety and reliability."}
                buttonText={"Request a Quote"}
                buttonHref={"/contact"}
            />
        </div>
    );
};

export default ActivitiesHelideckManufacturing;
