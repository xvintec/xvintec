"use client";

import React from "react";

import Image from "next/image";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const trustedPartners = [
  { name: "Samsung", image: "/partners/Samsung-white.png" },
  { name: "OpenZeppelin", image: "/partners/Open-white.png" },
  { name: "ClickUp", image: "/partners/Clickup-white.png" },
  { name: "GitHub", image: "/partners/Github-white.png" },
  { name: "Segment", image: "/partners/Segment-white.png" },
];

const TrustedByEnterprises = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <div className="text-center max-w-2xl m-auto mb-12">
        <H1Heading
          className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          Trusted by enterprises. Verified by industry leaders. Audited for
          excellence.
        </H1Heading>
      </div>

      <div
        className={`rounded-3xl py-10 md:py-12 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
        style={{ background: "var(--hero-gradient)" }}
      >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop
          freeMode
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={4000}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 60 },
          }}
        >
          {trustedPartners.map((partner, index) => (
            <SwiperSlide key={index}>
              <Image
                src={partner.image}
                alt={partner.name}
                width={140}
                height={44}
                className="m-auto opacity-90 transition-opacity duration-300 ease-in-out hover:opacity-100 cursor-pointer"
                style={{ objectFit: "contain" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TrustedByEnterprises;
