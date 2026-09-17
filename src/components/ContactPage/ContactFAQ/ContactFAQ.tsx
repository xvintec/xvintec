"use client";

import React, { useState } from "react";

import { HelpCircle, Plus, X } from "lucide-react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const faqs = [
  {
    question: "How fast will Xvintec respond to my message?",
    answer:
      "Our team typically reviews new enquiries within two business hours. For urgent IT issues, mention it in your message or call us directly and we'll prioritize accordingly.",
  },
  {
    question: "Is the free consultation really free?",
    answer:
      "Yes. Booking a session through our Calendly link connects you with a member of our team for a no-obligation conversation about your IT, cloud, or cybersecurity needs — there's no cost or commitment involved.",
  },
  {
    question: "Which services can I ask about?",
    answer:
      "Anything from Managed IT and Cloud Services to Cybersecurity, Network Management, and Website Development. Pick the closest match in the form's \"Interested in\" field and we'll route your message to the right specialist.",
  },
];

const ContactFAQ = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      className={`fl-container pb-20 md:pb-28 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      ref={sectionRef}
    >
      <div className="text-center max-w-2xl m-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-p-black mb-5">
          <HelpCircle size={16} className="text-[#0325E1]" />
          Before you write
        </div>
        <H1Heading>Quick answers</H1Heading>
      </div>

      <div className="max-w-3xl m-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`bg-white rounded-2xl border transition-colors ${isOpen ? "border-[#0325E1]" : "border-gray-100"}`}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-6 px-6 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-p-black">
                  {faq.question}
                </span>
                <span className="relative shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0325E1]/10 text-[#0325E1]">
                  <Plus
                    size={16}
                    className={`absolute transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 opacity-0" : "rotate-0 opacity-100"}`}
                  />
                  <X
                    size={16}
                    className={`absolute transition-all duration-300 ease-in-out ${isOpen ? "rotate-0 opacity-100" : "-rotate-45 opacity-0"}`}
                  />
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                }}
              >
                <div className="overflow-hidden">
                  <p className="text-p-grey font-normal px-6 pb-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactFAQ;
