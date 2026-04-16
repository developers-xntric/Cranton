import Image from "next/image";
import Link from "next/link";

const services = [
    {
        title: "Vertiport & Heliport Consulting and Refurbishment",
        description: "Our industry experts provide tailored consulting and refurbishment services to deliver reliable Vertiport & Heliport solutions.",
        image: "https://images.unsplash.com/photo-1559297621-0a6eba7b9ef2?q=80&w=800&auto=format&fit=crop",
        link: "/services/consulting",
    },
    {
        title: "Custom Strategy & Project Management",
        description: "We provide dedicated strategic oversight and project management to ensure seamless execution from concept planning through successful operational delivery for our clients.",
        image: null, // Card 2 with NO image
        link: "/services/management",
    },
    {
        title: "Vertiport & Heliport Lighting",
        description: "Reliable and well-functioning LED lighting system is an essential factor in case of vertiport & heliport operation. An effective vertiport & heliport lighting system ensures the safe operation.",
        image: "https://images.unsplash.com/photo-1544253163-95d85202a0a2?q=80&w=800&auto=format&fit=crop",
        link: "/services/lighting",
    },
    {
        title: "Heliport and Vertiport Solutions",
        description: "MESH is an innovative solution for creating safe landing sites for helicopters and future eVTOL aircraft. It enables low-impact deployment for floating, surface, and elevated heliports.",
        image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=800&auto=format&fit=crop",
        link: "/services/solutions",
    },
    {
        title: "Advanced Air Mobility (AAM)",
        description: "We support the future of urban air transportation by enabling the development of AAM infrastructure, vehicle integration, and regulatory readiness.",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop",
        link: "/services/aam",
    },
    {
        title: "Vertiport & Heliport Fire Fighting System",
        description: "As per the norms of International Civil Aviation Organization, vertiport & heliport should be equipped with Fire Fighting System on two sides.",
        image: "https://images.unsplash.com/photo-1601002242457-3f32812fc4ac?q=80&w=800&auto=format&fit=crop",
        link: "/services/fire-fighting",
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service, index) => {
                        const isCard2 = index === 1;

                        if (isCard2) {
                            return (
                                <Link
                                    href={service.link}
                                    key={index}
                                    className="group relative rounded-2xl overflow-hidden flex flex-col justify-center min-h-[400px] p-8 border border-white/10 bg-linear-to-br from-[#1a1a2e] to-[#0f0f1a] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20"
                                >
                                    {/* Hidden Arrow that shows on hover */}
                                    <div className="absolute top-6 right-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 p-3 bg-white/10 rounded-full backdrop-blur-md">
                                        <ArrowUpRight />
                                    </div>

                                    <div className="relative z-20">
                                        <h3 className="text-2xl lg:text-3xl font-medium text-white mb-4">{service.title}</h3>
                                        <p className="text-base text-gray-400 leading-relaxed">{service.description}</p>
                                    </div>
                                </Link>
                            );
                        }

                        return (
                            <Link
                                href={service.link}
                                key={index}
                                className="group relative rounded-2xl overflow-hidden flex flex-col min-h-[400px] transition-all duration-300 hover:-translate-y-2 shadow-lg"
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

                                {/* Hidden Arrow that shows on hover */}
                                <div className="absolute top-6 right-6 z-30 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                                    <ArrowUpRight />
                                </div>

                                {/* Bottom Glass Content */}
                                <div className="relative z-20 mt-auto p-6 md:p-8 bg-white/10 backdrop-blur-lg border-t border-white/20 transition-all duration-300 group-hover:bg-white/20">
                                    <h3 className="text-xl md:text-2xl font-medium text-white mb-3">{service.title}</h3>
                                    <p className="text-sm md:text-base text-gray-200 line-clamp-3">{service.description}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
