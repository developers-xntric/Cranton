import FourCards from '@/components/about/four-cards';
import SplitSectionHelideck from '@/components/activities-helideck/splitsection-helideck';
import CTASection from '@/components/cta-section';
import DynamicHero from '@/components/dynamic-hero';
import Faqs from '@/components/faqs';
import IndustriesServe from '@/components/industries-serve';
import { portableHelipadsVertipadsFaqs } from '@/lib/solution-faqs';
import SecondHeli from '@/components/second-heli';

const PortableHelipadsAndVertipads = () => {
    return (
        <div>
            <DynamicHero
                title={"Portable Helipads & Vertipads"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Portable Helipads & Vertipads" },
                ]}
                backgroundImage={"/ph.png"}
            />
            <SecondHeli
                heading="Portable Helipads & Vertipads <br/> for Rapid Deployment"
                desc="Engineered for speed, safety, and reliability, our modular landing systems enable secure helicopter operations in temporary, remote, and high-demand environments."
                image="/ps1.png"
                heading2="Built for Critical Operations"
                desc2="Catobo’s portable helipad and vertipad solutions are designed to deliver stable and compliant landing platforms where permanent infrastructure is not feasible. Using modular, high-strength systems, these platforms can be deployed quickly with minimal site preparation. <br/> <br/> Whether for emergency response, construction sites, or remote operations, our solutions ensure consistent performance and operational safety."
                para={["Deploy landing platforms quickly in remote or temporary locations, ensuring immediate access for helicopters.", "Eliminates the need for complex civil works, significantly lowering installation costs while accelerating project timelines.", "Provides stable, anti-slip, and load-tested surfaces that maintain safety standards even in non-permanent environments.", "Designed for high-pressure scenarios such as emergency response and defense operations where reliability and speed are essential."]}
                titles={["Enables rapid aviation access anywhere", "Reduces infrastructure cost and time", "Ensures safe operations in temporary setups", "Supports mission-critical deployments"]}
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
                    icon: "/33.png",
                    title: "High Load-Bearing Strength",
                    desc: "Built to support heavy helicopter operations with structural stability.",
                },
                {
                    icon: "/44.png",
                    title: "Slip-Resistant & Durable",
                    desc: "Durable surface ensures safe operations in all environmental conditions.",
                },
                {
                    icon: "/55.png",
                    title: "Rapid Installation",
                    desc: "Quick assembly and dismantling for time-critical deployments.",
                },
                ]} />
            <SplitSectionHelideck
                sections={[
                    {
                        title: "Designed for Demanding Environments",
                        image: "/pb.png",
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
                    { name: "Emergency & Medical Operations", image: "/w1.png" },
                    { name: "Remote & Off-Grid Locations", image: "/w2.png" },
                    { name: "Construction & Infrastructure Projects", image: "/w3.png" },
                    { name: "Temporary Aviation Facilities", image: "/w4.png" },
                    { name: "Defense & Rapid Response", image: "/w5.png" },
                ]}
                className="md:py-0! md:pb-10!"
            />

            <Faqs
                heading="Frequently Asked Questions"
                description=""
                faqs={portableHelipadsVertipadsFaqs}
                showNumbers={true}
                assistanceHeading="Need a Help ?"
                assistanceDescription="Our lighting specialists are ready to help you select the perfect obstruction lighting solution for your operational needs."
                contactPhone="+44 191 640 75 03"
                contactEmail="info@crantonelectric.com"
                image="/faqs/2.png"
            />
            <CTASection heading="Need a Portable Helipad Solution?" description={"Tell us about your project requirements and our experts will help you design the right solution for your operational needs."} />
        </div>
    )
}

export default PortableHelipadsAndVertipads
