import { motion } from "motion/react";
import { premiumTransition } from "./transitions";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ModalMotion = ({ children }: Props) => (
  <motion.div
    initial={{
      opacity: 0,
      scale: .96,
      y: 10
    }}
    animate={{
      opacity: 1,
      scale: 1,
      y: 0
    }}
    exit={{
      opacity: 0,
      scale: .98,
      y: 6
    }}
    transition={premiumTransition}
  >
    {children}
  </motion.div>
);