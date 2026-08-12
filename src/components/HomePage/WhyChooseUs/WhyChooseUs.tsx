"use client";

import React from "react";

import Image from "next/image";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const WhyChooseUs = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  return (
    <div className="fl-container mb-28" ref={sectionRef}>
      <div
        className={`flex md:grid grid-cols-1 md:grid-cols-2 flex-col-reverse gap-2 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      >
        <div className="mx-3 md:m-0">
          <Image
            className="rounded-lg h-[300px] md:h-[350px]"
            src="/images/bussiness-people-working-team-office.jpg"
            width={1000}
            height={500}
            alt="why-choose-us"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="max-w-[392px] ml-0 md:ml-10 lg:ml-28 mb-5 md:mb-0 self-center text-center md:text-left">
          <p className="text-lg tracking-widest font-semibold uppercase ">
            <span className="bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] bg-clip-text text-transparent opacity-70">
              Why Choose us
            </span>
          </p>
          <H1Heading className="my-3 md:my-5">Welcome to Xvintec</H1Heading>
          <p className="text-p-grey font-light">
            Where innovation meets expertise to transform businesses for the
            digital age! We&apos;re not just tech enthusiasts; we&apos;re your
            partners in progress, dedicated to revolutionizing the way you do
            business. With a team fueled by passion and driven by results, we
            specialize in crafting bespoke IT solutions that propel your
            success.
          </p>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-center mt-10 md:mt-20 ${isVisible ? "animate-fade-up delay-300" : "opacity-0"} `}
      >
        <div className="max-w-[392px] ml-0 md:ml-10 lg:ml-0 mb-5 md:mb-0 self-center text-center md:text-left ">
          <p className="text-lg tracking-widest font-semibold uppercase ">
            <span className="bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] bg-clip-text text-transparent opacity-70">
              Why Choose us
            </span>
          </p>
          <H1Heading className="my-5 leading-snug">
            Full potential of your business
          </H1Heading>
          <p className="text-p-grey font-light">
            From fortifying your cybersecurity defenses to catapulting your
            online presence, we&apos;re here to turn your challenges into
            triumphs. Let&apos;s embark on a journey of digital transformation
            together and unlock the full potential of your business!
          </p>
        </div>
        <div className="mx-3 md:m-0">
          <Image
            className="rounded-lg h-[300px] md:h-[350px]"
            src="/images/group-of-people-working-out-business-plan-in-an-office-scaled.jpg"
            width={1000}
            height={500}
            alt="why-choose-us"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
