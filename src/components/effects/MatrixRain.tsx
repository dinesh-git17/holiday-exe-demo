"use client";

import { useEffect, useRef } from "react";

import { MATRIX_CHARS, MATRIX_CONFIG } from "@/lib/constants";

import type { JSX } from "react";

export interface MatrixRainProps {
  /** Opacity of the rain effect (0-1), useful for fading */
  opacity?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * MatrixRain - Canvas-based digital rain effect
 * High-performance implementation using requestAnimationFrame
 * Animates only transform/opacity for 60fps performance
 */
export function MatrixRain({
  opacity = 1,
  className,
}: MatrixRainProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<number[]>([]);
  const animationRef = useRef<number>(0);

  useEffect((): (() => void) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return (): void => {};
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return (): void => {};
    }

    const resize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reinitialize drops on resize
      const columns = Math.ceil(canvas.width / MATRIX_CONFIG.FONT_SIZE);
      dropsRef.current = Array.from(
        { length: columns },
        () => Math.random() * -100
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (): void => {
      if (!ctx || !canvas) {
        return;
      }

      // Semi-transparent black to create trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${MATRIX_CONFIG.TRAIL_OPACITY})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style - matrix green
      ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
      ctx.font = `${MATRIX_CONFIG.FONT_SIZE}px monospace`;

      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] ?? 0;
        const charIndex = Math.floor(Math.random() * MATRIX_CHARS.length);
        const char = MATRIX_CHARS[charIndex] ?? "0";
        const x = i * MATRIX_CONFIG.FONT_SIZE;

        ctx.fillText(char, x, y * MATRIX_CONFIG.FONT_SIZE);

        // Randomly reset drop to top
        if (
          y * MATRIX_CONFIG.FONT_SIZE > canvas.height &&
          Math.random() > MATRIX_CONFIG.RESET_PROBABILITY
        ) {
          drops[i] = 0;
        } else {
          drops[i] = y + MATRIX_CONFIG.FALL_SPEED;
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return (): void => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
