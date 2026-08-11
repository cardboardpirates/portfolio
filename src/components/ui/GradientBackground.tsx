import { motion, useReducedMotion } from "framer-motion";

interface GradientBackgroundProps {
  variant: "hero" | "footer";
}

const blobTransition = (duration: number, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
});

export function GradientBackground({ variant }: GradientBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const isFooter = variant === "footer";

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden ${isFooter ? "scale-y-[-1]" : ""}`}
    >
      <motion.div
        className="absolute -left-[10%] -top-[10%] h-[70%] w-[70%] rounded-full blur-[110px]"
        style={{ backgroundColor: "#4E85BF", opacity: 0.35 }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 40, -20, 0],
                y: [0, 20, 40, 0],
                scale: [1, 1.1, 0.95, 1],
              }
        }
        transition={blobTransition(18)}
      />
      <motion.div
        className="absolute -right-[10%] -bottom-[10%] h-[60%] w-[60%] rounded-full blur-[110px]"
        style={{ backgroundColor: "#89AACC", opacity: 0.3 }}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -30, 20, 0],
                y: [0, -20, -40, 0],
                scale: [1, 0.9, 1.05, 1],
              }
        }
        transition={blobTransition(22, 2)}
      />
      <div
        className={`absolute inset-0 ${isFooter ? "bg-black/60" : "bg-black/20"}`}
      />
      {!isFooter && (
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      )}
    </div>
  );
}
