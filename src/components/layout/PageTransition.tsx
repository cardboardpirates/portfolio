import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { PageId } from "../../lib/types";

interface PageTransitionProps {
  pageKey: PageId;
  direction: 1 | -1;
  children: ReactNode;
}

// "custom" no nível do AnimatePresence garante que a página que está SAINDO
// também recebe a direção mais recente da navegação (não uma direção antiga
// congelada), então a transição sempre desliza pro lado certo mesmo em
// idas e vindas rápidas entre páginas.
const variants = {
  enter: (dir: 1 | -1) => ({ opacity: 0, y: dir >= 0 ? 24 : -24 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: 1 | -1) => ({ opacity: 0, y: dir >= 0 ? -24 : 24 }),
};

export function PageTransition({
  pageKey,
  direction,
  children,
}: PageTransitionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={pageKey}
        custom={direction}
        variants={reduceMotion ? undefined : variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration: reduceMotion ? 0 : 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
