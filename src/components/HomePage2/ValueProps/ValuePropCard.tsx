import React from "react";

import { LucideIcon } from "lucide-react";

import H2Heading from "@/components/Common/Headings/H2Heading";

interface ValuePropCardProps {
  icon: LucideIcon;
  kicker?: string;
  title: string;
  content: string;
  className?: string;
}

const ValuePropCard = ({
  icon: Icon,
  kicker,
  title,
  content,
  className,
}: ValuePropCardProps) => {
  return (
    <div
      className={`max-w-md w-full bg-white py-8 px-6 rounded-2xl border border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <Icon color="url(#brand-gradient)" size={36} strokeWidth={1.5} />
      {kicker && (
        <span className="mt-5 block text-[11px] font-semibold uppercase tracking-wide text-[#0325E1]">
          {kicker}
        </span>
      )}
      <H2Heading className="pt-2 pb-5">{title}</H2Heading>
      <p className="text-p-grey font-normal">{content}</p>
    </div>
  );
};

export default ValuePropCard;
