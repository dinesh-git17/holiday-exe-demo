"use client";

import { useCallback, useState } from "react";

export interface UsePhaseNavigationReturn {
  /** Current phase index (0-based) */
  currentPhase: number;
  /** Total number of phases */
  totalPhases: number;
  /** Whether there is a previous phase */
  hasPrev: boolean;
  /** Whether there is a next phase */
  hasNext: boolean;
  /** Go to previous phase */
  goToPrev: () => void;
  /** Go to next phase */
  goToNext: () => void;
  /** Go to specific phase by index */
  goToPhase: (index: number) => void;
}

/**
 * Hook for managing phase navigation state
 * @param totalPhases - Total number of phases in the act
 * @param initialPhase - Starting phase index (default: 0)
 */
export function usePhaseNavigation(
  totalPhases: number,
  initialPhase: number = 0
): UsePhaseNavigationReturn {
  const [currentPhase, setCurrentPhase] = useState(initialPhase);

  const hasPrev = currentPhase > 0;
  const hasNext = currentPhase < totalPhases - 1;

  const goToPrev = useCallback((): void => {
    setCurrentPhase((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNext = useCallback((): void => {
    setCurrentPhase((prev) => Math.min(totalPhases - 1, prev + 1));
  }, [totalPhases]);

  const goToPhase = useCallback(
    (index: number): void => {
      if (index >= 0 && index < totalPhases) {
        setCurrentPhase(index);
      }
    },
    [totalPhases]
  );

  return {
    currentPhase,
    totalPhases,
    hasPrev,
    hasNext,
    goToPrev,
    goToNext,
    goToPhase,
  };
}
