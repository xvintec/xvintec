"use client";

import React from "react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

import IndustryCard from "./IndustryCard";

const industriesData = [
  {
    title: "SaaS & Tech Companies",
    percentage: 95,
    description:
      "Secure, scalable infrastructure for high-growth software and technology businesses.",
    css: "animate-delay-300",
  },
  {
    title: "Accounting & Finance",
    percentage: 88,
    description:
      "Compliant systems protecting sensitive financial and client data.",
    css: "animate-delay-500",
  },
  {
    title: "Healthcare & Wellness",
    percentage: 80,
    description:
      "Compliance-ready systems for clinics, therapy practices, and wellness providers.",
    css: "animate-delay-700",
  },
  {
    title: "Legal & Professional Services",
    percentage: 74,
    description:
      "Secure, reliable IT for law firms, consultancies, and advisory practices.",
    css: "animate-delay-1000",
  },
  {
    title: "Real Estate & Property",
    percentage: 72,
    description:
      "Always-on connectivity and data management for agents, brokers, and property managers.",
    css: "animate-delay-300",
  },
  {
    title: "Retail & E-Commerce",
    percentage: 68,
    description:
      "PCI-compliant networks, POS integration, and uptime you can count on.",
    css: "animate-delay-500",
  },
  {
    title: "Education & Non-Profit",
    percentage: 60,
    description:
      "Affordable, secure infrastructure for schools, training providers, and charities.",
    css: "animate-delay-700",
  },
  {
    title: "Construction & Trades",
    percentage: 63,
    description:
      "Mobile-ready IT and project management integration for field-based teams.",
    css: "animate-delay-1000",
  },
  {
    title: "Hospitality & Food Service",
    percentage: 56,
    description:
      "Reliable networks, POS systems, and guest Wi-Fi for restaurants and hotels.",
    css: "animate-delay-300",
  },
  {
    title: "Managed Services & Agencies",
    percentage: 78,
    description:
      "White-label IT solutions and scalable infrastructure for MSPs and digital agencies.",
    css: "animate-delay-500",
  },
];

const IndustriesServed = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <div className="text-center max-w-2xl m-auto mb-16">
        <H1Heading
          className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          Industries Served
        </H1Heading>
        <p
          className={`text-p-grey font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          From healthcare to hospitality, finance to construction — we bring
          enterprise-grade IT to organizations of every shape and size.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 md:px-0 gap-y-8 m-auto justify-items-center">
        {industriesData.map((industry, index) => (
          <IndustryCard
            key={index}
            title={industry.title}
            percentage={industry.percentage}
            description={industry.description}
            className={`${isVisible ? `animate-fade-up ${industry.css}` : "opacity-0"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default IndustriesServed;
