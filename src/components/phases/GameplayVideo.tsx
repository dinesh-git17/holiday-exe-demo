"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { VIDEOS } from "@/lib/constants";

import type { JSX } from "react";

export interface GameplayVideoProps {
  /** Additional CSS classes */
  className?: string;
}

type VideoState = "loading" | "buffering" | "playing" | "error";

const MIN_BUFFER_SECONDS = 5;

/**
 * GameplayVideo - Displays the game phase video with loading states
 * Waits for sufficient buffer before playing to prevent lag
 */
export function GameplayVideo({ className }: GameplayVideoProps): JSX.Element {
  const [videoState, setVideoState] = useState<VideoState>("loading");
  const [bufferProgress, setBufferProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const checkBufferAndPlay = useCallback((): void => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const buffered = video.buffered;
    if (buffered.length > 0) {
      const bufferedEnd = buffered.end(buffered.length - 1);
      const duration = video.duration;
      const progress = Math.min((bufferedEnd / duration) * 100, 100);
      setBufferProgress(progress);

      // Play when we have enough buffer or the whole video
      if (bufferedEnd >= MIN_BUFFER_SECONDS || bufferedEnd >= duration) {
        setVideoState("playing");
        video.play().catch((): void => {
          setVideoState("error");
        });
      }
    }
  }, []);

  const handleProgress = useCallback((): void => {
    if (videoState === "loading" || videoState === "buffering") {
      setVideoState("buffering");
      checkBufferAndPlay();
    }
  }, [videoState, checkBufferAndPlay]);

  const handleCanPlayThrough = useCallback((): void => {
    // Browser indicates it can play through without stopping
    if (videoState !== "playing" && videoState !== "error") {
      setVideoState("playing");
      videoRef.current?.play().catch((): void => {
        setVideoState("error");
      });
    }
  }, [videoState]);

  const handleError = useCallback((): void => {
    setVideoState("error");
  }, []);

  // Handle stalling during playback
  const handleWaiting = useCallback((): void => {
    if (videoState === "playing") {
      setVideoState("buffering");
    }
  }, [videoState]);

  const handlePlaying = useCallback((): void => {
    setVideoState("playing");
  }, []);

  // Start loading immediately when component mounts
  useEffect((): void => {
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  }, []);

  const isLoading = videoState === "loading" || videoState === "buffering";

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className ?? ""}`}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={VIDEOS.PHASE_5_GAME}
        muted
        loop
        playsInline
        preload="auto"
        onProgress={handleProgress}
        onCanPlayThrough={handleCanPlayThrough}
        onError={handleError}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        className="h-full w-full object-cover"
      />

      {/* Loading/Buffering overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black"
          >
            {/* Loading spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="border-terminal-green/30 border-t-terminal-green mb-4 h-10 w-10 rounded-full border-2"
            />

            {/* Buffer progress bar */}
            {videoState === "buffering" && (
              <div className="mb-3 h-1 w-32 overflow-hidden rounded-full bg-black/50">
                <motion.div
                  className="bg-terminal-green h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${bufferProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-terminal-green/60 font-mono text-xs tracking-widest"
            >
              {videoState === "buffering"
                ? `BUFFERING... ${Math.round(bufferProgress)}%`
                : "LOADING MISSION DATA..."}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error fallback */}
      <AnimatePresence>
        {videoState === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black"
          >
            <div className="mb-2 font-mono text-2xl text-red-500/80">⚠</div>
            <p className="text-terminal-green/60 font-mono text-sm">
              Mission data unavailable
            </p>
            <p className="text-terminal-green/40 mt-1 font-mono text-xs">
              Video failed to load
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play indicator overlay (shows briefly when video starts) */}
      <AnimatePresence>
        {videoState === "playing" && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 1 }}
              className="text-terminal-green/40 font-mono text-xs tracking-widest"
            >
              ▶ STREAMING
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
