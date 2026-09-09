import {
  Briefcase,
  Code2,
  ExternalLink,
  Mail,
  Send,
  type LucideIcon,
} from "lucide-react";
import type { LinkContent, SiteContent } from "../../lib/types";
import { GlowLink } from "../ui/GlowLink";

interface ContactPageProps {
  content: SiteContent;
}

// Não existe ícone de marca pra LinkedIn/GitHub no lucide-react (removidos por
// licenciamento), então usamos um ícone temático genérico no lugar de cada um.
function getSocialIcon(link: LinkContent): LucideIcon {
  if (link.href.startsWith("mailto:")) return Mail;
  if (link.href.includes("linkedin.com")) return Briefcase;
  if (link.href.includes("github.com")) return Code2;
  return ExternalLink;
}

// Página III: "Enviar um corvo". O marquee agora roda em CSS puro
// (animate-marquee, ver tailwind.config.ts) em vez de GSAP, já que não há
// mais scroll único pra justificar a dependência.
export function ContactPage({ content }: ContactPageProps) {
  const { contact, social } = content;
  const emailHref =
    social.find((link) => link.href.startsWith("mailto:"))?.href ?? "#";

  return (
    <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1200px] flex-col justify-center gap-16 px-6 pb-24 pt-24 md:px-10 md:pb-16 md:pt-28 lg:px-16 lg:pr-28">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <Send size={13} className="text-muted" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {contact.eyebrow}
          </span>
        </div>
        <h2 className="text-4xl font-medium text-text-primary md:text-6xl">
          {contact.heading}{" "}
          <span className="font-display">{contact.headingItalic}</span>
        </h2>
        <p className="max-w-md text-sm text-muted md:text-base">
          {contact.subtext}
        </p>
        <GlowLink href={emailHref} size="lg" tone="purple" className="mt-4">
          {contact.ctaLabel} <ExternalLink size={14} aria-hidden="true" />
        </GlowLink>
      </div>

      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee whitespace-nowrap motion-reduce:animate-none">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-display text-4xl text-text-primary/10 md:text-6xl"
            >
              {contact.marqueeText.repeat(10)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 border-t border-stroke pt-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-arcane-teal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-arcane-teal" />
          </span>
          <span className="text-xs text-muted">{contact.statusLabel}</span>
        </div>

        <div className="flex items-center gap-4">
          {social.map((link) => {
            const Icon = getSocialIcon(link);
            return (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-text-primary"
              >
                <Icon size={13} className="shrink-0" />
                {link.label}
              </a>
            );
          })}
        </div>

        <span className="text-xs text-muted">{contact.copyright}</span>
      </div>
    </section>
  );
}
