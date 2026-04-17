import Image from "next/image";
import SectionHeading from "./ui/section-heading";

const blocks = [
    {
        title: "High-Performance Aluminium Profiles",
        description: "Precision-engineered aluminium profiles form the foundation of our heliport landing surfaces.",
        icon: "/home/block-card1.png"
    },
    {
        title: "Advanced Electrical & Lighting Systems",
        description: "Our integrated electrical systems ensure clear visibility and safe operations in all conditions.",
        icon: "/home/block-card2.png"
    },
    {
        title: "Engineered Steel Foundation Systems",
        description: "A Vertiport & heliport is only as strong as its foundation. Our steel structures are engineered for optimal load distribution.",
        icon: "/home/block-card3.png"
    },
    {
        title: "Precision Platform Mounting & Isolation",
        description: "We utilize specialized mounting and isolation solutions to separate the heliport from the building structure.",
        icon: "/home/block-card4.png"
    }
];

export default function BuildingBlocks() {
    return (
        <section className="bg-white py-16">
            <div className="max-w-[1440px] w-[90%] mx-auto">
                <div className="text-center max-w-[90%] mx-auto mb-10">
                    <SectionHeading
                        title="The Building Blocks Of Safe & Reliable Vertiport & Heliport"
                        className="text-3xl md:text-4xl text-black mb-6 leading-tight"
                    />
                    <p className="font-onest text-[15px] md:text-base leading-relaxed">
                        Cranton Heliport is engineered with precision, using high-performance materials and systems designed to meet demanding aviation standards. These core elements work together to deliver safety, durability, and long-term operational confidence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {blocks.map((block, index) => (
                        <div
                            key={index}
                            className="group p-5 rounded-[20px] border border-[#969696]  transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col min-h-[340px]"
                        >
                            <div className="mb-8 relative w-20 h-20">
                                <Image
                                    src={block.icon}
                                    alt={block.title}
                                    width={200}
                                    height={2000}
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>

                            <h3 className="font-rethink text-xl md:text-2xl font-bold text-black mb-4 leading-snug">
                                {block.title}
                            </h3>

                            <p className="font-onest text-[#86898C] text-[14px]  mb-auto">
                                {block.description}
                            </p>

                            <div className="mt-5">
                                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 group-hover:bg-[#168DCA] group-hover:border-[#168DCA]">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
                                    >
                                        <path d="M7 17L17 7M7 7h10v10" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
