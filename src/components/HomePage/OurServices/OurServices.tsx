"use client";

import React, { useEffect } from "react";

import Link from "next/link";

import Button from "@/components/Common/Button/Button";
import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

import OurServicesCard from "./OurServicesCard";

const OurServices = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  const howWeKnowData = [
    {
      image: "/svgs/cloud.svg",
      title: "Cloud Services",
      content:
        "Our experts handle the seamless migration to the cloud and provide ongoing support to ensure optimal utilization and security.",
      css: "animate-delay-300",
    },
    {
      image: "/svgs/cloud-change.svg",
      title: "Network Management",
      content:
        "Our experts implement the optimized network solutions and provide ongoing support to ensure seamless connectivity and minimal downtime.",
      css: "animate-delay-500",
    },
    {
      image: "/svgs/shield-tick.svg",
      title: "Cybersecurity Services",
      content:
        "Our team implements robust security measures and provides continuous monitoring and support to safeguard your business against cyber threats.",
      css: "animate-delay-700",
    },
  ];

  return (
    <div className={`fl-container mb-20 md:mb-28`} ref={sectionRef}>
      <H1Heading
        className={`text-center mb-16 ${isVisible ? " animate-fade-up" : "opacity-0"}`}
      >
        Our services
      </H1Heading>
      <div
        className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 px-3 md:px-0 gap-y-8 m-auto justify-items-center`}
      >
        {howWeKnowData.map((data, index) => (
          <OurServicesCard
            key={index}
            image={data.image}
            title={data.title}
            content={data.content}
            className={`${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
          />
        ))}
      </div>
      <div
        className={`text-center ${isVisible ? "animate-fade-up animate-delay-1000" : "opacity-0"}`}
      >
        <Link className="text-blue-600" href="/services">
          <Button className="mx-auto mt-14 text-center">View more</Button>
        </Link>
      </div>
    </div>
  );
};

export default OurServices;
