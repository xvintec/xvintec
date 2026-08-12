import React from "react";

import Image from "next/image";

import H1Heading from "@/components/Common/Headings/H1Heading";
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

  const devApproach = [
    {
      title: title1,
      content: content1,
      image: "/svgs/chart.svg",
      css: "animate-delay-300",
    },
    {
      title: title2,
      content: content2,
      image: "/svgs/triangle.svg",
      css: "animate-delay-500",
    },
    {
      title: title3,
      content: content3,
      image: "/svgs/flash.svg",
      css: "animate-delay-700",
    },
  ];

  return (
    <div
      ref={sectionRef}
      style={
        {
          // background: "radial-gradient(at center top, rgb(0 74 130) 1%, rgb(1, 54, 95) 18%, rgb(1, 38, 66) 30%, rgb(0, 31, 55) 100%)"
          // background: "url('/images/Black-desktop.png')"
        }
      }
      className={`bg-[url('/images/Black-mobile.png')] md:bg-[url('/images/Black-desktop.png')] md:bg-center bg-cover bg-no-repeat ${isVisible ? `animate-fade` : "opacity-0"}`}
    >
      <div className={`fl-container mb-20 md:mb-28 py-16`}>
        <H1Heading
          className={`text-center mb-0 text-white ${isVisible ? " animate-fade-up" : "opacity-0"}`}
        >
          Our development approach
        </H1Heading>

        <p
          className={`py-5 text-gray-400 font-light max-w-xl text-center m-auto ${isVisible ? " animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          We tailor our services to meet your specific needs and exceed your
          expectations at every turn.
        </p>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-3 md:px-0 gap-y-8 m-auto justify-items-center mt-8`}
        >
          {devApproach.map((data, index) => (
            <div
              key={index}
              className={`max-w-md ${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
            >
              <Image
                src={data.image}
                alt={data.title}
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
              <div className="py-5 text-white text-lg font-medium">
                {data.title}
              </div>
              <p className="text-gray-400 font-light">{data.content}</p>
            </div>
          ))}
        </div>

        {/* <hr
          className={`h-[1.5px] border-none rounded mt-14 mb-4 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{
            backgroundImage: `linear-gradient(to right, #0325e1 0%, #0daae9 29%, #5a5a5a 10%)`,
            backgroundRepeat: "no-repeat",
          }}
        /> */}
      </div>
    </div>
  );
};

export default OurDevelopmentApproach;
