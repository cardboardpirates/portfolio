import { useState } from "react";
import { ExternalLink, Send } from "lucide-react";
import type { SiteContent } from "../../lib/types";
import { D20Roll } from "../ui/D20Roll";
import { GlowLink } from "../ui/GlowLink";

interface ContactPageProps {
  content: SiteContent;
}

// Página III: "Enviar um corvo". Status/redes sociais/copyright saíram
// daqui e foram pro rodapé do menu lateral (BookmarkNav).
export function ContactPage({ content }: ContactPageProps) {
  const { contact, social } = content;
  const [hasWon, setHasWon] = useState(false);
  const emailHref =
    social.find((link) => link.href.startsWith("mailto:"))?.href ?? "#";

  return (
    <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1200px] flex-col justify-center gap-16 px-6 pb-24 pt-24 md:px-10 md:pb-16 md:pt-28 md:pr-28 lg:px-16 lg:pr-28">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-3">
          <Send size={13} className="text-muted" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {contact.eyebrow}
          </span>
        </div>
        <h2 className="font-display text-4xl text-text-primary md:text-6xl">
          {contact.heading} <span>{contact.headingItalic}</span>
        </h2>
        <p className="max-w-md text-sm text-muted md:text-base">
          {contact.subtext}
        </p>

        <D20Roll
          idleLabel={contact.diceLabel}
          successLabel={contact.diceSuccessLabel}
          successDetail={contact.diceSuccessDetail}
          onSuccess={() => setHasWon(true)}
        />

        {hasWon && (
          <GlowLink
            href={emailHref}
            size="lg"
            tone="purple"
            className="animate-role-fade-in mt-2"
          >
            {contact.ctaLabel} <ExternalLink size={14} aria-hidden="true" />
          </GlowLink>
        )}
      </div>
    </section>
  );
}
