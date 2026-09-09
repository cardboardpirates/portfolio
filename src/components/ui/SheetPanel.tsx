// Moldura padrão de "campo de formulário" da ficha: usada em todo canto onde
// existe uma caixa (tiles de atributo, entradas do diário de missões, o card
// de missão selada, etc.), sempre com os mesmos 4 cantos em SVG e uma segunda
// borda interna "gravada", pra não ficar só uma linha fina simples.
import type { ElementType, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { CornerBracket, type BracketTone } from "./CornerBracket";

interface SheetPanelProps {
  children: ReactNode;
  tone?: BracketTone;
  glow?: boolean;
  className?: string;
  as?: ElementType;
  // Etiqueta que fica encostada na borda superior do painel, como o nome de
  // um campo na ficha oficial de D&D. Só faz sentido pra UM painel só sendo
  // rotulado, não para um cabeçalho que nomeia uma coluna inteira de caixas.
  label?: string;
  labelIcon?: LucideIcon;
}

const glowClass: Record<BracketTone, string> = {
  purple: "shadow-glow-purple",
  teal: "shadow-glow-teal",
  amber: "shadow-glow-amber",
  neutral: "",
};

const innerBorderClass: Record<BracketTone, string> = {
  purple: "border-arcane-purple/25",
  teal: "border-arcane-teal/25",
  amber: "border-arcane-amber/25",
  neutral: "border-stroke/50",
};

const labelBorderClass: Record<BracketTone, string> = {
  purple: "border-arcane-purple/40 text-arcane-purple",
  teal: "border-arcane-teal/40 text-arcane-teal",
  amber: "border-arcane-amber/40 text-arcane-amber",
  neutral: "border-stroke text-muted",
};

export function SheetPanel({
  children,
  tone = "neutral",
  glow = false,
  className = "",
  as: Component = "div",
  label,
  labelIcon: LabelIcon,
}: SheetPanelProps) {
  return (
    <Component
      className={`relative rounded-md border border-stroke bg-surface/80 ${glow ? glowClass[tone] : ""} ${className}`}
    >
      <CornerBracket tone={tone} className="pointer-events-none absolute left-2 top-2" />
      <CornerBracket
        tone={tone}
        className="pointer-events-none absolute right-2 top-2 rotate-90"
      />
      <CornerBracket
        tone={tone}
        className="pointer-events-none absolute bottom-2 right-2 rotate-180"
      />
      <CornerBracket
        tone={tone}
        className="pointer-events-none absolute bottom-2 left-2 -rotate-90"
      />
      {/* Segunda linha, um pouco pra dentro da borda externa: é o que dá o
          efeito de moldura "gravada" em vez de um contorno simples único. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-[3px] rounded-[3px] border ${innerBorderClass[tone]}`}
      />
      {label && (
        <div
          className={`absolute -top-[9px] left-6 z-10 flex items-center gap-1.5 rounded-sm border bg-bg px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.25em] ${labelBorderClass[tone]}`}
        >
          {LabelIcon && <LabelIcon size={12} className="shrink-0" />}
          {label}
        </div>
      )}
      {children}
    </Component>
  );
}
