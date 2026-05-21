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
                title={"Heliports & Vertiports Solutions"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Heliports & Vertiports Solutions" },
                ]}
                backgroundImage={"/hhero.png"}
            />
            <SecondHeli
                heading="Reliable Heliports & Vertiports for Offshore, Urban & Remote Operations"
                desc="Engineered for safety, durability, and operational efficiency, our heliport and vertiport solutions support secure helicopter landing operations across offshore, marine, industrial, and remote environments."
                heading2="Built for Safe Aviation Operations"
                desc2="Cranton’s heliport and vertiport solutions are designed to deliver stable, compliant, and high-performance landing areas for helicopters operating in demanding environments. Built using durable materials and precision engineering, our systems ensure long-term reliability, operational safety, and efficient deployment. <br /> <br /> From offshore energy facilities to temporary remote operations, our heliports and vertiports are tailored to meet aviation standards while supporting safe and uninterrupted helicopter access."
                para={[
                    "Designed for offshore platforms, vessels, and remote industrial sites where reliable helicopter access is essential.",
                    "Manufactured using high-strength materials to withstand harsh marine, weather, and operational conditions.",
                    "Engineered with anti-slip surfaces, integrated lighting compatibility, and balanced structural stability for safe helicopter operations.",
                    "Available in multiple sizes and configurations to suit operational, industrial, and aviation requirements."
                ]}
                titles={[
                    "Offshore & Remote Deployment",
                    "Durable Structural Engineering",
                    "Safe Landing Surface",
                    "Custom Platform Solutions"
                ]}
                image="/hs1.png"
            />
            <FourCards
                heading="Engineered for Performance"
                para={null}
                isBlack={true}
                features={[{
                    icon: "/h1.png",
                    title: "High Load Capacity",
                    desc: "Built to support demanding helicopter operations with stable load distribution and structural integrity.",
                },
                {
                    icon: "/h2.png",
                    title: "Weatherproof & Durable",
                    desc: "Designed to perform in challenging marine and offshore environments with long-lasting durability.",
                },
                {
                    icon: "/h3.png",
                    title: "Compliance Ready",
                    desc: "Manufactured to align with aviation and heliport operational standards for safe and reliable performance.",
                },
                {
                    icon: "/h4.png",
                    title: "Fast Installation",
                    desc: "Efficient assembly and deployment process minimizes operational downtime and installation complexity.",
                },
                ]} />
            <SplitSectionHelideck
                sections={[
                    {
                        title: "Designed for Demanding Aviation Environments",
                        image: "/hb.png",
                        imageAlt: "Engineering",
                        paragraphs: [
                            "Cranton helideck platforms are engineered to provide safe, durable, and reliable landing infrastructure for offshore and land-based aviation operations. Manufactured using high-strength aluminium, our platforms are designed to perform in harsh environmental conditions while maintaining structural integrity, operational safety, and long-term efficiency.",
                            "From permanent installations to portable deployment systems, every helideck platform is developed to meet international aviation standards and project-specific operational requirements. With a strong focus on lightweight construction, corrosion resistance, and low maintenance performance, Cranton delivers dependable solutions for critical aviation environments."
                        ],
                        points: [
                            { title: "Lightweight Aluminium Construction",description: "Strong, corrosion-resistant structures designed for demanding environments." },
                            { title: "Fixed & Portable Platform Solutions",description: "Flexible helideck systems for permanent, temporary, and remote operations."  },
                            { title: "Engineered For Harsh Conditions",description: "Built to withstand offshore, marine, industrial, and remote environments."  },
                            { title: "Safe, Durable & Compliant",description: "Designed to meet international aviation safety and operational standards."  },
                        ],
                    },
                ]}
            />
            <IndustriesServe
                badge=""
                heading="Where It's Used"
                industries={[
                    { name: "Emergency & Medical Operations", image: "/w11new.png" },
                    { name: "Marine & Vessel Operations", image: "/w12new.png" },
                    { name: "Construction & Infrastructure Projects", image: "/w13.png" },
                    { name: "Temporary Aviation Installations", image: "/w14new.png" },
                    { name: "Emergency Response Sites", image: "/w15new.png" },
                    { name: "Healthcare", image: "/w16new.png" },
                ]}
                className="md:py-0! md:pb-10!"
            />

            <Faqs
                heading="Frequently Asked Questions"
                description=""
                faqs={[
                    {
                        question: "What are helideck platform solutions?",
                        answer: "Our obstruction lighting systems feature high-capacity batteries that provide 8-12 hours of continuous operation on a single charge, depending on the model and brightness settings."
                    },
                    {
                        question: "Where can helideck platforms be installed?",
                        answer: "They can be installed on offshore platforms, vessels, industrial facilities, remote sites, and temporary operational locations."
                    },
                    {
                        question: "Are the platforms compliant with aviation standards?",
                        answer: "Our obstruction lighting systems can be fully deployed and operational within 15-30 minutes, requiring no external power source or complex installation."
                    },
                    {
                        question: "Can the platforms be customized?",
                        answer: "Depending on the model, our obstruction lights provide visibility ranging from 3 to 10 nautical miles, meeting ICAO and FAA standards for aviation lighting."
                    },
                    {
                        question: "Are the platforms suitable for long-term use?",
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
