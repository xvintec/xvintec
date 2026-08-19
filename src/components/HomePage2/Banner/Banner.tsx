"use client";

import React from "react";

import Image from "next/image";
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
    <div
      className="relative overflow-hidden pt-32 pb-16 md:flex md:min-h-[680px] md:flex-col md:justify-center md:pt-44 md:pb-24"
      style={{ background: "var(--hero-gradient)" }}
      ref={sectionRef}
    >
      <PopupModal
        url="https://calendly.com/xvintec/30min?hide_gdpr_banner=1"
        rootElement={rootElementRef?.current}
        onModalClose={() => setIsPopupOpen(false)}
        open={isPopupOpen}
      />

      {/* Hero media, blended the way Highspring does it: the photo is a full-bleed
          background layer, then the brand gradient is painted back over it with a
          mask so it dissolves into the copy on the left instead of sitting in a box. */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/bussiness-people-working-team-office.jpg"
          alt="Xvintec team supporting a client"
          fill
          sizes="100vw"
          className="object-cover object-[72%_center]"
          priority
        />
        <div className="absolute inset-0 bg-[#060F26]/20" />
        <div
          className="absolute inset-0"
          style={{
            background: "var(--hero-gradient)",
            maskImage:
              "linear-gradient(265.64deg, transparent 20%, #000 56%)",
            WebkitMaskImage:
              "linear-gradient(265.64deg, transparent 20%, #000 56%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "var(--hero-gradient)",
            maskImage:
              "linear-gradient(286.63deg, transparent 85.15%, #000 100%)",
            WebkitMaskImage:
              "linear-gradient(286.63deg, transparent 85.15%, #000 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "var(--hero-gradient)",
            maskImage:
              "linear-gradient(0deg, transparent 68.41%, rgba(0,0,0,0.8) 100%)",
            WebkitMaskImage:
              "linear-gradient(0deg, transparent 68.41%, rgba(0,0,0,0.8) 100%)",
          }}
        />
        {/* On phones the copy spans the full width, so the photo drops back to a
            faint backdrop rather than sitting directly behind the text. */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: "var(--hero-gradient)", opacity: 0.88 }}
        />
      </div>

      <div className="fl-container relative">
        <div className="max-w-xl lg:max-w-2xl">
          <h1
            className={`text-[38px] md:text-[56px] leading-snug md:leading-[1.15] text-white font-semibold ${isVisible ? "mobile-animate animate-fade-up" : "opacity-0"}`}
          >
            Enterprise-Grade IT Without the Headcount
          </h1>
          <p
            className={`text-[#AAB4CC] font-light mt-5 max-w-xl ${isVisible ? "mobile-animate animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            Fully managed IT, cybersecurity, and infrastructure for growing
            businesses across every sector — expert support without the cost
            of an in-house team.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 mt-8 ${isVisible ? "mobile-animate animate-fade animate-delay-500" : "opacity-0"}`}
          >
            <Button
              onClick={() => setIsPopupOpen(true)}
              className="w-full sm:w-auto"
            >
              Book a free consultation
            </Button>
            <a href="#case-studies" className="block w-full sm:inline-block sm:w-auto">
              <Button bgColor="btn-outline-light" className="w-full sm:w-auto">
                See how we&apos;ve transformed firms
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div
        className={`fl-container relative flex flex-col sm:flex-row gap-8 sm:gap-12 mt-12 md:mt-16 ${isVisible ? "mobile-animate animate-fade-up animate-delay-700" : "opacity-0"}`}
      >
        {bannerStats.map((stat, index) => (
          <div key={index} className="flex items-center gap-3">
            <stat.icon
              color="url(#brand-gradient-light)"
              className="shrink-0"
              size={28}
              strokeWidth={1.5}
            />
            <div>
              <p className="font-semibold text-white">{stat.title}</p>
              <p className="text-[#AAB4CC] text-sm font-light">
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
