"use client";

import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

import type { JSX } from "react";

export interface ScrollIndicatorProps {
  /** Whether to show the indicator */
  visible: boolean;
  /** Text to display */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ScrollIndicator - Animated indicator prompting user to scroll
 * Appears at the bottom of a section when on the final phase
 */
export function ScrollIndicator({
  visible,
  label = "CONTINUE",
  className,
}: ScrollIndicatorProps): JSX.Element {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2",
            className
          )}
        >
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-matrix-green/60 font-mono text-xs tracking-widest"
          >
            [ {label} ]
          </motion.span>
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-matrix-green/60"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
