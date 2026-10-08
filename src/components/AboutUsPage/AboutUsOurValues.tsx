"use client";

import React from "react";

import { Award, Handshake, Heart, Rocket, Scale } from "lucide-react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";
import GradientDefs from "@/components/HomePage2/GradientDefs/GradientDefs";
import ValuePropCard from "@/components/HomePage2/ValueProps/ValuePropCard";

const AboutUsOurValues = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  const howWeKnowData = [
    {
      icon: Rocket,
      title: "Innovation",
      content:
        "We're not content with the status quo. We're constantly pushing the boundaries of what's possible, exploring new ideas, and embracing change",
      css: "animate-delay-300",
    },
    {
      icon: Handshake,
      title: "Collaboration",
      content:
        "We believe in the power of teamwork. By fostering a culture of collaboration and inclusivity, we're able to achieve greater heights together.",
      css: "animate-delay-500",
    },
    {
      icon: Award,
      title: "Excellence",
      content:
        "We strive for excellence in everything we do. From the quality of our work to the level of service we provide, we're committed to exceeding expectations.",
      css: "animate-delay-700",
    },
    {
      icon: Heart,
      title: "Passion",
      content:
        "We're passionate about what we do. Our enthusiasm drives us to go above and beyond, turning challenges into opportunities and obstacles into triumphs.",
      css: "animate-delay-700",
    },
    {
      icon: Scale,
      title: "Integrity",
      content:
        "We believe in doing the right thing, even when no one's watching. Honesty, transparency, and integrity are the cornerstones of our business.",
      css: "animate-delay-700",
    },
  ];

  return (
    // Same treatment as "Why Businesses Choose Xvintec" on the home page.
    <div className="bg-[#EEF5FC] py-20 md:py-28 mb-20 md:mb-28" ref={sectionRef}>
      {/* The card icons are stroked with url(#brand-gradient); the home page
          mounts these defs itself, the about page doesn't. */}
      <GradientDefs />
      <div className="fl-container">
        <div className="text-center max-w-2xl m-auto mb-16">
          <H1Heading
            className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            Our Values
          </H1Heading>
          <p
            className={`text-p-grey font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            At Xvintec, our values aren&apos;t just words on a wall,
            they&apos;re the guiding principles that inform everything we do
          </p>
        </div>
        {/* Five cards: flex-wrap rather than a grid so the last row centres. */}
        <div className="flex flex-wrap justify-center gap-5 gap-y-8">
          {howWeKnowData.map((data, index) => (
            <ValuePropCard
              key={index}
              icon={data.icon}
              title={data.title}
              content={data.content}
              className={`md:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] ${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsOurValues;
