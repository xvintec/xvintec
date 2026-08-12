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
      className={`max-w-md w-full bg-white py-8 px-6 rounded-lg border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg ${className}`}
    >
      {icon}
      <H2Heading className="py-5">{title}</H2Heading>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs font-medium text-secondary bg-blue-light/40 rounded-full px-3 py-1 transition-colors duration-300 hover:bg-secondary hover:text-white cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ServiceGridCard;
