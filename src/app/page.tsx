"use client";

import { useRef } from "react";

import Image from "next/image";

import Header from "@/components/Header/Header";
import HowWeKnow from "@/components/HomePage/HowWeWork/HowWeWork";
import OurServices from "@/components/HomePage/OurServices/OurServices";
import ReadyToGetStarted from "@/components/HomePage/ReadyToGetStarted/ReadyToGetStarted";
import Testimonials from "@/components/HomePage/Testimonials/Testimonials";
import TrustByOver from "@/components/HomePage/TrustedByOver/TrustByOver";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs/WhyChooseUs";

export default function Home() {
  const rootElementRef = useRef(null);

  return (
    <div id="rootElement" ref={rootElementRef}>
      <Header
        title={
          "Unleash the power of skilled technicians without breaking the bank"
        }
        subtitle={
          "Discover affordable managed IT Services tailored to your needs"
        }
        buttonText={"Book a free consultation"}
        rootElementRef={rootElementRef}
      />
      <HowWeKnow />
      <WhyChooseUs />
      <OurServices />
      <Testimonials />
      <ReadyToGetStarted rootElementRef={rootElementRef} />
    </div>
  );
}
