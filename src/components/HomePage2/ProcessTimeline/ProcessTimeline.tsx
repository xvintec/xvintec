"use client";

import React from "react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import H2Heading from "@/components/Common/Headings/H2Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const processStepsData = [
  {
    title: "Discovery & Assessment",
    items: ["IT Risk Assessment", "Security Review", "Infrastructure Analysis"],
    css: "animate-delay-300",
  },
  {
    title: "Custom Solution Design",
    items: ["Remediation Plan", "Technology Stack", "Implementation Timeline"],
    css: "animate-delay-500",
  },
  {
    title: "Implementation & Migration",
    items: ["System Setup", "Data Migration", "Staff Training"],
    css: "animate-delay-700",
  },
  {
    title: "Ongoing Managed Support",
    items: ["24/7 Monitoring", "Proactive Maintenance", "Strategic Planning"],
    css: "animate-delay-1000",
  },
];

const BRAND_GRADIENT = "linear-gradient(90deg, #0DA7E9 0%, #0429E2 100%)";

// Dotted lines are the brand gradient masked down to round dots, so the dots
// themselves carry the blue-to-cyan gradient rather than a flat colour.
const dotsHorizontal: React.CSSProperties = {
  background: BRAND_GRADIENT,
  WebkitMask:
    "radial-gradient(circle, #000 1.5px, transparent 2px) left center / 12px 4px repeat-x",
  mask: "radial-gradient(circle, #000 1.5px, transparent 2px) left center / 12px 4px repeat-x",
};

const dotsVertical: React.CSSProperties = {
  background: "linear-gradient(180deg, #0DA7E9 0%, #0429E2 100%)",
  WebkitMask:
    "radial-gradient(circle, #000 1.5px, transparent 2px) center top / 4px 12px repeat-y",
  mask: "radial-gradient(circle, #000 1.5px, transparent 2px) center top / 4px 12px repeat-y",
};

// Tailwind only ships class names it can find literally in source, so the
// per-step grid column has to be spelled out rather than built from a number.
const COL_START = [
  "lg:col-start-1",
  "lg:col-start-2",
  "lg:col-start-3",
  "lg:col-start-4",
];

const pad = (n: number) => String(n).padStart(2, "0");

const StepNode = ({
  step,
  size = "lg",
}: {
  step: number;
  size?: "sm" | "lg";
}) => (
  <div
    className={`relative z-10 flex shrink-0 flex-col items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(4,41,226,0.15)] ring-1 ring-[#0DA7E9]/25 ${
      size === "lg" ? "h-20 w-20" : "h-16 w-16"
    }`}
  >
    <span className="text-[10px] font-semibold uppercase tracking-widest text-p-grey">
      Step
    </span>
    <span
      className={`bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] bg-clip-text font-bold leading-none text-transparent ${
        size === "lg" ? "text-2xl" : "text-xl"
      }`}
    >
      {pad(step)}
    </span>
  </div>
);

const StepContent = ({
  title,
  items,
  align = "center",
}: {
  title: string;
  items: string[];
  align?: "center" | "left";
}) => (
  <div className={`w-full ${align === "center" ? "text-center" : "text-left"}`}>
    <H2Heading className="pb-4">{title}</H2Heading>
    <ul
      className={`space-y-2 ${align === "center" ? "inline-block text-left" : ""}`}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-2 font-normal text-p-grey">
          <span className="bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] bg-clip-text font-bold text-transparent">
            •
          </span>
          {item}
        </li>
      ))}
    </ul>
    <div className="mt-5 h-1 w-full" style={dotsHorizontal} />
  </div>
);

const ProcessTimeline = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  return (
    <div
      className="bg-[#EEF5FC] py-20 md:py-28 mb-20 md:mb-28"
      ref={sectionRef}
    >
      <div className="fl-container">
        <div className="text-center max-w-2xl m-auto mb-16">
          <H1Heading
            className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            How We Work With You
          </H1Heading>
          <p
            className={`text-p-grey font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            Our proven process ensures a smooth transition and immediate impact.
          </p>
        </div>

        {/* Desktop: horizontal timeline, content alternating above and below
            the line so neighbouring steps never crowd each other. */}
        <div className="hidden lg:grid grid-cols-4 gap-x-8">
          {processStepsData.map((data, index) => {
            const above = index % 2 === 0;
            return (
              <div
                key={data.title}
                className={`flex flex-col items-center ${COL_START[index]} ${
                  above ? "row-start-1 justify-end" : "row-start-3"
                } ${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
              >
                {!above && (
                  <div className="mb-6 h-10 w-1" style={dotsVertical} />
                )}
                <StepContent title={data.title} items={data.items} />
                {above && (
                  <div className="mt-6 h-10 w-1" style={dotsVertical} />
                )}
              </div>
            );
          })}

          <div className="relative col-span-4 row-start-2 grid grid-cols-4 gap-x-8">
            {/* Runs node-centre to node-centre (each node sits mid-column). */}
            <div className="absolute left-[12.5%] right-[12.5%] top-1/2 -translate-y-1/2 overflow-hidden">
              <div
                className={`h-1 origin-left transition-transform duration-[1500ms] ease-out ${
                  isVisible ? "scale-x-100" : "scale-x-0"
                }`}
                style={dotsHorizontal}
              />
            </div>
            {processStepsData.map((data, index) => (
              <div
                key={data.title}
                className={`flex justify-center ${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
              >
                <StepNode step={index + 1} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & tablet: there isn't the width for four steps side by side,
            so the same timeline runs down a left-hand rail instead. */}
        <ol className="lg:hidden max-w-xl m-auto">
          {processStepsData.map((data, index) => {
            const isLast = index === processStepsData.length - 1;
            return (
              <li
                key={data.title}
                className={`flex gap-5 sm:gap-8 ${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
              >
                <div className="flex flex-col items-center">
                  <StepNode step={index + 1} size="sm" />
                  {!isLast && (
                    <div className="my-2 w-1 flex-1" style={dotsVertical} />
                  )}
                </div>
                <div className={`flex-1 pt-3 ${isLast ? "" : "pb-10"}`}>
                  <StepContent
                    title={data.title}
                    items={data.items}
                    align="left"
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default ProcessTimeline;
