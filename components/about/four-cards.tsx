"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function FourCards({ heading, para }: { heading: string; para: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const features = [
        {
            icon: "/about/c1.png",
            title: "Expert Engineering Solutions",
            desc: "From concept to commissioning, our teams manage every stage with precision and strict compliance.",
        },
        {
            icon: "/about/c2.png",
            title: "Uncompromised Quality",
            desc: "We follow strict quality standards to ensure all systems are safe, reliable, and durable, every time.",
        },
        {
            icon: "/about/c3.png",
            title: "Reliable Long-Term Support",
            desc: "We provide ongoing support and maintenance to ensure systems perform efficiently throughout their lifecycle.",
        },
        {
            icon: "/about/c4.png",
            title: "Continuous Innovation",
            desc: "We continuously refine processes, adopt new technologies, and strengthen capabilities to meet industry demands.",
        },
    ];

    // Handle screen size detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Handle autoplay for mobile slider
    const startAutoplay = useCallback(() => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        if (isMobile) {
            autoplayRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % features.length);
            }, 2000);
        }
    }, [isMobile, features.length]);

    useEffect(() => {
        startAutoplay();
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [startAutoplay]);

    return (
        <section className="relative w-full bg-white py-16 overflow-hidden">
            {/* Grid Background */}
            {/* <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(to right, #333131 1px, transparent 1px), linear-gradient(to bottom, #333131 1px, transparent 1px)`,
                    backgroundSize: '50px 100px',
                }}
            /> */}

            <div className="2xl:max-w-350 w-[90%] mx-auto relative z-10 flex flex-col items-center">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-[20px] md:text-3xl lg:text-[40px] font-medium leading-[1.2] text-black text-center mb-10"
                >
                    {heading}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-[16px] leading-[1.2] text-black text-center mb-10"
                >
                    {para}
                </motion.p>
                {/* Mobile Slider Version */}
                <div className="md:hidden w-full overflow-hidden relative">
                    <div
                        className="flex transition-transform duration-500 ease-in-out items-stretch"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.5, delay: idx * 0.2 }}
                                className="w-full shrink-0 px-2 flex flex-col"
                            >
                                <div className="flex flex-col items-start p-6 rounded-[10px] border border-[#969696] bg-[rgba(255,255,255,0.05)] h-full min-h-70">
                                    <div className="mb-6 w-10 h-16 relative">
                                        <Image src={feature.icon} alt={feature.title} height={500} width={500} />
                                    </div>
                                    <h3 className="text-[17px] font-medium text-white mb-3 mt-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-white text-[13px] leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {features.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentIndex(idx);
                                    startAutoplay(); // Reset timer
                                }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? "bg-white w-4" : "bg-white/20"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Desktop Grid Version */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            className="flex flex-col items-start p-6 rounded-[10px] border border-[#969696] bg-[rgba(255,255,255,0.05)]"
                        >
                            <div className="mb-10 w-10 h-16 relative">
                                <Image src={feature.icon} alt={feature.title} height={500} width={500} />
                            </div>
                            <h3 className="text-[25px] leading-8 font-bold text-black mb-3 mt-8">
                                {feature.title}
                            </h3>
                            <p className="text-[#86898C] text-[14px] leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
