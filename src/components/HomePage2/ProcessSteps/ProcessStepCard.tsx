import React from "react";

import H2Heading from "@/components/Common/Headings/H2Heading";

interface ProcessStepCardProps {
  step: number;
  title: string;
  items: string[];
  className?: string;
}

const ProcessStepCard = ({
  step,
  title,
  items,
  className,
}: ProcessStepCardProps) => {
  return (
    <div
      className={`max-w-md w-full bg-white py-8 px-6 rounded-2xl border border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <span className="inline-block rounded-full bg-blue-light/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0325E1]">
        Step {String(step).padStart(2, "0")}
      </span>
      <H2Heading className="pt-4 pb-5">{title}</H2Heading>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-p-grey font-normal flex gap-2">
            <span className="bg-gradient-to-r from-[#0DA7E9] to-[#0429E2] bg-clip-text text-transparent font-bold">
              •
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcessStepCard;
