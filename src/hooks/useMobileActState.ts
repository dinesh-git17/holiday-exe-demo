"use client";

import { useCallback, useState } from "react";

export type MobileActView = "overview" | "phone";

export interface UseMobileActStateReturn {
  /** Current view state */
  view: MobileActView;
  /** Transition to phone view */
  showPhoneView: () => void;
  /** Reset to overview (for when user scrolls away) */
  resetToOverview: () => void;
}

/**
 * Hook for managing mobile act view state transitions
 * Handles the overview -> phone view flow
 */
export function useMobileActState(): UseMobileActStateReturn {
  const [view, setView] = useState<MobileActView>("overview");

  const showPhoneView = useCallback((): void => {
    setView("phone");
  }, []);

  const resetToOverview = useCallback((): void => {
    setView("overview");
  }, []);

  return {
    view,
    showPhoneView,
    resetToOverview,
  };
}
