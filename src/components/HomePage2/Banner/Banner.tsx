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
      className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24"
      style={{ background: "var(--hero-gradient)" }}
      ref={sectionRef}
    >
      <PopupModal
        url="https://calendly.com/xvintec/30min?hide_gdpr_banner=1"
        rootElement={rootElementRef?.current}
        onModalClose={() => setIsPopupOpen(false)}
        open={isPopupOpen}
      />

      <div className="fl-container grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <h1
            className={`text-[38px] md:text-[56px] leading-snug md:leading-[1.15] text-white font-semibold ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            Enterprise-Grade IT Without the Headcount
          </h1>
          <p
            className={`text-[#AAB4CC] font-light mt-5 max-w-xl ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
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
              <Button bgColor="btn-outline-light">
                See how we&apos;ve transformed firms
              </Button>
            </a>
          </div>
        </div>

        <div
          className={`relative aspect-[4/3] w-full ${isVisible ? "animate-fade animate-delay-300" : "opacity-0"}`}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
            <Image
              src="/images/bussiness-people-working-team-office.jpg"
              alt="Xvintec team supporting a client"
              fill
              className="object-cover"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, #060F26 0%, rgba(6,15,38,0.5) 14%, rgba(6,15,38,0) 42%)",
              }}
            />
          </div>
          <div className="pointer-events-none absolute -left-5 -top-5 hidden h-24 w-24 rounded-tl-[1.5rem] border-l-2 border-t-2 border-white/25 md:block" />
          <div className="pointer-events-none absolute -bottom-5 -right-5 hidden h-24 w-24 rounded-br-[1.5rem] border-b-2 border-r-2 border-white/25 md:block" />
        </div>
      </div>

      <div
        className={`fl-container flex flex-col sm:flex-row gap-8 sm:gap-12 mt-12 md:mt-16 ${isVisible ? "animate-fade-up animate-delay-700" : "opacity-0"}`}
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
