"use client";

import React from "react";

import { Clock, DollarSign, ShieldCheck, UserX } from "lucide-react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

import ValuePropCard from "./ValuePropCard";

const valuePropsData = [
  {
    icon: UserX,
    kicker: "Talent Acquisition",
    title: "Skip the Hiring Headache",
    content:
      "No job postings, interviews, or onboarding. Get a full team of IT experts without the recruiting cost or wait.",
    css: "animate-delay-300",
  },
  {
    icon: Clock,
    kicker: "Time Management",
    title: "Reclaim Your Time",
    content:
      "Stop firefighting IT issues yourself. We handle the day-to-day so you can focus on running your business.",
    css: "animate-delay-500",
  },
  {
    icon: ShieldCheck,
    kicker: "Security & Compliance",
    title: "Stay Compliant & Secure",
    content:
      "Proactive monitoring and security best practices keep your business protected and audit-ready.",
    css: "animate-delay-700",
  },
  {
    icon: DollarSign,
    kicker: "Cost Control",
    title: "Predictable Costs",
    content:
      "One flat monthly rate covers your entire IT stack — no surprise invoices, no hidden fees.",
    css: "animate-delay-1000",
  },
];

const ValueProps = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className="bg-[#EEF5FC] py-20 md:py-28 mb-20 md:mb-28" ref={sectionRef}>
      <div className="fl-container">
        <div className="text-center max-w-2xl m-auto mb-16">
          <H1Heading
            className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            Why SMBs and SaaS Companies Choose Us
          </H1Heading>
          <p
            className={`text-p-grey font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            Enterprise-grade IT without the enterprise overhead. Get a full
            team&apos;s expertise for a fraction of the cost.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-3 md:px-0 gap-y-8 m-auto justify-items-center">
          {valuePropsData.map((data, index) => (
            <ValuePropCard
              key={index}
              icon={data.icon}
              kicker={data.kicker}
              title={data.title}
              content={data.content}
              className={`${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValueProps;
