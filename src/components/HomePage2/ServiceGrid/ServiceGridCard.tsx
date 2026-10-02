import React, { ReactNode } from "react";

import H2Heading from "@/components/Common/Headings/H2Heading";

interface ServiceGridCardProps {
  icon: ReactNode;
  title: string;
  tags: string[];
  description?: string;
  /**
   * Opt in to the blue bar that fills across the foot of the card on hover.
   * Only the "What We Do" grid uses it.
   */
  hoverFill?: boolean;
  className?: string;
}

const ServiceGridCard = ({
  icon,
  title,
  tags,
  description,
  hoverFill = false,
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

      {hoverFill && (
        /* Sits above the description overlay so it stays visible as the copy
           fades in. */
        <span className="pointer-events-none absolute bottom-0 left-0 z-10 h-1 w-0 bg-gradient-to-r from-[#0DA7E9] to-[#0325E1] transition-all duration-500 ease-out group-hover:w-full" />
      )}
    </div>
  );
};

export default ServiceGridCard;
