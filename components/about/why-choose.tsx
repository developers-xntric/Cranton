"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "../ui/section-heading";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface Testimonial {
  id: number;
  stars: number;
  text: string;
  name: string;
  role: string;
}

const defaultStats: Stat[] = [
  { value: 450, suffix: "", label: "Completed Projects" },
  { value: 32, suffix: "+", label: "Countries Served" },
  { value: 8, suffix: "+", label: "Years Of Experience" },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    stars: 5,
    text: "Cranton delivered exactly what we needed for our offshore project. The team was professional, responsive, and committed to maintaining the highest safety standards throughout the process. We were especially impressed with the quality and finish of the helideck system",
    name: "John Smith",
    role: "Offshore Project Manager",
  },
  {
    id: 2,
    stars: 4,
    text: "Working with Cranton was a smooth experience from start to finish. Their technical team understood our operational requirements clearly and provided practical solutions that worked perfectly for our site. The installation process was efficient and well managed.",
    name: "Sarah Johnson",
    role: "Aviation Operations Lead",
  },
  {
    id: 3,
    stars: 5,
    text: "The aluminium helideck supplied by Cranton has performed exceptionally well in harsh environmental conditions. The structure is lightweight, durable, and requires very little maintenance. Their engineering expertise was evident at every stage of the project.",
    name: "Michael Chen",
    role: "Senior Infrastructure Director",
  },
  {
    id: 4,
    stars: 5,
    text: "We were looking for a reliable heliport lighting solution, and Cranton exceeded our expectations. The system was easy to integrate and has provided excellent visibility and operational reliability. Their after-sales support has also been very dependable.",
    name: "Amira Hassan",
    role: "Aviation Safety Consultant",
  },
  {
    id: 5,
    stars: 5,
    text: "Cranton's team maintained clear communication and strong coordination throughout the project. They paid close attention to safety, compliance, and project timelines without compromising quality. It was a pleasure working with such an experienced company.",
    name: "Amira Hassan",
    role: "Aviation Safety Consultant",
  },
  {
    id: 6,
    stars: 5,
    text: "The portable helideck platform provided by Cranton was exactly suited to our operational needs. It was easy to deploy, structurally strong, and delivered excellent performance in remote conditions. We would confidently work with them again.",
    name: "Amira Hassan",
    role: "Aviation Safety Consultant",
  },
];

