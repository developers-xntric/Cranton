"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface Step {
    id: string;
    title: string;
    desc: string;
    image: string;
}

interface InstallationProcessProps {
    title: string;
    description: string;
    steps: Step[];
}

export default function InstallationProcess({ title, description, steps }: InstallationProcessProps) {
    const containerRef = useRef<HTMLElement>(null);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || isMobile) return;
            const rect = containerRef.current.getBoundingClientRect();
            const totalScrollable = rect.height - window.innerHeight;
            const currentScroll = -rect.top;
            const scrollProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
            setProgress(scrollProgress);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobile]);

    const getCardStyle = (index: number) => {
        if (isMobile) return { opacity: 1, transform: "none", visibility: "visible" as any };
        if (index === 0) return { opacity: 1, transform: "translateY(0)" };

        const cardSteps = [0, 0.1, 0.4, 0.7];
        const start = cardSteps[index];
        const cardProgress = Math.max(0, Math.min(1, (progress - start) / 0.3));

        return {
            opacity: cardProgress,
            transform: `translateY(${(1 - cardProgress) * 100}px)`,
            visibility: cardProgress > 0 ? 'visible' : 'hidden' as any
        };
    };

    return (
        <section ref={containerRef} className="relative w-full h-auto lg:h-[400vh] bg-[#F0F0F0] py-16 lg:py-0">
            <div className="relative lg:sticky lg:top-0 w-full lg:h-screen overflow-hidden flex flex-col items-center justify-center">
                <div className="2xl:max-w-350 w-[90%] mx-auto relative lg:h-[80vh] flex flex-col gap-8 lg:gap-0">

                    <div className="relative lg:absolute lg:top-0 lg:left-0 w-full lg:max-w-125 z-20">
                        <h2 className="text-[20px] md:text-3xl lg:text-[40px] leading-[1.2] text-black mb-4">
                            {title.split('<br />').map((line, i) => (
                                <span key={i}>
                                    {line}
                                    {i < title.split('<br />').length - 1 && <br />}
                                </span>
                            ))}
                        </h2>
                        <p className="text-black text-[14px] max-w-full lg:max-w-[320px]">
                            {description}
                        </p>
                    </div>

                    <div className="relative w-full flex flex-col gap-6 lg:block lg:h-full">
                        <div className="relative lg:absolute lg:bottom-0 lg:left-0 w-full lg:max-w-[30%] 2xl:max-w-100 lg:h-[55%]">
                            <StepCard step={steps[0]} style={getCardStyle(0)} />
                        </div>

                        <div className="relative lg:absolute lg:bottom-0 lg:left-[32%] w-full lg:max-w-[35%] 2xl:max-w-115 lg:h-[85%]">
                            <StepCard step={steps[1]} style={getCardStyle(1)} />
                        </div>

                        <div className="relative lg:absolute lg:top-0 lg:right-0 w-full lg:max-w-[30%] 2xl:max-w-112.5 lg:h-[48%]">
                            <StepCard step={steps[2]} style={getCardStyle(2)} />
                        </div>

                        <div className="relative lg:absolute lg:bottom-0 lg:right-0 w-full lg:max-w-[30%] 2xl:max-w-112.5 lg:h-[49%] 2xl:h-[48%]">
                            <StepCard step={steps[3]} style={getCardStyle(3)} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StepCard({ step, style }: { step: Step; style: React.CSSProperties }) {
    return (
        <div
            style={style}
            className="bg-white rounded-[24px] border border-black p-5 md:p-8 shadow-sm transition-all duration-300 ease-out flex flex-col gap-10 h-full justify-between"
        >
            <div className="flex justify-between items-start">
               
                <div className="relative w-12 h-12  overflow-hidden">
                    <Image alt={step.title} src={step.image} fill className="object-cover" />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-[22px] text-black leading-tight">
                    {step.title}
                </h3>
                <p className="text-black text-[11.5px] 2xl:text-[13px]">
                    {step.desc}
                </p>
            </div>
        </div>
    );
}
