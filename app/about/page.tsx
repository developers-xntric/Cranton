import FourCards from "@/components/about/four-cards";
import { ValueCard } from "@/components/about/value-card";
import { TestimonialsSection, WhyChooseUsSection } from "@/components/about/why-choose";
import CTASection from "@/components/cta-section";
import DynamicHero from "@/components/dynamic-hero";

const About = () => {
    return (
        <div className="overflow-hidden md:overflow-auto">
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
                description1={"Cranton Electrical Limited is a global manufacturer specializing in aluminium helidecks, , heliport lighting systems, and obstruction lighting solutions for both offshore and land-based aviation environments. We deliver engineered solutions that enhance operational safety, regulatory compliance, and long-term reliability across heliport/vertiport and helideck infrastructure."}
                description2={"With extensive expertise in manufacturing and heliport/vertiport systems integration, Cranton supports government organizations, private operators, offshore facilities, hospitals, industrial sites, and aviation developers worldwide. Our solutions are designed to provide safe, efficient, and clearly marked landing environments for critical aviation operations."}
                description3={"Working closely with industry experts, engineering partners, and trusted vendors, Cranton combines technical precision with innovative aluminium fabrication capabilities to deliver high-performance helideck and platform systems tailored to demanding operational requirements."}
                description4={"Our lightweight aluminium structures are specifically engineered for applications where weight reduction, corrosion resistance, durability, and low maintenance are essential without compromising structural strength or safety standards. From fixed helidecks and portable deck platforms to advanced fixed and portable lighting systems, Cranton delivers customized solutions designed to meet the unique needs of every project locally and internationally."}
                image="/about/1.png"
            />
            <ValueCard
                title="Our Story"
                image="/about/2.png"
                isBlack={true}
                description1={"Cranton Electrical Limited was founded with a clear objective — to deliver reliable, high-performance helideck and heliports/vertiorts solutions for complex and demanding aviation environments. From the beginning, our focus has been on combining engineering expertise, manufacturing precision, and practical execution to meet the evolving needs of offshore, industrial, and land-based operations.Over the years, we have successfully delivered a wide range of heliport/helideck projects across multiple regions, supporting both government and private sector clients. Our commitment to quality, safety, compliance, and operational reliability has enabled us to build long-term partnerships based on trust and consistent performance"}
                description2={"We specialize in the design, manufacturing, and installation of aluminium helidecks, deck platforms, heliport lighting systems, and obstruction lighting solutions. Every system is engineered to meet specific operational and environmental requirements while maintaining the highest aviation safety standards"}
                description3={"Our team works closely with clients, consultants, vendors, and project partners throughout every stage from concept and engineering to manufacturing, installation, and commissioning ensuring smooth project execution and dependable long-term performance"}
                description4={"With a strong focus on lightweight aluminium structures, corrosion resistance, low maintenance requirements, and durable system performance, Cranton continues to deliver innovative heliport infrastructure solutions for clients locally and internationally"}
            />
            <FourCards
                heading="What We Do"
                para="Engineered helidecks, platforms, and lighting solutions built for safe, reliable offshore and land-based aviation operations."
                features={[{
                    icon: "/about/c1.png",
                    title: "Expert Engineering Solutions",
                    desc: "From concept to commissioning, our teams manage every stage with precision and strict compliance.",
                },
                {
                    icon: "/about/c2.png",
                    title: "Uncompromised Quality",
                    desc: "We follow strict quality standards to ensure all systems are safe, reliable, and durable, every time.",
                },
                {
                    icon: "/about/c3.png",
                    title: "Reliable Long-Term Support",
                    desc: "We provide ongoing support and maintenance to ensure systems perform efficiently throughout their lifecycle.",
                },
                {
                    icon: "/about/c4.png",
                    title: "Continuous Innovation",
                    desc: "We continuously refine processes, adopt new technologies, and strengthen capabilities to meet industry demands.",
                },
                ]} />
            <WhyChooseUsSection />
            <FourCards
                heading="The Values That Define Our Success"
                para={null}
                isBlack={true}
                features={[{
                    icon: "/about/c5.png",
                    title: "Safety First",
                    desc: "Every solution we manufacture is designed with aviation safety, operational reliability, and regulatory compliance at its core.",
                },
                {
                    icon: "/about/c6.png",
                    title: "Engineering Excellence",
                    desc: "We combine technical expertise, precision manufacturing, and innovative design to deliver high-performance helideck and heliport solutions.",
                },
                {
                    icon: "/about/c7.png",
                    title: "Quality & Durability",
                    desc: "Our aluminium structures and lighting systems are built for long-term strength, corrosion resistance, and low-maintenance performance in demanding environments.",
                },
                {
                    icon: "/about/c8.png",
                    title: "Client Commitment",
                    desc: "We work closely with every client to deliver tailored solutions, dependable support, and successful project execution from start to finish.",
                },
                ]} />
            <TestimonialsSection />
            <CTASection heading="Let’s Build Your Helideck Project" description={"Get in touch with our team to discuss your helideck requirements and receive a tailored solution designed for performance, safety, and long-term reliability."} />
        </div>
    )
}

export default About;
