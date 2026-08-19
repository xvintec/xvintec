"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div
          className={`lg:sticky lg:top-28 ${isVisible ? "animate-fade" : "opacity-0"}`}
        >
          <div
            className="relative overflow-hidden rounded-3xl min-h-[420px] flex flex-col justify-center p-10 md:p-12"
            style={{ background: "var(--hero-gradient)" }}
          >
            <Image
              src="/images/bussiness-people-working-team-office.jpg"
              alt=""
              fill
              className="object-cover opacity-20"
            />
            <div className="relative">
              <div className="text-6xl md:text-7xl font-semibold text-white">
                200+
              </div>
              <p className="mt-4 max-w-sm text-white/80 font-light">
                With measurable outcomes across every sector, Xvintec is the
                trusted managed IT partner behind the results below.
              </p>
              <Link
                href="#client-stories"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-white"
              >
                See client stories
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
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
    </div>
  );
};

export default CaseStudies;
