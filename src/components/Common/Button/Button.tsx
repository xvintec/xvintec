"use client";

import React from "react";

import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils/utils";
import { ButtonProps } from "@/types/CommonTypes";

function Button({
  children,
  bgColor = "btn-primary",
  onClick,
  className,
  showArrow = true,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "group inline-flex min-w-40 items-center justify-center gap-2 rounded-full px-5 py-2.5 sm:px-8 sm:py-3 text-sm md:text-[15px] font-medium transition-all duration-300",
        bgColor,
        className
      )}
      onClick={onClick}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          size={18}
          strokeWidth={2}
          className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
        />
      )}
    </button>
  );
}

export default Button;
