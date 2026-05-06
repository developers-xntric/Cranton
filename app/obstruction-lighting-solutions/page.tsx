import DynamicHero from "@/components/dynamic-hero";
import ReliableSurveillance from "@/components/reliable-surveillance";
import FourCards from "@/components/about/four-cards";
import BlackSplitSection from "@/components/activities-aircraft/black-split-section";
import InstallationProcess from "@/components/installation-process";
import IndustriesServe from "@/components/industries-serve";
import Faqs from "@/components/faqs";
import CTASection from "@/components/cta-section";

const ObstructionLightingSolutions = () => {
    return (
        <div>
            <DynamicHero
                title={"Obstruction Lighting Solutions"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Obstruction Lighting Solutions" },
                ]}
                backgroundImage={"/helideck-lighting/hero.png"}
            />

            <ReliableSurveillance
                title="Obstruction Lighting Solutions for Safer Airspace"
                description="Cranton obstruction lighting solutions are engineered to mark tall structures and potential hazards, helping pilots maintain safe navigation in all conditions. Designed for reliability and long-term performance, our systems support aviation safety across a wide range of environments."
                image="/helideck-lighting/specification.png"
                buttonText="Request a Quote"
                buttonHref="/contact"
            />

            <FourCards
                isBlack={true}
                heading="Engineered for Performance & Reliability"
                para=""
                features={[
                    {
                        icon: "/portable-lighting/1.png",
                        title: "Self-Powered Operation",
                        desc: "Integrated rechargeable battery system enables independent operation without external power sources.",
                    },
                    {
                        icon: "/portable-lighting/2.png",
                        title: "High-Intensity LED Technology",
                        desc: "Ultra-bright LED lighting ensures maximum visibility while reducing power consumption and maintenance.",
                    },
                    {
                        icon: "/portable-lighting/3.png",
                        title: "Rugged & Weatherproof Design",
                        desc: "Built with durable materials and sealed construction (IP-rated) to withstand harsh environmental conditions.",
                    },
                    {
                        icon: "/portable-lighting/4.png",
                        title: "Portable & Easy to Deploy",
                        desc: "Lightweight design with integrated handles allows quick installation, relocation, and setup.",
                    },
                ]}
            />

            <BlackSplitSection 
                sections={[
                    {
                        title: "Day & Night Performance: Medium Intensity (Type A)",
                        model: "Medium Intensity LED, Type-A (Supports A/B & A/C)",
                        description: "A high-performance white flashing system designed for dual marking, ensuring visibility against bright daytime skies and transitioning for night operations.",
                        features: [
                            "Distinct blue housing with optimized internal LED arrangement designed for maximum light throw and efficiency.",
                            "Covers requirements for Type A (White Day/Night), combined with Type B or C capabilities."
                        ],
                        image: "/activities-aircraft/day-night.png",
                        imageAlt: "Medium Intensity Obstruction Light"
                    },
                    {
                        title: "Maximum Range: High Intensity",
                        model: "High Intensity LED, Type-A",
                        description: "",
                        features: [
                            "The critical solution for major structures exceeding 500ft and catenary support systems.",
                            "Linear panel design optimized for specific beam spread and intensity requirements.",
                            "Heavy-duty yellow metal enclosure with reinforced mounting brackets for high-altitude installation."
                        ],
                        image: "/activities-aircraft/maximumrange.png",
                        imageAlt: "High Intensity Obstruction Light"
                    }
                ]}
            />

            <BlackSplitSection 
                isBlack={false}
                sections={[
                    {
                        title: "Low Intensity Steady Burning",
                        model: "Low Intensity LED, Type-E",
                        description: "Energy-efficient steady burning lights designed for structures under 150ft, providing continuous visibility without flashing.",
                        features: [
                            "Compact design suitable for smaller structures and installations.",
                            "Low power consumption with extended operational life.",
                            "Compliant with aviation safety standards for low-rise structures."
                        ],
                        image: "/activities-aircraft/day-night.png",
                        imageAlt: "Low Intensity Obstruction Light"
                    },
                    {
                        title: "Dual Mode Operation",
                        model: "Dual Mode LED System",
                        description: "",
                        features: [
                            "Automatic switching between day and night intensity levels.",
                            "Integrated photocell for seamless transition based on ambient light.",
                            "Reduces energy consumption while maintaining optimal visibility.",
                            "Suitable for various structure heights and applications."
                        ],
                        image: "/activities-aircraft/maximumrange.png",
                        imageAlt: "Dual Mode Obstruction Light"
                    }
                ]}
            />


            <InstallationProcess
                title="Built for Reliability & Compliance"
                description="Our obstruction lighting systems are engineered to perform in harsh environments while maintaining consistent visibility and operational efficiency."
                steps={[
                    {
                        id: "01",
                        title: "High-Intensity LED Technology",
                        desc: "Delivers powerful illumination for maximum visibility in all conditions while maintaining energy efficiency.",
                        image: "/obstruction-lighting/step1.png"
                    },
                    {
                        id: "02",
                        title: "Weather & Corrosion-Resistant Design",
                        desc: "Built to withstand harsh environmental conditions, ensuring reliable performance over time.",
                        image: "/obstruction-lighting/step2.png"
                    },
                    {
                        id: "03",
                        title: "Long Operational Lifespan",
                        desc: "Engineered for extended use, reducing the need for frequent replacements.",
                        image: "/obstruction-lighting/step3.png"
                    },
                    {
                        id: "04",
                        title: "Low Maintenance Requirements",
                        desc: "Designed for minimal upkeep, helping reduce operational costs and downtime.",
                        image: "/obstruction-lighting/step4.png"
                    }
                ]}
            />

            <IndustriesServe
                badge=""
                heading="Where It's Used"
                industries={[
                    { name: "High-rise buildings", image: "/portable-lighting/use1.png" },
                    { name: "Communication towers", image: "/portable-lighting/use2.png" },
                    { name: "Industrial plants", image: "/portable-lighting/use3.png" },
                    { name: "Bridges and infrastructure", image: "/portable-lighting/use4.png" },
                    { name: "Wind turbines and cranes", image: "/portable-lighting/use1.png" },
                ]}
            />

            <Faqs
                heading="Frequently Asked Questions"
                description=""
                faqs={[
                    {
                        question: "How long does the battery last on a full charge?",
                        answer: "Our obstruction lighting systems feature high-capacity batteries that provide 8-12 hours of continuous operation on a single charge, depending on the model and brightness settings."
                    },
                    {
                        question: "Are these lights suitable for harsh weather conditions?",
                        answer: "Yes. All our obstruction lighting units are IP65-rated or higher, making them fully weatherproof and resistant to dust, rain, and extreme temperatures."
                    },
                    {
                        question: "How quickly can the system be deployed?",
                        answer: "Our obstruction lighting systems can be fully deployed and operational within 15-30 minutes, requiring no external power source or complex installation."
                    },
                    {
                        question: "What is the visibility range of the lights?",
                        answer: "Depending on the model, our obstruction lights provide visibility ranging from 3 to 10 nautical miles, meeting ICAO and FAA standards for aviation lighting."
                    },
                    {
                        question: "Can the lights be recharged in the field?",
                        answer: "Yes. Our systems support multiple charging options including AC power, solar panels, and vehicle charging, ensuring operational flexibility in remote locations."
                    }
                ]}
                assistanceHeading="Need a Help ?"
                assistanceDescription="Our lighting specialists are ready to help you select the perfect obstruction lighting solution for your operational needs."
                contactPhone="+44 191 640 75 03"
                contactEmail="info@crantonelectric.com"
            />

            <CTASection
                heading={"Need an Obstruction Lighting Solution?"}
                description={"Tell us about your project requirements and our experts will help you design the right solution for your operational needs."}
                buttonText={"Request a Quote"}
                buttonHref={"/contact"}
            />
        </div>
    );
};

export default ObstructionLightingSolutions;
