"use client";

import React, { Fragment } from "react";

import dynamic from "next/dynamic";

import TrustByOver from "@/components/HomePage/TrustedByOver/TrustByOver";
import animationDataBlack from "@/lottie/Xvintec-background-black.json";
import animationData from "@/lottie/Xvintec-background.json";
import { HeaderProps } from "@/types/CommonTypes";

import Button from "../Common/Button/Button";

const LottieAnimation = dynamic(() => import("./LottieAnimation"), {
  ssr: false,
});

const PopupModal = dynamic(
  () => import("react-calendly").then((module) => module.PopupModal),
  { ssr: false }
);

const Header = ({
  theme,
  roundedImage = false,
  title,
  subtitle,
  buttonText,
  contentMaxwidth,
  className,
  onClick,
  rootElementRef,
}: HeaderProps) => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsPopupOpen(true);
      console.log("first");
    }
  };

  return (
    <div
      className="mb-5 md:mb-20 min-h-[790px] max-h-[900px] *:h-[900px] sm:*:h-[850px] md:*:h-[790px] animate-fade first:animate-delay-100"
      ref={rootElementRef}
    >
      <PopupModal
        url="https://calendly.com/xvintec/30min?hide_gdpr_banner=1"
        rootElement={rootElementRef.current} // Pass the ref's current value as the rootElement
        onModalClose={() => setIsPopupOpen(false)}
        open={isPopupOpen}
        pageSettings={{
          backgroundColor: "ffffff",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "#042AE2",
          textColor: "4d5055",
        }}
      />

      <LottieAnimation
        animationData={theme === "DARK" ? animationDataBlack : animationData}
      />
      <div
        className=" absolute top-0 left-0 right-0"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, transparent 10%, ${theme === "DARK" ? "#001b31" : "#FAFAFA"} 100%)`,
        }}
      ></div>

      {roundedImage && (
        <>
          <div
            className="hidden lg:block absolute top-24 left-28 right-0 bg-no-repeat bg-left"
            style={{
              backgroundImage: "url('/header/header-left-bg.png')",
              backgroundSize: "290px",
            }}
          ></div>

          <div
            className="hidden lg:block absolute top-[-10px] left-0 right-20 bg-no-repeat bg-right"
            style={{
              backgroundImage: "url('/header/header-right-bg.png')",
              backgroundSize: "290px",
            }}
          ></div>
        </>
      )}

      <div
        className=" h-0 absolute top-40 md:top-52 text-center w-full m-auto  justify-center"
        style={{ height: "auto" }}
      >
        <div
          className={`${contentMaxwidth ? contentMaxwidth : "max-w-5xl"} m-auto pb-16 px-8  ${className}`}
        >
          <h1
            className={`text-[42px] md:text-[52px] ${theme === "DARK" ? "text-white" : "text-h1-black"} leading-snug md:leading-normal font-semibold animate-fade-up`}
          >
            {title}
          </h1>
          <p
            className={`py-5  ${theme === "DARK" ? "text-[#AAAAAA]" : "text-p-grey"} font-light animate-fade-up animate-delay-300`}
          >
            {subtitle}
          </p>
          {buttonText && (
            <Button
              onClick={handleClick}
              className="mt-3 animate-fade animate-delay-700"
            >
              {buttonText}
            </Button>
          )}
        </div>

        <TrustByOver theme={theme} />
      </div>
    </div>
  );
};

export default Header;
