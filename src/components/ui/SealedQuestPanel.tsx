import { ExternalLink, LockKeyhole } from "lucide-react";
import type { LinkContent } from "../../lib/types";
import { GlowLink } from "./GlowLink";
import { SheetPanel } from "./SheetPanel";

interface SealedQuestPanelProps {
  eyebrow: string;
  title: string;
  body: string;
  links: LinkContent[];
}

export function SealedQuestPanel({
  eyebrow,
  title,
  body,
  links,
}: SealedQuestPanelProps) {
  return (
    <SheetPanel
      tone="amber"
      glow
      label={eyebrow}
      labelIcon={LockKeyhole}
      className="flex flex-col gap-4 overflow-hidden p-6 pt-8 md:p-8 md:pt-9"
    >
      <LockKeyhole
        size={96}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 -right-3 text-arcane-amber/10"
      />
      <h3 className="relative font-display text-2xl text-text-primary md:text-3xl">
        {title}
      </h3>
      <p className="relative max-w-md text-sm text-muted md:text-base">
        {body}
      </p>
      <div className="relative mt-1 flex flex-wrap gap-3">
        {links.map((link) => (
          <GlowLink
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            tone="amber"
          >
            {link.label} <ExternalLink size={14} aria-hidden="true" />
          </GlowLink>
        ))}
      </div>
    </SheetPanel>
  );
}
