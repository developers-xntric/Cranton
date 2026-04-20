import DynamicHero from "@/components/dynamic-hero";
import ActivityContent from "@/components/activities-helideck/activity-content";
import CTASection from "@/components/cta-section";
import SplitSectionHelideck from "@/components/activities-helideck/splitsection-helideck";
import FourCards from "@/components/about/four-cards";

const ActivitiesFireFighting = () => {
    return (
        <div>
            <DynamicHero
                title={"Firefighting System"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Firefighting System" },
                ]}
                backgroundImage={"/firefighting-system/hero.png"}
            />

            <ActivityContent
                topImages={[
                    "/firefighting-system/left.png",
                    "/firefighting-system/right.png"
                ]}
                title="Firefighting System"
                paragraphs={[
                    "As per the norms of International Civil Aviation Organization, heliports should be equipped with Firefighting system on two sides. Both manual and automatic control systems could be used to operate firefighting systems at the heliport. Based on the length of helicopters, the firefighting systems are categorized to three. H1 (250 LPM), H2 (500 LPM) and H3 (800 LPM) - (LPM refers to Liter per Minute). The method of using heavy foam in the system ensures that it takes less than five minutes to control advancing helicopter.",
                    "Firefighting monitors installed on the aluminum landing platforms ensure that the system works without delay, thereby minimizing damages. Firefighting system includes water tanks, extinguishing agent (foam), firefighting monitors, pumping and mixing station and the complete pipe work. Since safety comes first, our team of experts check and ensure that the firefighting systems meet international regulations and recommendations."
                ]}
                bottomImage="/firefighting-system/firefighting-system.png"
            />

            <FourCards
                isBlack={true}
                heading="Key Features"
                para=""
                features={[
                    {
                        icon: "/firefighting-system/1.png",
                        title: "Automated Suppression",
                        desc: "Quick-response automatic foam systems for immediate fire control.",
                    },
                    {
                        icon: "/firefighting-system/2.png",
                        title: "Advanced Monitoring",
                        desc: "High-performance firefighting monitors for precise water and foam delivery.",
                    },
                    {
                        icon: "/firefighting-system/3.png",
                        title: "ICAO Compliance",
                        desc: "Systems designed to meet H1, H2, and H3 safety standards.",
                    },
                    {
                        icon: "/firefighting-system/4.png",
                        title: "Reliable Infrastructure",
                        desc: "Durable pipework and pumping stations built for emergency readiness.",
                    },
                ]}
            />

            <SplitSectionHelideck
                sections={[
                    {
                        title: "Specifications",
                        image: "/firefighting-system/specification.png",
                        imageAlt: "Engineering Precision",
                        paragraphs: [
                            "Our firefighting systems are engineered to handle the unique challenges of heliport safety. We provide complete solutions including water tanks, foam induction systems, and specialized monitors.",
                            "Each system is calibrated based on the heliport's operational category (H1, H2, or H3) to ensure adequate flow rates and coverage.",
                        ],
                        points: [
                            { title: "Flow Rates: Up to 800 LPM" },
                            { title: "Suppression Agent: Heavy Foam Solution" },
                            { title: "Activation: Manual & Automatic Options" },
                            { title: "Standards: International ICAO Norms" },
                        ],
                    },
                    {
                        title: "Applications",
                        image: "/firefighting-system/application.png",
                        imageAlt: "Engineering Precision",
                        reverse: true,
                        paragraphs: [
                            "Reliable fire suppression is critical for rooftop, offshore, and ground-level heliports. Our systems provide a first line of defense to protect personnel and infrastructure.",
                            "We focus on rapid response times and ease of maintenance to ensure the system is always ready when needed most.",
                        ],
                        points: [
                            { title: "Rooftop Heliports" },
                            { title: "Offshore Platforms" },
                            { title: "Industrial Complexes" },
                        ],
                    },
                ]}
            />

            <CTASection
                heading={"Ensure Your Heliport's Safety Today"}
                description={"Contact our fire safety experts to design a compliant and effective firefighting system for your heliport infrastructure."}
                buttonText={"Request a Quote"}
                buttonHref={"/contact"}
            />
        </div>
    );
};

export default ActivitiesFireFighting;
