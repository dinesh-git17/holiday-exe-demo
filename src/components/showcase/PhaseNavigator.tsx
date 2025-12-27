"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import type { JSX } from "react";

export interface PhaseNavigatorProps {
  /** Current phase index (0-based) */
  currentPhase: number;
  /** Total number of phases */
  totalPhases: number;
  /** Whether previous navigation is available */
  hasPrev: boolean;
  /** Whether next navigation is available */
  hasNext: boolean;
  /** Callback when previous is clicked */
  onPrev: () => void;
  /** Callback when next is clicked */
  onNext: () => void;
  /** Additional CSS classes */
  className?: string;
}

const BUTTON_SIZE = 44; // Minimum touch target size

/**
 * PhaseNavigator - Arrow controls and phase indicator dots
 * Allows manual navigation between phases
 */
export function PhaseNavigator({
  currentPhase,
  totalPhases,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  className,
}: PhaseNavigatorProps): JSX.Element {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Phase indicator dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPhases }).map((_, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              scale: index === currentPhase ? 1 : 0.75,
              opacity: index === currentPhase ? 1 : 0.4,
            }}
            transition={{ duration: 0.2 }}
            className={cn(
              "h-2 w-2 rounded-full",
              index === currentPhase
                ? "bg-matrix-green shadow-[0_0_8px_rgba(0,255,65,0.6)]"
                : "bg-matrix-green/40"
            )}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center gap-4">
        <motion.button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          whileHover={hasPrev ? { scale: 1.1 } : undefined}
          whileTap={hasPrev ? { scale: 0.95 } : undefined}
          className={cn(
            "flex items-center justify-center rounded-full border transition-colors",
            hasPrev
              ? "border-matrix-green/60 text-matrix-green hover:bg-matrix-green/10"
              : "border-matrix-green/20 text-matrix-green/20 cursor-not-allowed"
          )}
          style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
          aria-label="Previous phase"
        >
          <ChevronLeft size={24} />
        </motion.button>

        <span className="text-matrix-green/60 min-w-16 text-center font-mono text-sm">
          {currentPhase + 1} / {totalPhases}
        </span>

        <motion.button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          whileHover={hasNext ? { scale: 1.1 } : undefined}
          whileTap={hasNext ? { scale: 0.95 } : undefined}
          className={cn(
            "flex items-center justify-center rounded-full border transition-colors",
            hasNext
              ? "border-matrix-green/60 text-matrix-green hover:bg-matrix-green/10"
              : "border-matrix-green/20 text-matrix-green/20 cursor-not-allowed"
          )}
          style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
          aria-label="Next phase"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>
    </div>
  );
}
