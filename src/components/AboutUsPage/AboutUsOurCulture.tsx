"use client";

import React from "react";

import AboutSplitSection from "./AboutSplitSection";

const AboutUsOurCulture = () => {
  return (
    <AboutSplitSection
      title="Our Mission"
      images={[
        "/header/about-us-banner.png",
        "/images/group-of-people-working-out-business-plan-in-an-office-scaled.jpg",
        "/images/table-business-plan.png",
        "/images/bussiness-people-working-team-office.jpg",
      ]}
      imageAlt="Xvintec team planning together"
      reverse
      className="mb-20 md:mb-28"
    >
      <p>
        Our mission is simple yet bold: to empower businesses and individuals to
        thrive in the digital age. We believe that technology has the power to
        transform lives, disrupt industries, and shape the future. That&apos;s
        why we&apos;re committed to pushing boundaries, challenging the status
        quo, and delivering innovative solutions that drive real-world impact.
      </p>
    </AboutSplitSection>
  );
};

export default AboutUsOurCulture;
