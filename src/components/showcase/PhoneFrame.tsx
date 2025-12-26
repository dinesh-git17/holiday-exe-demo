"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { ASSETS, Z_INDEX } from "@/lib/constants";
import { cn } from "@/lib/utils";

import type { JSX, ReactNode } from "react";

export interface PhoneFrameProps {
  /** Content to display inside the phone screen */
  children: ReactNode;
  /** Additional CSS classes for the container */
  className?: string;
  /** Whether to animate the phone on mount */
  animate?: boolean;
  /** Scale factor for the phone size (default: 1) */
  scale?: number;
}

// iPhone frame dimensions (based on iPhone 15 Pro aspect ratio)
const PHONE_ASPECT_RATIO = 19.5 / 9;
const PHONE_WIDTH = 280;
const PHONE_HEIGHT = PHONE_WIDTH * PHONE_ASPECT_RATIO;

// Screen inset percentages (where content appears within the frame)
const SCREEN_INSET = {
  TOP: "3.5%",
  RIGHT: "5.5%",
  BOTTOM: "3.5%",
  LEFT: "5.5%",
  BORDER_RADIUS: "32px",
} as const;

/**
 * PhoneFrame - iPhone mockup container for app content
 * Uses next/image for optimized loading of the frame asset
 * Content is positioned within the screen area
 */
export function PhoneFrame({
  children,
  className,
  animate = true,
  scale = 1,
}: PhoneFrameProps): JSX.Element {
  const scaledWidth = PHONE_WIDTH * scale;
  const scaledHeight = PHONE_HEIGHT * scale;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.div
      initial={animate ? "hidden" : "visible"}
      animate="visible"
      variants={containerVariants}
      className={cn("relative", className)}
      style={{
        width: scaledWidth,
        height: scaledHeight,
      }}
    >
      {/* Screen content area */}
      <div
        className="absolute overflow-hidden bg-black"
        style={{
          top: SCREEN_INSET.TOP,
          right: SCREEN_INSET.RIGHT,
          bottom: SCREEN_INSET.BOTTOM,
          left: SCREEN_INSET.LEFT,
          borderRadius: SCREEN_INSET.BORDER_RADIUS,
          zIndex: Z_INDEX.PHONE_CONTENT,
        }}
      >
        {children}
      </div>

      {/* iPhone frame overlay */}
      <Image
        src={ASSETS.IPHONE_FRAME}
        alt=""
        fill
        priority
        className="pointer-events-none object-contain"
        style={{ zIndex: Z_INDEX.PHONE_FRAME }}
        sizes={`${scaledWidth}px`}
      />
    </motion.div>
  );
}
