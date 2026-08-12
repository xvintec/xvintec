import React from "react";

import Image from "next/image";

import H1Heading from "../Common/Headings/H1Heading";
import useIntersectionAnimation from "../Common/UseScrollAnimation/UseScrollAnimation";

const CareersWhyJoinUs = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className={`fl-container mb-14 md:mb-14`} ref={sectionRef}>
      <H1Heading
        className={`text-center mb-0 ${isVisible ? " animate-fade-up" : "opacity-0"}`}
      >
        Why Join Us
      </H1Heading>

      <p
        className={`py-5 text-p-grey font-light max-w-5xl text-center m-auto ${isVisible ? " animate-fade-up animate-delay-300" : "opacity-0"}`}
      >
        At Xvintec, we believe in fostering a culture of creativity, excellence,
        and inclusivity. Joining our team means being part of a supportive
        community where your ideas are valued, your talents are nurtured, and
        your potential is limitless. Discover why Xvintec is the perfect place
        to take your career to new heights.
      </p>

      <div
        className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 px-3 md:px-0 gap-y-8 m-auto justify-items-center mt-4 ${isVisible ? " animate-fade-up animate-delay-500" : "opacity-0"}`}
      >
        <div className="mx-3 md:m-0">
          <Image
            className="rounded-lg h-[300px] md:h-[350px]"
            src="/images/group-of-people-working-out-business-plan-in-an-office-scaled.jpg"
            width={1000}
            height={500}
            alt="why-choose-us"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="mx-3 md:m-0 hidden md:block">
          <Image
            className="rounded-lg h-[300px] md:h-[350px]"
            src="/images/table-business-plan.png"
            width={1000}
            height={500}
            alt="why-choose-us"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CareersWhyJoinUs;
