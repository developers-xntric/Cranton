import Image from "next/image";
import Link from "next/link";
import Button from "./ui/grad-button";
import SectionHeading from "./ui/section-heading";

const products = [
    {
        title: "Low Intensity",
        image: "/home/intensity-card1.png",
        link: "/products/low-intensity",
    },
    {
        title: "Medium Intensity",
        image: "/home/intensity-card2.png",
        link: "/products/medium-intensity",
    },
    {
        title: "High Intensity",
        image: "/home/intensity-card3.png",
        link: "/products/high-intensity",
    },
];

export default function  ObstructionLighting() {
    return ( 
        <section className="bg-black py-16">
            <div className="max-w-[1240px] w-[90%] mx-auto">
                <SectionHeading title="Obstruction Lighting"  />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-[#121212] rounded-[16px] p-4 border border-[#222] flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
                        >
                            {/* White Image Container */}
                            <div className="bg-white rounded-[12px] w-full h-60 relative flex items-center justify-center p-6 mb-6">
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
                                <h3 className="text-white text-[25px]  mb-5">
                                    {product.title}
                                </h3>

                                <Button title="Product Details" href={product.link} className="w-fit" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
