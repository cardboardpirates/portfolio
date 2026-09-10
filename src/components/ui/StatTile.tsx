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
    <HexBadge tone={tone} glow className="mx-auto max-w-[134px]">
      <div ref={ref} className="flex flex-col items-center gap-0.5">
        <Icon size={14} className="opacity-80" />
        <span className="font-display text-2xl text-text-primary md:text-3xl">
          {value}
          {stat.suffix}
        </span>
        <span className="text-[0.55rem] leading-tight uppercase tracking-[0.15em] text-muted">
          {stat.label}
        </span>
      </div>
    </HexBadge>
  );
}
