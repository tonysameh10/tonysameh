"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { blurUp } from "@/lib/motion";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}

export function FadeUp({
  children,
  className,
  delay = 0,
  as = "div",
}: FadeUpProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22, filter: "blur(6px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: reduce ? 0.15 : 0.7, delay, ease: [0.22, 1, 0.36, 1] },
      }}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </Comp>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

export function Stagger({ children, className }: StaggerProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : "hidden"}
      whileInView={reduce ? { opacity: 1 } : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

export function StaggerItem({ children, className, variants }: StaggerItemProps) {
  return (
    <motion.div variants={variants ?? blurUp} className={className}>
      {children}
    </motion.div>
  );
}
