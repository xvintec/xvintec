"use client";

import React from "react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

import CaseStudyCard from "./CaseStudyCard";

// Placeholder illustrative case studies — replace with real Xvintec client
// outcomes once available.
const caseStudiesData = [
  {
    industry: "SaaS Startup",
    keyResult: "99.9% Uptime",
    challenge:
      "No in-house IT. Weeks of downtime per year costing significant lost revenue.",
    result:
      "Achieved 99.9% uptime, eliminated costly outages, audit-ready within weeks.",
    css: "animate-delay-300",
  },
  {
    industry: "Healthcare Practice",
    keyResult: "Compliance Ready",
    challenge:
      "Compliance gaps, aging workstations, and no disaster recovery plan.",
    result:
      "Compliant infrastructure deployed in weeks. Zero data incidents since.",
    css: "animate-delay-500",
  },
  {
    industry: "Early-Stage Startup",
    keyResult: "Full-Time Hire Saved",
    challenge:
      "Wanted to hire an in-house IT team but it was cost-prohibitive.",
    result:
      "Managed services eliminated the need for a full-time hire, freeing the founders to focus on product.",
    css: "animate-delay-700",
  },
  {
    industry: "Multi-Location Retailer",
    keyResult: "Zero POS Outages",
    challenge:
      "POS outages during peak hours costing thousands per incident. No central IT.",
    result:
      "Unified network and 24/7 monitoring across all locations.",
    css: "animate-delay-1000",
  },
];

const CaseStudies = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div id="case-studies" className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <div className="text-center max-w-2xl m-auto mb-16">
        <H1Heading
          className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          Proven Results
        </H1Heading>
        <p
          className={`text-p-grey font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          From startups to multi-location businesses — we deliver measurable
          IT results across every sector.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-3 md:px-0 gap-y-8 m-auto justify-items-center">
        {caseStudiesData.map((data, index) => (
          <CaseStudyCard
            key={index}
            industry={data.industry}
            keyResult={data.keyResult}
            challenge={data.challenge}
            result={data.result}
            className={`${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
