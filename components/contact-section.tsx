"use client"
import { useState } from "react";
import Image from "next/image";
import Button from "./ui/grad-button";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        consent: false
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checkbox = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.consent) {
            setErrorMessage("Please agree to the data collection.");
            setStatus("error");
            return;
        }

        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "", consent: false });
            } else {
                const data = await response.json();
                throw new Error(data.error || "Something went wrong");
            }
        } catch (error: any) {
            setStatus("error");
            setErrorMessage(error.message);
        }
    };

    return (
        <section className="relative w-full min-h-150 flex items-center overflow-hidden py-16">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/home/contact-bg.png"
                    alt="Futuristic Vertiport Night"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="max-w-360 w-[85%] mx-auto relative z-10">
                <div className="flex justify-center lg:justify-end">
                    {/* Form Card */}
                    <div className="bg-white rounded-[20px] shadow-2xl p-6  max-w-137.5 w-full mt-10 mb-10 lg:mt-0 lg:mb-0">
                        <h2 className="font-rethink text-3xl md:text-[32px] text-black mb-1 leading-tight">
                            Tell Us Your Requirements
                        </h2>
                        <p className="font-onest text-black text-sm md:text-base mb-8">
                            Please submit your requirements using the following online form. Our team will revert asap.
                        </p>

                        <form className="space-y-3" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full px-5 py-2.5 rounded-[8px] border border-[#E2E4E9] font-onest text-sm focus:outline-none focus:ring-2 focus:ring-[#168DCA]/20 transition-all placeholder:text-[#ADAFB5]"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full px-5 py-2.5 rounded-[8px] border border-[#E2E4E9] font-onest text-sm focus:outline-none focus:ring-2 focus:ring-[#168DCA]/20 transition-all placeholder:text-[#ADAFB5]"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Subject"
                                    className="w-full px-5 py-2.5 rounded-[8px] border border-[#E2E4E9] font-onest text-sm focus:outline-none focus:ring-2 focus:ring-[#168DCA]/20 transition-all placeholder:text-[#ADAFB5]"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Message"
                                    rows={4}
                                    className="w-full px-5 py-2.5 rounded-[8px] border border-[#E2E4E9] font-onest text-sm focus:outline-none focus:ring-2 focus:ring-[#168DCA]/20 transition-all placeholder:text-[#ADAFB5] resize-none"
                                />
                            </div>

                            <div className="flex items-start gap-3 mt-2">
                                <div className="">
                                    <input
                                        type="checkbox"
                                        name="consent"
                                        id="consent"
                                        required
                                        checked={formData.consent}
                                        onChange={handleChange}
                                        className="w-4 h-4 rounded border-gray-300 text-[#168DCA] focus:ring-[#168DCA]"
                                    />
                                </div>
                                <label htmlFor="consent" className="font-onest text-[12px] text-[#ACAFB2] leading-relaxed">
                                    I agree that my submitted data is being collected and stored.
                                </label>
                            </div>

                            {status === "success" && (
                                <p className="text-green-600 text-sm font-onest">Message sent successfully!</p>
                            )}
                            {status === "error" && (
                                <p className="text-red-600 text-sm font-onest">{errorMessage}</p>
                            )}

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    title={status === "loading" ? "Sending..." : "Send Message"}
                                    size="md"
                                    fullWidth
                                    className={`rounded-[10px] ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={status === "loading"}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
