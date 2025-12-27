"use client";

import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

import type { JSX } from "react";

export interface PhaseCardProps {
  /** Phase title */
  title: string;
  /** Phase description */
  description: string;
  /** Current phase number (1-based for display) */
  phaseNumber: number;
  /** Total number of phases */
  totalPhases: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * PhaseCard - Right-side info panel displaying phase details
 * Animates content on phase change
 */
export function PhaseCard({
  title,
  description,
  phaseNumber,
  totalPhases,
  className,
}: PhaseCardProps): JSX.Element {
  return (
    <div
      className={cn(
        "border-matrix-green/20 bg-showcase-dark/80 rounded-lg border p-6 backdrop-blur-sm",
        className
      )}
    >
      {/* Phase label */}
      <div className="text-matrix-green/50 mb-4 font-mono text-xs tracking-widest uppercase">
        Phase {phaseNumber} of {totalPhases}
      </div>

      {/* Animated content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`phase-${phaseNumber}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Title */}
          <h3 className="text-matrix-green mb-3 font-mono text-xl font-semibold">
            {title}
          </h3>

          {/* Description */}
          <p className="text-foreground/70 leading-relaxed">{description}</p>
        </motion.div>
      </AnimatePresence>

      {/* Decorative border glow */}
      <div className="bg-matrix-green/20 mt-6 h-px w-full" />
    </div>
  );
}
