"use client";

import React from "react";

import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const statsData = [
  {
    tag: "Experience",
    value: "10+",
    label: "Years of IT Excellence",
    bg: "#0325E1",
  },
  {
    tag: "Reach",
    value: "200+",
    label: "Clients Across Industries",
    bg: "#0DA7E9",
  },
  {
    tag: "Reliability",
    value: "99.9%",
    label: "Uptime SLA",
    bg: "#0A1B3D",
  },
  {
    tag: "Partnership",
    value: "12+",
    label: "Active Client Partnerships",
    bg: "#155DFC",
  },
  {
    tag: "Support",
    value: "24/7",
    label: "Support & Monitoring",
    bg: "#0369A1",
  },
  {
    tag: "Satisfaction",
    value: "200%",
    label: "Satisfaction Guarantee",
    bg: "#1E3A8A",
  },
];

const StatsCounter = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <div
        className={`grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      >
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-2xl p-6 min-h-[168px] text-white transition-transform duration-300 hover:-translate-y-1"
            style={{ backgroundColor: stat.bg }}
          >
            <span className="inline-block w-fit rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
              {stat.tag}
            </span>
            <div>
              <div className="text-4xl md:text-5xl font-semibold">
                {stat.value}
              </div>
              <p className="mt-2 text-sm font-light text-white/80">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCounter;
