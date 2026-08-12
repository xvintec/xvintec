import React from "react";

import { Quote } from "lucide-react";

import Stars from "@/components/HomePage/Testimonials/Stars";

interface Testimonial2CardProps {
  name: string;
  role: string;
  industry: string;
  initials: string;
  description: string;
  count: number;
  className?: string;
}

const Testimonial2Card = ({
  name,
  role,
  industry,
  initials,
  description,
  count,
  className,
}: Testimonial2CardProps) => {
  return (
    <div
      className={`w-full h-full bg-white py-8 px-6 rounded-lg border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg ${className}`}
    >
      <Quote color="url(#brand-gradient)" size={28} strokeWidth={1.5} />
      <div className="flex mt-3">
        {Array(5)
          .fill(0)
          .map((_, i) =>
            i < count ? (
              <Stars key={i} fill="#ffd200" />
            ) : (
              <Stars key={i} fill="#e1e1e1" />
            )
          )}
      </div>
      <p className="text-p-black font-light mt-3 border-l-2 border-secondary/40 pl-4">
        {description}
      </p>
      <hr className="my-5" />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary font-semibold flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div>
            <div className="font-medium">{name}</div>
            <p className="text-p-grey text-sm font-light">{role}</p>
          </div>
        </div>
        <span className="text-xs font-medium text-secondary bg-blue-light/40 rounded-full px-3 py-1 whitespace-nowrap">
          {industry}
        </span>
      </div>
    </div>
  );
};

export default Testimonial2Card;
