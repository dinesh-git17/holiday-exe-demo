"use client";

import { motion } from "framer-motion";

import type { JSX } from "react";

export interface TechStackBadgeProps {
  /** Technology name */
  name: string;
  /** Icon component or emoji */
  icon: React.ReactNode;
  /** Optional description */
  description?: string;
  /** Animation delay in seconds */
  delay?: number;
}

/**
 * TechStackBadge - Displays a technology with icon and name
 * Used in the Outro section to show the tech stack
 */
export function TechStackBadge({
  name,
  icon,
  description,
  delay = 0,
}: TechStackBadgeProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group flex flex-col items-center gap-2"
    >
      {/* Icon container */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="border-terminal-green/30 bg-terminal-green/5 group-hover:border-terminal-green/50 group-hover:bg-terminal-green/10 flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-sm transition-colors sm:h-14 sm:w-14"
      >
        {icon}
      </motion.div>

      {/* Name */}
      <span className="text-terminal-green font-mono text-xs font-medium sm:text-sm">
        {name}
      </span>

      {/* Optional description */}
      {description && (
        <span className="text-terminal-green/50 text-center font-mono text-[10px]">
          {description}
        </span>
      )}
    </motion.div>
  );
}
