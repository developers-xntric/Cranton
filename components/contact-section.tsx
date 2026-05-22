"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "./ui/grad-button";
import SectionHeading from "./ui/section-heading";

const PersonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9CA3AF"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      if (!recaptchaToken) {
        throw new Error("Please complete the reCAPTCHA verification");
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          subject: formData.service,
          message: formData.message,
          recaptchaToken,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          service: "",
          message: "",
        });
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      } else {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error: unknown) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  const inputBase =
    "w-full px-4 py-2.5 rounded-[8px] border border-[#E2E4E9] font-onest text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#168DCA]/20 focus:border-[#168DCA] transition-all placeholder:text-[#ADAFB5] bg-white";

  return (
    <section className="w-full bg-white py-10 md:py-16 lg:py-20">
      <div className="max-w-[1440px] w-[90%] md:w-[85%] mx-auto">
        <div className="flex flex-col lg:flex-row items-stretch overflow-hidden ">
          {/* Left — Image */}
          <div className="relative w-full lg:w-[55%] min-h-[300px] lg:min-h-[650px] rounded-[16px]">
            <Image
              src="/home/contact.png"
              alt="Futuristic Vertiport"
              fill
              className="object-cover rounded-[16px]"
              priority
            />
          </div>

          {/* Right — Form */}
          <div className="w-full lg:w-[55%] bg-white px-1 py-8 md:px-10 md:py-10 lg:py-12 flex flex-col justify-center lg:max-h-[700px]">
            <SectionHeading
              title=" Tell Us Your Requirements"
              className="text-2xl md:text-3xl  text-black"
            />
            <p className="font-onest text-[#6B7280] text-[13px] md:text-sm mb-7 leading-relaxed">
              Please submit your requirements using the following online form.
              Our team will revert asap.
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* First Name + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-onest text-[13px] font-medium text-[#1F2937] mb-1.5">
                    First Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center">
                      <PersonIcon />
                    </span>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className={`${inputBase} pl-10`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-onest text-[13px] font-medium text-[#1F2937] mb-1.5">
                    Last Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center">
                      <PersonIcon />
                    </span>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className={`${inputBase} pl-10`}
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block font-onest text-[13px] font-medium text-[#1F2937] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center">
                    <EmailIcon />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>

              {/* Services Interest */}
              <div>
                <label className="block font-onest text-[13px] font-medium text-[#1F2937] mb-1.5">
                  Services Interest
                </label>
                <div className="relative">
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className={`${inputBase} appearance-none pr-10 cursor-pointer ${
                      formData.service === "" ? "text-[#ADAFB5]" : "text-black"
                    }`}
                  >
                    <option value="" disabled>
                      Select a Service
                    </option>
                    <option value="helipad-solutions">Helipad Solutions</option>
                    <option value="vertiport-solutions">
                      Vertiport Solutions
                    </option>
                    <option value="obstruction-lighting">
                      Obstruction Lighting
                    </option>
                    <option value="floating-platforms">
                      Floating Platforms
                    </option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDownIcon />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-onest text-[13px] font-medium text-[#1F2937] mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project requirements, timeline, and goals."
                  rows={4}
                  className={`${inputBase} resize-none`}
                />
              </div>

              {/* reCAPTCHA */}
              <div className="flex">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={(token) => setRecaptchaToken(token)}
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <p className="text-green-600 text-sm font-onest">
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-sm font-onest">
                  {errorMessage}
                </p>
              )}

              {/* Submit Button */}
              <div className="pt-2">
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
