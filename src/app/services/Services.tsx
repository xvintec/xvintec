"use client";

import React, { useRef } from "react";

import IndividualServiceHeader from "@/components/Header/IndividualServiceHeader";
import OurDevelopmentApproach from "@/components/HomePage/OurServices/OurDevelopmentApproach";
import ReadyToGetStarted from "@/components/HomePage/ReadyToGetStarted/ReadyToGetStarted";
import Testimonials2 from "@/components/HomePage2/Testimonials2/Testimonials2";
import TrustedByEnterprises from "@/components/HomePage2/TrustedByEnterprises/TrustedByEnterprises";
import OurServices from "@/components/ServicesPage/OurServices";

const Services = () => {
  const rootElementRef = useRef(null);

  return (
    <div id="rootElement" ref={rootElementRef}>
      <IndividualServiceHeader
        title="Services"
        subTitle="We execute your ideas from start to finish"
        description="Get your works perfectly from our service for a better time."
        // Placeholder artwork — swap for a services-specific image later.
        bannerImage="Consulting.png"
        rootElementRef={rootElementRef}
      />
      {/* Local top padding: the hero above has no bottom margin of its own. */}
      <div className="pt-20 md:pt-28">
        <TrustedByEnterprises />
      </div>
      <OurServices />
      <OurDevelopmentApproach
        title1="Discovery Phase"
        title2="Assessment"
        title3="Prototype"
        content1="Conduct a thorough analysis and assessment of the client's needs, objectives, and challenges."
        content2="Evaluate the client's existing systems, processes, and performance assessments, and scalability evaluations as needed."
        content3="Develop a small-scale version or prototype of the proposed solution, and gather feedback from stakeholders and end-users to validate assumptions and refine the concept"
      />
      <Testimonials2 />

      <ReadyToGetStarted rootElementRef={rootElementRef} />
    </div>
  );
};

export default Services;
