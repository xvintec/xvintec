"use client";

import React, { useRef } from "react";

import OurDevelopmentApproach from "@/components/HomePage/OurServices/OurDevelopmentApproach";
import OurServiceSecondsec from "@/components/HomePage/OurServices/OurServiceSecondsec";
import ReadyToGetStarted from "@/components/HomePage/ReadyToGetStarted/ReadyToGetStarted";

import IndividualServiceHeader from "../../../components/Header/IndividualServiceHeader";

const IndividualService = ({ data }: any) => {
  const rootElementRef = useRef(null);

  return (
    <div id="rootElement" ref={rootElementRef}>
      <IndividualServiceHeader
        title={data.title}
        subTitle={data.subTitle}
        description={data.description}
        bannerImage={data.bannerImage}
        rootElementRef={rootElementRef}
      />
      <OurServiceSecondsec
        title={data.title}
        contentTwo={data.contentTwo}
        contentImage={data.contentImage}
      />
      <OurDevelopmentApproach
        title1={data.ODAtitle1}
        title2={data.ODAtitle2}
        title3={data.ODAtitle3}
        content1={data.ODAcontent1}
        content2={data.ODAcontent2}
        content3={data.ODAcontent3}
      />
      <ReadyToGetStarted rootElementRef={rootElementRef} />
    </div>
  );
};

export default IndividualService;
