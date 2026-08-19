"use client";

import React from "react";

import Image from "next/image";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const trustedPartners = [
  {
    name: "Samsung",
    image: "/partners/Samsung-white.png",
    description: "Trusted technology & integration partner",
  },
  {
    name: "OpenZeppelin",
    image: "/partners/Open-white.png",
    description: "Security-audited infrastructure standards",
  },
  {
    name: "ClickUp",
    image: "/partners/Clickup-white.png",
    description: "Workflow & project management integration",
  },
  {
    name: "GitHub",
    image: "/partners/Github-white.png",
    description: "Source control & DevOps best practices",
  },
  {
    name: "Segment",
    image: "/partners/Segment-white.png",
    description: "Reliable data & analytics integration",
  },
];

const TrustedByEnterprises = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <div className="text-center max-w-2xl m-auto mb-16">
        <H1Heading
          className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          Trusted by enterprises. Verified by industry leaders. Audited for
          excellence.
        </H1Heading>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 px-3 md:px-0 gap-y-8 m-auto justify-items-center">
        {trustedPartners.map((partner, index) => (
          <div
            key={index}
            className={`max-w-md w-full bg-white py-8 px-6 rounded-2xl text-center border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            <Image
              src={partner.image}
              alt={partner.name}
              width={120}
              height={40}
              className="m-auto grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
              style={{ objectFit: "contain" }}
            />
            <p className="text-p-grey font-normal mt-4">
              {partner.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedByEnterprises;
