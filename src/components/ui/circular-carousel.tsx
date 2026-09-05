"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils/utils";

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  tags?: string[];
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

type Breakpoint = "mobile" | "tablet" | "desktop";

const VISIBLE_COUNT = 5;
// Framer Motion writes x/y straight to the inline `transform` style, which
// overrides (rather than composes with) a Tailwind `-translate-x/y-1/2`
// class on the same element — so the usual "left-1/2 -translate-x-1/2"
// centering trick silently loses its translate half once Motion takes over.
// Baking the half-size offset into x/y themselves avoids the conflict.
const CARD_WIDTH = 320;
const CARD_HEIGHT = 260;
const TOP_MARGIN = 16;

// The fanned arc is a desktop/tablet-only effect. Phones have no reliable
// hover and not enough width for peripheral cards to peek without either
// getting clipped or showing unreadable fragments of text — so mobile gets
// a plain one-card-at-a-time slider instead of the 3D fan.
const RADII: Record<Exclude<Breakpoint, "mobile">, { x: number; y: number }> = {
  tablet: { x: 240, y: 110 },
  desktop: { x: 380, y: 110 },
};

function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

  useEffect(() => {
    function update() {
      if (window.innerWidth < 768) setBreakpoint("mobile");
      else if (window.innerWidth < 1024) setBreakpoint("tablet");
      else setBreakpoint("desktop");
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return breakpoint;
}

function getItemPosition(
  index: number,
  activeIndex: number,
  total: number,
  radiusX: number,
  radiusY: number
) {
  const offset = index - activeIndex;
  const half = Math.floor(VISIBLE_COUNT / 2);
  let adjustedOffset = offset;

  if (offset > half) adjustedOffset = offset - total;
  if (offset < -half) adjustedOffset = offset + total;

  // Only the intended VISIBLE_COUNT window (±half around the active card)
  // should ever render. The original demo checked against `half * 2` here,
  // which let extra, wrongly-angled cards from further around the wheel
  // slip through — visible as a stray misplaced card (and a gap where the
  // real one should be) at certain active indices.
  if (Math.abs(adjustedOffset) > half) return null;

  const angle = (adjustedOffset / VISIBLE_COUNT) * Math.PI;
  const x = Math.sin(angle) * radiusX - CARD_WIDTH / 2;
  // Anchored from the track's top edge (see TOP_MARGIN/button `top-0` below),
  // not its vertical center. `-cos(angle)` is always <= 0, so centering the
  // arc around the box's middle only ever pushes cards UP from there — never
  // down — which left a real gap: cropped at the top if the box was sized to
  // avoid it, or a dead zone at the bottom if it wasn't. This formula instead
  // measures every card's offset from the highest point (the active card, at
  // angle 0) directly, so the box can be sized to exactly what's used.
  const y = TOP_MARGIN + radiusY * (1 - Math.cos(angle));

  const distance = Math.abs(adjustedOffset);
  const maxDistance = half + 1;
  const scale = Math.max(0, 1 - (distance / maxDistance) * 0.3);
  const opacity = Math.max(0.3, 1 - (distance / maxDistance) * 0.7);
  const zIndex = VISIBLE_COUNT - distance;

  return { x, y, scale, opacity, zIndex, adjustedOffset };
}

function CardTags({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag, tagIndex) => (
        <span
          key={tagIndex}
          className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/70"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  autoPlay = true,
  autoPlayInterval = 4000,
  className,
}: CircularCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const breakpoint = useBreakpoint();
  const radius = RADII[breakpoint === "mobile" ? "tablet" : breakpoint];

  const activeIndex = controlledIndex ?? internalIndex;
  const total = items.length;
  const activeItem = items[activeIndex];

  const goTo = useCallback(
    (index: number, dir: 1 | -1 = 1) => {
      const newIndex = ((index % total) + total) % total;
      setDirection(dir);
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }
      onActiveChange?.(newIndex);
    },
    [total, controlledIndex, onActiveChange]
  );

  const next = useCallback(() => goTo(activeIndex + 1, 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1, -1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoPlay || isHovered || isFocused) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, isHovered, isFocused, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handler);
    return () => el?.removeEventListener("keydown", handler);
  }, [next, prev]);

  const isMobile = breakpoint === "mobile";

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "relative flex flex-col items-center justify-center gap-4 outline-none",
        className
      )}
    >
      {isMobile ? (
        /* Phones: a plain one-card slider, no fanned peripheral cards —
           there isn't room to peek at neighbors without either clipping
           them or showing unreadable fragments of text. */
        <div className="relative h-[300px] w-full max-w-sm overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-start justify-start gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0A1B3D]/90 to-[#060F26]/95 p-6"
            >
              <CardTags tags={activeItem.tags} />
              <div className="w-full">
                <h3 className="text-lg font-semibold leading-tight text-white">
                  {activeItem.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/60">
                  {activeItem.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Tablet/desktop: the fanned circular track. */
        <div className="relative h-[380px] w-full max-w-6xl overflow-hidden">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => {
              const pos = getItemPosition(i, activeIndex, total, radius.x, radius.y);
              if (!pos) return null;

              const isActive = i === activeIndex;

              return (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    x: pos.x,
                    y: pos.y,
                    scale: pos.scale,
                    opacity: pos.opacity,
                    zIndex: pos.zIndex,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                  aria-label={item.title}
                  aria-selected={isActive}
                  role="option"
                  className={cn(
                    "absolute left-1/2 top-0 flex h-[260px] w-80 cursor-pointer flex-col items-start justify-start gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0A1B3D]/90 to-[#060F26]/95 p-7 backdrop-blur-sm transition-shadow duration-300",
                    isActive
                      ? "shadow-[0_20px_60px_-12px_rgba(3,37,225,0.45)]"
                      : "shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_32px_-4px_rgba(3,37,225,0.35)]"
                  )}
                  style={{ transformOrigin: "center center" }}
                >
                  <CardTags tags={item.tags} />
                  <div className="w-full">
                    <h3
                      className={cn(
                        "font-semibold leading-tight transition-colors duration-300",
                        isActive ? "text-white text-lg" : "text-white/80 text-base"
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 line-clamp-3 text-xs leading-relaxed transition-colors duration-300",
                        isActive ? "text-white/60" : "text-white/40"
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Active item title — crossfades in the space below the track
          instead of sitting empty. */}
      <div className="flex h-10 items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.h3
            key={activeItem.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-lg font-semibold text-white md:text-xl"
          >
            {activeItem.title}
          </motion.h3>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          aria-label="Previous item"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-colors hover:border-[#0DAAE9]/50 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-[#0DAAE9]/50"
        >
          <ChevronLeft className="size-5" />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5" role="tablist">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-6 bg-gradient-to-r from-[#0DAAE9] to-[#0325E1]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          aria-label="Next item"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-colors hover:border-[#0DAAE9]/50 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-[#0DAAE9]/50"
        >
          <ChevronRight className="size-5" />
        </motion.button>
      </div>
    </div>
  );
}

export default CircularCarousel;
