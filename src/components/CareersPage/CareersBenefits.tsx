import React from "react";

import H1Heading from "../Common/Headings/H1Heading";
import useIntersectionAnimation from "../Common/UseScrollAnimation/UseScrollAnimation";

const CareersBenefits = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className={`fl-container mb-20 md:mb-28`} ref={sectionRef}>
      <H1Heading
        className={`text-center mb-0 ${isVisible ? " animate-fade-up" : "opacity-0"}`}
      >
        Benefits
      </H1Heading>

      <p
        className={`py-5 text-p-grey font-light max-w-5xl text-center m-auto ${isVisible ? " animate-fade-up animate-delay-300" : "opacity-0"}`}
      >
        We&apos;re committed to the well-being and success of our team members.
        As a member of the Xvintec family, you&apos;ll enjoy competitive
        salaries, comprehensive benefits packages, flexible work arrangements,
        professional development opportunities, and a vibrant company culture
        that celebrates diversity and innovation
      </p>
    </div>
  );
};

export default CareersBenefits;
