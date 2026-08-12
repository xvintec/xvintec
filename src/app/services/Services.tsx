"use client";

import React, { useRef } from "react";

import Header from "@/components/Header/Header";
import OurDevelopmentApproach from "@/components/HomePage/OurServices/OurDevelopmentApproach";
import ReadyToGetStarted from "@/components/HomePage/ReadyToGetStarted/ReadyToGetStarted";
import Testimonials from "@/components/HomePage/Testimonials/Testimonials";
import TrustByOver from "@/components/HomePage/TrustedByOver/TrustByOver";
import OurServices from "@/components/ServicesPage/OurServices";

const Services = () => {
  const rootElementRef = useRef(null);

  return (
    <div id="rootElement" ref={rootElementRef}>
      <Header
        theme={`DARK`}
        contentMaxwidth={`max-w-2xl`}
        title={"We execute your ideas from start to finish"}
        subtitle={
          "Get your works perfectly from our service for a better time."
        }
        buttonText={"Book a free consultation"}
        rootElementRef={rootElementRef}
      />
      <OurServices />
      <OurDevelopmentApproach
        title1="Discovery Phase"
        title2="Assessment"
        title3="Prototype"
        content1="Conduct a thorough analysis and assessment of the client's needs, objectives, and challenges."
        content2="Evaluate the client's existing systems, processes, and performance assessments, and scalability evaluations as needed."
        content3="Develop a small-scale version or prototype of the proposed solution, and gather feedback from stakeholders and end-users to validate assumptions and refine the concept"
      />
      <Testimonials />

      <ReadyToGetStarted rootElementRef={rootElementRef} />
    </div>
  );
};

export default Services;
