"use client";

import React, { useRef } from "react";

import AboutUsImageBanner from "@/components/AboutUsPage/AboutUsImageBanner";
import AboutUsMeetOurTeam from "@/components/AboutUsPage/AboutUsMeetOurTeam";
import AboutUsOurCulture from "@/components/AboutUsPage/AboutUsOurCulture";
import AboutUsOurValues from "@/components/AboutUsPage/AboutUsOurValues";
import Header from "@/components/Header/Header";
import ReadyToGetStarted from "@/components/HomePage/ReadyToGetStarted/ReadyToGetStarted";
import TrustByOver from "@/components/HomePage/TrustedByOver/TrustByOver";

const AboutUs = () => {
  const rootElementRef = useRef(null);

  return (
    <div id="rootElement" ref={rootElementRef}>
      <Header
        // roundedImage={true}
        contentMaxwidth={`max-w-4xl`}
        title={"Welcome to Xvintec"}
        subtitle={
          "At Xvintec, we're not just a company we're a movement. We're a team of dreamers, innovators, and trailblazers on a mission to change the world one line of code, one pixel, one idea at a time"
        }
        buttonText={"Book a free consultation"}
        className="pb-36"
        rootElementRef={rootElementRef}
      />
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
