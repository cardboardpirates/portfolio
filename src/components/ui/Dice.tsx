// Dado wireframe decorativo (d6/d20), desenhado em SVG (sem asset de imagem),
// que gira devagar e brilha na cor de destaque escolhida. A API já reserva o
// espaço para uma fase futura interativa (clicar para rolar): "variant",
// "onRoll", "rollResult" e "rolling" não mudam nada hoje quando variant é
// "decorative", mas evitam precisar reescrever este componente depois.
import { motion, useReducedMotion } from "framer-motion";

export type DiceSides = 6 | 20;
export type DiceVariant = "decorative" | "interactive";
export type DiceTone = "purple" | "teal" | "amber";

interface DiceProps {
  sides?: DiceSides;
  variant?: DiceVariant;
  size?: number;
  tone?: DiceTone;
  className?: string;
  onRoll?: (result: number) => void;
  rollResult?: number | null;
  rolling?: boolean;
}

const toneTextClass: Record<DiceTone, string> = {
  purple: "text-arcane-purple",
  teal: "text-arcane-teal",
  amber: "text-arcane-amber",
};

const toneGlowClass: Record<DiceTone, string> = {
  purple: "drop-shadow-[0_0_3px_hsl(var(--arcane-purple)/0.75)]",
  teal: "drop-shadow-[0_0_3px_hsl(var(--arcane-teal)/0.75)]",
  amber: "drop-shadow-[0_0_3px_hsl(var(--arcane-amber)/0.75)]",
};

// Hexágono isométrico de um cubo: T(12,2) UR(20,6.5) BR(20,17.5) B(12,22)
// BL(4,17.5) UL(4,6.5), com o centro C(12,11) = UR+UL-T (vértice real da
// face de cima). As 3 linhas do centro fecham as 3 faces visíveis do cubo
// como paralelogramos; nenhuma linha cruza uma face sozinha.
function D6Shape() {
  return (
    <>
      <path d="M12 2 20 6.5v11L12 22 4 17.5v-11z" />
      <path d="M12 11 20 6.5M12 11 4 6.5M12 11v11" />
    </>
  );
}

// Mesmo hexágono externo do d6 (silhueta de dado), mas com um hexagrama
// inscrito: dois triângulos ligando os vértices ALTERNADOS do próprio
// hexágono (T-BR-BL e UR-B-UL), sem nenhum ponto novo inventado. Isso lê
// como uma pedra facetada nitidamente mais complexa que o cubo (em vez de
// um "Y" quase igual ao do d6), e é o mesmo motivo hexágono+estrela usado
// por convenção em ícones de d20.
function D20Shape() {
  return (
    <>
      <path d="M12 1 22 7v10l-10 6L2 17V7z" />
      <path d="M12 1 22 17 2 17z" />
      <path d="M22 7 12 23 2 7z" />
    </>
  );
}

export function Dice({
  sides = 20,
  variant = "decorative",
  size = 48,
  tone = "purple",
  className = "",
  onRoll,
  rollResult = null,
  rolling = false,
}: DiceProps) {
  const reduceMotion = useReducedMotion();
  const isInteractive = variant === "interactive";

  const rollInternally = () => {
    if (!isInteractive || !onRoll) return;
    const max = sides === 20 ? 20 : 6;
    onRoll(Math.floor(Math.random() * max) + 1);
  };

  // A arte é uma projeção isométrica fixa (2D) de um sólido, não um modelo 3D:
  // girar 360° contínuo passa por ângulos onde essa projeção "quebra" a ilusão
  // (só bate certo em 0°/360°). Por isso a versão decorativa balança devagar
  // em vez de girar por completo; a rolagem interativa (futura) pode continuar
  // usando um giro rápido, já que aí o movimento é curto o bastante pra não
  // incomodar.
  const spinAnimate = reduceMotion
    ? undefined
    : rolling
      ? { rotate: 360 * 3 }
      : { rotate: [-9, 9, -9] };

  const spinTransition = reduceMotion
    ? undefined
    : rolling
      ? { duration: 0.6, ease: "easeOut" as const }
      : {
          duration: sides === 20 ? 7 : 6,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut" as const,
        };

  return (
    <div className={`relative inline-flex ${className}`} style={{ width: size, height: size }}>
      <motion.svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
        aria-hidden="true"
        role="presentation"
        className={`${toneTextClass[tone]} ${toneGlowClass[tone]} ${isInteractive ? "cursor-pointer" : ""}`}
        animate={spinAnimate}
        transition={spinTransition}
        onClick={isInteractive ? rollInternally : undefined}
      >
        {sides === 20 ? <D20Shape /> : <D6Shape />}
      </motion.svg>
      {isInteractive && rollResult !== null && (
        <span
          className={`pointer-events-none absolute inset-0 flex items-center justify-center font-display text-sm ${toneTextClass[tone]}`}
        >
          {rollResult}
        </span>
      )}
    </div>
  );
}
