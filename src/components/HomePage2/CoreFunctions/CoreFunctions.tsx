"use client";

import React from "react";

import { Briefcase, Cpu, Headset, Settings, Wallet } from "lucide-react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";
import ServiceGridCard from "@/components/HomePage2/ServiceGrid/ServiceGridCard";

const coreFunctionsData = [
  {
    icon: <Cpu color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Engineering",
    tags: ["Infrastructure", "Cloud", "Security", "DevOps"],
    css: "animate-delay-300",
  },
  {
    icon: <Headset color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Client Support Services",
    tags: ["24/7 Monitoring", "Helpdesk", "Support Ticketing", "SLA Management"],
    css: "animate-delay-500",
  },
  {
    icon: <Briefcase color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Business Development",
    tags: ["Strategic Planning", "Vendor Management", "Contract Negotiation", "Growth Strategy"],
    css: "animate-delay-700",
  },
  {
    icon: <Wallet color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Finance",
    tags: ["Budget Management", "Cost Optimization", "Forecasting", "Compliance Reporting"],
    css: "animate-delay-1000",
  },
  {
    icon: <Settings color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Operations",
    tags: ["Project Management", "Change Management", "Disaster Recovery", "Business Continuity"],
    css: "animate-delay-300",
  },
];

const CoreFunctions = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <div className="text-center max-w-2xl m-auto mb-16">
        <H1Heading
          className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          Our Core Functions
        </H1Heading>
        <p
          className={`text-p-grey font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          Five specialized departments working together to deliver
          enterprise-grade IT services.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 md:px-0 gap-y-8 m-auto justify-items-center">
        {coreFunctionsData.map((data, index) => (
          <ServiceGridCard
            key={index}
            icon={data.icon}
            title={data.title}
            tags={data.tags}
            className={`${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CoreFunctions;
