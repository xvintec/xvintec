"use client";

import React from "react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

import Testimonial2Card from "./Testimonial2Card";

// Placeholder quotes written in-house for Xvintec (not copied from any
// competitor's named clients) — swap in real client quotes when available.
const testimonials2 = [
  {
    name: "Sarah Klein",
    role: "COO",
    industry: "Software / SaaS",
    description:
      "Xvintec completely transformed how we operate. Our downtime went from weeks per year to virtually zero, and their team responds within minutes, not days.",
    count: 5,
    css: "animate-delay-300",
  },
  {
    name: "David Moreau",
    role: "Managing Partner",
    industry: "Accounting",
    description:
      "We were drowning in compliance anxiety before Xvintec stepped in. They had us audit-ready and our backup strategy rock-solid in under a month.",
    count: 5,
    css: "animate-delay-500",
  },
  {
    name: "Dr. Priya Nair",
    role: "Clinic Director",
    industry: "Healthcare",
    description:
      "As a healthcare practice, data privacy is non-negotiable. Xvintec understood our compliance requirements from day one and built infrastructure we can trust.",
    count: 5,
    css: "animate-delay-700",
  },
  {
    name: "James Lowry",
    role: "Founder & CEO",
    industry: "Early-stage SaaS",
    description:
      "Switching to managed IT with Xvintec saved us the equivalent of a full-time hire. Their proactive monitoring caught a threat before it cost us a single dollar.",
    count: 5,
    css: "animate-delay-300",
  },
  {
    name: "Aisha Owusu",
    role: "Head of Operations",
    industry: "Consulting",
    description:
      "Our team is fully remote across three time zones and Xvintec made that seamless. Unified comms, secure VPN, and a helpdesk that actually helps.",
    count: 5,
    css: "animate-delay-500",
  },
  {
    name: "Marco Tellez",
    role: "Director of IT",
    industry: "Retail",
    description:
      "We run several retail locations and the stability Xvintec delivered is night and day. Outages at checkout used to cost us thousands. That problem is gone now.",
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
          From solo founders to multi-location enterprises — our clients get
          results that matter.
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
