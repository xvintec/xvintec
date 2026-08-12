"use client";

import React, { useEffect } from "react";

import Button from "@/components/Common/Button/Button";
import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

import OurServicesCard from "../HomePage/OurServices/OurServicesCard";

const AboutUsOurValues = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  const howWeKnowData = [
    {
      image: "/svgs/Innovation.svg",
      title: "Innovation",
      content:
        "We're not content with the status quo. We're constantly pushing the boundaries of what's possible, exploring new ideas, and embracing change",
      css: "animate-delay-300",
    },
    {
      image: "/svgs/Collab.svg",
      title: "Collaboration",
      content:
        "We believe in the power of teamwork. By fostering a culture of collaboration and inclusivity, we're able to achieve greater heights together.",
      css: "animate-delay-500",
    },
    {
      image: "/svgs/Quality.svg",
      title: "Excellence",
      content:
        "We strive for excellence in everything we do. From the quality of our work to the level of service we provide, we're committed to exceeding expectations.",
      css: "animate-delay-700",
    },
    {
      image: "/svgs/Passion.svg",
      title: "Passion",
      content:
        "We're passionate about what we do. Our enthusiasm drives us to go above and beyond, turning challenges into opportunities and obstacles into triumphs.",
      css: "animate-delay-700",
    },
    {
      image: "/svgs/Integrity.svg",
      title: "Integrity",
      content:
        "We believe in doing the right thing, even when no one's watching. Honesty, transparency, and integrity are the cornerstones of our business.",
      css: "animate-delay-700",
    },
  ];

  return (
    <div className={`fl-container mb-20 md:mb-28`} ref={sectionRef}>
      <H1Heading
        className={`text-center ${isVisible ? " animate-fade-up" : "opacity-0"}`}
      >
        Our Values
      </H1Heading>
      <p
        className={`py-5 text-p-grey font-light mb-10 max-w-5xl text-center m-auto ${isVisible ? " animate-fade-up animate-delay-300" : "opacity-0"}`}
      >
        At Xvintec, our values aren&apos;t just words on a wall, they&apos;re
        the guiding principles that inform everything we do
      </p>

      <div
        className={`flex flex-wrap justify-center gap-8 px-3 md:px-0 gap-y-8 m-auto justify-items-center`}
      >
        {howWeKnowData.map((data, index) => (
          <OurServicesCard
            key={index}
            image={data.image}
            title={data.title}
            content={data.content}
            className={`max-w-sm ${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
          />
        ))}
      </div>
      <div
        className={`text-center ${isVisible ? "animate-fade-up animate-delay-1000" : "opacity-0"}`}
      ></div>
    </div>
  );
};

export default AboutUsOurValues;
