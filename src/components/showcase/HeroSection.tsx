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
          <h1 className="text-matrix-green font-mono text-3xl font-bold tracking-tight md:text-5xl">
            HOLIDAY.EXE
          </h1>
          <p className="text-matrix-green/60 mt-1 font-mono text-base">
            North Pole Connection
          </p>
        </motion.div>

        {/* Phone with splash screen - scaled down for hero visibility */}
        <PhoneFrame scale={0.75}>
          <div className="relative h-full w-full">
            <Image
              src={ASSETS.SPLASH_SCREEN}
              alt="North Pole Connection splash screen"
              fill
              priority
              className="object-cover"
              sizes="210px"
            />
          </div>
        </PhoneFrame>

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
