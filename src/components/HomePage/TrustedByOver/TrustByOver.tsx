"use client";

import React from "react";

import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { TrustedByOverProps } from "@/types/CommonTypes";

const TrustByOver = ({ theme }: TrustedByOverProps) => {
  const startups = [
    {
      name: "s=Samsung",
      image:
        theme === "DARK"
          ? "/partners/Samsung.png"
          : "/partners/Samsung-white.png",
    },
    {
      name: "Open Zeppelin",
      image:
        theme === "DARK" ? "/partners/Open.png" : "/partners/Open-white.png",
    },
    {
      name: "Clickup",
      image:
        theme === "DARK"
          ? "/partners/Clickup.png"
          : "/partners/Clickup-white.png",
    },
    {
      name: "Github",
      image:
        theme === "DARK"
          ? "/partners/Github.png"
          : "/partners/Github-white.png",
    },
    {
      name: "Segment",
      image:
        theme === "DARK"
          ? "/partners/Segment.png"
          : "/partners/Segment-white.png",
    },
  ];
  return (
    <div className="fl-container text-center mt-16 mb-10">
      <div
        className={`font-semibold text-lg ${theme === "DARK" ? "text-white" : "text-h1-black"} animate-fade-up animate-delay-[800ms]`}
      >
        Trusted by over 100+ startups and freelance business
      </div>

      <Swiper
        modules={[Autoplay, Navigation, Pagination, Scrollbar]}
        spaceBetween={30}
        slidesPerView={2}
        loop={false}
        freeMode={true}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={5000}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 1 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 5, spaceBetween: 10 },
        }}
        className="my-3 mb-16 md:mb-16 animate-fade-up animate-delay-[1000ms]"
      >
        {startups.map((startup, index) => (
          <SwiperSlide key={index}>
            <Image
              src={startup.image}
              alt={startup.name}
              width={250}
              height={250}
              className="p-3 grayscale hover:grayscale-0 transition-all duration-300 ease-in-out cursor-pointer"
              key={index}
              style={{ objectFit: "contain" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrustByOver;
