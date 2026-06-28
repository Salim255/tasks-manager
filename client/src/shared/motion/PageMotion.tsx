/* Used for:

Pages
Route changes
Dashboard
Board
Backlog
Analytics */

import { motion } from "motion/react";
import { premiumTransition } from "./transitions";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PageMotion = ({ children }: Props) => (
  <motion.div
    initial={{
      opacity: 0,
      y: 12,
      scale: 0.995,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    exit={{
      opacity: 0,
      y: -8,
      scale: 0.995,
    }}
    transition={premiumTransition}
  >
    {children}
  </motion.div>
);