import { Check, Code2, Palette, Wrench, type LucideIcon } from "lucide-react";
import type { ProficiencyCategory, ProficiencyTagContent } from "../../lib/types";

interface ProficiencyTagListProps {
  groupLabels: Record<ProficiencyCategory, string>;
  items: ProficiencyTagContent[];
}

// Ordem fixa de exibição dos grupos (código primeiro, depois design, depois ferramentas).
const CATEGORY_ORDER: ProficiencyCategory[] = ["development", "design", "tool"];

const CATEGORY_ICON: Record<ProficiencyCategory, LucideIcon> = {
  development: Code2,
  design: Palette,
  tool: Wrench,
};

export function ProficiencyTagList({
  groupLabels,
  items,
}: ProficiencyTagListProps) {
  return (
    <div className="flex flex-col gap-4">
      {CATEGORY_ORDER.map((category) => {
        const tags = items.filter((item) => item.category === category);
        if (tags.length === 0) return null;
        const CategoryIcon = CATEGORY_ICON[category];
        return (
          <div key={category} className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-muted">
              <CategoryIcon size={12} className="shrink-0" />
              {groupLabels[category]}
            </div>
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag.label}
                  className="flex items-center gap-1.5 rounded-sm border border-stroke/50 bg-bg/40 px-2.5 py-1 text-sm text-text-primary/90"
                >
                  <Check size={13} className="shrink-0 text-arcane-teal/80" />
                  {tag.label}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
