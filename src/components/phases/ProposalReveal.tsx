"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  ASSETS,
  PROPOSAL_APPRECIATION,
  PROPOSAL_CERTIFICATE,
} from "@/lib/constants";

import type { JSX } from "react";

export interface ProposalRevealProps {
  /** Callback when reveal animation completes */
  onComplete?: () => void;
}

type ViewState = "APPRECIATION" | "CERTIFICATE";

/**
 * AppreciationMessage - The bridge message before the certificate
 */
function AppreciationMessage(): JSX.Element {
  const [visibleLines, setVisibleLines] = useState(0);

  // Reveal lines one by one
  useEffect((): (() => void) | undefined => {
    if (visibleLines < PROPOSAL_APPRECIATION.LINES.length) {
      const timer = setTimeout((): void => {
        setVisibleLines((prev) => prev + 1);
      }, 1500);
      return (): void => clearTimeout(timer);
    }
    return undefined;
  }, [visibleLines]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex h-full flex-col items-center justify-center p-4"
    >
      {/* Terminal-style container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="border-terminal-green/30 w-full rounded-lg border bg-black/60 p-4 backdrop-blur-sm"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-terminal-green/20 mb-4 border-b pb-3"
        >
          <span className="text-terminal-green font-mono text-sm sm:text-base">
            {PROPOSAL_APPRECIATION.HEADER}
          </span>
        </motion.div>

        {/* Message lines */}
        <div className="text-terminal-green/80 space-y-3 font-mono text-[10px] leading-relaxed sm:text-xs">
          {PROPOSAL_APPRECIATION.LINES.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: index < visibleLines ? 1 : 0,
                x: index < visibleLines ? 0 : -10,
              }}
              transition={{ duration: 0.6 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Auto-transition indicator */}
        {visibleLines >= PROPOSAL_APPRECIATION.LINES.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-center"
          >
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-terminal-green/60 font-mono text-[10px] tracking-widest"
            >
              LOADING CERTIFICATE...
            </motion.span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * RescueCertificate - The final certificate with the proposal question
 */
function RescueCertificate(): JSX.Element {
  const [showContent, setShowContent] = useState(false);

  // Stagger the content reveal
  useEffect((): (() => void) => {
    const contentTimer = setTimeout((): void => setShowContent(true), 500);
    return (): void => {
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex h-full flex-col items-center justify-center p-4"
    >
      {/* Certificate container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="bg-midnight/95 relative w-full overflow-hidden rounded-xl border-2 border-yellow-500/50 p-4"
        style={{
          boxShadow:
            "0 0 40px rgba(234, 179, 8, 0.15), 0 0 60px rgba(234, 179, 8, 0.1)",
        }}
      >
        {/* Golden corner decorations */}
        <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-yellow-500/30" />
        <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-yellow-500/30" />
        <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-yellow-500/30" />
        <div className="absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2 border-yellow-500/30" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -10 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-center"
        >
          <div className="font-mono text-[8px] tracking-[0.2em] text-yellow-500/60 uppercase sm:text-[10px]">
            {PROPOSAL_CERTIFICATE.FOOTER}
          </div>
          <h1 className="mt-1 font-mono text-lg font-bold tracking-widest text-yellow-500 sm:text-xl">
            {PROPOSAL_CERTIFICATE.HEADER}
          </h1>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: showContent ? 1 : 0,
            scale: showContent ? 1 : 0.8,
          }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="relative mx-auto mb-4 aspect-square w-32 sm:w-40"
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(234, 179, 8, 0.2) 0%, transparent 70%)",
            }}
          />
          <Image
            src={ASSETS.REVEAL_HUG}
            alt="Rescued"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </motion.div>

        {/* The Question */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ delay: 0.6 }}
          className="mb-4 text-center"
        >
          <motion.p
            animate={showContent ? { opacity: [0.8, 1, 0.8] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="text-base leading-relaxed font-light text-white sm:text-lg"
          >
            {PROPOSAL_CERTIFICATE.QUESTION}
          </motion.p>
        </motion.div>

        {/* Decorative seal */}
        <motion.div
          initial={{ opacity: 0, rotate: -20 }}
          animate={{
            opacity: showContent ? 0.4 : 0,
            rotate: showContent ? -12 : -20,
          }}
          transition={{ delay: 0.8 }}
          className="absolute -top-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-500/40"
        >
          <span className="text-xl text-yellow-500/60">♥</span>
        </motion.div>
      </motion.div>

      {/* Status text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ delay: 1.2 }}
        className="mt-4"
      >
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-romance-gold/60 font-mono text-xs tracking-widest"
        >
          [ MISSION COMPLETE ]
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

/**
 * ProposalReveal - Phase 9 Final Reveal
 * Auto-plays through: APPRECIATION → CERTIFICATE
 */
export function ProposalReveal({
  onComplete,
}: ProposalRevealProps): JSX.Element {
  const [viewState, setViewState] = useState<ViewState>("APPRECIATION");
  const hasCalledComplete = useRef(false);

  // Auto-transition from appreciation to certificate
  useEffect((): (() => void) => {
    if (viewState !== "APPRECIATION") {
      return (): void => {};
    }

    const timeout = setTimeout((): void => {
      setViewState("CERTIFICATE");
    }, 6000); // Show appreciation for 6 seconds

    return (): void => {
      clearTimeout(timeout);
    };
  }, [viewState]);

  // Call onComplete after certificate shows
  useEffect((): (() => void) => {
    if (viewState !== "CERTIFICATE" || hasCalledComplete.current) {
      return (): void => {};
    }

    const timeout = setTimeout((): void => {
      if (!hasCalledComplete.current) {
        hasCalledComplete.current = true;
        onComplete?.();
      }
    }, 4000);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [viewState, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full"
    >
      <AnimatePresence mode="wait">
        {viewState === "APPRECIATION" && (
          <AppreciationMessage key="appreciation" />
        )}
        {viewState === "CERTIFICATE" && <RescueCertificate key="certificate" />}
      </AnimatePresence>
    </motion.div>
  );
}
