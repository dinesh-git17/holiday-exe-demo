"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  ASSETS,
  INTEL_BOOT_SEQUENCE,
  INTEL_BOOT_TIMING,
  INTEL_BRIEFING,
} from "@/lib/constants";

import type { JSX } from "react";

export interface IntelBriefingProps {
  /** Callback when sequence completes */
  onComplete?: () => void;
}

type ViewState = "BRIEFING" | "DECRYPTING" | "COMPLETE";

// Characters used for scrambled/encrypted text effect
const DECRYPT_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEF";

/**
 * Generates a scrambled version of a string with some characters revealed
 */
function getScrambledText(target: string, revealedCount: number): string {
  return target
    .split("")
    .map((char, index) => {
      if (index < revealedCount) {
        return char;
      }
      if (char === " ") {
        return " ";
      }
      return DECRYPT_CHARS[Math.floor(Math.random() * DECRYPT_CHARS.length)];
    })
    .join("");
}

/**
 * DecryptingLine - Single line that decrypts with scramble effect
 */
interface DecryptingLineProps {
  text: string;
  isActive: boolean;
  isComplete: boolean;
  isLastLine: boolean;
}

function DecryptingLine({
  text,
  isActive,
  isComplete,
  isLastLine,
}: DecryptingLineProps): JSX.Element {
  const [displayedText, setDisplayedText] = useState(
    isComplete ? text : getScrambledText(text, 0)
  );

  useEffect((): (() => void) | undefined => {
    if (!isActive || isComplete) {
      if (isComplete) {
        setDisplayedText(text);
      }
      return undefined;
    }

    const totalChars = text.length;
    const totalSteps = Math.ceil(
      INTEL_BOOT_TIMING.DECRYPT_DURATION_MS /
        INTEL_BOOT_TIMING.DECRYPT_INTERVAL_MS
    );
    let step = 0;

    setDisplayedText(getScrambledText(text, 0));

    const interval = setInterval((): void => {
      step++;
      const revealedCount = Math.floor((step / totalSteps) * totalChars);

      if (revealedCount >= totalChars) {
        clearInterval(interval);
        setDisplayedText(text);
      } else {
        setDisplayedText(getScrambledText(text, revealedCount));
      }
    }, INTEL_BOOT_TIMING.DECRYPT_INTERVAL_MS);

    return (): void => {
      clearInterval(interval);
    };
  }, [isActive, isComplete, text]);

  const showHearts = isLastLine && isComplete;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isComplete ? 0.6 : 1,
        y: 0,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex items-center justify-center gap-2 font-mono text-sm sm:text-base ${
        isComplete ? "text-terminal-green/60" : "text-terminal-green"
      } ${isLastLine && isComplete ? "!text-terminal-green !opacity-100" : ""}`}
    >
      {showHearts && <Heart className="h-3 w-3 text-red-400 sm:h-4 sm:w-4" />}
      <span>{displayedText}</span>
      {showHearts && <Heart className="h-3 w-3 text-red-400 sm:h-4 sm:w-4" />}
    </motion.div>
  );
}

/**
 * BriefingCard - Initial briefing view
 */
interface BriefingCardProps {
  onAutoStart: () => void;
}

function BriefingCard({ onAutoStart }: BriefingCardProps): JSX.Element {
  const [displayedHeader, setDisplayedHeader] = useState("");
  const [isHeaderComplete, setIsHeaderComplete] = useState(false);

  // Typewriter effect for header
  useEffect((): (() => void) => {
    let currentIndex = 0;
    const interval = setInterval((): void => {
      if (currentIndex < INTEL_BRIEFING.HEADER.length) {
        currentIndex++;
        setDisplayedHeader(INTEL_BRIEFING.HEADER.slice(0, currentIndex));
      } else {
        clearInterval(interval);
        setIsHeaderComplete(true);
      }
    }, 50);

    return (): void => {
      clearInterval(interval);
    };
  }, []);

  // Auto-start after header completes
  useEffect((): (() => void) => {
    if (!isHeaderComplete) {
      return (): void => {};
    }

    const timeout = setTimeout((): void => {
      onAutoStart();
    }, 2000);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [isHeaderComplete, onAutoStart]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="border-terminal-green/40 bg-midnight/60 flex w-full flex-col gap-4 rounded-lg border-2 p-4 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="border-terminal-green/30 border-b pb-3">
        <div className="text-terminal-green/60 mb-1 font-mono text-[10px] tracking-widest uppercase">
          PRIORITY: ALPHA
        </div>
        <h1 className="text-terminal-green font-mono text-sm font-bold sm:text-base">
          {displayedHeader}
          {!isHeaderComplete && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="bg-terminal-green ml-1 inline-block h-4 w-1.5"
            />
          )}
        </h1>
      </div>

      {/* Subject Image with scanning effect */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="flex items-center gap-3"
      >
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
            className="border-romance-gold/60 relative h-12 w-12 overflow-hidden rounded-lg border-2"
          >
            <Image
              src={ASSETS.DINN_WAVE}
              alt="Subject: Dinn"
              fill
              className="object-contain"
              unoptimized
            />
            {/* Scanline overlay */}
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="via-terminal-green/20 pointer-events-none absolute inset-0 h-4 bg-gradient-to-b from-transparent to-transparent"
            />
          </motion.div>
        </div>
        <div>
          <div className="text-terminal-green/60 font-mono text-[10px] uppercase">
            Subject
          </div>
          <div className="text-romance-gold font-mono text-sm font-bold">
            DINN
          </div>
          <motion.div
            animate={{ opacity: [0.8, 1, 0.6, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-terminal-green font-mono text-[10px]"
          >
            SIGNAL SECURED
          </motion.div>
        </div>
      </motion.div>

      {/* Body Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="bg-terminal-green/5 rounded-md p-3"
      >
        <p className="text-terminal-green/90 font-mono text-[10px] leading-relaxed whitespace-pre-line sm:text-xs">
          {INTEL_BRIEFING.BODY}
        </p>
      </motion.div>

      {/* Auto-start indicator */}
      {isHeaderComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-terminal-green/60 font-mono text-[10px] tracking-widest"
          >
            INITIATING DECRYPTION...
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * DecryptionSequence - Lines decrypt one by one
 */
interface DecryptionSequenceProps {
  onComplete: () => void;
}

function DecryptionSequence({
  onComplete,
}: DecryptionSequenceProps): JSX.Element {
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<Set<number>>(new Set());
  const hasCompletedRef = useRef(false);

  useEffect((): (() => void) | undefined => {
    if (activeLineIndex >= INTEL_BOOT_SEQUENCE.length) {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        const timer = setTimeout((): void => {
          onComplete();
        }, INTEL_BOOT_TIMING.FINAL_HOLD_MS);
        return (): void => clearTimeout(timer);
      }
      return undefined;
    }

    const timer = setTimeout((): void => {
      setCompletedLines((prev) => new Set([...prev, activeLineIndex]));
      setTimeout((): void => {
        setActiveLineIndex((prev) => prev + 1);
      }, 300);
    }, INTEL_BOOT_TIMING.DECRYPT_DURATION_MS);

    return (): void => clearTimeout(timer);
  }, [activeLineIndex, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-2 px-4 text-center"
    >
      {INTEL_BOOT_SEQUENCE.map((line, index) => {
        if (index > activeLineIndex) {
          return null;
        }

        return (
          <DecryptingLine
            key={index}
            text={line}
            isActive={index === activeLineIndex}
            isComplete={completedLines.has(index)}
            isLastLine={index === INTEL_BOOT_SEQUENCE.length - 1}
          />
        );
      })}
    </motion.div>
  );
}

/**
 * IntelBriefing - Phase 7 Intel display with briefing and decryption
 * Auto-plays through: BRIEFING → DECRYPTING → COMPLETE
 */
export function IntelBriefing({ onComplete }: IntelBriefingProps): JSX.Element {
  const [viewState, setViewState] = useState<ViewState>("BRIEFING");
  const hasCalledComplete = useRef(false);

  const handleAutoStart = useCallback((): void => {
    setViewState("DECRYPTING");
  }, []);

  const handleDecryptionComplete = useCallback((): void => {
    setViewState("COMPLETE");
  }, []);

  // Call onComplete when sequence finishes
  useEffect((): (() => void) => {
    if (viewState !== "COMPLETE" || hasCalledComplete.current) {
      return (): void => {};
    }

    const timeout = setTimeout((): void => {
      if (!hasCalledComplete.current) {
        hasCalledComplete.current = true;
        onComplete?.();
      }
    }, 2000);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [viewState, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full flex-col items-center justify-center p-4"
    >
      <AnimatePresence mode="wait">
        {viewState === "BRIEFING" && (
          <BriefingCard key="briefing" onAutoStart={handleAutoStart} />
        )}

        {viewState === "DECRYPTING" && (
          <DecryptionSequence
            key="decrypting"
            onComplete={handleDecryptionComplete}
          />
        )}

        {viewState === "COMPLETE" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-2 text-center"
          >
            {/* Final glowing lines */}
            {INTEL_BOOT_SEQUENCE.map((line, index) => {
              const isLastLine = index === INTEL_BOOT_SEQUENCE.length - 1;
              return (
                <motion.div
                  key={index}
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(0, 255, 65, 0)",
                      "0 0 15px rgba(0, 255, 65, 0.8)",
                      "0 0 20px rgba(0, 255, 65, 0.6)",
                    ],
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`flex items-center justify-center gap-2 font-mono text-sm sm:text-base ${
                    isLastLine
                      ? "text-terminal-green"
                      : "text-terminal-green/60"
                  }`}
                >
                  {isLastLine && (
                    <Heart className="h-3 w-3 text-red-400 sm:h-4 sm:w-4" />
                  )}
                  <span>{line}</span>
                  {isLastLine && (
                    <Heart className="h-3 w-3 text-red-400 sm:h-4 sm:w-4" />
                  )}
                </motion.div>
              );
            })}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="text-terminal-green/60 mt-4 font-mono text-xs tracking-widest"
            >
              [ INTEL RECEIVED ]
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
