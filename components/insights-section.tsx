import Image from "next/image";
import SectionHeading from "./ui/section-heading";
import { ArrowUpRight } from "lucide-react";

interface InsightCardProps {
    title: string;
    image: string;
    className?: string;
    isLarge?: boolean;
}

const InsightCard = ({ title, image, className = "", isLarge = false }: InsightCardProps) => (
    <div className={`group relative rounded-[10px] overflow-hidden cursor-pointer ${className} ${isLarge ? 'h-full min-h-[400px]' : 'h-[250px]'}`}>
        <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* Arrow Icon */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:border-white">
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white transition-colors duration-300 group-hover:text-black" />
            </div>
        </div>

        {/* Text */}
        <div className="absolute bottom-6 left-6 right-6">
            <h3 className={`font-rethink text-white  leading-tight ${isLarge ? 'text-xl md:text-3xl' : 'text-sm md:text-[15px] 2xl:text-[20px]'}`}>
                {title}
            </h3>
        </div>
    </div>
);

export default function InsightsSection() {
    return (
        <section className=" pt-6 pb-16">
            <div className="max-w-[1440px] w-[90%] mx-auto">
                <div className="text-center mb-10">
                    <SectionHeading
                        title="Insights That Power Smarter Decisions"
                        className="text-3xl md:text-4xl  text-black"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left: One Large Card */}
                    <InsightCard
                        isLarge
                        image="/home/insights-1.png"
                        title="What Is The Difference Between A Helipad And A Vertiport?"
                    />

                    {/* Right: Grid of 3 Cards */}
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                        <InsightCard
                            image="/home/insights-2.png"
                            title="Decoding The Visual Language Of Vertiport & Heliport Markings"
                        />
                        <InsightCard
                            image="/home/insights-3.png"
                            title="Differences Between Helicopter Landing Pads"
                        />
                        <InsightCard
                            className="col-span-2 h-[250px]! "
                            image="/home/insights-4.png"
                            title="Aluminum Vertiports- The Future Of Green Landing Systems For EVTOL/VTOL?"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
