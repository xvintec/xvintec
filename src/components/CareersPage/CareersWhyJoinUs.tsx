"use client";

import React from "react";

import AboutSplitSection from "../AboutUsPage/AboutSplitSection";

const CareersWhyJoinUs = () => {
  return (
    <AboutSplitSection
      title="Why Join Us"
      images={[
        "/images/group-of-people-working-out-business-plan-in-an-office-scaled.jpg",
        "/images/table-business-plan.png",
        "/images/bussiness-people-working-team-office.jpg",
        "/header/about-us-banner.png",
      ]}
      imageAlt="Life at Xvintec"
      className="mb-20 md:mb-28"
    >
      <p>
        At Xvintec, we believe in fostering a culture of creativity, excellence,
        and inclusivity. Joining our team means being part of a supportive
        community where your ideas are valued, your talents are nurtured, and
        your potential is limitless. Discover why Xvintec is the perfect place to
        take your career to new heights.
      </p>
    </AboutSplitSection>
  );
};

export default CareersWhyJoinUs;
