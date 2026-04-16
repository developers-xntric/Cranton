import FourCards from "@/components/about/four-cards";
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
                description1={"Cranton Electrical Limited was founded with a clear objective to deliver reliable, high-performance helideck solutions for complex and demanding environments. From the very beginning, our focus has been on combining technical expertise with practical execution to meet the evolving needs of the aviation and offshore industries."}
                description2={"Over the years, we have successfully delivered a wide range of helideck projects across multiple regions, working with both government and private sector clients. Our ability to consistently maintain high standards of quality, safety, and performance has helped us build long-term relationships based on trust and reliability."}
                description3={"We specialize in the design, manufacturing, and installation of aluminium helidecks and associated systems, ensuring every solution is tailored to specific operational requirements. Our team works closely with clients, consultants, and external partners to ensure smooth execution at every stage of the project."}
                description4={"We specialize in the design, manufacturing, and installation of aluminium helidecks and associated systems, ensuring every solution is tailored to specific operational requirements. Our team works closely with clients, consultants, and external partners to ensure smooth execution at every stage of the project."}
            />
            <FourCards heading="What We Do" para="We provide complete heliport solutions, combining expertise, innovation, and safety for both offshore and land-based helidecks." />
        </div>
    )
}

export default About;
