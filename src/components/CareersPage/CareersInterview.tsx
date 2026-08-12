import React from "react";

import Image from "next/image";

import H1Heading from "../Common/Headings/H1Heading";
import H2Heading from "../Common/Headings/H2Heading";
import useIntersectionAnimation from "../Common/UseScrollAnimation/UseScrollAnimation";

const CareersInterview = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  const interviewProcess = [
    {
      title: "Screening",
      content:
        "We start by reviewing each candidate's application to gauge their qualifications, experience, and fit for the role.",
      image: "/svgs/chart.svg",
    },
    {
      title: "Assignment",
      content:
        "Shortlisted candidates will be given relevant assignments or tasks to complete.",
      image: "/svgs/chart.svg",
    },
    {
      title: "Interview",
      content:
        "Candidates who excel in the assignment stage will be invited for interviews.",
      image: "/svgs/chart.svg",
    },
    {
      title: "Offer",
      content:
        "After thorough assessment and consideration, successful candidates will be extended a job offer.",
      image: "/svgs/directbox-receive.svg",
    },
  ];

  return (
    <div
      ref={sectionRef}
      // style={{
      //   background:
      //     "radial-gradient(at center top, rgb(0 74 130) 1%, rgb(1, 54, 95) 18%, rgb(1, 38, 66) 30%, rgb(0, 31, 55) 100%)",
      // }}
      className={`bg-[url('/images/Black-mobile.png')] md:bg-[url('/images/Black-desktop.png')] md:bg-center bg-cover bg-no-repeat ${isVisible ? `animate-fade` : "opacity-0"}`}
    >
      <div className={`fl-container mb-20 md:mb-28 pt-16 pb-20`}>
        <H1Heading
          className={`text-center mb-0 text-white ${isVisible ? " animate-fade-up" : "opacity-0"}`}
        >
          Interview process
        </H1Heading>

        <p
          className={`py-5 text-gray-400 font-light max-w-xl text-center m-auto ${isVisible ? " animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam
        </p>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 px-3 md:px-0 gap-y-8 m-auto justify-items-center mt-8`}
        >
          {interviewProcess.map((data, index) => (
            <div key={index} className={`max-w-md `}>
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

        {/* <hr className={`h-[1.5px] border-none bg-[#5a5a5a] rounded my-14 ${isVisible ? " animate-fade-up" : "opacity-0"}`} /> */}
        {/* <hr
          className={`h-[1.5px] border-none rounded mt-14 mb-4 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{
            backgroundImage: `linear-gradient(to right, #0325e1 0%, #0daae9 18%, #5a5a5a 10%)`,
            backgroundRepeat: "no-repeat",
          }}
        /> */}
      </div>
    </div>
  );
};

export default CareersInterview;
