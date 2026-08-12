import React from "react";

import { LucideIcon } from "lucide-react";

import H2Heading from "@/components/Common/Headings/H2Heading";

interface ValuePropCardProps {
  icon: LucideIcon;
  title: string;
  content: string;
  className?: string;
}

const ValuePropCard = ({
  icon: Icon,
  title,
  content,
  className,
}: ValuePropCardProps) => {
  return (
    <div
      className={`max-w-md w-full bg-white py-8 px-6 rounded-lg border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg ${className}`}
    >
      <Icon color="url(#brand-gradient)" size={36} strokeWidth={1.5} />
      <H2Heading className="py-5">{title}</H2Heading>
      <p className="text-p-grey font-normal">{content}</p>
    </div>
  );
};

export default ValuePropCard;
