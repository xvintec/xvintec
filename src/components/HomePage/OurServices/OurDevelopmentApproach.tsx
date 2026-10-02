import React from "react";

import Image from "next/image";

import H1Heading from "@/components/Common/Headings/H1Heading";
import H2Heading from "@/components/Common/Headings/H2Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const OurDevelopmentApproach = ({
  title1,
  title2,
  title3,
  content1,
  content2,
  content3,
}: any) => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  // The pinned column needs its own observer: it must reveal even when the
  // reader lands partway down the section and never sees the heading.
  const [panelRef, isPanelVisible] = useIntersectionAnimation();

  const devApproach = [
    {
      step: "01",
      title: title1,
      content: content1,
      image: "/svgs/chart.svg",
      css: "animate-delay-300",
    },
    {
      step: "02",
      title: title2,
      content: content2,
      image: "/svgs/triangle.svg",
      css: "animate-delay-500",
    },
    {
      step: "03",
      title: title3,
      content: content3,
      image: "/svgs/flash.svg",
      css: "animate-delay-700",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="mb-20 md:mb-28 bg-[url('/images/Black-mobile.png')] md:bg-[url('/images/Black-desktop.png')] md:bg-center bg-cover bg-no-repeat"
    >
      <div className="fl-container py-16 md:py-24" ref={panelRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Pinned copy stands in for the image the home section has. */}
          <div className="lg:sticky lg:top-28">
            <H1Heading
              className={`text-white ${isPanelVisible ? "animate-fade-up" : "opacity-0"}`}
            >
              Our development approach
            </H1Heading>
            <p
              className={`mt-5 max-w-md text-gray-400 font-light ${isPanelVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
            >
              We tailor our services to meet your specific needs and exceed your
              expectations at every turn.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {devApproach.map((data, index) => (
              <div
                key={index}
                className={`rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] ${isPanelVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <Image
                    src={data.image}
                    alt=""
                    width={40}
                    height={40}
                    style={{ objectFit: "contain" }}
                  />
                  <span className="text-sm font-semibold tracking-wide text-white/30">
                    {data.step}
                  </span>
                </div>
                <H2Heading className="mt-5 text-white">{data.title}</H2Heading>
                <p className="mt-3 text-gray-400 font-light">{data.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurDevelopmentApproach;
