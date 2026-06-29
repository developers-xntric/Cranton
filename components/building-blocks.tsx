"use client";
import Image from "next/image";
import SectionHeading from "./ui/section-heading";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BuildingBlock = {
    title: string;
    description: string;
    icon: string;
};

type BuildingBlocksProps = {
    heading: string;
    description: string;
    blocks: BuildingBlock[];
};

export default function BuildingBlocks({
    heading,
    description,
    blocks,
}: BuildingBlocksProps) {
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
                setCurrentIndex((prev) => (prev + 1) % blocks.length);
            }, 3000);
        }
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [isMobile, blocks.length]);

    return (
        <section className="bg-white pb-8 md:pb-16 overflow-hidden">
            <div className="max-w-360 w-[90%] mx-auto">
                <div className="text-center max-w-[90%] mx-auto mb-10">
                    <SectionHeading title={heading} className="text-[20px] md:text-4xl text-black mb-6 leading-tight" />
                    <p className="font-onest text-[14px] md:text-base leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="md:hidden w-full relative">
                    <div
                        className="flex transition-transform duration-500 ease-in-out items-stretch"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {blocks.map((block, idx) => (
                            <div key={idx} className="w-full shrink-0 px-2 flex flex-col">
                                <div className="group p-4 md:p-6 rounded-[20px] border border-[#969696] bg-white transition-all duration-300 flex flex-col h-full ">
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
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-2 mt-6">
                        {blocks.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentIndex(idx);
                                    if (autoplayRef.current) clearInterval(autoplayRef.current);
                                    if (isMobile) {
                                        autoplayRef.current = setInterval(() => {
                                            setCurrentIndex((prev) => (prev + 1) % blocks.length);
                                        }, 3000);
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

                <div className={`hidden md:grid grid-cols-2 xl:grid-cols-4 gap-6`}>
                    {blocks.map((block, index) => (
                        <div
                            key={index}
                            className={`group p-5 rounded-[20px] border border-[#969696]  transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col ${index > 3 ? 'col-span-2' : ''}`}
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

                            {/* <div className="mt-2">
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
                            </div> */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
