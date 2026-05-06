import Image from "next/image";

interface Industry {
    name: string;
    image: string;
}

interface IndustriesServeProps {
    badge: string;
    heading: string;
    industries: Industry[];
}

export default function IndustriesServe({ badge, heading, industries }: IndustriesServeProps) {
    return (
        <section className="bg-white py-14 md:py-16 w-full">
            <div className="2xl:max-w-[1100px] w-[90%] md:w-[70%] mx-auto">
                <div className="flex items-center gap-2 mb-6 border border-gray-200 px-4 py-2 rounded-full w-fit hidden">
                    <span className="w-2 h-2 rounded-full bg-[#168DCA]" />
                    <span className="text-xs md:font-semibold text-black tracking-normal lg:tracking-wide">
                        {badge}
                    </span>
                </div>

                <h2 className="text-[20px] md:text-3xl lg:text-[40px] leading-[1.2] text-[#0a0f1e] mb-6 max-w-[80%]">
                    {heading}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {industries.map((industry, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 md:gap-4 bg-[#F5F5F5] md:p-3 rounded-full hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="relative md:w-14 md:h-14 w-10 h-10 rounded-full overflow-hidden shrink-0">
                                <Image
                                    src={industry.image}
                                    alt={industry.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-[9px] md:text-[17px] text-[#1a1a1a] font-medium">
                                {industry.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
