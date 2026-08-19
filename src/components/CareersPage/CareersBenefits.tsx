"use client";

import React from "react";

import AboutSplitSection from "../AboutUsPage/AboutSplitSection";

const CareersBenefits = () => {
  return (
    <AboutSplitSection
      title="Benefits"
      images={[
        "/images/bussiness-people-working-team-office.jpg",
        "/header/about-us-banner.png",
        "/images/group-of-people-working-out-business-plan-in-an-office-scaled.jpg",
        "/images/table-business-plan.png",
      ]}
      imageAlt="Working at Xvintec"
      reverse
      className="mb-20 md:mb-28"
    >
      <p>
        We&apos;re committed to the well-being and success of our team members.
        As a member of the Xvintec family, you&apos;ll enjoy competitive
        salaries, comprehensive benefits packages, flexible work arrangements,
        professional development opportunities, and a vibrant company culture
        that celebrates diversity and innovation
      </p>
    </AboutSplitSection>
  );
};

export default CareersBenefits;
