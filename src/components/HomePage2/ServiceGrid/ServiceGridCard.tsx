import React, { ReactNode } from "react";

import H2Heading from "@/components/Common/Headings/H2Heading";

interface ServiceGridCardProps {
  icon: ReactNode;
  title: string;
  tags: string[];
  className?: string;
}

const ServiceGridCard = ({
  icon,
  title,
  tags,
  className,
}: ServiceGridCardProps) => {
  return (
    <div
      className={`max-w-md w-full bg-white py-8 px-6 rounded-2xl border border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      {icon}
      <H2Heading className="py-5">{title}</H2Heading>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block rounded-full bg-blue-light/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0325E1]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ServiceGridCard;
