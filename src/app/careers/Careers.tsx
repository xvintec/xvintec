"use client";

import React, { useRef } from "react";

import CareersBEnefits from "@/components/CareersPage/CareersBenefits";
import CareersCurrentOpenings from "@/components/CareersPage/CareersCurrentOpenings";
import CareersInterview from "@/components/CareersPage/CareersInterview";
import CareersWhyJoinUs from "@/components/CareersPage/CareersWhyJoinUs";
import Header from "@/components/Header/Header";
import ReadyToGetStarted from "@/components/HomePage/ReadyToGetStarted/ReadyToGetStarted";
import TrustByOver from "@/components/HomePage/TrustedByOver/TrustByOver";

const Careers = () => {
  const rootElementRef = useRef(null);

  return (
    <div id="rootElement" ref={rootElementRef}>
      <Header
        contentMaxwidth={`max-w-3xl`}
        title={
          "Join our team at Xvintec and be a part of something extraordinary!"
        }
        subtitle={
          "We're a dynamic and innovative company dedicated to pushing boundaries and achieving greatness. Explore our career opportunities and embark on a journey of growth, learning, and collaboration."
        }
        onClick={() => {}}
        rootElementRef={rootElementRef}
      />
      <CareersWhyJoinUs />
      <CareersBEnefits />
      <CareersInterview />
      <CareersCurrentOpenings />
    </div>
  );
};

export default Careers;
