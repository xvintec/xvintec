"use client";

import { useRef } from "react";

import AssessmentCTA from "@/components/HomePage2/AssessmentCTA/AssessmentCTA";
import CaseStudies from "@/components/HomePage2/CaseStudies/CaseStudies";
import ContactInfo from "@/components/HomePage2/ContactInfo/ContactInfo";
import CoreFunctions from "@/components/HomePage2/CoreFunctions/CoreFunctions";
import GradientDefs from "@/components/HomePage2/GradientDefs/GradientDefs";
// import IndustriesServed from "@/components/HomePage2/IndustriesServed/IndustriesServed";
import IndustriesServedGrid from "@/components/HomePage2/IndustriesServed/IndustriesServedGrid";
import ProcessTimeline from "@/components/HomePage2/ProcessTimeline/ProcessTimeline";
// import ResourcesTeaser from "@/components/HomePage2/ResourcesTeaser/ResourcesTeaser";
import RiskFreeGuarantee from "@/components/HomePage2/RiskFreeGuarantee/RiskFreeGuarantee";
import ServiceGrid from "@/components/HomePage2/ServiceGrid/ServiceGrid";
import StatsCounter from "@/components/HomePage2/StatsCounter/StatsCounter";
import TestimonialsSlider from "@/components/HomePage2/TestimonialsSlider/TestimonialsSlider";
import TrustedByEnterprises from "@/components/HomePage2/TrustedByEnterprises/TrustedByEnterprises";
import ValueProps from "@/components/HomePage2/ValueProps/ValueProps";
import WebGLBanner from "@/components/HomePage2/WebGLBanner/WebGLBanner";
import ReadyToGetStarted from "@/components/HomePage/ReadyToGetStarted/ReadyToGetStarted";

export default function Home() {
  const rootElementRef = useRef(null);

  return (
    <div id="rootElement" ref={rootElementRef}>
      <GradientDefs />
      <WebGLBanner rootElementRef={rootElementRef} />
      <StatsCounter />
      <ValueProps />
      <ServiceGrid />
      <CoreFunctions />
      <ProcessTimeline />
      <RiskFreeGuarantee />
      <TestimonialsSlider />
      <CaseStudies />
      {/* <ResourcesTeaser /> */}
      <TrustedByEnterprises />
      {/* <IndustriesServed /> */}
      <IndustriesServedGrid />
      <AssessmentCTA rootElementRef={rootElementRef} />
      <ContactInfo />
      <ReadyToGetStarted rootElementRef={rootElementRef} />
    </div>
  );
}
