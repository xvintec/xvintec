"use client";

import React, { useRef } from "react";

import AboutUsImageBanner from "@/components/AboutUsPage/AboutUsImageBanner";
import AboutUsMeetOurTeam from "@/components/AboutUsPage/AboutUsMeetOurTeam";
import AboutUsOurCulture from "@/components/AboutUsPage/AboutUsOurCulture";
import AboutUsOurValues from "@/components/AboutUsPage/AboutUsOurValues";
import IndividualServiceHeader from "@/components/Header/IndividualServiceHeader";
import ReadyToGetStarted from "@/components/HomePage/ReadyToGetStarted/ReadyToGetStarted";
import TrustedByEnterprises from "@/components/HomePage2/TrustedByEnterprises/TrustedByEnterprises";

const AboutUs = () => {
  const rootElementRef = useRef(null);

  return (
    <div id="rootElement" ref={rootElementRef}>
      <IndividualServiceHeader
        title="About Us"
        subTitle="Welcome to Xvintec"
        description="At Xvintec, we're not just a company we're a movement. We're a team of dreamers, innovators, and trailblazers on a mission to change the world one line of code, one pixel, one idea at a time"
        // Placeholder artwork — swap for an about-specific image later.
        bannerImage="Support.png"
        rootElementRef={rootElementRef}
      />
      {/* Local top padding: the hero above has no bottom margin of its own. */}
      <div className="pt-20 md:pt-28">
        <TrustedByEnterprises />
      </div>
      <AboutUsImageBanner />
      <AboutUsOurCulture />
      {/* <AboutUsNumber /> */}
      <AboutUsOurValues />
      <AboutUsMeetOurTeam />
      <ReadyToGetStarted rootElementRef={rootElementRef} />
    </div>
  );
};

export default AboutUs;
