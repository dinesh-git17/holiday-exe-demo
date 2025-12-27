"use client";

import { motion } from "framer-motion";
import {
  Heart,
  ExternalLink,
  Github,
  Triangle,
  FileCode2,
  Palette,
  Sparkles,
  Smartphone,
} from "lucide-react";

import { TechStackBadge } from "@/components/ui/TechStackBadge";
import { cn } from "@/lib/utils";

import type { JSX, ReactNode } from "react";

export interface OutroSectionProps {
  /** Additional CSS classes */
  className?: string;
}

// Tech stack data with Lucide icons
interface TechItem {
  name: string;
  icon: ReactNode;
  description: string;
}

const TECH_STACK: TechItem[] = [
  {
    name: "Next.js",
    icon: <Triangle className="text-terminal-green h-5 w-5" />,
    description: "App Router",
  },
  {
    name: "TypeScript",
    icon: <FileCode2 className="text-terminal-green h-5 w-5" />,
    description: "Strict Mode",
  },
  {
    name: "Tailwind",
    icon: <Palette className="text-terminal-green h-5 w-5" />,
    description: "CSS Framework",
  },
  {
    name: "Framer",
    icon: <Sparkles className="text-terminal-green h-5 w-5" />,
    description: "Motion",
  },
  {
    name: "Capacitor",
    icon: <Smartphone className="text-terminal-green h-5 w-5" />,
    description: "iOS Native",
  },
];

// Links
const LINKS = {
  PORTFOLIO: "https://links.dineshd.dev",
  GITHUB: "https://github.com/dinesh-git17",
} as const;

/**
 * OutroSection - Closing section with outcome, tech stack, and links
 */
export function OutroSection({ className }: OutroSectionProps): JSX.Element {
  return (
    <section
      className={cn(
        "bg-showcase-darker relative min-h-screen px-4 py-16 md:px-8 md:py-24",
        className
      )}
    >
      {/* Subtle gradient transition */}
      <div className="from-showcase-dark pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent" />

      <div className="relative mx-auto max-w-4xl">
        {/* Outcome message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          {/* Hearts decoration */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            >
              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            >
              <Heart className="h-7 w-7 fill-red-500 text-red-500" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            >
              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            </motion.div>
          </motion.div>

          {/* Main outcome text */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-romance-gold mb-4 font-mono text-3xl font-bold tracking-wider sm:text-4xl md:text-5xl"
          >
            She said yes.
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-terminal-green/60 mx-auto max-w-md font-mono text-sm sm:text-base"
          >
            This app was built with love for Carolina, as a unique way to ask
            the most important question.
          </motion.p>
        </motion.div>

        {/* Tech stack section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          {/* Section header */}
          <div className="mb-8 text-center">
            <span className="text-terminal-green/60 mb-2 block font-mono text-xs tracking-widest uppercase">
              Built With
            </span>
            <h3 className="text-terminal-green font-mono text-lg font-bold sm:text-xl">
              Tech Stack
            </h3>
            <div className="bg-terminal-green/30 mx-auto mt-3 h-px w-16" />
          </div>

          {/* Tech badges grid */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {TECH_STACK.map((tech, index) => (
              <TechStackBadge
                key={tech.name}
                name={tech.name}
                icon={tech.icon}
                description={tech.description}
                delay={0.1 * index}
              />
            ))}
          </div>
        </motion.div>

        {/* Links section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
        >
          {/* Portfolio link */}
          <motion.a
            href={LINKS.PORTFOLIO}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border-terminal-green/40 bg-terminal-green/10 hover:border-terminal-green/60 hover:bg-terminal-green/20 flex min-w-[200px] items-center justify-center gap-2 rounded-lg border px-6 py-3 font-mono text-sm transition-colors"
          >
            <ExternalLink className="text-terminal-green h-4 w-4" />
            <span className="text-terminal-green">links.dineshd.dev</span>
          </motion.a>

          {/* GitHub link */}
          <motion.a
            href={LINKS.GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border-terminal-green/30 hover:border-terminal-green/50 hover:bg-terminal-green/5 flex min-w-[200px] items-center justify-center gap-2 rounded-lg border px-6 py-3 font-mono text-sm transition-colors"
          >
            <Github className="text-terminal-green/70 h-4 w-4" />
            <span className="text-terminal-green/70">@dinesh-git17</span>
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-terminal-green/40 font-mono text-xs">
            Made with{" "}
            <Heart className="inline-block h-3 w-3 fill-red-500/50 text-red-500/50" />
          </p>
          <p className="text-terminal-green/30 mt-2 font-mono text-[10px]">
            Christmas 2025
          </p>
        </motion.div>

        {/* Decorative end marker */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          className="mt-12 flex justify-center"
        >
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-terminal-green/40 font-mono text-xs tracking-widest"
          >
            [ END OF TRANSMISSION ]
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
