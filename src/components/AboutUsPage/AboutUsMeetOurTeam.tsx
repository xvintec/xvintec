"use client";

import React from "react";

import Button from "../Common/Button/Button";
import H1Heading from "../Common/Headings/H1Heading";
import useIntersectionAnimation from "../Common/UseScrollAnimation/UseScrollAnimation";

import AboutSplitSection from "./AboutSplitSection";

const AboutUsMeetOurTeam = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <>
      <AboutSplitSection
        title="Our Team"
        images={[
          "/header/about-us-banner.png",
          "/images/group-of-people-working-out-business-plan-in-an-office-scaled.jpg",
          "/images/table-business-plan.png",
          "/images/bussiness-people-working-team-office.jpg",
        ]}
        imageAlt="The Xvintec team"
        className="mb-20 md:mb-28"
      >
        <p>
          Behind every line of code, every design, and every project is a team of
          dedicated individuals who are passionate about making a difference.
          From developers and designers to marketers and project managers, our
          team brings together diverse talents and perspectives to create magic.
        </p>
      </AboutSplitSection>

      <div className="fl-container mb-20 md:mb-28 text-center" ref={sectionRef}>
        <H1Heading
          className={`mb-0 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          Join our team
        </H1Heading>

        <p
          className={`py-5 text-p-grey font-light max-w-5xl text-center m-auto ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          Ready to be a part of something bigger than yourself? Join us on our
          journey to transform the world. Whether you&apos;re a seasoned pro or a
          fresh-faced rookie, there&apos;s a place for you at Xvintec. Together,
          let&apos;s make history.
        </p>

        <div className={isVisible ? "animate-fade animate-delay-500" : "opacity-0"}>
          <Button className="mt-3">View all openings</Button>
        </div>
      </div>
    </>
  );
};

export default AboutUsMeetOurTeam;
