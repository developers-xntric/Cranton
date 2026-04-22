import Image from "next/image";
import Link from "next/link";
import Button from "./ui/grad-button";

import { cn } from "@/lib/utils";

const services = [
    {
        title: "Vertiport & Heliport Consulting and Refurbishment",
        description: "Our industry experts provide tailored consulting and refurbishment services to deliver reliable Vertiport & Heliport solutions.",
        image: "/home/service-card1.png",
        link: "#",
    },
    {
        title: "End-to-End Aviation, Vertiport & Heliport Solutions",
        description: "Cranton offers focused, high-quality services supporting Vertiport, Heliport  and aviation infrastructure. Our team ensures every project benefits from expert engineering, certified systems, and dependable execution.",
        image: null,
        link: "#",
    },
    {
        title: "Vertiport & Heliport Lighting",
        description: "Reliable and well-functioning LED lighting system is an essential factor in case of vertiport & heliport operation. An effective vertiport & heliport lighting system ensures the safe operation.",
        image: "/home/service-card3.png",
        link: "#",
    },
    {
        title: "Heliport and Vertiport Solutions",
        description: "MESH is an innovative solution for creating safe landing sites for helicopters and future eVTOL aircraft. It enables low-impact deployment for floating, surface, and elevated heliports.",
        image: "/home/service-card4.png",
        link: "#",
    },
    {
        title: "Advanced Air Mobility (AAM)",
        description: "We support the future of urban air transportation by enabling the development of AAM infrastructure, vehicle integration, and regulatory readiness.",
        image: "/home/service-card5.png",
       link: "#",
    },
    {
        title: "Vertiport & Heliport Fire Fighting System",
        description: "As per the norms of International Civil Aviation Organization, vertiport & heliport should be equipped with Fire Fighting System on two sides.",
        image: "/home/service-card6.png",
        link: "#",
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
        <section className=" py-16 ">
            <div className="max-w-[1440px] w-[90%] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {services.map((service, index) => {
                        const isCard2 = index === 1;

                        if (isCard2) {
                            return (
                                <div
                                    key={index}
                                    className="group relative rounded-2xl overflow-hidden flex flex-col justify-center md:min-h-[370px] 2xl:min-h-[400px] md:p-7 border border-white/10 transition-all duration-300 order-1 md:order-0  mb-6 md:mb-0"
                                >

                                    <div className="relative z-20 text-center">
                                        <h3 className="font-rethink text-[20px] lg:text-3xl font-medium text-black mb-4">{service.title}</h3>
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
                                    "group relative rounded-2xl overflow-hidden flex flex-col min-h-[300px] md:min-h-[370px] 2xl:min-h-[400px] transition-all duration-300 hover:-translate-y-2 shadow-lg",
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
                                <div className="relative z-20 mt-auto p-4 bg-white/10 backdrop-blur-lg border-t border-white/20 transition-all duration-300 group-hover:bg-white/20 m-3 rounded-[8px]">
                                    <h3 className="font-rethink text-[15px] md:text-[20px]  text-white mb-1">{service.title}</h3>
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
            </div>
        </section>
    );
}
