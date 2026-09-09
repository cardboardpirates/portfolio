import { Calendar, Flag, MapPin, Swords } from "lucide-react";
import type { QuestLogEntryContent } from "../../lib/types";
import { SheetPanel } from "./SheetPanel";

interface QuestLogEntryProps {
  quest: QuestLogEntryContent;
  activeLabel: string;
}

export function QuestLogEntry({ quest, activeLabel }: QuestLogEntryProps) {
  const isActive = quest.status === "active";
  return (
    <SheetPanel
      tone={isActive ? "teal" : "neutral"}
      glow={isActive}
      label={quest.period}
      labelIcon={Calendar}
      className="flex flex-col gap-2 p-5 pt-7 md:p-6 md:pt-8"
    >
      {isActive && (
        <span
          className="absolute -right-1 -top-1 z-10 flex items-center gap-1 bg-arcane-teal px-3 py-1 pr-4 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-bg shadow-glow-teal"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 50%)" }}
        >
          <Flag size={11} /> {activeLabel}
        </span>
      )}
      <div className="flex items-center gap-2">
        <Swords size={16} className="shrink-0 text-muted" />
        <h3 className="font-display text-xl text-text-primary md:text-2xl">
          {quest.guild}
        </h3>
      </div>
      <p className="flex flex-wrap items-center gap-x-2 text-sm text-muted">
        {quest.role}
        {quest.location && (
          <span className="inline-flex items-center gap-1 text-muted/70">
            <MapPin size={11} />
            {quest.location}
          </span>
        )}
      </p>
      <p className="mt-1 text-sm text-text-primary/80">{quest.description}</p>
    </SheetPanel>
  );
}
