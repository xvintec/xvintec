import React from "react";

import Image from "next/image";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const OurServiceSecondsec = ({ title, contentTwo, contentImage }: any) => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div
      className="relative overflow-hidden bg-navy py-16 md:py-24"
      ref={sectionRef}
    >
      {/* Artwork bleeds past the right edge and dissolves into the navy, the way
          Highspring's "what if" band carries its device shot. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] md:block">
        <Image
          src={contentImage}
          alt=""
          fill
          sizes="58vw"
          className="scale-110 object-contain object-right"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(265.64deg, rgba(10,27,61,0) 30%, #0A1B3D 72%)",
          }}
        />
      </div>

      <div className="fl-container relative">
        <div className="max-w-xl lg:max-w-[46%]">
          <H1Heading
            className={`text-white ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            {title}
          </H1Heading>
          <p
            className={`mt-5 text-gray-400 font-light ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            {contentTwo}
          </p>
        </div>

        {/* Phones stack the artwork under the copy instead of bleeding it. */}
        <div
          className={`relative mt-10 h-64 w-full md:hidden ${isVisible ? "animate-fade animate-delay-500" : "opacity-0"}`}
        >
          <Image
            src={contentImage}
            alt=""
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default OurServiceSecondsec;
