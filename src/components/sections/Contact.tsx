import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import type { SiteContent } from "../../lib/types";
import { GradientBackground } from "../ui/GradientBackground";
import { GradientBorderLink } from "../ui/GradientBorderLink";

interface ContactProps {
  content: SiteContent;
}

export function Contact({ content }: ContactProps) {
  // ref para o elemento que contém o texto repetido do "marquee" (faixa que
  // desliza continuamente), animado via GSAP mais abaixo.
  const trackRef = useRef<HTMLDivElement>(null);
  // Desestruturação: extrai só as chaves "contact" e "social" do objeto
  // "content", equivalente a "content.contact" e "content.social".
  const { contact, social } = content;
  const emailHref =
    social.find((link) => link.href.startsWith("mailto:"))?.href ?? "#";

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current) return;
      // Anima o elemento de -0% até -50% da sua própria largura no eixo X,
      // continuamente (repeat: -1 significa "repetir para sempre" no GSAP).
      // Como o conteúdo é duplicado duas vezes (veja o .map([0, 1]) no JSX),
      // mover exatamente 50% cria um loop perfeito e sem "salto" visível.
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20"
    >
      <GradientBackground variant="footer" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />
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
          <GradientBorderLink href={emailHref} size="lg" className="mt-4">
            {contact.ctaLabel} <span aria-hidden="true">↗</span>
          </GradientBorderLink>
        </div>

        <div className="my-16 overflow-hidden md:my-20">
          {/* [0, 1].map duplica o texto do marquee lado a lado. Isso é o que
              permite o loop contínuo: quando a animação GSAP move a faixa em
              -50%, a segunda cópia do texto "assume o lugar" da primeira sem
              deixar espaço vazio aparecer. */}
          <div ref={trackRef} className="flex w-max whitespace-nowrap">
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
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs text-muted">{contact.statusLabel}</span>
          </div>

          <div className="flex items-center gap-4">
            {social.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="text-xs text-muted transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <span className="text-xs text-muted">{contact.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
