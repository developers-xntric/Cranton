import Image from "next/image";
import Link from "next/link";

const products = [
    {
        title: "Low Intensity",
        image: "/home/ob-low.png", // Update with your actual image path
        link: "/products/low-intensity",
    },
    {
        title: "Medium Intensity",
        image: "/home/ob-medium.png", // Update with your actual image path
        link: "/products/medium-intensity",
    },
    {
        title: "High Intensity",
        image: "/home/ob-high.png", // Update with your actual image path
        link: "/products/high-intensity",
    },
];

export default function ObstructionLighting() {
    return (
        <section className="bg-black py-20">
            <div className="max-w-[1240px] w-[90%] mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white text-center mb-12">
                    Obstruction Lighting
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-[#121212] rounded-[16px] p-4 border border-[#222] flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
                        >
                            {/* White Image Container */}
                            <div className="bg-white rounded-[12px] aspect-video relative flex items-center justify-center p-6 mb-6">
                                {/* Next Image with object-contain to ensure product fits without cropping */}
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-6 hover:scale-105 transition-transform duration-500"
                                    unoptimized
                                />
                            </div>

                            {/* Content */}
                            <div className="px-2 pb-2">
                                <h3 className="text-white text-xl font-medium mb-6">
                                    {product.title}
                                </h3>

                                <Link
                                    href={product.link}
                                    className="inline-flex items-center text-[13px] font-medium text-white bg-linear-to-r from-sky-400 to-[#04619f] hover:from-sky-300 hover:to-[#034d80] transition-colors px-4 py-2.5 rounded-md shadow-md"
                                >
                                    Product Details
                                    <svg
                                        className="ml-1.5 w-3.5 h-3.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
