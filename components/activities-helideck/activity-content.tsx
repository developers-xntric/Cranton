"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ListItem = {
    title: string;
};

type ListBlockProps = {
    title: string;
    description?: string;
    items: ListItem[];
    type?: "check" | "product";
};

const CheckIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        className="shrink-0 mt-0.5"
    >
        <path
            d="M8.73935 14.4795L4.72754 10.4668L6.06449 9.12981L8.73935 11.8037L14.0872 6.45496L15.4251 7.79286L8.73935 14.4795Z"
            fill="#1475AF"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 10.4006C0 4.65665 4.65665 0 10.4006 0C16.1446 0 20.8013 4.65665 20.8013 10.4006C20.8013 16.1446 16.1446 20.8013 10.4006 20.8013C4.65665 20.8013 0 16.1446 0 10.4006ZM10.4006 18.9102C9.28314 18.9102 8.17658 18.6901 7.14415 18.2625C6.11171 17.8348 5.17362 17.208 4.38343 16.4178C3.59324 15.6276 2.96643 14.6896 2.53878 13.6571C2.11113 12.6247 1.89102 11.5181 1.89102 10.4006C1.89102 9.28314 2.11113 8.17658 2.53878 7.14415C2.96643 6.11171 3.59324 5.17362 4.38343 4.38343C5.17362 3.59324 6.11171 2.96643 7.14415 2.53878C8.17658 2.11113 9.28314 1.89102 10.4006 1.89102C12.6575 1.89102 14.822 2.78757 16.4178 4.38343C18.0137 5.97929 18.9102 8.14375 18.9102 10.4006C18.9102 12.6575 18.0137 14.822 16.4178 16.4178C14.822 18.0137 12.6575 18.9102 10.4006 18.9102Z"
            fill="#1475AF"
        />
    </svg>
);

const ListBlock = ({
    title,
    description,
    items,
    type = "check",
}: ListBlockProps) => (
    <div className="bg-[#f0f0f0] rounded-[15px] p-4 md:p-8 mb-6 border border-gray-100 shadow-sm">

        <h3 className="text-[18px] md:text-[20px] mb-4 md:mb-6 text-black">
            {title}
        </h3>

        {description && (
            <p className="text-[13px] md:text-[14px] text-[#636363] mb-4 md:mb-6 leading-relaxed font-light">
                {description}
            </p>
        )}

        {type === "check" ? (
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 md:gap-4">
                        <CheckIcon />
                        <p className="text-[13px] md:text-[14px] font-light text-[#636363] leading-tight pt-0.5">
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-white px-4 md:px-5 py-3 rounded-lg border border-gray-200 group hover:border-[#1475AF] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <p className="text-[13px] md:text-[14px] font-medium text-[#444] group-hover:text-black transition-colors">
                            {item.title}
                        </p>
                        <ArrowUpRight
                            size={16}
                            className="text-gray-400 group-hover:text-[#1475AF] group-hover:translate-x-1 transition-all"
                        />
                    </div>
                ))}
            </div>
        )}
    </div>
);

type ActivityContentProps = {
    topImages: string[];
    title: string;
    paragraphs: string[];
    listBlocks?: {
        title: string;
        description?: string;
        items: ListItem[];
        type?: "check" | "product";
    }[];
    bottomImage?: string;
};

export default function ActivityContent({
    topImages,
    title,
    paragraphs,
    listBlocks = [],
    bottomImage,
}: ActivityContentProps) {
    return (
        <section className="w-full bg-white py-10 md:py-16">
            <div className="mx-auto max-w-[1440px] w-[92%] md:w-[90%]">

                {/* Images Grid */}
                <div
                    className={cn(
                        "grid gap-4 md:gap-6 mb-8 md:mb-12",
                        topImages.length === 1
                            ? "grid-cols-1"
                            : "grid-cols-1 md:grid-cols-2"
                    )}
                >
                    {topImages.map((src, index) => (
                        <div
                            key={index}
                            className="relative w-full aspect-[16/10] md:aspect-[16/10] rounded-[16px] md:rounded-[20px] overflow-hidden shadow-lg"
                        >
                            <Image
                                src={src}
                                alt={`${title} image ${index + 1}`}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>

                {/* Text Content */}
                <div className="mb-8 md:mb-12">
                    <h2 className="text-[22px] md:text-[40px] text-black mb-4 md:mb-6 font-rethink leading-tight">
                        {title}
                    </h2>

                    <div className="space-y-4 md:space-y-6 text-[14px] md:text-[15px] leading-relaxed text-[#333] font-onest">
                        {paragraphs.map((para, index) => (
                            <p key={index}>{para}</p>
                        ))}
                    </div>
                </div>

                {/* List Blocks */}
                {listBlocks.length > 0 && (
                    <div className="space-y-4 md:space-y-6">
                        {listBlocks.map((block, index) => (
                            <ListBlock
                                key={index}
                                title={block.title}
                                description={block.description}
                                items={block.items}
                                type={block.type}
                            />
                        ))}
                    </div>
                )}

                {/* Bottom Image */}
                {bottomImage && (
                    <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[16px] md:rounded-[20px] overflow-hidden shadow-xl mt-10 md:mt-12">
                        <Image
                            src={bottomImage}
                            alt={`${title} main view`}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}