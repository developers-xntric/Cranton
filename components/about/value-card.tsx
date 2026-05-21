import Image from "next/image";

interface ValueCardProps {
    title: string;
    description1?: string;
    description2?: string;
    description3?: string;
    description4?: string;
    image: string;
    isBlack?: boolean
}

export function ValueCard({
    title,
    image,
    isBlack,
    description1,
    description2,
    description3,
    description4,
}: ValueCardProps) {
    return (
        <section className={`w-full ${isBlack ? "bg-black" : "bg-background"} py-12 md:py-20 md:px-8`}>
            <div className="2xl:max-w-350 w-[90%] mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 ${isBlack ? ' direction-rtl' : ''} items-stretch`}>

                    {/* Desktop Image */}
                    <div className="hidden md:flex justify-center h-full">
                        <div className="rounded-lg overflow-hidden shadow-lg w-full max-w-m h-full">
                            <Image
                                width={2000}
                                height={2000}
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2 h-full">

                        {/* Title */}
                        <h2 className={`text-[20px] md:text-3xl lg:text-[36px] font-medium leading-[1.2]  ${isBlack ? 'text-end text-white' : 'text-start text-[#0a0f1e]'}`}>
                            {title}
                        </h2>

                        {description1 && <p className={`text-[14px] md:text-[14px] 2xl:text-[18px] leading-relaxed text-[#333] ${isBlack ? 'text-end text-white opacity-80' : 'text-start'}`}>
                            {description1}
                        </p>}

                        {description2 && <p className={`text-[14px] md:text-[14px] 2xl:text-[18px] leading-relaxed text-[#333] ${isBlack ? 'text-end text-white opacity-80' : 'text-start'}`}>
                            {description2}
                        </p>}

                        {description3 && <p className={`text-[14px] md:text-[14px] 2xl:text-[18px] leading-relaxed text-[#333] ${isBlack ? 'text-end text-white opacity-80' : 'text-start'}`}>
                            {description3}
                        </p>}

                        {description4 && <p className={`text-[14px] md:text-[14px] 2xl:text-[18px] leading-relaxed text-[#333] ${isBlack ? 'text-end text-white opacity-80' : 'text-start'}`}>
                            {description4}
                        </p>}
                    </div>

                    {/* Mobile Image */}
                    <div className="flex md:hidden justify-center">
                        <div className="rounded-lg overflow-hidden shadow-lg w-full max-w-m">
                            <Image
                                width={2000}
                                height={2000}
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}