"use client";

import React from "react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";
import { DesignTestimonial } from "@/components/ui/design-testimonial";

// Same client quotes as Testimonials2 (the grid version), presented as a
// slider. Keep both in sync until one of them is retired.
const testimonials = [
  {
    industry: "Hospitality & Tourism",
    quote:
      "Xvintec took ownership of our IT environment and gave us much better visibility and control. From connectivity and infrastructure to day-to-day support, their team has been responsive, practical and easy to work with.",
    rating: 5,
  },
  {
    industry: "BPO",
    quote:
      "In our business, downtime directly affects operations. Xvintec helped us strengthen our network, improve system reliability and respond to technical issues much faster. They understand the demands of a high-volume operation.",
    rating: 5,
  },
  {
    industry: "Finance",
    quote:
      "What impressed us most was the structured approach. Xvintec reviewed our existing setup, identified the risks and gave us clear recommendations instead of simply trying to sell more technology.",
    rating: 5,
  },
  {
    industry: "Multi-Location Business",
    quote:
      "Managing technology across multiple locations had become difficult for our internal team. Xvintec helped standardise our systems and gave us one point of contact for infrastructure, support and troubleshooting.",
    rating: 5,
  },
  {
    industry: "Education",
    quote:
      "Xvintec helped us improve the reliability and security of our technology environment without making the process complicated. Their team communicates clearly and responds quickly whenever support is required.",
    rating: 5,
  },
  {
    industry: "Professional Services",
    quote:
      "Xvintec doesn't just sell technology. They took the time to understand our operation, identify the risks and recommend solutions that genuinely made sense for our business.",
    rating: 5,
  },
];

const TestimonialsSlider = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div
      id="client-stories"
      className="mb-20 md:mb-28 py-16 md:py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #04070f 0%, #060F26 40%, #0A1B3D 75%, #0d2260 100%)",
      }}
      ref={sectionRef}
    >
      <div className="fl-container">
        <div className="text-center max-w-2xl m-auto mb-12 md:mb-16">
          <H1Heading
            className={`text-white ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            Client Success Stories
          </H1Heading>
          <p
            className={`text-gray-400 font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            From growing SMEs to operationally complex businesses, Xvintec
            provides the technology ownership, support and resilience teams
            need to operate with confidence.
          </p>
        </div>

        <div
          className={`max-w-5xl m-auto ${isVisible ? "animate-fade-up animate-delay-500" : "opacity-0"}`}
        >
          <DesignTestimonial items={testimonials} />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSlider;
