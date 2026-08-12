"use client";

import React from "react";
import { PopupModal } from "react-calendly";

import Button from "@/components/Common/Button/Button";
import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const AssessmentCTA = ({ rootElementRef }: any) => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  return (
    <div
      className={`fl-container text-center mb-20 md:mb-28 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      ref={sectionRef}
    >
      <PopupModal
        url="https://calendly.com/xvintec/30min?hide_gdpr_banner=1"
        rootElement={rootElementRef?.current}
        onModalClose={() => setIsPopupOpen(false)}
        open={isPopupOpen}
      />

      <p className="text-lg tracking-widest font-semibold uppercase">
        <span className="bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] bg-clip-text text-transparent">
          Let&apos;s Talk
        </span>
      </p>
      <H1Heading className="my-3">See Where Your IT Stands</H1Heading>
      <p className="text-p-grey font-light max-w-xl m-auto">
        Schedule a free IT risk assessment. We&apos;ll audit your
        infrastructure, identify security gaps, and show you exactly what you
        need to scale safely and securely.
      </p>
      <Button className="mt-7" onClick={() => setIsPopupOpen(true)}>
        Start Your Free Assessment
      </Button>
    </div>
  );
};

export default AssessmentCTA;
