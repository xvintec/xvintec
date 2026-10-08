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
const HALF_VISIBLE = Math.floor(VISIBLE_COUNT / 2);
// Framer Motion writes x/y straight to the inline `transform` style, which
// overrides (rather than composes with) a Tailwind `-translate-x/y-1/2`
// class on the same element — so the usual "left-1/2 -translate-x-1/2"
// centering trick silently loses its translate half once Motion takes over.
// Baking the half-size offset into x/y themselves avoids the conflict.
const CARD_WIDTH = 360;
const TOP_MARGIN = 16;
// Room under the lowest card so its drop shadow isn't sliced off by the
// track's overflow-hidden.
const BOTTOM_MARGIN = 32;
// Keeps the outermost peeking cards clear of the track's side edges.
const SIDE_GUTTER = 8;
// Used until the first measurement lands (SSR / first paint).
const FALLBACK_TRACK_HEIGHT = 420;

// Cards size to their copy instead of a fixed height, so short descriptions
// don't leave a dead block at the bottom. The min-height keeps the typical
// 3–4 line cards uniform; longer copy simply grows the card.
const CARD_CLASSES =
  "flex min-h-[240px] flex-col items-start justify-start gap-3 rounded-2xl border border-white/10";

// The fanned arc is a desktop/tablet-only effect. Phones have no reliable
// hover and not enough width for peripheral cards to peek without either
// getting clipped or showing unreadable fragments of text — so mobile gets
// a plain one-card-at-a-time slider instead of the 3D fan.
const RADII: Record<Exclude<Breakpoint, "mobile">, { x: number; y: number }> = {
  tablet: { x: 270, y: 120 },
  desktop: { x: 420, y: 120 },
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

function getAngle(offset: number) {
  return (offset / VISIBLE_COUNT) * Math.PI;
}

function getScale(distance: number) {
  return Math.max(0, 1 - (distance / (HALF_VISIBLE + 1)) * 0.3);
}

// Anchored from the track's top edge (see TOP_MARGIN/button `top-0` below),
// not its vertical center. `-cos(angle)` is always <= 0, so centering the
// arc around the box's middle only ever pushes cards UP from there — never
// down — which left a real gap: cropped at the top if the box was sized to
// avoid it, or a dead zone at the bottom if it wasn't. This formula instead
// measures every card's offset from the highest point (the active card, at
// angle 0) directly, so the box can be sized to exactly what's used.
function getCardTop(offset: number, radiusY: number) {
  return TOP_MARGIN + radiusY * (1 - Math.cos(getAngle(offset)));
}

// Largest horizontal radius at which the outermost (scaled-down) cards still
// sit fully inside the track, capped at the breakpoint's design radius.
function getRadiusX(trackWidth: number, maxRadius: number) {
  const outerHalfWidth = (CARD_WIDTH * getScale(HALF_VISIBLE)) / 2;
  const fit =
    (trackWidth / 2 - outerHalfWidth - SIDE_GUTTER) /
    Math.sin(getAngle(HALF_VISIBLE));
  return Math.max(0, Math.min(maxRadius, fit));
}

// Cards scale around their center, so a card of height h at top y bottoms
// out at y + h/2 + scale·h/2. Sizing the track to the lowest of those, using
// the tallest card's height, guarantees no card is clipped at the bottom.
function getTrackHeight(cardHeight: number, radiusY: number) {
  let bottom = 0;
  for (let distance = 0; distance <= HALF_VISIBLE; distance++) {
    const top = getCardTop(distance, radiusY);
    bottom = Math.max(
      bottom,
      top + (cardHeight * (1 + getScale(distance))) / 2
    );
  }
  return Math.ceil(bottom + BOTTOM_MARGIN);
}

function getItemPosition(
  index: number,
  activeIndex: number,
  total: number,
  radiusX: number,
  radiusY: number
) {
  const offset = index - activeIndex;
  let adjustedOffset = offset;

  if (offset > HALF_VISIBLE) adjustedOffset = offset - total;
  if (offset < -HALF_VISIBLE) adjustedOffset = offset + total;

  // Only the intended VISIBLE_COUNT window (±half around the active card)
  // should ever render. The original demo checked against `half * 2` here,
  // which let extra, wrongly-angled cards from further around the wheel
  // slip through — visible as a stray misplaced card (and a gap where the
  // real one should be) at certain active indices.
  if (Math.abs(adjustedOffset) > HALF_VISIBLE) return null;

  const x = Math.sin(getAngle(adjustedOffset)) * radiusX - CARD_WIDTH / 2;
  const y = getCardTop(adjustedOffset, radiusY);

  const distance = Math.abs(adjustedOffset);
  const scale = getScale(distance);
  const opacity = Math.max(0.3, 1 - (distance / (HALF_VISIBLE + 1)) * 0.7);
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

function CardBody({
  item,
  isActive = true,
}: {
  item: CarouselItem;
  isActive?: boolean;
}) {
  return (
    <>
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
            "mt-2 text-sm leading-relaxed transition-colors duration-300",
            isActive ? "text-white/60" : "text-white/40"
          )}
        >
          {item.description}
        </p>
      </div>
    </>
  );
}