function AnimatedCounter({
  value,
  suffix,
  isVisible,
}: {
  value: number;
  suffix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    let start = 0;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-6 h-6 ${i <= count ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface WhyChooseUsSectionProps {
  heading?: string;
  paragraphs?: string[];
  missionTitle?: string;
  missionDescription?: string;
  visionTitle?: string;
  visionDescription?: string;
  stats?: Stat[];
}

export function WhyChooseUsSection({
  heading = "Why Choose Us",
  paragraphs = [
    "We deliver lightweight, high-strength helideck and heliport/vertiport solutions engineered for durability, safety, and long-term performance. From aluminium helidecks and deck platforms to advanced lighting and obstruction systems, every solution is tailored to meet the specific operational needs of each project.",
    "Our experienced team combines engineering expertise, precision manufacturing, and international aviation standards to provide safe, reliable, and low-maintenance infrastructure for offshore and land-based operations.",
    "Trusted by government and private sector clients worldwide, Cranton is committed to delivering innovative, compliant, and cost-effective solutions that ensure operational confidence and lasting value.",
  ],
  missionTitle = "Our Mission",
  missionDescription = "To provide the highest technical competence through strong collaboration and the shortest possible delivery time in the manufacturing and commissioning of helidecks.",
  visionTitle = "Vision",
  visionDescription = "To collaborate with research institutes and high-tech partners in developing advanced, innovative, and future-ready heliport solutions.",
  stats = defaultStats,
}: WhyChooseUsSectionProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white pb-12 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-350 w-[90%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-b border-dashed border-[#C9C9C9]">
          <div className="pb-12 lg:py-12">
            <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-5 leading-tight tracking-tight">
              {heading}
            </h2>
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-sm sm:text-base max-w-[95%] text-[#64748B] leading-relaxed ${index < paragraphs.length - 1 ? "mb-5" : ""}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-8 lg:border-l border-dashed border-[#C9C9C9] lg:pt-12 relative">
            <div className="flex flex-col gap-4 items-start lg:ms-10">
              <div className="flex gap-5 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 41 39" fill="none">
                  <path d="M21.9815 1.22884L26.4403 10.1892C26.7688 10.8383 27.3958 11.2892 28.1189 11.3894L38.1342 12.848C38.7191 12.9302 39.2499 13.2387 39.6084 13.7096C39.963 14.1744 40.1152 14.7635 40.0291 15.3426C39.959 15.8234 39.7326 16.2682 39.3861 16.6089L32.129 23.6437C31.5982 24.1346 31.3578 24.8619 31.486 25.5732L33.2727 35.4632C33.463 36.6574 32.6718 37.7834 31.486 38.0098C30.9973 38.088 30.4965 38.0058 30.0558 37.7814L21.1222 33.127C20.4592 32.7923 19.676 32.7923 19.013 33.127L10.0793 37.7814C8.98162 38.3645 7.62154 37.9678 7.01061 36.8858C6.78426 36.455 6.70414 35.9641 6.77825 35.4853L8.56498 25.5932C8.69318 24.8839 8.45081 24.1526 7.922 23.6617L0.664907 16.6309C-0.198412 15.7974 -0.224452 14.4249 0.606818 13.5613C0.624846 13.5433 0.644877 13.5232 0.664907 13.5032C1.00943 13.1526 1.46213 12.9302 1.95087 12.8721L11.9662 11.4114C12.6873 11.3092 13.3142 10.8624 13.6447 10.2092L17.9433 1.22884C18.3259 0.459441 19.1191 -0.0194313 19.9804 0.000605207H20.2488C20.996 0.0907695 21.647 0.553613 21.9815 1.22884Z" fill="#96B6C5" />
                  <path d="M20.0103 32.8774C19.6224 32.8895 19.2445 32.9937 18.9046 33.1801L10.0146 37.824C8.92685 38.3431 7.62515 37.9402 7.01529 36.9C6.78934 36.4751 6.70736 35.9881 6.78334 35.5111L8.55893 25.64C8.67891 24.9225 8.43896 24.1929 7.91708 23.6878L0.656738 16.6588C-0.205066 15.815 -0.221062 14.4301 0.622745 13.5662C0.634742 13.5542 0.64474 13.5442 0.656738 13.5342C1.00066 13.1935 1.44456 12.969 1.92245 12.8988L11.9462 11.4237C12.672 11.3315 13.3019 10.8785 13.6218 10.2211L17.9788 1.12772C18.3927 0.394154 19.1865 -0.0427782 20.0263 0.00332011C20.0103 0.59859 20.0103 32.4726 20.0103 32.8774Z" fill="#025094" />
                </svg>
                <h3 className="text-2xl font-medium text-black mb-2 relative top-1">
                  {missionTitle}
                </h3>
              </div>
              <p className="lg:ms-14 lg:max-w-[70%] text-sm text-gray-600 leading-relaxed">
                {missionDescription}
              </p>
            </div>

            <div className="flex flex-col gap-4 items-start lg:border-t lg:border-dashed lg:border-[#C9C9C9] lg:pt-12">
              <div className="flex gap-5 items-center lg:ms-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 43 43" fill="none">
                  <path d="M0 27.4721C0 36.048 6.95203 42.9999 15.5278 42.9999C24.1037 42.9999 31.0556 36.048 31.0556 27.4721C31.0556 18.8962 24.1037 11.9443 15.5278 11.9443C6.95203 11.9443 0 18.8962 0 27.4721Z" fill="#025094" />
                  <path d="M15.0263 6.24188C14.7353 6.63132 15.0421 7.16667 15.5283 7.16667C26.7426 7.16667 35.8338 16.2578 35.8338 27.4722C35.8338 27.9584 36.3692 28.2651 36.7585 27.9741C40.5476 25.1428 43.0005 20.6216 43.0005 15.5278C43.0005 6.95203 36.0486 0 27.4727 0C22.3789 0 17.8576 2.45287 15.0263 6.24188Z" fill="#96B6C5" />
                </svg>
                <h3 className="text-2xl font-medium text-black mb-2 relative top-1">
                  {visionTitle}
                </h3>
              </div>
              <p className="lg:ms-24 lg:max-w-[70%] text-sm text-gray-600 leading-relaxed">
                {visionDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mb-10 lg:mb-12" />

        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-36"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center sm:text-left mx-auto">
              <div className="text-4xl sm:text-7xl font-medium text-black tracking-tight mb-1">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isVisible={statsVisible}
                />
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialsSectionProps {
  heading?: string;
  description?: string;
  testimonials?: Testimonial[];
}

export function TestimonialsSection({
  heading = "What Our Clients Say",
  description = "We are proud to have earned the trust of our clients worldwide. Read their feedback on how our helideck and heliport solutions deliver safety, reliability, and innovation across every project.",
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    const handle = () => setVisibleCount(window.innerWidth >= 768 ? 2 : 1);
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);
  const visible = testimonials.slice(currentIndex, currentIndex + visibleCount);

  const prev = () => setCurrentIndex((value) => Math.max(0, value - 1));
  const next = () => setCurrentIndex((value) => Math.min(maxIndex, value + 1));

  return (
    <section className="bg-[#EFEFEF] py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="2xl:max-w-360 w-[95%] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <SectionHeading title={heading} className="text-3xl md:text-4xl mb-6" />
            <p className="text-sm sm:text-[14px] 2xl:text-[18px] text-[#000000] leading-relaxed">
              {description}
            </p>
          </div>

          <div className="gap-2 self-start sm:self-center shrink-0 md:flex hidden">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className={`w-16 h-9 rounded flex items-center justify-center border transition-all duration-200 ${
                currentIndex === 0
                  ? "bg-white border-gray-200 text-gray-300 cursor-not-allowed"
                  : "bg-white border-[#025094] text-[#025094]"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className={`w-16 h-9 rounded flex items-center justify-center border transition-all duration-200 ${
                currentIndex >= maxIndex
                  ? "bg-gray-300 border-gray-300 text-white cursor-not-allowed"
                  : "bg-grad text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`grid gap-5 ${visibleCount === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
          {visible.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg border border-black p-6 sm:p-10 flex flex-col gap-10 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <StarRating count={testimonial.stars} />
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none">
                  <path d="M14.7521 8.49168C11.6742 16.0466 5.21067 15.3897 2.12747 11.2463C-0.955727 7.10302 2.90226 1.75794 6.28794 1.10099C9.67361 0.444038 15.0599 2.9076 15.0505 11.1467C15.038 22.1234 4.35214 32.64 3.17789 33.5635" stroke="black" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />
                  <path d="M33.9125 8.49168C30.8346 16.0466 24.3711 15.3897 21.2879 11.2463C18.2047 7.10302 22.0627 1.75794 25.4483 1.10099C28.834 0.444038 34.2203 2.9076 34.2109 11.1467C34.1984 22.1234 23.5125 32.64 22.3383 33.5635" stroke="black" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <p className="text-sm sm:text-xl text-[#64748B] leading-relaxed flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        <div className="flex md:hidden my-4 gap-2 relative left-[25%]">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className={`w-16 h-9 rounded flex items-center justify-center border transition-all duration-200 ${
              currentIndex === 0
                ? "bg-white border-gray-200 text-gray-300 cursor-not-allowed"
                : "bg-white border-[#025094] text-[#025094]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className={`w-16 h-9 rounded flex items-center justify-center border transition-all duration-200 ${
              currentIndex >= maxIndex
                ? "bg-gray-300 border-gray-300 text-white cursor-not-allowed"
                : "bg-grad text-white"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-1.5 mt-6 sm:hidden">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? "bg-grad w-5" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
