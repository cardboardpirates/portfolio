// Fundo ambiente "Arcane HUD": duas manchas de brilho (roxo/teal) e três dados
// wireframe decorativos, todos reagindo de leve ao movimento do mouse
// (mesma técnica de parallax que existia no antigo GradientBackground, só
// generalizada para várias camadas). Monta uma única vez na raiz do app,
// atrás das 3 páginas, e persiste durante a troca entre elas.
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { Dice } from "./Dice";

const blobTransition = (duration: number, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
});

export function ArcaneBackground() {
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 18, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (reduceMotion) return;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set((event.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduceMotion, mouseX, mouseY]);

  const glow1X = useTransform(springX, [-1, 1], [-70, 70]);
  const glow1Y = useTransform(springY, [-1, 1], [-50, 50]);
  const glow2X = useTransform(springX, [-1, 1], [60, -60]);
  const glow2Y = useTransform(springY, [-1, 1], [40, -40]);

  const dice1X = useTransform(springX, [-1, 1], [-28, 28]);
  const dice1Y = useTransform(springY, [-1, 1], [-22, 22]);
  const dice2X = useTransform(springX, [-1, 1], [22, -22]);
  const dice2Y = useTransform(springY, [-1, 1], [18, -18]);
  const dice3X = useTransform(springX, [-1, 1], [-16, 16]);
  const dice3Y = useTransform(springY, [-1, 1], [13, -13]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden bg-bg"
    >
      <motion.div
        className="absolute -left-[10%] -top-[15%] h-[60%] w-[60%] rounded-full blur-[120px]"
        style={{
          backgroundColor: "hsl(var(--arcane-purple) / 0.22)",
          x: glow1X,
          y: glow1Y,
        }}
        animate={reduceMotion ? undefined : { scale: [1, 1.08, 0.96, 1] }}
        transition={blobTransition(20)}
      />
      <motion.div
        className="absolute -right-[10%] -bottom-[15%] h-[55%] w-[55%] rounded-full blur-[120px]"
        style={{
          backgroundColor: "hsl(var(--arcane-teal) / 0.16)",
          x: glow2X,
          y: glow2Y,
        }}
        animate={reduceMotion ? undefined : { scale: [1, 0.94, 1.06, 1] }}
        transition={blobTransition(24, 2)}
      />

      <motion.div
        className="absolute left-[8%] top-[16%] opacity-40 md:opacity-60"
        style={{ x: dice1X, y: dice1Y }}
      >
        <Dice sides={20} tone="purple" size={64} />
      </motion.div>
      <motion.div
        className="absolute right-[12%] top-[52%] opacity-35 md:opacity-55"
        style={{ x: dice2X, y: dice2Y }}
      >
        <Dice sides={6} tone="teal" size={48} />
      </motion.div>
      <motion.div
        className="absolute bottom-[12%] left-[22%] opacity-35 md:opacity-50"
        style={{ x: dice3X, y: dice3Y }}
      >
        <Dice sides={20} tone="amber" size={44} />
      </motion.div>

      <div className="arcane-scanlines absolute inset-0 opacity-40" />
      <div className="arcane-grain absolute inset-0 opacity-[0.04]" />
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
