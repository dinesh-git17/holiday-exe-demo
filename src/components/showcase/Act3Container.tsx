"use client";

import { motion } from "framer-motion";

import { CipherGame } from "@/components/phases/CipherGame";
import { IntelBriefing } from "@/components/phases/IntelBriefing";
import { ProposalReveal } from "@/components/phases/ProposalReveal";
import { PhaseCard } from "@/components/showcase/PhaseCard";
import { PhaseNavigator } from "@/components/showcase/PhaseNavigator";
import { PhoneFrame } from "@/components/showcase/PhoneFrame";
import { DESKTOP_QUERY, useMediaQuery } from "@/hooks/useMediaQuery";
import { usePhaseNavigation } from "@/hooks/usePhaseNavigation";
import { ACT_3_PHASES, PHONE_SCALE, Z_INDEX } from "@/lib/constants";
import { cn } from "@/lib/utils";

import type { JSX } from "react";

export interface Act3ContainerProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Act3Container - Scroll section for Act 3: The Revelation
 * Two-column layout with phone on left, phase info on right
 * Features decrypt animation, cipher game, and proposal reveal
 */
export function Act3Container({ className }: Act3ContainerProps): JSX.Element {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const { currentPhase, totalPhases, hasPrev, hasNext, goToPrev, goToNext } =
    usePhaseNavigation(ACT_3_PHASES.length);

  const currentPhaseData = ACT_3_PHASES[currentPhase];
  const phoneScale = isDesktop ? PHONE_SCALE.DESKTOP : PHONE_SCALE.MOBILE;

  const renderPhaseContent = (): JSX.Element => {
    switch (currentPhase) {
      case 0:
        return <IntelBriefing />;
      case 1:
        return <CipherGame />;
      case 2:
        return <ProposalReveal />;
      default:
        return <IntelBriefing />;
    }
  };

  return (
    <section
      className={cn(
        "bg-showcase-darker relative min-h-screen px-4 py-8 md:px-8 md:py-12 lg:px-16",
        className
      )}
    >
      {/* Subtle gradient transition from Act 2 */}
      <div className="from-showcase-dark pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent" />

      {/* Main content - two column layout */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 pt-8 md:flex-row md:items-center md:justify-center md:gap-12 lg:gap-20">
        {/* Left column - Phone */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <PhoneFrame animate={false} scale={phoneScale}>
            {renderPhaseContent()}
          </PhoneFrame>
        </motion.div>

        {/* Right column - Title + Phase info + navigation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex w-full max-w-md flex-col gap-6"
          style={{ zIndex: Z_INDEX.UI_OVERLAY }}
        >
          {/* Section header */}
          <div className="text-center md:text-left">
            <span className="text-matrix-green/60 mb-1 block font-mono text-sm tracking-widest uppercase">
              Act 3
            </span>
            <h2 className="text-matrix-green font-mono text-2xl font-bold">
              The Revelation
            </h2>
          </div>

          {currentPhaseData && (
            <PhaseCard
              title={currentPhaseData.title}
              description={currentPhaseData.description}
              phaseNumber={currentPhase + 1}
              totalPhases={totalPhases}
            />
          )}

          <PhaseNavigator
            currentPhase={currentPhase}
            totalPhases={totalPhases}
            hasPrev={hasPrev}
            hasNext={hasNext}
            onPrev={goToPrev}
            onNext={goToNext}
          />
        </motion.div>
      </div>

      {/* Final message - appears on last phase */}
      {currentPhase === ACT_3_PHASES.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-romance-gold/60 font-mono text-sm tracking-widest"
          >
            ♥ THE END ♥
          </motion.p>
        </motion.div>
      )}
    </section>
  );
}
