"use client";

import React from "react";

import AboutSplitSection from "./AboutSplitSection";

const AboutUsImageBanner = () => {
  return (
    <AboutSplitSection
      title="Our Story"
      images={[
        "/header/about-us-banner.png",
        "/images/group-of-people-working-out-business-plan-in-an-office-scaled.jpg",
        "/images/table-business-plan.png",
        "/images/bussiness-people-working-team-office.jpg",
      ]}
      imageAlt="The Xvintec team at work"
      className="mb-20 md:mb-28"
    >
      <p>
        Our culture is built on collaboration, respect, and a shared passion for
        excellence. From team-building activities to volunteer opportunities,
        we&apos;re committed to creating a supportive and inclusive environment
        where everyone can thrive
      </p>
    </AboutSplitSection>
  );
};

export default AboutUsImageBanner;
