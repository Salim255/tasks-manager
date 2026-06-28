import { motion } from "motion/react";
import { premiumTransition } from "./transitions";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const CardMotion = ({ children }: Props) => (
  <motion.div
    whileHover={{
      y: -2,
      transition: {
        duration: .15
      }
    }}
    whileTap={{
      scale: .99
    }}
    transition={premiumTransition}
  >
    {children}
  </motion.div>
);