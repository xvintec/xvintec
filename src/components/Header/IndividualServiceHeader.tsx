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
    <div>
      {/* <div className="w-full absolute max-h-md h-full md:h-[700px] flex justify-end animate-fade-up first:animate-delay-500">
        <div className={`bg-no-repeat bg-contain max-w-4xl w-full  bg-[right_0rem_bottom_0rem] md:bg-[right_3rem_top_5rem] lg:bg-[right_3rem_top_3rem]`}
          style={{ backgroundImage: `url('/services/img/banner/${bannerImage}')` }}></div>
      </div> */}

      <div
        ref={sectionRef}
        className="fl-container min-h-[950px] max-h-[950px] lg:min-h-[800px] lg:max-h-[800px] *:h-[950px] sm:*:h-[950px] md:*:h-[800px] animate-fade first:animate-delay-100"
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 md:px-0 gap-y-0 md:gap-y-8 m-auto items-center justify-items-center ${isVisible ? " animate-fade-up animate-delay-500" : "opacity-0"}`}
          ref={rootElementRef}
        >
          <PopupModal
            url="https://calendly.com/xvintec/30min?hide_gdpr_banner=1"
            rootElement={rootElementRef.current} // Pass the ref's current value as the rootElement
            onModalClose={() => setIsPopupOpen(false)}
            open={isPopupOpen}
          />
          <div className="mx-3 mt-20 md:m-0 col-span-2 md:mr-auto">
            <div className="mb-5 md:mb-0 self-center text-center md:text-left mt-20 md:mt-0">
              <p className="text-2xl md:text-2xl font-semibold">
                <span className="bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] bg-clip-text text-transparent opacity-70">
                  {title}
                </span>
              </p>
              <div className="my-6 md:my-5 max-w-[510px] text-[#303030] text-4xl md:text-5xl font-semibold leading-tight md:leading-snug">
                {subTitle}
              </div>
              <p className="text-p-grey font-light mb-5 max-w-lg">
                {description}
              </p>
              <Button
                className="mt-3 animate-fade animate-delay-700"
                onClick={() => setIsPopupOpen(true)}
              >
                Book a free consultation
              </Button>
            </div>
          </div>
          <div className="mx-3 md:m-0 mb-auto col-span-3">
            <Image
              className="rounded-lg h-[400px] md:h-[650px] object-contain"
              src={`/services/img/banner/${bannerImage}`}
              width={1000}
              height={500}
              alt={title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualServiceHeader;
