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
                isPartner={true}
                title={
                    "Creating Long-Term Value With Our Technology Partners"
                }
                image=""
                description1={""}
                description2={""}
            />
        </div>
    )
}

export default About;
