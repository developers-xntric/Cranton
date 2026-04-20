"use client";

import Image from "next/image";
import SectionHeading from "../ui/section-heading";

type Point = {
  title: string;
};

type SectionItem = {
  title: string;
  paragraphs: string[];
  points: Point[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

type SplitSectionProps = {
  sections: SectionItem[];
};

export default function SplitSectionHelideck({
  sections,
}: SplitSectionProps) {
  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 21 21" fill="none">
      <path d="M7.70863 15.4119C7.80888 15.5205 7.93093 15.6067 8.06679 15.6649C8.20265 15.7231 8.34926 15.7519 8.49704 15.7495C8.64482 15.7472 8.79043 15.7136 8.92434 15.6511C9.05826 15.5886 9.17747 15.4985 9.27418 15.3867L16.5433 6.98671C16.7165 6.77505 16.8003 6.50415 16.7769 6.23165C16.7534 5.95916 16.6245 5.70657 16.4177 5.52763C16.2108 5.34869 15.9423 5.25753 15.6693 5.27353C15.3963 5.28953 15.1403 5.41144 14.9557 5.61331L8.45518 13.125L6.02128 10.4874C5.83233 10.2827 5.56981 10.1615 5.29148 10.1504C5.01314 10.1392 4.74178 10.2391 4.5371 10.4281C4.33242 10.617 4.21118 10.8796 4.20006 11.1579C4.18893 11.4362 4.28883 11.7076 4.47778 11.9123L7.70863 15.4119Z" fill="#168DCA"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.15 21C2.31457 21 1.51335 20.6681 0.922614 20.0774C0.331874 19.4866 0 18.6854 0 17.85V3.15C0 2.31457 0.331874 1.51335 0.922614 0.922614C1.51335 0.331874 2.31457 0 3.15 0H17.85C18.6854 0 19.4866 0.331874 20.0774 0.922614C20.6681 1.51335 21 2.31457 21 3.15V17.85C21 18.6854 20.6681 19.4866 20.0774 20.0774C19.4866 20.6681 18.6854 21 17.85 21H3.15ZM2.1 17.85C2.1 18.1285 2.21062 18.3955 2.40754 18.5925C2.60445 18.7894 2.87152 18.9 3.15 18.9H17.85C18.1285 18.9 18.3955 18.7894 18.5925 18.5925C18.7894 18.3955 18.9 18.1285 18.9 17.85V3.15C18.9 2.87152 18.7894 2.60445 18.5925 2.40754C18.3955 2.21062 18.1285 2.1 17.85 2.1H3.15C2.87152 2.1 2.60445 2.21062 2.40754 2.40754C2.21062 2.60445 2.1 2.87152 2.1 3.15V17.85Z" fill="#168DCA"/>
    </svg>
  );

  return (
    <section className="bg-white space-y-8 md:space-y-20 py-8 md:py-20">

      {sections.map((section, index) => (
        <div
          key={index}
          className="max-w-360 w-[92%] sm:w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center"
        >

          {/* CONTENT */}
          <div className={`${section.reverse ? "lg:order-2" : ""}`}>

            <SectionHeading
              title={section.title}
              className="text-[20px] md:text-4xl font-Regular text-black mb-2 leading-tight text-left"
            />

            <div className="space-y-3 md:space-y-4 pt-2">
              {section.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-[14px] md:text-[16px] leading-relaxed text-[#333333]"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="space-y-3 py-4">
              {section.points.map((item, i) => (
                <div key={i} className="flex items-start gap-3">

                  <div className="shrink-0">
                    <CheckIcon />
                  </div>

                  <p className="text-[14px] md:text-[17px] font-medium text-black leading-snug">
                    {item.title}
                  </p>

                </div>
              ))}
            </div>

          </div>

          {/* IMAGE */}
          <div
            className={`relative w-full h-55 sm:h-75 lg:h-full rounded-[24px] overflow-hidden border border-[#D7D7D7] ${
              section.reverse ? "lg:order-1" : ""
            }`}
          >
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