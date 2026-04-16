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
        </div>
    )
}

export default About;
