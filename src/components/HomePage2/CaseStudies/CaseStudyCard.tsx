import React from "react";

import H2Heading from "@/components/Common/Headings/H2Heading";

interface CaseStudyCardProps {
  industry: string;
  keyResult: string;
  challenge: string;
  result: string;
  className?: string;
}

const CaseStudyCard = ({
  industry,
  keyResult,
  challenge,
  result,
  className,
}: CaseStudyCardProps) => {
  return (
    <div
      className={`w-full bg-white py-8 px-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <H2Heading>{industry}</H2Heading>
      <div className="text-2xl font-semibold bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] bg-clip-text text-transparent mt-2 mb-4">
        {keyResult}
      </div>
      <p className="text-p-grey font-normal mb-3">
        <span className="font-medium text-p-black">Challenge: </span>
        {challenge}
      </p>
      <p className="text-p-grey font-normal">
        <span className="font-medium text-p-black">Result: </span>
        {result}
      </p>
    </div>
  );
};

export default CaseStudyCard;
