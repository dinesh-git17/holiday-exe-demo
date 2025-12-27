"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  ASSETS,
  CIPHER_CONFIG,
  CIPHER_LEVELS,
  CIPHER_SUCCESS_MESSAGES,
} from "@/lib/constants";

import type { JSX } from "react";

export interface CipherGameProps {
  /** Callback when all levels are complete */
  onComplete?: () => void;
}

type TileState = "empty" | "filled" | "correct" | "present" | "absent";

interface LetterEvaluation {
  letter: string;
  state: TileState;
}

/**
 * Evaluates a guess against the target word
 */
function evaluateGuess(guess: string, targetWord: string): LetterEvaluation[] {
  const result: LetterEvaluation[] = [];
  const targetLetters = targetWord.split("");
  const guessLetters = guess.split("");
  const matchedIndices = new Set<number>();

  // First pass: exact matches (green)
  guessLetters.forEach((letter, index) => {
    if (letter === targetLetters[index]) {
      result[index] = { letter, state: "correct" };
      matchedIndices.add(index);
    }
  });

  // Second pass: present (yellow) and absent (gray)
  guessLetters.forEach((letter, index) => {
    if (result[index]) {
      return;
    }
    const targetIndex = targetLetters.findIndex(
      (targetLetter, i) => targetLetter === letter && !matchedIndices.has(i)
    );
    if (targetIndex !== -1) {
      result[index] = { letter, state: "present" };
      matchedIndices.add(targetIndex);
    } else {
      result[index] = { letter, state: "absent" };
    }
  });

  return result;
}

/**
 * CipherTile - Individual tile with flip animation
 */
interface CipherTileProps {
  letter: string;
  state: TileState;
  delay?: number;
  isRevealing?: boolean;
}

