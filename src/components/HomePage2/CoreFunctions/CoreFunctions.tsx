"use client";

import React, { useRef } from "react";

import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Headset,
  Settings,
  Wallet,
} from "lucide-react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";
import ServiceGridCard from "@/components/HomePage2/ServiceGrid/ServiceGridCard";

const coreFunctionsData = [
  {
    icon: <Cpu color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Engineering",
    tags: ["Infrastructure", "Cloud", "Security", "DevOps"],
  },
  {
    icon: <Headset color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Client Support Services",
    tags: ["24/7 Monitoring", "Helpdesk", "Support Ticketing", "SLA Management"],
  },
  {
    icon: <Briefcase color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Business Development",
    tags: ["Strategic Planning", "Vendor Management", "Contract Negotiation", "Growth Strategy"],
  },
  {
    icon: <Wallet color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Finance",
    tags: ["Budget Management", "Cost Optimization", "Forecasting", "Compliance Reporting"],
  },
  {
    icon: <Settings color="url(#brand-gradient)" size={44} strokeWidth={1.5} />,
    title: "Operations",
    tags: ["Project Management", "Change Management", "Disaster Recovery", "Business Continuity"],
  },
];

const CoreFunctions = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <div
        className={`flex items-end justify-between mb-16 gap-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      >
        <div className="max-w-2xl">
          <H1Heading>Our Core Functions</H1Heading>
          <p className="text-p-grey font-light mt-5">
            Five specialized departments working together to deliver
            enterprise-grade IT services.
          </p>
        </div>
        <div className="hidden shrink-0 gap-3 md:flex">
          <button
            aria-label="Previous"
            className="swiper-button"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            aria-label="Next"
            className="swiper-button"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={20}
        slidesPerView={1.15}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        className={`!overflow-visible ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
      >
        {coreFunctionsData.map((data, index) => (
          <SwiperSlide key={index} className="!h-auto py-2">
            <ServiceGridCard
              icon={data.icon}
              title={data.title}
              tags={data.tags}
              className="h-full max-w-none"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CoreFunctions;
