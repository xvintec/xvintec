"use client";

import React, { useState } from "react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import H2Heading from "@/components/Common/Headings/H2Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const industriesData = [
  {
    title: "SaaS & Tech Companies",
    percentage: 95,
    description:
      "Secure, scalable infrastructure for high-growth software and technology businesses.",
  },
  {
    title: "Accounting & Finance",
    percentage: 88,
    description:
      "Compliant systems protecting sensitive financial and client data.",
  },
  {
    title: "Healthcare & Wellness",
    percentage: 80,
    description:
      "Compliance-ready systems for clinics, therapy practices, and wellness providers.",
  },
  {
    title: "Legal & Professional Services",
    percentage: 74,
    description:
      "Secure, reliable IT for law firms, consultancies, and advisory practices.",
  },
  {
    title: "Real Estate & Property",
    percentage: 72,
    description:
      "Always-on connectivity and data management for agents, brokers, and property managers.",
  },
  {
    title: "Retail & E-Commerce",
    percentage: 68,
    description:
      "PCI-compliant networks, POS integration, and uptime you can count on.",
  },
  {
    title: "Education & Non-Profit",
    percentage: 60,
    description:
      "Affordable, secure infrastructure for schools, training providers, and charities.",
  },
  {
    title: "Construction & Trades",
    percentage: 63,
    description:
      "Mobile-ready IT and project management integration for field-based teams.",
  },
  {
    title: "Hospitality & Food Service",
    percentage: 56,
    description:
      "Reliable networks, POS systems, and guest Wi-Fi for restaurants and hotels.",
  },
  {
    title: "Managed Services & Agencies",
    percentage: 78,
    description:
      "White-label IT solutions and scalable infrastructure for MSPs and digital agencies.",
  },
];

const IndustriesServed = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  const [active, setActive] = useState(industriesData[0]);

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

      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
      >
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:h-fit">
          <ul className="flex flex-col gap-1">
            {industriesData.map((industry) => (
              <li key={industry.title}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(industry)}
                  onClick={() => setActive(industry)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                    active.title === industry.title
                      ? "bg-[#EEF5FC] text-[#0325E1] font-semibold"
                      : "text-p-grey hover:bg-gray-50"
                  }`}
                >
                  {industry.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-8">
          <div className="min-h-[280px] rounded-3xl border border-gray-100 bg-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row md:items-center gap-8">
            <div className="md:w-1/2">
              <H2Heading className="text-2xl md:text-3xl">
                {active.title}
              </H2Heading>
            </div>
            <div className="md:w-1/2">
              <span className="text-3xl font-semibold bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] bg-clip-text text-transparent">
                {active.percentage}%
              </span>
              <div className="w-full h-2 bg-grey-light rounded-full mt-3 mb-4">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] transition-all duration-500"
                  style={{ width: `${active.percentage}%` }}
                />
              </div>
              <p className="min-h-[3.6em] text-p-grey font-normal">
                {active.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustriesServed;
