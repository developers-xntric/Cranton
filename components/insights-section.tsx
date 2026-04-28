"use client";
import Image from "next/image";
import SectionHeading from "./ui/section-heading";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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

const insights = [
    {
        title: "What Is The Difference Between A Helipad And A Vertiport?",
        image: "/home/insights-1.png",
        isLarge: true
    },
    {
        title: "Decoding The Visual Language Of Vertiport & Heliport Markings",
        image: "/home/insights-2.png",
        isLarge: false
    },
    {
        title: "Differences Between Helicopter Landing Pads",
        image: "/home/insights-3.png",
        isLarge: false
    },
    {
        title: "Aluminum Vertiports- The Future Of Green Landing Systems For EVTOL/VTOL?",
        image: "/home/insights-4.png",
        isLarge: false
    }
];

export default function InsightsSection() {
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

    const startAutoplay = useCallback(() => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        if (isMobile) {
            autoplayRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % insights.length);
            }, 4000);
        }
    }, [isMobile]);

    useEffect(() => {
        startAutoplay();
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [startAutoplay]);

    return (
        <section className=" pt-7 md:pt-6 pb-16 overflow-hidden">
            <div className="max-w-360 w-[90%] mx-auto">
                <div className="text-center mb-10">
                    <SectionHeading
                        title="Insights That Power Smarter Decisions"
                        className="text-3xl md:text-4xl  text-black"
                    />
                </div>

                {/* Mobile Slider Version */}
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

                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {insights.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentIndex(idx);
                                    startAutoplay();
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

                {/* Desktop Grid Version */}
                <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left: One Large Card */}
                    <InsightCard
                        isLarge
                        image={insights[0].image}
                        title={insights[0].title}
                    />

                    {/* Right: Grid of 3 Cards */}
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
