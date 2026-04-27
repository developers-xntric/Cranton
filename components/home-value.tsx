import Image from "next/image"

const HomeValue = ({ image, title }: { image: string; title: string }) => {
    return (
        <section className={`w-full py-12 md:py-20 md:px-8`}>
            <div className="2xl:max-w-350 w-[90%] mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2  gap-8 lg:gap-6 items-center`}>
                    {/* Content */}
                    <div className="flex flex-col gap-2">
                        {/* Title */}
                        <h2 className={`text-[20px] md:text-3xl lg:text-[40px] font-normal leading-[1.2]`}>
                            {title}
                        </h2>

                        <p className={`text-[14px] md:text-[16px] 2xl:text-[18px] leading-relaxed text-[#7C7E86] mb-2`}>
                            MESH is a patented, field-proven modular heliport and vertiport system developed by Unified Aviation. Designed for helicopters and future eVTOL aircraft, it provides a modern, safe, and sustainable alternative to traditional concrete landing platforms.
                        </p>


                        <p className={`text-[14px] md:text-[16px] 2xl:text-[18px] leading-relaxed text-[#7C7E86] } mb-2`}>
                            Already deployed and fully certified at the King Abdullah Financial District rooftop heliport in Riyadh, MESH is built for rapid deployment, long-term durability, and low environmental impact.
                        </p>

                        <p className={`text-[14px] md:text-[16px] 2xl:text-[18px] leading-relaxed text-[#7C7E86] }`}>
                            As a complete self-contained landing system, MESH includes the key components required for safe vertical aviation operations and sets a new standard for next-generation heliports and vertiports.
                        </p>
                    </div>

                    {/* Desktop Image */}
                    <div className="hidden md:flex justify-center">
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
    )
}

export default HomeValue
