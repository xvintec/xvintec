import React from "react";

import Image from "next/image";

import Button from "../Common/Button/Button";
import H1Heading from "../Common/Headings/H1Heading";
import useIntersectionAnimation from "../Common/UseScrollAnimation/UseScrollAnimation";

const AboutUsMeetOurTeam = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  const teamMembers = [
    {
      name: "John Doe",
      position: "CEO",
      image: "/images/user.png",
      css: "animate-fade-up animate-delay-300",
    },
    {
      name: "John Doe",
      position: "CEO",
      image: "/images/user.png",
      css: "animate-fade-up animate-delay-300",
    },
    {
      name: "John Doe",
      position: "CEO",
      image: "/images/user.png",
      css: "animate-fade-up animate-delay-300",
    },
    {
      name: "John Doe",
      position: "CEO",
      image: "/images/user.png",
      css: "animate-fade-up animate-delay-300",
    },
  ];

  return (
    <div className={`fl-container mb-20 md:mb-28`} ref={sectionRef}>
      <H1Heading
        className={`text-center mb-0 ${isVisible ? " animate-fade-up" : "opacity-0"}`}
      >
        Our Team
      </H1Heading>

      <p
        className={`py-5 text-p-grey font-light max-w-5xl text-center m-auto ${isVisible ? " animate-fade-up animate-delay-300" : "opacity-0"}`}
      >
        Behind every line of code, every design, and every project is a team of
        dedicated individuals who are passionate about making a difference. From
        developers and designers to marketers and project managers, our team
        brings together diverse talents and perspectives to create magic.
      </p>

      <div
        className={`flex mt-10 md:grid grid-cols-1 gap-2 mb-16 ${isVisible ? " animate-fade-up animate-delay-500" : "opacity-0"}`}
      >
        <div className="mx-3 md:m-0">
          <Image
            className="rounded-lg h-[300px] md:h-[350px]"
            src="/images/group-of-people-working-out-business-plan-in-an-office-scaled.jpg"
            width={2000}
            height={500}
            alt="why-choose-us"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <H1Heading
        className={`text-center mb-0 ${isVisible ? " animate-fade-up animate-delay-700" : "opacity-0"}`}
      >
        Join our team
      </H1Heading>

      <p
        className={`py-5 text-p-grey font-light max-w-5xl text-center m-auto ${isVisible ? " animate-fade-up animate-delay-1000" : "opacity-0"}`}
      >
        Ready to be a part of something bigger than yourself? Join us on our
        journey to transform the world. Whether you&apos;re a seasoned pro or a
        fresh-faced rookie, there&apos;s a place for you at Xvintec. Together,
        let&apos;s make history.
      </p>
      <div
        className={`text-p-black text-lg font-semibold underline text-center mt-5 ${isVisible ? " animate-fade-up animate-delay-[1100ms]" : "opacity-0"}`}
      >
        <Button className="mt-3 animate-fade animate-delay-700">
          View all openings
        </Button>
      </div>
    </div>
  );
};

export default AboutUsMeetOurTeam;
