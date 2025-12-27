"use client";

import { motion } from "framer-motion";

import { MOBILE_UX, type Phase } from "@/lib/constants";
import { cn } from "@/lib/utils";

import type { JSX } from "react";

export interface MobilePhaseOverviewProps {
  /** Act number (1, 2, or 3) */
  actNumber: number;
  /** Act title (e.g., "Authentication") */
  actTitle: string;
  /** Array of phases for this act */
  phases: readonly Phase[];
  /** Callback when progress bar completes */
  onComplete: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * MobilePhaseOverview - Initial mobile view showing act overview
 * Displays compact phase indicators and a 5-second progress bar
 * Auto-transitions to phone view when progress completes
 */
export function MobilePhaseOverview({
  actNumber,
  actTitle,
  phases,
  onComplete,
  className,
}: MobilePhaseOverviewProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex min-h-screen flex-col items-center justify-center px-6",
        className
      )}
    >
      {/* Act header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-8 text-center"
      >
        <span className="text-matrix-green/60 mb-2 block font-mono text-sm tracking-widest uppercase">
          Act {actNumber}
        </span>
        <h2 className="text-matrix-green font-mono text-3xl font-bold">
          {actTitle}
        </h2>
      </motion.div>

      {/* Phase indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mb-12 flex items-center gap-4"
      >
        {phases.map((phase, index) => (
          <motion.div
            key={phase.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="border-matrix-green/40 bg-matrix-green/10 flex h-10 w-10 items-center justify-center rounded-full border">
              <span className="text-matrix-green font-mono text-sm font-bold">
                {index + 1}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress bar container */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="w-full max-w-xs"
      >
        <div className="mb-2 text-center">
          <span className="text-matrix-green/60 font-mono text-xs tracking-wider uppercase">
            Loading experience...
          </span>
        </div>

        {/* Progress bar track */}
        <div className="bg-matrix-green/20 h-1 w-full overflow-hidden rounded-full">
          {/* Progress bar fill */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: MOBILE_UX.OVERVIEW_DURATION_MS / 1000,
              ease: "linear",
            }}
            onAnimationComplete={onComplete}
            className="bg-matrix-green h-full rounded-full shadow-[0_0_8px_rgba(0,255,65,0.6)]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
