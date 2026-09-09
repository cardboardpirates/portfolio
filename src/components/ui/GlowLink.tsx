import type { AnchorHTMLAttributes, ReactNode } from "react";

// Substitui o antigo GradientBorderLink: em vez de um anel de gradiente
// preenchido, o hover acende uma borda fina luminosa na cor de destaque.
type GlowTone = "purple" | "teal" | "amber";

interface GlowLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
  size?: "sm" | "lg";
  tone?: GlowTone;
}

const sizeClasses: Record<"sm" | "lg", string> = {
  sm: "px-4 py-2 text-xs sm:text-sm",
  lg: "px-6 py-3.5 text-sm md:text-base",
};

const toneClasses: Record<GlowTone, string> = {
  purple:
    "group-hover:border-arcane-purple/70 group-hover:text-arcane-purple group-hover:shadow-glow-purple",
  teal: "group-hover:border-arcane-teal/70 group-hover:text-arcane-teal group-hover:shadow-glow-teal",
  amber:
    "group-hover:border-arcane-amber/70 group-hover:text-arcane-amber group-hover:shadow-glow-amber",
};

export function GlowLink({
  children,
  className = "",
  size = "sm",
  tone = "purple",
  ...anchorProps
}: GlowLinkProps) {
  return (
    <a {...anchorProps} className={`group relative inline-flex ${className}`}>
      <span
        className={`relative inline-flex items-center gap-2 rounded-sm border border-stroke bg-surface/80 text-muted backdrop-blur-md transition-all duration-300 ${toneClasses[tone]} ${sizeClasses[size]}`}
      >
        {children}
      </span>
    </a>
  );
}
