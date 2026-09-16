import { Images, Send, Shield, ScrollText, type LucideIcon } from "lucide-react";
import { getSocialIcon } from "../../lib/socialIcon";
import type { LinkContent, NavPageContent, PageId } from "../../lib/types";

// Abas fixas que representam as páginas do livreto de ficha: viram uma barra
// inferior no mobile e um conjunto de "marcadores" na borda direita no desktop,
// no lugar da antiga navbar em pílula (que só fazia sentido com scroll único).
// No desktop, a trilha lateral também carrega o rodapé (status/redes/copyright)
// que antes vivia na página de Contato — só ali, o mobile fica só com os pills.
interface BookmarkNavProps {
  pages: NavPageContent[];
  activeId: PageId;
  onNavigate: (id: PageId) => void;
  social: LinkContent[];
  statusLabel: string;
  copyright: string;
}

const NAV_ICON: Record<PageId, LucideIcon> = {
  cover: Shield,
  log: ScrollText,
  portfolio: Images,
  contact: Send,
};

export function BookmarkNav({
  pages,
  activeId,
  onNavigate,
  social,
  statusLabel,
  copyright,
}: BookmarkNavProps) {
  return (
    <nav
      aria-label="Character sheet pages"
      className="fixed inset-x-0 bottom-0 z-50 flex border-t border-stroke bg-surface/90 px-4 py-3 backdrop-blur-md md:inset-x-auto md:inset-y-0 md:right-0 md:w-28 md:flex-col md:border-l md:border-t-0 md:bg-transparent md:px-3 md:py-4 md:backdrop-blur-none"
    >
      <div className="flex flex-1 justify-center gap-2 md:my-auto md:flex-none md:flex-col md:justify-center md:gap-3">
        {pages.map((page) => {
          const isActive = page.id === activeId;
          const Icon = NAV_ICON[page.id];
          return (
            <button
              key={page.id}
              type="button"
              onClick={() => onNavigate(page.id)}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-1.5 rounded-sm border px-3 py-2 text-[0.65rem] uppercase tracking-[0.2em] transition-all duration-300 md:flex-col md:gap-1 md:rounded-md md:px-4 md:py-3 ${
                isActive
                  ? "border-arcane-purple/60 bg-surface text-arcane-purple shadow-glow-purple"
                  : "border-stroke bg-surface/70 text-muted hover:border-arcane-purple/40 hover:text-text-primary"
              }`}
            >
              <Icon size={16} className="hidden shrink-0 md:block" />
              <span className="md:text-center md:leading-snug">{page.label}</span>
            </button>
          );
        })}
      </div>

      <div className="hidden md:flex md:flex-col md:items-start md:gap-3 md:pl-1 md:pr-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-arcane-teal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-arcane-teal" />
          </span>
          <span className="text-[0.65rem] text-muted">{statusLabel}</span>
        </div>

        <div className="flex flex-col gap-2">
          {social.map((link) => {
            const Icon = getSocialIcon(link);
            return (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="flex items-center gap-1.5 text-[0.65rem] text-muted transition-colors hover:text-text-primary"
              >
                <Icon size={12} className="shrink-0" />
                {link.label}
              </a>
            );
          })}
        </div>

        <span className="text-[0.6rem] text-muted">{copyright}</span>
      </div>
    </nav>
  );
}
