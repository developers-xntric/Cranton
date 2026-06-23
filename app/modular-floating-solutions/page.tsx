import FourCards from '@/components/about/four-cards';
import SplitSectionHelideck from '@/components/activities-helideck/splitsection-helideck';
import CTASection from '@/components/cta-section';
import DynamicHero from '@/components/dynamic-hero';
import Faqs from '@/components/faqs';
import IndustriesServe from '@/components/industries-serve';
import { modularFloatingSolutionsFaqs } from '@/lib/solution-faqs';
import SecondHeli from '@/components/second-heli';

const ModularFloatingSolutions = () => {
    return (
        <div>
            <DynamicHero
                title={"Modular Floating Solutions"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Modular Floating Solutions" },
                ]}
                backgroundImage={"/mhero.png"}
            />
            <SecondHeli
                heading="Modular Floating Solutions for Flexible Water-Based Operations"
                desc="Engineered for stability, adaptability, and durability, our modular floating systems enable reliable performance across marine, industrial, and temporary applications."
                heading2="Built for Versatility on Water"
                desc2="Catobo’s modular floating solutions are designed to create stable and scalable platforms for a wide range of water-based applications. Using interlocking, high-strength units, these systems can be deployed quickly without the need for complex marine construction. <br/> <br/> From industrial operations to leisure and temporary installations, our solutions ensure consistent performance, safety, and flexibility in dynamic environments."
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
                    desc: "Interlocking units allow flexible configurations tailored to different project sizes and requirements.",
                },
                {
                    icon: "/333.png",
                    title: "High Load Stability",
                    desc: "Designed for balanced load distribution, ensuring safe and stable performance on water.",
                },
                {
                    icon: "/444.png",
                    title: "Durable Weather Protection",
                    desc: "Built with high-quality materials to withstand harsh marine and environmental conditions.",
                },
                {
                    icon: "/555.png",
                    title: "Quick Installation",
                    desc: "Simple assembly process enables fast deployment with minimal equipment and manpower.",
                },
                ]} />
            <SplitSectionHelideck
                sections={[
                    {
                        title: "Designed for Demanding Water Environments",
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
                className="md:py-0! md:pb-10!"
            />

            <Faqs
                heading="Frequently Asked Questions"
                description=""
                faqs={modularFloatingSolutionsFaqs}
                showNumbers={true}
                assistanceHeading="Need Help ?"
                assistanceDescription="Our lighting specialists are ready to help you select the perfect obstruction lighting solution for your operational needs."
                contactPhone="+44 191 640 75 03"
                contactEmail="info@crantonelectric.com"
                image="/faqs/3.png"
            />
            <CTASection heading="Need a Portable Helipad Solution?" description={"Tell us about your project requirements and our experts will help you design the right solution for your operational needs."} />
        </div>
    )
}

export default ModularFloatingSolutions
