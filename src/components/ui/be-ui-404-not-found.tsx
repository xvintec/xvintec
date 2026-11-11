"use client";

import { type ReactNode, useEffect, useState } from "react";

import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils/utils";

// Adapted from the be-ui 404 glitch component: site colours instead of shadcn
// tokens, the brand gradient button, a single "Go home" action, and
// framer-motion (already installed) in place of the `motion` package.

const NOT_FOUND_DEFAULTS = {
  code: "404",
  title: "Page not found",
  description: "The page you are looking for does not exist or has been moved.",
  homeHref: "/",
  homeLabel: "Go home",
};

export interface NotFoundProps {
  className?: string;
  code?: string;
  title?: string;
  description?: string;
  homeHref?: string;
  homeLabel?: string;
}

function NotFoundStage({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "flex min-h-[520px] w-full flex-col items-center justify-center gap-8 px-6 py-20 text-center",
        className
      )}
    >
      {children}
    </section>
  );
}

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&@$?/\\";
const SCRAMBLE_MS = 700;
const TICK_MS = 45;

function Scramble({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }

    const chars = text.split("");
    const start = performance.now();
    let raf = 0;
    let last = 0;

    const loop = (now: number) => {
      if (now - last >= TICK_MS) {
        last = now;

        const progress = Math.min((now - start) / SCRAMBLE_MS, 1);
        const settled = Math.floor(progress * chars.length);

        setDisplay(
          chars
            .map((ch, i) =>
              i < settled || ch === " "
                ? ch
                : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            )
            .join("")
        );
      }

      if (now - start < SCRAMBLE_MS) {
        raf = requestAnimationFrame(loop);
      } else {
        setDisplay(text);
      }
    };

    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [text, reduce]);

  return <span className="tabular-nums">{display}</span>;
}

export function NotFoundGlitch({
  className,
  code = NOT_FOUND_DEFAULTS.code,
  title = NOT_FOUND_DEFAULTS.title,
  description = NOT_FOUND_DEFAULTS.description,
  homeHref = NOT_FOUND_DEFAULTS.homeHref,
  homeLabel = NOT_FOUND_DEFAULTS.homeLabel,
}: NotFoundProps) {
  return (
    <NotFoundStage className={className}>
      <div className="group relative select-none font-mono font-bold leading-none tracking-tighter [font-size:clamp(5rem,18vw,11rem)]">
        {/* Hover glitch: brand cyan/blue copies split either side. Multiply
            (not screen) because the page background is light. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 text-[#0DAAE9] opacity-0 mix-blend-multiply transition-[transform,opacity] duration-150 ease-out group-hover:translate-x-[3px] group-hover:opacity-70 motion-reduce:hidden"
        >
          <Scramble text={code} />
        </span>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 text-[#0325E1] opacity-0 mix-blend-multiply transition-[transform,opacity] duration-150 ease-out group-hover:-translate-x-[3px] group-hover:opacity-70 motion-reduce:hidden"
        >
          <Scramble text={code} />
        </span>

        <h1 className="relative bg-[linear-gradient(105deg,#0DAAE9_0%,#0325E1_100%)] bg-clip-text text-transparent">
          <Scramble text={code} />
        </h1>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl font-semibold text-h1-black md:text-3xl">
          {title}
        </p>
        <p className="max-w-sm font-light text-p-grey">{description}</p>
      </div>

      <Link
        href={homeHref}
        className="btn-primary group/btn inline-flex min-w-40 items-center justify-center gap-2 rounded-full px-8 py-3 text-[15px] font-medium transition-all duration-300 active:scale-[0.97]"
      >
        {homeLabel}
        <ArrowUpRight
          size={18}
          strokeWidth={2}
          className="shrink-0 transition-transform duration-300 group-hover/btn:rotate-45"
        />
      </Link>
    </NotFoundStage>
  );
}
