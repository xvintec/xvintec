"use client";

import React from "react";

import Image from "next/image";

import H1Heading from "@/components/Common/Headings/H1Heading";
import H2Heading from "@/components/Common/Headings/H2Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

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
    <div className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <H1Heading
        className={`text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      >
        Our Values
      </H1Heading>
      <p
        className={`py-5 text-p-grey font-light mb-10 max-w-5xl text-center m-auto ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
      >
        At Xvintec, our values aren&apos;t just words on a wall, they&apos;re
        the guiding principles that inform everything we do
      </p>

      <div className="flex flex-wrap justify-center gap-6 md:gap-8 px-3 md:px-0">
        {howWeKnowData.map((data, index) => (
          <div
            key={index}
            /* Matches the featured "200% Money-Back" card on the home page. */
            className={`relative w-full max-w-sm rounded-2xl py-9 px-7 md:px-8 text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 ${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
            style={{ background: "var(--hero-gradient)" }}
          >
            {/* Icons are light grey on a brand gradient, so they are rendered
                white here to read on the dark card. */}
            <Image
              src={data.image}
              alt=""
              width={40}
              height={40}
              className="brightness-0 invert"
              style={{ objectFit: "contain" }}
            />
            <H2Heading className="mt-4 text-white">{data.title}</H2Heading>
            <p className="mt-3 font-normal text-white/80">{data.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsOurValues;
