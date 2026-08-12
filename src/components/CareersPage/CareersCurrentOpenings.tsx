import React from "react";

import Button from "../Common/Button/Button";
import H1Heading from "../Common/Headings/H1Heading";
import useIntersectionAnimation from "../Common/UseScrollAnimation/UseScrollAnimation";

const CareersCurrentOpenings = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className={`fl-container mb-20 md:mb-28 text-center`} ref={sectionRef}>
      <H1Heading
        className={`text-center mb-0 ${isVisible ? " animate-fade-up" : "opacity-0"}`}
      >
        Current openings
      </H1Heading>

      <p
        className={`py-5 text-p-grey font-light max-w-5xl text-center m-auto ${isVisible ? " animate-fade-up animate-delay-300" : "opacity-0"}`}
      >
        Ready to make your mark? Explore our current job openings and find the
        perfect opportunity to unleash your potential. Whether you&apos;re a
        seasoned professional or just starting your career, we have exciting
        roles across various departments waiting for you to make an impact.
      </p>
      <Button className="mt-3 animate-fade animate-delay-700">
        View all openings
      </Button>

      <hr
        className={`h-[1.5px] border-none  rounded my-14 ${isVisible ? " animate-fade-up" : "opacity-0"}`}
        style={{
          height: "1px",
          backgroundImage:
            "linear-gradient(to right, #ccccce 50%, transparent 50%)",
          backgroundSize: "30px 100%",
          border: "none",
        }}
      />
    </div>
  );
};

export default CareersCurrentOpenings;
