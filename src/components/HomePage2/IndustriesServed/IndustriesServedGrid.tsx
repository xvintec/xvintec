"use client";

// Layout adapted from Feature 8 by Hirael <https://hirael.com/blocks/features/feature-08>
// MIT · Mohammad Shehadeh · https://github.com/MohammadShehadeh/hirael

import React from "react";

import H1Heading from "@/components/Common/Headings/H1Heading";
import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";
import { cn } from "@/lib/utils/utils";

const industriesData = [
  {
    title: "SaaS & Tech Companies",
    description:
      "Secure, scalable infrastructure for high-growth software and technology businesses.",
  },
  {
    title: "Accounting & Finance",
    description:
      "Compliant systems protecting sensitive financial and client data.",
  },
  {
    title: "Healthcare & Wellness",
    description:
      "Compliance-ready systems for clinics, therapy practices, and wellness providers.",
  },
  {
    title: "Legal & Professional Services",
    description:
      "Secure, reliable IT for law firms, consultancies, and advisory practices.",
  },
  {
    title: "Real Estate & Property",
    description:
      "Always-on connectivity and data management for agents, brokers, and property managers.",
  },
  {
    title: "Retail & E-Commerce",
    description:
      "PCI-compliant networks, POS integration, and uptime you can count on.",
  },
  {
    title: "Education & Non-Profit",
    description:
      "Affordable, secure infrastructure for schools, training providers, and charities.",
  },
  {
    title: "Construction & Trades",
    description:
      "Mobile-ready IT and project management integration for field-based teams.",
  },
  {
    title: "Hospitality & Food Service",
    description:
      "Reliable networks, POS systems, and guest Wi-Fi for restaurants and hotels.",
  },
  {
    title: "Managed Services & Agencies",
    description:
      "White-label IT solutions and scalable infrastructure for MSPs and digital agencies.",
  },
];

/** Corner crosshair, drawn half outside the card edge like a survey mark. */
const CrossDecor = ({ position }: { position: "top-start" | "bottom-end" }) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    className={cn(
      "pointer-events-none absolute z-10 size-3.5 shrink-0 text-white/40",
      position === "top-start" && "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
      position === "bottom-end" && "bottom-0 right-0 translate-x-1/2 translate-y-1/2"
    )}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const IndustryCard = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  // Feed the pointer position to the spotlight layer as CSS vars, so hover
  // tracking never triggers a React render.
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn(
        "group relative flex h-full flex-col justify-start gap-3 px-6 pb-8 pt-8",
        "bg-white/[0.03] bg-[radial-gradient(50%_80%_at_25%_0%,rgba(13,167,233,0.16),transparent)]",
        className
      )}
      {...props}
    >
      {/* Pointer-follow spotlight in brand blue, fades in on hover. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_200px_at_var(--mx)_var(--my),rgba(13,167,233,0.18),transparent_70%)]"
      />

      {/* Hairlines run past the card edges so neighbouring cards read as one grid. */}
      <div className="absolute -inset-y-4 -left-px w-px bg-white/10" />
      <div className="absolute -inset-y-4 -right-px w-px bg-white/10" />
      <div className="absolute -inset-x-4 -top-px h-px bg-white/10" />
      <div className="absolute -inset-x-4 -bottom-px h-px bg-white/10" />

      {children}
    </div>
  );
};

const IndustriesServedGrid = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  // The grid gets its own observer: the whole section is taller than the
  // viewport on tablets, so a ratio threshold on the wrapper may never fire.
  const [gridRef, isGridVisible] = useIntersectionAnimation(0.1);

  return (
    <div className="mb-20 md:mb-28 bg-[url('/images/Black-mobile.png')] md:bg-[url('/images/Black-desktop.png')] md:bg-center bg-cover bg-no-repeat">
      <div className="fl-container py-16 md:py-24">
        <div className="text-center max-w-2xl m-auto mb-14" ref={sectionRef}>
          <H1Heading
            className={`text-white ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            Industries Served
          </H1Heading>
          <p
            className={`mt-5 text-gray-400 font-light ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            From healthcare to hospitality, finance to construction — we bring
            enterprise-grade IT to organizations of every shape and size.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-5"
        >
          {industriesData.map((industry, index) => (
            <div
              key={industry.title}
              className={isGridVisible ? "animate-fade-up" : "opacity-0"}
              style={{ animationDelay: `${150 + index * 60}ms` }}
            >
              <IndustryCard>
                <CrossDecor position="top-start" />
                <CrossDecor position="bottom-end" />
                <h3 className="relative z-10 text-lg font-semibold text-white">
                  {industry.title}
                </h3>
                <p className="relative z-10 text-sm leading-relaxed font-light text-gray-400">
                  {industry.description}
                </p>
              </IndustryCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustriesServedGrid;
