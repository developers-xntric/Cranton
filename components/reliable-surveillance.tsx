"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "./ui/grad-button";

interface ReliableSurveillanceProps {
    title: string;
    description: string;
    image: string;
    buttonText?: string;
    buttonHref?: string;
}

export default function ReliableSurveillance({ title, description, image, buttonText = "Learn More", buttonHref = "/contact" }: ReliableSurveillanceProps) {
    return (
        <section className="w-full bg-white py-16 ">
            <div className="2xl:max-w-350 w-[90%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-3"
                    >
                        <h2 className="text-[20px] md:text-3xl lg:text-[40px] leading-[1.2] text-[#000]">
                            {title.split('.').map((line, i) => (
                                <span key={i}>
                                    {line}{i === 0 ? '.' : ''}
                                    {i === 0 && <br />}
                                </span>
                            ))}
                        </h2>
                        <div className="relative md:block hidden w-full md:h-[400px] h-[200px] rounded-[10px] md:rounded-[24px] overflow-hidden shadow-lg">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    <div className="flex flex-col justify-between gap-12 lg:pt-4">
                        <motion.p
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6 }}
                            className="text-[#000] text-[16px] lg:text-[25px] leading-relaxed md:max-w-[90%] font-onset"
                        >
                            {description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Button href={buttonHref}>{buttonText}</Button>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                        className="relative md:hidden block w-full md:h-[400px] h-[200px] rounded-[10px] md:rounded-[24px] overflow-hidden shadow-lg"
                    >
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
