"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { COUNTDOWN_INTERVAL_MS, COUNTDOWN_STEPS } from "@/lib/constants";

import type { JSX } from "react";

export interface CountdownProps {
  /** Callback when countdown completes (optional for showcase) */
  onComplete?: () => void;
}

export function Countdown({ onComplete }: CountdownProps): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const hasCompletedRef = useRef(false);

  // Progress through countdown steps
  useEffect((): (() => void) => {
    if (hasCompletedRef.current) {
      return (): void => {};
    }

    // If we've reached the last step, wait for it to display then complete
    if (currentStep >= COUNTDOWN_STEPS.length - 1) {
      const timeout = setTimeout((): void => {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete?.();
        }
      }, COUNTDOWN_INTERVAL_MS);

      return (): void => {
        clearTimeout(timeout);
      };
    }

    // Move to next step
    const timeout = setTimeout((): void => {
      setCurrentStep((prev) => prev + 1);
    }, COUNTDOWN_INTERVAL_MS);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [currentStep, onComplete]);

  const currentText = COUNTDOWN_STEPS[currentStep];
  const isLastStep = currentStep === COUNTDOWN_STEPS.length - 1;

  return (
    <div className="bg-midnight/60 absolute inset-0 z-50 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className={`font-mono font-bold ${
            isLastStep
              ? "text-romance-gold text-4xl sm:text-6xl"
              : "text-terminal-green text-5xl sm:text-7xl"
          }`}
        >
          {currentText}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
