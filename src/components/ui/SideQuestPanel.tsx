import { Camera, ExternalLink, Play, Sparkles, type LucideIcon } from "lucide-react";
import type { LinkContent } from "../../lib/types";
import { GlowLink } from "./GlowLink";
import { SheetPanel } from "./SheetPanel";

interface SideQuestPanelProps {
  eyebrow: string;
  title: string;
  body: string;
  links: LinkContent[];
}

// lucide-react não tem ícone de marca pra Instagram/YouTube (removidos por
// licenciamento, mesmo motivo documentado em src/lib/socialIcon.ts), então
// usamos um ícone temático genérico no lugar de cada um.
function getLinkIcon(link: LinkContent): LucideIcon {
  if (link.href.includes("instagram.com")) return Camera;
  if (link.href.includes("youtube.com")) return Play;
  return ExternalLink;
}

export function SideQuestPanel({
  eyebrow,
  title,
  body,
  links,
}: SideQuestPanelProps) {
  return (
    <SheetPanel
      tone="teal"
      label={eyebrow}
      labelIcon={Sparkles}
      className="flex flex-col gap-4 p-6 pt-8 md:p-8 md:pt-9"
    >
      {/* Recorte só pro ícone decorativo, isolado do painel: se o
          overflow-hidden fosse na raiz do SheetPanel, ele também cortaria a
          etiqueta (que precisa "vazar" pra cima da borda como nas outras). */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <Sparkles
          size={96}
          aria-hidden="true"
          className="absolute -bottom-3 -right-3 text-arcane-teal/10"
        />
      </div>
      <h3 className="relative font-display text-2xl text-text-primary md:text-3xl">
        {title}
      </h3>
      <p className="relative max-w-md text-sm text-muted md:text-base">
        {body}
      </p>
      <div className="relative mt-1 flex flex-wrap gap-3">
        {links.map((link) => {
          const Icon = getLinkIcon(link);
          return (
            <GlowLink
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              tone="teal"
            >
              {link.label} <Icon size={14} aria-hidden="true" />
            </GlowLink>
          );
        })}
      </div>
    </SheetPanel>
  );
}
