"use client";

import React from "react";

import dynamic from "next/dynamic";
import { Clock, ShieldCheck, TrendingUp } from "lucide-react";

import Button from "@/components/Common/Button/Button";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";

const PopupModal = dynamic(
  () => import("react-calendly").then((module) => module.PopupModal),
  { ssr: false }
);

const bannerStats = [
  {
    icon: TrendingUp,
    title: "99.9% Uptime Guarantee",
    subtitle: "No revenue-killing downtime",
  },
  {
    icon: ShieldCheck,
    title: "Compliance-Ready",
    subtitle: "SOC 2, HIPAA, PIPEDA & more",
  },
  {
    icon: Clock,
    title: "24/7 Expert Support",
    subtitle: "When your business needs us",
  },
];

const Banner = ({ rootElementRef }: any) => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  return (
    <div className="fl-container pt-32 md:pt-40 mb-20 md:mb-28" ref={sectionRef}>
      <PopupModal
        url="https://calendly.com/xvintec/30min?hide_gdpr_banner=1"
        rootElement={rootElementRef?.current}
        onModalClose={() => setIsPopupOpen(false)}
        open={isPopupOpen}
      />

      <div className="max-w-3xl">
        <h1
          className={`text-[38px] md:text-[56px] leading-snug md:leading-[1.15] text-h1-black font-semibold ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          Enterprise-Grade IT Without the Headcount
        </h1>
        <p
          className={`text-p-grey font-light mt-5 max-w-2xl ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          Fully managed IT, cybersecurity, and infrastructure for growing
          businesses across every sector — expert support without the cost
          of an in-house team.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 mt-8 ${isVisible ? "animate-fade animate-delay-500" : "opacity-0"}`}
        >
          <Button onClick={() => setIsPopupOpen(true)}>
            Book a free consultation
          </Button>
          <a href="#case-studies">
            <button className="min-w-40 rounded-lg px-8 py-3 text-md font-medium border border-[#DFDFDF] text-h1-black hover:bg-[#F2F2F2] transition-colors duration-200">
              See how we&apos;ve transformed firms
            </button>
          </a>
        </div>
      </div>

      <div
        className={`flex flex-col sm:flex-row gap-8 sm:gap-12 mt-12 ${isVisible ? "animate-fade-up animate-delay-700" : "opacity-0"}`}
      >
        {bannerStats.map((stat, index) => (
          <div key={index} className="flex items-center gap-3">
            <stat.icon
              color="url(#brand-gradient)"
              className="shrink-0"
              size={28}
              strokeWidth={1.5}
            />
            <div>
              <p className="font-semibold text-h1-black">{stat.title}</p>
              <p className="text-p-grey text-sm font-light">
                {stat.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
