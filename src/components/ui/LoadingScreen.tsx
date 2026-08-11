import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLoadingProgress } from "../../hooks/useLoadingProgress";
import { useRotatingWords } from "../../hooks/useRotatingWords";

interface LoadingScreenProps {
  label: string;
  words: string[];
  onComplete: () => void;
}

export function LoadingScreen({
  label,
  words,
  onComplete,
}: LoadingScreenProps) {
  const progress = useLoadingProgress(2700);
  const { word, index } = useRotatingWords(words, 900);
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (progress >= 100 && !hasCompleted.current) {
      hasCompleted.current = true;
      const timeout = setTimeout(onComplete, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-bg px-6 py-8 md:px-10 md:py-10"
    >
      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xs uppercase tracking-[0.3em] text-muted"
      >
        {label}
      </motion.span>

      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="font-display text-4xl text-text-primary/80 md:text-6xl lg:text-7xl"
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-end gap-4">
        <span className="font-display text-6xl tabular-nums text-text-primary md:text-8xl lg:text-9xl">
          {String(progress).padStart(3, "0")}
        </span>
        <div className="h-[3px] w-full bg-stroke/50">
          <div
            className="accent-gradient h-full origin-left"
            style={{
              transform: `scaleX(${progress / 100})`,
              boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
