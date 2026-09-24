import { useState } from "react";
import { ExternalLink, Send } from "lucide-react";
import type { SiteContent } from "../../lib/types";
import { D20Roll } from "../ui/D20Roll";
import { GlowLink } from "../ui/GlowLink";
import { SheetPanel } from "../ui/SheetPanel";

interface ContactPageProps {
  content: SiteContent;
}

// Página III: "Enviar um corvo". Eyebrow e título ficam centralizados no
// topo, fora do bloco; abaixo, toda a interação do dado mora dentro de um
// SheetPanel (a mesma moldura do diário de missões): o dado (só o visual,
// ver D20Roll) fica numa coluna à esquerda e o texto (subtítulo, label do dado, resultado e CTA) numa
// coluna à direita, que reage ao "hasWon" quando o dado assenta. O brilho
// âmbar do "crítico" pulsa na caixa inteira, não só ao redor do dado.
export function ContactPage({ content }: ContactPageProps) {
  const { contact, social } = content;
  const [hasWon, setHasWon] = useState(false);
  const [flashPulse, setFlashPulse] = useState(false);
  const emailHref =
    social.find((link) => link.href.startsWith("mailto:"))?.href ?? "#";

  const handleSuccess = () => {
    setHasWon(true);
    setFlashPulse(true);
    setTimeout(() => setFlashPulse(false), 550);
  };

  return (
    <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1200px] flex-col justify-center gap-12 px-6 pb-24 pt-24 md:px-10 md:pb-16 md:pt-28 md:pr-28 lg:px-16 lg:pr-28">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-3">
          <Send size={13} className="text-muted" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {contact.eyebrow}
          </span>
        </div>
        <h2 className="font-display text-4xl text-text-primary md:text-6xl">
          {contact.heading} <span>{contact.headingItalic}</span>
        </h2>
      </div>

      <SheetPanel
        tone="neutral"
        className={`p-6 transition-shadow duration-300 md:p-10 ${
          flashPulse ? "shadow-glow-amber" : ""
        }`}
      >
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex justify-center">
            <D20Roll idleLabel={contact.diceLabel} onSuccess={handleSuccess} />
          </div>
  
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <p className="max-w-md text-sm text-muted md:text-base">
              {contact.subtext}
            </p>
            <span
              key={hasWon ? "done" : "idle"}
              className={`animate-role-fade-in font-display text-text-primary ${
                hasWon ? "text-2xl md:text-3xl" : "text-lg"
              }`}
            >
              {hasWon ? contact.diceSuccessLabel : contact.diceLabel}
            </span>
            {hasWon && (
              <p className="animate-role-fade-in max-w-md text-muted">
                {contact.diceSuccessDetail}
              </p>
            )}
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
        </div>
      </SheetPanel>
    </section>
  );
}