function CipherTile({
  letter,
  state,
  delay = 0,
  isRevealing = false,
}: CipherTileProps): JSX.Element {
  const baseClasses =
    "flex h-10 w-8 items-center justify-center rounded-md border-2 font-mono text-lg font-bold uppercase transition-colors sm:h-12 sm:w-10 sm:text-xl";

  const stateClasses: Record<TileState, string> = {
    empty: "border-terminal-green/30 bg-transparent",
    filled: "border-terminal-green bg-transparent text-terminal-green",
    correct: "border-terminal-green bg-terminal-green text-midnight",
    present: "border-yellow-500 bg-yellow-500/80 text-midnight",
    absent: "border-gray-600 bg-gray-800/50 text-gray-400",
  };

  if (isRevealing && state !== "empty" && state !== "filled") {
    return (
      <motion.div
        initial={{ rotateX: 0 }}
        animate={{ rotateX: [0, 90, 0] }}
        transition={{
          duration: CIPHER_CONFIG.TILE_FLIP_DURATION_MS / 1000,
          delay: delay / 1000,
          times: [0, 0.5, 1],
        }}
        style={{ transformStyle: "preserve-3d" }}
        className={`${baseClasses} ${stateClasses[state]}`}
      >
        {letter}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={letter ? { scale: 0.8 } : false}
      animate={{ scale: 1 }}
      transition={{ duration: 0.08 }}
      className={`${baseClasses} ${stateClasses[state]}`}
    >
      {letter}
    </motion.div>
  );
}

/**
 * CipherGrid - The word grid display
 */
interface CipherGridProps {
  guesses: LetterEvaluation[][];
  currentGuess: string;
  currentRow: number;
  isRevealing: boolean;
  revealingRow: number;
  wordLength: number;
}

function CipherGrid({
  guesses,
  currentGuess,
  currentRow,
  isRevealing,
  revealingRow,
  wordLength,
}: CipherGridProps): JSX.Element {
  const rows: JSX.Element[] = [];

  for (let i = 0; i < CIPHER_CONFIG.MAX_GUESSES; i++) {
    const tiles: JSX.Element[] = [];
    const isCompletedRow =
      i < currentRow || (isRevealing && i === revealingRow);

    for (let j = 0; j < wordLength; j++) {
      let letter = "";
      let state: TileState = "empty";

      if (isCompletedRow) {
        const rowGuesses = guesses[i];
        if (rowGuesses) {
          const evaluation = rowGuesses[j];
          if (evaluation) {
            letter = evaluation.letter;
            state = evaluation.state;
          }
        }
      } else if (i === currentRow) {
        letter = currentGuess[j] || "";
        state = letter ? "filled" : "empty";
      }

      tiles.push(
        <CipherTile
          key={`${i}-${j}`}
          letter={letter}
          state={state}
          delay={
            isRevealing && i === revealingRow
              ? j * CIPHER_CONFIG.TILE_FLIP_DELAY_MS
              : 0
          }
          isRevealing={isRevealing && i === revealingRow}
        />
      );
    }

    rows.push(
      <div key={i} className="flex gap-1.5 sm:gap-2">
        {tiles}
      </div>
    );
  }

  return <div className="flex flex-col gap-1.5 sm:gap-2">{rows}</div>;
}

/**
 * DinnFeedback - Shows Dinn with success message
 */
interface DinnFeedbackProps {
  message: string;
}

function DinnFeedback({ message }: DinnFeedbackProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-3"
    >
      {/* Speech bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.25 }}
        className="border-terminal-green/40 bg-terminal-green/10 relative max-w-[200px] rounded-xl border px-4 py-3 backdrop-blur-sm"
      >
        <p className="text-terminal-green text-center font-mono text-xs sm:text-sm">
          {message}
        </p>
        <div className="border-terminal-green/40 bg-terminal-green/10 absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b" />
      </motion.div>

      {/* Dinn image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="relative h-24 w-24 sm:h-28 sm:w-28"
      >
        <Image
          src={ASSETS.DINN_HEART}
          alt="Dinn"
          fill
          className="object-contain drop-shadow-lg"
          unoptimized
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * CipherGame - Wordle-style auto-simulation
 * Simulates solving each level with correct guesses
 */
export function CipherGame({ onComplete }: CipherGameProps): JSX.Element {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [guesses, setGuesses] = useState<LetterEvaluation[][]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealingRow, setRevealingRow] = useState(-1);
  const [showDinn, setShowDinn] = useState(false);
  const [dinnMessage, setDinnMessage] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const hasCalledComplete = useRef(false);

  const levelData = useMemo(() => CIPHER_LEVELS[currentLevel], [currentLevel]);
  const targetWord = levelData?.word || "";

  // Auto-simulation: type the correct word letter by letter
  useEffect((): (() => void) => {
    if (showDinn || isRevealing || isComplete) {
      return (): void => {};
    }

    if (currentGuess.length < CIPHER_CONFIG.WORD_LENGTH) {
      const timeout = setTimeout((): void => {
        setCurrentGuess((prev) => prev + targetWord[prev.length]);
      }, 150);

      return (): void => {
        clearTimeout(timeout);
      };
    }

    // Word complete - start revealing
    const timeout = setTimeout((): void => {
      const evaluation = evaluateGuess(currentGuess, targetWord);

      setIsRevealing(true);
      setRevealingRow(currentRow);
      setGuesses((prev) => [...prev, evaluation]);

      const revealDuration =
        CIPHER_CONFIG.WORD_LENGTH * CIPHER_CONFIG.TILE_FLIP_DELAY_MS +
        CIPHER_CONFIG.TILE_FLIP_DURATION_MS;

      setTimeout((): void => {
        setIsRevealing(false);
        setRevealingRow(-1);

        // Show Dinn feedback
        const successMessage =
          CIPHER_SUCCESS_MESSAGES[currentLevel] || "Perfect!";
        setDinnMessage(successMessage);
        setShowDinn(true);

        // After Dinn, advance level or complete
        setTimeout((): void => {
          setShowDinn(false);

          if (currentLevel < CIPHER_LEVELS.length - 1) {
            setCurrentLevel((prev) => prev + 1);
            setGuesses([]);
            setCurrentGuess("");
            setCurrentRow(0);
          } else {
            setIsComplete(true);
          }
        }, 2000);
      }, revealDuration);
    }, 300);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [
    currentGuess,
    currentRow,
    currentLevel,
    targetWord,
    showDinn,
    isRevealing,
    isComplete,
  ]);

  // Call onComplete when all levels done
  useEffect((): (() => void) => {
    if (!isComplete || hasCalledComplete.current) {
      return (): void => {};
    }

    const timeout = setTimeout((): void => {
      if (!hasCalledComplete.current) {
        hasCalledComplete.current = true;
        onComplete?.();
      }
    }, 1500);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [isComplete, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full flex-col items-center justify-center p-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-4 text-center"
      >
        <div className="text-terminal-green/60 mb-1 font-mono text-[10px] tracking-widest uppercase">
          Encryption Protocol
        </div>
        <h3 className="text-terminal-green font-mono text-sm font-bold">
          Level {currentLevel + 1} of {CIPHER_LEVELS.length}
        </h3>
      </motion.div>

      {/* Game area */}
      <div className="relative flex flex-1 flex-col items-center justify-center">
        {/* Grid - fades when Dinn shows */}
        <motion.div
          animate={{ opacity: showDinn ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className={showDinn ? "pointer-events-none" : ""}
        >
          <CipherGrid
            guesses={guesses}
            currentGuess={currentGuess}
            currentRow={currentRow}
            isRevealing={isRevealing}
            revealingRow={revealingRow}
            wordLength={CIPHER_CONFIG.WORD_LENGTH}
          />
        </motion.div>

        {/* Dinn feedback overlay */}
        <AnimatePresence>
          {showDinn && (
            <motion.div className="absolute inset-0 flex items-center justify-center">
              <DinnFeedback message={dinnMessage} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status indicator */}
      <motion.div animate={{ opacity: showDinn ? 0.3 : 1 }} className="mt-4">
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-terminal-green/60 font-mono text-[10px] tracking-widest"
        >
          {isComplete ? "[ ALL CIPHERS SOLVED ]" : "[ DECRYPTING... ]"}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
