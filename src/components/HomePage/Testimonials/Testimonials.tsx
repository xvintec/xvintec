"use client";

import React from "react";

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

import Button from "@/components/Common/Button/Button";
import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  const testimonials = [
    {
      title: "Henry John",
      position: "Technical Officer",
      description:
        "Xvintec has been an invaluable partner in helping us streamline our IT infrastructure. Their solutions are not only efficient but also tailored to our specific needs. The level of expertise and support they provide is unmatched.",
      image: "/images/HenryJohn.png",
      count: 4,
    },
    {
      title: "Mark Johnson",
      position: "IT Administrator",
      description:
        "We've been working with Xvintec for several years now, and they  continue to impress us with their innovative IT solutions. Their team is responsive and always goes above and beyond to ensure our systems are smoothly running.",
      image: "/images/MarkJohnson.png",
      count: 4,
    },
    {
      title: "Lisa Taylor",
      position: "Office Manager",
      description:
        "Xvintec has been instrumental in helping our business stay ahead in today's fast-paced digital landscape. Their IT services have allowed us to focus on our core objectives. Truly a reliable partner.",
      image: "/images/LisaTaylor.png",
      count: 4,
    },
    {
      title: "Chris Wong",
      position: "IT Manager",
      description:
        "From network security to cloud migration, Xvintec has been our go-to IT solution provider. Their proactive approach to identifying and addressing potential issues has saved us time and money. We couldn't be happier!",
      image: "/images/ChrisWong.png",
      count: 4,
    },
  ];

  return (
    <div className={`fl-container mb-20 md:mb-28`} ref={sectionRef}>
      <H1Heading
        className={`text-center mb-16 ${isVisible ? " animate-fade-up" : "opacity-0"}`}
      >
        What our customers are saying
      </H1Heading>

      <Swiper
        modules={[Autoplay, Navigation, Pagination, Scrollbar]}
        spaceBetween={30}
        pagination={{ clickable: true }}
        loop={false}
        freeMode={true}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={5000}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 2, spaceBetween: 20 },
        }}
        className={`min-h-[320px] lg:min-h-[280px] ${isVisible ? " animate-fade-up animate-delay-300" : "opacity-0"}`}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <TestimonialCard
              title={testimonial.title}
              position={testimonial.position}
              image={testimonial.image}
              count={testimonial.count}
              description={testimonial.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
