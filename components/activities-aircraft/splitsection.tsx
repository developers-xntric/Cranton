"use client";

import Image from "next/image";
import SectionHeading from "../ui/section-heading";
import ColHeadingPara from "../col-heading-para";

interface DetailItem {
  title: string;
  description: string;
}

interface SplitSectionItem {
  id?: string;
  title: string;
  model: string;
  description?: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  details: DetailItem[];
}

interface SplitSectionProps {
  sections: SplitSectionItem[];
}

export default function SplitSection({ sections }: SplitSectionProps) {
  return (
    <section className="bg-white md:space-y-20 md:py-8">
      {sections.map((section, index) => (
        <div
          key={section.id ?? index}
          className={`max-w-[1440px] w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 items-center ${index > 0 ? "border-t-1 border-[#D7D7D7] pt-8 md:pt-20" : "pb-5 md:pb-0"}`}
          id={section.id}
        >
          <div className={`flex flex-col ${section.reverse ? "order-1 lg:order-2" : ""}`}>
            <SectionHeading
              title={section.title}
              className="text-[20px] md:text-4xl font-medium text-black mb-2 leading-tight text-left"
            />

            <h2 className="text-[16px] md:text-2xl text-[#1475AF] py-2">
              <span className="font-semibold">Model: </span>
              {section.model}
            </h2>

            {section.description ? (
              <p className="text-[14px] md:text-[16px] leading-relaxed text-[#333333] mb-2">
                {section.description}
              </p>
            ) : null}

            {section.details.map((detail) => (
              <ColHeadingPara
                key={detail.title}
                title={detail.title}
                description={detail.description}
              />
            ))}
          </div>

          <div className={`relative w-full h-[220px] sm:h-[300px] lg:h-full rounded-[24px] overflow-hidden border border-[#D7D7D7] ${section.reverse ? "order-2 lg:order-1" : ""}`}>
            <Image
              src={section.image}
              alt={section.imageAlt}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      ))}
    </section>
  );
}
