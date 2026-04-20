"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SectionHeading from "../ui/section-heading";
import Application from "../col-heading-para";
import ColHeadingPara from "../col-heading-para";

export default function SplitSection() {
    return (
        <section className="bg-white md:space-y-20 md:py-8" >

            {/* SECTION 1 */}
            <div className="max-w-[1440px] w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 items-center pb-5 md:pb-0" id="essential-visibility">

    {/* Content (LEFT on desktop, RIGHT on mobile) */}
    <div className="flex flex-col md:py-5 order-1 lg:order-2">
        <SectionHeading
            title="Essential Visibility: Low Intensity"
            className="text-[20px] md:text-4xl font-medium text-black mb-2 leading-tight text-left"
        />

        <h2 className="text-[16px] md:text-2xl text-[#1475AF] py-2">
            <span className="font-semibold">Model:</span> L-810
        </h2>

        <ColHeadingPara
            title="Application:"
            description="Designed for nighttime obstruction marking on lower structures or as intermediate markers on taller towers."
        />

        <ColHeadingPara
            title="Design:"
            description="Features a durable yellow housing with a specialized red prismatic dome for omnidirectional signaling."
        />

        <ColHeadingPara
            title="Mounting:"
            description="Robust flange-mount base ensures stability in adverse wind conditions."
        />
    </div>

    {/* Image (RIGHT on desktop, LEFT on mobile) */}
    <div  className="relative w-full h-[220px] sm:h-[300px] lg:h-full rounded-[24px] overflow-hidden border border-[#D7D7D7] order-2 lg:order-1">
        <Image
            src="/activities-aircraft/essentialvisibility.png"
            alt="Engineering Precision"
            fill
            className="object-cover"
            unoptimized
        />
    </div>

</div>

            {/* SECTION 2 */}
            <div className="max-w-[1440px] w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 items-center border-t-1 border-[#D7D7D7] pt-8 md:pt-20" id="robust-signaling">

                {/* Left: Content */}
                <div className="flex flex-col">

                    <SectionHeading
                        title="Robust Signaling: Medium Intensity (Type B & С)"
                        className="text-[20px] md:text-4xl font-medium text-black mb-2 leading-tight text-left"
                    />

                    <h2 className="text-[16px] md:text-2xl text-[#1475AF] py-2">
                        <span className="font-semibold">Model: </span>Medium Intensity LED, Type-C & B
                    </h2>

                    <p className="text-[14px] md:text-[16px] leading-relaxed text-[#333333] mb-2">
                        Engineered for reliable red beacon requirements, these units provide high-contrast visibility for nighttime operations.
                    </p>

                    <ColHeadingPara
                        title="Configuration:"
                        description="Available for Type B (Red Flashing) and Type C (Red Steady) applications."
                    />

                    <ColHeadingPara
                        title="Build:"
                        description="Industrial yellow powder-coated housing with a heavy-duty clear lens assembly protecting the internal LED matrix."
                    />

                    <ColHeadingPara
                        title="Thermal Management:"
                        description="Integrated cooling fins visible through the clear housing ensure LED longevity."
                    />

                </div>

                {/* Right: Image */}
                <div className="relative w-full h-[220px] sm:h-[300px] lg:h-full rounded-[24px] overflow-hidden border border-[#D7D7D7]">
                    <Image
                        src="/activities-aircraft/robust-signaling.png"
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