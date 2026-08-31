"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();

  // Reset scroll to the top on each route change (template re-mounts per route)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={
        reduce ? { duration: 0.15 } : { duration: 0.55, ease: EASE, when: "beforeChildren" }
      }
    >
      {children}
    </motion.div>
  );
}
