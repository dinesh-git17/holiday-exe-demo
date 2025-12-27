"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import type { JSX } from "react";

export interface MissionBriefingProps {
  /** Callback when initiate is clicked (optional for showcase) */
  onInitiate?: () => void;
}

const MISSION_TITLE = "MISSION: RESTORE CONNECTION";

export function MissionBriefing({
  onInitiate,
}: MissionBriefingProps): JSX.Element {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isTitleComplete, setIsTitleComplete] = useState(false);

  // Typewriter effect for mission title
  useEffect((): (() => void) => {
    let currentIndex = 0;
    const interval = setInterval((): void => {
      if (currentIndex < MISSION_TITLE.length) {
        currentIndex++;
        setDisplayedTitle(MISSION_TITLE.slice(0, currentIndex));
      } else {
        clearInterval(interval);
        setIsTitleComplete(true);
      }
    }, 60);

    return (): void => {
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-midnight/90 absolute inset-0 z-50 flex flex-col items-center justify-center p-4"
    >
      {/* HUD Frame */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="border-terminal-green/40 bg-midnight/60 flex w-full max-w-xs flex-col gap-4 rounded-lg border-2 p-4 backdrop-blur-sm"
      >
        {/* Mission Header */}
        <div className="border-terminal-green/30 border-b pb-3">
          <div className="text-terminal-green/60 mb-1 font-mono text-[10px] tracking-widest uppercase">
            CLASSIFIED BRIEFING
          </div>
          <h1 className="text-terminal-green font-mono text-sm font-bold sm:text-base">
            {displayedTitle}
            {!isTitleComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="bg-terminal-green ml-1 inline-block h-4 w-1.5"
              />
            )}
          </h1>
        </div>

        {/* Target Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="flex items-center gap-3"
        >
          {/* Glitch effect container */}
          <div className="relative">
            <motion.div
              animate={{
                x: [0, -2, 2, -1, 1, 0],
                opacity: [1, 0.8, 1, 0.9, 1],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="border-romance-gold/60 relative h-14 w-14 overflow-hidden rounded-lg border-2"
            >
              <Image
                src="/assets/characters/dinn_heart.png"
                alt="Subject: Dinn"
                fill
                className="object-contain"
                unoptimized
              />
              {/* Scanline overlay for weak signal effect */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-50" />
            </motion.div>
            {/* Glitch color artifacts */}
            <motion.div
              animate={{
                opacity: [0, 0.3, 0, 0.2, 0],
                x: [0, 3, -2, 1, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 2.5,
              }}
              className="pointer-events-none absolute inset-0 h-14 w-14 overflow-hidden rounded-lg mix-blend-screen"
            >
              <div className="absolute inset-0 translate-x-1 bg-cyan-500/30" />
            </motion.div>
            <motion.div
              animate={{
                opacity: [0, 0.2, 0, 0.3, 0],
                x: [0, -3, 2, -1, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 2.7,
              }}
              className="pointer-events-none absolute inset-0 h-14 w-14 overflow-hidden rounded-lg mix-blend-screen"
            >
              <div className="absolute inset-0 -translate-x-1 bg-red-500/30" />
            </motion.div>
          </div>
          <div>
            <div className="text-terminal-green/60 font-mono text-[10px] uppercase">
              Target
            </div>
            <div className="text-romance-gold font-mono text-sm font-bold">
              SUBJECT: DINN
            </div>
            <motion.div
              animate={{ opacity: [0.8, 1, 0.6, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="font-mono text-[10px] text-red-400"
            >
              Status: SIGNAL WEAK
            </motion.div>
          </div>
        </motion.div>

        {/* Objectives */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="space-y-2"
        >
          {/* Objective */}
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6 shrink-0">
              <Image
                src="/assets/game/token_heart.png"
                alt="Heart"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div>
              <div className="text-terminal-green/60 font-mono text-[10px] uppercase">
                Objective
              </div>
              <div className="text-terminal-green font-mono text-[10px]">
                Collect hearts to boost signal
              </div>
            </div>
          </div>

          {/* Hazard */}
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6 shrink-0">
              <Image
                src="/assets/game/obstacle_glitch.png"
                alt="Glitch"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div>
              <div className="font-mono text-[10px] text-red-400/80 uppercase">
                Hazard
              </div>
              <div className="font-mono text-[10px] text-red-400">
                Avoid glitches to prevent disconnect
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          className="bg-terminal-green/10 rounded-md p-2 text-center"
        >
          <div className="text-terminal-green/80 font-mono text-[10px]">
            TAP / SPACE / ↑ to jump
          </div>
        </motion.div>

        {/* Initiate Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onInitiate}
          type="button"
          className="bg-terminal-green text-midnight relative min-h-[44px] w-full rounded-lg py-3 font-mono text-sm font-bold transition-colors hover:bg-white"
        >
          <motion.span
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            INITIATE SEQUENCE
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
