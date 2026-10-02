"use client";

import React, { useEffect, useRef, useState } from "react";

interface CountUpValueProps {
  value: string;
  start: boolean;
  duration?: number;
}

const parseValue = (value: string) => {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { number: null, decimals: 0, suffix: value };
  const [, numberStr, suffix] = match;
  const decimals = numberStr.includes(".") ? numberStr.split(".")[1].length : 0;
  return { number: parseFloat(numberStr), decimals, suffix };
};

const CountUpValue = ({ value, start, duration = 1500 }: CountUpValueProps) => {
  const { number, decimals, suffix } = parseValue(value);
  const [display, setDisplay] = useState(number === null ? value : (0).toFixed(decimals));
  const hasRun = useRef(false);

  useEffect(() => {
    if (!start || hasRun.current || number === null) return;
    hasRun.current = true;

    const startTime = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay((number * eased).toFixed(decimals));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, number, decimals, duration]);

  if (number === null) return <>{value}</>;

  return (
    <>
      {display}
      {suffix}
    </>
  );
};

export default CountUpValue;
