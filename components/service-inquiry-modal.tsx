"use client";

import { useState } from "react";
import { X } from "lucide-react";

type ServiceInquiryModalProps = {
    isOpen: boolean;
    selectedService: string;
    onClose: () => void;
};

export default function ServiceInquiryModal({
    isOpen,
    selectedService,
    onClose,
}: ServiceInquiryModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    service: selectedService,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                setSubmitMessage("Thank you! Your inquiry has been sent successfully.");
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => {
                    onClose();
                    setSubmitMessage("");
                }, 2000);
            } else {
                setSubmitMessage("Failed to send inquiry. Please try again.");
            }
        } catch (error) {
            setSubmitMessage("An error occurred. Please try again.");
            console.error("Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
                
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-black">Service Inquiry</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 space-y-3">
                    {/* Service Name (Read-only) */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Selected Service
                        </label>
                        <input
                            type="text"
                            value={selectedService}
                            disabled
                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1.5">
                            Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1475AF] focus:border-transparent"
                            placeholder="Your name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1.5">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1475AF] focus:border-transparent"
                            placeholder="your.email@example.com"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block text-xs font-medium text-gray-700 mb-1.5">
                            Message *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1475AF] focus:border-transparent resize-none"
                            placeholder="Tell us more about your inquiry..."
                        />
                    </div>

                    {/* Submit Message */}
                    {submitMessage && (
                        <div
                            className={`p-2 rounded-lg text-xs ${
                                submitMessage.includes("successfully")
                                    ? "bg-green-50 text-green-700"
                                    : "bg-red-50 text-red-700"
                            }`}
                        >
                            {submitMessage}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#1475AF] text-white py-1.5 text-sm rounded-lg font-medium hover:bg-[#0d5a8f] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Sending..." : "Send Inquiry"}
                    </button>
                </form>
            </div>
        </div>
    );
}
