"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CircuitBackground } from "@/components/shared/CircuitBackground";
import { useStyleTab } from "@/components/providers/StyleTabProvider";
import { BenBoxTheme } from "@/components/themes/BenBoxTheme";
import { GridlyTheme } from "@/components/themes/GridlyTheme";
import { VelixoTheme } from "@/components/themes/VelixoTheme";

export function PortfolioShell() {
  const { styleTab } = useStyleTab();
  const reduce = useReducedMotion();

  return (
    <>
      <CircuitBackground />
      <AnimatePresence mode="wait">
        <motion.div
          key={styleTab}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {styleTab === "gridly" ? <GridlyTheme /> : null}
          {styleTab === "velixo" ? <VelixoTheme /> : null}
          {styleTab === "benbox" ? <BenBoxTheme /> : null}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
