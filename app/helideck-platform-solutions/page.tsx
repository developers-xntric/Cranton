import FourCards from '@/components/about/four-cards';
import SplitSectionHelideck from '@/components/activities-helideck/splitsection-helideck';
import CTASection from '@/components/cta-section';
import DynamicHero from '@/components/dynamic-hero';
import Faqs from '@/components/faqs';
import IndustriesServe from '@/components/industries-serve';
import SecondHeli from '@/components/second-heli';

const HelideckPlatformSolutions = () => {
    return (
        <div>
            <DynamicHero
                title={"Helideck Platform Solutions"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Helideck Platform Solutions" },
                ]}
                backgroundImage={"/heli.png"}
            />
            <SecondHeli
                heading="Reliable Helideck Platforms for Offshore & Onshore <br/> Operations"
                desc="Engineered for safety, durability, and operational efficiency, our helideck platform solutions support secure helicopter landing operations across offshore, marine, industrial, and remote environments."
                heading2="Built for Safe Aviation Operations"
                desc2="Cranton’s helideck platform solutions are designed to deliver stable, compliant, and high-performance landing areas for helicopters operating in demanding environments. Built using durable materials and precision engineering, our systems ensure long-term reliability, operational safety, and efficient deployment. <br /> <br /> From offshore energy facilities to temporary remote operations, our helideck platforms are tailored to meet aviation standards while supporting safe and uninterrupted helicopter access."
                para={["Easily deploy modular floating platforms across various water bodies, enabling stable operations without permanent marine.", "Reduces the need for heavy marine construction, offering a more efficient and budget-friendly solution.", "Engineered for buoyancy and balance, the system provides a secure, anti-slip surface suitable for both operational and recreational use.", "Adaptable for industrial, marine, leisure, and temporary setups, making it ideal for a wide range of floating applications."]}
                titles={["Flexible Deployment on Water Surfaces", "Cost-Effective Alternative to Fixed Structures", "Stable and Safe Platform Design", "Supports Diverse Applications"]}
                image="/ms.png"
            />
            <FourCards
                heading="Engineered for Performance"
                para={null}
                isBlack={true}
                features={[{
                    icon: "/22.png",
                    title: "Modular & Scalable Design",
                    desc: "Flexible interlocking systems that adapt to different site sizes and operational requirements.",
                },
                {
                    icon: "/333.png",
                    title: "High Load-Bearing Strength",
                    desc: "Built to support heavy helicopter operations with structural stability.",
                },
                {
                    icon: "/444.png",
                    title: "Anti-Slip & Weather Resistant",
                    desc: "Durable surface ensures safe operations in all environmental conditions.",
                },
                {
                    icon: "/555.png",
                    title: "Rapid Installation",
                    desc: "Quick assembly and dismantling for time-critical deployments.",
                },
                ]} />
            <SplitSectionHelideck
                sections={[
                    {
                        title: "Designed for Demanding Environments",
                        image: "/mb.png",
                        imageAlt: "Engineering Precision",
                        paragraphs: [
                            "Our systems are engineered to deliver consistent performance under demanding conditions, combining strength, durability, and operational efficiency.",
                        ],
                        points: [
                            { title: "High-strength modular materials" },
                            { title: "Optimized load distribution" },
                            { title: "Long operational lifespan" },
                            { title: "Minimal maintenance requirements" },
                        ],
                    },
                ]}
            />
            <IndustriesServe
                badge=""
                heading="Where It's Used"
                industries={[
                    { name: "Marinas & Floating Docks", image: "/w6.png" },
                    { name: "Industrial & Work Platforms", image: "/w7.png" },
                    { name: "Temporary Floating Structures", image: "/w8.png" },
                    { name: "Leisure & Recreational Facilities", image: "/w9.png" },
                    { name: "Events & Specialized Installations", image: "/w10.png" },
                ]}
            />

            <Faqs
                heading="Frequently Asked Questions"
                description=""
                faqs={[
                    {
                        question: "What are modular floating solutions?",
                        answer: "Our obstruction lighting systems feature high-capacity batteries that provide 8-12 hours of continuous operation on a single charge, depending on the model and brightness settings."
                    },
                    {
                        question: "Where can these floating systems be used?",
                        answer: "They can be deployed in remote locations, construction sites, emergency zones, offshore areas, and any environment where permanent infrastructure is not feasible."
                    },
                    {
                        question: "How easy is the installation process?",
                        answer: "Our obstruction lighting systems can be fully deployed and operational within 15-30 minutes, requiring no external power source or complex installation."
                    },
                    {
                        question: "Are the platforms stable in water?",
                        answer: "Depending on the model, our obstruction lights provide visibility ranging from 3 to 10 nautical miles, meeting ICAO and FAA standards for aviation lighting."
                    },
                    {
                        question: "Can the system be reused or relocated?",
                        answer: "Yes. Our systems support multiple charging options including AC power, solar panels, and vehicle charging, ensuring operational flexibility in remote locations."
                    }
                ]}
                assistanceHeading="Need a Help ?"
                assistanceDescription="Our lighting specialists are ready to help you select the perfect obstruction lighting solution for your operational needs."
                contactPhone="+44 191 640 75 03"
                contactEmail="info@crantonelectric.com"
            />
            <CTASection heading="Need a Portable Helipad Solution?" description={"Tell us about your project requirements and our experts will help you design the right solution for your operational needs."} />
        </div>
    )
}

export default HelideckPlatformSolutions;
