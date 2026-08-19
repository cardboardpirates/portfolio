import { useEffect, useRef } from "react";
import { useRotatingWords } from "../../hooks/useRotatingWords";
import { gsap } from "../../lib/gsap";
import type { SiteContent } from "../../lib/types";
import { GradientBackground } from "../ui/GradientBackground";

interface HeroProps {
  content: SiteContent;
}

export function Hero({ content }: HeroProps) {
  // ref conectado à section principal (via JSX abaixo), usado como "escopo"
  // para o gsap.context procurar elementos só dentro desta seção.
  const rootRef = useRef<HTMLDivElement>(null);
  // Alterna a palavra da "role" (Designer, Developer...) a cada 2 segundos.
  const { word: role, index: roleIndex } = useRotatingWords(
    content.hero.roles,
    2000,
  );
  const emailHref =
    content.social.find((link) => link.href.startsWith("mailto:"))?.href ??
    "#";

  useEffect(() => {
    // gsap.context agrupa animações e permite limpar todas de uma vez no
    // cleanup (ctx.revert()), evitando vazamento de listeners/timelines se
    // este componente desmontar. O segundo argumento (rootRef) restringe as
    // buscas por seletor CSS (".name-reveal", ".blur-in") a dentro desta seção.
    const ctx = gsap.context(() => {
      // Uma timeline encadeia animações em sequência. "defaults" aplica a
      // mesma curva de easing a todas as animações da timeline.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      // .fromTo(seletor, estadoInicial, estadoFinal): anima o(s) elemento(s)
      // que casam com a classe ".name-reveal" (o <h1> do nome) do estado
      // inicial (invisível, 50px abaixo) até o final (visível, no lugar).
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
      ).fromTo(
        // Encadeado com .fromTo novamente: anima todos os elementos com a
        // classe ".blur-in" (eyebrow, parágrafos, botões) com um efeito de
        // desfoque. "stagger: 0.1" atrasa cada elemento em 0.1s um do outro,
        // criando um efeito cascata em vez de todos aparecerem juntos.
        // O "0.3" no final é a posição na timeline (começa aos 0.3s, sobrepondo
        // parte da animação anterior em vez de esperar ela terminar).
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
        0.3,
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-6 text-center"
    >
      <GradientBackground variant="hero" />

      <div className="relative z-10 flex flex-col items-center">
        <span className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">
          {content.hero.eyebrow}
        </span>

        <h1 className="name-reveal mb-6 font-display text-6xl leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-9xl">
          {content.hero.name}
        </h1>

        <p className="blur-in mb-8 text-lg text-muted md:text-xl">
          {content.hero.roleIntro}{" "}
          {/* Trocar "key" a cada nova palavra força o React a recriar este
              elemento (em vez de só atualizar o texto), o que reinicia a
              animação CSS "animate-role-fade-in" do zero a cada troca. */}
          <span
            key={roleIndex}
            className="inline-block animate-role-fade-in font-display text-text-primary"
          >
            {role}
          </span>{" "}
          {content.hero.roleOutro}
        </p>

        <p className="blur-in mb-12 max-w-md text-sm text-muted md:text-base">
          {content.hero.description}
        </p>

        <div className="blur-in inline-flex gap-4">
          <a
            href="#work"
            className="group relative inline-flex rounded-full transition-transform duration-300 hover:scale-105"
          >
            <span className="accent-gradient pointer-events-none absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative inline-flex items-center justify-center rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary">
              {content.hero.ctaPrimary}
            </span>
          </a>
          <a
            href={emailHref}
            className="group relative inline-flex rounded-full transition-transform duration-300 hover:scale-105"
          >
            <span className="accent-gradient pointer-events-none absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative inline-flex items-center justify-center rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-sm text-text-primary transition-all duration-300 group-hover:border-transparent">
              {content.hero.ctaSecondary}
            </span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          {content.hero.scrollLabel}
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-stroke">
          <div className="absolute h-1/3 w-full animate-scroll-down bg-text-primary" />
        </div>
      </div>
    </section>
  );
}