/** Invisible copies of every card stacked in one grid cell, so the stack is
 *  exactly as tall as the tallest card. */
function CardSizer({
  items,
  className,
  cardClassName,
  sizerRef,
}: {
  items: CarouselItem[];
  className?: string;
  cardClassName: string;
  sizerRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={sizerRef}
      aria-hidden
      className={cn("pointer-events-none invisible grid", className)}
    >
      {items.map((item) => (
        <div key={item.id} className={cn("[grid-area:1/1]", cardClassName)}>
          <CardBody item={item} />
        </div>
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
  const [trackSize, setTrackSize] = useState<{
    width: number;
    cardHeight: number;
  } | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sizerRef = useRef<HTMLDivElement | null>(null);
  const breakpoint = useBreakpoint();
  const radius = RADII[breakpoint === "mobile" ? "tablet" : breakpoint];

  const activeIndex = controlledIndex ?? internalIndex;
  const total = items.length;
  const activeItem = items[activeIndex];
  const isMobile = breakpoint === "mobile";

  // Track width drives the arc radius and the tallest card drives the track
  // height. Both shift with viewport size and web-font loading, hence the
  // observer rather than a one-off read.
  useEffect(() => {
    if (isMobile) return;
    const track = trackRef.current;
    const sizer = sizerRef.current;
    if (!track || !sizer) return;

    const update = () => {
      const width = track.clientWidth;
      const cardHeight = sizer.offsetHeight;
      setTrackSize((prev) =>
        prev && prev.width === width && prev.cardHeight === cardHeight
          ? prev
          : { width, cardHeight }
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(track);
    observer.observe(sizer);
    return () => observer.disconnect();
  }, [isMobile]);

  const radiusX = trackSize ? getRadiusX(trackSize.width, radius.x) : radius.x;
  const trackHeight = trackSize
    ? getTrackHeight(trackSize.cardHeight, radius.y)
    : FALLBACK_TRACK_HEIGHT;

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
           them or showing unreadable fragments of text. The in-flow sizer
           holds the box at the tallest card's height, so the controls below
           don't jump as cards of different lengths slide through. */
        <div className="relative w-full max-w-sm overflow-hidden">
          <CardSizer items={items} cardClassName={cn(CARD_CLASSES, "p-6")} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={cn(
                CARD_CLASSES,
                "absolute inset-x-0 top-0 bg-gradient-to-b from-[#0A1B3D]/90 to-[#060F26]/95 p-6"
              )}
            >
              <CardBody item={activeItem} />
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Tablet/desktop: the fanned circular track. */
        <div
          ref={trackRef}
          className="relative w-full max-w-6xl overflow-hidden"
          style={{ height: trackHeight }}
        >
          <CardSizer
            items={items}
            sizerRef={sizerRef}
            className="absolute left-0 top-0"
            cardClassName={cn(CARD_CLASSES, "w-[360px] p-7")}
          />
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => {
              const pos = getItemPosition(i, activeIndex, total, radiusX, radius.y);
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
                    CARD_CLASSES,
                    "absolute left-1/2 top-0 w-[360px] cursor-pointer overflow-hidden bg-gradient-to-b from-[#0A1B3D]/90 to-[#060F26]/95 p-7 backdrop-blur-sm transition-shadow duration-300",
                    isActive
                      ? "shadow-[0_20px_60px_-12px_rgba(3,37,225,0.45)]"
                      : "shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_32px_-4px_rgba(3,37,225,0.35)]"
                  )}
                  style={{ transformOrigin: "center center" }}
                >
                  <CardBody item={item} isActive={isActive} />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      )}

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
