"use client";

import React from "react";

import dynamic from "next/dynamic";
import { Clock, ShieldCheck, TrendingUp } from "lucide-react";

import ShinyButton from "@/components/ui/shiny-button";

import ParticleNetwork from "./ParticleNetwork";

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

// Aether Flow particle-network hero, ported 1:1 from the hero-section.html
// prototype (nav/header excluded — the site's own Navbar covers that). Content
// is kept identical to the original Banner so the two are interchangeable.
const WebGLBanner = ({ rootElementRef }: any) => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  return (
    <div className="webgl-banner">
      <ParticleNetwork />
      <div className="webgl-banner__glow" />

      <PopupModal
        url="https://calendly.com/xvintec/30min?hide_gdpr_banner=1"
        rootElement={rootElementRef?.current}
        onModalClose={() => setIsPopupOpen(false)}
        open={isPopupOpen}
      />

      <div className="webgl-banner__content">
        <h1 className="webgl-banner__headline">
          Enterprise-Grade IT
          <br />
          Without the Headcount
        </h1>
        <p className="webgl-banner__subtext">
          Fully managed IT, cybersecurity, and infrastructure for growing
          businesses across every sector — expert support without the cost of
          an in-house team.
        </p>

        <div className="webgl-banner__buttons">
          <ShinyButton variant="primary" onClick={() => setIsPopupOpen(true)}>
            Book a free consultation
          </ShinyButton>
          <a href="#case-studies" className="webgl-banner__ghost-link">
            <ShinyButton variant="ghost">
              See how we&apos;ve transformed firms
            </ShinyButton>
          </a>
        </div>

        <div className="webgl-banner__stats">
          {bannerStats.map((stat, index) => (
            <div className="webgl-banner__stat" key={index}>
              <span className="webgl-banner__stat-icon">
                <stat.icon size={17} strokeWidth={2} />
              </span>
              <span>
                <b>{stat.title}</b>
                <span>{stat.subtitle}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebGLBanner;
