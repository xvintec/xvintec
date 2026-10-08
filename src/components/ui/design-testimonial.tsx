"use client";

import type React from "react";
import { useCallback, useEffect, useId, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Stars from "@/components/HomePage/Testimonials/Stars";
import { cn } from "@/lib/utils/utils";

export interface DesignTestimonialItem {
  quote: string;
  industry: string;
  rating: number;
}

export interface DesignTestimonialProps {
  items: DesignTestimonialItem[];
  label?: string;
  autoPlayInterval?: number;
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function DesignTestimonial({
  items,
  label = "Client Stories",
  autoPlayInterval = 3500,
  className,
}: DesignTestimonialProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Scoped per instance: the page-level GradientDefs only exists on the home
  // page, and this component is also used on /services.
  const starGradientId = `star-gradient-${useId().replace(/:/g, "")}`;

  const goNext = useCallback(
    () => setActiveIndex((prev) => (prev + 1) % items.length),
    [items.length]
  );
  const goPrev = useCallback(
    () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length),
    [items.length]
  );

  // Restarts on every slide change so a manual click gets a full interval
  // before auto-advancing, and autoplay never stops.
  useEffect(() => {
    if (items.length < 2) return;
    const timer = setTimeout(goNext, autoPlayInterval);
    return () => clearTimeout(timer);
  }, [activeIndex, goNext, autoPlayInterval, items.length]);

  if (items.length === 0) return null;

  const current = items[activeIndex];

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        width="0"
        height="0"
        className="absolute"
        aria-hidden
        focusable="false"
      >
        <defs>
          <linearGradient id={starGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7FE3FF" />
            <stop offset="100%" stopColor="#4C8DFF" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative flex">
        {/* Left column: vertical label + progress line */}
        <div className="hidden flex-col items-center justify-center border-r border-white/10 pr-12 md:flex lg:pr-16">
          <span
            className="text-xs uppercase tracking-widest text-gray-400"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            {label}
          </span>
          <div className="relative mt-8 h-32 w-px bg-white/10">
            <motion.div
              className="absolute left-0 top-0 w-full origin-top bg-gradient-to-b from-[#0daae9] to-[#0325e1]"
              animate={{
                height: `${((activeIndex + 1) / items.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 py-4 md:py-12 md:pl-12 lg:pl-16">
          {/* Industry badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="mb-6 md:mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-300 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0daae9]" />
                {current.industry}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Quote, revealed word by word */}
          <div className="relative mb-10 min-h-[260px] sm:min-h-[200px] md:mb-12 md:min-h-[190px] lg:min-h-[170px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeIndex}
                className="text-xl font-light leading-snug tracking-tight text-white md:text-2xl lg:text-[28px] lg:leading-[1.35]"
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {current.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="mr-[0.3em] inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 20, rotateX: 90 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        transition: {
                          duration: 0.5,
                          delay: i * 0.02,
                          ease: EASE,
                        },
                      },
                      exit: {
                        opacity: 0,
                        y: -10,
                        transition: { duration: 0.2, delay: i * 0.005 },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Rating row + navigation */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  className="h-px w-8 bg-gradient-to-r from-[#0daae9] to-[#0325e1]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{ originX: 0 }}
                />
                <div
                  className="flex gap-[2px]"
                  aria-label={`Rated ${current.rating} out of 5`}
                >
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Stars
                        key={i}
                        fill={
                          i < current.rating
                            ? `url(#${starGradientId})`
                            : "#ffffff26"
                        }
                      />
                    ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4">
              <NavButton onClick={goPrev} label="Previous testimonial">
                <ChevronLeft className="h-5 w-5" />
              </NavButton>
              <NavButton onClick={goNext} label="Next testimonial">
                <ChevronRight className="h-5 w-5" />
              </NavButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileTap={{ scale: 0.95 }}
      className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition-colors hover:border-transparent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0daae9]/50"
    >
      <span
        className="absolute inset-0 scale-0 rounded-full opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
        style={{
          background: "linear-gradient(105deg, #0daae9 0%, #0325e1 100%)",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
