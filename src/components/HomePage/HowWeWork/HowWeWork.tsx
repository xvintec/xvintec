"use client";

import React, { useEffect } from "react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

import HowWeKnowCard from "./HowWeWorkCard";

const HowWeKnow = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  const howWeKnowData = [
    {
      image: "/svgs/Illuminate.svg",
      title: "Illuminate",
      content:
        "Shed light on your unique needs and challenges with a comprehensive assessment of your current setup.We start by assessing your current IT setup and business needs.",
      css: "animate-delay-300",
    },
    {
      image: "/svgs/Innovate.svg",
      title: "Innovate",
      content:
        "Collaborate with our experts to craft innovative solutions customized to your specific requirements and aspirations. We tailor our services to fit your specific needs.",
      css: "animate-delay-500",
    },
    {
      image: "/svgs/Implement.svg",
      title: "Implement",
      content:
        "Watch your vision come to life as we seamlessly implement and support the tailored solutions, ensuring your success every step of the way.",
      css: "animate-delay-700",
    },
  ];

  return (
    <div className={`fl-container mb-20 md:mb-28`} ref={sectionRef}>
      <H1Heading
        className={`text-center mb-16 ${isVisible ? " animate-fade-up" : "opacity-0"}`}
      >
        How we work
      </H1Heading>
      <div
        className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 px-3 md:px-0 gap-y-8 m-auto justify-items-center`}
      >
        {howWeKnowData.map((data, index) => (
          <HowWeKnowCard
            key={index}
            image={data.image}
            title={data.title}
            content={data.content}
            className={`${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HowWeKnow;
