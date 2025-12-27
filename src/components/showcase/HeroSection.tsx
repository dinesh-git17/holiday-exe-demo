"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { MatrixRain } from "@/components/effects/MatrixRain";
import { PhoneFrame } from "@/components/showcase/PhoneFrame";
import { ASSETS, Z_INDEX } from "@/lib/constants";
import { cn } from "@/lib/utils";

import type { JSX } from "react";

export interface HeroSectionProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * HeroSection - Landing view with matrix rain background
 * Displays the iPhone with splash screen and "HOLIDAY.EXE" title
 */
export function HeroSection({ className }: HeroSectionProps): JSX.Element {
  return (
    <section
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black",
        className
      )}
    >
      {/* Matrix rain background - dimmed to not steal focus */}
      <MatrixRain
        className="pointer-events-none absolute inset-0"
        opacity={0.4}
      />

      {/* Vignette overlay - darkens edges to focus attention on center */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      />

      {/* Content container */}
      <div
        className="relative z-10 flex flex-col items-center gap-6 px-4"
        style={{ zIndex: Z_INDEX.UI_OVERLAY }}
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="animate-glitch text-matrix-green font-mono text-3xl font-bold tracking-tight md:text-5xl">
            HOLIDAY.EXE
          </h1>
          <p className="text-status-red mt-2 font-mono text-sm tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,68,68,0.5)]">
            North Pole Connection
          </p>
        </motion.div>

        {/* Phone with splash screen - scaled down for hero visibility */}
        <div className="relative">
          {/* Pedestal glow - ambient light behind phone */}
          <div
            className="animate-pulse-glow pointer-events-none absolute inset-0 -z-10 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0, 255, 65, 0.3) 0%, rgba(0, 255, 65, 0.1) 40%, transparent 70%)",
              transform: "scale(1.5)",
            }}
          />
          <PhoneFrame scale={0.75}>
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={ASSETS.SPLASH_SCREEN}
                alt="North Pole Connection splash screen"
                fill
                priority
                className="object-cover"
                sizes="210px"
              />
              {/* Scanline overlay for "breathing" effect */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="animate-scanline absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
              </div>
              {/* Subtle screen flicker overlay */}
              <div className="bg-matrix-green/5 pointer-events-none absolute inset-0 mix-blend-overlay" />
            </div>
          </PhoneFrame>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-4"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-matrix-green/60 font-mono text-sm">
              [ SCROLL TO EXPLORE ]
            </span>
            <svg
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
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient overlay at bottom for scroll transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
