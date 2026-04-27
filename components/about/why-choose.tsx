"use client";

import { useState, useEffect, useRef } from "react";
import SectionHeading from "../ui/section-heading";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Stat {
    value: number;
    suffix: string;
    label: string;
}

interface Testimonial {
    id: number;
    stars: number;
    text: string;
    name: string;
    role: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const stats: Stat[] = [
    { value: 450, suffix: "", label: "Completed Projects" },
    { value: 32, suffix: "+", label: "Countries Served" },
    { value: 8, suffix: "+", label: "Years Of Experience" },
];

const testimonials: Testimonial[] = [
    {
        id: 1,
        stars: 5,
        text: "Cranton Electrical Delivered Our Offshore Helideck Project On Time With Exceptional Quality. Their Team Ensured Every Detail Met International Safety Standards.",
        name: "John Smith",
        role: "Offshore Project Manager",
    },
    {
        id: 2,
        stars: 4,
        text: "The Team's Technical Expertise And Innovative Approach Made Our Land-Based Heliport Project Seamless And Reliable. Highly Recommended!",
        name: "Sarah Johnson",
        role: "Aviation Operations Lead",
    },
    {
        id: 3,
        stars: 5,
        text: "Outstanding professionalism and technical excellence throughout the entire project lifecycle. Their commitment to quality is unmatched in the industry.",
        name: "Michael Chen",
        role: "Senior Infrastructure Director",
    },
    {
        id: 4,
        stars: 5,
        text: "Working with this team transformed our heliport project from a complex challenge into a smooth delivery. Their engineering precision is second to none.",
        name: "Amira Hassan",
        role: "Aviation Safety Consultant",
    },
];

function AnimatedCounter({
    value,
    suffix,
    isVisible,
}: {
    value: number;
    suffix: string;
    isVisible: boolean;
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;
        let start = 0;
        const duration = 1800;
        const steps = 60;
        const increment = value / steps;
        const stepDuration = duration / steps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
        <span>
            {count}
            {suffix}
        </span>
    );
}

// ─── Star Rating ─────────────────────────────────────────────────────────────
function StarRating({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <svg
                    key={i}
                    className={`w-6 h-6 ${i <= count ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 18 18"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export function WhyChooseUsSection() {
    const statsRef = useRef<HTMLDivElement>(null);
    const [statsVisible, setStatsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStatsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="bg-white pb-12 lg:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Top Grid: Left Text | Right Mission/Vision */}
                <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-b border-dashed border-[#C9C9C9]">
                    {/* Left Column */}
                    <div className="pb-12 lg:py-12">
                        <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-5 leading-tight tracking-tight">
                            Why Choose Us
                        </h2>
                        <p className="text-sm sm:text-base max-w-[95%] text-[#64748B] leading-relaxed mb-5">
                            We Deliver Lightweight, Strong, And Low-Maintenance Helideck
                            Solutions Tailored To Meet The Unique Requirements Of Every
                            Project. Our Experienced Team Ensures Reliable Performance, Strict
                            Safety Compliance, And Innovative Engineering Practices.
                        </p>
                        <p className="text-sm sm:text-base max-w-[95%] text-[#64748B] leading-relaxed">
                            We Combine Advanced Technology, Precise Planning, And
                            International Standards To Provide Solutions That Are Safe,
                            Durable, And Cost-Effective. Trusted By Both Government And
                            Private Sector Clients, Locally And Internationally, We Focus On
                            Delivering Consistent Excellence And Long-Term Value In Every
                            Project We Undertake.
                        </p>
                    </div>

                    {/* Right Column: Mission + Vision */}
                    <div className="flex flex-col gap-8 lg:border-l border-dashed border-[#C9C9C9] lg:pt-12 relative">
                        {/* Mission */}
                        <div className="flex flex-col gap-4 items-start lg:ms-10">
                            <div className="flex gap-5 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 41 39" fill="none">
                                    <path d="M21.9815 1.22884L26.4403 10.1892C26.7688 10.8383 27.3958 11.2892 28.1189 11.3894L38.1342 12.848C38.7191 12.9302 39.2499 13.2387 39.6084 13.7096C39.963 14.1744 40.1152 14.7635 40.0291 15.3426C39.959 15.8234 39.7326 16.2682 39.3861 16.6089L32.129 23.6437C31.5982 24.1346 31.3578 24.8619 31.486 25.5732L33.2727 35.4632C33.463 36.6574 32.6718 37.7834 31.486 38.0098C30.9973 38.088 30.4965 38.0058 30.0558 37.7814L21.1222 33.127C20.4592 32.7923 19.676 32.7923 19.013 33.127L10.0793 37.7814C8.98162 38.3645 7.62154 37.9678 7.01061 36.8858C6.78426 36.455 6.70414 35.9641 6.77825 35.4853L8.56498 25.5932C8.69318 24.8839 8.45081 24.1526 7.922 23.6617L0.664907 16.6309C-0.198412 15.7974 -0.224452 14.4249 0.606818 13.5613C0.624846 13.5433 0.644877 13.5232 0.664907 13.5032C1.00943 13.1526 1.46213 12.9302 1.95087 12.8721L11.9662 11.4114C12.6873 11.3092 13.3142 10.8624 13.6447 10.2092L17.9433 1.22884C18.3259 0.459441 19.1191 -0.0194313 19.9804 0.000605207H20.2488C20.996 0.0907695 21.647 0.553613 21.9815 1.22884Z" fill="#96B6C5" />
                                    <path d="M20.0103 32.8774C19.6224 32.8895 19.2445 32.9937 18.9046 33.1801L10.0146 37.824C8.92685 38.3431 7.62515 37.9402 7.01529 36.9C6.78934 36.4751 6.70736 35.9881 6.78334 35.5111L8.55893 25.64C8.67891 24.9225 8.43896 24.1929 7.91708 23.6878L0.656738 16.6588C-0.205066 15.815 -0.221062 14.4301 0.622745 13.5662C0.634742 13.5542 0.64474 13.5442 0.656738 13.5342C1.00066 13.1935 1.44456 12.969 1.92245 12.8988L11.9462 11.4237C12.672 11.3315 13.3019 10.8785 13.6218 10.2211L17.9788 1.12772C18.3927 0.394154 19.1865 -0.0427782 20.0263 0.00332011C20.0103 0.59859 20.0103 32.4726 20.0103 32.8774Z" fill="#025094" />
                                </svg>
                                <h3 className="text-2xl font-medium text-black mb-2 relative top-1">
                                    Our Mission
                                </h3>
                            </div>
                            <p className="lg:ms-14 lg:max-w-[70%] text-sm text-gray-600 leading-relaxed">
                                To Provide The Highest Technical Competence Through Strong
                                Collaboration And The Shortest Possible Delivery Time In The
                                Manufacturing And Commissioning Of Helidecks.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="flex flex-col gap-4 items-start lg:border-t lg:border-dashed lg:border-[#C9C9C9] lg:pt-12">
                            <div className="flex gap-5 items-center lg:ms-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 43 43" fill="none">
                                    <path d="M0 27.4721C0 36.048 6.95203 42.9999 15.5278 42.9999C24.1037 42.9999 31.0556 36.048 31.0556 27.4721C31.0556 18.8962 24.1037 11.9443 15.5278 11.9443C6.95203 11.9443 0 18.8962 0 27.4721Z" fill="#025094" />
                                    <path d="M15.0263 6.24188C14.7353 6.63132 15.0421 7.16667 15.5283 7.16667C26.7426 7.16667 35.8338 16.2578 35.8338 27.4722C35.8338 27.9584 36.3692 28.2651 36.7585 27.9741C40.5476 25.1428 43.0005 20.6216 43.0005 15.5278C43.0005 6.95203 36.0486 0 27.4727 0C22.3789 0 17.8576 2.45287 15.0263 6.24188Z" fill="#96B6C5" />
                                </svg>
                                <h3 className="text-2xl font-medium text-black mb-2 relative top-1">
                                    Vision
                                </h3>
                            </div>
                            <p className="lg:ms-24 lg:max-w-[70%] text-sm text-gray-600 leading-relaxed">
                                To Collaborate With Research Institutes And High-Tech Partners
                                In Developing Advanced, Innovative, And Future-Ready Heliport
                                Solutions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 mb-10 lg:mb-12" />

                {/* Stats Row */}
                <div
                    ref={statsRef}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-36"
                >
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center sm:text-left mx-auto">
                            <div className="text-4xl sm:text-7xl font-medium text-black tracking-tight mb-1">
                                <AnimatedCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    isVisible={statsVisible}
                                />
                            </div>
                            <p className="text-xs sm:text-sm text-[#64748B] font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Testimonials Section ────────────────────────────────────────────────────
export function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // How many cards to show based on screen
    const getVisibleCount = () => {
        if (typeof window === "undefined") return 2;
        return window.innerWidth >= 768 ? 2 : 1;
    };

    const [visibleCount, setVisibleCount] = useState(2);

    useEffect(() => {
        const handle = () => setVisibleCount(getVisibleCount());
        handle();
        window.addEventListener("resize", handle);
        return () => window.removeEventListener("resize", handle);
    }, []);

    const maxIndex = Math.max(0, testimonials.length - visibleCount);

    const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
    const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

    const visible = testimonials.slice(currentIndex, currentIndex + visibleCount);

    return (
        <section className="bg-[#EFEFEF] py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
            <div className="2xl:max-w-360 w-[95%] mx-auto">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
                    <div className="max-w-3xl">
                        <SectionHeading title="What Our Clients Say" className="text-3xl md:text-4xl mb-6" />
                        <p className="text-sm sm:text-[14px] 2xl:text-[18px] text-[#000000] leading-relaxed">
                            We are proud to have earned the trust of our clients worldwide. Read their feedback on how our helideck and heliport solutions deliver safety, reliability, and innovation across every project.
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="gap-2 self-start sm:self-center shrink-0 md:flex hidden">
                        <button
                            onClick={prev}
                            disabled={currentIndex === 0}
                            className={`w-16 h-9 rounded flex items-center justify-center border transition-all duration-200 ${currentIndex === 0
                                ? "bg-white border-gray-200 text-gray-300 cursor-not-allowed"
                                : "bg-white border-[#025094] text-[#025094]"
                                }`}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={next}
                            disabled={currentIndex >= maxIndex}
                            className={`w-16 h-9 rounded flex items-center justify-center border transition-all duration-200 ${currentIndex >= maxIndex
                                ? "bg-gray-300 border-gray-300 text-white cursor-not-allowed"
                                : "bg-grad text-white"
                                }`}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Cards */}
                <div
                    className={`grid gap-5 ${visibleCount === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                        }`}
                >
                    {visible.map((t) => (
                        <div
                            key={t.id}
                            className="bg-white rounded-lg border border-black p-6 sm:p-10 flex flex-col gap-10 shadow-sm"
                        >
                            {/* Stars + Quote icon */}
                            <div className="flex items-start justify-between">
                                <StarRating count={t.stars} />
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none">
                                    <path d="M14.7521 8.49168C11.6742 16.0466 5.21067 15.3897 2.12747 11.2463C-0.955727 7.10302 2.90226 1.75794 6.28794 1.10099C9.67361 0.444038 15.0599 2.9076 15.0505 11.1467C15.038 22.1234 4.35214 32.64 3.17789 33.5635" stroke="black" stroke-opacity="0.2" strokeWidth="2" stroke-linecap="round" />
                                    <path d="M33.9125 8.49168C30.8346 16.0466 24.3711 15.3897 21.2879 11.2463C18.2047 7.10302 22.0627 1.75794 25.4483 1.10099C28.834 0.444038 34.2203 2.9076 34.2109 11.1467C34.1984 22.1234 23.5125 32.64 22.3383 33.5635" stroke="black" stroke-opacity="0.2" strokeWidth="2" stroke-linecap="round" />
                                </svg>
                            </div>

                            {/* Text */}
                            <p className="text-sm sm:text-xl text-[#64748B] leading-relaxed flex-1">
                                &ldquo;{t.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="border-t lg:flex lg:gap-2 items-center border-gray-100 pt-4">
                                <p className="text-sm font-semibold text-[#1B1B1B]">{t.name}</p>
                                <p className="text-sm text-[rgba(27,27,27,0.50)]">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex md:hidden my-4 gap-2 relative left-[25%]">
                    <button
                        onClick={prev}
                        disabled={currentIndex === 0}
                        className={`w-16 h-9 rounded flex items-center justify-center border transition-all duration-200 ${currentIndex === 0
                            ? "bg-white border-gray-200 text-gray-300 cursor-not-allowed"
                            : "bg-white border-[#025094] text-[#025094]"
                            }`}
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        disabled={currentIndex >= maxIndex}
                        className={`w-16 h-9 rounded flex items-center justify-center border transition-all duration-200 ${currentIndex >= maxIndex
                            ? "bg-gray-300 border-gray-300 text-white cursor-not-allowed"
                            : "bg-grad text-white"
                            }`}
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
                {/* Dot indicators (mobile) */}
                <div className="flex justify-center gap-1.5 mt-6 sm:hidden">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${i === currentIndex ? "bg-grad w-5" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
