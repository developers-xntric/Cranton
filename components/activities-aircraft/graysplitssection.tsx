"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SectionHeading from "../ui/section-heading";
import Application from "../col-heading-para";
import ColHeadingPara from "../col-heading-para";

export default function GraySplitSection() {
    return (
        <section className="bg-[#EFEFEF] py-10 md:py-16 space-y-5 md:space-y-20 mt-8">

            {/* SECTION 1 */}
           <div className="max-w-[1440px] w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">

    {/* Content (RIGHT on desktop, TOP on mobile) */}
    <div className="flex flex-col order-1 lg:order-2">

        <SectionHeading
            title="Day & Night Performance: Medium Intensity (Type A)"
            className="text-[18px] md:text-4xl font-medium text-black mb-2 leading-tight text-left"
        />

        <h2 className="text-[16px] md:text-2xl text-[#1475AF] py-2">
            <span className="font-semibold">Model: </span>
            Medium Intensity LED, Type-A (Supports A/B & A/C)
        </h2>

        <p className="text-[14px] md:text-[16px] leading-relaxed text-[#333333] mb-2">
            A high-performance white flashing system designed for dual marking, ensuring visibility against bright daytime skies and transitioning for night operations.
        </p>

        <ColHeadingPara
            title="Visual Details:"
            description="Distinct blue housing with optimized internal LED arrangement designed for maximum light throw and efficiency."
        />

        <ColHeadingPara
            title="Versatility:"
            description="Covers requirements for Type A (White Day/Night), combined with Type B or C capabilities."
        />

    </div>

    {/* Image (LEFT on desktop, BOTTOM on mobile) */}
    <div className="relative w-full h-[220px] sm:h-[300px] lg:h-full rounded-[24px] overflow-hidden border border-[#D7D7D7] order-2 lg:order-1">
        <Image
            src="/activities-aircraft/day-night.png"
            alt="Engineering Precision"
            fill
            className="object-cover"
            unoptimized
        />
    </div>

</div>

            {/* SECTION 2 */}
            <div className="max-w-[1440px] w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-10 items-center border-t-1 border-[#D7D7D7] pt-8 md:pt-20">

                {/* Left: Content */}
                <div className="flex flex-col">

                    <SectionHeading
                        title="Maximum Range: High Intensity"
                        className="text-[20px] md:text-4xl font-medium text-black mb-2 leading-tight text-left"
                    />

                    <h2 className="text-[16px] md:text-2xl text-[#1475AF] py-2">
                        <span className="font-semibold">Model: </span>
                        High Intensity LED, Tyре-А
                    </h2>

                    <ColHeadingPara
                        title="Application"
                        description="The critical solution for major structures exceeding 500ft and catenary support systems."
                    />

                    <ColHeadingPara
                        title="Form Factor"
                        description="Linear panel design optimized for specific beam spread and intensity requirements."
                    />

                    <ColHeadingPara
                        title="Durability"
                        description="Heavy-duty yellow metal enclosure with reinforced mounting brackets for high-altitude installation."
                    />

                </div>

                {/* Right: Image */}
                <div className="relative w-full h-[220px] sm:h-[300px] lg:h-full rounded-[24px] overflow-hidden border border-[#D7D7D7]">
                    <Image
                        src="/activities-aircraft/maximumrange.png"
                        alt="Engineering Precision"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>

            </div>

        </section>
    );
}