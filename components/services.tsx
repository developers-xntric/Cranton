import Image from "next/image";
import Link from "next/link";
import Button from "./ui/grad-button";

import { cn } from "@/lib/utils";

const services = [
    {
        title: "Heliports & Vertiports Solutions",
        description: "High-strength, durable platform systems designed to provide secure and reliable landing surfaces for offshore and onshore helideck operations.",
        image: "/home/service-4.png",
        link: "heliports-&-vertiports-solutions",
       
    },
    {
        title: "End-to-End Solutions for Heliports, Vertiports, & Obstruction Lighting",
        description: "We engineer future ready high-performance solutions for heliports, vertiports, and advanced air mobility sites with a focus on safety, precision, and compliance.",
        image: null,
        link: "#",
    },
    {
         title: "Heliports & Vertiports Lighting Solutions",
        description: "Advanced lighting systems engineered for precision, visibility, and compliance, supporting safe take-off, landing, and ground operations.",
        image: "/home/service-5.png",
        link: "/heliports-&-vertiports-lighting-solutions",
    },
    {
        title: "Portable Helipads & Vertipads",
        description: "Rapid-deploy, modular landing solutions designed for temporary and emergency operations, ensuring safe and stable helicopter access across diverse terrains.",
        image: "/home/service-1.png",
        link: "/portable-helipads-and-vertipads",
    },
    {
       
        title: "Modular Floating Solutions",
        description: "Modular, easy-to-deploy floating systems designed for stability and versatility. Ideal for helipads, platforms, and marine applications, delivering reliable performance.",
        image: "/home/service-3.png",
        link: "/modular-floating-solutions",
    },
    {
        title: "Obstruction Lighting Solutions",
        description: "High-performance warning lights designed to enhance visibility of structures, ensuring aviation safety and regulatory compliance.",
        image: "/obs3.png",
        link: "/obstruction-lighting-solutions",
    },
    {
        title: "Portable Lighting Solutions",
        description: "Self-powered, high-intensity lighting systems built for quick setup, enabling safe aviation operations in remote or time-critical environments.",
        image: "/home/service-7.png",
        link: "/portable-lighting-solutions",
    },
];

const ArrowUpRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
    </svg>
);

export default function Services() {
    return (
        <section className=" py-8 md:py-16 ">
            <div className="max-w-360 w-[90%] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                    {services.slice(0, 3).map((service, index) => {
                        const isCard2 = index === 1;

                        if (isCard2) {
                            return (
                                <div
                                    key={index}
                                    className="group relative rounded-2xl overflow-hidden flex flex-col justify-center md:min-h-92.5 2xl:min-h-100 md:p-7 border border-white/10 transition-all duration-300 order-1 md:order-0 mb-6 md:mb-0 lg:col-span-2"
                                >

                                    <div className="relative z-20 text-center">
                                        <h3 className="font-rethink text-[20px] lg:text-4xl font-light text-black mb-4">{service.title}</h3>
                                        <p className="font-onest text-[14px] md:text-[15px] text-black ">{service.description}</p>
                                    </div>

                                    <Button
                                        href="/contact"
                                        className="mt-4 w-fit mx-auto"
                                    >
                                        Inquire Now
                                    </Button>
                                </div>
                            );
                        }

                        return (
                            <Link
                                href={service.link}
                                key={index}
                                className={cn(
                                    "group relative rounded-2xl overflow-hidden flex flex-col min-h-75 md:min-h-92.5 2xl:min-h-100 transition-all duration-300 hover:-translate-y-2 shadow-lg",
                                    index === 0 ? "order-2 xl:order-0" : "order-3 xl:order-0"
                                )}
                            >
                                {/* Background Image */}
                                {service.image && (
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            unoptimized
                                        />
                                        {/* Gradient overlay for text readability */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300 group-hover:opacity-80" />
                                    </div>
                                )}


                                {/* Bottom Glass Content */}
                                <div className="relative z-20 mt-auto p-3 bg-white/10 backdrop-blur-lg border-t border-white/20 transition-all duration-300 group-hover:bg-white/20 m-3 rounded-[8px]">
                                    <h3 className="font-rethink text-[15px] md:text-[20px] md:leading-6.5 text-white mb-1">{service.title}</h3>
                                    <p className="font-onest text-[12px] md:text-[13px] text-white font-light line-clamp-3">{service.description}</p>

                                    {/* Arrow expands beneath text without taking initial space */}
                                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                                        <div className="overflow-hidden">
                                            <div className="w-fit p-2.5 mt-3 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
                                                <ArrowUpRight />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
                    {services.slice(3).map((service, index) => (
                        <Link
                            href={service.link}
                            key={index + 3}
                            className="group relative rounded-2xl overflow-hidden flex flex-col min-h-75 md:min-h-92.5 2xl:min-h-100 transition-all duration-300 hover:-translate-y-2 shadow-lg"
                        >
                            {/* Background Image */}
                            {service.image && (
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        unoptimized
                                    />
                                    {/* Gradient overlay for text readability */}
                                    {/* <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300 group-hover:opacity-80" /> */}
                                </div>
                            )}


                            {/* Bottom Glass Content */}
                            <div className="relative z-20 mt-auto p-3 bg-white/10 backdrop-blur-lg border-t border-white/20 transition-all duration-300 group-hover:bg-white/20 m-3 rounded-[8px]">
                                <h3 className="font-rethink text-[15px] md:text-[20px] text-white mb-1">{service.title}</h3>
                                <p className="font-onest text-[12px] md:text-[13px] text-white font-light line-clamp-3">{service.description}</p>

                                {/* Arrow expands beneath text without taking initial space */}
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                                    <div className="overflow-hidden">
                                        <div className="w-fit p-2.5 mt-3 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
                                            <ArrowUpRight />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
