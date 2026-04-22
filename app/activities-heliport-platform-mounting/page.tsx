import DynamicHero from "@/components/dynamic-hero";
import ImageContentSection from "@/components/activities-helideck/image-content-section";
import SplitSectionHelideck from "@/components/activities-helideck/splitsection-helideck";
import FourCards from "@/components/about/four-cards";
import CTASection from "@/components/cta-section";

const ActivitiesHeliportPlatformMounting = () => {
    return (
        <div>
            <DynamicHero
                title={"Heliport Platform Mounting"}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Heliport Platform Mounting" },
                ]}
                backgroundImage={"/heliport-mounting/hero.png"}
            />
            <ImageContentSection
                image="/heliport-mounting/helipad.webp"
                imageAlt="Heliport Platform Mounting"
                title="Heliport Platform Mounting"
                paragraphs={[
                    "Heliport platform mounting involves complex engineering to ensure the structural integrity and stability of heliports on various surfaces. Our team provides expert solutions for mounting platforms on rooftops, offshore vessels, and other challenging environments, ensuring compliance with all safety and aviation standards.",
                ]}
                subTitle=""
                points={[]}
            />
            <FourCards
                isBlack={true}
                heading="Key Features"
                para=""
                features={[
                    {
                        icon: "/heliport-mounting/1.png",
                        title: "Vibration Isolation System",
                        desc: "Reduces vibration and noise transfer to the building structure..",
                    },
                    {
                        icon: "/heliport-mounting/2.png",
                        title: "Stable Platform Support",
                        desc: "Ensures secure and balanced mounting of the helideck.",
                    },
                    {
                        icon: "/heliport-mounting/3.png",
                        title: "Custom Mounting Design",
                        desc: "Designed according to structural and site-specific requirements.",
                    },
                    {
                        icon: "/heliport-mounting/4.png",
                        title: "Improved Safety",
                        desc: "Improves operational safety and overall helideck performance.",
                    },
                ]}
            />
            <SplitSectionHelideck
                sections={[
                    {
                        title: "Specifications",
                        image: "/heliport-mounting/specification.png",
                        imageAlt: "Engineering Precision",
                        paragraphs: [
                            "Our platform mounting services focus on delivering high-performance structural foundations for heliports. We use advanced materials and engineering techniques to ensure long-term reliability and safety.",
                            "Every project involves a detailed analysis of the site conditions and operational requirements to provide a secure and stable mounting solution.",
                        ],
                        points: [
                            { title: "Service Type: Platform Mounting" },
                            { title: "Process: Site Analysis & Engineering" },
                            { title: "Compliance: Aviation Standards" },
                            { title: "Outcome: Stable & Secure Infrastructure" },
                        ],
                    },
                    {
                        title: "Applications",
                        image: "/heliport-mounting/application.png",
                        imageAlt: "Engineering Precision",
                        reverse: true,
                        paragraphs: [
                            "Heliport platform mounting is essential for a wide range of applications, including urban rooftop developments, offshore energy platforms, and remote industrial facilities.",
                            "These services ensure that helicopters can land safely in environments where traditional ground-level landing pads are not feasible.",
                        ],
                        points: [
                            { title: "Offshore Platforms" },
                            { title: "Urban Rooftops" },
                            { title: "Industrial Complexes" },
                        ],
                    },
                ]}
            />
            <CTASection
                heading={"Need a Custom Heliport Solution?"}
                description={"Get in touch with our experts to discuss your platform mounting requirements and receive a tailored heliport solution built for safety and reliability."}
                buttonText={"Request a Quote"}
                buttonHref={"/contact"}
            />
        </div>
    );
};

export default ActivitiesHeliportPlatformMounting;
