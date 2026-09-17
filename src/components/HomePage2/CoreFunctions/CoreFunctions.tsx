"use client";

import { Briefcase, Cpu, Headset, Settings, Wallet } from "lucide-react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";
import ServiceGridCard from "@/components/HomePage2/ServiceGrid/ServiceGridCard";

const coreFunctionsData = [
  {
    icon: <Cpu color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Engineering",
    tags: ["Infrastructure", "Cloud", "Security", "DevOps"],
  },
  {
    icon: <Headset color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Client Support Services",
    tags: ["24/7 Monitoring", "Helpdesk", "Support Ticketing", "SLA Management"],
  },
  {
    icon: <Briefcase color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Business Development",
    tags: ["Strategic Planning", "Vendor Management", "Contract Negotiation", "Growth Strategy"],
  },
  {
    icon: <Wallet color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Finance",
    tags: ["Budget Management", "Cost Optimization", "Forecasting", "Compliance Reporting"],
  },
  {
    icon: <Settings color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Operations",
    tags: ["Project Management", "Change Management", "Disaster Recovery", "Business Continuity"],
  },
];

const CoreFunctions = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <div
        className={`max-w-2xl mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      >
        <H1Heading>Our Core Functions</H1Heading>
        <p className="text-p-grey font-light mt-5">
          Five specialized departments working together to deliver
          enterprise-grade IT services.
        </p>
      </div>

      <div
        className={`flex flex-wrap justify-center gap-6 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
      >
        {coreFunctionsData.map((data, index) => (
          <ServiceGridCard
            key={index}
            icon={data.icon}
            title={data.title}
            tags={data.tags}
            className="max-w-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          />
        ))}
      </div>
    </div>
  );
};

export default CoreFunctions;
