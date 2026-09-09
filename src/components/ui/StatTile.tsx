import type { LucideIcon } from "lucide-react";
import { useCountUp } from "../../hooks/useCountUp";
import type { StatTileContent } from "../../lib/types";
import { HexBadge } from "./HexBadge";

interface StatTileProps {
  stat: StatTileContent;
  icon: LucideIcon;
  tone: "purple" | "teal" | "amber";
}

export function StatTile({ stat, icon: Icon, tone }: StatTileProps) {
  const { value, ref } = useCountUp<HTMLDivElement>(stat.value);
  return (
    <HexBadge tone={tone} glow>
      <div ref={ref} className="flex flex-col items-center gap-1">
        <Icon size={16} className="opacity-80" />
        <span className="font-display text-3xl text-text-primary md:text-4xl">
          {value}
          {stat.suffix}
        </span>
        <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">
          {stat.label}
        </span>
      </div>
    </HexBadge>
  );
}
