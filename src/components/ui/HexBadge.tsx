// Emblema hexagonal usado pelos tiles de atributo da Capa, ecoando as bolhas
// de atributo (escudo/hexágono) da ficha oficial de D&D, em vez de uma caixa
// retangular simples. Mesmo espírito visual dos dados de fundo: contorno +
// segunda linha interna mais fina + rebites nos vértices.
import type { ReactNode } from "react";
import type { BracketTone } from "./CornerBracket";

interface HexBadgeProps {
  tone: Exclude<BracketTone, "neutral">;
  glow?: boolean;
  children: ReactNode;
  className?: string;
}

const toneTextClass: Record<HexBadgeProps["tone"], string> = {
  purple: "text-arcane-purple",
  teal: "text-arcane-teal",
  amber: "text-arcane-amber",
};

const toneGlowClass: Record<HexBadgeProps["tone"], string> = {
  purple: "drop-shadow-[0_0_4px_hsl(var(--arcane-purple)/0.6)]",
  teal: "drop-shadow-[0_0_4px_hsl(var(--arcane-teal)/0.6)]",
  amber: "drop-shadow-[0_0_4px_hsl(var(--arcane-amber)/0.6)]",
};

const RIVETS = [
  [92, 28],
  [92, 82],
  [8, 82],
  [8, 28],
] as const;

export function HexBadge({ tone, glow = false, children, className = "" }: HexBadgeProps) {
  return (
    <div className={`relative aspect-[100/110] w-full ${className}`}>
      <svg
        viewBox="0 0 100 110"
        aria-hidden="true"
        className={`h-full w-full ${toneTextClass[tone]} ${glow ? toneGlowClass[tone] : ""}`}
      >
        <path
          d="M50 4 L92 28 L92 82 L50 106 L8 82 L8 28 Z"
          fill="hsl(var(--surface) / 0.85)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M50 14 L82 32 L82 78 L50 96 L18 78 L18 32 Z"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        {RIVETS.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" fill="currentColor" />
        ))}
      </svg>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 px-3 text-center">
        {children}
      </div>
    </div>
  );
}
