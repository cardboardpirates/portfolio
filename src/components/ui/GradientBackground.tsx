import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

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
  const isHero = variant === "hero";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!isHero || reduceMotion) return;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set((event.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHero, reduceMotion, mouseX, mouseY]);

  const blob1X = useTransform(springX, [-1, 1], [-30, 30]);
  const blob1Y = useTransform(springY, [-1, 1], [-22, 22]);
  const blob2X = useTransform(springX, [-1, 1], [22, -22]);
  const blob2Y = useTransform(springY, [-1, 1], [18, -18]);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden ${isFooter ? "scale-y-[-1]" : ""}`}
    >
      <motion.div
        className="absolute inset-0"
        style={isHero ? { x: blob1X, y: blob1Y } : undefined}
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
      </motion.div>
      <motion.div
        className="absolute inset-0"
        style={isHero ? { x: blob2X, y: blob2Y } : undefined}
      >
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
      </motion.div>
      <div
        className={`absolute inset-0 ${isFooter ? "bg-black/60" : "bg-black/20"}`}
      />
      {!isFooter && (
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      )}
    </div>
  );
}
