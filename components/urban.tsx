import Image from "next/image";
import { CheckSquare } from "lucide-react";
import Button from "./ui/grad-button";

interface UrbanProps {
  
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
  image1: string;
  image2: string;
  btn: string;
  solutions: string[];
}

export default function Urban({
  
  title,
  subtitle,
  description1,
  description2,
  btn,
  solutions
}: UrbanProps) {
  return (
    <section className="relative w-full py-16 overflow-hidden">
      <div className="2xl:max-w-350 w-[90%] mx-auto relative z-10">
        <div className="flex flex-col flex-col-reverse lg:flex-row gap-12 items-center">

          {/* Left Images */}
          <div className="w-full lg:w-1/2 ">
            
             <h2 className="text-[20px] md:text-[40px] font-normal text-black mb-5 leading-tight text-left">
              {title}
            </h2>
            <Button className="px-6 py-3 mt-3">
                                {btn}
                            </Button>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2">

           

            {/* Title */}
           
             {/* Subtitle */}
            <p className="text-[16px] md:text-[20px] font-semibold text-[#1475AF] mb-4">
              {subtitle}
            </p>

            {/* Description */}
            <p className="text-[14px] md:text-[16px] leading-relaxed text-black mb-4 font-n
            ormal">
              {description1}
            </p>

            {/* Description */}
            <p className="text-[14px] md:text-[16px] leading-relaxed text-black mb-4 font-n
            ormal">
              {description2}
            </p>
             

            {/* List */}
            <ul className="space-y-[14px]">
              {solutions.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckSquare className="w-5 h-5 text-[#168DCA] shrink-0 md:mt-[2px]" />
                  <span className="text-[12px] md:text-[14px] 2xl:text-[17px] leading-normal text-black">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </section>
  );
}