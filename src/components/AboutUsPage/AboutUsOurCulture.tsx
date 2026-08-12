"use client";

import React from "react";

import Image from "next/image";

import H1Heading from "../Common/Headings/H1Heading";
import useIntersectionAnimation from "../Common/UseScrollAnimation/UseScrollAnimation";

const AboutUsOurCulture = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className={`fl-container mt-10 mb-16 md:mb-14`} ref={sectionRef}>
      <p
        className={`py-5 text-p-grey font-light max-w-5xl text-center m-auto ${isVisible ? " animate-fade-up animate-delay-300" : "opacity-0"}`}
      >
        Our culture is built on collaboration, respect, and a shared passion for
        excellence. From team-building activities to volunteer opportunities,
        we&apos;re committed to creating a supportive and inclusive environment
        where everyone can thrive
      </p>

      <hr
        className={`h-[1.5px] border-none  rounded mt-6 mb-14 ${isVisible ? " animate-fade-up" : "opacity-0"}`}
        style={{
          height: "1px",
          backgroundImage:
            "linear-gradient(to right, #ccccce 50%, transparent 50%)",
          backgroundSize: "30px 100%",
          border: "none",
        }}
      />

      <H1Heading
        className={`text-center mb-0 ${isVisible ? " animate-fade-up" : "opacity-0"}`}
      >
        Our Mission
      </H1Heading>

      <p
        className={`py-5 text-p-grey font-light max-w-5xl text-center m-auto ${isVisible ? " animate-fade-up animate-delay-300" : "opacity-0"}`}
      >
        Our mission is simple yet bold: to empower businesses and individuals to
        thrive in the digital age. We believe that technology has the power to
        transform lives, disrupt industries, and shape the future. That&apos;s
        why we&apos;re committed to pushing boundaries, challenging the status
        quo, and delivering innovative solutions that drive real-world impact.
      </p>

      <div
        className={`flex mt-10 md:grid grid-cols-1 gap-2 ${isVisible ? " animate-fade-up animate-delay-500" : "opacity-0"}`}
      >
        <div className="mx-3 md:m-0">
          <Image
            className="rounded-lg h-[300px] md:h-[350px]"
            src="/images/group-of-people-working-out-business-plan-in-an-office-scaled.jpg"
            width={2000}
            height={500}
            alt="why-choose-us"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsOurCulture;
