"use client";
import Image from "next/image";
import SectionHeading from "./ui/section-heading";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
                setCurrentIndex((prev) => (prev + 1) % blocks.length);
            }, 3000);
        }
    }, [isMobile]);

    useEffect(() => {
        startAutoplay();
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [startAutoplay]);

    return (
        <section className="bg-white py-16 overflow-hidden">
            <div className="max-w-[1440px] w-[90%] mx-auto">
                <div className="text-center max-w-[90%] mx-auto mb-10">
                    <SectionHeading
                        title="The Building Blocks Of Safe & Reliable Vertiport & Heliport"
                        className="text-[20px] md:text-4xl text-black mb-6 leading-tight"
                    />
                    <p className="font-onest text-[14px] md:text-base leading-relaxed">
                        Cranton Heliport is engineered with precision, using high-performance materials and systems designed to meet demanding aviation standards. These core elements work together to deliver safety, durability, and long-term operational confidence.
                    </p>
                </div>

                {/* Mobile Slider Version */}
                <div className="md:hidden w-full relative">
                    <div
                        className="flex transition-transform duration-500 ease-in-out items-stretch"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {blocks.map((block, idx) => (
                            <div key={idx} className="w-full shrink-0 px-2 flex flex-col">
                                <div className="group p-4 md:p-6 rounded-[20px] border border-[#969696] bg-white transition-all duration-300 flex flex-col h-full min-h-[340px]">
                                    <div className="mb-8 relative w-16 h-16">
                                        <Image
                                            src={block.icon}
                                            alt={block.title}
                                            width={200}
                                            height={200}
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>
                                    <h3 className="font-rethink text-xl font-bold text-black mb-4 leading-snug">
                                        {block.title}
                                    </h3>
                                    <p className="font-onest text-[#86898C] text-[14px] mb-auto">
                                        {block.description}
                                    </p>
                                    <div className="mt-4">
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
                            </div>
                        ))}
                    </div>

                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {blocks.map((_, idx) => (
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
                <div className="hidden md:grid grid-cols-2 xl:grid-cols-4 gap-6">
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
                                    height={200}
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

                            <div className="mt-2">
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
