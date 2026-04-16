"use client";

import { useState, useEffect, useRef } from "react";

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
    { value: 800, suffix: "+", label: "Completed Projects" },
    { value: 43, suffix: "+", label: "Heliports Equipped" },
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

// ─── Animated Counter ────────────────────────────────────────────────────────
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
                    className={`w-4 h-4 ${i <= count ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

// ─── Why Choose Us Section ───────────────────────────────────────────────────
function WhyChooseUsSection() {
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
        <section className="bg-white py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Top Grid: Left Text | Right Mission/Vision */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-14 lg:mb-16">
                    {/* Left Column */}
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
                            Why Choose Us
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                            We Deliver Lightweight, Strong, And Low-Maintenance Helideck
                            Solutions Tailored To Meet The Unique Requirements Of Every
                            Project. Our Experienced Team Ensures Reliable Performance, Strict
                            Safety Compliance, And Innovative Engineering Practices.
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            We Combine Advanced Technology, Precise Planning, And
                            International Standards To Provide Solutions That Are Safe,
                            Durable, And Cost-Effective. Trusted By Both Government And
                            Private Sector Clients, Locally And Internationally, We Focus On
                            Delivering Consistent Excellence And Long-Term Value In Every
                            Project We Undertake.
                        </p>
                    </div>

                    {/* Right Column: Mission + Vision */}
                    <div className="flex flex-col gap-8">
                        {/* Mission */}
                        <div className="flex gap-4 items-start">
                            <div className="shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-2">
                                    Our Mission
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    To Provide The Highest Technical Competence Through Strong
                                    Collaboration And The Shortest Possible Delivery Time In The
                                    Manufacturing And Commissioning Of Helidecks.
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100" />

                        {/* Vision */}
                        <div className="flex gap-4 items-start">
                            <div className="shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-2">
                                    Vision
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    To Collaborate With Research Institutes And High-Tech Partners
                                    In Developing Advanced, Innovative, And Future-Ready Heliport
                                    Solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 mb-10 lg:mb-12" />

                {/* Stats Row */}
                <div
                    ref={statsRef}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-4"
                >
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center sm:text-left">
                            <div className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-1">
                                <AnimatedCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    isVisible={statsVisible}
                                />
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 font-medium">
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
function TestimonialsSection() {
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
        <section className="bg-gray-50 py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
                    <div className="max-w-xl">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight leading-tight">
                            What Our Clients Say
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                            We are proud to have earned the trust of our clients worldwide.
                            Read their feedback on how our helideck and heliport solutions
                            deliver safety, reliability, and innovation across every project.
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-2 self-start sm:self-center shrink-0">
                        <button
                            onClick={prev}
                            disabled={currentIndex === 0}
                            className={`w-9 h-9 rounded flex items-center justify-center border transition-all duration-200 ${currentIndex === 0
                                    ? "bg-white border-gray-200 text-gray-300 cursor-not-allowed"
                                    : "bg-white border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600"
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
                            className={`w-9 h-9 rounded flex items-center justify-center border transition-all duration-200 ${currentIndex >= maxIndex
                                    ? "bg-gray-300 border-gray-300 text-white cursor-not-allowed"
                                    : "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
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
                            className="bg-white rounded-lg border border-gray-200 p-6 sm:p-7 flex flex-col gap-4 shadow-sm"
                        >
                            {/* Stars + Quote icon */}
                            <div className="flex items-start justify-between">
                                <StarRating count={t.stars} />
                                <svg
                                    className="w-8 h-8 text-gray-200 shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 32 32"
                                >
                                    <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7c0-1.654 1.346-3 3-3V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-7c0-1.654 1.346-3 3-3V8z" />
                                </svg>
                            </div>

                            {/* Text */}
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed flex-1">
                                &ldquo;{t.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dot indicators (mobile) */}
                <div className="flex justify-center gap-1.5 mt-6 sm:hidden">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${i === currentIndex ? "bg-blue-600 w-5" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Page Export ─────────────────────────────────────────────────────────────
export default function Sections() {
    return (
        <main className="font-sans antialiased">
            <WhyChooseUsSection />
            <TestimonialsSection />
        </main>
    );
}