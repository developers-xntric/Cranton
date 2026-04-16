import Button from "@/components/ui/grad-button";
import Image from "next/image";

interface ValueCardProps {
    title: string;
    description1?: any;
    description2?: any;
    image: string;
    isPartner?: boolean;
}

// Default descriptions
const defaultDescription1 = "At Americana Computers, we see ourselves as more than just vendors; we view our partnerships as pathways to collaboration and innovation. Among the trusted digital transformation providers in UAE, we partner with leading global technology corporations to provide infrastructure, cloud platforms, and enterprise systems with high security and performance.";

const defaultDescription2 = "Our industry-leading partnerships enable us to deliver the best digital transformation services in UAE and the UAE to organizations looking to adopt the latest technologies and scale up digitally. We combine our expertise with the capabilities of the world's leading technology firms to create scalable, future-ready solutions for evolving enterprise environments.";

export function ValueCard({
    title,
    description1,
    description2,
    image
}: ValueCardProps) {
    return (
        <section className="w-full bg-background py-12 md:py-20 md:px-8">
            <div className="2xl:max-w-350 w-[90%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

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
                        <h2 className="text-[20px] md:text-3xl lg:text-[35px] font-medium leading-[1.2] text-[#0a0f1e]">
                            {title}
                        </h2>

                        <p className="text-[14px] md:text-[14px] 2xl:text-[18px] leading-relaxed text-black font-medium">
                            {defaultDescription1}
                        </p>


                        <p className="text-[14px] md:text-[14px] 2xl:text-[18px] leading-relaxed text-black font-medium">
                            {defaultDescription2}
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