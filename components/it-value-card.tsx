import Image from "next/image";
import { CheckSquare } from "lucide-react";
import Button from "./ui/grad-button";

interface ITValueCardProps {
  
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
  image1: string;
  image2: string;
  btn: string;
}

export default function ITValueCard({
  
  title,
  subtitle,
  description1,
  description2,
  btn,
  
  image1,
  image2,
}: ITValueCardProps) {
  return (
    <section className="relative w-full py-16 overflow-hidden">
      <div className="2xl:max-w-350 w-[90%] mx-auto relative z-10">
        <div className="flex flex-col flex-col-reverse lg:flex-row gap-12 items-center">

          {/* Left Images */}
          <div className="w-full lg:w-1/2 relative min-h-[300px] md:min-h-[450px] lg:min-h-[550px] flex items-center">
            
            <div className="absolute top-0 left-0 w-[85%] h-[75%] rounded-2xl overflow-hidden">
              <Image src={image1} alt="image1" fill className="object-contain" />
            </div>

            <div className="absolute bottom-0 right-0 lg:-right-4 w-[80%] h-[60%] rounded-xl overflow-hidden z-10 border-[1px] border-transparent">
              <Image src={image2} alt="image2" fill className="object-cover rounded-xl" />
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2">

           

            {/* Title */}
            <h2 className="text-[20px] md:text-[43px] font-normal text-black mb-5 leading-tight text-left">
              {title}
            </h2>
             {/* Subtitle */}
            <p className="text-[16px] md:text-[18px] font-normal text-black mb-4">
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
             <Button className="px-6 py-3 mt-3">
                                {btn}
                            </Button>

            {/* List */}
            {/* <ul className="space-y-[14px]">
              {solutions.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckSquare className="w-5 h-5 text-[#168DCA] shrink-0 md:mt-[2px]" />
                  <span className="text-[12px] md:text-[14px] 2xl:text-[17px] leading-normal text-black">
                    {item}
                  </span>
                </li>
              ))}
            </ul> */}

          </div>
        </div>
      </div>
    </section>
  );
}