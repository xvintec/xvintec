"use client";

import React, { useRef } from "react";
import { PopupModal, PopupWidget } from "react-calendly";

import Button from "@/components/Common/Button/Button";
import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const ReadyToGetStarted = ({ rootElementRef }: any) => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  return (
    <div className="mx-5" ref={sectionRef}>
      <div
        className={`fl-container bg-[url('/header/ReadyToBannerMobile.png')] md:bg-[url('/header/ReadyToBanner.png')] bg-cover rounded-lg py-12 text-center mb-28 ${isVisible ? " animate-fade-up" : "opacity-0"}`}
        ref={rootElementRef}
      >
        <H1Heading className="text-white">Ready to get started?</H1Heading>
        <p className="text-white font-light max-w-xl m-auto pt-5 *:contents md:*:block px-[25px] md:px-[0px]">
          <span>You can connect with us via our online booking portal. </span>
          <span>
            Our representatives will be ready to assist you in scheduling your
            consultation.
          </span>
        </p>

        <PopupModal
          url="https://calendly.com/xvintec/30min?hide_gdpr_banner=1"
          rootElement={rootElementRef.current} // Pass the ref's current value as the rootElement
          onModalClose={() => setIsPopupOpen(false)}
          open={isPopupOpen}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-lg gap-0 md:gap-7 m-auto">
          <Button
            className="mt-7 text-black"
            bgColor="btn-secondary"
            onClick={() => {}}
          >
            Reach out to us
          </Button>

          <Button
            className="mt-7 text-black"
            bgColor="btn-secondary"
            onClick={() => setIsPopupOpen(true)}
          >
            Book a free consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReadyToGetStarted;
