"use client";

import React, { useState } from "react";

import { CheckCircle2, MessageSquare } from "lucide-react";

import Button from "@/components/Common/Button/Button";
import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";
import { ServicesData } from "@/data/ServicesData";

const inputClassName =
  "w-full rounded-xl border border-gray-200 px-4 py-3 text-p-black placeholder:text-p-grey focus:outline-none focus:ring-2 focus:ring-[#0325E1]/30 focus:border-[#0325E1] transition-colors";

type Status = "idle" | "submitting" | "success" | "error";

const ContactForm = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(
          result?.error ?? "Something went wrong. Please try again."
        );
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white py-12 px-6 md:py-16 md:px-10 rounded-2xl border border-gray-100 text-center animate-fade-up">
        <CheckCircle2 size={56} className="mx-auto text-[#0325E1]" />
        <H1Heading className="mt-6">
          Thank you for submitting the form!
        </H1Heading>
        <p className="text-p-grey font-light mt-3 max-w-md mx-auto">
          We have received your details and will contact you shortly.
        </p>
        <Button
          type="button"
          bgColor="btn-secondary"
          showArrow={false}
          className="mt-8"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`bg-white py-8 px-6 md:py-10 md:px-10 rounded-2xl border border-gray-100 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
      ref={sectionRef}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-p-black">
        <MessageSquare size={16} className="text-[#0325E1]" />
        Send a message
      </div>

      <H1Heading className="mt-4">Tell us what you need</H1Heading>
      <p className="text-p-grey font-light mt-2">
        We&apos;ll get back to you as soon as possible.
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {/* Honeypot: hidden from people, but bots fill it in. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-p-black mb-2">
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Your full name"
              className={inputClassName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-p-black mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className={inputClassName}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-p-black mb-2">
              Phone / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+94 7X XXX XXXX"
              className={inputClassName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-p-black mb-2">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              required
              placeholder="Your company name"
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-p-black mb-2">
            Interested in <span className="text-red-500">*</span>
          </label>
          <select
            name="interestedIn"
            required
            defaultValue=""
            className={inputClassName}
          >
            <option value="" disabled>
              Select a service
            </option>
            {ServicesData.map((service) => (
              <option key={service.link} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-p-black mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell us about your business and what you need..."
            className={`${inputClassName} resize-none`}
          />
        </div>

        {status === "error" && (
          <p role="alert" className="text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          showArrow
          disabled={status === "submitting"}
          className="w-full md:w-auto"
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
