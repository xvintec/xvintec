"use client";

import React, { useRef, useState } from "react";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

import Stars from "@/components/HomePage/Testimonials/Stars";
import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

// Placeholder quotes written in-house for Xvintec (not copied from any
// competitor's named clients) — swap in real client quotes when available.
const testimonials2 = [
  {
    initials: "SK",
    name: "Sarah Klein",
    role: "COO",
    industry: "Software / SaaS",
    description:
      "Xvintec completely transformed how we operate. Our downtime went from weeks per year to virtually zero, and their team responds within minutes, not days.",
    count: 5,
  },
  {
    initials: "DM",
    name: "David Moreau",
    role: "Managing Partner",
    industry: "Accounting",
    description:
      "We were drowning in compliance anxiety before Xvintec stepped in. They had us audit-ready and our backup strategy rock-solid in under a month.",
    count: 5,
  },
  {
    initials: "DPN",
    name: "Dr. Priya Nair",
    role: "Clinic Director",
    industry: "Healthcare",
    description:
      "As a healthcare practice, data privacy is non-negotiable. Xvintec understood our compliance requirements from day one and built infrastructure we can trust.",
    count: 5,
  },
  {
    initials: "JL",
    name: "James Lowry",
    role: "Founder & CEO",
    industry: "Early-stage SaaS",
    description:
      "Switching to managed IT with Xvintec saved us the equivalent of a full-time hire. Their proactive monitoring caught a threat before it cost us a single dollar.",
    count: 5,
  },
  {
    initials: "AO",
    name: "Aisha Owusu",
    role: "Head of Operations",
    industry: "Consulting",
    description:
      "Our team is fully remote across three time zones and Xvintec made that seamless. Unified comms, secure VPN, and a helpdesk that actually helps.",
    count: 5,
  },
  {
    initials: "MT",
    name: "Marco Tellez",
    role: "Director of IT",
    industry: "Retail",
    description:
      "We run several retail locations and the stability Xvintec delivered is night and day. Outages at checkout used to cost us thousands. That problem is gone now.",
    count: 5,
  },
];

const Testimonials2 = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  const swiperRef = useRef<SwiperType | null>(null);
  const [active, setActive] = useState(0);

  return (
    <div
      id="client-stories"
      className={`fl-container mb-20 md:mb-28`}
      ref={sectionRef}
    >
      <div
        className={`text-center max-w-2xl m-auto mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      >
        <H1Heading>Client Success Stories</H1Heading>
        <p className="text-p-grey font-light mt-5">
          From solo founders to multi-location enterprises — our clients get
          results that matter.
        </p>
      </div>

      <div
        className={`relative ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
      >
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActive(swiper.activeIndex)}
          slidesPerView={1}
        >
          {testimonials2.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl border border-gray-100 shadow-xl">
                <div
                  className="relative min-h-[320px] md:min-h-[420px] flex flex-col justify-center p-10 md:p-14"
                  style={{ background: "var(--hero-gradient)" }}
                >
                  <Image
                    src="/images/bussiness-people-working-team-office.jpg"
                    alt=""
                    fill
                    className="object-cover opacity-15"
                  />
                  <div className="relative">
                    <Quote color="#fff" size={40} strokeWidth={1.5} />
                    <p className="mt-6 text-2xl md:text-3xl font-light italic leading-snug text-white">
                      &ldquo;{testimonial.description}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-6 bg-white p-10 md:p-14">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) =>
                        i < testimonial.count ? (
                          <Stars key={i} fill="#ffd200" />
                        ) : (
                          <Stars key={i} fill="#e1e1e1" />
                        )
                      )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-secondary/10 text-secondary font-semibold flex items-center justify-center shrink-0 text-lg">
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="text-lg font-medium text-h1-black">
                        {testimonial.name}
                      </div>
                      <p className="text-p-grey font-light">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <span className="inline-block w-fit text-xs font-medium text-secondary bg-blue-light/40 rounded-full px-3 py-1">
                    {testimonial.industry}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-2">
            {testimonials2.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to story ${index + 1}`}
                onClick={() => swiperRef.current?.slideTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === index ? "w-8 bg-[#0325E1]" : "w-3 bg-grey-light"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-3">
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
      </div>
    </div>
  );
};

export default Testimonials2;
