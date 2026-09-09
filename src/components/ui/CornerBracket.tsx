// Um único canto de "mira" desenhado em SVG, reaproveitado 4x (via rotação)
// por quem usa este componente para formar a moldura completa de um SheetPanel.
export type BracketTone = "purple" | "teal" | "amber" | "neutral";

interface CornerBracketProps {
  tone?: BracketTone;
  size?: number;
  className?: string;
}

const toneClass: Record<BracketTone, string> = {
  purple: "text-arcane-purple",
  teal: "text-arcane-teal",
  amber: "text-arcane-amber",
  neutral: "text-stroke",
};

export function CornerBracket({
  tone = "neutral",
  size = 20,
  className = "",
}: CornerBracketProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`${toneClass[tone]} ${className}`}
    >
      {/* Traço externo, mais grosso */}
      <path
        d="M2 10V4.5a2.5 2.5 0 0 1 2.5-2.5H10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Segunda linha paralela, mais fina e translúcida, pra dar sensação de metal gravado */}
      <path
        d="M6.5 10V8a2 2 0 0 1 2-2h2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeOpacity="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Rebite no vértice */}
      <circle cx="5.5" cy="5.5" r="1.4" fill="currentColor" />
    </svg>
  );
}
