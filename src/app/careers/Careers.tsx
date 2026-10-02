"use client";

import React, { useRef } from "react";

import CareersBEnefits from "@/components/CareersPage/CareersBenefits";
import CareersCurrentOpenings from "@/components/CareersPage/CareersCurrentOpenings";
import CareersInterview from "@/components/CareersPage/CareersInterview";
import CareersWhyJoinUs from "@/components/CareersPage/CareersWhyJoinUs";
import IndividualServiceHeader from "@/components/Header/IndividualServiceHeader";
import TrustedByEnterprises from "@/components/HomePage2/TrustedByEnterprises/TrustedByEnterprises";

const Careers = () => {
  const rootElementRef = useRef(null);

  return (
    <div id="rootElement" ref={rootElementRef}>
      <IndividualServiceHeader
        title="Careers"
        subTitle="Join our team at Xvintec and be a part of something extraordinary!"
        description="We're a dynamic and innovative company dedicated to pushing boundaries and achieving greatness. Explore our career opportunities and embark on a journey of growth, learning, and collaboration."
        // Placeholder artwork — swap for a careers-specific image later.
        bannerImage="Website-development.png"
        rootElementRef={rootElementRef}
      />
      {/* Local top padding: the hero above has no bottom margin of its own. */}
      <div className="pt-20 md:pt-28">
        <TrustedByEnterprises />
      </div>
      <CareersWhyJoinUs />
      <CareersBEnefits />
      <CareersInterview />
      <CareersCurrentOpenings />
    </div>
  );
};

export default Careers;
