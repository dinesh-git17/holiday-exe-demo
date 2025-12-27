"use client";

import { motion, useAnimation, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, type JSX, type ReactNode } from "react";

import { PhoneFrame } from "@/components/showcase/PhoneFrame";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { MOBILE_UX, PHONE_SCALE, type Phase } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface MobilePhoneViewProps {
  /** Array of phases for this act */
  phases: readonly Phase[];
  /** Current phase index (0-based) */
  currentPhase: number;
  /** Total number of phases */
  totalPhases: number;
  /** Content to render inside the phone */
  children: ReactNode;
  /** Navigate to previous phase */
  onPrev: () => void;
  /** Navigate to next phase */
  onNext: () => void;
  /** Whether previous navigation is available */
  hasPrev: boolean;
  /** Whether next navigation is available */
  hasNext: boolean;
  /** Whether this is the last phase (shows scroll indicator) */
  isLastPhase?: boolean;
  /** Label for scroll indicator */
  scrollIndicatorLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

const BUTTON_SIZE = 44;

/**
 * MobilePhoneView - Phone-focused mobile view with swipe navigation
 * Features:
 * - Centered phone with phase content
 * - Left/right navigation arrows
 * - Swipe gesture support
 * - Bottom overlay with phase info
 */
export function MobilePhoneView({
  phases,
  currentPhase,
  totalPhases,
  children,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  isLastPhase = false,
  scrollIndicatorLabel,
  className,
}: MobilePhoneViewProps): JSX.Element {
  const controls = useAnimation();
  const currentPhaseData = phases[currentPhase];

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
      const { offset } = info;

      if (offset.x > MOBILE_UX.SWIPE_THRESHOLD && hasPrev) {
        onPrev();
      } else if (offset.x < -MOBILE_UX.SWIPE_THRESHOLD && hasNext) {
        onNext();
      }

      // Reset position
      controls.start({ x: 0 });
    },
    [controls, hasPrev, hasNext, onPrev, onNext]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center px-4 py-8",
        className
      )}
    >
      {/* Navigation and phone area */}
      <div className="flex w-full items-center justify-center gap-2">
        {/* Left arrow */}
        <motion.button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          whileHover={hasPrev ? { scale: 1.1 } : undefined}
          whileTap={hasPrev ? { scale: 0.95 } : undefined}
          className={cn(
            "flex flex-shrink-0 items-center justify-center rounded-full border transition-colors",
            hasPrev
              ? "border-matrix-green/60 text-matrix-green active:bg-matrix-green/20"
              : "border-matrix-green/20 text-matrix-green/20 cursor-not-allowed"
          )}
          style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
          aria-label="Previous phase"
        >
          <ChevronLeft size={24} />
        </motion.button>

        {/* Swipeable phone container */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={MOBILE_UX.DRAG_ELASTIC}
          onDragEnd={handleDragEnd}
          animate={controls}
          className="touch-pan-y"
        >
          <PhoneFrame animate={false} scale={PHONE_SCALE.MOBILE}>
            {children}
          </PhoneFrame>
        </motion.div>

        {/* Right arrow */}
        <motion.button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          whileHover={hasNext ? { scale: 1.1 } : undefined}
          whileTap={hasNext ? { scale: 0.95 } : undefined}
          className={cn(
            "flex flex-shrink-0 items-center justify-center rounded-full border transition-colors",
            hasNext
              ? "border-matrix-green/60 text-matrix-green active:bg-matrix-green/20"
              : "border-matrix-green/20 text-matrix-green/20 cursor-not-allowed"
          )}
          style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
          aria-label="Next phase"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Phase indicator dots */}
      <div className="mt-6 flex items-center gap-2">
        {Array.from({ length: totalPhases }).map((_, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              scale: index === currentPhase ? 1 : 0.75,
              opacity: index === currentPhase ? 1 : 0.4,
            }}
            transition={{ duration: 0.2 }}
            className={cn(
              "h-2 w-2 rounded-full",
              index === currentPhase
                ? "bg-matrix-green shadow-[0_0_8px_rgba(0,255,65,0.6)]"
                : "bg-matrix-green/40"
            )}
          />
        ))}
      </div>

      {/* Bottom overlay with phase info */}
      <motion.div
        key={currentPhase}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 w-full max-w-sm px-4 text-center"
      >
        <p className="text-matrix-green/60 mb-1 font-mono text-xs tracking-wider uppercase">
          Phase {currentPhase + 1} of {totalPhases}
        </p>
        {currentPhaseData && (
          <>
            <p className="text-matrix-green mb-2 font-mono text-sm font-semibold">
              {currentPhaseData.title}
            </p>
            <p className="text-matrix-green/70 font-mono text-xs leading-relaxed">
              {currentPhaseData.description}
            </p>
          </>
        )}
      </motion.div>

      {/* Scroll indicator for last phase */}
      {isLastPhase && scrollIndicatorLabel && (
        <ScrollIndicator visible label={scrollIndicatorLabel} />
      )}
    </motion.div>
  );
}
