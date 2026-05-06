import FourCards from '@/components/about/four-cards';
import SplitSectionHelideck from '@/components/activities-helideck/splitsection-helideck';
import DynamicHero from '@/components/dynamic-hero';
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
                backgroundImage={"/heli.png"}
            />
            <SecondHeli
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
                    icon: "/2.png",
                    title: "Modular & Scalable Design",
                    desc: "Flexible interlocking systems that adapt to different site sizes and operational requirements.",
                },
                {
                    icon: "/3.png",
                    title: "High Load-Bearing Strength",
                    desc: "Built to support heavy helicopter operations with structural stability.",
                },
                {
                    icon: "/4.png",
                    title: "Anti-Slip & Weather Resistant",
                    desc: "Durable surface ensures safe operations in all environmental conditions.",
                },
                {
                    icon: "/5.png",
                    title: "Rapid Installation",
                    desc: "Quick assembly and dismantling for time-critical deployments.",
                },
                ]} />
            <SplitSectionHelideck
                sections={[
                    {
                        title: "Designed for Demanding Environments",
                        image: "/6.png",
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
        </div>
    )
}

export default PortableHelipadsAndVertipads
