"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SectionHeading from "./ui/section-heading";
import Button from "./ui/grad-button";

const AnimatedNumber = ({ value, suffix = "+" }: { value: number, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let start = 0;
                const end = value;
                const duration = 1500; // 1.5 seconds
                const stepTime = 16; // ~60fps
                const totalSteps = duration / stepTime;
                const increment = end / totalSteps;

                const timer = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        setCount(end);
                        clearInterval(timer);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, stepTime);

                return () => clearInterval(timer);
            } else {
                setCount(0); // Reset for "every time" requirement
            }
        }, { threshold: 0.1 });

        if (elementRef.current) observer.observe(elementRef.current);
        return () => observer.disconnect();
    }, [value]);

    return <div ref={elementRef}>{count}{suffix}</div>;
};

type StatsSectionProps = {
    image: string;
    heading: string;
    paragraphs: string[];
    ctaLabel: string;
    ctaHref: string;
    stats: Array<{ label: string; value: number; suffix?: string }>;
};

export default function StatsSection({
    image,
    heading,
    paragraphs,
    ctaLabel,
    ctaHref,
    stats,
}: StatsSectionProps) {
    return (
        <section className="bg-[#EFEFEF] pt-8 md:pt-16 pb-16">
            <div className="max-w-360 w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-9 place-items-center">
                <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-2xl">
                    <Image
                        src={image}
                        alt="Engineering Precision"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>

                <div className="flex flex-col">
                    <SectionHeading
                        title={heading}
                        className="text-[20px] md:text-4xl font-normal text-black mb-4 leading-tight text-left"
                    />

                    <div className="space-y-3 2xl:space-y-6 mb-3 2xl:mb-5">
                        {paragraphs.map((paragraph) => (
                            <p key={paragraph} className="font-onest text-[14px] md:text-base leading-relaxed text-[#86898C]">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <Button title={ctaLabel} href={ctaHref} className="w-fit mb-12 md:mb-6 2xl:mb-16" />

                    <div className="grid grid-cols-2 gap-y-6 2xl:gap-y-12 gap-x-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col relative">
                                {index % 2 === 1 && (
                                    <div className="absolute -left-5 top-2 bottom-2 w-px bg-gray-200 hidden sm:block" />
                                )}
                                <div className="font-rethink text-4xl md:text-5xl font-bold text-black mb-1 2xl:mb-2 tabular-nums">
                                    <AnimatedNumber value={stat.value} suffix={stat.suffix ?? "+"} />
                                </div>
                                <div className="font-onest text-sm md:text-base text-[#7C7E86] ">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
