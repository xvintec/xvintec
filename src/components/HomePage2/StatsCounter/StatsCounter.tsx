"use client";

import React from "react";

import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const statsData = [
  { value: "10+", label: "Years of IT Excellence" },
  { value: "200+", label: "Clients Across Industries" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "12+", label: "Active Client Partnerships" },
  { value: "24/7", label: "Support & Monitoring" },
  { value: "200%", label: "Satisfaction Guarantee" },
];

const StatsCounter = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      >
        {statsData.map((stat, index) => (
          <div key={index}>
            <div className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] bg-clip-text text-transparent">
              {stat.value}
            </div>
            <p className="text-p-grey font-light mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCounter;
