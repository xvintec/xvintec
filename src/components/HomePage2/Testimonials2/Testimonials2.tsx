"use client";

import React from "react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

import Testimonial2Card from "./Testimonial2Card";

// Placeholder quotes written in-house for Xvintec (not copied from any
// competitor's named clients) — swap in real client quotes when available.
const testimonials2 = [
  {
    name: "Hospitality & Tourism",
    role: "COO",
    industry: "Software / SaaS",
    description:
      "Xvintec took ownership of our IT environment and gave us much better visibility and control. From connectivity and infrastructure to day-to-day support, their team has been responsive, practical and easy to work with.",
    count: 5,
    css: "animate-delay-300",
  },
  {
    name: "BPO",
    role: "Managing Partner",
    industry: "Accounting",
    description:
      "In our business, downtime directly affects operations. Xvintec helped us strengthen our network, improve system reliability and respond to technical issues much faster. They understand the demands of a high-volume operation.",
    count: 5,
    css: "animate-delay-500",
  },
  {
    name: "Finance",
    role: "Clinic Director",
    industry: "Healthcare",
    description:
      "What impressed us most was the structured approach. Xvintec reviewed our existing setup, identified the risks and gave us clear recommendations instead of simply trying to sell more technology",
    count: 5,
    css: "animate-delay-700",
  },
  {
    name: "Multi-Location Business",
    role: "Founder & CEO",
    industry: "Early-stage SaaS",
    description:
      "Managing technology across multiple locations had become difficult for our internal team. Xvintec helped standardise our systems and gave us one point of contact for infrastructure, support and troubleshooting.",
    count: 5,
    css: "animate-delay-300",
  },
  {
    name: "Education",
    role: "Head of Operations",
    industry: "Consulting",
    description:
      "Xvintec helped us improve the reliability and security of our technology environment without making the process complicated. Their team communicates clearly and responds quickly whenever support is required.",
    count: 5,
    css: "animate-delay-500",
  },
  {
    name: "Professional Services",
    role: "Director of IT",
    industry: "Retail",
    description:
      "Xvintec doesn't just sell technology. They took the time to understand our operation, identify the risks and recommend solutions that genuinely made sense for our business",
    count: 5,
    css: "animate-delay-700",
  },
];

const Testimonials2 = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div
      id="client-stories"
      className={`fl-container mb-20 md:mb-28`}
      ref={sectionRef}
    >
      <div className="text-center max-w-2xl m-auto mb-16">
        <H1Heading
          className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          Client Success Stories
        </H1Heading>
        <p
          className={`text-p-grey font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          From growing SMEs to operationally complex businesses, Xvintec provides the technology ownership, support and resilience teams need to operate with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials2.map((testimonial, index) => (
          <Testimonial2Card
            key={index}
            name={testimonial.name}
            role={testimonial.role}
            industry={testimonial.industry}
            description={testimonial.description}
            count={testimonial.count}
            className={
              isVisible ? `animate-fade-up ${testimonial.css}` : "opacity-0"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials2;
