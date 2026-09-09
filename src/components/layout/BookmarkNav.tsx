import { Images, Send, Shield, ScrollText, type LucideIcon } from "lucide-react";
import type { NavPageContent, PageId } from "../../lib/types";

// Abas fixas que representam as páginas do livreto de ficha: viram uma barra
// inferior no mobile e um conjunto de "marcadores" na borda direita no desktop,
// no lugar da antiga navbar em pílula (que só fazia sentido com scroll único).
interface BookmarkNavProps {
  pages: NavPageContent[];
  activeId: PageId;
  onNavigate: (id: PageId) => void;
}

const NAV_ICON: Record<PageId, LucideIcon> = {
  cover: Shield,
  log: ScrollText,
  portfolio: Images,
  contact: Send,
};

export function BookmarkNav({ pages, activeId, onNavigate }: BookmarkNavProps) {
  return (
    <nav
      aria-label="Character sheet pages"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center gap-2 border-t border-stroke bg-surface/90 px-4 py-3 backdrop-blur-md md:inset-x-auto md:inset-y-0 md:right-0 md:flex-col md:justify-center md:gap-3 md:border-l md:border-t-0 md:bg-transparent md:px-3 md:py-0 md:backdrop-blur-none"
    >
      {pages.map((page) => {
        const isActive = page.id === activeId;
        const Icon = NAV_ICON[page.id];
        return (
          <button
            key={page.id}
            type="button"
            onClick={() => onNavigate(page.id)}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-1.5 rounded-sm border px-3 py-2 text-[0.65rem] uppercase tracking-[0.2em] transition-all duration-300 md:flex-col md:gap-1 md:rounded-l-md md:rounded-r-none md:border-r-0 md:px-4 md:py-3 ${
              isActive
                ? "border-arcane-purple/60 bg-surface text-arcane-purple shadow-glow-purple"
                : "border-stroke bg-surface/70 text-muted hover:border-arcane-purple/40 hover:text-text-primary"
            }`}
          >
            <Icon size={16} className="shrink-0" />
            <span>{page.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
