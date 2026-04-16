import Image from "next/image";

interface ValueCardProps {
    title: string;
    description1?: any;
    description2?: any;
    image: string;
    isPartner?: boolean;
}

// Default descriptions
const defaultDescription1 = "We are a global brand that specializes in consulting, manufacturing & constructing aluminium helidecks and providing heliport solutions, for both offshore and land-based helidecks. We focus on delivering effective and superior solutions for marking assets and landing areas for guaranteed safe operations. We have been a huge part of offering our trusted services to both government and private organizations.";

const defaultDescription2 = "Working with experts, vendors and other external partners help Cranton Electrical to support its mission of providing optimal solutions in the industry. Our expert team has extensive knowledge of aluminium helidecks and delivering heliport related solutions. This offers possibilities for successful implementation of innovative ideas and advanced aluminium solutions in helidecks.";

const defaultDescription3 = "Our wide range of solutions focuses on areas where there are weight limitations and also provide low maintenance costs without compromising on the strength of structures. We cater to offering our services to suit every specific requirement to all brands and businesses locally and internationally.";

export function ValueCard({
    title,
    image
}: ValueCardProps) {
    return (
        <section className="w-full bg-background py-12 md:py-20 md:px-8">
            <div className="2xl:max-w-350 w-[90%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-center">

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

                    {/* Content */}
                    <div className="flex flex-col gap-2">

                        {/* Title */}
                        <h2 className="text-[20px] md:text-3xl lg:text-[36px] font-medium leading-[1.2] text-[#0a0f1e] max-w-[50%]">
                            {title}
                        </h2>

                        <p className="text-[14px] md:text-[14px] 2xl:text-[18px] leading-relaxed text-[#333] font-medium">
                            {defaultDescription1}
                        </p>


                        <p className="text-[14px] md:text-[14px] 2xl:text-[18px] leading-relaxed text-[#333] font-medium">
                            {defaultDescription2}
                        </p>

                        <p className="text-[14px] md:text-[14px] 2xl:text-[18px] leading-relaxed text-[#333] font-medium">
                            {defaultDescription3}
                        </p>
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