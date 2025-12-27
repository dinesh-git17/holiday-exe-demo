"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { HAPTIC_DURATION_MS, SCAN_DURATION_MS } from "@/lib/constants";

import { FingerprintIcon } from "./FingerprintIcon";

import type { JSX } from "react";

export interface FingerprintScannerProps {
  /** Callback when scan completes (optional for showcase) */
  onScanComplete?: () => void;
}

type ScanState = "idle" | "scanning" | "success";

export function FingerprintScanner({
  onScanComplete,
}: FingerprintScannerProps): JSX.Element {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);

  const cancelAnimation = useCallback((): void => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const triggerHaptic = useCallback((): void => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(HAPTIC_DURATION_MS);
    }
  }, []);

  const handleScanComplete = useCallback((): void => {
    cancelAnimation();
    setScanState("success");
    setProgress(100);
    triggerHaptic();
    onScanComplete?.();
  }, [cancelAnimation, onScanComplete, triggerHaptic]);

  const handlePressStart = useCallback((): void => {
    if (scanState === "success") {
      return;
    }

    setScanState("scanning");
    startTimeRef.current = performance.now();
    lastUpdateRef.current = 0;

    const animate = (currentTime: number): void => {
      const elapsed = currentTime - startTimeRef.current;
      const newProgress = Math.min((elapsed / SCAN_DURATION_MS) * 100, 100);

      // Only update state every ~50ms to reduce re-renders
      if (currentTime - lastUpdateRef.current > 50) {
        lastUpdateRef.current = currentTime;
        setProgress(newProgress);
      }

      if (newProgress >= 100) {
        handleScanComplete();
      } else {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [scanState, handleScanComplete]);

  const handlePressEnd = useCallback((): void => {
    if (scanState === "success") {
      return;
    }

    cancelAnimation();
    setScanState("idle");
    setProgress(0);
  }, [scanState, cancelAnimation]);

  useEffect((): (() => void) => {
    return (): void => {
      cancelAnimation();
    };
  }, [cancelAnimation]);

  const getIconColorClass = (): string => {
    switch (scanState) {
      case "idle":
        return "text-white/50";
      case "scanning":
        return "text-terminal-green";
      case "success":
        return "text-terminal-green drop-shadow-[0_0_20px_rgba(0,255,65,0.8)]";
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      <p className="font-mono text-sm tracking-widest text-white/60 uppercase">
        Place finger to authenticate
      </p>

      <div
        className="relative flex h-40 w-40 cursor-pointer items-center justify-center select-none"
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onTouchCancel={handlePressEnd}
      >
        {/* Outer ring with progress */}
        <svg className="absolute h-full w-full" viewBox="0 0 160 160">
          {/* Background ring */}
          <circle
            cx="80"
            cy="80"
            r="75"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          {/* Progress ring */}
          <circle
            cx="80"
            cy="80"
            r="75"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 75}
            strokeDashoffset={2 * Math.PI * 75 * (1 - progress / 100)}
            className="text-terminal-green"
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "center",
              transition: "stroke-dashoffset 80ms linear",
              willChange: "stroke-dashoffset",
            }}
          />
        </svg>

        {/* Fingerprint icon */}
        <motion.div
          animate={
            scanState === "scanning"
              ? {
                  scale: [1, 1.02, 1],
                }
              : {}
          }
          transition={{
            duration: 0.5,
            repeat: scanState === "scanning" ? Infinity : 0,
            ease: "easeInOut",
          }}
          className="relative z-10"
        >
          <FingerprintIcon
            className={`h-20 w-20 transition-colors duration-300 ${getIconColorClass()}`}
          />
        </motion.div>

        {/* Scan beam */}
        <AnimatePresence>
          {scanState === "scanning" && (
            <motion.div
              initial={{ top: "20%", opacity: 0 }}
              animate={{
                top: ["20%", "80%", "20%"],
                opacity: [0.8, 0.8, 0.8],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="via-terminal-green absolute left-1/2 h-0.5 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent"
            />
          )}
        </AnimatePresence>

        {/* Success glow effect */}
        <AnimatePresence>
          {scanState === "success" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-terminal-green/30 absolute inset-0 rounded-full"
            />
          )}
        </AnimatePresence>

        {/* Tooltip spotlight - only show in idle state */}
        <AnimatePresence>
          {scanState === "idle" && (
            <>
              {/* Pulsing spotlight ring */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 0.3, 0.6],
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="border-terminal-green/50 pointer-events-none absolute inset-0 rounded-full border-2"
              />

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <div className="bg-terminal-green/20 border-terminal-green/40 text-terminal-green rounded-md border px-3 py-1.5 font-mono text-xs backdrop-blur-sm">
                  Hold to scan
                </div>
                {/* Tooltip arrow */}
                <div className="border-b-terminal-green/40 absolute -top-1 left-1/2 h-0 w-0 -translate-x-1/2 border-x-4 border-b-4 border-x-transparent" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <p className="text-terminal-green/80 h-5 font-mono text-xs">
        {scanState === "scanning" && `Scanning... ${Math.round(progress)}%`}
        {scanState === "success" && "Access Granted"}
      </p>
    </div>
  );
}
