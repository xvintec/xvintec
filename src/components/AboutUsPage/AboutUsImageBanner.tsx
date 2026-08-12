"use client";

import React from "react";

import Image from "next/image";

import H1Heading from "../Common/Headings/H1Heading";
import useIntersectionAnimation from "../Common/UseScrollAnimation/UseScrollAnimation";

const AboutUsImageBanner = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div ref={sectionRef}>
      <H1Heading
        className={`text-center mb-0 ${isVisible ? " animate-fade-up" : "opacity-0"}`}
      >
        Our Story
      </H1Heading>
      <Image
        className={`h-[250px] md:h-[380px] mt-8 w-screen max-w-[2400px] m-auto ${isVisible ? " animate-fade-up" : "opacity-0"}`}
        src="/header/about-us-banner.png"
        width={1400}
        height={500}
        alt="about-us-banner-image"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default AboutUsImageBanner;
