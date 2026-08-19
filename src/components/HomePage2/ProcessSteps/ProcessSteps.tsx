"use client";

import React from "react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

import ProcessStepCard from "./ProcessStepCard";

const processStepsData = [
  {
    title: "Discovery & Assessment",
    items: ["IT Risk Assessment", "Security Review", "Infrastructure Analysis"],
    css: "animate-delay-300",
  },
  {
    title: "Custom Solution Design",
    items: ["Remediation Plan", "Technology Stack", "Implementation Timeline"],
    css: "animate-delay-500",
  },
  {
    title: "Implementation & Migration",
    items: ["System Setup", "Data Migration", "Staff Training"],
    css: "animate-delay-700",
  },
  {
    title: "Ongoing Managed Support",
    items: ["24/7 Monitoring", "Proactive Maintenance", "Strategic Planning"],
    css: "animate-delay-1000",
  },
];

const ProcessSteps = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className="bg-[#EEF5FC] py-20 md:py-28 mb-20 md:mb-28" ref={sectionRef}>
      <div className="fl-container">
        <div className="text-center max-w-2xl m-auto mb-16">
          <H1Heading
            className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            How We Work With You
          </H1Heading>
          <p
            className={`text-p-grey font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            Our proven process ensures a smooth transition and immediate
            impact.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-3 md:px-0 gap-y-8 m-auto justify-items-center">
          {processStepsData.map((data, index) => (
            <ProcessStepCard
              key={index}
              step={index + 1}
              title={data.title}
              items={data.items}
              className={`${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;
