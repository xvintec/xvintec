import React from "react";

import H2Heading from "@/components/Common/Headings/H2Heading";

interface IndustryCardProps {
  title: string;
  percentage: number;
  description: string;
  className?: string;
}

const IndustryCard = ({
  title,
  percentage,
  description,
  className,
}: IndustryCardProps) => {
  return (
    <div
      className={`max-w-md w-full bg-white py-8 px-6 rounded-lg border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between">
        <H2Heading>{title}</H2Heading>
        <span className="bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] bg-clip-text text-transparent font-semibold">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-2 bg-grey-light rounded-full mt-3 mb-4">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-[#0DA7E9] to-[#0429E2]"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-p-grey font-normal">{description}</p>
    </div>
  );
};

export default IndustryCard;
