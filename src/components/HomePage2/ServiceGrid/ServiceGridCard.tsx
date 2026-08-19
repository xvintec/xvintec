import React, { ReactNode } from "react";

import H2Heading from "@/components/Common/Headings/H2Heading";

interface ServiceGridCardProps {
  icon: ReactNode;
  title: string;
  tags: string[];
  description?: string;
  className?: string;
}

const ServiceGridCard = ({
  icon,
  title,
  tags,
  description,
  className,
}: ServiceGridCardProps) => {
  return (
    <div
      className={`group relative max-w-md w-full overflow-hidden bg-white py-8 px-6 rounded-2xl border border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${description ? "md:min-h-[292px]" : ""} ${className}`}
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

      {description && (
        <>
          {/* Touch devices get no hover, so the copy just stays on the card. */}
          <p className="mt-4 text-p-grey font-normal md:hidden">{description}</p>

          {/* Hover swaps the tags for the description in place, so the grid never
              reflows. Scrolls only for the rare over-long entry. */}
          <div className="pointer-events-none absolute inset-0 hidden flex-col justify-center overflow-y-auto bg-white px-6 py-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
            <H2Heading className="pb-3">{title}</H2Heading>
            <p className="text-sm leading-relaxed text-p-grey font-normal">
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceGridCard;
