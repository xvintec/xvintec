"use client";

import React from "react";

import { Linkedin, Mail, MapPin, Phone } from "lucide-react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import H2Heading from "@/components/Common/Headings/H2Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const contactMethods: {
  icon: typeof Phone;
  title: string;
  value: string;
  href?: string;
}[] = [
  {
    icon: Phone,
    title: "Phone",
    value: "0777517850",
    href: "tel:0777517850",
  },
  {
    icon: Mail,
    title: "Email",
    value: "Info@xvintec.com",
    href: "mailto:Info@xvintec.com",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "xvintec/home",
    href: "https://www.linkedin.com/company/xvintec/home/",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "342, Galle road, Kollupitiya",
  },
];

const slaCommitments = [
  { label: "Critical issues", value: "< 1 hour response" },
  { label: "High priority", value: "< 4 hours" },
  { label: "Standard issues", value: "< 24 hours" },
];

const ContactInfo = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <div className="text-center max-w-2xl m-auto mb-16">
        <H1Heading
          className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          Contact Us
        </H1Heading>
        <p
          className={`text-p-grey font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          Whether you need immediate IT support, a full managed services
          assessment, or simply have a question — our team is ready to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 gap-y-8 m-auto justify-items-center mb-10">
        {contactMethods.map((method, index) => (
          <div
            key={index}
            className={`max-w-md w-full bg-white py-8 px-6 rounded-2xl text-center border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            <method.icon
              color="url(#brand-gradient)"
              className="m-auto"
              size={32}
              strokeWidth={1.5}
            />
            <H2Heading className="mt-4">{method.title}</H2Heading>
            <p className="text-p-grey font-normal mt-1 break-words">
              {method.href ? (
                <a
                  href={method.href}
                  className="hover:underline"
                  {...(method.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {method.value}
                </a>
              ) : (
                method.value
              )}
            </p>
          </div>
        ))}
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${isVisible ? "animate-fade-up animate-delay-500" : "opacity-0"}`}
      >
        <div className="bg-white py-8 px-6 rounded-2xl border border-gray-100">
          <H2Heading>SLA Commitment</H2Heading>
          <ul className="mt-4 space-y-2">
            {slaCommitments.map((sla, index) => (
              <li
                key={index}
                className="flex justify-between text-p-grey font-normal"
              >
                <span>{sla.label}</span>
                <span className="font-medium text-p-black">{sla.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white py-8 px-6 rounded-2xl border border-gray-100">
          <H2Heading>Office Locations</H2Heading>
          <p className="text-p-grey font-normal mt-4">
            Based in Kollupitiya. Supporting Businesses Islandwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
