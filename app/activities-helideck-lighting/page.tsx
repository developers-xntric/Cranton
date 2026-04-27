import DynamicHero from "@/components/dynamic-hero";
import ActivityContent from "@/components/activities-helideck/activity-content";
import CTASection from "@/components/cta-section";
import SplitSectionHelideck from "@/components/activities-helideck/splitsection-helideck";
import FourCards from "@/components/about/four-cards";

const ActivitiesHelideckLighting = () => {
    return (
        <div>
            <DynamicHero
                title={"Helideck Lighting"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Helideck Lighting" },
                ]}
                backgroundImage={"/helideck-lighting/hero.png"}
            />

            <ActivityContent
                topImages={[
                    "/helideck-lighting/helipad.png"
                ]}
                title="Helideck Lighting"
                paragraphs={[
                    "A reliable and well-functioning helipad LED lighting system is an essential factor for helideck or helipad operations. An effective helipad lighting system ensures the safe site approach by providing the first visible to the pilot, at night and in bad weather. Our lighting systems are made with top quality products and use the industry standards by collaborating with world-renowned brands. The helipad lighting system prescribed are specifically designed to prevent accidents related landings and to prevent dangerous landings by providing increased visibility of the helideck and identifying helideck from aircraft.",
                    "Cranton Electrical helipad lighting offers a range of perimeter lights configured in green, yellow and blue. By providing good colour contrast throughout approach and landing at night and in poor visibility conditions, these lights will help the pilot side the helideck in great efforts to helideck to. Additionally, standard versions of the green perimeter lights are available in order to meet our customers' requirements with quick delivery service. We consistently keep an intensive research of the lighting products to easily find how to provide directly for the mechanical circuit specifications in order to perform and maintain the quality of products. We keep ourselves updated with latest industry standards in helipad lighting solutions. Once the lighting system is installed, we start working but the system is built with highly efficient speed and reliability and design standards; we ensure the capacity for error-free operations even in bad weather conditions.",
                    "Cranton Electrical helipad lighting designs and manufactures Helideck and a wide helipad lights and equipment for commercial private, government, military, hospitals and other applications. Lights comply with helipad light characteristics under ICAO and FAA standards and as the certain aviation rules of many additional countries."
                ]}
                listBlocks={[
                    {
                        title: "Our Helipad Lighting Products Includes",
                        type: "product",
                        items: [
                            { title: "LED Perimeter Lights (Surface Mounted)" },
                            { title: "LED Identification Beacon" },
                            { title: "LED Perimeter Lights (Flush Mounted)" },
                            { title: "LED Low Intensity obstruction lights" },
                            { title: "LED Floodlights" },
                            { title: "Mimic Lights" },
                            { title: "LED Wind direction indicator" },
                            { title: "TD/PM, Circle Zone (Circle / Helideck lighting systems)" },
                            { title: "LED Helipad Circle Lights" },
                            { title: "Controller" },
                        ]
                    }
                ]}
            />

            <FourCards
                isBlack={true}
                heading="Key Features"
                para=""
                features={[
                    {
                        icon: "/helideck-lighting/1.png",
                        title: "Advanced LED Tech",
                        desc: "High-efficiency LEDs for maximum visibility and energy savings.",
                    },
                    {
                        icon: "/helideck-lighting/2.png",
                        title: "Weather Resistant",
                        desc: "Designed to operate reliably in extreme marine and industrial climates.",
                    },
                    {
                        icon: "/helideck-lighting/3.png",
                        title: "Global Compliance",
                        desc: "Full adherence to ICAO Annex 14 and FAA lighting standards.",
                    },
                    {
                        icon: "/helideck-lighting/4.png",
                        title: "Smart Control Systems",
                        desc: "Centralized controllers for easy management of all lighting zones.",
                    },
                ]}
            />

            <SplitSectionHelideck
                sections={[
                    {
                        title: "Specifications",
                        image: "/helideck-lighting/specification.png",
                        imageAlt: "Engineering Precision",
                        paragraphs: [
                            "Our lighting solutions focus on durability and precision. We provide a full range of products from perimeter lights to wind direction indicators, all meeting rigorous aviation safety requirements.",
                            "The systems are engineered for low maintenance and high MTBF (Mean Time Between Failures), ensuring mission-critical reliability.",
                        ],
                        points: [
                            { title: "Standard: ICAO / FAA Compliant" },
                            { title: "Voltage: 100-240V AC / 24V DC" },
                            { title: "IP Rating: IP66 / IP67 Weatherproof" },
                            { title: "Lifespan: 50,000+ Hours LED" },
                        ],
                    },
                    {
                        title: "Applications",
                        image: "/helideck-lighting/application.png",
                        imageAlt: "Engineering Precision",
                        reverse: true,
                        paragraphs: [
                            "Helideck lighting is essential for various platforms, including offshore drilling rigs, hospital rooftops, and commercial aviation terminals.",
                            "These systems are tailored to each site's specific physical constraints and operational needs.",
                        ],
                        points: [
                            { title: "Marine & Offshore" },
                            { title: "Medical Helipads" },
                            { title: "VIP Terminals" },
                        ],
                    },
                ]}
            />

            <CTASection
                heading={"Illuminate Your Flight Operations"}
                description={"Contact our engineering team to design a complete, compliant lighting solution for your helideck or heliport."}
                buttonText={"Request a quote"}
                buttonHref={"/contact"}
            />
        </div>
    );
};

export default ActivitiesHelideckLighting;
