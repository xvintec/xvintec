import React from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

import useIntersectionAnimation from "@/components/Common/UseScrollAnimation/UseScrollAnimation";
import { IndividualHeaderProps } from "@/types/CommonTypes";

import Button from "../Common/Button/Button";

const PopupModal = dynamic(
  () => import("react-calendly").then((module) => module.PopupModal),
  { ssr: false }
);

const IndividualServiceHeader = ({
  title,
  subTitle,
  description,
  bannerImage,
  rootElementRef,
}: IndividualHeaderProps) => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  return (
    <div
      className="relative overflow-hidden pt-32 pb-16 md:flex md:min-h-[680px] md:flex-col md:justify-center md:pt-44 md:pb-24"
      style={{ background: "var(--hero-gradient)" }}
      ref={sectionRef}
    >
      {/* Same treatment as the home hero: the artwork sits on the gradient and the
          brand gradient is masked back over it so it dissolves into the copy. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-full md:w-[64%]">
          <Image
            src={`/services/img/banner/${bannerImage}`}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 64vw"
            className="object-contain object-right"
            priority
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: "var(--hero-gradient)",
            maskImage: "linear-gradient(265.64deg, transparent 22%, #000 58%)",
            WebkitMaskImage:
              "linear-gradient(265.64deg, transparent 22%, #000 58%)",
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
        {/* Phones give the copy the full width, so the artwork drops back. */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: "var(--hero-gradient)", opacity: 0.88 }}
        />
      </div>

      <div className="fl-container relative" ref={rootElementRef}>
        <PopupModal
          url="https://calendly.com/xvintec/30min?hide_gdpr_banner=1"
          rootElement={rootElementRef.current}
          onModalClose={() => setIsPopupOpen(false)}
          open={isPopupOpen}
        />

        <div className="max-w-xl lg:max-w-2xl">
          <p
            className={`text-xl md:text-2xl font-semibold ${isVisible ? "mobile-animate animate-fade-up" : "opacity-0"}`}
          >
            <span className="bg-gradient-to-r from-[#0DA7E9] to-[#6D9BFF] bg-clip-text text-transparent">
              {title}
            </span>
          </p>
          <h1
            className={`mt-4 text-[38px] md:text-[56px] leading-snug md:leading-[1.15] text-white font-semibold ${isVisible ? "mobile-animate animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            {subTitle}
          </h1>
          <p
            className={`text-[#AAB4CC] font-light mt-5 max-w-xl ${isVisible ? "mobile-animate animate-fade-up animate-delay-500" : "opacity-0"}`}
          >
            {description}
          </p>
          <div
            className={`mt-8 ${isVisible ? "mobile-animate animate-fade animate-delay-700" : "opacity-0"}`}
          >
            <Button onClick={() => setIsPopupOpen(true)}>
              Book a free consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualServiceHeader;
