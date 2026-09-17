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
    title: "Access an Entire IT Team",
    content:
      "Skip the recruitment, onboarding and coverage gaps. Get access to specialists across infrastructure, cloud, cybersecurity, support and technology strategy.",
    css: "animate-delay-300",
  },
  {
    icon: Clock,
    kicker: "Time Management",
    title: "Focus on Your Business",
    content:
      "We take ownership of day-to-day IT operations, issues and vendor coordination so your team can focus on customers, growth and core operations.",
    css: "animate-delay-500",
  },
  {
    icon: ShieldCheck,
    kicker: "Security & Compliance",
    title: "Secure, Compliant & Resilient",
    content:
      "Proactive monitoring, layered security, access controls, backup and governance practices help keep your systems protected and Audit-ready.",
    css: "animate-delay-700",
  },
  {
    icon: DollarSign,
    kicker: "Cost Control",
    title: "Predictable Costs. Clear Accountability.",
    content:
      "One flat monthly rate covers your entire IT stack – Nohidden fees.",
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
            Why Businesses Choose Xvintec
          </H1Heading>
          <p
            className={`text-p-grey font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            Enterprise-grade IT expertise, delivered as an extension of your business - without the cost and complexity of building a full internal technology team.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 gap-y-8 m-auto justify-items-center">
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
