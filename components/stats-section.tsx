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

const stats = [
    { label: "Completed Projects", value: 400, suffix: "" },
    { label: "Countries Served", value: 32, suffix: "+" },
    { label: "Years of Experience", value: 8, suffix: "+" },
];

export default function StatsSection() {
    return (
        <section className="bg-[#EFEFEF] pt-8 md:pt-16 pb-16">
            <div className="max-w-360 w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-9 place-items-center">
                {/* Left: Image */}
                <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-2xl">
                    <Image
                        src="/home/stats-left.png"
                        alt="Engineering Precision"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>

                {/* Right: Content */}
                <div className="flex flex-col">
                    <SectionHeading
                        title="Engineering Precision. Manufacturing Excellence"
                        className="text-[20px] md:text-4xl font-normal text-black mb-4 leading-tight text-left"
                    />

                    <div className="space-y-3 2xl:space-y-6 mb-3 2xl:mb-5">
                        <p className="font-onest text-[14px] md:text-base leading-relaxed text-[#86898C]">
                            Cranton is a specialist manufacturer and solutions provider for aviation and infrastructure systems, with a strong focus on helideck and helipad solutions, aviation lighting, and electrical safety equipment. We combine engineering expertise with in-house manufacturing to deliver products that meet the highest standards of safety, durability, and compliance.
                        </p>
                        <p className="font-onest text-[14px] md:text-base leading-relaxed text-[#86898C]">
                            Built on a foundation of technical knowledge and practical experience, Cranton supports clients across aviation, offshore, healthcare, defense, and industrial sectors. Our products are designed to perform in demanding environments where reliability and precision are critical.
                        </p>
                    </div>

                    <Button title="About Us" href="/about" className="w-fit mb-12 md:mb-6 2xl:mb-16" />

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-y-6 2xl:gap-y-12 gap-x-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col relative">
                                {/* Vertical separator for left items in large screens, or just layout discipline */}
                                {index % 2 === 1 && (
                                    <div className="absolute -left-5 top-2 bottom-2 w-px bg-gray-200 hidden sm:block" />
                                )}
                                <div className="font-rethink text-4xl md:text-5xl font-bold text-black mb-1 2xl:mb-2 tabular-nums">
                                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
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
