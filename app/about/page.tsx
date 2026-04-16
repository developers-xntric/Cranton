import { ValueCard } from "@/components/about/value-card";
import DynamicHero from "@/components/dynamic-hero";

const About = () => {
    return (
        <div>
            <DynamicHero
                title={"About Us"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "About Us" },
                ]}
                backgroundImage={"/about/hero.png"}
            />
            <ValueCard
                title="About Cranton Electrical Limited"
                image="/about/2.png"
            />
            <ValueCard
                title="Our Story"
                image="/about/2.png"
                isBlack={true}
            />
        </div>
    )
}

export default About;
