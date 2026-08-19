"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import H2Heading from "@/components/Common/Headings/H2Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const industriesData = [
  {
    title: "SaaS & Tech Companies",
    percentage: 95,
    description:
      "Secure, scalable infrastructure for high-growth software and technology businesses.",
  },
  {
    title: "Accounting & Finance",
    percentage: 88,
    description:
      "Compliant systems protecting sensitive financial and client data.",
  },
  {
    title: "Healthcare & Wellness",
    percentage: 80,
    description:
      "Compliance-ready systems for clinics, therapy practices, and wellness providers.",
  },
  {
    title: "Legal & Professional Services",
    percentage: 74,
    description:
      "Secure, reliable IT for law firms, consultancies, and advisory practices.",
  },
  {
    title: "Real Estate & Property",
    percentage: 72,
    description:
      "Always-on connectivity and data management for agents, brokers, and property managers.",
  },
  {
    title: "Retail & E-Commerce",
    percentage: 68,
    description:
      "PCI-compliant networks, POS integration, and uptime you can count on.",
  },
  {
    title: "Education & Non-Profit",
    percentage: 60,
    description:
      "Affordable, secure infrastructure for schools, training providers, and charities.",
  },
  {
    title: "Construction & Trades",
    percentage: 63,
    description:
      "Mobile-ready IT and project management integration for field-based teams.",
  },
  {
    title: "Hospitality & Food Service",
    percentage: 56,
    description:
      "Reliable networks, POS systems, and guest Wi-Fi for restaurants and hotels.",
  },
  {
    title: "Managed Services & Agencies",
    percentage: 78,
    description:
      "White-label IT solutions and scalable infrastructure for MSPs and digital agencies.",
  },
];

// Matches the sticky offset below (lg:top-28 === 7rem === 112px).
const STICKY_TOP = 112;
// Scroll runway given to each industry.
const VH_PER_ITEM = 38;

const IndustriesServed = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  // The pinned panel needs its own observer: it must reveal even when the reader
  // lands partway into the scroll track and never sees the heading intersect.
  const [panelRef, isPanelVisible] = useIntersectionAnimation();
  const [openIndex, setOpenIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Drive the active industry from scroll progress through the tall track, so the
  // pinned card advances as you scroll instead of needing a hover.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const travel = rect.height - (stickyRef.current?.offsetHeight ?? 0);
      if (travel <= 0) return;

      const progress = Math.min(
        Math.max((STICKY_TOP - rect.top) / travel, 0),
        1
      );
      setActiveIndex(
        Math.min(
          industriesData.length - 1,
          Math.floor(progress * industriesData.length)
        )
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Clicking a list item jumps to that industry's slice of the scroll track.
  const goToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const travel = track.offsetHeight - (stickyRef.current?.offsetHeight ?? 0);
    if (travel <= 0) return;

    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const offset = travel * ((index + 0.5) / industriesData.length);
    window.scrollTo({ top: trackTop - STICKY_TOP + offset, behavior: "smooth" });
  }, []);

  const active = industriesData[activeIndex];

  return (
    <div className="fl-container mb-20 md:mb-28">
      {/* Observer lives on the heading, not the wrapper: the desktop scroll track makes
          the wrapper far taller than the viewport, so a ratio threshold never fires. */}
      <div className="text-center max-w-2xl m-auto mb-16" ref={sectionRef}>
        <H1Heading
          className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          Industries Served
        </H1Heading>
        <p
          className={`text-p-grey font-light mt-5 ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          From healthcare to hospitality, finance to construction — we bring
          enterprise-grade IT to organizations of every shape and size.
        </p>
      </div>

      {/* Mobile: accordion */}
      <div className="flex flex-col gap-2 lg:hidden">
        {industriesData.map((industry, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={industry.title}
              className="overflow-hidden rounded-xl border border-gray-100"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className={`flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors duration-200 ${
                  isOpen ? "bg-[#EEF5FC] text-[#0325E1] font-semibold" : "text-p-grey"
                }`}
              >
                {industry.title}
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {/* Animating grid rows lets the panel ease open without hardcoding a
                  height for copy that wraps differently per industry. */}
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-5 pt-1">
                    <span className="text-2xl font-semibold bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] bg-clip-text text-transparent">
                      {industry.percentage}%
                    </span>
                    <div className="w-full h-2 bg-grey-light rounded-full mt-3 mb-4">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#0DA7E9] to-[#0429E2]"
                        style={{ width: `${industry.percentage}%` }}
                      />
                    </div>
                    <p className="text-p-grey font-normal">
                      {industry.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: tall scroll track pins both columns while the card advances */}
      <div
        ref={trackRef}
        className="hidden lg:block relative"
        style={{ height: `${industriesData.length * VH_PER_ITEM}vh` }}
      >
        <div ref={stickyRef} className="sticky top-28">
          <div ref={panelRef} className="grid grid-cols-12 gap-12 items-start">
            <div
              className={`col-span-4 ${isPanelVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
            >
              <ul className="flex flex-col gap-1">
                {industriesData.map((industry, index) => (
                  <li key={industry.title}>
                    <button
                      type="button"
                      onClick={() => goToIndex(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                        activeIndex === index
                          ? "bg-[#EEF5FC] text-[#0325E1] font-semibold"
                          : "text-p-grey hover:bg-gray-50"
                      }`}
                    >
                      {industry.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`col-span-8 ${isPanelVisible ? "animate-fade animate-delay-300" : "opacity-0"}`}
            >
              <div className="min-h-[280px] rounded-3xl border border-gray-100 bg-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row md:items-center gap-8">
                <div className="md:w-1/2">
                  <H2Heading className="text-2xl md:text-3xl">
                    {active.title}
                  </H2Heading>
                </div>
                <div className="md:w-1/2">
                  <span className="text-3xl font-semibold bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] bg-clip-text text-transparent">
                    {active.percentage}%
                  </span>
                  <div className="w-full h-2 bg-grey-light rounded-full mt-3 mb-4">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] transition-all duration-500"
                      style={{ width: `${active.percentage}%` }}
                    />
                  </div>
                  <p className="min-h-[3.6em] text-p-grey font-normal">
                    {active.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustriesServed;
