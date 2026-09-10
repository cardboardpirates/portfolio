import { Diamond } from "lucide-react";
import type { LanguageTierContent } from "../../lib/types";

// Quantos losangos acendem por nível. São só 4 níveis REAIS do currículo
// (Nativo/Avançado/Intermediário/Básico) visualizados como ícone; o rótulo
// textual (tierLabel) sempre acompanha, pra nunca parecer um número inventado.
const TIER_FILLED: Record<LanguageTierContent["tier"], number> = {
  native: 4,
  advanced: 3,
  intermediate: 2,
  basic: 1,
};

interface LanguageTierListProps {
  items: LanguageTierContent[];
}

export function LanguageTierList({ items }: LanguageTierListProps) {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center justify-between gap-3 rounded-sm border border-stroke/50 bg-bg/40 px-3 py-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-primary/90">{item.label}</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <Diamond
                  key={i}
                  size={11}
                  strokeWidth={1.5}
                  className={
                    i < TIER_FILLED[item.tier]
                      ? "text-arcane-teal"
                      : "text-stroke"
                  }
                  fill={i < TIER_FILLED[item.tier] ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
            {item.tierLabel}
          </span>
        </li>
      ))}
    </ul>
  );
}
