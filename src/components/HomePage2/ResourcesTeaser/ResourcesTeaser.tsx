"use client";

import React from "react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const resourcesData = [
  {
    tag: "Cybersecurity",
    title: "5 IT Risks That Are Quietly Draining Your Business",
    css: "animate-delay-300",
  },
  {
    tag: "Compliance",
    title: "What Growing Businesses Need to Know About Data Compliance",
    css: "animate-delay-500",
  },
  {
    tag: "Strategy",
    title: "Why Managed IT Beats In-House for Growing Businesses",
    css: "animate-delay-700",
  },
];

const ResourcesTeaser = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <H1Heading
        className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      >
        From the Blog
      </H1Heading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-3 md:px-0 gap-y-8 m-auto justify-items-center">
        {resourcesData.map((resource, index) => (
          <div
            key={index}
            className={`max-w-md w-full bg-white py-8 px-6 rounded-lg border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg ${isVisible ? `animate-fade-up ${resource.css}` : "opacity-0"}`}
          >
            <span className="text-xs font-medium text-secondary bg-blue-light/40 rounded-full px-3 py-1 transition-colors duration-300 hover:bg-secondary hover:text-white cursor-default">
              {resource.tag}
            </span>
            <p className="text-p-black font-medium mt-4">{resource.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesTeaser;
