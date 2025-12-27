"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Hook that returns whether a media query matches
 * Uses useSyncExternalStore for proper subscription handling
 * @param query - CSS media query string (e.g., "(min-width: 1024px)")
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void): (() => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);
      return (): void => {
        mediaQuery.removeEventListener("change", callback);
      };
    },
    [query]
  );

  const getSnapshot = useCallback((): boolean => {
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback((): boolean => {
    return false;
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Tailwind lg breakpoint (1024px) */
export const DESKTOP_QUERY = "(min-width: 1024px)";
