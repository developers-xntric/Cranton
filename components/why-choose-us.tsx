import Image from "next/image";
import SectionHeading from "./ui/section-heading";
import Button from "./ui/grad-button";
import { ShieldCheck, Settings, Globe, Briefcase } from "lucide-react";

const features = [
    {
        title: "Engineered for Compliance & Safety",
        description: "Our products are designed and manufactured to meet international aviation and safety standards. From lighting systems to structural components, every solution is built to ensure safe operations and regulatory confidence from day one.",
        icon: ShieldCheck
    },
    {
        title: "Manufacturing-Driven Quality",
        description: "Our products are designed and manufactured to meet international aviation and safety standards. From lighting systems to structural components, every solution is built to ensure safe operations and regulatory confidence from day one.",
        icon: Settings
    },
    {
        title: "Proven in Real-World Installations",
        description: "Our products are designed and manufactured to meet international aviation and safety standards. From lighting systems to structural components, every solution is built to ensure safe operations and regulatory confidence from day one.",
        icon: Globe
    },
    {
        title: "Built to Support Your Project Goals",
        description: "Our products are designed and manufactured to meet international aviation and safety standards. From lighting systems to structural components, every solution is built to ensure safe operations and regulatory confidence from day one.",
        icon: Briefcase
    }
];

export default function WhyChooseUs() {
    return (
        <section className="bg-white py-16 overflow-hidden">
            <div className="max-w-[1440px] w-[90%] mx-auto">
                {/* Header Section */}
                <div className="text-center max-w-4xl mx-auto mb-8">
                    <SectionHeading
                        title="Why Industry Leaders Choose Cranton"
                        className="text-3xl md:text-4xl font-medium text-black mb-4 leading-tight"
                    />
                    <p className="font-onest text-[#7C7E86] text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                        From manufacturing precision to on-site readiness, Cranton delivers aviation, Vertiport & heliport solutions engineered for performance, compliance, and long-term reliability.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                    {/* Left: Main Image */}
                    <div className="relative aspect-auto w-full rounded-[20px] overflow-hidden min-h-[500px]">
                        <Image
                            src="/home/why-choose-us.png"
                            alt="Futuristic Vertiport"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Right: Features Grid & CTA */}
                    <div className="flex flex-col h-full justify-between">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex flex-col border-b border-[#CACCD2] pb-6">
                                    <div className="mb-4 text-[#000]">
                                        <feature.icon className="w-8 h-8 stroke-1" />
                                    </div>
                                    <h3 className="font-rethink text-xl  text-black mb-2 leading-snug">
                                        {feature.title}
                                    </h3>
                                    <p className="font-onest text-[#7C7E86] text-[14px] leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12">
                            <Button
                                title="Inquire Now"
                                size="lg"
                                className="rounded-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
