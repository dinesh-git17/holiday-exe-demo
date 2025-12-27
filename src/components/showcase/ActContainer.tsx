"use client";

import { motion } from "framer-motion";

import { BootSequence } from "@/components/phases/BootSequence";
import { Countdown } from "@/components/phases/Countdown";
import { FingerprintScanner } from "@/components/phases/FingerprintScanner";
import { MissionBriefing } from "@/components/phases/MissionBriefing";
import { PhaseCard } from "@/components/showcase/PhaseCard";
import { PhaseNavigator } from "@/components/showcase/PhaseNavigator";
import { PhoneFrame } from "@/components/showcase/PhoneFrame";
import { DESKTOP_QUERY, useMediaQuery } from "@/hooks/useMediaQuery";
import { usePhaseNavigation } from "@/hooks/usePhaseNavigation";
import { ACT_1_PHASES, PHONE_SCALE, Z_INDEX } from "@/lib/constants";
import { cn } from "@/lib/utils";

import type { JSX } from "react";

export interface ActContainerProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * ActContainer - Scroll section for Act 1: Authentication
 * Two-column layout with phone on left, phase info on right
 * Manual navigation via arrows
 */
export function ActContainer({ className }: ActContainerProps): JSX.Element {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const { currentPhase, totalPhases, hasPrev, hasNext, goToPrev, goToNext } =
    usePhaseNavigation(ACT_1_PHASES.length);

  const currentPhaseData = ACT_1_PHASES[currentPhase];
  const phoneScale = isDesktop ? PHONE_SCALE.DESKTOP : PHONE_SCALE.MOBILE;

  const renderPhaseContent = (): JSX.Element => {
    switch (currentPhase) {
      case 0:
        return <BootSequence />;
      case 1:
        return <FingerprintScanner />;
      case 2:
        return <MissionBriefing />;
      case 3:
        return <Countdown />;
      default:
        return <BootSequence />;
    }
  };

  return (
    <section
      className={cn(
        "bg-showcase-darker relative min-h-screen px-4 py-8 md:px-8 md:py-12 lg:px-16",
        className
      )}
    >
      {/* Main content - two column layout */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-12 lg:gap-20">
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
              Act 1
            </span>
            <h2 className="text-matrix-green font-mono text-2xl font-bold">
              Authentication
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
    </section>
  );
}
