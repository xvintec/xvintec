"use client";

import type React from "react";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils/utils";

export type ShinyButtonVariant = "primary" | "ghost" | "white";

interface ShinyButtonProps {
  children: React.ReactNode;
  variant?: ShinyButtonVariant;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  type?: "button" | "submit" | "reset";
}

export function ShinyButton({
  children,
  variant = "primary",
  onClick,
  className = "",
  showArrow = true,
  type = "button",
}: ShinyButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn("shiny-cta", `shiny-cta--${variant}`, className)}
    >
      <span className="shiny-cta__content">
        {children}
        {showArrow && <ArrowRight className="shiny-cta__icon" />}
      </span>
    </button>
  );
}

export default ShinyButton;
