import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

// "variant" controla se o fundo é o do Hero (topo da página, reage ao mouse)
// ou o do rodapé/Contact (parado, só decorativo e invertido verticalmente).
interface GradientBackgroundProps {
  variant: "hero" | "footer";
}

// Função que gera a configuração de transição de cada "blob" (mancha de cor)
// para não repetir o mesmo objeto duas vezes. "as const" trava o tipo do valor
// como o literal exato ("mirror", "easeInOut") em vez de "string" genérica,
// que é o que a tipagem do framer-motion espera.
const blobTransition = (duration: number, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
});

export function GradientBackground({ variant }: GradientBackgroundProps) {
  // Hook do framer-motion que respeita a preferência do sistema operacional
  // "reduzir movimento" (acessibilidade); quando ativa, paramos as animações.
  const reduceMotion = useReducedMotion();
  const isFooter = variant === "footer";
  const isHero = variant === "hero";

  // useMotionValue cria um valor que o framer-motion consegue animar sem
  // disparar re-render do React a cada mudança (mais performático que useState
  // para valores que mudam a cada movimento do mouse).
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // useSpring "suaviza" um motion value: em vez de seguir o mouse instantaneamente,
  // ele persegue o valor alvo com física de mola (stiffness = rigidez,
  // damping = amortecimento, mass = massa), criando o efeito de "atraso elástico".
  const springX = useSpring(mouseX, { stiffness: 90, damping: 16, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 16, mass: 0.4 });

  useEffect(() => {
    // Só escuta o mouse na variante "hero" e se o usuário não pediu movimento reduzido.
    if (!isHero || reduceMotion) return;

    const handleMouseMove = (event: MouseEvent) => {
      // Converte a posição do mouse (em pixels) para um intervalo de -1 a 1,
      // com o centro da tela sendo 0. Facilita usar esse valor depois no useTransform.
      mouseX.set((event.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHero, reduceMotion, mouseX, mouseY]);

  // useTransform mapeia um intervalo de entrada para um intervalo de saída:
  // aqui, transforma a posição do mouse (-1 a 1) em um deslocamento em pixels
  // para cada blob. Os dois blobs usam intervalos invertidos entre si
  // (ex: -110/110 vs 90/-90) para se moverem em direções opostas, criando
  // profundidade (efeito parallax).
  const blob1X = useTransform(springX, [-1, 1], [-110, 110]);
  const blob1Y = useTransform(springY, [-1, 1], [-80, 80]);
  const blob2X = useTransform(springX, [-1, 1], [90, -90]);
  const blob2Y = useTransform(springY, [-1, 1], [65, -65]);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden ${isFooter ? "scale-y-[-1]" : ""}`}
    >
      {/* O "style" aqui recebe direto os motion values (blob1X/blob1Y), então o
          framer-motion consegue atualizar a posição em cada frame sem re-renderizar
          o componente React inteiro, só o estilo desse elemento. */}
      <motion.div
        className="absolute inset-0"
        style={isHero ? { x: blob1X, y: blob1Y } : undefined}
      >
        <motion.div
          className="absolute -left-[10%] -top-[10%] h-[70%] w-[70%] rounded-full blur-[110px]"
          style={{ backgroundColor: "#4E85BF", opacity: isHero ? 0.45 : 0.35 }}
          // "animate" com arrays de valores ([0, 40, -20, 0]) descreve uma sequência
          // de keyframes: o framer-motion anima de um valor para o próximo em ordem,
          // repetindo (repeat: Infinity) para um movimento orgânico e contínuo.
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
          style={{ backgroundColor: "#89AACC", opacity: isHero ? 0.4 : 0.3 }}
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
