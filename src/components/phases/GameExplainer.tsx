"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { GAME_CONFIG } from "@/lib/constants";

import type { JSX } from "react";

export interface GameExplainerProps {
  /** Optional callback when explanation is complete */
  onComplete?: () => void;
}

interface GameIconProps {
  src: string;
  alt: string;
  label: string;
  sublabel: string;
  delay: number;
  variant: "collect" | "avoid";
}

const ICON_SIZE = 48;

function GameIcon({
  src,
  alt,
  label,
  sublabel,
  delay,
  variant,
}: GameIconProps): JSX.Element {
  const glowColor =
    variant === "collect" ? "rgba(255, 100, 100, 0.6)" : "rgba(255, 0, 0, 0.6)";
  const borderColor =
    variant === "collect" ? "border-red-400/40" : "border-red-600/40";
  const bgColor = variant === "collect" ? "bg-red-900/20" : "bg-red-950/30";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-3"
    >
      <motion.div
        animate={{
          boxShadow: [
            `0 0 0 ${glowColor}`,
            `0 0 20px ${glowColor}`,
            `0 0 0 ${glowColor}`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={`rounded-xl border p-3 ${borderColor} ${bgColor}`}
      >
        <Image
          src={src}
          alt={alt}
          width={ICON_SIZE}
          height={ICON_SIZE}
          className="drop-shadow-lg"
        />
      </motion.div>
      <div className="text-center">
        <p className="text-terminal-green font-mono text-sm font-semibold">
          {label}
        </p>
        <p className="text-terminal-green/60 font-mono text-xs">{sublabel}</p>
      </div>
    </motion.div>
  );
}

/**
 * GameExplainer - Displays game mechanics overview
 * Shows collectible hearts and obstacle glitches with animations
 */
export function GameExplainer({ onComplete }: GameExplainerProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onAnimationComplete={onComplete}
      className="flex h-full flex-col items-center justify-center p-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-8 text-center"
      >
        <h3 className="text-terminal-green font-mono text-lg font-bold">
          MISSION OBJECTIVES
        </h3>
        <div className="bg-terminal-green/30 mx-auto mt-2 h-px w-24" />
      </motion.div>

      {/* Game icons grid */}
      <div className="flex items-center justify-center gap-10">
        <GameIcon
          src={GAME_CONFIG.HEART_ICON}
          alt="Heart token"
          label="COLLECT"
          sublabel="+1 Love"
          delay={0.4}
          variant="collect"
        />
        <GameIcon
          src={GAME_CONFIG.GLITCH_ICON}
          alt="Glitch obstacle"
          label="AVOID"
          sublabel="Hazard"
          delay={0.6}
          variant="avoid"
        />
      </div>

      {/* Status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1 }}
        className="mt-10"
      >
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-terminal-green/60 font-mono text-xs tracking-widest"
        >
          [ READY FOR DEPLOYMENT ]
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
