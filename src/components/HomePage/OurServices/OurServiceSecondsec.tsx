import React from "react";

import Image from "next/image";

import Button from "@/components/Common/Button/Button";
import H1Heading from "@/components/Common/Headings/H1Heading";
import H2Heading from "@/components/Common/Headings/H2Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const OurServiceSecondsec = ({ title, contentTwo, contentImage }: any) => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div
      className={`fl-container py-10 md:py-0 ${isVisible ? `animate-fade-up` : "opacity-0"}`}
      ref={sectionRef}
    >
      <div
        className={`flex md:grid flex-col-reverse grid-cols-1 md:grid-cols-10 lg:grid-cols-10 gap-5 px-3 md:px-0 md:pb-20 gap-y-8 m-auto justify-items-center`}
      >
        <div className="w-full max-w-md md:max-w-lg md:col-span-4">
          <Image
            className="rounded-lg object-contain w-full h-full"
            src={contentImage}
            width={500}
            height={500}
            alt="why-choose-us"
          />
        </div>
        <div className="py-3 md:col-span-6 ml-0 md:ml-10 lg:ml-20 text-center md:text-left content-center">
          <H2Heading className="my-3 md:my-5">{title}</H2Heading>
          <p className="text-p-grey font-light">{contentTwo}</p>
          {/* <Button className="mt-10 animate-fade animate-delay-700">
            Get a quote
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default OurServiceSecondsec;
