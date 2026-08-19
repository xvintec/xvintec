import React from "react";

import Stars from "@/components/HomePage/Testimonials/Stars";

interface Testimonial2CardProps {
  name: string;
  role: string;
  industry: string;
  description: string;
  count: number;
  className?: string;
}

const Testimonial2Card = ({
  name,
  role,
  industry,
  description,
  count,
  className,
}: Testimonial2CardProps) => {
  return (
    <div
      className={`flex h-full flex-col rounded-[21px] bg-white shadow-[0_58px_35px_0_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="flex flex-1 flex-col gap-4 px-6 pb-3 pt-6">
        <div className="flex gap-[2px]">
          {Array(5)
            .fill(0)
            .map((_, i) =>
              i < count ? (
                <Stars key={i} fill="#F26B21" />
              ) : (
                <Stars key={i} fill="#e1e1e1" />
              )
            )}
        </div>
        <p className="text-base leading-6 text-[#2B373D]">{description}</p>
      </div>

      <div className="px-6 py-4">
        <div className="text-[13px] font-medium leading-5 text-[#132128]">
          {name}
        </div>
        <div className="text-[13px] font-medium leading-5 text-[#424D53]">
          {industry}
        </div>
        <div className="mt-1 text-xs font-normal leading-3 text-[#717A7E]">
          {role}
        </div>
      </div>
    </div>
  );
};

export default Testimonial2Card;
