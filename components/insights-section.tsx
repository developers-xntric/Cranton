"use client";
import Image from "next/image";
import SectionHeading from "./ui/section-heading";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
    title: string;
    image: string;
    className?: string;
    isLarge?: boolean;
}

const InsightCard = ({ title, image, className = "", isLarge = false }: InsightCardProps) => (
    <div className={`group relative rounded-[10px] overflow-hidden cursor-pointer ${className} ${isLarge ? 'h-full min-h-75 md:min-h-100' : 'h-62.5'}`}>
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
        <div className="absolute bottom-6 left-3 md:left-6 right-6">
            <h3 className={`font-rethink text-white leading-tight ${isLarge ? 'text-[18px] md:text-3xl' : 'text-[18px] md:text-[15px] 2xl:text-[20px]'}`}>
                {title}
            </h3>
        </div>
    </div>
);

type Insight = {
    title: string;
    image: string;
    isLarge?: boolean;
};

export default function InsightsSection({
    heading,
    insights,
}: {
    heading: string;
    insights: Insight[];
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Handle screen size detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        if (isMobile) {
            autoplayRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % insights.length);
            }, 4000);
        }
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [isMobile, insights.length]);

    return (
        <section className=" pt-7 md:pt-6 pb-16 overflow-hidden">
            <div className="max-w-360 w-[90%] mx-auto">
                <div className="text-center mb-10">
                    <SectionHeading
                        title={heading}
                        className="text-3xl md:text-4xl  text-black"
                    />
                </div>

                <div className="md:hidden w-full relative">
                    <div
                        className="flex transition-transform duration-500 ease-in-out items-stretch"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {insights.map((insight, idx) => (
                            <div key={idx} className="w-full shrink-0 px-2">
                                <InsightCard
                                    title={insight.title}
                                    image={insight.image}
                                    isLarge={true} // Use consistent height for slider
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-2 mt-6">
                        {insights.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentIndex(idx);
                                    if (autoplayRef.current) clearInterval(autoplayRef.current);
                                    if (isMobile) {
                                        autoplayRef.current = setInterval(() => {
                                            setCurrentIndex((prev) => (prev + 1) % insights.length);
                                        }, 4000);
                                    }
                                }}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300",
                                    currentIndex === idx ? "bg-[#168DCA] w-4" : "bg-black/20"
                                )}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <InsightCard
                        isLarge
                        image={insights[0].image}
                        title={insights[0].title}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InsightCard
                            image={insights[1].image}
                            title={insights[1].title}
                        />
                        <InsightCard
                            image={insights[2].image}
                            title={insights[2].title}
                        />
                        <InsightCard
                            className="md:col-span-2 h-50 md:h-62.5"
                            image={insights[3].image}
                            title={insights[3].title}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
