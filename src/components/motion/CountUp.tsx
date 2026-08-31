"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";

interface CountUpProps {
  value: string;
  suffix?: string;
  className?: string;
}

function isNumeric(value: string): boolean {
  return /^\d+$/.test(value);
}

export function CountUp({ value, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    if (reduce || !isNumeric(value)) return;

    const controls = animate(0, parseInt(value), {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });

    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className={className} dir="ltr">
      {display}
      {suffix}
    </span>
  );
}
