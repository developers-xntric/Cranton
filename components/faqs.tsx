"use client";

import React, { useState } from 'react';
import { Plus, Minus, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqsProps {
    heading?: string;
    description?: string;
    faqs?: FaqItem[];
    showNumbers?: boolean;
    assistanceHeading?: string;
    assistanceDescription?: string;
    contactPhone?: string;
    contactEmail?: string;
    image?: string;
}

const defaultFaqs: FaqItem[] = [
    {
        question: "What Types Of AI Solutions Do You Deliver?",
        answer: "We deliver advanced AI solutions tailored to your business needs, enabling data-driven decision making and automated processes."
    },
    {
        question: "Can You Upgrade Our Existing Infrastructure, Including Servers And Networking?",
        answer: "Yes. We assess your current IT environment and provide seamless upgrades for servers, storage, networking, and virtualization platforms. Our approach ensures minimal downtime, improved performance, enhanced scalability, and future-ready infrastructure."
    },
    {
        question: "What Do You Offer For Cybersecurity?",
        answer: "We provide comprehensive cybersecurity solutions including threat detection, endpoint protection, firewall management, and security audits to safeguard your digital assets."
    },
    {
        question: "Do You Provide Solutions For Healthcare IT?",
        answer: "Yes, we provide specialized solutions for healthcare IT, ensuring compliance with industry standards while optimizing operational efficiency and patient care systems."
    },
    {
        question: "What Kind Of Support Services Do You Provide For End Users?",
        answer: "We offer comprehensive helpdesk support, proactive monitoring, and on-site troubleshooting to ensure your team remains productive with minimal disruptions."
    },
    {
        question: "How Do You Modernize The Data Center?",
        answer: "We modernize data centers through virtualization, cloud integration, and hyper-converged infrastructure, allowing for better resource utilization and energy efficiency."
    },
    {
        question: "What Are Your Offerings For AV And Video Conferencing Solutions?",
        answer: "We provide end-to-end audiovisual and video conferencing solutions, including smart board integration, meeting room setups, and high-definition communication systems."
    }
];

export default function Faqs({
    heading = "Frequently\nAsked Questions",
    description = "Find answers to common questions about our IT and networking solutions, services, and support.",
    faqs = defaultFaqs,
    showNumbers = false,
    assistanceHeading = "Need Assistance With Your IT Infrastructure?",
    assistanceDescription = "Have questions about our IT services or need immediate assistance?",
    contactPhone = "+971 2 813 7300",
    contactEmail = "info@acsllc.ae",
    image = "/faqs-ps.png",
}: FaqsProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const phoneHref = `tel:${contactPhone.replace(/\s+/g, "")}`;
    const emailHref = `mailto:${contactEmail}`;

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const formattedHeading = heading.split('\n').map((line, i) => (
        <React.Fragment key={i}>
            {line}
            {i < heading.split('\n').length - 1 && <br />}
        </React.Fragment>
    ));

    return (
        <section className="bg-white py-6 md:py-14 ">
            <div className="2xl:max-w-360 w-[90%] mx-auto flex flex-col lg:flex-row items-center md:gap-12 gap-6 ">

                <div className="flex flex-col w-full lg:w-[40%] xl:w-[35%]">
                    <h2 className="text-[20px] md:text-3xl lg:text-[40px] leading-[1.2] text-[#0a0f1e] mb-3 whitespace-pre-line">
                        {formattedHeading}
                    </h2>
                    <p className="text-[14.3px] 2xl:text-[16px] leading-relaxed text-[#000000]  mb-4 w-[90%]">
                        {description}
                    </p>

                    <div className="relative md:block hidden w-full  rounded-2xl overflow-hidden shadow-lg h-100">
                        <Image
                            src={image || "/faqs-ps.png"}
                            alt="faqs image"
                            fill
                            className="object-cover"
                        />

                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                            <h3 className="text-3xl mb-3">{assistanceHeading}</h3>
                            <p className="text-sm text-gray-200 mb-6 leading-relaxed w-[95%]">
                                {assistanceDescription}
                            </p>

                            <div className="w-full h-px bg-white/20 mb-6" />

                            <div className="flex flex-col gap-4">
                                <a href={phoneHref} className="flex items-center gap-3 text-sm hover:text-gray-300 transition-colors">
                                    <Phone size={18} strokeWidth={1.5} />
                                    <span>{contactPhone}</span>
                                </a>
                                <a href={emailHref} className="flex items-center gap-3 text-sm hover:text-gray-300 transition-colors">
                                    <Mail size={18} strokeWidth={1.5} />
                                    <span>{contactEmail}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full lg:w-[60%] xl:w-[65%]">

                    <div className="border-t border-gray-300">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={index} className="border-b border-gray-300">
                                    <button
                                        className="w-full flex items-center justify-between md:py-6 py-4 text-left focus:outline-none cursor-pointer"
                                        onClick={() => toggleFaq(index)}
                                    >
                                        <span className="text-[14px] md:text-[19px] text-[#161616] pr-8">
                                            {showNumbers ? `${index + 1}. ${faq.question}` : faq.question}
                                        </span>
                                        <span className="text-gray-500 shrink-0">
                                            {isOpen ? (
                                                <Minus size={22} strokeWidth={1.5} />
                                            ) : (
                                                <Plus size={22} strokeWidth={1.5} />
                                            )}
                                        </span>
                                    </button>

                                    <div
                                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out  ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="pb-6 text-[11.5px] md:text-[15px] leading-relaxed text-black">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="relative md:hidden block w-full rounded-2xl md:rounded-2xl overflow-hidden shadow-lg mt-6 h-100">
                        <Image
                            src="/our-partners/faqs-left.png"
                            alt=""
                            fill
                            className="object-cover"
                        />

                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                            <h3 className="text-[20px] md:text-3xl mb-3">{assistanceHeading}</h3>
                            <p className="text-sm text-gray-200 mb-6 leading-relaxed w-[95%]">
                                {assistanceDescription}
                            </p>

                            <div className="w-full h-px bg-white/20 mb-6" />

                            <div className="flex flex-col gap-4">
                                <a href={phoneHref} className="flex items-center gap-3 text-sm hover:text-gray-300 transition-colors">
                                    <Phone size={18} strokeWidth={1.5} />
                                    <span>{contactPhone}</span>
                                </a>
                                <a href={emailHref} className="flex items-center gap-3 text-sm hover:text-gray-300 transition-colors">
                                    <Mail size={18} strokeWidth={1.5} />
                                    <span>{contactEmail}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
