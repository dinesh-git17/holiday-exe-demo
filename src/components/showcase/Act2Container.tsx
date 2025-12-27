"use client";

import { AnimatePresence, motion } from "framer-motion";

import { GameExplainer } from "@/components/phases/GameExplainer";
import { GameplayVideo } from "@/components/phases/GameplayVideo";
import { MemoryGameVideo } from "@/components/phases/MemoryGameVideo";
import { RoomSceneVideo } from "@/components/phases/RoomSceneVideo";
import { MobilePhaseOverview } from "@/components/showcase/MobilePhaseOverview";
import { MobilePhoneView } from "@/components/showcase/MobilePhoneView";
import { PhaseCard } from "@/components/showcase/PhaseCard";
import { PhaseNavigator } from "@/components/showcase/PhaseNavigator";
import { PhoneFrame } from "@/components/showcase/PhoneFrame";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { DESKTOP_QUERY, useMediaQuery } from "@/hooks/useMediaQuery";
import { useMobileActState } from "@/hooks/useMobileActState";
import { usePhaseNavigation } from "@/hooks/usePhaseNavigation";
import { ACT_2_PHASES, PHONE_SCALE, Z_INDEX } from "@/lib/constants";
import { cn } from "@/lib/utils";

import type { JSX } from "react";

export interface Act2ContainerProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Act2Container - Scroll section for Act 2: The Mission
 * Two-column layout with phone on left, phase info on right
 * Features game mechanics explainer and gameplay video
 */
export function Act2Container({ className }: Act2ContainerProps): JSX.Element {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const { view, showPhoneView } = useMobileActState();
  const { currentPhase, totalPhases, hasPrev, hasNext, goToPrev, goToNext } =
    usePhaseNavigation(ACT_2_PHASES.length);

  const currentPhaseData = ACT_2_PHASES[currentPhase];
  const phoneScale = isDesktop ? PHONE_SCALE.DESKTOP : PHONE_SCALE.MOBILE;
  const isLastPhase = currentPhase === ACT_2_PHASES.length - 1;

  const renderPhaseContent = (): JSX.Element => {
    switch (currentPhase) {
      case 0:
        return <GameExplainer />;
      case 1:
        return <GameplayVideo />;
      case 2:
        return <RoomSceneVideo />;
      case 3:
        return <MemoryGameVideo />;
      default:
        return <GameExplainer />;
    }
  };

  // Mobile layout
  if (!isDesktop) {
    return (
      <section
        className={cn("bg-showcase-dark relative min-h-screen", className)}
      >
        {/* Subtle gradient transition from Act 1 */}
        <div className="from-showcase-darker pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b to-transparent" />

        <AnimatePresence mode="wait">
          {view === "overview" ? (
            <MobilePhaseOverview
              key="overview"
              actNumber={2}
              actTitle="The Mission"
              phases={ACT_2_PHASES}
              onComplete={showPhoneView}
            />
          ) : (
            <MobilePhoneView
              key="phone"
              phases={ACT_2_PHASES}
              currentPhase={currentPhase}
              totalPhases={totalPhases}
              onPrev={goToPrev}
              onNext={goToNext}
              hasPrev={hasPrev}
              hasNext={hasNext}
            >
              {renderPhaseContent()}
            </MobilePhoneView>
          )}
        </AnimatePresence>
      </section>
    );
  }

  // Desktop layout (unchanged)
  return (
    <section
      className={cn(
        "bg-showcase-dark relative min-h-screen px-4 py-8 md:px-8 md:py-12 lg:px-16",
        className
      )}
    >
      {/* Subtle gradient transition from Act 1 */}
      <div className="from-showcase-darker pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent" />

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
              Act 2
            </span>
            <h2 className="text-matrix-green font-mono text-2xl font-bold">
              The Mission
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

      {/* Scroll indicator - appears on last phase */}
      <ScrollIndicator visible={isLastPhase} label="SCROLL TO ACT 3" />
    </section>
  );
}
