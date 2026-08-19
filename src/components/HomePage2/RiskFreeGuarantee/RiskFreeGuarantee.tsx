"use client";

import React from "react";

import { CheckCircle2, XCircle } from "lucide-react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import H2Heading from "@/components/Common/Headings/H2Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const guaranteeCards = [
  {
    title: "200% Money-Back Guarantee",
    subtitle: "Within first 30 days",
    description:
      "Not satisfied with our service? We'll refund 200% of your first month's fees. No questions asked. We only win when you win.",
    items: [
      "Full refund + 100% bonus",
      "No contract obligations",
      "30-day risk-free trial",
    ],
    featured: true,
    css: "animate-delay-300",
  },
  {
    title: "Flexible Contracts",
    subtitle: "Designed for your peace of mind",
    description:
      "36-month term with the ability to exit within 6 months if needed. We're confident you'll stay because the results speak for themselves.",
    items: [
      "Lock in stable pricing",
      "Early exit clause (6 months)",
      "Predictable monthly costs",
    ],
    featured: false,
    css: "animate-delay-500",
  },
];

const comparisonColumns = [
  {
    label: "Traditional IT Hire",
    positive: false,
    items: [
      "$70k-90k salary per person",
      "Benefits, equipment costs",
      "Coverage gaps, vacation time",
      "Months to find qualified talent",
    ],
  },
  {
    label: "Xvintec",
    positive: true,
    items: [
      "$40k+ monthly all-inclusive",
      "Full team, no hidden costs",
      "24/7 coverage included",
      "Start immediately",
    ],
  },
  {
    label: "You Save",
    positive: true,
    items: [
      "30-50% on total IT costs",
      "Better expertise & coverage",
      "Reduced security risk",
      "Predictable budgeting",
    ],
  },
];

const RiskFreeGuarantee = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div className="fl-container mb-20 md:mb-28" ref={sectionRef}>
      <div className="text-center max-w-2xl m-auto mb-16">
        <H1Heading
          className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          Risk-Free Guarantee
        </H1Heading>
        <p
          className={`text-p-grey font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          We&apos;re so confident you&apos;ll love working with us, we put our
          money where our mouth is.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-5 items-stretch">
        {guaranteeCards.map((card, index) => (
          <div
            key={index}
            className={`relative py-9 px-7 md:px-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
              card.featured
                ? "text-white shadow-2xl md:scale-[1.04] z-10"
                : "bg-white border border-gray-100 hover:shadow-xl"
            } ${isVisible ? `animate-fade-up ${card.css}` : "opacity-0"}`}
            style={card.featured ? { background: "var(--hero-gradient)" } : undefined}
          >
            {card.featured && (
              <span className="absolute -top-3 left-7 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0325E1] shadow-md">
                Most Popular
              </span>
            )}
            <CheckCircle2
              color={card.featured ? "#ffffff" : "url(#brand-gradient)"}
              size={32}
              strokeWidth={1.5}
            />
            <H2Heading className={`mt-4 ${card.featured ? "text-white" : ""}`}>
              {card.title}
            </H2Heading>
            <p
              className={`font-medium mt-1 mb-4 ${card.featured ? "text-white/90" : "bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] bg-clip-text text-transparent"}`}
            >
              {card.subtitle}
            </p>
            <p className={`font-normal mb-5 ${card.featured ? "text-white/80" : "text-p-grey"}`}>
              {card.description}
            </p>
            <ul className="space-y-2">
              {card.items.map((item, i) => (
                <li
                  key={i}
                  className={`flex gap-2 ${card.featured ? "text-white/90" : "text-p-grey"}`}
                >
                  <CheckCircle2
                    color={card.featured ? "#ffffff" : "url(#brand-gradient)"}
                    className="shrink-0"
                    size={18}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className={`bg-white py-8 px-6 md:px-10 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-xl ${isVisible ? "animate-fade-up animate-delay-700" : "opacity-0"}`}
      >
        <H2Heading className="mb-6">vs. Hiring Your Own IT Staff</H2Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {comparisonColumns.map((column, index) => (
            <div key={index}>
              <p className="uppercase text-xs font-semibold tracking-widest text-p-grey mb-3">
                {column.label}
              </p>
              <ul className="space-y-3">
                {column.items.map((item, i) => (
                  <li key={i} className="flex gap-2 text-p-grey text-sm">
                    {column.positive ? (
                      <CheckCircle2
                        color="url(#brand-gradient)"
                        className="shrink-0"
                        size={16}
                      />
                    ) : (
                      <XCircle
                        className="text-red-400 shrink-0"
                        size={16}
                      />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskFreeGuarantee;
